'use client'
export default function FixShortIdexecButton(){
  return (
<div className=" flex justify-center ">
  <button
    onClick={async () => {
      const res = await fetch("/api/companies/fix-short-id", {
        method: "POST",
      });
      const data = await res.json();
      console.log("결과:", data);
      alert("수정 완료");
    }}
  >
    UUID로 Company _id 재할당
  </button>
  <button
    onClick={async () => {
      const res = await fetch("/api/companies/fix-short-id", {
        method: "GET",
      });
      const data = await res.json();
      console.log("방문 회사 id ref 보기: ", data);
      
    }}
  >
    Consult company ref _id 보기
  </button>
</div>
)}
