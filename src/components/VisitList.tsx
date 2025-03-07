'use client'
import { useCompany } from "@/context/CompanyContext";
import { Visit } from "@/model/visit";
import { PropagateLoader } from "react-spinners";
import useSWR from "swr";

export default function VisitListPage() {
  const { selectedCompany } = useCompany()
  console.log('selectedCompany_CompactBar: ',selectedCompany)

  const { data: visits, isLoading: loadingVisits } = useSWR<Visit[]>
  (selectedCompany ? `/api/visits/${selectedCompany}` : null)

  console.log('visits_CompactBar: ',visits)

  return (
  // <ul>
  //  {visits && visits.map(v => (
  //   <li key={ v.id } >
  //    {v.visitName}
  //   </li>
  //  ))}
  // </ul>
 
 // const { data: visits, isLoading: loading, error } = useSWR<Visit[]>('/api/visits')
 // return (
 //  <ul>
 //   {visits && visits.map(v => (
 //    <li key={ v.id } >
 //     {v.visitName}
 //    </li>
 //   ))}
 //  </ul>
 // );


  <div className=" w-full mt-4">
    <h2 className=" text-lg font-bold text-center">{selectedCompany} 방문 기록</h2>
    { loadingVisits ? <PropagateLoader size ={ 6 } color = { "blue" }/> : (
      <ul className=" mt-2">
        { visits?.length ? visits.map((visit) => (
          <li key={visit.id} className=" border-b p-2">
            <p><strong>{visit.visitName}</strong> - {visit.visitedAt}</p> 
            <p>간호사: {visit.nurseName}, 상담 수: {visit.numCnslts}</p>
          </li>
        )) : <p className=" text-center text-gray-500">방문 기록이 없습니다.</p> }
      </ul>
    )}
  </div>

);

  }



