import sanityClient from "@/lib/sanityClient";
import { NextRequest, NextResponse } from "next/server";
export async function PATCH(
  req: NextRequest,
  { params }: { params: { visitId: string } }
) {
  const { visitId } = await params;
  const { index } = await req.json();
  
  console.log("index_visits[visitId]: ", index);

  try {
    const patchResult = await sanityClient
      .patch(visitId)
      .set({
        [`visitPhoto[${index}].isChoosen`]: true,
      })
      .commit();

      console.log('patchResult_api/visits/[company]/[visitId]/mark-image/route/PATCH: ',patchResult)

    return NextResponse.json(patchResult);
  } catch (error) {

    console.error("Error marking image as consulted: ", error);
    
    return new Response("Failed to mark image", { status: 500 });
  }
}
