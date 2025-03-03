'use client'
import Link from "next/link";
import useSWR from "swr";
import Avatar from "./Avatar";
import { Company } from "@/model/company";
import { PropagateLoader } from "react-spinners";
import ScrollableBar from "./ui/icons/ScrollableBar";

export default function CompanyBarPage() {
 const { data, isLoading: loading, error } = useSWR<Company[]>('/api/companies')
 console.log('data_CompanyBarPage_useSWR: ',data)
 const company = data
 console.log('company_CompanyBarPage_useSWR: ',company)
 // const company = data && [...data, ...data]
 return (
  <section className=" w-full flex justify-center items-center p-4 shadow-sm shadow-neutral-300 mb-4 rounded-lg min-h-[90px] overflow-x-auto">
   { loading ? <PropagateLoader size={8} color='red' /> : (!company) && <p>{`회사가 없습니다.`}</p>
   }
   { company && (
     <ScrollableBar>
      {company?.map((c:Company) => (
       <Link key={c.companyId} className=" flex flex-col items-center w-20" href={`/companies`}>
         <Avatar image={c.image} highlight />
         <p className=" w-full text-sm text-center text-ellipsis overflow-hidden ">{c.companyName}</p>
        </Link>
      ))}
     </ScrollableBar>
   )}
  </section>
 )
}

