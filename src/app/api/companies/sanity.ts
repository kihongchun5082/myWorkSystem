/* import type { NextApiRequest, NextApiResponse } from "next";
import sanityClient from "@/lib/sanityClient"; // sanityClient.ts 파일 경로 확인
import { getCompanies } from "@/service/sanity";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // const result = await sanityClient.fetch(`*[_type == "company"]`);
    const result = await getCompanies()
    res.status(200).json(result);
  } catch (error) {
    console.error("Sanity fetch error:", error);
    res.status(500).json({ error: "Failed to fetch data from Sanity" });
  }
}
 */