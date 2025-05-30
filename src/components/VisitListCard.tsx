import { Visit } from "@/model/visit";
import { getSanityImageUrl } from "@/service/sanity";
import Image from "next/image";
import Link from "next/link";

type Props = {
  visit: Visit;
};
export default function VisitListCard({ visit }: Props) {
  //  const { selectedCompany } = useCompany();
  const { visitName, nurse, numberConsults, visitPhoto } = visit;

  // console.log("visit_component/VisitListCard: ", visit);

  return (
    <article className=" rounded-lg shadow-md border-gray-500 ">
      <div className=" flex items-center p-2 ">
        <div className=" ml-3">
          <strong>{visitName}</strong>
        </div>
        <div className=" text-gray-900 font-normal ml-4">
          <span className=" font-semibold ml-5">간호사:</span>
          <span className=" font-sans"> {nurse}</span>
          <span className="ml-3 font-semibold">상담 수: </span>
          <span>{numberConsults}</span>
        </div>
      </div>
      {visitPhoto?.length > 0 && (
        <div className=" flex gap-2 m-2 overflow-auto  h-100 ml-2">
          {visitPhoto?.map((image, index) => {
            // console.log("image_component/VisitListCard: ", image);

            if (!image.asset || typeof image.asset._ref !== "string") {
              console.warn("유효하지 않은 이미지 객체입니다:", image);
              return null;
            }

            const imageUrl = getSanityImageUrl(image);

            return (
              imageUrl && (
                <Link
                  key={index}
                  className="w-64 h-auto relative ml-2"
                  href={`/visits/${visit.id}`}
                >
                  <Image
                    src={imageUrl}
                    alt={`${visitName} 사진`}
                    // layout='fill'
                    // objectFit="contain"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: "contain" }}
                    // width={500}
                    // height={500}
                    className="rounded-md object-cover"
                  />
                </Link>
              )
            );
          })}
        </div>
      )}
    </article>
  );
}
