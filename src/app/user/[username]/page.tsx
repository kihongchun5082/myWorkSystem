// src/app/user/[username]/page.tsx
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    username: string;
  }>;
};

export default async function UserPage({ params }: Props) {
  const { username } = await params;

  // 🔹 실제 유저가 존재하는지 확인하는 로직 필요
  const userExists = await checkUserExists(username); // 아래에서 정의

  if (!userExists) {
    notFound(); // ➜ 404 페이지로
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{username}의 프로필</h1>
      <p>이 페이지는 로그인한 유저의 상세 정보를 표시합니다.</p>
    </div>
  );
}

async function checkUserExists(username: string): Promise<boolean> {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  if (!baseUrl) throw new Error("BASE_URL is not defined");

  const res = await fetch(`${baseUrl}/api/user/${username}`, {
    cache: "no-store",
  });
  return res.ok;
}
