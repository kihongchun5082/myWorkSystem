import { auth } from "@/auth";
import { getEmployeesByCompany, getEmployeeByCompany } from "@/service/sanity";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ company: string }> }
) {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    return new Response("잘못된 사용자입니다.", { status: 401 });
  }
  const { company } = await context.params;

  // console.log('company_api/employee/[company]/route: ',company)

  const { searchParams } = new URL(req.url);
  const employeeName = searchParams.get("employeeName");
  const birthYear = searchParams.get("birthYear");

  //   if (!birthYear || !employeeName ) {
  //    return new Response("birthYear employeeName 쿼리 파라미터 필요", { status: 400 });
  //  }
  
  try {
    let employees;
    if (employeeName && birthYear) {
      employees = await getEmployeeByCompany(company, employeeName, birthYear);

      // console.log('employees_api/employee/[company]/route-searchParams-getEmployeeByCompany: ',employees)

    } else {
      employees = await getEmployeesByCompany(company);

      // console.log('employees_api/employee/[company]/route--getEmployeesByCompany: ',employees)
    }

    // console.log(
    //   "employees_api/employee/[company]/route/getEmployeesByCompany: ",
    //   employees
    // );

    return NextResponse.json(employees);
  } catch (error) {
    console.error("Error fetching visits:", error);
    return new Response("서버 오류 발생", { status: 500 });
  }
}
