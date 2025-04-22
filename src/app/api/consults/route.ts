import { NextRequest, NextResponse } from 'next/server';
import { getConsultByCompanyByEmployeeByVisit, saveConsult } from '@/service/sanity';

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { whichCompany, employeeName, birthYear, visitId } = body
  if (!whichCompany || !employeeName || !birthYear || !visitId ) {
    return new Response("필수 데이터 누락(회사, 이름, 생년, 방문", { status: 400 })
  }
  try {
    const existingConsult = await getConsultByCompanyByEmployeeByVisit(whichCompany, employeeName, birthYear, visitId);

    if (existingConsult) {
      return new Response("이미 등록된 상담입니다.", { status: 400 })
    }

    const newConsult = await saveConsult(body)

    return NextResponse.json(newConsult);
  } catch (error) {
    console.error('Error creating consult: ', error)
    return new Response("Error saving consult", { status: 500 });
  }
}
