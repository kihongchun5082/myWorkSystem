import sanityClient from "@/lib/sanityClient";
import { Company } from "@/model/company";
import { Employee, ConsultResults } from "@/model/employee";
import { Visit } from "@/model/visit";

import imageUrlBuilder from "@sanity/image-url";

type OAuthUser = {
  id: string;
  name: string | undefined | null;
  username: string;
  userId: string;
  email: string;
  image?: string | null;
  createdAt: string;
};
export async function addUser(
  // {
  // name,
  // username,
  // userId,
  // email,
  // image,
  // createdAt,
  // }
  // : OAuthUser) {
  user: OAuthUser) {
  return sanityClient.createIfNotExists({
    _id: user.username,
    _type: "user",
    ...user,
    // name,
    // username,
    // userId,
    // email,
    // image,
    // createdAt,
  });
}

export async function getCompanies(): Promise<Company[]> {
  return sanityClient.fetch(
    '*[_type == "company"] | order(companyName) {_id, companyName, address, zipCode, telNumber, numEmployees, managerName, isContract, companyId, image}'
  );
}

export async function getVisits(): Promise<Visit[]> {
  return sanityClient.fetch(
    `*[_type == "visit"] | order(visitName){
  ...,
  "visitCompany": *[ _type == "company" && companyName._ref == ^._id]}`
  );
}
// {_id, visitName, visitedAt, nurseName, numCnslts, visitPhoto,

export const getSanityImageUrl = (image: { asset?: { _ref?: string } }): string | undefined => {
  if (!image || !image.asset || typeof image.asset._ref !== "string") {
    console.error("Invalid Sanity image object ⚠️ image 필드가 잘못된 형식입니다: ", image);
    return undefined;
  }

  const baseUrl = `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}`;

  const ref = image.asset._ref
    .replace("image-", "")
    .replace("-png", ".png")
    .replace("-jpg", ".jpg");
  // const paramsStart = "?";
  // const addParams = "&";
  // const shape = "rect=70,20,120,150";
  // const size = "h=500";

  // return `${baseUrl}/${ref}${paramsStart}${size}`
  return `${baseUrl}/${ref}`;
  // return `${baseUrl}/${ref}${paramsStart}${shape}${addParams}${size}`
};

export async function getVisitsByCompany(company: string): Promise<Visit[]> {
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

export async function getVisitByVisitId(visitId: string): Promise<Visit> {
  return sanityClient.fetch(
    `*[_type == "visit" && _id == $visitId][0] {
      "id": _id,
      visitName,
      "companyName": visitCompany->companyName,
      "when": visitedAt,
      "nurse": nurseName,
      "numberConsults": numCnslts,
      "docImage": visitPhoto
    }`,
    { visitId }
  );
}

export async function getConsultByCompanyByEmployeeByVisit(
  company: string,
  employee: string,
  birthYear: string,
  visitId: string
): Promise<ConsultResults | null> {
  return sanityClient.fetch(
    `*[_type == "consult" && whichCompany->_id == "${company}" && employeeName=="${employee}" && birthYear=="${birthYear}" && visitId == "${visitId}"][0]
   `
  );
}

export async function saveConsult(body: Record<string, any>) {
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

// export async function getConsultsBycompanyName(company: string): Promise<Employee[]> {
//   const consults = sanityClient.fetch(
//     `*[_type == "consult" && whichCompany -> _id == "${company}"]  {
//     "id": _id,
//     "name": employeeName,
//     "birthYear": birthYear,
//     "sex": gender
//     }`
//   );
//  return consults;
// }

export async function getEmployeesByCompany(company: string):Promise<Employee[]> {
  const results = await sanityClient.fetch(
    `*[_type == "consult" && whichCompany -> _id == "${company}"]  | order(employeeName asc, _createdAt asc)  {
    "key": employeeName + birthYear,
    "id": _id,
    "companyName": whichCompany -> companyName,
    "company": whichCompany -> _id,
    "name": employeeName,
    "birthYear": birthYear,
    "sex": gender
    }`
  );
  // JavaScript로 중복 제거
  const seen = new Set();
  const uniqueEmployees = results.filter((item: any) => {
    const key = item.name + item.birthYear;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  return uniqueEmployees;
}

export async function getEmployeeByCompany(
  company: string,
  employeeName: string,
  birthYear: string
): Promise<Employee | null> {
  return sanityClient.fetch(
    `*[_type == "consult" && whichCompany -> _id == $company && employeeName == $employeeName && birthYear == $birthYear][0] {
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
): Promise<ConsultResults[]> {
  return sanityClient.fetch(
    `*[_type == "consult" && whichCompany -> _id == $company && employeeName == $employeeName && birthYear == $birthYear] {
      "id": _id,
      "name": employeeName,
      "birthYear": birthYear,
      "sex": gender,
      "company": whichCompany -> _id,
      "companyName": whichCompany -> companyName,
      "visitId": visitId,

      "visitInfo": *[_type == "visit" && _id == ^.visitId][0] {
        visitName,
        visitedAt,
        nurseName,
        numCnslts,
        visitPhoto
      },
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

// lib/sanityImage.ts

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  if (!source || !source.asset || !source.asset._ref) {
    console.warn("⚠️ image 필드가 잘못된 형식입니다:", source);
    return null;
  }

  return builder.image(source);
}
