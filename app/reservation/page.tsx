'use client';
import HeaderVariants from '@/components/common/headerVariants';
import CalendarDialog from '@/components/pageComponents/hotelPage/dialogs/calendarDialog';
import AdditionalRequest from '@/components/pageComponents/reservationPage/additionalRequest';
import BottomDialog from '@/components/pageComponents/reservationPage/bottomDialog';
import CancelTerm from '@/components/pageComponents/reservationPage/cancelTerm';
import GeneralInfo from '@/components/pageComponents/reservationPage/generalInfo';
import OrderInfo from '@/components/pageComponents/reservationPage/orderInfo';
import UserInfo from '@/components/pageComponents/reservationPage/userInfo';
import { fetchDataHotel } from '@/utils';
import { useRequest } from 'ahooks';
import Footer from '@/components/common/footer';
import BurgerMenu from '@/components/common/burgermenu';
import { useSearchParams } from 'next/navigation';
import { useAppCtx } from '@/contexts/app';
import { unserialize } from 'serialize-php';
import Header from '@/components/common/header';
import { CircularProgress, ChakraProvider } from '@chakra-ui/react';
import LogIn from '@/components/common/signIn/logIn';
import SignUp from '@/components/common/signIn/signUp';
import ErrorComponent from '@/components/common/404';
import PaymentMethod from '@/components/pageComponents/reservationPage/paymentMethod';

