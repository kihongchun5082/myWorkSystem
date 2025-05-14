import { auth } from "@/auth";
import { getConsultByCompanyByEmployeeByVisit } from "@/service/sanity";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { company: string; visitId: string; }}) {
   const session = await auth();
   const user = session?.user;
   if (!user) {
     return new Response("잘못된 사용자입니다.", { status: 401 });
   }
   const { searchParams } = new URL(req.url)
   const birthYear = searchParams.get('birthYear')
   const employeeName = searchParams.get('employeeName')
   const { company, visitId } = await params;
   
   console.log("visitId_api/consults/[company]/[visitId]/route/GET: ", visitId);

  if (!birthYear || !employeeName ) {
   return new Response("birthYear employeeName 쿼리 파라미터 필요", { status: 400 });
 }
 try {
   const consult = await getConsultByCompanyByEmployeeByVisit(company, employeeName, birthYear, visitId);

   console.log("consults_api/consults/[company]/[visitId]/route/getConsultsByVisitId: ", consult);

   return NextResponse.json(consult);
 } catch (error) {

   console.error("Error fetching visits:", error);
   
   return new Response("서버 오류 발생", { status: 500 });
 }
 }

