"use client";
import { useSearchParams, redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import Header from "@/components/common/header";
import BottomSection from "@/components/common/bottomSection";
import { useAppCtx } from "@/contexts/app";
import SideMenu from "@/components/common/sidemenu";
import { Toaster } from "sonner";
import LogIn from "@/components/common/signIn/logIn";
import SignUp from "@/components/common/signIn/signUp";
import AboutOrder from "@/components/pageComponents/profilePage/aboutOrder";
import { Footer } from "react-day-picker";
import ErrorComponent from "@/components/common/404";

export default function OrderPage() {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");
  const { appState } = useAppCtx();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/");
    },
  });
  return (
    <main className="flex flex-col relative gap-[20px]">
      <>
        <title>{lang === "en" ? "Order | iHotel" : "Захиалга | iHotel"}</title>
        <meta
          name="description"
          content={
            lang === "en" ? "iHotel order page" : "iHotel захиалгын хуудас"
          }
        />
      </>
      <Header
        user={
          session
            ? `${session.user?.name
                ?.charAt(0)
                .toUpperCase()}${session.user?.name?.slice(1)}`
            : ""
        }
      />
      <BottomSection ver={"fixed"} handleScrollToTopVer={() => {}} inViewport />
      {appState.menu === "open" ? <SideMenu session={session} /> : null}
      {appState.logOrSign === "log" ||
      appState.logOrSign === "forgotPassword" ? (
        <LogIn />
      ) : null}
      {appState.logOrSign === "sign" ? <SignUp /> : null}
      <Toaster position="top-right" richColors />
      {/* <AboutOrder data={{}}/> */}
      <Footer />
    </main>
  );
}

// else{
//   return <ErrorComponent />''
// }
