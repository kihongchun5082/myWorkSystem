"use client";
import { useCompany } from "@/context/CompanyContext";
import { Visit } from "@/model/visit";
import { PropagateLoader } from "react-spinners";
import useSWR from "swr";
import VisitListCard from "./VisitListCard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function VisitListPage() {
  const { selectedCompany } = useCompany();

  // console.log("selectedCompany_component/VisitList: ", selectedCompany);

  const router = useRouter()

  const [highlightVisitId, setHighlightVisitId] = useState<string | null>(null);
  useEffect(() => {
    const id = localStorage.getItem("highlightVisitId");
    if (id) {
      setHighlightVisitId(id);
      localStorage.removeItem("highlightVisitId");
    }
  }, []);
  
  const { data: visits, isLoading: loadingVisits, mutate, } = useSWR<Visit[]>(`/api/visits?company=${selectedCompany?._id}`);

  // console.log("visits_component/VisitList: ", visits);

  const handleDelete = async (visitId: string) => {
    const ok = confirm("정말 삭제하시겠습니까?")
    if (!ok) return;

    try {
      const res = await fetch(`/api/visits/${visitId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("삭제 완료");
        mutate(); // 리스트 갱신
      } else {
        alert("삭제 실패");
      }
    } catch (err) {
      console.error('삭제 중 오류 발생', err)
      alert("오류가 발생했습니다.")
    }
  };

  return (
    <div className=" w-full mt-4">
      <h2 className=" text-lg font-bold text-center">
        {selectedCompany?.companyName} 방문 기록
      </h2>
      {loadingVisits ? (
        <PropagateLoader size={6} color="blue" />
      ) : (
        <ol className=" list-decimal mt-2 ml-4">
          {visits?.length ? (
            visits.map((visit) => (
              <li key={visit.id} className= {`border-b p-2 ${visit.id === highlightVisitId ? "bg-yellow-100" : ""}`}>
                <span className=" shadow-xl font-sans font-normal font-stretch-200% mr-4">{visit.when}</span>
                <button
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => router.push(`/visits/${visit.id}`)}
                >
                상세보기
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleDelete(visit.id)}
                >
                  삭제
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
