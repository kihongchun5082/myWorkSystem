"use client";
import ConsultForm from "@/components/ConsultForm";
import { useCompany } from "@/context/CompanyContext";
import { getSanityImageUrl } from "@/service/sanity";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";

type SanityImageType = {
  _type: "image";
  _key: string;
  asset: {
    _ref: string;
    _type: "reference";
  };
  isConsulted?: boolean;
};

interface VisitData {
  id: string;
  visitName: string;
  when: string;
  visitPhoto?: SanityImageType[];
}

export default function VisitDetailPage() {
  const { selectedCompany } = useCompany();
  const { visitId } = useParams<{ visitId: string }>();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  // const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  // const [isChoosenY, setIsChoosenY] = useState<boolean | null>(null);

  // console.log('selectedImage_app/visits/visitId/page: ',selectedImage)
  // console.log('selectedImageIndex_app/visits/visitId/page: ',selectedImageIndex)
  // console.log('isChoosenY_app/visits/visitId/page: ',isChoosenY)

  const {
    data: visit,
    isLoading,
    error,
  } = useSWR<VisitData>(`/api/visits/${visitId}`);

  // console.log('visit_app/visits/[visitId]/page/useSWR: ',visit)

  if (error) return <p>이미지를 불러오는 중 오류가 발생했습니다.</p>;
  if (isLoading || !visit) return <p>로딩 중...</p>;

  return (
    <div className="w-full flex flex-row max-w-4xl">
      {/* Left: Selected Image */}
      <div className="w-2/3 p-2 basis-2/3 min-w-0 justify-center">
        {/* <div className="w-2/3 p-2 overflow-auto md:basis-1/2 md:justify-center md:min-w-0"> */}
        <div className=" sticky top-20 md:static">
          {selectedImage ? (
            <Image
              src={selectedImage}
              alt="Selected"
              width={500}
              height={500}
              className="rounded"
            />
          ) : (
            <p>이미지를 선택하세요.</p>
          )}
        </div>
      </div>

      {/* Right: List of Images and Consultation Form */}
      <div className="w-full basis-1/3 p-3 md:w-full md:basis-1/2 md:justify-center md:overflow-auto">
        <h1 className="text-xl font-bold">{visit?.visitName} 방문 결과</h1>

        {/* List Images */}
        <div className="flex gap-3 overflow-auto">
          {visit?.visitPhoto?.length ? (
            visit.visitPhoto.map((image, index) => {
              const imageUrl = getSanityImageUrl(image);
              if (!imageUrl) return null;

              // const selectedImageIndex = index;
              
              // console.log('imageUrl_app/visit/visitId/page-return: ',imageUrl)
              // console.log('selectedImageIndex_app/visit/visitId/page-return: ',selectedImageIndex)
              // console.log('isChoosenY_app/visit/visitId/page-return: ',isChoosenY); 
              // console.log(`image[${index}].isConsulted:`, image.isConsulted);
              
              return (
                <div
                key={index}
                className="cursor-pointer flex flex-col items-center"
                >
                  <div
                    onClick={async () => {
                        setSelectedImage(imageUrl ?? null);
                        // setSelectedImageIndex(index);
                        // setIsChoosenY(true);

                        try {
                          await fetch("/api/visits/images/consulted", {
                            method: "PATCH",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              visitId: visit.id,
                              imageKey: image._key
                            })
                          })
                        } catch (err) {
                          console.error('isConsulted 업데이트 실패: ', err)
                        }
                      }}
                      >
                    {imageUrl && (
                      <Image
                        key={index}
                        src={imageUrl}
                        alt="Doc Image"
                        width={80}
                        height={80}
                        className={`rounded `}
                        // ${isChoosenY} ? "opacity-50" : "" 
                      />
                    )}
                  </div>
                  <span className=" text-xs mt-1 text-gray-600">
                    {/* {visit?.visitPhoto?.[index]?.isConsulted ? "보았음" : "본적없음"} */}
                    { image.isConsulted ? "보았음" : "본적없음" }
                    
                  </span>
                </div>
              );
            })
          ) : (
            <p>이미지가 없습니다.</p>
          )}
        </div>

        {/* Consultation Form */}
        {selectedCompany && selectedImage && (
          // && setSelectedImageIndex !== null
          <ConsultForm
            visitId={visit.id}
            company={selectedCompany._id}
            visitDate={visit.when}
            //  imageIndex={selectedImageIndex}
          />
        )}
      </div>
    </div>
  );
}
