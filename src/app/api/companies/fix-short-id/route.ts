// app/api/companies/fix-short-id/route.ts Homepage에 <FixShortIdexecButton />버튼으로 접근
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import sanityClient from "@/lib/sanityClient";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  const session = await auth();
  const user = session?.user;
  if (!user) return new Response("Unauthorized", { status: 401 });

  try {
    const companies = await sanityClient.fetch(`*[_type == "company"]{ _id, companyName, companyId, address, zipCode, telNumber, numEmployees, managerName, isContract, image }`);

    const shortIdCompanies = companies.filter((c: any) => c._id.length <= 3);

    console.log("총 shortId 회사 수:", shortIdCompanies.length);

    for (const company of shortIdCompanies) {
      const {_id, ...rest} = company
      const newId = uuidv4();
      const newDoc = {
        _id: newId,
        _type: "company",
        ...rest
      };

      await sanityClient.create(newDoc);
      await sanityClient.delete(company._id);
      console.log(`✅ ${company.companyName} id ${company._id} → ${newId} 으로 변경 완료`);
    }

    return NextResponse.json({ count: shortIdCompanies.length });
  } catch (err) {
    console.error("회사 id 정리 중 오류:", err);
    return new Response("서버 오류", { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const session = await auth();
  const user = session?.user;
  if (!user) return new Response("Unauthorized", { status: 401 });

  try {
    const consults = await sanityClient.fetch(`*[_type == "consult"]`);

    const shortIdCompanies = consults.filter((c: any) => c._id.length <= 3);

    console.log("총 상담 내역: ", consults);
    console.log("총 shortId 상담 수: ", shortIdCompanies.length);

    return NextResponse.json(consults);
  } catch (err) {
    console.error("상담 찾는 중 오류:", err);
    return new Response("서버 오류", { status: 500 });
  }
}
