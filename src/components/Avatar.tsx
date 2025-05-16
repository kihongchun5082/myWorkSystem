/* eslint-disable @next/next/no-img-element */
import { getSanityImageUrl } from "@/service/sanity";

type imageType = {
  // image?: string | null;
  image?: string | { asset: { _ref: string }} | null;
  size?: "small" | "normal";
  highlight?: boolean;
};
export default function Avatar({
  image,
  size = "normal",
  highlight = false,
}: imageType) {
  
  const imageUrl = typeof image === "string" ? image : image && "asset" in image ? getSanityImageUrl(image) : undefined

  // console.log('imageUrl_Avatar',imageUrl)

  return (
    <div className={getContainerStyle(size, highlight)}>
      <img
        className= { `bg-white object-cover rounded-full ${ getImageSizeStyle(size)}` }
        // src={image}
        src={imageUrl ?? undefined}
        alt="user profile"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

function getContainerStyle(size: string, highlight: boolean): string {
  const baseStyle = "rounded-full flex justify-center items-center";
  const highlightStyle = highlight
    ? "bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300"
    : "";
  const sizeStyle = size === "small" ? " w-9 h-9 " : "w-[68px] h-[68px]";
  return `${baseStyle} ${highlightStyle} ${sizeStyle}`;
}

function getImageSizeStyle(size: string): string {
  return size === 'small' ? 'w-[34px] h-[34px] p-[0.1rem]' : 'w-16 h-16 p-[0.2rem]'
}
