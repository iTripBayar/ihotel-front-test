"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";
// import { fetchUserData } from "@/utils";
import { useRequest } from "ahooks";
// import { useCookies } from "react-cookie";
import Header from "@/components/common/header";
import { Toaster } from "sonner";
import ProfileInfo from "@/components/pageComponents/profilePage/profileInfo";
import ErrorComponent from "@/components/common/404";
import HistoryContainer from "@/components/pageComponents/profilePage/historyContainer";
import Footer from "@/components/common/footer";
import { useSearchParams, useRouter } from "next/navigation";
import BottomSection from "@/components/common/bottomSection";
import { useEffect, useState } from "react";
import EdtiSection from "@/components/pageComponents/profilePage/edtiSection";
import { fetchProfileInto } from "@/utils/user";
import { CircularProgress } from "@chakra-ui/react";

export default function ProfilePage() {
  // const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const lang = searchParams.get("lang");
  const [action, setAction] = useState("");

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/");
    },
  });
  const {
    data: profileData,
    run,
    loading,
    error,
  } = useRequest(
    (e: { email: string }) => {
      return fetchProfileInto({ email: e.email });
    },
    {
      manual: true,
      onSuccess: (res) => {
        console.log(res);
      },
      refreshDeps: [action === "saved"],
    },
  );
  useEffect(() => {
    if (session?.user?.email) {
      run({ email: session?.user?.email });
    }
  }, [session]);
  useEffect(() => {
    if (action === "saved") {
      console.log("s");
      // window.refresh()
      window.location.reload();
    }
  }, [action]);

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  if (!error)
    if (loading === true) {
      return (
        <div className="flex flex-col">
          <Header
            user={`${session?.user?.name
              ?.charAt(0)
              .toUpperCase()}${session?.user?.name?.slice(1)}`}
          />
          <div className="flex h-screen justify-center items-center">
            <CircularProgress isIndeterminate={true} color="#3C76FE" />
          </div>
        </div>
      );
    } else {
      if (profileData) {
        return (
          <main className="flex flex-col relative gap-[20px]">
            <Header
              user={`${session?.user?.name
                ?.charAt(0)
                .toUpperCase()}${session?.user?.name?.slice(1)}`}
            />
            <BottomSection ver={"fixed"} handleScrollToTopVer={() => {}} />
            <Toaster position="top-right" richColors />
            <div className="flex w-full flex-col items-center gap-[24px] min-h-screen px-[16px] sm:px-[50px] md:px-[72px] lg:px-[100px] md:gap-[32px] lg:gap-[36px] ">
              <ProfileInfo
                userData={profileData?.user}
                totalOrders={profileData?.totalOrders}
                totalReviews={profileData?.totalReviews}
                handleSignOut={handleSignOut}
                handleAction={(e: string) => setAction(e)}
                action={action}
              />
              {action === "" || action === "saved" ? (
                <HistoryContainer
                  data={profileData?.orders ? profileData.orders : []}
                />
              ) : (
                <EdtiSection
                  action={action}
                  handleAction={(e: string) => setAction(e)}
                  userData={profileData?.user}
                />
              )}
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
      } else {
        return (
          <div className="flex flex-col">
            <Header
              user={`${session?.user?.name
                ?.charAt(0)
                .toUpperCase()}${session?.user?.name?.slice(1)}`}
            />
            <div className="flex h-screen justify-center items-center">
              <CircularProgress isIndeterminate={true} color="#3C76FE" />
            </div>
          </div>
        );
      }
    }

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
