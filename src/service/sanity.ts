import sanityClient from '@/lib/sanityClient';

type OAuthUser = {
 id: string;
 name: string | undefined | null;
 username: string;
 userId: string;
 email: string;
 image?: string | null;
 createdAt: string;
}
export async function addUser({ name, username, userId, email, image, createdAt }: OAuthUser) {
 return sanityClient.createIfNotExists({
  _id: username,
  _type: 'user',
  name,
  username,
  userId,
  email,
  image,
  createdAt
 })
}

export async function getCompanies() {
 return sanityClient.fetch(
  '*[_type == "company"] | order(companyName) {_id, companyName, companyId, image}'
 )
}

export async function getVisits() {
 return sanityClient.fetch(
  `*[_type == "visit"] | order(visitName){
  ...,
  "visitCompany": *[ _type == "company" && companyName._ref == ^._id]}`
 )
}
// {_id, visitName, visitedAt, nurseName, numCnslts, visitPhoto,

export const getSanityImageUrl = (image: { asset: { _ref: string }}) => {

 if (!image || !image.asset || !image.asset._ref) return null;
 
 const baseUrl = `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}`
 const ref = image.asset._ref.replace("image-", "").replace("-png", ".png")
 const size = '?h=100'

 return `${baseUrl}/${ref}${size}`
}

export async function getVisitsByCompany(companyName: string) {
 return sanityClient.fetch(
  `*[_type == "visit" && visitCompany._ref in *[_type == "company" && comanyName == "${companyName}"]._id]{
  _id,
  visitName,
  visitCompany->{companyName},
  visitedAt,
  nurseName,
  numCnslts,
  visitPhoto
  }`
 )
}


//  