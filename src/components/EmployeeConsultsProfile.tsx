"use client";

import { ConsultResults, Employee } from "@/model/employee";
import EmployeeConsultCard from "./EmployeeConsultCard";

type Props = {
  employee: Employee;
  consultResults: ConsultResults[];
};

export default function EmployeeConsultsProfile({
  employee,
  consultResults,
}: Props) {
  
  // console.log("employee_EmployeeConsultsProfile: ", employee);

  // console.log("consultResults_EmployeeConsultsProfile: ", consultResults);

  return (
    <div className="border rounded-2xl shadow-lg p-5 bg-white hover:shadow-xl transition-shadow duration-300">
      <div className="mb-4 border-b pb-2">
        {/* 헤더 */}
        <h2 className="text-xl font-semibold text-gray-800">
          {employee.name} ({employee.birthYear})
        </h2>
        <p className="text-sm text-gray-500">
          성별:{" "}
          {employee.sex === "M"
            ? "남성"
            : employee.sex === "F"
            ? "여성"
            : "기타"}
        </p>
      </div>

      {/* 카드 */}
      <ul className=" list-decimal mt-2">
        {consultResults && consultResults.length > 0 ? (
          consultResults.map((consult) => (
            <li key={consult.id} className=" border-b p-2">
              <span className=" shadow-xl font-sans font-normal font-stretch-200%">
                {consult.visitInfo?.visitedAt ?? "방문일자 없음"}
              </span>
              <EmployeeConsultCard consultResults={consult} />
            </li>
          ))
        ) : (
          <p className=" text-center text-gray-500">방문 기록이 없습니다.</p>
        )}
      </ul>
    </div>
  );
}
