// app/company/page.tsx
"use client";
import CompanyBarPage from "@/components/CompanyBar";
import CompanyCreatePage from "./new/page";
import { useCompany } from "@/context/CompanyContext";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function CompanyMainPage() {
  const { selectedCompany } = useCompany();

  const router = useRouter();

  return (
    <section className=" w-full max-xl: flex flex-col items-center mt-6">
      <Button
        text="회사 신규 입력"
        onClick={() => router.push(`/company/new/`)}
      />
      <CompanyBarPage />
      {!selectedCompany ? (
        <div className="flex justify-center">
          <CompanyCreatePage />
        </div>
      ) : (
        <div className="p-4 border rounded shadow">
          <h2 className="text-lg font-bold">
            {selectedCompany?.companyName} 정보
          </h2>
          <p>회사명: {selectedCompany.companyName}</p>
          <p>회사고유번호: {selectedCompany.companyId}</p>
          <p>주소: {selectedCompany.address}</p>
          <p>우편번호: {selectedCompany.zipCode}</p>
          <p>전화번호: {selectedCompany.telNumber}</p>
          <p>사원 수: {selectedCompany.numEmployees}</p>
          <p>관리자명: {selectedCompany.managerName}</p>
          <p>계약 여부: {selectedCompany.isContract ? "예" : "아니오"}</p>
          {/* 향후 수정 기능 여기에 추가 */}
          <Button
            text="회사 정보 수정"
            onClick={() => router.push(`/company/update/`)}
          />
        </div>
      )}
    </section>
  );
}
