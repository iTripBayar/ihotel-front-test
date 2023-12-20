'use client';
import { useRequest } from 'ahooks';
import { fetchDataHotel } from '@/utils';
import Header from '@/components/common/header';
import Footer from '@/components/common/footer';
import { CircularProgress, ChakraProvider } from '@chakra-ui/react';
import SocialPayOption from '@/components/pageComponents/paymentPage/socialPayOption';
import PassOption from '@/components/pageComponents/paymentPage/passOption';
import CardOption from '@/components/pageComponents/paymentPage/cardOption';
import QpayOption from '@/components/pageComponents/paymentPage/qpayOption';
import { useAppCtx } from '@/contexts/app';
import PaymentMethod from '@/components/pageComponents/reservationPage/paymentMethod';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
const ErrorComponent = dynamic(() => import('@/components/common/404'));

export default function page() {
  const searchParams = useSearchParams();
  const checkIn = searchParams.get('checkIn');
  const checkOut = searchParams.get('checkOut');

  const { appState } = useAppCtx();

  const slug = '0d5b13';

  const { data, loading, error } = useRequest(() => {
    if (slug)
      return fetchDataHotel({
        slug: slug,
        checkIn: checkIn ? checkIn.split('|')[0] : '',
        checkOut: checkOut ? checkOut.split('|')[0] : '',
      });
    return fetchDataHotel({ slug: '', checkIn: '', checkOut: '' });
  });
  if (!error)
    return (
      <div className='flex min-h-screen w-full flex-col items-center justify-between'>
        <Header user={''} />
        {loading ? (
          <ChakraProvider>
            <div className='flex h-[65vh] w-full items-center justify-center pb-[100px]'>
              <CircularProgress isIndeterminate={true} color='#3C76FE' />
            </div>
          </ChakraProvider>
        ) : (
          <div className='flex min-h-[50vh] w-full flex-col items-center justify-start pt-[50px]'>
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
        )}

        <Footer />
      </div>
    );
  return <ErrorComponent />;
}
