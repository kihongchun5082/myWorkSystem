"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCompany } from "@/context/CompanyContext";
import { urlFor } from "@/lib/sanityImage";
import useCompanyForm from "@/hooks/useCompanyForm";

export default function CompanyUpdatePage() {
  const { selectedCompany } = useCompany();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    form,
    logo,
    setForm,
    setLogo,
    handleChange,
    handleFileChange,
    resetForm
  } = useCompanyForm();

  useEffect(() => {
    if (selectedCompany)
      setForm({
        ...selectedCompany,
        isContract: selectedCompany.isContract ?? false,
      });
  }, [selectedCompany, setForm]);

  const searchAddress = () => {
    if (typeof window !== "undefined" && (window as any).daum?.Postcode) {
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
      alert("주소 검색 스크립트가 아직 로드되지 않았습니다.");
    }
  };

  const handleUpdate = async () => {
    if (!selectedCompany) return;

    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => {
      if (typeof val === "boolean") {
        formData.append(key, val.toString());
      } else if (typeof val === "string") {
        formData.append(key, val);
      } else if (val !== undefined && val !== null) {
        formData.append(key, String(val));
      } else {
        formData.append(key, "");
      }
    });
    if (logo) formData.append("logo", logo);
    formData.append("_id", selectedCompany._id);

    try {
      const res = await fetch("/api/companies/update", {
        method: "PATCH",
        body: formData,
      });

      if (res.ok) {
        alert("수정 완료");
        router.refresh();
      } else {
        const data = await res.json();
        alert(data?.error || "수정 실패");
      }
    } catch (err) {
      console.error("수정 중 오류 발생:", err);
      alert("서버 오류가 발생했습니다.");
    }
  };

  return (
    <section className="p-4 space-y-4">
      <Script
        src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        strategy="beforeInteractive"
      />
      <h2 className="text-xl font-bold">회사 정보 수정</h2>
      {selectedCompany && (
        <>
          <div className="flex gap-2 items-center">
            <input
              name="companyName"
              placeholder="회사명"
              value={form.companyName ?? ""}
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

          <div className="flex gap-2">
            <input
              name="address"
              placeholder="주소"
              value={form.address ?? ""}
              onChange={handleChange}
              className="border p-2 w-full"
            />
            <button onClick={searchAddress} className="bg-gray-200 px-2">
              주소 찾기
            </button>
            <input
              name="zipCode"
              placeholder="우편번호"
              value={form.zipCode ?? ""}
              onChange={handleChange}
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
            />
            계약 중
          </label>

          <div className="border rounded p-4">
            <input
              type="file"
              onChange={handleFileChange}
              className="mb-2"
              ref={fileInputRef}
            />
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
              typeof form.image === "object" &&
              "asset" in form.image &&
              form.image.asset &&
              typeof form.image.asset._ref === "string" && (
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
