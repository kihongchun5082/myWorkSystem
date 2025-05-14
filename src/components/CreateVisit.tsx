"use client";

import { useCompany } from "@/context/CompanyContext";
import { useState, useRef, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import CompanyBarPage from "./CompanyBar";
import { Company } from "@/model/company";
import FilesIcon from "./ui/icons/FilesIcon";
import Button from "./ui/Button";
import Image from "next/image";

export default function NewVisit() {
  const { selectedCompany, setSelectedCompany } = useCompany();

  console.log("selectedCompany_component/VisitCreate: ", selectedCompany);

  const router = useRouter();
  const [dragging, setDragging] = useState(false);
  const [visitedAt, setVisitedAt] = useState("");
  const [nurse, setNurse] = useState("");
  const [numberConsults, setNumberConsults] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const objectUrls = images.map((file) => URL.createObjectURL(file));
    return () => {
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.target.files ?? []);
    if (droppedFiles && droppedFiles[0]) {
      setImages((prev) => [...prev, ...droppedFiles]);

      console.log("droppedFiles[0]_component/VisitCreate: ", droppedFiles[0]);

    }
  };

  const handleDrag = (e: React.DragEvent) => {
    if (e.type === "dragenter") {
      setDragging(true);
    } else if (e.type === "dragleave") {
      setDragging(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const droppedFiles = Array.from(e.dataTransfer?.files);
    if (droppedFiles && droppedFiles[0]) {
      setImages((prev) => [...prev, ...droppedFiles]);
    }

    console.log("droppedFiles[0]_component/VisitCreate: ", droppedFiles[0]);

  };

  const handleUpload = async () => {
    if (!selectedCompany || !visitedAt || !nurse || !numberConsults) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("companyId", selectedCompany._id);
    formData.append("companyName", selectedCompany?.companyName);
    formData.append("visitedAt", visitedAt);
    formData.append("nurse", nurse);
    formData.append("numberConsults", numberConsults || "0");
    // formData.append("numberConsults", numberConsults.trim());
    images.forEach((image, idx) => {
      if (image instanceof File) {
        formData.append("images", image);

        console.log(`🖼️ 이미지[${idx}]`);
        console.log("📄 이름:", image.name);
        console.log("📦 타입:", image.type);
        console.log("📐 크기:", `${(image.size / 1024).toFixed(2)} KB`);
        
      }
    });

    // ✅ formData 내용 디버깅 출력
    console.log("📦 FormData 내용(formData_component/VisitCreate): ");
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(key, `(File) ${value.name}`);
      } else {
        console.log(key, value);
      }
    }

    try {
      const res = await fetch("/api/visits/new", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        //POST /api/visits/new 응답값에 visitId를 포함하도록
        const data = await res.json()
        const uploadedVisitId = data.visitId
        alert("업로드 완료");
        // 상태 초기화
        setVisitedAt("");
        setNurse("");
        setNumberConsults("");
        setImages([]);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        // 방문기록에 강조표시를 위해 localStorage에 ID 저장
        localStorage.setItem("highlightVisitId", uploadedVisitId);
         // 회사 선택 해제
        setSelectedCompany(null)
        router.refresh();
        // ✅ 스크롤 맨 위로 이동
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        alert("업로드 실패");
      }
    } catch (error) {
      console.error("업로드 중 오류", error);
      alert("서버 오류가 발생했습니다.");
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== indexToRemove));
  };
  

  return (
    <section className=" w-full max-xl: flex flex-col items-center mt-6">
      <CompanyBarPage />
      <h2 className="text-lg font-bold">
        "{selectedCompany?.companyName}" 방문 입력
      </h2>
      <form className=" w-full flex flex-col mt-2">
        {/* <div className=" outline-none text-lg border border-neutral-300"> */}
        <input
          type="date"
          value={visitedAt}
          onChange={(e) => setVisitedAt(e.target.value)}
          className="border p-2 rounded"
        />
        <select
          value={nurse}
          onChange={(e) => setNurse(e.target.value)}
          required
          className="border p-2 rounded w-full text-blue-300"
        >
          <option value="">간호사 선택</option>
          <option value="한혜진">한혜진</option>
          <option value="이미란">이미란</option>
          <option value="최재희">최재희</option>
          <option value="김수진">김수진</option>
          <option value="김영화">김영화</option>
          <option value="장선화">장선화</option>
          <option value="강민지">강민지</option>
        </select>

        <input
          type="number"
          name="numberConsults"
          placeholder="상담자 수"
          value={numberConsults}
          onChange={(e) => {
            const val = e.target.value;
            if (/^\d*$/.test(val)) { // 정수만 허용
              setNumberConsults(val);
            }
          }}
          min={0}
          step={1}
          className="border p-2 rounded"
        />
        {/* </div> */}
        {/* <div className="border-2 border-dashed border-gray-400 rounded p-4 text-center text-sm text-gray-500 bg-gray-50"> */}
        {/* 이미지 파일을 드래그하거나 클릭하세요 */}
        <input
          ref={fileInputRef}
          id="image-upload"
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleChange}
        />
        <label
          className={` w-full h-60 flex flex-col items-center justify-center ${
            !images[0] && " border-2 border-sky-500 border-dashed"
          }`}
          htmlFor="image-upload"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {dragging && (
            <div className="absolute inset-0 z-10 bg-sky-500/20 pointer-events-none" />
          )}
          {!images[0] && (
            <div className=" flex flex-col items-center pointer-events-none">
              <FilesIcon />
              <p>사진 이미지를 여기에 드래그 드롭하거나 클릭하세요.</p>
            </div>
          )}
          {/* {images.length > 0 && images[0] instanceof File && (
            <div className="relative w-full aspect-[4/5] rounded overflow-hidden border">
            <Image
              src={URL.createObjectURL(images[0])}
              alt="preview"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority
            />
          </div>          
          )} */}
          {images.length > 0 && (
            // <div className=" w-full flex flex-row justify-center items-center gap-2 p-2">
            <div className=" flex gap-2 m-2 overflow-auto  h-100 ml-2">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className="relative w-full aspect-[3/4] border rounded overflow-hidden"
                >
                  <Image
                    src={URL.createObjectURL(img)}
                    alt={`preview-${idx}`}
                    fill
                    // className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority
                    style={{ objectFit: "contain" }}
                    className="rounded-md object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs text-center p-1 truncate">
                    {img.name}
                  </div>
                  {/* ❌ 삭제 버튼 */}
                  <button
                    type="button"
                    title="삭제"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 text-sm flex items-center justify-center hover:bg-red-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </label>
        {/* </div> */}
        {/* <div
            onClick={() => fileInputRef.current?.click()}
            className="cursor-pointer mt-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded"
          >
            파일 선택
          </div> */}
      </form>

      {images.length > 0 && (
        <div className="mb-1 grid grid-cols-3 gap-2 mt-4">
          {images.map((img, idx) => (
            <div key={idx} className=" border p-0.5 text-xs truncate">
              {img.name}
            </div>
          ))}
        </div>
      )}
      {/* <Button text="제출" onClick={() => {}} /> */}

      <button
        onClick={handleUpload}
        // className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        className=" items-center rounded-sm border border-neutral-300 mt-4 px-4 py-2 bg-white text-neutral-500 cursor-pointer hover:bg-neutral-100 "
      >
        업로드하기
      </button>
    </section>
  );
}
