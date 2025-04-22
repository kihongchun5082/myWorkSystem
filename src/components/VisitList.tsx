"use client";
import { useCompany } from "@/context/CompanyContext";
import { Visit } from "@/model/visit";
import { getSanityImageUrl } from "@/service/sanity";
import { PropagateLoader } from "react-spinners";
import useSWR from "swr";
import VisitListCard from "./VisitListCard";
import { useRouter } from "next/navigation";

export default function VisitListPage() {
  const { selectedCompany } = useCompany();

  console.log("selectedCompany_component/VisitList: ", selectedCompany);

  const router = useRouter()
  
  const { data: visits, isLoading: loadingVisits } = useSWR<Visit[]>(
    selectedCompany ? `/api/visits/${selectedCompany?._id}` : null
  );

  console.log("visits_component/VisitList: ", visits);

  return (
    <div className=" w-full mt-4 bg-amber-200 ">
      <h2 className=" text-lg font-bold text-center">
        {selectedCompany?.companyName} 방문 기록
      </h2>
      {loadingVisits ? (
        <PropagateLoader size={6} color="blue" />
      ) : (
        <ol className=" list-decimal mt-2">
          {visits?.length ? (
            visits.map((visit) => (
              <li key={visit.id} className=" border-b p-2">
                <span className=" shadow-xl font-sans font-normal font-stretch-200%">{visit.when}</span>
                <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => router.push(`/visits/${selectedCompany?._id}/${visit.id}`)}
              >
                상세보기
                </button>
                <VisitListCard visit={visit} />
              </li>
            ))
          ) : (
            <p className=" text-center text-gray-500">방문 기록이 없습니다. 회사를 선택하세요.</p>
          )}
        </ol>
      )}
    </div>
  );
}
