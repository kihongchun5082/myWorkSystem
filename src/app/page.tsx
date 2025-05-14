import CompanyBarPage from "@/components/CompanyBar";
import SideBarPage from "@/components/SideBar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import VisitListPage from "@/components/VisitList";
import FixShortIdexecButton from "@/components/ui/fix-short-id-execButton";

export default async function HomePage() {
  const session = await auth()
  const user = session?.user
  if (!user) {
    redirect('/signin')
  }

  return (
    <section className=" w-full flex flex-col md:flex-row max-w-4xl p-4">
      <div className=" w-full basis-3/4  min-w-0">
        {/* <FixShortIdexecButton /> */}
        <CompanyBarPage />
        <VisitListPage />
      </div>
      <div className=" w-full basis-1/4 md:ml-8">
        <SideBarPage user={user}/>
      </div>
    </section>
  )
}