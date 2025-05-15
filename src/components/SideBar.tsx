import { User } from "@/model/user";
import Avatar from "./Avatar";

type userType = {
 user: User;
}
// import { useSession } from "next-auth/react";

// }
export default function SideBarPage({ user: { name, username, image } }: userType) {
 // const {data: session} = useSession()
 // console.log('session_SideBar: ',session?.user)
 return (
  <>
    <h3 className=" text-center text-lg text-slate-600 mb-4">상담자</h3>
    <div className="flex items-center">
     { image && <Avatar image={ image } /> }
     <div className=" ml-4">
      <p className=" font-bold">{ username }</p>
      <p className=" text-lg text-neutral-500 leading-4">{ name }</p>
     </div>
    </div>
    <p className=" text-sm text-neutral-500 mt-8">About • Help • Press • API • Help • Jobs • Privacy • Terms • Location • Lanuage </p>
    <p className=" font-bold text-sm mt-8 text-neutral-500">@Copywrite 전기홍 from 우진산업보건연구원</p>
  </>
 );
}

