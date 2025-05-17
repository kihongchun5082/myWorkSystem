import { saveConsult } from "@/service/sanity";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ company: string }> }
) {
  const { company } = await context.params;

  console.log("company_api/consults/[company]/route: ", company);

  const body = await req.json();

  console.log("body_api/consults/[company]/route: ", body);

  if (!company) {
    return new Response("Invalid request: Missing parameters", { status: 400 });
  }
  try {
    const newConsult = await saveConsult(body);
    return NextResponse.json(newConsult);
  } catch (error) {
    console.error("Error fetching visits:", error);

    return new Response("서버 오류 발생", { status: 500 });
  }
}
