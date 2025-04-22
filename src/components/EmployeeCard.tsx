'use client'

import { Employee } from "@/model/employee";
import Link from "next/link";

type Props = {
 employee: Employee
}
export default function EmployeeCardPage({employee: { company, name, birthYear, sex}}: Props) {
 
 if (!company || !name || !birthYear) {
  return null;  // ✅ 데이터 없으면 렌더링 안 함
}

 const gender = (sex === "M") ? "남" : (sex === "F") ? "여" : "" ;
 return (
  <Link href = {`/employee/${company}?name=${name}&birthYear=${birthYear}`} className=" flex items-center w-full rounded-sm border border-neutral-300 mb-2 p-2 bg-white hover:bg-neutral-50">
   <div className=" flex items-center  text-neutral-500">
    <p className=" text-black font-bold leading-4">{name} /  </p>
    <p className=" ml-2 text-neutral-700">{gender}</p>
    <p className=" ml-5">{birthYear}</p>
   </div>
  </Link>
 );
}

