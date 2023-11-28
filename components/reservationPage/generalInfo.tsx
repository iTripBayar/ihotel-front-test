import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Collapse, Button, useDisclosure } from '@chakra-ui/react';


interface Props{
  name: string | null;
  nameEn: string | null;
  image: string | null;
  address: string | null;
  addressEn: string | null;
  phone: string | null;
  email: string | null;
}

export default function GeneralInfo({name, nameEn, image, address, addressEn, phone, email}:Props) {
  const searchParams = useSearchParams()
  const lang = searchParams.get('lang')
  const dateFrom = searchParams.get('dateFrom');
  const dateTo = searchParams.get('dateTo');
  const days = searchParams.get('days');
  const { isOpen, onToggle } = useDisclosure();

  const displayDate = {
    from: `${dateFrom?.split('|')[0].split('/')[2]}-${dateFrom
      ?.split('|')[0]
      .split('/')[0]}-${dateFrom?.split('|')[0].split('/')[1]}`,
    fromEn: `${dateFrom?.split('|')[1].split('-')[0]} ${dateFrom
      ?.split('|')[1]
      .split('-')[1]} ${dateFrom?.split('|')[1].split('-')[2]}`,
    to: `${dateTo?.split('|')[0].split('/')[2]}-${dateFrom
      ?.split('|')[0]
      .split('/')[0]}-${dateFrom?.split('|')[0].split('/')[1]}`,
    toEn: `${dateTo?.split('|')[1].split('-')[0]} ${dateFrom
      ?.split('|')[1]
      .split('-')[1]} ${dateFrom?.split('|')[1].split('-')[2]}`,
  };

  console.log(displayDate)
  console.log(dateFrom);


  return (
    <div className="flex w-full flex-col gap-[16px]">
      <h3 className="text-[20px] font-medium text-main-text">
        {lang === 'en' ? nameEn : name}
      </h3>
      <div className="flex w-full flex-col gap-[24px]">
        {/* calendar */}
        <div className="flex w-full flex-col gap-[24px]">
          <div className="flex w-full items-center justify-between gap-[36px] rounded-[20px] bg-white px-[16px] py-[12px] shadow-[0px_0px_12px_2px_rgb(0,0,0,0.15)]">
            {/* dateFrom */}
            <div className="flex flex-col items-center justify-center gap-[4px]">
              <p className="text-[12px] leading-[14px] text-sub-text/75">
                {lang === 'en' ? 'From' : 'Ирэх өдөр'}
              </p>
              <h4 className="text-[18px] font-medium leading-[20px] text-primary-blue">
                {lang === 'en' ? displayDate.fromEn : displayDate.from}
              </h4>
            </div>
            {/* arrow */}
            <div className="flex items-center justify-center text-primary-blue">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="2 2 24 20"
                strokeWidth="2.15"
                stroke="currentColor"
                className="max-h-[20px] min-h-[20px] min-w-[24px] max-w-[24px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </div>
            {/* dateTo */}
            <div className="flex flex-col items-center justify-center gap-[4px]">
              <p className="text-[12px] leading-[14px] text-sub-text/75">
                {lang === 'en' ? 'To' : 'Гарах өдөр'}
              </p>
              <h4 className="text-[18px] font-medium leading-[20px] text-primary-blue">
                {lang === 'en' ? displayDate.fromEn : displayDate.from}
              </h4>
            </div>
          </div>
          <div className="flex min-h-[42px] w-full items-center justify-between rounded-full bg-primary-blue px-[20px] font-medium text-white">
            <div></div>
            <p>{lang === 'en' ? 'Change dates' : 'Өдөр солих'}</p>
            <div className="flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="2 2 24 20"
                strokeWidth="2.15"
                stroke="currentColor"
                className="max-h-[16px] min-h-[16px] min-w-[20px] max-w-[20px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </div>
          </div>
        </div>
        {/* hotelInfo */}
        <div className="flex h-auto w-full flex-col  rounded-[20px] px-[20px] shadow-[0px_0px_12px_2px_rgb(0,0,0,0.15)]">
          {/* title */}
          <Button
            onClick={onToggle}
            className="!m-0 flex h-[41px] w-full items-center !justify-between"
          >
            <p className="text-[18px] font-medium leading-[18px] text-sub-text">
              {lang === 'en' ? 'Hotel Information' : 'Буудлын мэдээлэл'}
            </p>
            <div className="relative h-[20px] w-[20px] rounded-full bg-primary-blue/25">
              <div
                className={`absolute left-[50%] top-[50%] h-[3px] w-[14px] translate-x-[-50%] translate-y-[-50%] rounded-full bg-primary-blue ${
                  isOpen === true
                    ? 'rotate-[180deg] duration-500'
                    : 'rotate-0 duration-500'
                }`}
              ></div>
              <div
                className={`absolute left-[50%] top-[50%] h-[14px] w-[3px] translate-x-[-50%] translate-y-[-50%] rounded-full bg-primary-blue ${
                  isOpen === true
                    ? 'rotate-[270deg] duration-500'
                    : 'rotate-0 duration-500'
                }`}
              ></div>
            </div>
          </Button>
          {/* info */}
          <Collapse
            in={isOpen}
            animateOpacity
            className={`!flex w-full !flex-col !gap-[16px]  ${
              isOpen === true ? 'h-auto pb-[16px]' : 'hidden'
            }`}
          >
            <div className="relative h-[200px] w-full overflow-hidden rounded-[12px]">
              <Image
                // src={
                //   image
                //     ? `https://sandbox.api.myhotel.mn/image?path=${image}`
                //     : '/samples/camp.png'
                // }
                // `https://sandbox.api.myhotel.mn:9443/${data?.coverPhoto}`
                src={
                  image
                    ? `https://sandbox.api.myhotel.mn:9443/${image}`
                    : '/samples/camp.png'
                }
                // src={'/samples/camp.png'}
                alt="/hotel"
                fill={true}
                //   priority
                quality={100}
                loading="lazy"
                sizes="50vw"
                placeholder="blur"
                blurDataURL={
                  image !== null
                    ? `"_next/image/?url=${image}"`
                    : '/samples/camp.png'
                }
                className="absolute h-auto w-auto select-none object-cover"
                draggable={false}
              />
            </div>
            {/* address */}
            <p className="relative text-justify indent-5 text-[14px] leading-[14px] text-sub-text/75">
              <svg
                viewBox="0 0 13 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-0 top-0 max-h-[14px] min-h-[14px] min-w-[14px] max-w-[14px] translate-y-[0%] lg:max-h-[17px] lg:min-h-[17px] lg:min-w-[17px] lg:max-w-[17px] "
              >
                <path
                  d="M12.9656 0.604255C12.9999 0.524592 13.0096 0.436465 12.9932 0.351279C12.9769 0.266092 12.9354 0.187765 12.8741 0.126432C12.8127 0.0650999 12.7344 0.0235845 12.6492 0.00725787C12.564 -0.00906876 12.4759 0.000544753 12.3962 0.0348545L0.2629 5.23485C0.18211 5.26947 0.113755 5.32783 0.0669079 5.4022C0.0200605 5.47657 -0.0030632 5.56343 0.000603676 5.65125C0.00427055 5.73906 0.0345554 5.82369 0.0874395 5.89389C0.140323 5.9641 0.213305 6.01656 0.2967 6.04432L5.2913 7.70919L6.9553 12.7038C6.98289 12.7875 7.03533 12.8607 7.10563 12.9138C7.17593 12.9669 7.26075 12.9974 7.34877 13.001C7.4368 13.0047 7.52385 12.9815 7.59833 12.9344C7.67281 12.8873 7.73117 12.8187 7.76563 12.7376L12.9656 0.604255Z"
                  fill="#3C76FE"
                />
              </svg>
              {lang === 'en' ? addressEn : address}
            </p>
            {/* contact */}
            <div className="flex w-full flex-wrap gap-[12px] tracking-[0.26px]  sm:gap-[20px] lg:hidden">
              <div className="flex items-center gap-[8px] text-[14px] tracking-wider text-sub-text">
                <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-primary-blue text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="max-h-[18px] min-h-[18px] min-w-[18px] max-w-[18px]"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p>{phone && `${phone.slice(0, 4)}-${phone.slice(4)}`}</p>
              </div>
              <div className="flex items-center gap-[8px] text-[14px] tracking-wider text-sub-text">
                <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-primary-blue text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="max-h-[20px] min-h-[20px] min-w-[20px] max-w-[20px]"
                  >
                    <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                    <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                  </svg>
                </div>
                <p>{email}</p>
              </div>
            </div>
          </Collapse>
        </div>
      </div>
    </div>
  );
}

