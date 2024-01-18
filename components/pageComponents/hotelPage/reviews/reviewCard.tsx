import Image from "next/image";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

interface Props {
  data: HotelData.Reviews;
  ver: string;
}

export default function ReviewCard({ data, ver }: Props) {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");
  const toDate = new Date(data.updatedAt);
  const dataVal = toDate.toISOString().split("T")[0];
  const [open, setOpen] = useState(false);
  return (
    <div className="relative z-10 h-fit flex flex-col justify-between gap-[8px] rounded-[10px] p-[12px] text-[14px] shadow-[0px_4px_12px_4px_rgb(0,0,0,0.15)] 2xs:gap-[12px] sm:min-h-[200px] sm:px-[16px] ">
      {/* review number */}
      <div className="absolute right-[12px] top-[10px] z-10 flex h-[30px] w-[40px] items-center justify-center rounded-[6px] bg-primary-blue font-medium text-white 2xs:w-[50px] sm:right-[16px]  ">
        {data.average}
      </div>
      <div className="flex flex-col gap-[8px] 2xs:gap-[12px]">
        {/* user info */}
        <div className="flex items-center gap-[8px]">
          <div className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-primary-blue/[.45] text-primary-blue">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="max-h-[18px] min-h-[18px] min-w-[18px] max-w-[18px]"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <p className="font-medium">{"Anonymous"}</p>
          <div className="relative h-[10px] w-[20px] overflow-hidden">
            {" "}
            <Image
              src="/images/mongolian-flag.png"
              alt="/lang"
              width={28}
              height={28}
              sizes="20vw"
              className="absolute left-0 top-0 translate-y-[-30%] scale-[110%] cursor-pointer object-fill"
            />
          </div>
        </div>
        <div className="flex flex-col gap-[8px] 2xs:gap-[14px] items-start">
          {/* title */}
          <p className="text-[15px] font-medium">
            {/* {'Great place to stay. Thank you so much'} */}
            {data.title
              ? data.title
              : "Lorem ipsum dolor sit amet consectetur."}
          </p>
          {/* review */}
          <div className="flex flex-col gap-[2px]">
            <p
              className={` relative  text-justify text-sub-text ${
                open === false ? "line-clamp-3" : "line-clamp-none"
              }`}
            >
              {data.comment}
            </p>
            {ver === "full" ? (
              <button
                className={`text-primary-blue font-medium w-fit flex items-center ${
                  open === true ? " flex-row-reverse" : "flex-row"
                }`}
                onClick={() => setOpen(!open)}
              >
                {open === false
                  ? `${lang === "en" ? "Read more" : "Цааг унших"}`
                  : `${lang === "en" ? "Less" : "Хураангуй"}`}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className={`w-3 h-3 ${
                    open === true ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            ) : null}
          </div>
        </div>
      </div>

      {/* date */}
      <div className="flex w-full items-center border-t-[1px] border-t-black/[.15] pt-[8px]">
        {/* {Date(index.updatedAt)} */}
        {dataVal}
      </div>
    </div>
  );
}
