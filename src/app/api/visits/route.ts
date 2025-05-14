import { auth } from "@/auth";
import sanityClient from "@/lib/sanityClient";
import { getVisitsByCompany } from "@/service/sanity";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function GET(req: NextRequest) {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const companyId = searchParams.get("company");
  console.log('companyId:',companyId)

  if (!companyId) {
    return new Response("Missing 'company' query parameter", { status: 400 });
  }

  try {
    const visits = await getVisitsByCompany(companyId);
    return NextResponse.json(visits);
  } catch (error) {
    console.error("Error fetching visits:", error);
    return new Response("서버 오류 발생", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
 const session = await auth();
 const user = session?.user;
 if (!user) return new Response("Unauthorized", { status: 401 });

 const formData = await req.formData();
 const companyId = formData.get("companyId")?.toString();
 const companyName = formData.get("companyName")?.toString();
 const visitedAt = formData.get("visitedAt")?.toString();
 const nurseName = formData.get("nurse")?.toString();
 const numberConsults = parseInt(formData.get("numberConsults")?.toString() || "0");

 const files = formData.getAll("images").filter((file) => file instanceof File) as File[];

 if (!companyId || !visitedAt || !nurseName) {
   return new Response("Missing required fields", { status: 400 });
 }

 try {
   const uploadedImages = await Promise.all(
     files.map(async (file) => {
       const buffer = Buffer.from(await file.arrayBuffer());
       const asset = await sanityClient.assets.upload("image", buffer, {
         filename: file.name,
         contentType: file.type,
       });

       return {
         _type: "image",
         asset: {
           _type: "reference",
           _ref: asset._id,
         },
         isConsulted: false,
       };
     })
   );

   const newVisit = {
     _id: uuidv4(),
     _type: "visit",
     visitName: `${visitedAt}/${companyName}`,
     visitedAt,
     visitCompany: {
       _type: "reference",
       _ref: companyId,
     },
     nurseName,
     numCnslts: numberConsults,
     visitPhoto: uploadedImages,
   };

   await sanityClient.createIfNotExists(newVisit);

   return NextResponse.json({ success: true });
 } catch (error) {
   console.error("POST /api/visits error:", error);
   return new Response("Failed to create visit", { status: 500 });
 }
}

export async function DELETE(req: NextRequest) {
 const session = await auth();
 const user = session?.user;
 if (!user) return new Response("Unauthorized", { status: 401 });

 try {
   const { visitId } = await req.json();

   if (!visitId) {
     return new Response("Missing visitId in request body", { status: 400 });
   }

   await sanityClient.delete(visitId);
   return NextResponse.json({ success: true });
 } catch (error) {
   console.error("DELETE /api/visits error:", error);
   return new Response("Failed to delete visit", { status: 500 });
 }
}

/* 
🧪 사용 예시
🟢 GET 호출 (SWR 등)
ts
코드 복사
useSWR(`/api/visits?company=${selectedCompany._id}`)
🟢 POST 요청 (이미지 포함)
ts
코드 복사
const formData = new FormData();
formData.append("companyId", companyId);
formData.append("companyName", companyName);
formData.append("visitedAt", visitedAt);
// ...
formData.append("images", file); // 여러 개 추가 가능

fetch("/api/visits", {
 method: "POST",
 body: formData,
});
🔴 DELETE 요청
ts
코드 복사
fetch("/api/visits", {
 method: "DELETE",
 headers: { "Content-Type": "application/json" },
 body: JSON.stringify({ visitId: "visit-id-to-delete" }),
}); */