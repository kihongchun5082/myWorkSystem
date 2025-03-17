import { getSanityImageUrl } from "@/service/sanity";
import Image from "next/image";
import { useParams } from "next/navigation";
import useSWR from "swr";

export default function VisitImagesPage() {
  const { companyName, slug } = useParams<{
    companyName: string;
    slug: string;
  }>();
  const { data: images, error } = useSWR(`/api/visits/${companyName}/${slug}`);
  console.log('images_VisitImagePage',images)
  if (error) return <p>이미지를 불러오는 중 오류가 발생했습니다.</p>;
  if (!images) return <p>로딩 중...</p>;
  return (
    <div className=" p-4">
      <h1 className=" text-2xl font-bold mb-4">상담 결과</h1>
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.length > 0 ? (
          images.map((imageRef: string, index: number) => {
            const imageUrl = getSanityImageUrl({ asset: { _ref: imageRef } }) || undefined;
            return (
              <div key={index} className=" relative w-full h-64">
                { imageUrl && (
                 <Image
                 src={imageUrl}
                 alt={`상담 결과 ${index + 1}`}
                 layout="fill"
                 objectFit="contain"
                 className=" rounded-md shadow-lg"
               />
                )}
              </div>
            );
          })
        ) : (
          <p>이미지가 없습니다.</p>
        )}
      </div>
    </div>
  );
}
