// app/company/new/page.tsx
"use client";
import { useState, useRef, ChangeEvent } from "react";
import Image from "next/image";
import { urlFor } from "@/lib/sanityImage";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { Company } from "@/model/company";

export default function CompanyCreatePage() {
  const [companyName, setCompanyName] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [telNumber, setTelNumber] = useState("");
  const [numEmployees, setNumEmployees] = useState("");
  const [managerName, setManagerName] = useState("");
  const [isContract, setIsContract] = useState(false);
  const [image, setImage] = useState(null);
  const [form, setForm] = useState<Company>({
    _id: "",
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
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setLogo(file);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => {
      if (typeof val === "boolean") {
        formData.append(key, val ? "true" : "false");
      } else if (typeof val === "string") {
        formData.append(key, val);
      } else if (val !== undefined && val !== null) {
        formData.append(key, String(val)); // number 등도 string으로 변환
      } else {
        formData.append(key, "");
      }
    });
    /* if (
      form.image &&
      typeof form.image === "object" &&
      "asset" in form.image &&
      typeof form.image.asset === "object" &&
      "_ref" in form.image.asset &&
      typeof form.image.asset._ref === "string"
    ) {
      const imageUrl = urlFor(form.image).width(120).url();
      // 이미지 미리보기 렌더링
      return (
        <Image
          src={imageUrl}
          alt="기존 회사 로고"
          width={120}
          height={120}
          className="rounded border"
        />
      );
    } else {
      console.warn("⚠️ image 필드는 예상치 못한 타입입니다:", form.image);
    }; */
    if (logo) formData.append("logo", logo);

    //✅ formData 내용 디버깅 출력
    console.log("📦 FormData 내용(formData_company/new/page): ");
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(key, `(File) ${value.name}`);
      } else {
        console.log(key, value);
      }
    }

    try {
      const res = await fetch("/api/companies/new", {
        method: "POST",
        body: formData,
      });

console.log('res_company/new/page: ',res)

      const contentType = res.headers.get("content-type");
      const isJson = contentType?.includes("application/json");
      const data = isJson ? await res.json() : null;
  
      if (!res.ok) {
        const errorMessage = data?.message || "업로드 실패";
        alert(errorMessage);
        return;
      }

        // 상태 초기화
        setCompanyId("");
        setAddress("");
        setZipCode("");
        setTelNumber("");
        setNumEmployees("");
        setManagerName("");
        setIsContract(false);
        setImage(null);
        setForm({
          _id: "",
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

        if (fileInputRef.current) {

          console.log("fileInputRefCurrent: ", fileInputRef.current);

          fileInputRef.current.value = "";
        }

        alert("회사 등록 성공");
        router.refresh();
        // ✅ 스크롤 맨 위로 이동
        window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("저장 중 오류", error);
      alert("서버 오류가 발생했습니다.");
    }
  };

  return (
    <section className="p-4 border rounded shadow w-full max-w-lg pace-y-2">
      <Script
        src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        strategy="beforeInteractive"
      />
      <h3 className="text-lg font-semibold">신규 회사 등록</h3>
      <input
        name="companyName"
        placeholder="회사명"
        required
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        name="companyId"
        placeholder="회사고유번호"
        required
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <div className="flex gap-2">
        <input
          name="address"
          placeholder="주소(도로명+건물번호 예:종로 6)"
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <button onClick={searchAddress} className="bg-gray-200 px-2">
          주소 찾기
        </button>
        <input
          name="zipCode"
          placeholder="우편번호"
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
      <input
        name="telNumber"
        placeholder="전화번호"
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        name="numEmployees"
        placeholder="사원 수"
        required
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        name="managerName"
        placeholder="관리자명"
        required
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <label className=" flex items-center space-x-2 gap-2">
        <input
          type="checkbox"
          name="isContract"
          checked={form.isContract}
          required
          onChange={handleChange}
        />
        계약 중 여부
      </label>

      <div className="border border-dashed p-2 rounded w-full flex flex-col items-center">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required
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
          <div className="mt-2 w-40 h-40 relative">
            <Image
              src={URL.createObjectURL(logo)}
              alt="logo preview"
              fill
              className="object-contain rounded border"
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
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
      >
        저장하기
      </button>
    </section>
  );
}
