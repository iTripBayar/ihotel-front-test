"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { fetchUserData } from "@/utils";
import { useRequest } from "ahooks";
import { useCookies } from "react-cookie";
import Header from "@/components/common/header";
import { Toaster } from "sonner";
import { useAppCtx } from "@/contexts/app";
import ProfileInfo from "@/components/pageComponents/profilePage/profileInfo";
import ErrorComponent from "@/components/common/404";
import HistoryContainer from "@/components/pageComponents/profilePage/historyContainer";
import Footer from "@/components/common/footer";
import { useSearchParams, useRouter } from "next/navigation";
import BottomSection from "@/components/common/bottomSection";

export default function ProfilePage() {
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
  const searchParams = useSearchParams()
  const router = useRouter()
  const lang = searchParams.get('lang')
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/");
    },
  });
  const {appState, dispatch} = useAppCtx()
  const { data: userData } = useRequest(() => {
    return fetchUserData({ email: "orgil@ihotel.mn", password: "Wave920110@" });
  });
  console.log(userData);
  const handleSignOut =()=>{
    signOut({ callbackUrl: "/" });
  }
  const currentState = 'dev'
  console.log(session)
  if (session && session.user)
    return (
      <main className="flex flex-col relative gap-[20px]">
        <Toaster position="top-right" richColors />
        <Header
          user={`${session?.user?.name
            ?.charAt(0)
            .toUpperCase()}${session?.user?.name?.slice(1)}`}
        />
        <BottomSection ver={'fixed'} handleScrollToTopVer={() => {}} />
        <div className="flex w-full flex-col items-center gap-[24px] min-h-screen px-[16px] sm:px-[50px] md:px-[72px] lg:px-[100px] md:gap-[32px] lg:gap-[36px] pb-[20px] sm:pb-[24px] md:pb-[32px] lg:pb-[50px] xl:pb-[72px]">
          <ProfileInfo handleSignOut={handleSignOut} userData={session.user} />
          <HistoryContainer />
          <button
            onClick={() => router.back()}
            className="text-primary-blue font-medium py-[12px]"
          >
            {lang === "en" ? "Back" : "Буцах"}
          </button>
        </div>
        <Footer />
      </main>
    );
   return <ErrorComponent />;

}




    // <div>
    //   <Link href={{ pathname: "/" }}>Go to HomePage</Link>
    //   {session?.user ? `Welcome ${session.user.name}!` : "Profile Page"}
    //   <button
    //     onClick={() => {
    //       removeCookie("accessToken");
    //       signOut({ callbackUrl: "http://localhost:3000/" });
    //     }}
    //   >
    //     Sign Out
    //   </button>
    // </div>