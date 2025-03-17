import { Visit } from "@/model/visit";
import { getSanityImageUrl } from "@/service/sanity";
import Image from "next/image";
import Link from "next/link";

type Props = {
 visit: Visit;
}
export default function VisitListCard( { visit }: Props) {
 const { visitName, when, companyName, nurse, numberConsults, docImage } = visit

 return <article className=" rounded-lg shadow-md border-gray-500 bg-blue-300">
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
  {docImage?.length > 0 && (
    <div className=" flex gap-2 m-2 overflow-auto bg-cyan-400 h-100 ml-2">
      {docImage?.map((image, index) => {
        const imageUrl = getSanityImageUrl(image) || undefined ;
        return (
          imageUrl && (
          <Link key={index} className="w-64 h-auto relative ml-2" href={`/visits/${companyName}/${visit.id}`}>
            <Image
              src = {imageUrl}
              alt={`${visitName} 사진`}
              layout='fill'
              objectFit="contain"
              className="rounded-md object-cover"
            />
          </Link>
          )
        );
      })}
    </div>
  )}
 </article>
}