const ReservationPage = () => {
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug');
  const lang = searchParams.get('lang');
  const { appState } = useAppCtx();

  const { data, loading, error } = useRequest(() => {
    if (slug) return fetchDataHotel(slug);
    return fetchDataHotel('');
  });

  let stat = '';
  if (data?.hotel.isOnline == 1 && data?.hotel.isOffline == 0) {
    stat = 'online';
  } else if (data?.hotel.isOnline == 0 && data?.hotel.isOffline == 0) {
    stat = 'pending';
  } else if (
    data?.hotel.isOnline == 0 &&
    data?.hotel.isOffline == 1 &&
    data?.hotel.phone != null
  ) {
    stat = 'offline';
  } else if (
    data?.hotel.isOnline == 0 &&
    data?.hotel.isOffline == 1 &&
    data?.hotel.phone == null
  ) {
    stat = 'data';
  }

  const serializedData: string | undefined = data?.hotel.cancellationPolicies;
  let unserializedData: { day: string; fee: string }[] = [{ day: '', fee: '' }];

  if (serializedData) {
    unserializedData = unserialize(serializedData);
  }
  console.log(data);
  if (!error)
    return (
      <div>
        {loading ? (
          <Header user='' />
        ) : (
          <HeaderVariants
            ver={'hotel'}
            hotelData={[]}
            placesData={[]}
            campsData={[]}
            cityData={[]}
          />
        )}
        <div className='fixed left-[50%] top-[72px] z-[900] hidden h-auto w-auto translate-x-[-50%] lg:flex'>
          {appState.calendar === 'open' ? <CalendarDialog ver={'web'} /> : null}
        </div>
        {appState.logOrSign === 'log' ||
        appState.logOrSign === 'forgotPassword' ? (
          <LogIn />
        ) : null}
        {appState.logOrSign === 'sign' ? <SignUp /> : null}
        {appState.menu === 'open' ? <BurgerMenu /> : null}
        <div className='fixed bottom-0 z-[800] w-full sm:px-[50px] md:px-[72px] lg:hidden '>
          {appState.calendar === 'open' ? (
            <CalendarDialog ver={'mobile'} />
          ) : (
            <BottomDialog stat={stat} />
          )}
        </div>
        {loading === true ? (
          <ChakraProvider>
            <div className='flex h-screen w-full items-center justify-center pb-[100px]'>
              <CircularProgress isIndeterminate={true} color='#3C76FE' />
            </div>
          </ChakraProvider>
        ) : (
          <div className='relative flex w-full flex-col gap-[20px] px-[16px] pb-[150px] pt-[72px] sm:gap-[24px] sm:px-[50px] md:px-[72px] lg:grid lg:grid-cols-5 lg:gap-[48px]  lg:px-[60px] lg:pb-[50px] xl:gap-[64px] xl:px-[100px] 2xl:px-[150px]'>
            <div className='flex flex-col gap-[20px] lg:col-span-3 lg:gap-[32px]'>
              <GeneralInfo
                name={data ? data.hotel.name : null}
                nameEn={data ? data.hotel.nameEn : null}
                image={data ? data.hotel.image : null}
                address={data ? data.hotel.address : null}
                addressEn={data ? data.hotel.addressEn : null}
                phone={data ? data.hotel.phone : null}
                email={data ? data.hotel.email : null}
              />
              <OrderInfo
                rooms={data ? data.rooms : []}
                dollarRate={data ? data.rate : null}
              />
              <div className='lg:hidden'>
                <UserInfo ver={'mobile'} stat={''} />
              </div>
              <CancelTerm
                data={unserializedData}
                rooms={data ? data.rooms : []}
                dollarRate={data ? data.rate : null}
              />
              <AdditionalRequest />
              {stat === 'online' ? (
                <div className='flex w-full flex-col gap-[16px] rounded-[20px] bg-white px-[16px] py-[12px] shadow-[0px_0px_12px_2px_rgb(0,0,0,0.15)] sm:gap-[20px] sm:py-[16px] lg:hidden'>
                  <p className='text-[18px] font-medium leading-[18px] text-sub-text'>
                    {lang === 'en' ? `Payment options` : 'Төлбөрийн сонголт'}
                  </p>
                  <PaymentMethod />
                </div>
              ) : null}
              {stat === 'pending' ? (
                <div className='w-full rounded-[8px] border border-primary-blue/50 px-[20px] py-[12px] text-[12px] font-medium leading-[20px] text-primary-blue 2xs:text-[14px] lg:hidden'>
                  {lang === 'en'
                    ? 'We will contact you shortly after confirming your order request.'
                    : 'Бид захиалах хүсэлт хүлээн авсны дараа таны захиалгыг шалгаад эргээд тантай холбогдох болно.'}
                </div>
              ) : null}
              <button className='flex w-full items-center justify-start gap-[8px] text-[12px] font-medium text-primary-blue/[.75] 2xs:text-[14px]'>
                <svg
                  viewBox='0 0 24 21'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='max-h-[18px] min-h-[18px] min-w-[20px] max-w-[20px] opacity-75 2xs:max-h-[21px] 2xs:min-h-[21px] 2xs:min-w-[24px] 2xs:max-w-[24px]'
                >
                  <path
                    d='M0.425264 9.84365L9.06378 1.27485C9.33425 1.00656 9.70109 0.855835 10.0836 0.855835C10.4661 0.855835 10.8329 1.00656 11.1034 1.27485C11.3739 1.54314 11.5258 1.90702 11.5258 2.28645C11.5258 2.66587 11.3739 3.02975 11.1034 3.29804L4.92329 9.42592L22.5602 9.42592C22.9421 9.42592 23.3083 9.57638 23.5783 9.84421C23.8483 10.112 24 10.4753 24 10.854C24 11.2328 23.8483 11.5961 23.5783 11.8639C23.3083 12.1317 22.9421 12.2822 22.5602 12.2822L4.92329 12.2822L11.101 18.4136C11.3715 18.6819 11.5234 19.0458 11.5234 19.4252C11.5234 19.8046 11.3715 20.1685 11.101 20.4368C10.8306 20.7051 10.4637 20.8558 10.0812 20.8558C9.69869 20.8558 9.33185 20.7051 9.06138 20.4368L0.422867 11.868C0.28862 11.7352 0.182156 11.5773 0.109587 11.4035C0.0370197 11.2297 -0.000221252 11.0434 1.90735e-06 10.8553C0.000225067 10.6672 0.0379066 10.481 0.110886 10.3074C0.183867 10.1338 0.290703 9.97619 0.425264 9.84365Z'
                    fill='#3C76FE'
                  />
                </svg>
                <>{lang === 'en' ? 'Go back' : 'Өмнөх хуудас руу буцах'}</>
              </button>
            </div>
            <div className='relative hidden w-full h-full lg:col-span-2 lg:flex'>
              <div className='sticky top-[72px] h-fit'>
                <UserInfo ver={'web'} stat={stat} />
              </div>
            </div>
          </div>
        )}
        <div className='hidden lg:flex'>
          <Footer />
        </div>
      </div>
    );
  return <ErrorComponent />;
};

export default ReservationPage;
