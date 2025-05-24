import { getConsultResultsByEmployeeByCompany, getEmployeeByCompany } from "@/service/sanity";
import NotFound from "./not-Found";
import EmployeeConsultsProfile from "@/components/EmployeeConsultsProfile";

type Props = {
  params: Promise<{ company: string }>;
  searchParams: Promise<{ [key: string]: string |  undefined }>;
};

export default async function EmployeeConsultsPage({
  params,
  searchParams,
}: Props) {

  const { company } = await params;
  const employeeName = (await searchParams).name;
  const birthYear = (await searchParams).birthYear;

  // console.log('company_EmployeeConsultsPage-params: ', company);
  // console.log('searchParams', await searchParams);
  // console.log('employeeName: ', employeeName);
  // console.log('birthYear: ', birthYear);

  if (!company || !employeeName || !birthYear) {
    return <NotFound />;
  }

  const employee = await getEmployeeByCompany(company, employeeName, birthYear);

  // console.log('employee_employee/[company]/page: ',employee)

  const consultResults = await getConsultResultsByEmployeeByCompany(
    company,
    employeeName,
    birthYear
  );
  // console.log('consultResults_employee/[company]/page: ',consultResults)

  if (!employee) {
  return <p>해당 근로자를 찾을 수 없습니다.</p>;
}

  return <EmployeeConsultsProfile consultResults={consultResults} employee={employee} />;
}
