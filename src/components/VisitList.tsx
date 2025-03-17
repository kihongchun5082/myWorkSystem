"use client";
import { useCompany } from "@/context/CompanyContext";
import { Visit } from "@/model/visit";
import { getSanityImageUrl } from "@/service/sanity";
import Image from "next/image";
import { PropagateLoader } from "react-spinners";
import useSWR from "swr";
import VisitListCard from "./VisitListCard";

export default function VisitListPage() {
  const { selectedCompany } = useCompany();

  console.log("selectedCompany_VisitList: ", selectedCompany);

  const { data: visits, isLoading: loadingVisits } = useSWR<Visit[]>(
    selectedCompany ? `/api/visits/${selectedCompany}` : null
  );

  // console.log("visits_VisitList: ", visits);

  return (
    <div className=" w-full mt-4 bg-amber-200 ">
      <h2 className=" text-lg font-bold text-center">
        {selectedCompany} 방문 기록
      </h2>
      {loadingVisits ? (
        <PropagateLoader size={6} color="blue" />
      ) : (
        <ol className=" list-decimal mt-2">
          {visits?.length ? (
            visits.map((visit) => (
              <li key={visit.id} className=" border-b p-2">
                <span className=" shadow-xl font-sans font-normal font-stretch-200%">{visit.when}</span>
                <VisitListCard visit={visit} />
              </li>
            ))
          ) : (
            <p className=" text-center text-gray-500">방문 기록이 없습니다.</p>
          )}
        </ol>
      )}
    </div>
  );
}
