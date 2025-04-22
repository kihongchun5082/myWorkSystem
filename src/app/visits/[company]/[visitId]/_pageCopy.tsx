'use client'
import ConsultForm from "@/components/ConsultForm";
import { getSanityImageUrl } from "@/service/sanity";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";

export default function VisitDetailPage() {
  const { companyName, slug } = useParams<{
    companyName: string;
    slug: string;
  }>();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { data: visit, isLoading, error } = useSWR(`/api/visits/${companyName}/${slug}`);
  
  console.log('images_VisitImagePage',visit)

  if (error) return <p>이미지를 불러오는 중 오류가 발생했습니다.</p>;
  if (isLoading) return <p>로딩 중...</p>;

  return (
    <div className="w-full flex flex-row max-w-4xl">
      {/* Left: Selected Image */}
      <div className="w-2/3 p-2 overflow-auto md:basis-1/2 md:justify-center md:min-w-0">
        {selectedImage ? (
          <Image src={selectedImage} alt="Selected" width={500} height={500} className="rounded" />
        ) : (
          <p>이미지를 선택하세요.</p>
        )}
      </div>

      {/* Right: List of Images and Consultation Form */}
      <div className="w-full basis-1/3 p-3 md:w-full md:basis-1/2 md:justify-center md:overflow-auto">
        <h1 className="text-xl font-bold">{visit.visitName} 방문 결과</h1>

        {/* List Images */}
        <div className="flex gap-3 overflow-auto">
          {visit.docImage?.map((image: { asset?: { _ref?: string | undefined; } | undefined; }, index: string) => {
            const imageUrl = getSanityImageUrl(image ?? null);
            return (
              <div key={index} className="cursor-pointer" onClick={() => setSelectedImage(imageUrl ?? null)}>
               {
                imageUrl && 
                <Image src={imageUrl} alt="Doc Image" width={80} height={80} className="rounded" />
               }
              </div>
            );
          })}
        </div>

        {/* Consultation Form */}
        {/* {selectedImage && <ConsultForm visitId={visit.id} />} */}
      </div>
    </div>
  );
}




//   return (
//     <div className=" p-4">
//       <h1 className=" text-2xl font-bold mb-4">상담 결과</h1>
//       <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//         {images.length > 0 ? (
//           images.map((imageRef: string, index: number) => {
//             const imageUrl = getSanityImageUrl({ asset: { _ref: imageRef } }) || undefined;
//             return (
//               <div key={index} className=" relative w-full h-64">
//                 { imageUrl && (
//                  <Image
//                  src={imageUrl}
//                  alt={`상담 결과 ${index + 1}`}
//                  layout="fill"
//                  objectFit="contain"
//                  className=" rounded-md shadow-lg"
//                />
//                 )}
//               </div>
//             );
//           })
//         ) : (
//           <p>이미지가 없습니다.</p>
//         )}
//       </div>
//     </div>
//   );
// }
