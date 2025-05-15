"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ConsultForm({
  visitId,
  company,
  visitDate,
}: {
  visitId: string;
  company: string;
  visitDate: string;
}) {

  console.log("seletedCompany_conponent/ConsultForm: ", company);
  console.log("visitId_conponent/ConsultForm: ", visitId);
  console.log("visitDate_conponent/ConsultForm: ", visitDate);

  const router = useRouter();
  const [employeeName, setEmployeeName] = useState("");
  const [birthYear, setBirYear] = useState("");
  const [formData, setFormData] = useState<any>({});  
  const [isVerified, setIsVerified] = useState(false);
  const [isAlreadyEntered, setIsAlreadyEntered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); // ⭐ 추가
  const [isEditMode, setIsEditMode] = useState(false); // ⭐ 추가
  const [consultId, setConsultId] = useState<string | null>(null); // ⭐ 추가

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!employeeName || !birthYear) {
      alert("근로자 이름과 출생연도를 입력하세요.");
      return;
    }
    try {
      const res = await fetch(
        `/api/consults/${company}/${visitId}?employeeName=${employeeName}&birthYear=${birthYear}`
      );

      console.log("res_components/ConsultForm: ", res);

      const existingConsult = await res.json();
      // if (res.ok) {
      // const existingConsult = await res.json();
      
      console.log("existingConsult_component/ConsultForm: ", existingConsult);

      if (existingConsult) {
        // alert("⚠️ 이미 입력된 상담입니다.");
        setIsAlreadyEntered(true);
        setConsultId(existingConsult._id || existingConsult.id); //consult id 저장
      } else {
        // 입력되지 않은 경우
        setIsVerified(true);
        setFormData({ employeeName, birthYear });
      }
    } catch (error) {
      console.error(error);
      alert("서버 오류 발생");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev: any) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const method = consultId ? "PATCH" : "POST"; //consultId 있으면 수정
      const url = consultId
        ? `/api/consults/${company}/${visitId}/${consultId}`
        : `/api/consults/`;
      const whichCompany = consultId ? {
        _type: "reference",
        _ref: company
      } : company;
      const saveRes = await fetch(url, {
        method: method,
        body: JSON.stringify({
          ...formData,
          whichCompany: whichCompany,
          visitId: visitId,
          employeeName: employeeName,
          birthYear: birthYear,
        }),
        headers: { "Content-Type": "application/json" },
      });

      console.log("saveRes_component/consultForm", saveRes);

      if (!saveRes.ok) {
        throw new Error("상담 저장 실패");
      }
      alert("상담 저장 완료");
      // 🔥 저장 후 다시 '상담 시작' 초기화 화면으로
      setEmployeeName("");
      setBirYear("");
      setFormData({});
      setIsVerified(false);
      setIsAlreadyEntered(false);
      setIsEditMode(false);
      setConsultId(null);

      // router.push(`/visits/${company}/${visitId}`)
      router.replace(`/visits/${company}/${visitId}`);
      router.refresh();
      // window.location.reload()
      // setIsVerified(false);
      // setEmployeeName("");
      // setBirYear("");
      // setFormData({});
      // setIsAlreadyEntered(false);
      // ✅ 필요하면 router.refresh();
      // router.refresh();
      // setIsSubmitted(true);
    } catch (error) {
      console.error(error);
      alert("저장 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleNextConsult = () => {
    // 버튼 누르면 상태 초기화
    setIsVerified(false);
    setEmployeeName("");
    setBirYear("");
    setFormData({});
    setIsAlreadyEntered(false);
    setIsSubmitted(false); // 초기화
    // router.refresh();  // 필요시 사용
  };

  const handleEditStart = async () => {
    try {
      const res = await fetch(
        `/api/consults/${company}/${visitId}?employeeName=${employeeName}&birthYear=${birthYear}`
      );

      const existingConsult = await res.json();

      console.log("existingConsult_component/ConsultForm: ", existingConsult);

      if (existingConsult) {
        setConsultId(existingConsult._id); //consult id 저장
        setIsEditMode(true); //수정모드 on
        setIsVerified(true); //Form 보여주기
        // setFormData(existingConsult); //기존 데이터로 일괄 채움. 이때 consult 데이터 구조가 formData랑 100% 같아야 해. 필드 이름 다 똑같아야 함
        //기존 데이터로 하나하나
        setEmployeeName(existingConsult.employeeName || "");
        setBirYear(existingConsult.birthYear || "");
        setFormData({
          employeeName: existingConsult.employeeName || "",
          birthYear: existingConsult.birthYear || "",
          gender: existingConsult.gender || "",
          age: existingConsult.age || "",
          bp: existingConsult.bp || "",
          bpAtScreen: existingConsult.bpAtScreen || "",
          fbsAtScreen: existingConsult.fbsAtScreen || "",
          hbA1C: existingConsult.hbA1C || "",
          pp2hrBs: existingConsult.pp2hrBs || "",
          isHtMed: existingConsult.isHtMed || false,
          isDmMed: existingConsult.isDmMed || false,
          isCholMed: existingConsult.isCholMed || false,
          isHtFamHx: existingConsult.isHtFamHx || false,
          isDmFamHx: existingConsult.isDmFamHx || false,
          isCholFamHx: existingConsult.isCholFamHx || false,
          wc: existingConsult.wc || "",
          height: existingConsult.height || "",
          weight: existingConsult.weight || "",
          bmi: existingConsult.bmi || "",
          hb: existingConsult.hb || "",
          lft: existingConsult.lft || "",
          lipidPanel: existingConsult.lipidPanel || "",
          urineProtein: existingConsult.urineProtein || "",
          smoking: existingConsult.smoking || "",
          drinking: existingConsult.drinking || "",
          exercise: existingConsult.exercise || "",
        });
      }
    } catch (error) {
      console.error(error);
      alert("수정 데이터 불러오기 실패");
    }
  };

  return (
    <div className="mt-4 ml-2">
      {!isVerified && !isAlreadyEntered && (
        <form onSubmit={handleVerify} className="space-y-4">
          <h2 className=" text-lg font-bold">근로자 정보 확인</h2>
          <input
            type="text"
            placeholder="근로자 이름"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            required
            className="border p-2"
          />
          <input
            type="text"
            placeholder="출생연도"
            value={birthYear}
            onChange={(e) => setBirYear(e.target.value)}
            required
            className="border p-2"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            상담 시작
          </button>
        </form>
      )}

      {isAlreadyEntered && !isEditMode && (
        <div className=" text-center mt-4">
          <p className=" text-red-500 font-bold">이미 입력한 상담입니다.</p>
          <button
            onClick={handleEditStart}
            className=" bg-yellow-400 text-white px-4 py-2 rounded mt-2"
          >
            수정
          </button>
          <button
            onClick={handleNextConsult}
            className=" bg-blue-500 text-white px-4 py-2 rounded mt-2"
          >
            다음 상담자 입력
          </button>
        </div>
      )}
      {isVerified && !isSubmitted && (
        <>
          <div className="text-gray-700 mb-4">
            <p>
              <strong>방문일:</strong> {visitDate}
            </p>{" "}
            {/* 날짜는 props로 넘기면 더 좋음 */}
            <p>
              <strong>근로자 이름:</strong> {employeeName}
            </p>
            <p>
              <strong>출생연도:</strong> {birthYear}
            </p>
          </div>
          <form onSubmit={handleSubmit} className=" space-y-4 mt-6">
            <h2 className=" text-lg font-bold">상담 결과 입력</h2>
            {/* 상담 입력 필드들 */}
            <div>
              <fieldset className="flex flex-col justify-between md:flex-row  ">
                {/* <label htmlFor="gender">성별</label> */}
                <select
                  name="gender"
                  className=" mr-5"
                  value={formData.gender || ""}
                  onChange={handleChange}
                >
                  <option value="">성별 선택</option>
                  <option value="M">남성</option>
                  <option value="F">여성</option>
                </select>

                {/* <label htmlFor="age">나이</label> */}
                <input
                  type="text"
                  // id="age"
                  name="age"
                  placeholder="나이"
                  size={10}
                  value={formData.age || ""} // 🔥 value 추가
                  onChange={handleChange}
                />
              </fieldset>
            </div>
            <fieldset className="flex flex-col justify-between md:flex-row ">
              {/* <label htmlFor="bp">혈압</label> */}
              <input
                type="text"
                // id="bp"
                name="bp"
                placeholder="혈압"
                size={10}
                value={formData.bp || ""} // 🔥 value 추가
                onChange={handleChange}
              />
              {/* <label htmlFor="employeeName">검진 시 혈압</label> */}
              <input
                type="text"
                // id="bpAtScreen"
                name="bpAtScreen"
                placeholder="검진시혈압"
                size={10}
                value={formData.bpAtScreen || ""} // 🔥 value 추가
                onChange={handleChange}
              />
            </fieldset>
            <fieldset className="flex flex-col justify-between md:flex-row">
              {/* <label htmlFor="employeeName">공복혈당</label> */}
              <input
                type="text"
                // id="fbsAtScreen"
                name="fbsAtScreen"
                placeholder="공복혈당"
                size={10}
                value={formData.fbsAtScreen || ""}
                onChange={handleChange}
              />
              {/* <label htmlFor="employeeName">당화혈색소</label> */}
              <input
                type="text"
                // id="hbA1C"
                name="hbA1C"
                placeholder="당화혈색소"
                size={10}
                value={formData.hbA1c || ""}
                onChange={handleChange}
              />
              {/* <label htmlFor="employeeName">식후2시간혈당</label> */}
              <input
                type="text"
                // id="PP2hrBS"
                name="pp2hrBs"
                placeholder="식후2시간혈당"
                size={10}
                value={formData.pp2hrBs || ""}
                onChange={handleChange}
              />
            </fieldset>

            <div
              className=" flex-col 
      md:flex md:flex-row md:justify-center"
            >
              <fieldset className=" border-1 border-solid border-indigo-300 px-2 md:mr-7">
                <legend className=" text-indigo-500 text-sm font-bold ">
                  투약 중인 약
                </legend>
                <div>
                  <input
                    type="checkbox"
                    // id="isHtMed"
                    name="isHtMed"
                    checked={formData.isHtMed || ""}
                    onChange={handleChange}
                  />
                  <label htmlFor="isHtMed">고혈압</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    // id="isDmMed"
                    name="isDmMed"
                    checked={formData.isDmMed || ""}
                    onChange={handleChange}
                  />
                  <label htmlFor="isDmMed">당뇨병</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    // id="isCholMed"
                    name="isCholMed"
                    checked={formData.isCholMed || ""}
                    onChange={handleChange}
                  />
                  <label htmlFor="isCholMed">고지혈증</label>
                </div>
              </fieldset>
              <fieldset className=" border-1 border-solid border-indigo-300 px-2">
                <legend className=" text-indigo-500 text-sm font-bold">
                  가족력
                </legend>
                <div>
                  <input
                    type="checkbox"
                    // id="isHtFamHx"
                    name="isHtFamHx"
                    checked={formData.isHtFamHx || ""}
                    onChange={handleChange}
                  />
                  <label htmlFor="isHtFamHx">고혈압</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    // id="isDmFamHx"
                    name="isDmFamHx"
                    checked={formData.isDmFamHx || ""}
                    onChange={handleChange}
                  />
                  <label htmlFor="isDmFamHx">당뇨병</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    // id="isCholFamHx"
                    name="isCholFamHx"
                    checked={formData.isCholFamHx || ""}
                    onChange={handleChange}
                  />
                  <label htmlFor="isCholFamHx">고지혈증</label>
                </div>
              </fieldset>
            </div>
            <fieldset className="flex flex-col justify-between md:flex-row  ">
              {/* <label htmlFor="WC">허리둘레</label> */}
              <input
                type="text"
                // id="WC"
                name="wc"
                placeholder="허리둘레(cm)"
                size={10}
                value={formData.wc || ""}
                onChange={handleChange}
              />
              {/* <label htmlFor="employeeName">키</label> */}
              <input
                type="text"
                // id="height"
                name="height"
                placeholder="키(cm)"
                size={10}
                value={formData.height || ""}
                onChange={handleChange}
              />
              {/* <label htmlFor="employeeName">몸무게</label> */}
              <input
                type="text"
                // id="weight"
                name="weight"
                placeholder="몸무게(kg)"
                size={10}
                value={formData.weight || ""}
                onChange={handleChange}
              />
              {/* <label htmlFor="employeeName">체질량지수</label> */}
              <input
                type="text"
                // id="BMI"
                name="bmi"
                placeholder="체질량지수"
                size={10}
                value={formData.bmi || ""}
                onChange={handleChange}
              />
            </fieldset>
            <fieldset className="flex flex-col justify-between md:flex-row">
              <input
                type="text"
                // id="Hb"
                name="hb"
                placeholder="혈색소"
                size={6}
                value={formData.hb || ""}
                onChange={handleChange}
              />
              {/* <label htmlFor="employeeName">간기능패널</label> */}
              <input
                type="text"
                // id="LFT"
                name="lft"
                placeholder="간기능패널"
                size={12}
                value={formData.lft || ""}
                onChange={handleChange}
              />
              {/* <label htmlFor="employeeName">지방패널</label> */}
              <input
                type="text"
                // id="lipidPanel"
                name="lipidPanel"
                placeholder="지방패널"
                size={15}
                value={formData.lipidPanel || ""}
                onChange={handleChange}
              />
              {/* <label htmlFor="employeeName">단백뇨</label> */}
              <input
                type="text"
                // id="urineProtein"
                name="urineProtein"
                placeholder="단백뇨(+)"
                size={6}
                value={formData.urinePanel || ""}
                onChange={handleChange}
              />
            </fieldset>
            <fieldset className="flex flex-col justify-between md:flex-row">
              {/* <label htmlFor="employeeName">흡연</label> */}
              <input
                type="text"
                // id="smoking"
                name="smoking"
                placeholder="흡연(개피)"
                size={10}
                value={formData.smoking || ""}
                onChange={handleChange}
              />
              {/* <label htmlFor="employeeName">음주</label> */}
              <input
                type="text"
                // id="drinking"
                name="drinking"
                placeholder="음주(병/주)"
                size={10}
                value={formData.drinking || ""}
                onChange={handleChange}
              />
              {/* <label htmlFor="employeeName">운동</label> */}
              <input
                type="text"
                // id="exercise"
                name="exercise"
                placeholder="운동(회/주)"
                size={10}
                value={formData.exercise || ""}
                onChange={handleChange}
              />
              {/* <label htmlFor="employeeName">상담 내용</label> */}
              <textarea
                // id="comments"
                name="comments"
                placeholder="상담 내용"
                value={formData.comments || ""}
                onChange={handleChange}
              />
            </fieldset>

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
              disabled={isSubmitting}
            >
              {isSubmitting ? "저장 중 ..." : isEditMode ? "수정 저장" : "저장"}
            </button>
          </form>
        </>
      )}

      {isSubmitted && (
        // 3️⃣ 저장 완료 후 화면
        <div className="flex flex-col items-center space-y-4">
          <p className="text-green-600 font-bold">
            ✅ 상담 저장이 완료되었습니다!
          </p>
          <button
            onClick={handleNextConsult}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            ➡️ 다음 상담자 입력
          </button>
        </div>
      )}
    </div>
  );
}
