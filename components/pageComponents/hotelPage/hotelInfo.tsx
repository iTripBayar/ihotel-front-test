import { useSearchParams } from "next/navigation";

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
  const lang = searchParams.get("lang");

  return (
    <div className="flex flex-col gap-[16px] lg:gap-[24px]">
      {/* name */}
      <h3 className="text-[20px] font-medium leading-[24px] lg:text-[26px] lg:leading-[28px]">
        {lang === "en" ? nameEn : name}
      </h3>
      {/* review & stat */}
      <div
        className={` relative flex w-full justify-start items-center gap-[12px] pr-[8px] text-[16px] font-medium text-white lg:hidden`}
      >
        {/* stat */}
        <div
          className={`${
            stat === "online"
              ? "bg-main-online text-white font-semibold"
              : stat === "pending"
              ? "bg-main-pending text-sub-text font-medium"
              : stat === "offline"
              ? "bg-main-offline text-white font-semibold"
              : "bg-main-data text-sub-text font-medium"
          } px-[10px] w-fit py-[6px] text-[14px] leading-[16px] rounded-full flex gap-[4px] items-center`}
        >
          {stat === "online" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="1 1 22 22"
              strokeWidth={2}
              stroke="currentColor"
              className="w-[16px] h-[16px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          ) : stat === "pending" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="1 1 22 22"
              strokeWidth={2}
              stroke="currentColor"
              className="w-[16px] h-[16px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="1 1 22 22"
              strokeWidth={2}
              stroke="currentColor"
              className="w-[16px] h-[16px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
              />
            </svg>
          )}
          {lang === "en" ? (
            <p>
              {stat === "online"
                ? "Instant confirmation"
                : stat === "pending"
                ? "Confirmation delay: "
                : "Booking unavailable"}
              {stat === "pending" ? (
                <span className="text-[14px] font-semibold sm:text-[11px] md:text-[14px]">
                  1-3 hours
                </span>
              ) : null}
            </p>
          ) : (
            <p>
              {stat === "online"
                ? "Шууд баталгаажна"
                : stat === "pending"
                ? "Баталгаажих хугацаа: "
                : "Онлайн захиалга боломжгүй"}
              {stat === "pending" ? (
                <span className="text-[14px] font-semibold sm:text-[11px] md:text-[14px]">
                  1-3 цаг
                </span>
              ) : null}
            </p>
          )}
        </div>
        <div className="flex items-center gap-[8px] text-[18px] tracking-wider text-primary-blue">
          <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-primary-blue text-white">
            <svg
              viewBox="0 2 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[16px] h-[16px]"
            >
              <path
                d="M20.2702 16.265L20.9752 12.185C21.0166 11.9459 21.0052 11.7006 20.9419 11.4663C20.8786 11.232 20.7648 11.0144 20.6086 10.8287C20.4524 10.643 20.2575
                 10.4936 20.0375 10.391C19.8176 10.2885 19.5779 10.2352 19.3352 10.235H14.1542C14.0333 10.235 13.9138 10.2087 13.8041 10.1579C13.6944 10.1071 13.597
                  10.0331 13.5188 9.94087C13.4406 9.84867 13.3834 9.74054 13.3511 9.624C13.3189 9.50746 13.3125 9.3853 13.3322 9.26601L13.9952 5.22101C14.1028 4.56424
                   14.0721 3.89225 13.9052 3.24801C13.8338 2.98181 13.6962 2.73799 13.5053 2.5392C13.3144 2.34042 13.0763 2.19313 12.8132 2.11101L12.6682 2.06401C12.3404
                    1.9587 11.9846 1.98303 11.6742 2.13201C11.3342 2.29601 11.0862 2.59501 10.9942 2.95001L10.5182 4.78401C10.3667 5.36764 10.1465 5.93124 9.8622 6.46301C9.4472
                     7.24001 8.8052 7.86301 8.1372 8.43801L6.6982 9.67801C6.49857 9.85052 6.34266 10.0679 6.24323 10.3123C6.14381 10.5567 6.1037 10.8211 6.1262 11.084L6.9382
                      20.477C6.97399 20.8924 7.16424 21.2793 7.47139 21.5613C7.77854 21.8432 8.18025 21.9998 8.5972 22H13.2452C16.7272 22 19.6982 19.574 20.2702 16.265Z"
                fill="currentColor"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.96808 9.485C3.16134 9.47655 3.35039 9.5431 3.49574 9.67075C3.64109 9.7984 3.7315 9.97727 3.74808 10.17L4.71808 21.406C4.73451 21.5733 4.71666 21.7422
                 4.66562 21.9024C4.61458 22.0626 4.53142 22.2107 4.42122 22.3377C4.31102 22.4647 4.17609 22.5678 4.02468 22.6409C3.87327 22.714 3.70855 22.7555 3.54058
                  22.7627C3.37261 22.77 3.20492 22.743 3.04775 22.6833C2.89058 22.6236 2.74723 22.5325 2.62646 22.4155C2.50568 22.2986 2.41002 22.1582 2.3453 22.003C2.28059
                   21.8479 2.24819 21.6811 2.25008 21.513V10.234C2.25016 10.0407 2.32488 9.85486 2.45866 9.71531C2.59244 9.57576 2.77494 9.49325 2.96808 9.485Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <p>
            {rating}
            <span className="text-[12px] leading-[14px] text-sub-text/50">
              {" "}
              / 10
            </span>
          </p>
        </div>

        {/* <div
          className={`flex h-[36px] items-center justify-center gap-[4px] rounded-[8px] text-center ${
            stat === "online"
              ? "bg-main-online px-[12px] xs:px-[16px] 2xs:px-[20px] sm:px-[28px] "
              : stat === "pending"
              ? "bg-main-pending px-[10px] text-[12px] leading-[14px] text-main-text 2xs:px-[12px] 2xs:text-[14px] sm:px-[20px]"
              : stat === "offline"
              ? "bg-main-offline px-[10px] text-[12px] leading-[14px] 2xs:px-[12px] 2xs:text-[14px] sm:px-[20px]"
              : "bg-black/[.15] px-[10px] text-[12px] leading-[14px] text-main-text 2xs:px-[12px] 2xs:text-[14px] sm:px-[20px]"
          }`}
        >
          {lang === "en" ? (
            <p>
              {stat === "online"
                ? "Instant confirmation"
                : stat === "pending"
                ? "Confirmation delay: "
                : "Booking unavailable"}
              {stat === "pending" ? (
                <span className="font-bold ">1-3 hours</span>
              ) : null}
            </p>
          ) : (
            <p>
              {stat === "online"
                ? "Шууд баталгаажна"
                : stat === "pending"
                ? "Баталгаажих хугацаа: "
                : "Онлайн захиалга боломжгүй"}
              {stat === "pending" ? (
                <span className="font-bold ">1-3 цаг</span>
              ) : null}
            </p>
          )}
        </div> */}
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
          {lang === "en" ? addressEn : address}
        </p>
      </div>
      {/* contact */}
      <div className="flex w-full flex-wrap gap-[12px] tracking-[0.26px]  sm:gap-[20px] lg:hidden">
        {/* review */}
        {/* <div className="flex gap-[4px] items-center text-primary-blue text-[16px] leading-[16px] font-medium ">
          <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-primary-blue text-white">
            <svg
              viewBox="0 2 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[16px] h-[16px]"
            >
              <path
                d="M20.2702 16.265L20.9752 12.185C21.0166 11.9459 21.0052 11.7006 20.9419 11.4663C20.8786 11.232 20.7648 11.0144 20.6086 10.8287C20.4524 10.643 20.2575 10.4936 20.0375 10.391C19.8176 10.2885 19.5779 10.2352 19.3352 10.235H14.1542C14.0333 10.235 13.9138 10.2087 13.8041 10.1579C13.6944 10.1071 13.597 10.0331 13.5188 9.94087C13.4406 9.84867 13.3834 9.74054 13.3511 9.624C13.3189 9.50746 13.3125 9.3853 13.3322 9.26601L13.9952 5.22101C14.1028 4.56424 14.0721 3.89225 13.9052 3.24801C13.8338 2.98181 13.6962 2.73799 13.5053 2.5392C13.3144 2.34042 13.0763 2.19313 12.8132 2.11101L12.6682 2.06401C12.3404 1.9587 11.9846 1.98303 11.6742 2.13201C11.3342 2.29601 11.0862 2.59501 10.9942 2.95001L10.5182 4.78401C10.3667 5.36764 10.1465 5.93124 9.8622 6.46301C9.4472 7.24001 8.8052 7.86301 8.1372 8.43801L6.6982 9.67801C6.49857 9.85052 6.34266 10.0679 6.24323 10.3123C6.14381 10.5567 6.1037 10.8211 6.1262 11.084L6.9382 20.477C6.97399 20.8924 7.16424 21.2793 7.47139 21.5613C7.77854 21.8432 8.18025 21.9998 8.5972 22H13.2452C16.7272 22 19.6982 19.574 20.2702 16.265Z"
                fill="currentColor"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.96808 9.485C3.16134 9.47655 3.35039 9.5431 3.49574 9.67075C3.64109 9.7984 3.7315 9.97727 3.74808 10.17L4.71808 21.406C4.73451 21.5733 4.71666 21.7422 4.66562 21.9024C4.61458 22.0626 4.53142 22.2107 4.42122 22.3377C4.31102 22.4647 4.17609 22.5678 4.02468 22.6409C3.87327 22.714 3.70855 22.7555 3.54058 22.7627C3.37261 22.77 3.20492 22.743 3.04775 22.6833C2.89058 22.6236 2.74723 22.5325 2.62646 22.4155C2.50568 22.2986 2.41002 22.1582 2.3453 22.003C2.28059 21.8479 2.24819 21.6811 2.25008 21.513V10.234C2.25016 10.0407 2.32488 9.85486 2.45866 9.71531C2.59244 9.57576 2.77494 9.49325 2.96808 9.485Z"
                fill="currentColor"
              />
            </svg>
          </div>

          <p>
            {rating}
            <span className="text-[12px] leading-[14px] text-sub-text/50">
              {" "}
              / 10
            </span>
          </p>
        </div> */}

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
