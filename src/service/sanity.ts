import sanityClient from "@/lib/sanityClient";

type OAuthUser = {
  id: string;
  name: string | undefined | null;
  username: string;
  userId: string;
  email: string;
  image?: string | null;
  createdAt: string;
};
export async function addUser({
  name,
  username,
  userId,
  email,
  image,
  createdAt,
}: OAuthUser) {
  return sanityClient.createIfNotExists({
    _id: username,
    _type: "user",
    name,
    username,
    userId,
    email,
    image,
    createdAt,
  });
}

export async function getCompanies() {
  return sanityClient.fetch(
    '*[_type == "company"] | order(companyName) {_id, companyName, companyId, image}'
  );
}

export async function getVisits() {
  return sanityClient.fetch(
    `*[_type == "visit"] | order(visitName){
  ...,
  "visitCompany": *[ _type == "company" && companyName._ref == ^._id]}`
  );
}
// {_id, visitName, visitedAt, nurseName, numCnslts, visitPhoto,

export const getSanityImageUrl = (image: { asset?: { _ref?: string } }) => {
  if (!image || !image.asset || typeof image.asset._ref !== "string") {
    console.error("Invalid Sanity image object:", image);
    return undefined;
  }

  const baseUrl = `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}`;

  const ref = image.asset._ref
    .replace("image-", "")
    .replace("-png", ".png")
    .replace("-jpg", ".jpg");
  const paramsStart = "?";
  const addParams = "&";
  const shape = "rect=70,20,120,150";
  const size = "h=500";

  // return `${baseUrl}/${ref}${paramsStart}${size}`
  return `${baseUrl}/${ref}`;
  // return `${baseUrl}/${ref}${paramsStart}${shape}${addParams}${size}`
};

export async function getVisitsByCompany(company: string) {
  return sanityClient.fetch(
    `*[_type == "visit" && visitCompany->_id == "${company}"]  {
    "id": _id,
    visitName,
    "companyName": visitCompany->companyName,
    "when": visitedAt,
    "nurse": nurseName,
    "numberConsults": numCnslts,
    "docImage": visitPhoto
    }`
  );
}

export async function getVisitByCompanyNameByVisitId(
  company: string,
  visitId: string
) {
  // const visit = await sanityClient.fetch(
  return sanityClient.fetch(
    `*[_type == "visit" && visitCompany->_id == "${company}" && _id == "${visitId}"][0] {
    "id": _id,
    visitName,
    "companyName": visitCompany->companyName,
    "when": visitedAt,
    "nurse": nurseName,
    "numberConsults": numCnslts,
    "docImage": visitPhoto
    }`
    // { company, visitId }
  );
  // console.log("🔍 Visit returned from Sanity: ", visit);
  // return visit;
}

// export async function getDocImageByVisitByCompanyName(companyName: string, slug: string) {
//  return sanityClient.fetch(
//   `*[_type == "visit" && visitCompany->companyName == $companyName && _id == $slug] {
//   "images": docImage[].asset->_ref}`,
//   { companyName, slug }
//  )
// }

export async function getConsultsByCompanyByEmployee(
  company: string,
  employee: string,
  birthYear: string
) {
  return sanityClient.fetch(
    `*[_type == "consult" && whichCompany -> _id == "${company}" && employeeName=="${employee}" && birthYear=="${birthYear}"]  {
    "id": _id,
    "name": employeeName,
    "birthYear": birthYear,
    "sex": gender
    }`
  );
}

export async function getConsultByCompanyByEmployeeByVisit(
  company: string,
  employee: string,
  birthYear: string,
  visitId: string
) {
  return sanityClient.fetch(
    `*[_type == "consult" && whichCompany->_id == "${company}" && employeeName=="${employee}" && birthYear=="${birthYear}" && visitId == "${visitId}"][0]
   `
  );
}

export async function saveConsult(body: any) {
  return sanityClient.create({
    _type: "consult",
    ...body,
    whichCompany: {
      _type: "reference",
      _ref: body.whichCompany,
    },
    // employName: body.employName,
    // birthYear: body.birthYear,
    // visitId: body.visitId
  });
}

export async function getConsultsBycompanyName(company: string) {
  const consults = sanityClient.fetch(
    `*[_type == "consult" && whichCompany -> _id == "${company}"]  {
    "id": _id,
    "name": employeeName,
    "birthYear": birthYear,
    "sex": gender
    }`
  );
}

export async function getEmployeesByCompany(company: string) {
  return sanityClient.fetch(
    `*[_type == "consult" && whichCompany -> _id == "${company}"]  | order(employeeName)  {
    "id": _id,
    "companyName": whichCompany -> companyName,
    "company": whichCompany -> _id,
    "name": employeeName,
    "birthYear": birthYear,
    "sex": gender
    }`
  );
}

export async function getEmployeeByCompany(
  company: string,
  employeeName: string,
  birthYear: string
) {
  return sanityClient.fetch(
    `*[_type == "consult" && whichCompany -> _id == $company && employeeName == $employeeName && birthYear == $birthYear] {
    "id": _id,
    "companyName": whichCompany -> companyName,
    "company": whichCompany -> _id,
    "name": employeeName,
    "birthYear": birthYear,
    "sex": gender
    }`,
    { company,
      employeeName,
      birthYear
    }
  );
}

export async function getConsultResultsByEmployeeByCompany(
  company: string,
  employeeName: string,
  birthYear: string
) {
  return sanityClient.fetch(
    `*[_type == "consult" && whichCompany -> _id == $company && employeeName == $employeeName && birthYear == $birthYear] {
      "id": _id,
      "name": employeeName,
      "birthYear": birthYear,
      "sex": gender,
      "company": whichCompany -> _id,
      "companyName": whichCompany -> companyName,
      "visitId": visitId,
      "bp": bp,
      "bpAtScreen": bpAtScreen,
      "fbsAtScreen": fbsAtScreen,
      "hbA1C": hbA1C,
      "pp2hrBs": pp2hrBs,
      "isHtMed": isHtMed,
      "isDmMed": isDmMed,
      "isCholMed": isCholMed,
      "isHtFamHx": isHtFamHx,
      "isDmFamHx": isDmFamHx,
      "isCholFamHx": isCholFamHx,
      "wc": wc,
      "height": height,
      "weight": weight,
      "bmi": bmi,
      "hb": hb,
      "lft": lft,
      "lipidPanel": lipidPanel,
      "urineProtein": urineProtein,
      "smoking": smoking,
      "drinking": drinking,
      "exercise": exercise,
      "comments": comments,
    }`,
    { company,
      employeeName,
      birthYear
    }
  );
}
