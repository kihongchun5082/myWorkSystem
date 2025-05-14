import { useCompany } from "@/context/CompanyContext";

export type Props = {
 visitId: string;
}
export default function NewPhotoimagePage({ visitId }: Props) {
 const { selectedCompany } = useCompany();
 
 return (
  <div>
   
  </div>
 );
}

