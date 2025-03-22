import { NextRequest, NextResponse } from 'next/server';
import { saveConsult } from '@/service/sanity';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const response = await saveConsult(data);
    return NextResponse.json(response);
  } catch (error) {
    return new Response("Error saving consult", { status: 500 });
  }
}
