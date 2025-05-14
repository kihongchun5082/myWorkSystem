import { auth } from "@/auth";
import NewVisit from "@/components/CreateVisit";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
 title: 'New Photo Image',
 description: 'Create a new photo image of health consulting for employee'

}
export default async function NewVisitPage() {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    redirect('/signin')
    // return new Response("잘못된 사용자입니다.", { status: 401 });
  }

 return (
  <section className=" w-full flex flex-col md:flex-row max-w-4xl p-4">
    <div className=" w-full basis-3/4  min-w-0">
      <NewVisit />
    </div>
  </section>
 );
}

