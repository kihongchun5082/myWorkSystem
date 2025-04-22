'use client'
import { Company } from "@/model/company";
import { createContext, ReactNode, useContext, useState } from "react";

interface CompanyContextType {
 selectedCompany: Company | null;
 setSelectedCompany: (company: Company |null) => void
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined)

export function CompanyProvider({ children }: { children: ReactNode}) {
 
 const [selectedCompany, setSelectedCompany] = useState<Company | null>(null) 

 return (
   <CompanyContext.Provider value={{ selectedCompany, setSelectedCompany }}>
    { children }
   </CompanyContext.Provider>
  );
}

export function useCompany() {
 const context = useContext(CompanyContext)
 if (!context) {
  throw new Error("useCompany must be used within a CompanyProvider")
 }
 return context
}
