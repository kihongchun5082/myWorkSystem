export type Employee = {
 _id: string;
 name: string ;
 birthYear: string ;
//  company:  {
//   _type: "reference",
//   _ref: string,
// };
//  companyName:  {
//   _type: "reference",
//   _ref: string,
// };
 company: string,
 companyName: string,
 sex: string ;
}

export type EmployeeResults = Employee & {
  visitId: string,
  visitDate: string,
  bp: string,
  bpAtScreen: string,
  fbsAtScreen: string,
  hbA1C: string,
  pp2hrBs: string,
  isHtMed: boolean,
  isDmMed: boolean,
  isCholMed: boolean,
  isHtFamHx: boolean,
  isDmFamHx: boolean,
  isCholFamHx: boolean,
  wc: string,
  height: string,
  weight: string,
  bmi: string,
  hb: string,
  lft: string,
  lipidPanel: string,
  urineProtein: string,
  smoking: string,
  drinking: string,
  exercise: string,
  comments: string
}