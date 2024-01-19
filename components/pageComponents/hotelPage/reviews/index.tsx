import { useSearchParams } from "next/navigation";
import useWindowSize from "@/hooks/windowSize";
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
            .map((index, i) => <ReviewCard data={index} ver={ver} key={i} />)}
        {ver === "full" &&
          data.map((index, i) => <ReviewCard data={index} ver={ver} key={i} />)}
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
      ) : null}
    </div>
  );
};

export default Review;
