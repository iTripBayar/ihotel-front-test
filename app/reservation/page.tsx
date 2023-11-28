'use client'
import HeaderVariants from '@/components/common/headerVariants';
import AdditionalRequest from '@/components/reservationPage/additionalRequest';
import BottomDialog from '@/components/reservationPage/bottomDialog';
import CancelTerm from '@/components/reservationPage/cancelTerm';
import GeneralInfo from '@/components/reservationPage/generalInfo';
import OrderInfo from '@/components/reservationPage/orderInfo';
import UserInfo from '@/components/reservationPage/userInfo';
import { fetchDataHotel } from '@/utils';
import { useRequest } from 'ahooks';


const ReservationPage = ({
  searchParams,
}: {
  searchParams: { name: string; slug: string; lang: string };
}) => {
  //   const res = await fetch(
  //     `https://sandbox.api.myhotel.mn:9443/ihotel/hotel/${searchParams.slug}`,
  //     { cache: 'no-store' },
  //     // {next: {revalidate: 10}}
  //   );
  //   const data = await res.json();
const { data } = useRequest(() => {
  return fetchDataHotel(searchParams.slug);
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

console.log(data)
  return (
    <div>
      <HeaderVariants
        ver={'hotel'}
        hotelData={[]}
        placesData={[]}
        campsData={[]}
        destData={[]}
      />
      <div className="flex w-full flex-col gap-[20px] sm:gap-[24px] px-[16px] pb-[150px] pt-[72px] 2xs:pb-[128px] sm:px-[50px] md:px-[72px]  lg:gap-[48px] lg:px-[60px] xl:px-[100px] 2xl:px-[150px]">
        <BottomDialog stat={stat} />
        <GeneralInfo
          name={data ? data.hotel.name : null}
          nameEn={data ? data.hotel.nameEn : null}
          image={data ? data.hotel.coverPhoto : null}
          address={data ? data.hotel.address : null}
          addressEn={data ? data.hotel.addressEn : null}
          phone={data ? data.hotel.phone : null}
          email={data ? data.hotel.email : null}
        />
        <OrderInfo
          rooms={data ? data.rooms : []}
          dollarRate={data ? data.rate : null}
        />
        <UserInfo />
        <AdditionalRequest />
        <CancelTerm />
        <div className="w-full rounded-[8px] border border-primary-blue/50 px-[20px] py-[12px] text-[12px] font-medium leading-[20px] text-primary-blue 2xs:text-[14px]">
          {searchParams.lang === 'en'
            ? 'We will contact you shortly after confirming your order request.'
            : 'Бид захиалах хүсэлт хүлээн авсны дараа таны захиалгыг шалгаад эргээд тантай холбогдох болно.'}
        </div>
        <div className="flex w-full items-center justify-start gap-[8px] text-[12px] font-medium text-primary-blue/[.75] 2xs:text-[14px]">
          <svg
            viewBox="0 0 24 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="max-h-[18px] 2xs:max-h-[21px] min-h-[18px] 2xs:min-h-[21px] min-w-[20px] 2xs:min-w-[24px] max-w-[20px] 2xs:max-w-[24px] opacity-75"
          >
            <path
              d="M0.425264 9.84365L9.06378 1.27485C9.33425 1.00656 9.70109 0.855835 10.0836 0.855835C10.4661 0.855835 10.8329 1.00656 11.1034 1.27485C11.3739 1.54314 11.5258 1.90702 11.5258 2.28645C11.5258 2.66587 11.3739 3.02975 11.1034 3.29804L4.92329 9.42592L22.5602 9.42592C22.9421 9.42592 23.3083 9.57638 23.5783 9.84421C23.8483 10.112 24 10.4753 24 10.854C24 11.2328 23.8483 11.5961 23.5783 11.8639C23.3083 12.1317 22.9421 12.2822 22.5602 12.2822L4.92329 12.2822L11.101 18.4136C11.3715 18.6819 11.5234 19.0458 11.5234 19.4252C11.5234 19.8046 11.3715 20.1685 11.101 20.4368C10.8306 20.7051 10.4637 20.8558 10.0812 20.8558C9.69869 20.8558 9.33185 20.7051 9.06138 20.4368L0.422867 11.868C0.28862 11.7352 0.182156 11.5773 0.109587 11.4035C0.0370197 11.2297 -0.000221252 11.0434 1.90735e-06 10.8553C0.000225067 10.6672 0.0379066 10.481 0.110886 10.3074C0.183867 10.1338 0.290703 9.97619 0.425264 9.84365Z"
              fill="#3C76FE"
            />
          </svg>
          <>
            {searchParams.lang === 'en' ? 'Go back' : 'Өмнөх хуудас руу буцах'}
          </>
        </div>
      </div>
    </div>
  );
};

export default ReservationPage;
