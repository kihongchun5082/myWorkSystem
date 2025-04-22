'use client'

import { EmployeeResults } from "@/model/employee";

type Props = {
  consultResults: EmployeeResults[];
};

export default function EmployeeConsultsProfile({ consultResults }: Props) {
  const fieldsToShow = [
    { label: "혈압", value: consultResults[0].bp },
    { label: "검진 시 혈압", value: consultResults[0].bpAtScreen },
    { label: "공복 혈당", value: consultResults[0].fbsAtScreen },
    { label: "당화 혈색소", value: consultResults[0].hbA1C },
    { label: "식후 2시간 혈당", value: consultResults[0].pp2hrBs },
    { label: "고혈압 약 복용 여부", value: consultResults[0].isHtMed ? "복용" : "" },
    { label: "당뇨병 약 복용 여부", value: consultResults[0].isDmMed ? "복용" : "" },
    { label: "고지혈증 약 복용 여부", value: consultResults[0].isCholMed ? "복용" : "" },
    { label: "허리둘레(cm)", value: consultResults[0].wc },
    { label: "키(cm)", value: consultResults[0].height },
    { label: "몸무게(kg)", value: consultResults[0].weight },
    { label: "BMI", value: consultResults[0].bmi },
    { label: "혈색소", value: consultResults[0].hb },
    { label: "간기능 패널", value: consultResults[0].lft },
    { label: "지방 패널", value: consultResults[0].lipidPanel },
    { label: "단백뇨(+)", value: consultResults[0].urineProtein },
    { label: "흡연량(개피)", value: consultResults[0].smoking },
    { label: "음주량(병/주)", value: consultResults[0].drinking },
    { label: "운동 빈도(회/주)", value: consultResults[0].exercise },
    { label: "상담 내용", value: consultResults[0].comments },
  ];
  console.log('fieldsToShow_component/EmployeeConsultsProfile: ',fieldsToShow)

  // 값이 있는 항목만 보여줌
  const visibleFields = fieldsToShow.filter(field => field.value !== null && field.value !== undefined && field.value !== '');

  console.log('visibleFields_component/EmployeeConsultsProfile: ',visibleFields)

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
      {visibleFields.map((field, index) => (
        <div key={index} className=" flex border p-2 rounded-md shadow hover:shadow-md bg-white">
          <h3 className="font-bold text-gray-700 mb-2">{field.label}: </h3>
          <p className="text-gray-900">{field.value}</p>
        </div>
      ))}
    </section>
  );
}
