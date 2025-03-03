import { NextResponse } from 'next/server';
import { auth } from "@/auth";
import { getCompanies } from "@/service/sanity";

export async function GET() {
 const session = await auth()
 const user = session?.user
 if (!user) {
  return new Response('잘못된 사용자입니다.', {status: 401})
 }
 return (
  getCompanies().then((data) => 
   NextResponse.json(data)
  ));
}
/* 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // const result = await sanityClient.fetch(`*[_type == "company"]`);
    const result = await getCompanies()
    res.status(200).json(result);
  } catch (error) {
    console.error("Sanity fetch error:", error);
    res.status(500).json({ error: "Failed to fetch data from Sanity" });
  }
} */

