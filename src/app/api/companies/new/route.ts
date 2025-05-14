// app/api/companies/new/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { v4 as uuidv4 } from "uuid";
import sanityClient from "@/lib/sanityClient";

export async function POST(req: NextRequest) {
  const session = await auth();
  const user = session?.user;
  if (!user) return new Response("Unauthorized", { status: 401 });

  const formData = await req.formData();
  const image = formData.get("logo") as File;
  const data: any = Object.fromEntries(formData);

try {
  // 🟡 중복 확인
  const existing = await sanityClient.fetch(
    `*[_type == "company" && companyId == $companyId ][0] `,
    { companyId: data.companyId }
  );

  console.log("existing: ", existing);

  if (existing) {
    return NextResponse.json(
      { success: false, message: "이미 등록된 회사입니다.", _id: existing._id },
      { status: 409 }
    );
  }

  let imageRef = null;
  if (image && image instanceof File) {
    const buffer = Buffer.from(await image.arrayBuffer());
    const asset = await sanityClient.assets.upload("image", buffer, {
      filename: image.name,
      contentType: image.type,
    });
    imageRef = {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
    };
  }
  const doc = {
    _type: "company",
    _id: uuidv4(),
    companyName: data.companyName,
    companyId: data.companyId,
    address: data.address,
    zipCode: data.zipCode,
    telNumber: data.telNumber,
    numEmployees: data.numEmployees,
    managerName: data.managerName,
    isContract: data.isContract === "true",
    image: imageRef,
  };

  const created = await sanityClient.create(doc);
  return NextResponse.json({ success: true, created });
} catch (error) {
  console.error("회사 생성 실패:", error);
  return NextResponse.json(
    { success: false, error: "서버 오류로 회사 등록 실패" },
    { status: 500 }
  );
 }
}
