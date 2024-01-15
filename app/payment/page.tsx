"use client";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import SocialPayOption from "@/components/pageComponents/paymentPage/socialPayOption";
import PassOption from "@/components/pageComponents/paymentPage/passOption";
import QpayOption from "@/components/pageComponents/paymentPage/qpayOption";
import { useAppCtx } from "@/contexts/app";
import PaymentMethod from "@/components/pageComponents/paymentPage/paymentMethod";
import { useRouter, useSearchParams } from "next/navigation";
import { Alert, AlertIcon } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ErrorComponent from "@/components/common/404";
import SideMenu from "@/components/common/sidemenu";
import { useSession } from "next-auth/react";

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const lang = searchParams.get("lang");
  const totalPrice = searchParams.get("totalPrice");
  const { appState, dispatch } = useAppCtx();
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState(false);
  const [currentTime] = useState(new Date());

  const handleTimeOut = () => {
    setShowAlert(true);
    dispatch({
      type: "CHANGE_APP_STATE",
      payload: { paymentMethod: "" },
    });
    setTimeout(() => {
      setShowAlert(false);
      router.back();
    }, 5000);
  };
  useEffect(() => {
    dispatch({
      type: "CHANGE_APP_STATE",
      payload: { logOrSign: "", menu: "", paymentMethod: "" },
    });
  }, []);

  const handleError = () => {
    setError(true);
  };
  const { data: session } = useSession({
    required: false,
  });
  if (error === false) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-between relative">
        <>
          <title>
            {lang === "en" ? "Payment | iHotel" : "Төлбөр төлөх | iHotel"}
          </title>
          <meta
            name="description"
            content={
              lang === "en" ? "iHotel payment page" : "iHotel төлбөрийн хуудас"
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
        {appState.menu === "open" ? <SideMenu session={session} /> : null}

        <div
          className={`2xl:px-[200px] relative flex ${
            appState.paymentMethod === "" ? "" : ""
          } w-full flex-col items-center justify-start min-h-[425px] gap-[24px] sm:gap-[32px] md:gap-[48px] px-[16px] pt-[16px] sm:px-[42px] sm:pt-[24px] md:px-[72px] lg:px-[150px]`}
        >
          {showAlert === true ? (
            <div className="fixed top-[62px] z-[100] max-w-[250px]">
              <Alert
                status="error"
                className="rounded-[8px] text-[16px] leading-[16px]"
              >
                <AlertIcon />
                Connection timed out!
              </Alert>
            </div>
          ) : null}
          <PaymentMethod />
          {appState.paymentMethod !== "" ? (
            <div className="flex min-h-[50vh] w-full items-center justify-center text-white">
              {appState.paymentMethod === "SocialPay" ? (
                <SocialPayOption
                  handleTimeOut={handleTimeOut}
                  handleError={handleError}
                  time={currentTime}
                />
              ) : appState.paymentMethod === "pass" ? (
                <PassOption
                  handleTimeOut={handleTimeOut}
                  handleError={handleError}
                  time={currentTime}
                />
              ) : appState.paymentMethod === "qPay" ? (
                <QpayOption
                  handleError={handleError}
                  handleTimeOut={handleTimeOut}
                  time={currentTime}
                />
              ) : null}
            </div>
          ) : (
            <div className="flex w-full justify-center items-center flex-col gap-[16px] 2xs:gap-[20px] sm:gap-[24px] md:gap-[32px] px-[24px] pb-[20px] 2xs:px-[32px] sm:px-[75px]">
              {/* info */}
              <div className="flex gap-[32px] font-medium">
                <div className="flex flex-col gap-[8px] items-center leading-[16px]">
                  <p className=" opacity-60">Merchant</p>
                  <p className=" font-medium">{`RN-${id}`}</p>
                </div>
                <div className="flex flex-col gap-[8px] items-center leading-[16px]">
                  <p className=" opacity-60">
                    {lang === "en" ? "Transfer amount" : "Мөнгөн дүн"}
                  </p>
                  <p className=" font-medium">
                    MNT {totalPrice ? parseInt(totalPrice).toLocaleString() : 0}
                  </p>
                </div>
              </div>
              {/* text */}
              <div className="w-full rounded-[12px] border border-primary-blue text-primary-blue p-[12px] max-w-[400px] text-[16px] leading-[20px] font-medium text-center">
                {lang === "en"
                  ? "To proceed to the payment, please select a payment method from above!"
                  : "Та дээрх төлбөрийн сонголтуудаас сонгон төлбөрөө хийнэ үү!"}
              </div>
              <button
                className="font-medium leading-[16px] text-primary-blue py-[20px]"
                onClick={() => {
                  router.back();
                }}
              >
                {lang === "en" ? "Back" : "Буцах"}
              </button>
            </div>
          )}
        </div>
        <Footer />
      </div>
    );
  }
  return <ErrorComponent />;
}
