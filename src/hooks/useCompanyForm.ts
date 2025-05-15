// hooks/useCompanyForm.ts
import { useState, useRef, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Company } from "@/model/company";

export default function useCompanyForm(selectedCompany?: Company) {
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
  const router = useRouter();
  useEffect(() => {
    if (selectedCompany) {
      setForm({
        companyName: selectedCompany.companyName || "",
        companyId: selectedCompany.companyId || "",
        address: selectedCompany.address || "",
        zipCode: selectedCompany.zipCode || "",
        telNumber: selectedCompany.telNumber || "",
        numEmployees: selectedCompany.numEmployees || "",
        managerName: selectedCompany.managerName || "",
        isContract: selectedCompany.isContract ?? false,
        image: selectedCompany.image || null,
      })
    }
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

  const resetForm = () => {
    setForm({
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
    setLogo(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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

  const handleSubmit = async () => {
    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => {
      if (typeof val === "boolean") {
        formData.append(key, val ? "true" : "false");
      } else if (typeof val === "string") {
        formData.append(key, val);
      } else if (val !== undefined && val !== null) {
        formData.append(key, String(val));
      } else {
        formData.append(key, "");
      }
    });
    if (logo) formData.append("logo", logo);

    try {
      const res = await fetch("/api/companies/new", {
        method: "POST",
        body: formData,
      });

      const contentType = res.headers.get("content-type");
      const isJson = contentType?.includes("application/json");
      const data = isJson ? await res.json() : null;

      if (!res.ok) {
        const errorMessage = data?.message || "업로드 실패";
        alert(errorMessage);
        return;
      }

      resetForm();
      alert("회사 등록 성공");
      router.refresh();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("저장 중 오류", error);
      alert("서버 오류가 발생했습니다.");
    }
  };

  return {
    form,
    logo,
    setForm,
    setLogo,
    handleChange,
    handleFileChange,
    handleSubmit,
    fileInputRef,
    resetForm,
    searchAddress,
  };
}
