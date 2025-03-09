"use client";
import { useCompany } from "@/context/CompanyContext";
import { Visit } from "@/model/visit";
import { getSanityImageUrl } from "@/service/sanity";
import Image from "next/image";
import { PropagateLoader } from "react-spinners";
import useSWR from "swr";

export default function VisitListPage() {
  const { selectedCompany } = useCompany();

  console.log("selectedCompany_VisitList: ", selectedCompany);

  const { data: visits, isLoading: loadingVisits } = useSWR<Visit[]>(
    selectedCompany ? `/api/visits/${selectedCompany}` : null
  );

  // console.log("visits_VisitList: ", visits);

  return (
    <div className=" w-full mt-4">
      <h2 className=" text-lg font-bold text-center">
        {selectedCompany} 방문 기록
      </h2>
      {loadingVisits ? (
        <PropagateLoader size={6} color="blue" />
      ) : (
        <ol className=" mt-2">
          {visits?.length ? (
            visits.map((visit) => (

              <li key={visit.id} className=" border-b p-2">
                <p>
                  <strong>{visit.visitName}</strong> - {visit.when}
                </p>
                <p>
                  간호사: {visit.nurse}, 상담 수: {visit.numberConsults}
                </p>
                {visit.docImage?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {visit.docImage?.map((image, index) => {
                      const imageUrl = getSanityImageUrl(image) || undefined ;
                      return (
                        imageUrl && (
                          <div key={index} className="w-24 h-24 relative">
                          <img
                            src = {imageUrl}
                            alt={`${visit.visitName} 사진`}
                            // layout='fill'
                            // objectFit="cover"
                            className="rounded-md"
                          />
                        </div>
                        )
                      );
                    })}
                  </div>
                )}
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
