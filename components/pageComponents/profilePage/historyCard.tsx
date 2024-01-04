import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useAppCtx } from "@/contexts/app"
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";

interface Props {
  data: {
    id: number;
    name: string;
    nameEn: string;
    img: string;
    orderId: string;
    checkIn: string;
    checkOut: string;
    status: string;
  };
}
export default function HistoryCard({data}:Props) {
    const searchParams = useSearchParams()
    const lang = searchParams.get('lang')
    const {appState} = useAppCtx()
  return (
    <div className="w-full rounded-[20px] shadow-[0px_0px_12px_4px_rgb(0,0,0,0.15)] flex flex-col gap-[12px] overflow-hidden ">
      {/* img */}
      <div className="relative h-[200px] 2xs:h-[225px] sm:h-[250px] md:h-[225px] lg:h-[250px] w-full">
        <Image
          src={data.img}
          alt="/resImg"
          fill={true}
          sizes="60vw"
          className={`h-auto w-auto select-none object-cover`}
          draggable={false}
        />
      </div>
      {/* details */}
      <div className="flex flex-col w-full gap-[12px]">
        {/* name and orderID */}
        <div className="flex flex-col gap-[2px] px-[12px]">
          <p className="text-[18px] leading-[18px] font-medium text-main-text">
            {lang === "en" ? data.nameEn : data.name}
          </p>
          <p className="text-sub-text text-[14px] leading-[14px]">
            RN-{data.orderId}
          </p>
        </div>
        {/* checkIn & checkOut */}
        <div className="flex justify-between items-center w-[calc(100%-24px)] mx-auto text-primary-blue px-[18px] py-[8px] rounded-[20px] border border-black/[.15]">
          {/* checkIn */}
          <div className="flex flex-col gap-[2px]">
            <p className="text-[14px] leading-[14px] text-sub-text">
              {lang === "en" ? "Check in" : "Орох өдөр"}
            </p>
            <p className="text-[18px] leading-[18px] font-medium">
              {data.checkIn}
            </p>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="min-w-[20px] max-w-[20px] min-h-[20px] max-h-[20px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>

          {/* checkOut */}
          <div className="flex flex-col gap-[2px]">
            <p className="text-[14px] leading-[14px] text-sub-text">
              {lang === "en" ? "Check out" : "Гарах өдөр"}
            </p>
            <p className="text-[18px] leading-[18px] font-medium">
              {data.checkOut}
            </p>
          </div>
        </div>
        {/* stat and btns */}
        <div className="w-full flex flex-col pl-[12px] gap-[6px]">
          {/* stat */}
          <div
            className={`px-[10px] py-[6px] w-fit rounded-[8px] text-[12px] uppercase ${
              data.status === "paid"
                ? "bg-main-online text-white font-medium"
                : data.status === "pending"
                ? "bg-main-pending"
                : "bg-main-offline"
            }`}
          >
            {data.status}
          </div>
          {/* btns */}
          <div className="flex w-full justify-end">
            {/* <button className="bg-[#f2711c] rounded-tl"></button> */}
            <div
              className={`flex ${
                data.status === "paid" ? "bg-[#f2711c] rounded-tl-[16px]" : ""
              }`}
            >
              {data.status === "paid" ? (
                <button className="px-[10px] py-[8px] bg-[#f2711c] gap-[2px] rounded-tl-[16px] font-semibold text-white text-[12px] uppercase flex justify-center items-center">
                  {lang === "en" ? "Add review" : "Үнэлгээ өгөх"}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 1 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-[14px] h-[14px]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </button>
              ) : null}
              <button className="px-[10px] py-[8px] bg-primary-blue gap-[2px] rounded-tl-[16px] font-semibold text-white text-[12px] uppercase flex justify-center items-center">
                {lang === "en" ? "More" : "Дэлгэрэнгүй"}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 1 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-[14px] h-[14px]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

