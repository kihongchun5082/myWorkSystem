'use client'
import { Visit } from "@/model/visit";
import useSWR from "swr";

export default function VisitListPage() {
 const { data: visits, isLoading: loading, error } = useSWR<Visit[]>('/api/visits')
 return (
  <ul>
   {visits && visits.map(v => (
    <li key={ v.id } >
     {v.visitName}
    </li>
   ))}
  </ul>
 );
}

