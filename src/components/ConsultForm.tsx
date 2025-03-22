"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ConsultForm({ visitId }: { visitId: string }) {
  const [formData, setFormData] = useState({
    employeeName: "",
    birthYear: "",
    gender: "",
    age: "",
    bp: "",
    bpAtScreen: "",
    fbsAtScreen: "",
    hbA1C: "",
    pp2hrBs: "",
    isHtMed: false,
    isDmMed: false,
    isCholMed: false,
    isHtFamHx: false,
    isDmFamHx: false,
    isCholFamHx: false,
    wc: "",
    height: "",
    weight: "",
    bmi: "",
    hb: "",
    lft: "",
    cholPanel: "",
    urinProtein: "",
    smoking: "",
    drinking: "",
    exercise: "",
    comments: "",
  });

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox" && e.target instanceof HTMLInputElement) {
      setFormData({
        ...formData,
        [name]: e.target.checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/consults`, {
      method: "POST",
      body: JSON.stringify({ ...formData, whichVisit: visitId }),
      headers: { "Content-Type": "application/json" },
    });
    router.push(`/visits`);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 ml-2">
      <h2 className="text-lg font-bold">상담 결과  입력</h2>
      <div>
        <fieldset className="flex flex-col justify-between md:flex-row  ">
          {/* <label htmlFor="employeeName">근로자 이름</label> */}
          <input
            type="text"
            id="employeeName"
            name="employeeName"
            placeholder="근로자 이름"
            size={10}
            onChange={handleChange}
            required
          />
          {/* <label htmlFor="birthYear">출생연도</label> */}
          <input
            type="text"
            id="birthYear"
            name="birthYear"
            placeholder="출생 연도"
            size={10}
            onChange={handleChange}
            required
          />
          {/* <label htmlFor="gender">성별</label> */}
          <select name="gender" className=" mr-5" onChange={handleChange}>
            <option value="">성별 선택</option>
            <option value="M">남성</option>
            <option value="F">여성</option>
          </select>
  
          {/* <label htmlFor="age">나이</label> */}
          <input
            type="text"
            id="age"
            name="age"
            placeholder="나이"
            size={10}
            onChange={handleChange}
          />
        </fieldset>
      </div>
      <fieldset className="flex flex-col justify-between md:flex-row ">
        {/* <label htmlFor="bp">혈압</label> */}
        <input
          type="text"
          id="bp"
          name="bp"
          placeholder="혈압"
          size={10}
          onChange={handleChange}
        />
        {/* <label htmlFor="employeeName">검진 시 혈압</label> */}
        <input
          type="text"
          id="bpAtScreen"
          name="bpAtScreen"
          placeholder="검진시혈압"
          size={10}
          onChange={handleChange}
        />
      </fieldset>
      <fieldset  className="flex flex-col justify-between md:flex-row">
        {/* <label htmlFor="employeeName">공복혈당</label> */}
        <input
          type="text"
          id="fbsAtScreen"
          name="fbsAtScreen"
          placeholder="공복혈당"
          size={10}
          onChange={handleChange}
          />
        {/* <label htmlFor="employeeName">당화혈색소</label> */}
        <input
          type="text"
          id="hbA1C"
          name="hbA1C"
          placeholder="당화혈색소"
          size={10}
          onChange={handleChange}
          />
        {/* <label htmlFor="employeeName">식후2시간혈당</label> */}
        <input
          type="text"
          id="PP2hrBS"
          name="PP2hrBS"
          placeholder="식후2시간혈당"
          size={10}
          onChange={handleChange}
          />
      </fieldset>
      
      <div className=" flex-col 
      md:flex md:flex-row md:justify-center">
      <fieldset className=" border-1 border-solid border-indigo-300 px-2 md:mr-7">
          <legend className=" text-indigo-500 text-sm font-bold ">투약 중인 약</legend>
          <div>
            <input type="checkbox" id="isHtMed" name="isHtMed" />
            <label htmlFor="isHtMed">고혈압</label>
          </div>
          <div>
            <input type="checkbox" id="isDmMed" name="isDmMed"  />
            <label htmlFor="isDmMed">당뇨병</label>
          </div>
          <div>
            <input type="checkbox" id="isCholMed" name="isCholMed"  />
            <label htmlFor="isCholMed">고지혈증</label>
          </div>
        </fieldset>
        <fieldset className=" border-1 border-solid border-indigo-300 px-2">
          <legend className=" text-indigo-500 text-sm font-bold">가족력</legend>
          <div>
            <input type="checkbox" id="isHtFamHx" name="isHtFamHx" />
            <label htmlFor="isHtFamHx">고혈압</label>
          </div>
          <div>
            <input type="checkbox" id="isDmFamHx" name="isDmFamHx"  />
            <label htmlFor="isDmFamHx">당뇨병</label>
          </div>
          <div>
            <input type="checkbox" id="isCholFamHx" name="isCholFamHx"  />
            <label htmlFor="isCholFamHx">고지혈증</label>
          </div>
        </fieldset>
      </div>
      <fieldset className="flex flex-col justify-between md:flex-row  ">
        {/* <label htmlFor="WC">허리둘레</label> */}
        <input
          type="text"
          id="WC"
          name="WC"
          placeholder="허리둘레(cm)"
          size={10}
          onChange={handleChange}
        />
        {/* <label htmlFor="employeeName">키</label> */}
        <input
          type="text"
          id="height"
          name="height"
          placeholder="키(cm)"
          size={10}
          onChange={handleChange}
        />
        {/* <label htmlFor="employeeName">몸무게</label> */}
        <input
          type="text"
          id="weight"
          name="weight"
          placeholder="몸무게(kg)"
          size={10}
          onChange={handleChange}
        />
        {/* <label htmlFor="employeeName">체질량지수</label> */}
        <input
          type="text"
          id="BMI"
          name="BMI"
          placeholder="체질량지수"
          size={10}
          onChange={handleChange}
        />
      </fieldset>
      <fieldset className="flex flex-col justify-between md:flex-row">
        <input
          type="text"
          id="Hb"
          name="Hb"
          placeholder="혈색소"
          size={6}
          onChange={handleChange}
        />
        {/* <label htmlFor="employeeName">간기능패널</label> */}
        <input
          type="text"
          id="LFT"
          name="LFT"
          placeholder="간기능패널"
          size={12}
          onChange={handleChange}
        />
        {/* <label htmlFor="employeeName">지방패널</label> */}
        <input
          type="text"
          id="lipidPanel"
          name="lipidPanel"
          placeholder="지방패널"
          size={15}
          onChange={handleChange}
        />
        {/* <label htmlFor="employeeName">단백뇨</label> */}
        <input
          type="text"
          id="urineProtein"
          name="urineProtein"
          placeholder="단백뇨(+)"
          size={6}
          onChange={handleChange}
        />
      </fieldset>
      <fieldset  className="flex flex-col justify-between md:flex-row">
        {/* <label htmlFor="employeeName">흡연</label> */}
        <input
          type="text"
          id="smoking"
          name="smoking"
          placeholder="흡연(개피)"
          size={10}
          onChange={handleChange}
        />
        {/* <label htmlFor="employeeName">음주</label> */}
        <input
          type="text"
          id="drinking"
          name="drinkin"
          placeholder="음주(병/주)"
          size={10}
          onChange={handleChange}
        />
        {/* <label htmlFor="employeeName">운동</label> */}
        <input
          type="text"
          id="exercise"
          name="exercise"
          placeholder="운동(회/주)"
          size={10}
          onChange={handleChange}
        />
        
        {/* <label htmlFor="employeeName">상담 내용</label> */}
        <textarea
          id="comments"
          name="comments"
          placeholder="상담 내용"
          onChange={handleChange}
        />
      </fieldset>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        저장
      </button>
    </form>
  );
}
