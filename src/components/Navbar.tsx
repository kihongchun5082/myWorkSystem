"use client";
import Link from "next/link";
import HomeIcon from "./ui/icons/HomeIcon";
import HomeFillIcon from "./ui/icons/HomeFillIcon";
import { usePathname } from "next/navigation";
import SearchIcon from "./ui/icons/SearchIcon";
import SearchFillIcon from "./ui/icons/SearchFillIcon";
import NewIcon from "./ui/icons/NewIcon";
import NewFillIcon from "./ui/icons/NewFillIcon";
import ColoredButton from "./ui/ColoredButton";
import { useSession, signIn, signOut } from "next-auth/react";
import Avatar from "./Avatar";
import CompanyIcon from "./ui/icons/CompanyIcon";
const menu = [
  {
    href: "/",
    icon: <HomeIcon />,
    clickedIcon: <HomeFillIcon />,
  },
  {
    href: "/search",
    icon: <SearchIcon />,
    clickedIcon: <SearchFillIcon />,
  },
  {
    href: "/new",
    icon: <NewIcon />,
    clickedIcon: <NewFillIcon />,
  },
  {
    href: "/company",
    icon: <CompanyIcon />,
    clickedIcon: <CompanyIcon />,
  },
];
  export default function Navbar() {
    const pathName = usePathname();
    // console.log('pathName_Navbar: ',pathName)
    const { data: session } = useSession()
    const user = session?.user
    // console.log('session_Navbar: ',session)
    
  return (
    <div className=" flex justify-between items-center px-4">
      <Link href="/">
        <h1 className=" text-3xl font-bold">건강상담시스템</h1>
      </Link>
      <nav className=" ">
        <ul className=" flex gap-4 items-center px-6">
          {menu.map((item) => (
            <li key={item.href} className=" m-2">
              <Link href={item.href}>
                {pathName === item.href ? item.clickedIcon : item.icon}
              </Link>
            </li>
          ))}
            { user &&  (
              <li>
                <Link href={`/user/${user.username}`}>
                 <Avatar image={user.image}size='small' highlight/>
                </Link>
              </li>
            )}
            <li>
              { session ? (
                <ColoredButton text="로그아웃" onClick={() => signOut()} />
              ) : (
                <ColoredButton text="로그인" onClick={() => signIn()} size="small"/>
              )}
            </li>
        </ul>
      </nav>
    </div>
  );
}
