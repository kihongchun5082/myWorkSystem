'use client'
export default function FixShortIdexecButton(){
  return (
<div>
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
</div>
)}
