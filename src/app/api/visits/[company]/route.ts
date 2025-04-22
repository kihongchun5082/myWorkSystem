import { auth } from "@/auth";
import { getVisitsByCompany } from "@/service/sanity";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { company: string } }
) {
  
  const session = await auth();
  const user = session?.user;
  if (!user) {
    return new Response("잘못된 사용자입니다.", { status: 401 });
  }
  const { company } = await params;

  // console.log('params_api?visits/[company]/route: ',params)
  
  console.log('company_api/visits/[company]/route: ',company)

  try {
    const visits = await getVisitsByCompany(company);

    console.log('visits_api/visits/[company]/route: ',visits)

    return NextResponse.json(visits);
  } catch (error) {
    console.error("Error fetching visits:", error);
    return new Response("서버 오류 발생", { status: 500 });
  }
}
