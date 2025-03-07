import CompanyBarPage from "@/components/CompanyBar";
import SideBarPage from "@/components/SideBar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import VisitListPage from "@/components/VisitList";

export default async function HomePage() {
  const session = await auth()
  console.log('session_Home: ',session)
  const user = session?.user
  if (!user) {
    redirect('/signin')
  }

  return (
    <section className=" w-full flex flex-col md:flex-row max-w-[850px] p-4">
      <div className=" w-full basis-3/4  min-w-0  bg-blue-100">
        <CompanyBarPage />
        <VisitListPage />
      </div>
      <div className=" w-full basis-1/4 md:ml-8 bg-amber-100">
        <SideBarPage user={user}/>
      </div>
    </section>
  )
}