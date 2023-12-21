'use client';
import Header from '@/components/common/header';
import Footer from '@/components/common/footer';
import SocialPayOption from '@/components/pageComponents/paymentPage/socialPayOption';
import PassOption from '@/components/pageComponents/paymentPage/passOption';
import CardOption from '@/components/pageComponents/paymentPage/cardOption';
import QpayOption from '@/components/pageComponents/paymentPage/qpayOption';
import { useAppCtx } from '@/contexts/app';
import PaymentMethod from '@/components/pageComponents/reservationPage/paymentMethod';
import dynamic from 'next/dynamic';
const ErrorComponent = dynamic(() => import('@/components/common/404'));

export default function PaymentPage() {
  const { appState } = useAppCtx();

  return (
    <div className='flex min-h-screen w-full flex-col items-center justify-between'>
      <Header user={''} />
        <div className='2xl:px[200px] flex min-h-[50vh] w-full flex-col items-center justify-start px-[16px] pt-[16px] sm:px-[42px] sm:pt-[24px] md:px-[72px] lg:px-[150px]'>
          <PaymentMethod />
          {appState.paymentMethod !== '' ? (
            <div className='flex min-h-[50vh] w-full items-center justify-center text-white'>
              {appState.paymentMethod === 'SocialPay' ? (
                <SocialPayOption />
              ) : appState.paymentMethod === 'pass' ? (
                <PassOption />
              ) : appState.paymentMethod === 'card' ? (
                <CardOption />
              ) : appState.paymentMethod === 'qPay' ? (
                <QpayOption />
              ) : null}
            </div>
          ) : null}
        </div>
      <Footer />
    </div>
  );
  // return <ErrorComponent />;
}
