// app/api/debug/company-ids/route.ts
import { NextResponse } from "next/server";
import sanityClient from "@/lib/sanityClient";

export async function GET() {
  try {
    const companies = await sanityClient.fetch(`*[_type == "company"]{_id, companyName, companyId}`);

    // console.log("📌 Company Documents (_id, companyId):");
    // companies.forEach((c: any) =>
    //   console.log(`• _id: ${c._id}, companyId: ${c.companyId}, name: ${c.companyName}`)
    // );

    const shortIdCompanies = companies.filter((c: any) => c._id.length <= 3);

    console.log("📌 _id 길이가 3 이하인 회사 목록:");
    shortIdCompanies.forEach((c: any) =>
      console.log(`• _id: ${c._id}, companyId: ${c.companyId}, name: ${c.companyName}`)
    );

    return NextResponse.json({
      count: companies.length,
      // companies,
      shortIdCompanies,
    });
  } catch (error) {
    console.error("❌ Error fetching companies:", error);
    return new Response("서버 오류", { status: 500 });
  }
}
