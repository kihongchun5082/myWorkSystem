'use client'
import { createContext, ReactNode, useContext, useState } from "react";

interface CompanyContextType {
 selectedCompany: string | null;
 setSelectedCompany: (company: string |null) => void
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined)

export function CompanyProvider({ children }: { children: ReactNode}) {
 
 const [selectedCompany, setSelectedCompany] = useState<string | null>(null) 

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
