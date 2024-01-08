'use client';
import Header from '@/components/common/header';
import Footer from '@/components/common/footer';
import SocialPayOption from '@/components/pageComponents/paymentPage/socialPayOption';
import PassOption from '@/components/pageComponents/paymentPage/passOption';
import QpayOption from '@/components/pageComponents/paymentPage/qpayOption';
import { useAppCtx } from '@/contexts/app';
import PaymentMethod from '@/components/pageComponents/paymentPage/paymentMethod';
import { useRouter } from 'next/navigation';
import { Alert, AlertIcon } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ErrorComponent from '@/components/common/404';
import SideMenu from '@/components/common/sidemenu';

export default function PaymentPage() {
  const router = useRouter();
  const { appState, dispatch } = useAppCtx();
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState(false);

  const handleTimeOut = () => {
    setShowAlert(true);
    dispatch({
      type: 'CHANGE_APP_STATE',
      payload: { paymentMethod: '' },
    });
    setTimeout(() => {
      setShowAlert(false);
      router.back();
    }, 5000);
  };
  useEffect(() => {
    dispatch({
      type: "CHANGE_APP_STATE",
      payload: { logOrSign: "", menu: '' },
    });
  }, []);
const handleError = () => {
  setError(true);
};
  if (error === false) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-between relative">
        <Header user={""} />
        {appState.menu === "open" ? <SideMenu /> : null}
        <div className="2xl:px[200px] relative flex min-h-[50vh] w-full flex-col items-center justify-start px-[16px] pt-[16px] sm:px-[42px] sm:pt-[24px] md:px-[72px] lg:px-[150px]">
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
                />
              ) : appState.paymentMethod === "pass" ? (
                <PassOption
                  handleTimeOut={handleTimeOut}
                  handleError={handleError}
                />
              ) : appState.paymentMethod === "qPay" ? (
                <QpayOption
                  handleError={handleError}
                  handleTimeOut={handleTimeOut}
                />
              ) : null}
            </div>
          ) : null}
        </div>
        <Footer />
      </div>
    );
  }
  return <ErrorComponent />;
}
