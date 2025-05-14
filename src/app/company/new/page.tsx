// app/company/new/page.tsx
"use client";

import useCompanyForm from "@/hooks/useCompanyForm";
import Script from "next/script";
import Image from "next/image";

export default function CompanyCreatePage() {
  const {
    form,
    logo,
    fileInputRef,
    handleChange,
    handleFileChange,
    handleSubmit,
    searchAddress,
  } = useCompanyForm();

  return (
    <section className="p-4 border rounded shadow w-full max-w-lg space-y-4">
      <Script
        src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        strategy="beforeInteractive"
      />
      <h3 className="text-lg font-semibold">신규 회사 등록</h3>
      <input
        name="companyName"
        placeholder="회사명"
        value={form.companyName}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        name="companyId"
        placeholder="회사 ID"
        value={form.companyId}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <div className="flex gap-2">
        <input
          name="address"
          placeholder="주소(도로명+건물번호 예:종로 6)"
          value={form.address}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <button onClick={searchAddress} className="bg-gray-200 px-2">
          주소 찾기
        </button>
        <input
          name="zipCode"
          placeholder="우편번호"
          value={form.zipCode}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
      <input
        name="telNumber"
        placeholder="전화번호"
        value={form.telNumber}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        name="numEmployees"
        placeholder="사원 수"
        value={form.numEmployees}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        name="managerName"
        placeholder="관리자명"
        value={form.managerName}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <label className="flex items-center space-x-2 gap-2">
        <input
          type="checkbox"
          name="isContract"
          checked={form.isContract}
          onChange={handleChange}
        />
        계약 중 여부
      </label>
      <div className="border border-dashed p-2 rounded w-full flex flex-col items-center">
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
        {logo && (
          <div className="mt-2 w-40 h-40 relative">
            <Image
              src={URL.createObjectURL(logo)}
              alt="logo preview"
              fill
              className="object-contain rounded border"
            />
          </div>
        )}
      </div>
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
      >
        저장하기
      </button>
    </section>
  );
}
