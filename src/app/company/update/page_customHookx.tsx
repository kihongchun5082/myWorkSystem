"use client";
import { useState, useEffect, useRef, ChangeEvent } from "react";
import Image from "next/image";
import Script from "next/script";
import { useCompany } from "@/context/CompanyContext";
import { urlFor } from "@/lib/sanityImage";

export default function CompanyUpdatePage() {
  const { selectedCompany } = useCompany();

  type CompanyFormType = {
    companyName: string;
    companyId: string;
    address: string;
    zipCode: string;
    telNumber: string;
    numEmployees: string;
    managerName: string;
    isContract: boolean;
    image: string | { asset: { _ref: string } } | null;
  };
  const [form, setForm] = useState<CompanyFormType>({
    companyName: "",
    companyId: "",
    address: "",
    zipCode: "",
    telNumber: "",
    numEmployees: "",
    managerName: "",
    isContract: false,
    image: null,
  });
  const [logo, setLogo] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectedCompany)
      setForm({
        ...selectedCompany,
        isContract: selectedCompany.isContract ?? false,
      });
  }, [selectedCompany]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setLogo(file);
  };

  const handleUpdate = async () => {
    if (!selectedCompany) return;
    const formData = new FormData();

    Object.entries(form).forEach(([key, val]) => {
      if (typeof val === "boolean") {
        formData.append(key, val.toString());
      } else if (typeof val === "string") {
        formData.append(key, val);
      } else if (val === null || val === undefined) {
        formData.append(key, "");
      } else {
        console.warn(`⚠️ ${key} 필드는 예상치 못한 타입입니다:`, val);
      }
    });
    if (logo) formData.append("logo", logo);
    formData.append("_id", selectedCompany._id);

    const res = await fetch("/api/companies/update", {
      method: "PATCH",
      body: formData,
    });
    if (res.ok) alert("수정 완료");
    else alert("수정 실패");
  };

  const searchAddress = () => {
    if (typeof window !== "undefined" && (window as any).daum?.Postcode) {
      console.log(
        "(window as any).daum?.Postcode: ",
        (window as any).daum?.Postcode
      );
      new (window as any).daum.Postcode({
        oncomplete: function (data: any) {
          setForm((prev) => ({
            ...prev,
            address: data.address,
            zipCode: data.zonecode,
          }));
        },
      }).open();
    } else {
      console.log(
        "(window as any).daum?.Postcode: ",
        (window as any).daum?.Postcode
      );
      alert("주소 검색 스크립트가 아직 로드되지 않았습니다.");
    }
  };

  return (
    <section className=" w-full p-4 space-y-4">
      <Script
        src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        strategy="beforeInteractive"
      />

      <h2 className="text-xl font-bold">회사 정보 수정</h2>
      {selectedCompany && (
        <>
          <div className=" w-full flex flex-col items-center">
            <input
              name="companyName"
              placeholder="회사명"
              value={form.companyName ?? ""}
              onChange={handleChange}
              className="border p-2 w-full"
            />
            <input
              name="companyId"
              placeholder="회사고유번호"
              value={form.companyId ?? ""}
              onChange={handleChange}
              className="border p-2 w-full"
            />
            <input
              name="telNumber"
              placeholder="전화번호"
              value={form.telNumber ?? ""}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>

          <div className=" w-full flex gap-2">
            <input
              name="address"
              placeholder="주소"
              value={form.address}
              onChange={handleChange ?? ""}
              className="border p-2 w-full"
            />
            <button onClick={searchAddress} className="bg-gray-200 px-2">
              주소 찾기
            </button>
            <input
              name="zipCode"
              placeholder="우편번호"
              value={form.zipCode}
              onChange={handleChange ?? ""}
              className="border p-2 w-32"
            />
          </div>

          <input
            name="numEmployees"
            placeholder="사원 수"
            value={form.numEmployees ?? ""}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          <input
            name="managerName"
            placeholder="관리자명"
            value={form.managerName ?? ""}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isContract"
              checked={form.isContract}
              onChange={handleChange}
            />{" "}
            계약 중
          </label>

          <div className="border rounded p-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              ref={fileInputRef}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-sm text-blue-600 underline"
            >
              로고 이미지 선택
            </button>
            {logo ? (
              <div className="mt-2">
                <Image
                  src={URL.createObjectURL(logo)}
                  alt="로고 미리보기"
                  width={120}
                  height={120}
                  className="rounded border"
                />
              </div>
            ) : (
              form.image &&
              typeof form.image === "object" && (
                <Image
                  src={urlFor(form.image).width(120).url()}
                  alt="기존 회사 로고"
                  width={120}
                  height={120}
                  className="rounded border"
                />
              )
            )}
          </div>

          <button
            onClick={handleUpdate}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            수정하기
          </button>
        </>
      )}
    </section>
  );
}
