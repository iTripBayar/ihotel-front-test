import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";

interface Props {
  data: HotelData.Hotel;
}

export default function General({ data }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const lang = searchParams.get("lang");
  return (
    <div className="flex flex-col gap-[16px] w-full lg:flex-row">
      <div className="w-full h-[200px] 2xs:h-[225px] sm:h-[275px] md:h-[325px] rounded-t-[20px] lg:h-[300px] xl:h-[325px] 2xl:h-[350px] relative overflow-hidden  lg:rounded-[12px]">
        <Image
          src={
            data?.image
              ? `${process.env.IMAGE_URL}${data?.image}`
              : "/samples/camp.png"
          }
          alt="/hotel"
          fill={true}
          quality={100}
          loading="lazy"
          sizes="50vw"
          placeholder="blur"
          blurDataURL={
            data?.image !== null
              ? `"_next/image/?url=${data?.image}"`
              : "/samples/camp.png"
          }
          className="absolute h-auto w-auto select-none object-cover"
          draggable={false}
        />
      </div>
      <div className="flex flex-col gap-[16px] w-full lg:justify-between">
        {/* name & address */}
        <div className=" w-full flex flex-col gap-[6px] ">
          <p className="text-[16px] font-medium leading-[17px] line-clamp-2 w-full text-main-text md:text-[18px] md:leading-[20px]">
            {lang === "en" ? data?.nameEn : data?.name}
          </p>
          <p className="text-[14px] leading-[15px] line-clamp-2 text-sub-text/75 md:text-[16px] md:leading-[17px]">
            {lang === "en" ? data?.addressEn : data?.address}
          </p>
        </div>
        {/* help */}
        <div className="flex flex-col w-full gap-[20px]">
          <div className="flex flex-col w-full gap-[12px]">
            <p className="text-[16px] text-main-text font-medium leadning-[17px] md:text-[18px] md:leading-[20px]">
              {lang === "en" ? "Need help?" : "Тусламж хэрэгтэй юу?"}
            </p>
            <div className="flex flex-col w-full gap-[12px] sm:flex-row lg:flex-col">
              {/* email */}
              <div className="flex w-full gap-[6px] items-center">
                <div className="w-[32px] h-[32px] bg-primary-blue text-white flex justify-center items-center rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="1 1 22 22"
                    fill="currentColor"
                    className="max-h-[18px] min-h-[18px] min-w-[18px] max-w-[18px]"
                  >
                    <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                    <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                  </svg>
                </div>
                <p className="text-main-text text-[14px]">{data?.email}</p>
              </div>
              {/* phone */}
              <div className="flex w-full gap-[6px] items-center text-primary-blue">
                <div className="w-[32px] h-[32px] rounded-full bg-primary-blue text-white flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 1 24 24"
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
                <p className="text-main-text text-[14px]">{data?.phone}</p>
              </div>
            </div>
          </div>
          {/* back btn */}
          <button
            className="flex gap-[6px] text-primary-blue lg:hidden justify-center items-center font-medium h-[42px]"
            onClick={() => router.back()}
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
                d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
              />
            </svg>
            <span>{lang === "en" ? "Back" : "Буцах"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// swagger
// checkin=01%2F09%2F2024&checkout=01%2F10%2F2024
// test
// checkin=1%2F9%2F2024&checkout=1%2F10%2F2024
