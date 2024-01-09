"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";
// import { fetchUserData } from "@/utils";
import { useRequest } from "ahooks";
// import { useCookies } from "react-cookie";
import Header from "@/components/common/header";
import { Toaster, toast } from "sonner";
import ProfileInfo from "@/components/pageComponents/profilePage/profileInfo";
import ErrorComponent from "@/components/common/404";
import HistoryContainer from "@/components/pageComponents/profilePage/historyContainer";
import Footer from "@/components/common/footer";
import { useSearchParams, useRouter } from "next/navigation";
import BottomSection from "@/components/common/bottomSection";
import { useEffect, useState } from "react";
import EdtiSection from "@/components/pageComponents/profilePage/edtiSection";
import { changeProfileInfo, fetchProfileInto } from "@/utils/user";
import { CircularProgress } from "@chakra-ui/react";
import SideMenu from "@/components/common/sidemenu";
import { useAppCtx } from "@/contexts/app";
import AboutOrder from "@/components/pageComponents/profilePage/aboutOrder";

export default function ProfilePage() {
  // const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const lang = searchParams.get("lang");
  const order_page = searchParams.get("order_page");
  const review_page = searchParams.get("review_page");
  const id = searchParams.get("id");
  const { appState, dispatch } = useAppCtx();
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
      return fetchProfileInto({
        email: e.email,
        order_page: order_page ? parseInt(order_page) : 1,
        review_page: review_page ? parseInt(review_page) : 1,
      });
    },
    {
      manual: true,
      // refreshDeps: [action, order_page, review_page],
      onSuccess: (res) => console.log(res),
    },
  );
  useEffect(() => {
    if (session?.user?.email) {
      run({
        email: session?.user?.email,
      });
    }
  }, [order_page, review_page]);

  useEffect(() => {
    if (session?.user?.email) {
      run({
        email: session?.user?.email,
      });
    }
    dispatch({
      type: "CHANGE_APP_STATE",
      payload: {
        menu: "",
      },
    });
  }, [session]);

  useEffect(() => {
    if (action === "saved") {
      router.refresh();
    }
  }, [action]);

  const {
    data: updatedData,
    run: runUpdate,
    loading: loadingUpdate,
  } = useRequest(
    (e: {
      id: string;
      name: string;
      surname: string;
      gender: string;
      phone_number: string;
      country: string;
      password: string;
    }) => {
      return changeProfileInfo(e);
    },
    {
      manual: true,
      onSuccess: (res) => {
        console.log(res);
        toast.success(
          `${
            lang === "en" ? "Changes applied!" : "Таны мэдээлэл өөрчлөгдлөө!"
          }`,
        );
      },
    },
  );

  const showOrder: User.Order | undefined = id
    ? profileData?.orders.filter((index) => index.id.toString() === id)[0]
    : undefined;

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  if (!error) {
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
      return (
        <main className="flex flex-col relative gap-[20px]">
          <Header
            user={`${session?.user?.name
              ?.charAt(0)
              .toUpperCase()}${session?.user?.name?.slice(1)}`}
          />
          <BottomSection ver={"fixed"} handleScrollToTopVer={() => {}} />
          {appState.menu === "open" ? <SideMenu session={session} /> : null}
          <Toaster position="top-right" richColors />
          {id && showOrder ? (
            <AboutOrder data={showOrder} />
          ) : (
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
                  orderData={profileData?.orders ? profileData.orders : []}
                  couponData={profileData?.coupons ? profileData.coupons : []}
                  totalOrders={profileData?.totalOrders}
                  totalCoupon={profileData?.totalCoupons}
                />
              ) : (
                <EdtiSection
                  action={action}
                  handleAction={(e: string) => setAction(e)}
                  userData={profileData?.user}
                  updatedData={updatedData}
                  run={runUpdate}
                  loading={loadingUpdate}
                />
              )}
              <button
                onClick={() => router.back()}
                className="text-primary-blue font-medium py-[12px]"
              >
                {lang === "en" ? "Back" : "Буцах"}
              </button>
            </div>
          )}
          <Footer />
        </main>
      );
    }
  } else {
    return <ErrorComponent />;
  }

  // if (!error)
  //   if (loading === true) {
  //     return (
  //       <div className="flex flex-col">
  //         <Header
  //           user={`${session?.user?.name
  //             ?.charAt(0)
  //             .toUpperCase()}${session?.user?.name?.slice(1)}`}
  //         />
  //         <div className="flex h-screen justify-center items-center">
  //           <CircularProgress isIndeterminate={true} color="#3C76FE" />
  //         </div>
  //       </div>
  //     );
  //   } else {
  //     if (profileData) {
  //       return (
  //         <main className="flex flex-col relative gap-[20px]">
  //           <Header
  //             user={`${session?.user?.name
  //               ?.charAt(0)
  //               .toUpperCase()}${session?.user?.name?.slice(1)}`}
  //           />
  //           <BottomSection ver={"fixed"} handleScrollToTopVer={() => {}} />
  //           {appState.menu === "open" ? <SideMenu session={session} /> : null}
  //           <Toaster position="top-right" richColors />
  //           {id && showOrder ? (
  //             <AboutOrder data={showOrder} />
  //           ) : (
  //             <div className="flex w-full flex-col items-center gap-[24px] min-h-screen px-[16px] sm:px-[50px] md:px-[72px] lg:px-[100px] md:gap-[32px] lg:gap-[36px] ">
  //               <ProfileInfo
  //                 userData={profileData?.user}
  //                 totalOrders={profileData?.totalOrders}
  //                 totalReviews={profileData?.totalReviews}
  //                 handleSignOut={handleSignOut}
  //                 handleAction={(e: string) => setAction(e)}
  //                 action={action}
  //               />
  //               {action === "" || action === "saved" ? (
  //                 <HistoryContainer
  //                   orderData={profileData?.orders ? profileData.orders : []}
  //                   couponData={profileData.coupons ? profileData.coupons : []}
  //                   totalOrders={profileData.totalOrders}
  //                   totalCoupon={profileData.totalCoupons}
  //                 />
  //               ) : (
  //                 <EdtiSection
  //                   action={action}
  //                   handleAction={(e: string) => setAction(e)}
  //                   userData={profileData?.user}
  //                   updatedData={updatedData}
  //                   run={runUpdate}
  //                   loading={loadingUpdate}
  //                 />
  //               )}
  //               <button
  //                 onClick={() => router.back()}
  //                 className="text-primary-blue font-medium py-[12px]"
  //               >
  //                 {lang === "en" ? "Back" : "Буцах"}
  //               </button>
  //             </div>
  //           )}

  //           <Footer />
  //         </main>
  //       );
  //     } else {
  //       return (
  //         <div className="flex flex-col">
  //           <Header
  //             user={`${session?.user?.name
  //               ?.charAt(0)
  //               .toUpperCase()}${session?.user?.name?.slice(1)}`}
  //           />
  //           <div className="flex h-screen justify-center items-center">
  //             <CircularProgress isIndeterminate={true} color="#3C76FE" />
  //           </div>
  //         </div>
  //       );
  //     }
  //   }

  // return <ErrorComponent />;
}
