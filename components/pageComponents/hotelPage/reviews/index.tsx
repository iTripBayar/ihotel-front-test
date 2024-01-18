import { useSearchParams } from "next/navigation";
import Image from "next/image";
import useWindowSize from "@/hooks/windowSize";
import { useState } from "react";
import ReviewCard from "./reviewCard";

interface Props {
  ver: string;
  data: HotelData.Reviews[];
  handleScrollTo: (ver: string) => void;
}

const Review = ({ ver, data, handleScrollTo }: Props) => {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");
  const size = useWindowSize();
  const [page, setPage] = useState(1);

  const dateStrings: string[] = [];
  let totalEmployees = 0;
  let totalFresh = 0;
  let totalComfort = 0;
  let totalLocation = 0;
  let totalPrice = 0;
  let totalThings = 0;
  let totalAverage = 0;

  for (let i = 0; i < data.length; i++) {
    const toDate = new Date(data[i].updatedAt);
    const value = toDate.toISOString().split("T")[0];
    dateStrings.push(value);
    totalEmployees = totalEmployees + data[i].employees;
    totalFresh = totalFresh + data[i].fresh;
    totalComfort = totalComfort + data[i].comfort;
    totalLocation = totalLocation + data[i].location;
    totalPrice = totalPrice + data[i].price;
    totalThings = totalThings + data[i].things;
    totalAverage = totalAverage + data[i].average;
  }

  const reviewGraph = [
    {
      title: "Буудлын ажилчид",
      titleEn: "Staff",
      value: totalEmployees / data.length,
    },
    {
      title: "Өрөөний цэвэр ахуй",
      titleEn: "Freshness",
      value: totalFresh / data.length,
    },
    { title: "Тав тух", titleEn: "Comfort", value: totalComfort / data.length },
    {
      title: "Байршил",
      titleEn: "Location",
      value: totalLocation / data.length,
    },
    { title: "Үнэ", titleEn: "Price", value: totalPrice / data.length },
    {
      title: "Эд хэрэгсэл",
      titleEn: "Furniture",
      value: totalThings / data.length,
    },
  ];
  totalAverage = totalAverage / data.length;

  return (
    <div className="flex w-full flex-col gap-[24px] border-t-[1px] border-t-black/[.1] pt-[24px] text-[16px] lg:border-none lg:pt-0 ">
      <div className="flex w-full items-center justify-between">
        <p className="text-[20px] font-medium leading-[20px]">
          {lang === "en" ? "Reviews" : "Үйлчлүүлэгчдийн сэтгэгдэл"}
        </p>
        {ver === "full" ? (
          <div className="flex h-[30px] w-[40px] items-center justify-center rounded-[6px] bg-primary-blue font-medium text-white 2xs:w-[50px] sm:right-[16px]  ">
            {totalAverage}
          </div>
        ) : null}
      </div>
      {/* graphs */}
      {ver === "full" ? (
        <div className="grid w-full grid-cols-1 gap-[16px] pb-[10px] md:grid-cols-2 lg:grid-cols-3 lg:gap-[16px]">
          {reviewGraph.map((index, i) => (
            <div
              key={i}
              className="flex flex-col gap-[4px] text-[14px] font-medium leading-[16px] text-main-text lg:gap-[16px] lg:text-[16px] lg:leading-[20px]"
            >
              <p>{lang === "en" ? index.titleEn : index.title}</p>
              <div className="flex h-[16px] w-full rounded-full bg-black/[.12] text-[12px] leading-[12px]">
                <div
                  style={{ width: `${index.value * 10}%` }}
                  className={`flex h-full items-center justify-end rounded-full bg-primary-blue px-[12px] tracking-wider text-white`}
                >
                  {index.value * 10}%
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}
      {/* card */}
      <div
        className={`grid grid-cols-1 gap-[20px] md:grid-cols-2 ${
          ver === "full" ? "lg:grid-cols-2" : "lg:grid-cols-1"
        }`}
      >
        {ver !== "full" &&
          data
            .slice(
              0,
              size.width && size.width >= 768 && size.width < 1024 ? 2 : 1,
            )
            .map((index, i) => (
              <ReviewCard data={index} ver={ver} />
              // <div
              //   key={i}
              //   className="relative z-10 flex flex-col justify-between gap-[8px] rounded-[10px] p-[12px] text-[14px] shadow-[0px_4px_12px_4px_rgb(0,0,0,0.15)] 2xs:gap-[12px] sm:min-h-[200px] sm:px-[16px] "
              // >
              //   {/* review number */}
              //   <div className="absolute right-[12px] top-[10px] z-10 flex h-[30px] w-[40px] items-center justify-center rounded-[6px] bg-primary-blue font-medium text-white 2xs:w-[50px] sm:right-[16px]  ">
              //     {index.average}
              //   </div>
              //   {/* user info */}
              //   <div className="flex items-center gap-[8px]">
              //     <div className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-primary-blue/[.45] text-primary-blue">
              //       <svg
              //         xmlns="http://www.w3.org/2000/svg"
              //         viewBox="0 0 24 24"
              //         fill="currentColor"
              //         className="max-h-[18px] min-h-[18px] min-w-[18px] max-w-[18px]"
              //       >
              //         <path
              //           fillRule="evenodd"
              //           d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
              //           clipRule="evenodd"
              //         />
              //       </svg>
              //     </div>
              //     <p className="font-medium">{"Anonymous"}</p>
              //     <div className="relative h-[10px] w-[20px] overflow-hidden">
              //       {" "}
              //       <Image
              //         src="/images/mongolian-flag.png"
              //         alt="/lang"
              //         width={28}
              //         height={28}
              //         sizes="20vw"
              //         className="absolute left-0 top-0 translate-y-[-30%] scale-[110%] cursor-pointer object-fill"
              //       />
              //     </div>
              //   </div>
              //   {/* title */}
              //   <p className="text-[15px] font-medium">
              //     {/* {'Great place to stay. Thank you so much'} */}
              //     {index.title
              //       ? index.title
              //       : "Lorem ipsum dolor sit amet consectetur."}
              //   </p>
              //   {/* review */}
              //   <p
              //     className={` relative line-clamp-3 text-justify text-sub-text`}
              //   >
              //     {index.comment}
              //   </p>

              //   {/* date */}
              //   <div className="flex w-full items-center border-t-[1px] border-t-black/[.15] pt-[8px]">
              //     {/* {Date(index.updatedAt)} */}
              //     {dateStrings[i]}
              //   </div>
              // </div>
            ))}
        {ver === "full" &&
          data.map((index, i) => (
            <ReviewCard data={index} ver={ver} />
            // <div
            //   key={i}
            //   className="relative z-10 flex h-full flex-col gap-[8px] rounded-[10px] p-[12px] text-[14px] shadow-[0px_4px_12px_4px_rgb(0,0,0,0.15)] 2xs:gap-[12px] sm:px-[16px] "
            // >
            //   {/* review number */}
            //   <div className="absolute right-[12px] top-[10px] z-10 flex h-[30px] w-[40px] items-center justify-center rounded-[6px] bg-primary-blue font-medium text-white 2xs:w-[50px] sm:right-[16px]  ">
            //     {index.average}
            //   </div>
            //   {/* user info */}
            //   <div className="flex items-center gap-[8px]">
            //     <div className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-primary-blue/[.45] text-primary-blue">
            //       <svg
            //         xmlns="http://www.w3.org/2000/svg"
            //         viewBox="0 0 24 24"
            //         fill="currentColor"
            //         className="max-h-[18px] min-h-[18px] min-w-[18px] max-w-[18px]"
            //       >
            //         <path
            //           fillRule="evenodd"
            //           d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
            //           clipRule="evenodd"
            //         />
            //       </svg>
            //     </div>
            //     <p className="font-medium">{"Anonymous"}</p>
            //     <div className="relative h-[10px] w-[20px] overflow-hidden">
            //       {" "}
            //       <Image
            //         src="/images/mongolian-flag.png"
            //         alt="/lang"
            //         width={28}
            //         height={28}
            //         sizes="20vw"
            //         className="absolute left-0 top-0 translate-y-[-30%] scale-[110%] cursor-pointer object-fill"
            //       />
            //     </div>
            //   </div>
            //   {/* title */}
            //   <p className="text-[15px] font-medium">
            //     {index.title
            //       ? index.title
            //       : "Lorem ipsum dolor sit amet consectetur."}
            //   </p>
            //   {/* review */}
            //   <p
            //     className={` relative line-clamp-3 text-justify text-sub-text`}
            //   >
            //     {index.comment}
            //   </p>

            //   {/* date */}
            //   <div className="flex w-full items-center border-t-[1px] border-t-black/[.15] pt-[8px]">
            //     {dateStrings[i]}
            //   </div>
            // </div>
          ))}
      </div>
      {ver !== "full" ? (
        <button
          className="self-center rounded-full bg-primary-blue px-[16px] py-[8px] font-medium text-white"
          onClick={() => {
            handleScrollTo("reviews");
          }}
        >
          {lang === "en" ? "More" : "Цааш үзэх"}
        </button>
      ) : (
        <>
          {data.length - 4 * page > 0 ? (
            <button
              className="self-center rounded-full bg-primary-blue px-[16px] py-[8px] font-medium text-white"
              onClick={() => {
                setPage(page + 1);
              }}
            >
              {lang === "en" ? "More" : "Цааш үзэх"}{" "}
              {ver === "full" ? `(${data.length - 4 * page}+)` : null}
            </button>
          ) : null}
        </>
      )}
    </div>
  );
};

export default Review;
