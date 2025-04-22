'use client'

import { EmployeeResults } from "@/model/employee";

type Props = {
  consultResults: EmployeeResults[];
};

export default function EmployeeConsultsProfile({ consultResults }: Props) {
  if (!consultResults.length) return null;

  const { companyName, name, birthYear, sex } = consultResults[0];
  const currentYear = new Date().getFullYear();
  const age = birthYear ? currentYear - Number(birthYear) : undefined;

  return (
    <div className="p-4">
      {/* 🔹 상단 정보 (카드 바깥) */}
      <div className="mb-4 text-sm text-gray-700 font-semibold">
        📌 {companyName} / {name} / {birthYear}년생 / {sex === "M" ? "남" : sex === "F" ? "여" : "기타"} / 만 {age}세
      </div>

      {/* 🔸 방문별 카드 */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {consultResults.map((consult, index) => {
          const fieldsToShow = [
            { label: "혈압", value: consult.bp },
            { label: "검진 시 혈압", value: consult.bpAtScreen },
            { label: "공복 혈당", value: consult.fbsAtScreen },
            { label: "당화 혈색소", value: consult.hbA1C },
            { label: "식후 2시간 혈당", value: consult.pp2hrBs },
            { label: "고혈압 약 복용 여부", value: consult.isHtMed ? "복용" : "" },
            { label: "당뇨병 약 복용 여부", value: consult.isDmMed ? "복용" : "" },
            { label: "고지혈증 약 복용 여부", value: consult.isCholMed ? "복용" : "" },
            { label: "허리둘레(cm)", value: consult.wc },
            { label: "키(cm)", value: consult.height },
            { label: "몸무게(kg)", value: consult.weight },
            { label: "BMI", value: consult.bmi },
            { label: "혈색소", value: consult.hb },
            { label: "간기능 패널", value: consult.lft },
            { label: "지방 패널", value: consult.lipidPanel },
            { label: "단백뇨(+)", value: consult.urineProtein },
            { label: "흡연량(개피)", value: consult.smoking },
            { label: "음주량(병/주)", value: consult.drinking },
            { label: "운동 빈도(회/주)", value: consult.exercise },
            { label: "상담 내용", value: consult.comments },
          ];

          const visibleFields = fieldsToShow.filter(
            field => field.value !== null && field.value !== undefined && field.value !== ""
          );

          return (
            <div
              key={index}
              className="border rounded-xl shadow-md p-4 bg-white hover:shadow-lg transition-shadow duration-300"
            >
              {/* 카드 헤더 - 방문날짜 */}
              <h3 className="text-md font-bold text-blue-700 mb-3">
                📅 방문 ID: {consult._id}
              </h3>

              {/* 필드 항목들 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                {visibleFields.map((field, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-gray-600">{field.label}</span>
                    <span className="text-gray-900">{field.value}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
