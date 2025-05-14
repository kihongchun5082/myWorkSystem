"use client";

import { useCompany } from "@/context/CompanyContext";
import { useState } from "react";
import useSWR from "swr";
import CompanyBarPage from "./CompanyBar";
import useDebounce from "@/hooks/useDebounce";
import EmployeeCardPage from "./EmployeeCard";

export default function EmployeeSearchPage() {
  const { selectedCompany } = useCompany();
  const [employeeName, setEmployeeName] = useState("");
  // const debouncedEmployName = useDebounce(employeeName);
  const [birthYear, setBirYear] = useState("");
  // const debouncedBirthYear = useDebounce(birthYear);
  const [searchTrigger, setSearchTrigger] = useState(false);
  const shouldFetch = selectedCompany && searchTrigger;
  const query = selectedCompany
    ? `/api/employee/${selectedCompany._id}${
        employeeName && birthYear
          ? `?employeeName=${employeeName}&birthYear=${birthYear}`
          : ""
      }`
    : null;
  const {
    data: employees,
    isLoading,
    error,
  } = useSWR(shouldFetch ? query : null);

  console.log("employees_component/EmployeeSearch: ", employees);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCompany) {
      alert("회사를 선택하세요.");
      return;
    }
    if ((employeeName && !birthYear) || (!employeeName && birthYear)) {
      alert("이름과 출생연도 둘 다 입력하거나 둘 다 비워두세요.");
      return;
    }
    setSearchTrigger(true); // 🔥 검색 시작!
  };

  return (
    <section className=" w-full flex flex-col md:flex-row max-w-4xl p-4">
      {/* <div className=" w-full basis-3/4  min-w-0  bg-blue-100"> */}
        <CompanyBarPage />
        <p className=" text-lg font-bold text-center">
        {selectedCompany?.companyName} 상담 근로자
        </p>
        <form onSubmit={handleSearch} className=" w-full mb-4 space-y-4">
          {/* <h2 className=" text-lg font-bold">근로자 정보 확인</h2> */}
          <input
            type="text"
            placeholder="근로자 이름"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            className=" text-xl p-3 outline-none border border-gray-400"
          />
          <input
            type="text"
            placeholder="출생연도"
            value={birthYear}
            onChange={(e) => setBirYear(e.target.value)}
            className=" text-xl p-3 outline-none border border-gray-400"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            근로자 검색
          </button>
        </form>

        {/* 🔥 결과 보여주기 */}
        {error && <p>검색 오류가 발생했습니다.</p>}
        {isLoading && <p>검색 중 ...</p>}
        {!isLoading && !error && employees?.length === 0 && (
          <p>찾는 근로자가 없습니다.</p>
        )}
        <ul className=" w-full p-4">
        {selectedCompany && employees &&
          employees.map((emp: any) => (
            <li key={emp.id}>
              <EmployeeCardPage employee={emp}
               />
            </li>
        ))}
        </ul>
      {/* </div> */}
    </section>
  );
}
