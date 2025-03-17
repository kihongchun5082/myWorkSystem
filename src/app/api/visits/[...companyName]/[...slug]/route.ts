import { auth } from "@/auth"
import { getDocImageByCompanyName } from "@/service/sanity"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: Request, { params }: { params: { companyName: string; slug: string }}) {
 // console.log('req_visit[companyName]: ',req)
 const session = await auth()
 const user = session?.user
 if (!user) {
  return new Response('잘못된 사용자입니다.', {status: 401})
 }
 const{ companyName, slug } = await params
 console.log('companyName_visit[companyName]: ',companyName)
 console.log('slug_visit[companyName][slug]: ',slug)

 try {
  const images = await getDocImageByCompanyName(companyName, slug)
  // console.log('visits_getVisitByCompany: ',visits)
  
  return NextResponse.json(images)
 } catch (error) {
  console.error('Error fetching visits:', error)
  return new Response('서버 오류 발생', { status: 500 })
 }
}

