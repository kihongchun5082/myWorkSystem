/* import { auth } from "@/auth"
import { Visit } from "@/model/visit"
import { getVisitsByCompany } from "@/service/sanity"
import { NextResponse } from "next/server"

export async function GET() {
 const session = await auth()
 const user = session?.user
 if (!user) {
  return new Response('잘못된 사용자입니다.', {status: 401})
 }
 // const company = req.company
 return getVisitsByCompany().then(data => NextResponse.json(data))
}

 */