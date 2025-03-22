import { auth } from "@/auth";
import { getVisitByCompanyName } from "@/service/sanity";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { companyName: string; slug: string } }
  // context: { params?: { companyName?: string; slug?: string } }
) {
  // console.log('req_visit[companyName][slug]: ',req)
  // console.log("Params_routeGet:", params); // ✅ Check what Next.js is extracting
  // console.log("companyName_routeGet:", params.companyName);
  // console.log("slug_routeGet:", params.slug);
  const session = await auth();
  const user = session?.user;
  if (!user) {
    return new Response("잘못된 사용자입니다.", { status: 401 });
  }
  const { companyName, slug } = await params;
  // const  companyName = await context.params?.companyName;
  // const  slug = await context.params?.slug;

  console.log("companyName_visit[companyName]: ", companyName);
  console.log("slug_visit[companyName][slug]: ", slug);

  if (!companyName || !slug) {
   return new Response("Invalid request: Missing parameters", { status: 400 });
 }

  try {
    const visit = await getVisitByCompanyName(companyName, slug);
    console.log("images_getVisitByCompanyName: ", visit);

    return NextResponse.json(visit);
  } catch (error) {
    console.error("Error fetching visits:", error);
    return new Response("서버 오류 발생", { status: 500 });
  }
}
