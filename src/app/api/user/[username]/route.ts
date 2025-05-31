// src/app/api/user/[username]/route.ts
import { NextRequest, NextResponse } from "next/server";
import sanityClient from "@/lib/sanityClient";

export async function GET(_: NextRequest, context: { params: Promise<{ username: string }> }) {
  const { username } = await context.params;
  const user = await sanityClient.fetch(
    `*[_type == "user" && username == $username][0]`,
    { username }
  );

  console.log('user_api/user/[username]: ',user)

  if (!user) {
    return new NextResponse("Not Found", { status: 404 });
  }

  return NextResponse.json(user);
}
