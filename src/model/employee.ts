// Sanity의 이미지 타입 정의
export type SanityImage = {
  _type: "image";
  asset: {
    _type: "reference";
    _ref: string;
  };
};

export type Employee = {
 id: string;
 name: string;
 birthYear: string ;
 company: string;
 companyName: string;  
 sex: "M" | "F" ;
}

export type VisitInfo = {
  visitName: string;
  visitedAt: string;
  nurseName: string;
  numCnslts: number;
  visitPhoto?: SanityImage[];  // 이미지 배열로 명확히 지정
  visitDate: string;
  nurse: string;
  id: string;
}

export type ConsultResults = {
  id: string;
  name: string;
  birthYear: string;
  sex: "M" | "F" ;
  company: string;
  companyName: string;
  visitId: string;
  visitInfo?: VisitInfo;
  bp?: string;
  bpAtScreen?: string;
  fbsAtScreen?: string;
  hbA1C?: string;
  pp2hrBs?: string;
  isHtMed?: boolean;
  isDmMed?: boolean;
  isCholMed?: boolean;
  isHtFamHx?: boolean;
  isDmFamHx?: boolean;
  isCholFamHx?: boolean;
  wc?: string;
  height?: string;
  weight?: string;
  bmi?: string;
  hb?: string;
  lft?: string;
  lipidPanel?: string;
  urineProtein?: string;
  smoking?: string;
  drinking?: string;
  exercise?: string;
  comments?: string;
}