// File: /app/api/visits/new/route.ts
export const runtime = "nodejs";

import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import sanityClient from "@/lib/sanityClient";

export async function POST(req: NextRequest) {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const formData = await req.formData();

    const companyId = formData.get("companyId")?.toString();
    const companyName = formData.get("companyName")?.toString();
    const visitedAt = formData.get("visitedAt")?.toString();
    const nurseName = formData.get("nurse")?.toString();
    const numberConsults = parseInt(
      formData.get("numberConsults")?.toString() || "0"
    );

    if (!companyId || !visitedAt || !nurseName || !numberConsults) {
      return new Response("Missing required fields", { status: 400 });
    }

    const files = formData
      .getAll("images")
      .filter((file) => file instanceof File) as File[];

    // Upload images to Sanity
    const uploadedImages = await Promise.all(
      files.map(async (file) => {
        const buffer = Buffer.from(await file.arrayBuffer());
        const asset = await sanityClient.assets.upload("image", buffer, {
          filename: file.name,
          contentType: file.type,
        });
        return {
          _type: "image",
          _key: uuidv4(),
          asset: {
            _type: "reference",
            _ref: asset._id,
          },
          isConsulted: false,
        };
      })
    );

    console.log('uploadedImage: ',uploadedImages)

    const rawDate = visitedAt.replace(/-/g,"")
    // const docId = uuidv4();
    const docId = `visit-${companyId}-${rawDate}`
    const newVisit = {
      _id: docId,
      _type: "visit",
      visitName: `${visitedAt}/${companyName}`,
      visitedAt,
      visitCompany: {
        _type: "reference",
        _ref: companyId,
      },
      nurseName,
      numCnslts: numberConsults,
      visitPhoto: uploadedImages,
    };

    await sanityClient.createIfNotExists(newVisit);
    const result = NextResponse.json({ success: true, visitId: docId });

    console.log("result: ", result);

    return result;
    // return NextResponse.json({ success: true
    //   , visitId: docId
    //  });
  } catch (error) {
    console.error("POST /api/visits/new error:", error);
    return new Response("Server error", { status: 500 });
  }
}
