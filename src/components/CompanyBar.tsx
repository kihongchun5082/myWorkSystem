'use client'
import Link from "next/link";
import useSWR from "swr";
import Avatar from "./Avatar";
import { Company } from "@/model/company";
import { PropagateLoader } from "react-spinners";
import ScrollableBar from "./ui/icons/ScrollableBar";
import { createContext, ReactNode, useState } from "react";
import { Visit } from "@/model/visit";
import VisitListPage from "./VisitList";
import { useCompany } from "@/context/CompanyContext";

export default function CompanyBarPage() {
  const { selectedCompany, setSelectedCompany } = useCompany()

  const { data: companies, isLoading: loadingCompanies } = useSWR<Company[]>('/api/companies')
  console.log('companies_CompactBar: ',companies)

  
//  const { data, isLoading: loading, error } = useSWR<Company[]>('/api/companies')
//  console.log('data_CompanyBarPage_useSWR: ',data)
//  const company = data
//  console.log('company_CompanyBarPage_useSWR: ',company)
 // const company = data && [...data, ...data]
 
 return (
  <section className=" w-full flex justify-center items-center p-4 shadow-sm shadow-neutral-300 mb-4 rounded-lg min-h-[90px] overflow-x-auto">
   { loadingCompanies ? <PropagateLoader size={8} color='red' /> : (!companies) && <p>{`회사가 없습니다.`}</p>
   }
   { companies && (
     <ScrollableBar>
      {companies?.map((c:Company) => (
       <button key={c.companyId} className=" flex flex-col items-center w-20" onClick={()=>setSelectedCompany(c.companyName || null)}>
         <Avatar image={c.image} highlight />
         <p className=" w-full text-sm text-center text-ellipsis overflow-hidden ">{c.companyName}</p>
        </button>
      ))}
      {/* {company?.map((c:Company) => (
       <Link key={c.companyId} className=" flex flex-col items-center w-20" href={`/companies`}>
         <Avatar image={c.image} highlight />
         <p className=" w-full text-sm text-center text-ellipsis overflow-hidden ">{c.companyName}</p>
        </Link>
      ))} */}
     </ScrollableBar>
    )}
     {/* {selectedCompany && <VisitListPage selectedCompany={selectedCompany} />
     } */}
  </section>
 )
}

