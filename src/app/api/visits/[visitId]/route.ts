import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import sanityClient from "@/lib/sanityClient";
import { getVisitByVisitId } from "@/service/sanity";


export async function GET(
  req: NextRequest,
  context: { params: Promise<{ visitId: string }> }
) {
  
  const session = await auth();
  const user = session?.user;
  if (!user) {
    return new Response("잘못된 사용자입니다.", { status: 401 });
  }
  const { visitId } = await context.params;

  // console.log("visitId_api/visits/[visitId]/route: ", visitId);

  if (!visitId) {
   return new Response("Invalid request: Missing parameters", { status: 400 });
 }

  try {
    const visit = await getVisitByVisitId( visitId);

    // console.log("visit_api/visits/[visitId]/route/getVisitByVisitId: ", visit);

    return NextResponse.json(visit);
  } catch (error) {
    console.error("Error fetching visits:", error);
    return new Response("서버 오류 발생", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ visitId: string }> }
) {
  const session = await auth();
  const user = session?.user;
  if (!user) return new Response("Unauthorized", { status: 401 });

  const { visitId } = await context.params;
  if (!visitId) return new Response("Invalid visit id", { status: 400 });

  try {
    await sanityClient.delete(visitId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Visit 삭제 실패:", error);
    return new Response("삭제 중 서버 오류", { status: 500 });
  }
}
