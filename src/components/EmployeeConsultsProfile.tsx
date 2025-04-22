'use client'

import { EmployeeResults } from "@/model/employee";

type Props = {
  consultResults: EmployeeResults[];
};

export default function EmployeeConsultsProfile({ consultResults }: Props) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
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

        const visibleFields = fieldsToShow.filter(field =>
          field.value !== null && field.value !== undefined && field.value !== ""
        );

        return (
          <div
            key={index}
            className="border rounded-2xl shadow-lg p-5 bg-white hover:shadow-xl transition-shadow duration-300"
          >
            {/* 카드 헤더 */}
            <div className="mb-4 border-b pb-2">
              <h2 className="text-xl font-semibold text-gray-800">
                {consult.name} ({consult.birthYear})
              </h2>
              <p className="text-sm text-gray-500">성별: {consult.sex === "M" ? "남성" : consult.sex === "F" ? "여성" : "기타"}</p>
            </div>

            {/* <p className="text-xs text-gray-400">ID: {consult.visitId}</p> */}

            {/* 항목 리스트 */}
            <div className=" border-4 border-amber-700 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 max-h-[400px] overflow-y-auto pr-2">
              {visibleFields.map((field, i) => (
                <div key={i} className="flex justify-between">
                  <span className="text-gray-600 text-sm font-medium">{field.label}</span>
                  <span className="text-gray-900 text-sm">{field.value}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
