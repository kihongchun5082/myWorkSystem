import { auth } from "@/auth";
import { getVisitByCompanyNameByVisitId } from "@/service/sanity";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { company: string; visitId: string } }
) {
  
  const session = await auth();
  const user = session?.user;
  if (!user) {
    return new Response("잘못된 사용자입니다.", { status: 401 });
  }
  const { company, visitId } = await params;

  console.log("company_api/visits/[company]/[visitId]/route: ", company);
  console.log("visitId_api/visits/[company]/[visitId]/route: ", visitId);

  if (!company || !visitId) {
   return new Response("Invalid request: Missing parameters", { status: 400 });
 }

  try {
    const visit = await getVisitByCompanyNameByVisitId(company, visitId);

    console.log("visit_api/visits/[company]/[visitId]/route/getVisitByCompanyName: ", visit);

    return NextResponse.json(visit);
  } catch (error) {
    console.error("Error fetching visits:", error);
    return new Response("서버 오류 발생", { status: 500 });
  }
}
