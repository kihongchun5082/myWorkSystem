"use client";
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
  const { selectedCompany, setSelectedCompany } = useCompany();

  const { data: companies, isLoading: loadingCompanies } =
    useSWR<Company[]>("/api/companies");

  return (
    <section className=" w-full flex justify-center items-center p-2 shadow-sm shadow-neutral-300 mb-1 rounded-lg min-h-[80px] overflow-x-auto">
      {loadingCompanies ? (
        <PropagateLoader size={8} color="red" />
      ) : (
        !companies && <p>{`회사가 없습니다.`}</p>
      )}
      {companies && (
        <ul className=" w-full flex gap-x-1.5">
          {companies?.map((c: Company) => {
            const isSelected = selectedCompany?._id === c._id;
            return (
              <button
                key={c._id}
                // className=" flex flex-col items-center w-20 h-32"
                className={`flex flex-col items-center w-20 rounded-lg p-1 ${
                  isSelected ? "bg-neutral-200" : ""
                }`}
                onClick={() => setSelectedCompany(c || null)}
              >
                <Avatar image={c.image} highlight />
                <p className=" w-full text-xs text-center text-ellipsis overflow-hidden ">
                  {c.companyName}
                </p>
              </button>
            );
          })}
        </ul>
      )}
    </section>
  );
}
