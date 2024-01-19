import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

interface Props {
  data: User.Order;
}
export default function HistoryCard({ data }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const lang = searchParams.get("lang");
  const createAdditionalQueryString = (name: string, value: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (value !== null) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    return params.toString();
  };
  return (
    <div className="w-full rounded-[20px] shadow-[0px_0px_12px_4px_rgb(0,0,0,0.15)] flex flex-col gap-[12px] overflow-hidden ">
      {/* img */}
      <div className="relative h-[200px] 2xs:h-[225px] sm:h-[250px] md:h-[225px] lg:h-[250px] xl:h-[300px] w-full flex justify-center items-center">
        <Image
          src={
            data.hotel.image
              ? `${process.env.IMAGE_URL}/${data.hotel.image}`
              : "/samples/camp.png"
          }
          // src="/samples/camp.png"
          alt="/resImg"
          fill={true}
          sizes="60vw"
          className={`h-auto w-auto select-none object-cover absolute z-10`}
          draggable={false}
        />
        {data.isOrderRequest === 1 ? (
          <div className="px-[20px] absolute bottom-0 font-semibold left-[50%] translate-x-[-50%] z-[100] py-[8px] text-[12px] md:text-[14px] md:leading-[14px] leading-[12px] uppercase bg-primary-blue text-white rounded-t-[12px]">
            {lang === "en" ? "Coupon" : "Купон"}
          </div>
        ) : null}
      </div>
      {/* details */}
      <div className="flex flex-col w-full gap-[12px]">
        {/* name and orderID */}
        <div className="flex flex-col gap-[2px] px-[16px]">
          <p className="text-[18px] leading-[18px] font-medium text-main-text">
            {lang === "en"
              ? `${
                  data.hotel.nameEn !== "" || data.hotel.nameEn !== null
                    ? data.hotel.nameEn
                    : "English name missing"
                }`
              : data.hotel.name}
          </p>
          <p className="text-sub-text text-[14px] leading-[14px]">
            RN-{data.id}
          </p>
        </div>
        {/* checkIn & checkOut */}
        <div className="flex justify-between items-center w-[calc(100%-24px)] mx-auto text-primary-blue px-[18px] py-[8px] rounded-[20px] border border-primary-blue/[.5]">
          {/* checkIn */}
          <div className="flex flex-col gap-[2px]">
            <p className="text-[14px] leading-[14px] text-sub-text">
              {lang === "en" ? "Check in" : "Орох өдөр"}
            </p>
            <p className="text-[18px] leading-[18px] font-medium">
              {data.checkIn.split(" ")[0]}
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
              {data.checkOut.split(" ")[0]}
            </p>
          </div>
        </div>
        {/* stat and btns */}
        <div className="w-full flex flex-col pl-[12px] gap-[10px]">
          {/* stat */}
          <div
            className={`px-[12px] py-[6px] w-fit rounded-[8px] text-[12px] uppercase font-semibold ${
              data.status === "checked-out" || data.status === "confirmed"
                ? "bg-main-online text-white"
                : data.status === "pending"
                ? "bg-main-pending"
                : "bg-main-offline text-white"
            }`}
          >
            {data.status === "check-out"
              ? `${lang === "en" ? "Checked out" : "Гарсан"}`
              : data.status === "confirmed"
              ? `${lang === "en" ? "Confirmed" : "Баталгаажсан"}`
              : data.status === "pending"
              ? `${lang === "en" ? "Pending" : "Хүлээгдэж байна"}`
              : `${lang === "en" ? "Canceled" : "Цуцлагдсан"}`}
          </div>
          {/* btns */}
          <div className="flex w-full justify-end">
            {/* <button className="bg-[#f2711c] rounded-tl"></button> */}
            <div
              className={`flex ${
                data.status === "checked-out"
                  ? "bg-[#f2711c] rounded-tl-[16px]"
                  : ""
              }`}
            >
              {data.status === "checked-out" ? (
                <button className="px-[16px] py-[8px] bg-[#f2711c] gap-[2px] rounded-tl-[16px] font-semibold text-white text-[12px] uppercase flex justify-center items-center">
                  {lang === "en" ? "Leave review" : "Үнэлгээ өгөх"}
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
              <Link
                href={{ pathname: `/order/${data.id}` }}
                // onClick={() => {
                //   router.push(
                //     `/profile/?${createAdditionalQueryString(
                //       "id",
                //       data.id ? `${data.id}` : null,
                //     )}`,
                //     { scroll: true },
                //   );
                // }}
                className="px-[16px] py-[8px] bg-primary-blue gap-[2px] rounded-tl-[16px] font-semibold text-white text-[12px] uppercase flex justify-center items-center"
              >
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
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
