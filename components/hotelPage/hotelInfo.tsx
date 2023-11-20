import { useSearchParams } from 'next/navigation';

interface Props {
  name: string | undefined;
  nameEn: string | null | undefined;
  rating: number | undefined;
  stat: string;
  phone: string | undefined;
  email: string | undefined;
  address: string | undefined;
  addressEn: string | null | undefined;
}

const HotelInfo = ({
  name,
  nameEn,
  rating,
  stat,
  phone,
  email,
  address,
  addressEn,
}: Props) => {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');

  return (
    <div className="flex flex-col gap-[16px] lg:gap-[24px]">
      {/* name */}
      <h3 className="text-[20px] font-medium leading-[24px] lg:text-[26px] lg:leading-[28px]">
        {lang === 'en' ? nameEn : name}
      </h3>
      {/* review & stat */}
      <div
        className={` relative flex w-full justify-start gap-[12px] pr-[8px] text-[16px] font-medium text-white lg:hidden`}
      >
        {/* review */}
        <div className="flex h-[36px] items-center justify-center gap-[4px] rounded-[8px] bg-primary-blue px-[12px] xs:px-[16px] 2xs:px-[20px] sm:gap-[2px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 1 24 24"
            strokeWidth={1}
            stroke="white"
            className="max-h-[16px] min-h-[16px] min-w-[16px] max-w-[16px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>
          <p>{rating}</p>
        </div>
        {/* stat */}
        <div
          className={`flex h-[36px] items-center justify-center gap-[4px] rounded-[8px] text-center ${
            stat === 'online'
              ? 'bg-main-online px-[12px] xs:px-[16px] 2xs:px-[20px] sm:px-[28px] '
              : stat === 'pending'
              ? 'bg-main-pending px-[10px] text-[12px] leading-[14px] text-main-text 2xs:px-[12px] 2xs:text-[14px] sm:px-[20px]'
              : stat === 'offline'
              ? 'bg-main-offline px-[10px] text-[12px] leading-[14px] 2xs:px-[12px] 2xs:text-[14px] sm:px-[20px]'
              : 'bg-black/[.15] px-[10px] text-[12px] leading-[14px] text-main-text 2xs:px-[12px] 2xs:text-[14px] sm:px-[20px]'
          }`}
        >
          {lang === 'en' ? (
            <p>
              {stat === 'online'
                ? 'Instant confirmation'
                : stat === 'pending'
                ? 'Confirmation delay: '
                : 'Booking unavailable'}
              {stat === 'pending' ? (
                <span className="font-bold ">1-3 hours</span>
              ) : null}
            </p>
          ) : (
            <p>
              {stat === 'online'
                ? 'Шууд баталгаажна'
                : stat === 'pending'
                ? 'Баталгаажих хугацаа: '
                : 'Онлайн захиалга боломжгүй'}
              {stat === 'pending' ? (
                <span className="font-bold ">1-3 цаг</span>
              ) : null}
            </p>
          )}
        </div>
      </div>
      {/* address */}
      <div className="relative w-full text-justify indent-6 text-[14px] leading-[20px] text-primary-blue">
        <svg
          viewBox="0 0 13 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-0 top-0 max-h-[14px] min-h-[14px] min-w-[14px] max-w-[14px] translate-y-[25%] lg:max-h-[17px] lg:min-h-[17px] lg:min-w-[17px] lg:max-w-[17px] lg:translate-y-[10%]"
        >
          <path
            d="M12.9656 0.604255C12.9999 0.524592 13.0096 0.436465 12.9932 0.351279C12.9769 0.266092 12.9354 0.187765 12.8741 0.126432C12.8127 0.0650999 12.7344 0.0235845 12.6492 0.00725787C12.564 -0.00906876 12.4759 0.000544753 12.3962 0.0348545L0.2629 5.23485C0.18211 5.26947 0.113755 5.32783 0.0669079 5.4022C0.0200605 5.47657 -0.0030632 5.56343 0.000603676 5.65125C0.00427055 5.73906 0.0345554 5.82369 0.0874395 5.89389C0.140323 5.9641 0.213305 6.01656 0.2967 6.04432L5.2913 7.70919L6.9553 12.7038C6.98289 12.7875 7.03533 12.8607 7.10563 12.9138C7.17593 12.9669 7.26075 12.9974 7.34877 13.001C7.4368 13.0047 7.52385 12.9815 7.59833 12.9344C7.67281 12.8873 7.73117 12.8187 7.76563 12.7376L12.9656 0.604255Z"
            fill="#3C76FE"
          />
        </svg>
        <p className="text-sub-text  opacity-75">
          {lang === 'en' ? addressEn : address}
        </p>
      </div>
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
    </div>
  );
};

export default HotelInfo;
