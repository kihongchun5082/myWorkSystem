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

export const getSanityImageUrl = (image: { asset?: { _ref?: string }}) => {

 if (!image || !image.asset || typeof image.asset._ref !== "string") {
  console.error('Invalid Sanity image object:', image);
  return undefined;
 }
 
 const baseUrl = `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}`

 const ref = image.asset._ref.replace("image-", "").replace("-png", ".png").replace("-jpg", ".jpg")
 const paramsStart = '?'
 const addParams = "&"
 const shape = 'rect=70,20,120,150'
 const size = 'h=500'

 // return `${baseUrl}/${ref}${paramsStart}${size}`
 return `${baseUrl}/${ref}`
 // return `${baseUrl}/${ref}${paramsStart}${shape}${addParams}${size}`
}

export async function getVisitsByCompany(companyName: string) {
 return sanityClient.fetch(
  `*[_type == "visit" && visitCompany->companyName == "${companyName}"]  {
  "id": _id,
  visitName,
  "companyName": visitCompany->companyName,
  "when": visitedAt,
  "nurse": nurseName,
  "numberConsults": numCnslts,
  "docImage": visitPhoto
  }`
 )
}

export async function getVisitByCompanyName(companyName: string, slug: string) {
 const visit = await sanityClient.fetch(
  `*[_type == "visit" && visitCompany->companyName == $companyName && _id == $slug][0] {
  "id": _id,
  visitName,
  "companyName": visitCompany->companyName,
  "when": visitedAt,
  "nurse": nurseName,
  "numberConsults": numCnslts,
  "docImage": visitPhoto}`
  , { companyName, slug }
 )
 console.log('🔍 Visit returned from Sanity: ',visit)
 return visit;
}

// export async function getDocImageByVisitByCompanyName(companyName: string, slug: string) {
//  return sanityClient.fetch(
//   `*[_type == "visit" && visitCompany->companyName == $companyName && _id == $slug] {
//   "images": docImage[].asset->_ref}`,
//   { companyName, slug }
//  )
// }

export async function saveConsult(data: any) {
 return sanityClient.create({ _type: 'consult', ...data });
}
