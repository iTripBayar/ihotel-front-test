"use client";
import Header from "@/components/common/header";
import { useSession } from "next-auth/react";
import { useAppCtx } from "@/contexts/app";
import LogIn from "@/components/common/signIn/logIn";
import SignUp from "@/components/common/signIn/signUp";
import SideMenu from "@/components/common/sidemenu";
import BottomSection from "@/components/common/bottomSection";
import Footer from "@/components/common/footer";
import { useSearchParams } from "next/navigation";
import { Slider } from "@nextui-org/react";
// import { useState, useEffect } from "react";

export default function TermPage() {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");
  const { data: session } = useSession({
    required: false,
  });
  const { appState } = useAppCtx();


  return (
    <main className="flex flex-col relative gap-[20px]">
      <>
        <title>
          {lang === "en"
            ? "Terms and Conditions | iHotel"
            : "Үйлчилгээний нөхцөл| iHotel"}
        </title>
        <meta
          name="description"
          content={
            lang === "en"
              ? "Mongolian largest accommodation booking website. Book hotels, Gers, tourist camps and resorts in all parts of Mongolia. Find exclusive deals and cheap price."
              : "Зочид буудал, амралтын газрыг хамгийн хямд үнээр захиалах | Монголын хамгийн том захиалгын систем - iHotel.mn"
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
      {appState.logOrSign === "log" ||
      appState.logOrSign === "forgotPassword" ? (
        <LogIn />
      ) : null}
      {appState.logOrSign === "sign" ? <SignUp /> : null}
      {appState.menu === "open" ? <SideMenu session={session} /> : null}
      <BottomSection ver={"fixed"} handleScrollToTopVer={() => {}} />
      <div className="flex w-full flex-col items-center gap-[24px] min-h-screen px-[16px] sm:px-[50px] md:px-[72px] lg:px-[100px] md:gap-[32px] lg:gap-[36px] ">
        {/* progress */}
        <div className="w-full">
          <Slider
            label="Select a value"
            // showTooltip={true}
            step={0.1}
            formatOptions={{ style: "percent" }}
            maxValue={1.4}
            minValue={0}
            marks={[
              {
                value: 0.1,
                label: lang == "en" ? "" : "Ерөнхий зүйл",
              },
              {
                value: 0.2,
                label: lang == "en" ? "" : "0. НЭР, НЭРШЛИЙН ТАЙЛБАР",
              },
              {
                value: 0.3,
                label: lang == "en" ? "" : "1. ХАМРАХ ХҮРЭЭ",
              },
              {
                value: 0.4,
                label: lang == "en" ? "" : "2. ҮНЭ",
              },
              {
                value: 0.5,
                label:
                  lang == "en"
                    ? ""
                    : "3. ХЭРЭГЛЭГЧИЙН ХУВИЙН МЭДЭЭЛЛИЙН НУУЦЛАЛ",
              },
              {
                value: 0.6,
                label: lang == "en" ? "" : "4. ҮНЭ ТӨЛБӨРГҮЙ ҮЙЛЧИЛГЭЭ",
              },
              {
                value: 0.7,
                label: lang == "en" ? "" : "5. ТӨЛБӨР",
              },
              {
                value: 0.8,
                label:
                  lang == "en"
                    ? ""
                    : "6.  УРЬДЧИЛГАА ТӨЛБӨР, ЗАХИАЛГЫН ЦУЦЛАЛТ БОЛОН ЗОЧИН ИРЭХГҮЙ БАЙХ",
              },
              {
                value: 0.9,
                label: lang == "en" ? "" : "7. ХАРИЛЦАА ХОЛБОО",
              },
              {
                value: 1,
                label:
                  lang == "en"
                    ? ""
                    : "8. ЭРЭМБЭЛЭЛТ, ОДНЫ ЗЭРЭГЛЭЛ БОЛОН ЗОЧНЫ СЭТГЭГДЭЛ",
              },
              {
                value: 1.1,
                label: lang == "en" ? "" : "9. ЭРХ ҮҮРЭГ",
              },
              {
                value: 1.2,
                label: lang == "en" ? "" : "10. ОЮУНЫ ӨМЧИЙН ЭРХИЙН ТУХАЙ",
              },
              {
                value: 1.3,
                label: lang == "en" ? "" : "11. БУСАД ЗҮЙЛ",
              },
              {
                value: 1.4,
                label: lang == "en" ? "" : "Шинэчлэл",
              },
            ]}
            defaultValue={0.2}
            className="w-full !text-[8px]"
          />
        </div>
      </div>
      <Footer />
    </main>
  );
}
