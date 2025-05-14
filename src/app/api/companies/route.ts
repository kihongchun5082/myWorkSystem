import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getCompanies } from "@/service/sanity";

export async function GET() {
  const session = await auth();
  // console.log("session_api/companies/route: ", session);
  const user = session?.user;

  if (!user) {
    return new Response("잘못된 사용자입니다.", { status: 401 });
  }
  return getCompanies().then((data) => NextResponse.json(data));
}
