import { Avatar, AvatarGroup, AvatarIcon, user } from "@nextui-org/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

interface Props {
  handleSignOut: () => void;
  userData: {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  };
}

export default function ProfileInfo({ handleSignOut, userData }: Props) {
    const searchParams = useSearchParams()
    const lang = searchParams.get('lang')
  return (
    <div className="flex flex-col gap-[16px] shadow-[0px_0px_12px_4px_rgb(0,0,0,0.15)] max-w-[500px] rounded-[20px] px-[12px] 2xs:px-[16px] sm:px-[20px] sm:py-[20px] py-[16px] w-full">
      {/* avatar */}
      <div className="flex flex-col gap-[12px] justify-center items-center w-full">
        <div className="w-[100px] h-[100px] rounded-full overflow-hidden relative">
          <Image
            src={
              userData?.image ? userData.image : "/samples/profileSample.jpg"
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
            {userData.name
              ? `${userData.name
                  ?.charAt(0)
                  .toUpperCase()}${userData.name?.slice(1)}`
              : "Anonymous"}
          </p>
          <p className="text-[14px] leading-[14px] text-sub-text tracking-wide">
            {userData.email}
          </p>
        </div>
      </div>
      {/* stats */}
      <div className="w-full flex justify-center items-center gap-[10px] text-sub-text py-[12px]">
        {/* orders */}
        <div className="flex flex-col gap-[2px] items-center justify-center">
          <p className="text-[20px] leading-[20px] font-semibold">{`146`}</p>
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
          <p className="text-[20px] leading-[20px] font-semibold">{`98`}</p>
          <p className="text-[13px] leading-[13px]  opacity-80">
            {lang === "en" ? "Reviews" : "Үнэлгээнүүд"}
          </p>
        </div>
      </div>
      {/* change profile info */}
      <div className="flex w-full gap-[16px] items-center text-[13px] leading-[12px] font-medium">
        <button className="h-[42px] w-full rounded-[12px] bg-primary-blue text-white px-[8px] flex gap-[6px] justify-start items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 1 24 24"
            strokeWidth={1.25}
            stroke="currentColor"
            className="min-w-[20px] max-w-[20px] min-h-[20px] max-h-[20px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
          <p>{lang === "en" ? "Edit profile" : "Хувийн бүртгэл"}</p>
        </button>
        <button className="h-[42px] w-full rounded-[12px] bg-primary-blue text-white px-[8px] flex gap-[6px] justify-start items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.25}
            stroke="currentColor"
            className="min-w-[20px] max-w-[20px] min-h-[20px] max-h-[20px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
            />
          </svg>
          <p>{lang === "en" ? "Change password" : "Нууц үг солих"}</p>
        </button>
      </div>
      {/* Log out */}
      <button
        className="w-full bg-main-offline text-white rounded-[12px] flex justify-center items-center gap-[6px] h-[42px] font-medium"
        onClick={() => {
          console.log("log out");
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
