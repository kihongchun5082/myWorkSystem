"use client";

import { ConsultResults } from "@/model/employee";

type Props = {
  consultResults: ConsultResults;
};

export default function EmployeeConsultCard({ consultResults }: Props) {
  const fieldsToShow = [
    { label: "혈압", value: consultResults.bp },
    { label: "검진 시 혈압", value: consultResults.bpAtScreen },
    { label: "공복 혈당", value: consultResults.fbsAtScreen },
    { label: "당화 혈색소", value: consultResults.hbA1C },
    { label: "식후 2시간 혈당", value: consultResults.pp2hrBs },
    { label: "고혈압 약 복용 여부", value: consultResults.isHtMed ? "복용" : "" },
    { label: "당뇨병 약 복용 여부", value: consultResults.isDmMed ? "복용" : "" },
    { label: "고지혈증 약 복용 여부", value: consultResults.isCholMed ? "복용" : "" },
    { label: "허리둘레(cm)", value: consultResults.wc },
    { label: "키(cm)", value: consultResults.height },
    { label: "몸무게(kg)", value: consultResults.weight },
    { label: "BMI", value: consultResults.bmi },
    { label: "혈색소", value: consultResults.hb },
    { label: "간기능 패널", value: consultResults.lft },
    { label: "지방 패널", value: consultResults.lipidPanel },
    { label: "단백뇨(+)", value: consultResults.urineProtein },
    { label: "흡연량(개피)", value: consultResults.smoking },
    { label: "음주량(병/주)", value: consultResults.drinking },
    { label: "운동 빈도(회/주)", value: consultResults.exercise },
    // { label: "상담 내용", value: consultResults.comments },
  ];

  const visibleFields = fieldsToShow.filter(
    (field) =>
      field.value !== null && field.value !== undefined && field.value !== ""
  );

  const comments = consultResults.comments;

  return (
    <div className=" border-3 border-amber-700 space-y-4">
      <section className=" grid grid-cols-3 sm:grid-cols-4 gap-x-5 gap-y-1 max-h-[400px] overflow-y-auto pr-1 ">
      {visibleFields.map((field, index) => (
        <div
          key={index} className="flex justify-between items-center"
        >
          <h3 className="text-gray-700 text-base font-medium">{field.label}: </h3>
          <p className="text-gray-900 text-sm">{field.value}</p>
        </div>
      ))}
    </section>  
    {comments && (
      <div className="mt-2 border-t">
        <h3 className="text-gray-700 font-semibold mb-1">상담 내용:</h3>
        <p className="text-gray-900  text-sm whitespace-pre-line break-words">{comments}</p>
      </div>
    )}
    </div>
  );
}
