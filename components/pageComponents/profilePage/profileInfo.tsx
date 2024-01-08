import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface Props {
  handleSignOut: () => void;
  userData: User.User | undefined;
  handleAction: (e: string) => void;
  action: string;
  totalOrders: number | undefined;
  totalReviews: number | undefined;
}

export default function ProfileInfo({
  handleSignOut,
  userData,
  handleAction,
  action,
  totalOrders,
  totalReviews,
}: Props) {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");
  return (
    <div className="flex flex-col gap-[16px] shadow-[0px_0px_12px_4px_rgb(0,0,0,0.15)] max-w-[500px] rounded-[20px] px-[12px] 2xs:px-[16px] sm:px-[20px] sm:py-[20px] py-[16px] w-full">
      {/* avatar */}
      <div className="flex flex-col gap-[12px] justify-center items-center w-full">
        <div className="w-[100px] h-[100px] rounded-full overflow-hidden relative">
          <Image
            src={
              userData?.avatar
                ? `${process.env.WEB_URL}/${userData.avatar}`
                : "/samples/camp.jpg"
            }
            alt="/profileImg"
            fill={true}
            sizes="60vw"
            className={`h-auto w-auto select-none object-cover`}
            draggable={false}
          />
        </div>
        <div className="flex flex-col gap-[4px] items-center">
          <p className="text-[24px] font-medium leading-[24px] text-main-text tracking-wide">
            {userData?.name
              ? `${userData.name
                  ?.charAt(0)
                  .toUpperCase()}${userData.name?.slice(1)}`
              : "Anonymous"}
          </p>
          <p className="text-[14px] leading-[14px] text-sub-text tracking-wide">
            {userData?.email}
          </p>
        </div>
      </div>
      {/* stats */}
      <div className="w-full flex justify-center items-center gap-[10px] text-sub-text py-[12px]">
        {/* orders */}
        <div className="flex flex-col gap-[2px] items-center justify-center">
          <p className="text-[20px] leading-[20px] font-semibold">{`${
            totalOrders ? totalOrders : 0
          }`}</p>
          <p className="text-[13px] leading-[13px] opacity-80">
            {lang === "en" ? "Orders" : "Захиалгууд"}
          </p>
        </div>
        {/* divider */}
        <div className="h-[28px] w-[2px] rounded-full bg-sub-text/25"></div>
        {/* Posts */}
        <div className="flex flex-col gap-[2px] items-center justify-center">
          <p className="text-[20px] leading-[20px] font-semibold">{`23`}</p>
          <p className="text-[13px] leading-[13px] opacity-80">
            {lang === "en" ? "Posts" : "Нийтлэлүүд"}
          </p>
        </div>
        {/* divider */}
        <div className="h-[28px] w-[2px] rounded-full bg-sub-text/25"></div>
        {/* Reviews */}
        <div className="flex flex-col gap-[2px] items-center justify-center">
          <p className="text-[20px] leading-[20px] font-semibold">{`${
            totalReviews ? totalReviews : 0
          }`}</p>
          <p className="text-[13px] leading-[13px]  opacity-80">
            {lang === "en" ? "Reviews" : "Үнэлгээнүүд"}
          </p>
        </div>
      </div>
      {/* change profile info */}
      <div className="flex w-full gap-[16px] items-center text-[12px] leading-[12px] font-medium">
        {/* edit profile */}
        <button
          className={`h-[42px] w-full rounded-[12px] px-[8px] flex gap-[6px] justify-start items-center border-primary-blue/50 border-[2px] ${
            action === "info"
              ? "bg-primary-blue text-white transition-all duration-300"
              : "shadow-[inset_0px_0px_16px_4px_rgb(60,118,254,0.075)] bg-white text-primary-blue  transition-all duration-300"
          }`}
          onClick={() => handleAction("info")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 1 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="min-w-[20px] max-w-[20px] min-h-[20px] max-h-[20px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
          <p
            className={`${action === "info" ? "text-white" : "text-main-text"}`}
          >
            {lang === "en" ? "Edit profile" : "Хувийн бүртгэл"}
          </p>
        </button>
        {/* change password */}
        <button
          className={`h-[42px] w-full rounded-[12px] px-[8px] flex gap-[6px] justify-start items-center border-primary-blue/50 border-[2px] ${
            action === "password"
              ? "bg-primary-blue text-white transition-all duration-300"
              : "shadow-[inset_0px_0px_16px_4px_rgb(60,118,254,0.075)] bg-white text-primary-blue  transition-all duration-300"
          }`}
          onClick={() => handleAction("password")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="min-w-[20px] max-w-[20px] min-h-[20px] max-h-[20px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
            />
          </svg>
          <p
            className={`${
              action === "password" ? "text-white" : "text-main-text"
            }`}
          >
            {lang === "en" ? "Change password" : "Нууц үг солих"}
          </p>
        </button>
      </div>
      {userData?.sysRole === "admin" ? (
        <Link
          href={`${process.env.WEB_URL}/ihotel/profile/orders`}
          target="_blank"
          className="w-full bg-primary-blue text-white rounded-[12px] flex justify-center items-center gap-[6px] h-[42px] font-medium"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="min-w-[20px] max-w-[20px] min-h-[20px] max-h-[20px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
            />
          </svg>
          {lang === "en" ? "iHotel admin" : "iHotel админ"}
        </Link>
      ) : null}
      {/* Log out */}
      <button
        className="w-full bg-main-offline text-white rounded-[12px] flex justify-center items-center gap-[6px] h-[42px] font-medium"
        onClick={() => {
          handleSignOut();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="min-w-[20px] max-w-[20px] min-h-[20px] max-h-[20px]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
          />
        </svg>
        {lang === "en" ? "Log Out" : "Гарах"}
      </button>
    </div>
  );
}
