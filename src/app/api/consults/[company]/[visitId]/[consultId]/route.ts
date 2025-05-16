import sanityClient from "@/lib/sanityClient";
import { NextRequest, NextResponse } from "next/server";

type ConsultUpdateBody = {
  [key: string]: string | number | boolean | null | undefined;
};

export async function PATCH(
  req: NextRequest,
  { params }: { params: { consultId: string } }
) {
  const { consultId } = params;
  let body: ConsultUpdateBody;
  try {
    body = await req.json();
  } catch (error) {
    console.error("Invalid JSON in request body:", error);
    return new Response("Invalid JSON body", { status: 400 });
  }

  console.log(
    "body_api/consults/[company]/[visitId]/[consultId]/route/PATCH: ",
    body
  );

  try {
    const cleanedBody: Partial<ConsultUpdateBody> = {};
    for (const key in body) {
      const value = body[key];
      if (value !== "" && value !== null && value !== undefined) {
        cleanedBody[key] = value;
      }
    }
    const updatedConsult = await sanityClient
      .patch(consultId)
      .set(body)
      .commit();

    return NextResponse.json(updatedConsult);
  } catch (error) {
    console.error("Error updating consult: ", error);
    return new Response("Error updating consult", { status: 500 });
  }
}
