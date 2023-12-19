'use client';
import { useRequest } from 'ahooks';
import { fetchDataHotel } from '@/utils';
import Header from '@/components/common/header';
import Footer from '@/components/common/footer';
import ErrorComponent from '@/components/common/404';
import { useSearchParams } from 'next/navigation';
import { CircularProgress, ChakraProvider } from '@chakra-ui/react';
import BankOptions from '@/components/pageComponents/paymentPage/bankOptions';
import SocialPayOption from '@/components/pageComponents/paymentPage/socialPayOption';
import PassOption from '@/components/pageComponents/paymentPage/passOption';
import CardOption from '@/components/pageComponents/paymentPage/cardOption';
import QpayOption from '@/components/pageComponents/paymentPage/qpayOption';

export default function page() {
  const searchParams = useSearchParams();
  const method = searchParams.get('method');

  const slug = '0d5b13';

  const { data, loading, error } = useRequest(() => {
    if (slug) return fetchDataHotel(slug);
    return fetchDataHotel('');
  });
  if (!error)
    return (
      <div className='flex flex-col items-center justify-between w-full min-h-screen'>
        <Header user={''}/>
        {loading ? (
          <ChakraProvider>
            <div className='flex h-[65vh] w-full items-center justify-center pb-[100px]'>
              <CircularProgress isIndeterminate={true} color='#3C76FE' />
            </div>
          </ChakraProvider>
        ) : (
          <div className='flex min-h-[50vh] w-full items-center justify-center text-white'>
            {method === 'bank' ? (
              <BankOptions />
            ) : method === 'SocialPay' ? (
              <SocialPayOption />
            ) : method === 'pass' ? (
              <PassOption />
            ) : method === 'card' ? (
              <CardOption />
            ) : method === 'qPay' ? <QpayOption/> : null}
          </div>
        )}

        <Footer />
      </div>
    );
  return <ErrorComponent />;
}
