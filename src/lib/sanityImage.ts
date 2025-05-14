import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "./sanityClient";

const client = sanityClient;

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}