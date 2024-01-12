import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface FavouriteHotels {
  slug: string;
  id: number;
  image: string | null;
  name: string;
  nameEn: string | null;
  address: string | null;
  addressEn: string | null;
  rating: number;
  stat: string;
  displayPrice: number;
  dollarRate: string;
}
interface Props {
  data: FavouriteHotels;
}

export default function FavCard({ data }: Props) {
  const favArray = localStorage.getItem("favouriteHotels");
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");
  const [fav, setFav] = useState<FavouriteHotels[]>(
    favArray ? JSON.parse(favArray) : [],
  );
  const handleFav = () => {
    const array = localStorage.getItem("favouriteHotels");
    let favorites: FavouriteHotels[] = array ? JSON.parse(array) : [];
    const currentHotel = {
      name: data.name,
      nameEn: data.nameEn,
      slug: data.slug,
      id: data.id,
      image: data.image,
      address: data.address,
      addressEn: data.addressEn,
      rating: data.rating,
      stat: data.stat,
      displayPrice: data.displayPrice,
      dollarRate: data.dollarRate,
    };
    if (!array) {
      favorites.push(currentHotel);
      setFav(favorites);
      localStorage.setItem("favouriteHotels", JSON.stringify(favorites));
      // setFav()
    } else {
      const checkExists = favorites.some(
        (index) => index.id === currentHotel.id,
      );
      if (!checkExists) {
        favorites.push(currentHotel);
        setFav(favorites);

        localStorage.setItem("favouriteHotels", JSON.stringify(favorites));
      } else {
        favorites = favorites.filter((index) => index.id !== currentHotel.id);
        setFav(favorites);

        localStorage.setItem("favouriteHotels", JSON.stringify(favorites));
      }
    }
    // localStorage.removeItem("favouriteHotels");
  };
  return (
    <div className={`relative w-full`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={
          fav.some((index) => index.id === data.id)
            ? "#3C76FE"
            : "rgb(255 255 255/50%)"
        }
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke={
          fav.some((hotel: FavouriteHotels) => hotel.id === data.id)
            ? "rgb(255 255 255/75%)"
            : "#3C76FE"
        }
        className={`absolute right-[16px] top-[16px] z-[100] h-[24px] w-[24px] cursor-pointer text-primary-blue ${
          fav.some((hotel: FavouriteHotels) => hotel.id === data.id)
            ? "scale-125 duration-500"
            : "scale-100 duration-500"
        }`}
        // className={`absolute right-[16px] top-[16px] z-[100] h-[24px] w-[24px] cursor-pointer text-primary-blue`}
        onClick={() => {
          handleFav();
          // setFav((prev) => prev !== '"exsits' ? '' : 'exists');
        }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
      <Link
        href={{
          pathname: `/hotel/${data.slug}`,
          // query: { slug: data.slug },
        }}
        className={`flex w-full flex-col justify-between gap-[16px] overflow-hidden rounded-[20px] bg-white shadow-[0px_2px_12px_2px_rgb(0,0,0,0.20)] xl:gap-[20px] ${
          data.stat === "data" ? "max-h-[350px] pb-[10px]" : ""
        } w-full `}
      >
        {/* image */}
        <div
          className={`relative h-[200px] w-full overflow-hidden rounded-[16px] shadow-[0px_0px_12px_2px_rgb(0,0,0,0.15)] xs:h-[225px] 2xs:h-[250px] md:h-[225px] lg:h-[250px]
            sm:h-[175px]`}
        >
          {/* favourites icon */}
          <Image
            src={
              data?.image
                ? `${process.env.IMAGE_URL}/${data?.image}`
                : "/samples/camp.png"
            }
            alt="/hotel"
            fill={true}
            loading="lazy"
            sizes=" 60vw"
            placeholder="blur"
            blurDataURL={
              data.image
                ? `"_next/image/?url=${data?.image}"`
                : "/samples/camp.png"
            }
            className={`h-auto w-auto select-none object-cover duration-700 hover:scale-110 ${
              data?.image ? "" : "blur-[1px]"
            }`}
            draggable={false}
          />
        </div>
        {/* bottom section */}
        <div
          className={`flex w-full flex-col gap-[12px] pl-[14px] ${
            data.stat === "data" ? "opacity-50" : ""
          }`}
        >
          {/* name & location */}
          <div className="flex w-full flex-col gap-[12px] pr-[14px]">
            <p
              className={`line-clamp-1 text-[16px] font-medium leading-[16px] text-main-text 2xs:text-[18px] 2xs:leading-[18px] sm:text-[14px] sm:leading-[14px] md:text-[16px] md:leading-[16px]`}
            >
              {lang === "en" ? data.nameEn : data.name}
            </p>
            <p
              className={`line-clamp-2 min-h-[28px] 2xs:min-h-[32px] md:min-h-[30px] text-[12px] leading-[14px] text-sub-text/60 2xs:text-[14px] 2xs:leading-[16px]`}
            >
              {lang === "en" ? data?.addressEn : data?.address}
            </p>
          </div>
          {/* review & stat */}
          <div
            className={`relative flex w-full gap-[12px] pr-[8px] font-medium text-white ${
              data.stat === "data"
                ? "justify-between pr-[24px] md:mb-[8px] md:pr-[32px]"
                : "justify-start"
            }`}
          >
            {/* review */}
            <div className="flex h-[31px] min-w-[40px] items-center justify-center gap-[4px] rounded-[8px] bg-primary-blue text-[12px] 2xs:min-w-[50px] 2xs:text-[14px] sm:min-w-[38px] sm:gap-[2px] sm:text-[12px] md:min-w-[40px] md:text-[14px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 1 24 24"
                strokeWidth={1}
                stroke="white"
                className="h-[12px] w-[12px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>
              <p>{data.rating}</p>
            </div>
            {/* stat */}
            {data.stat !== "data" ? (
              <div
                className={`flex h-[31px] items-center justify-center gap-[4px] rounded-[8px] text-center ${
                  data.stat === "online"
                    ? "bg-main-online px-[16px] text-[14px] sm:text-[11px] sm:leading-[12px] md:text-[14px] md:leading-[14px]"
                    : data.stat === "pending"
                    ? "bg-main-pending px-[6px] text-[11px] leading-[11px] text-main-text 2xs:px-[8px] 2xs:text-[12px] 2xs:leading-[12px] sm:px-[6px] sm:text-[10px] sm:leading-[10px] md:px-[8px] md:text-[14px] md:leading-[14px]"
                    : "bg-main-offline px-[6px] text-[11px] leading-[11px] 2xs:px-[12px] 2xs:text-[12px] 2xs:leading-[12px] sm:px-[4px] sm:text-[10px] sm:leading-[10px] md:px-[6px] md:text-[14px] md:leading-[14px]"
                }`}
              >
                {lang === "en" ? (
                  <p>
                    {data.stat === "online"
                      ? "Instant confirmation"
                      : data.stat === "pending"
                      ? "Confirmation delay: "
                      : data.stat === "offline"
                      ? "Booking unavailable"
                      : ""}
                    {data.stat === "pending" ? (
                      <span className="text-[14px] font-semibold sm:text-[11px] md:text-[14px]">
                        1-3 hours
                      </span>
                    ) : null}
                  </p>
                ) : (
                  <p>
                    {data.stat === "online"
                      ? "Шууд баталгаажна"
                      : data.stat === "pending"
                      ? "Баталгаажих хугацаа: "
                      : data.stat === "offline"
                      ? "Онлайн захиалга боломжгүй"
                      : ""}
                    {data.stat === "pending" ? (
                      <span className="text-[14px] font-semibold sm:text-[11px] md:text-[14px]">
                        1-3 цаг
                      </span>
                    ) : null}
                  </p>
                )}
              </div>
            ) : (
              // price if stat === 'data'
              <div className="self-end">
                <p className="text-[16px] font-bold text-main-text xs:text-[18px] sm:text-[15px] md:text-[20px] lg:text-[20px]">
                  {/* {lang === "en"
                    ? `${
                        data.dollarRate
                          ? `${
                              data.defaultPrice.length > 0
                                ? (
                                    defaultPrice[0] / parseInt(dollarRate)
                                  ).toLocaleString()
                                : 70000 / parseInt(dollarRate)
                            } $`
                          : `${(70000).toLocaleString()}`
                      } $`
                    : `${
                        defaultPrice.length > 0
                          ? defaultPrice[0].toLocaleString()
                          : (70000).toLocaleString()
                      }₮`} */}
                  {lang === "en"
                    ? `${(
                        data.displayPrice / parseInt(data.dollarRate)
                      ).toLocaleString()} $`
                    : `${data.displayPrice.toLocaleString()} ₮`}
                  <span className="text-[12px] text-sub-text/75 xs:text-[14px] sm:text-[11px] md:text-[14px]">
                    / {lang === "en" ? "day" : "хоног"}
                  </span>
                </p>
              </div>
            )}
          </div>
          {/* price & orderBtn */}
          {data.stat !== "data" ? (
            <div
              className={`flex items-center justify-between ${
                data.stat === "data" ? "h-0" : ""
              }`}
            >
              <p className="text-[16px] font-bold text-main-text xs:text-[18px] sm:text-[15px] md:text-[20px] lg:text-[20px]">
                {lang === "en"
                  ? `${(
                      data.displayPrice / parseInt(data.dollarRate)
                    ).toLocaleString()} $`
                  : `${data.displayPrice.toLocaleString()} ₮`}

                <span className="text-[12px] text-sub-text/75 xs:text-[14px] sm:text-[11px] md:text-[14px]">
                  / {lang === "en" ? "day" : "хоног"}
                </span>
              </p>
              <div
                className={`m-0 flex items-center justify-center gap-[4px] self-end rounded-tl-[20px] bg-primary-blue py-[10px] text-[12px] font-medium text-white xs:text-[14px] sm:text-[13px] md:text-[14px] lg:py-[8px] ${
                  data.stat === "offline"
                    ? "px-[18px] 2xs:px-[24px] lg:px-[16px]"
                    : "px-[12px] 2xs:px-[16px] sm:px-[10px] md:px-[20px]"
                }`}
              >
                {lang === "en" ? (
                  <p>{data.stat === "offline" ? "View" : "Order"}</p>
                ) : (
                  <p>{data.stat === "offline" ? "Харах" : "Захиалах"}</p>
                )}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 2 20 20"
                  strokeWidth={3}
                  stroke="white"
                  className="h-[12px] w-[12px]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </div>
            </div>
          ) : null}
        </div>
      </Link>
    </div>
  );
}
