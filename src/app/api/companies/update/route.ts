// File: app/api/companies/update/route.ts
import { NextRequest, NextResponse } from "next/server";
import sanityClient from "@/lib/sanityClient";

type CompanyUpdateFields = {
  [key: string]:
    | string
    | boolean
    | { _type: "image"; asset: { _type: "reference"; _ref: string } };
};

export async function PATCH(req: NextRequest) {
  try {
    const formData = await req.formData();
    const _id = formData.get("_id")?.toString();
    if (!_id) return new Response("Missing company ID", { status: 400 });

    const updateFields: Record<string, any> = {};

    formData.forEach((val, key) => {
      if (key === "logo") return; // 파일 처리 따로

      const stringVal = typeof val === "string" ? val : String(val);

      if (key === "isContract") {
        updateFields[key] = stringVal === "true";
      } else {
        updateFields[key] = stringVal;
      }
    });

    // 파일이 있을 경우 업로드
    const file = formData.get("logo");
    if (file instanceof File) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const asset = await sanityClient.assets.upload("image", buffer, {
        filename: file.name,
        contentType: file.type,
      });
      updateFields["image"] = {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: asset._id,
        },
      };
    }

    const updated = await sanityClient.patch(_id).set(updateFields).commit();

    return NextResponse.json({ success: true, updated });
  } catch (error) {
    console.error("PATCH /api/companies/update error:", error);
    return new Response("Server error", { status: 500 });
  }
}
