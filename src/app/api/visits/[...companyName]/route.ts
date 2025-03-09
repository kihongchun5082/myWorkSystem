import { auth } from "@/auth"
import { getVisits, getVisitsByCompany } from "@/service/sanity"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: Request, { params }: { params: { companyName: string }}) {
 // console.log('req_visit[companyName]: ',req)
 const session = await auth()
 const user = session?.user
 if (!user) {
  return new Response('잘못된 사용자입니다.', {status: 401})
 }
 const{ companyName } = await params
 // console.log('companyName_visit[companyName]: ',companyName)

 try {
  const visits = await getVisitsByCompany(companyName)
  // console.log('visits_getVisitByCompany: ',visits)
  
  return NextResponse.json(visits)
 } catch (error) {
  console.error('Error fetching visits:', error)
  return new Response('서버 오류 발생', { status: 500 })
 }
}
