export type Company = {
 _id: string;
 companyName: string;
 companyId: string;
 address: string;
 zipCode: string;
 telNumber: string;
 numEmployees: string;
 managerName: string;
 isContract: boolean;
 image: string | { asset: { _ref: string }} | null;
}

export type UpdateCompany = {
  companyName?: string;
  companyId?: string;
  address?: string;
  zipCode?: string;
  telNumber?: string;
  numEmployees?: string;
  managerName?: string;
  isContract?: boolean;
  image?: {
    _type: "image";
    asset: {
      _type: "reference";
      _ref: string;
    };
  };
};