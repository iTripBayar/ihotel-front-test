import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import addDays from "date-fns/addDays";

type iProps = {
  data: HotelData.Hotel;
  fromMap: boolean;
  ver: string;
  dollarRate: string;
};

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

const HotelCard = ({ data, fromMap, ver, dollarRate }: iProps) => {
  const favArray = localStorage.getItem("favouriteHotels");
  const [fav, setFav] = useState<FavouriteHotels[]>(
    favArray ? JSON.parse(favArray) : [],
  );
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");

  let stat = "";
  if (data.isOnline == 1 && data.isOffline == 0) {
    stat = "online";
  } else if (data.isOnline == 0 && data.isOffline == 0) {
    stat = "pending";
  } else if (data.isOnline == 0 && data.isOffline == 1 && data.phone != null) {
    stat = "offline";
  } else if (data.isOnline == 0 && data.isOffline == 1 && data.phone == null) {
    stat = "data";
  }

  const defaultPrice: number[] = [];

  for (let i = 0; i < data?.roomTypes?.length; i++) {
    const salesPrice = data.roomTypes[i].sales;
    if (
      salesPrice.length > 0 &&
      salesPrice[0] &&
      // checkOut &&
      new Date(salesPrice[0].enddate) >= addDays(new Date(Date.now()), 1)
    ) {
      defaultPrice.push(salesPrice[0].price);
    } else {
      const opPrice = data.roomTypes[i].priceOp;
      if (opPrice !== null && opPrice > 0) {
        defaultPrice.push(opPrice);
      } else {
        defaultPrice.push(data.roomTypes[i].defaultPrice);
      }
    }
  }

  defaultPrice.sort((a, b) => a - b);

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
      stat: stat,
      displayPrice: defaultPrice[0],
      dollarRate: dollarRate,
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
  };

  console.log(data.province);

  return (
    <div className={`relative w-full`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={
          fav.length > 0 && fav.filter((index) => index.id === data.id)[0]
            ? "#3C76FE"
            : "rgb(255 255 255/50%)"
        }
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke={
          fav.length > 0 &&
          fav.filter((hotel: FavouriteHotels) => hotel.id === data.id)[0]
            ? "rgb(255 255 255/75%)"
            : "#3C76FE"
        }
        className={`absolute right-[16px] top-[16px] z-[100] h-[24px] w-[24px] cursor-pointer text-primary-blue ${
          fav.length > 0 &&
          fav.filter((hotel: FavouriteHotels) => hotel.id === data.id)[0]
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
        className={`flex w-full h-full flex-col justify-between gap-[16px] overflow-hidden rounded-[20px] bg-white shadow-[0px_2px_12px_2px_rgb(0,0,0,0.20)] xl:gap-[20px] ${
          stat === "data" ? "pb-[10px]" : ""
        } ${fromMap === false ? "w-full" : "w-[110%]"} `}
      >
        <div
          className={`relative h-[200px] min-h-[200px] w-full overflow-hidden rounded-[16px] shadow-[0px_0px_12px_2px_rgb(0,0,0,0.15)] xs:h-[225px] xs:min-h-[225px] 2xs:h-[250px] 2xs:min-h-[250px] md:h-[225px] md:min-h-[225px] lg:min-h-[250px] lg:h-[250px] ${
            ver === "home"
              ? "sm:h-[175px] sm:min-h-[175px]"
              : "2xs:h-[250px] 2xs:min-h-[250px] sm:h-[200px] sm:min-h-[200px] xl:h-[250px] xl:min-h-[250px] 2xl:h-[250px] 2xl:min-h-[250px]"
          }`}
        >
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
            className={`h-auto w-auto select-none object-cover duration-700 ${
              ver !== "map" ? "hover:scale-110" : ""
            } ${data?.image ? "" : "blur-[1px]"}`}
            draggable={false}
          />
        </div>
        <div
          className={`flex w-full flex-col gap-[10px] h-full justify-between pl-[14px] ${
            stat === "data" ? "opacity-50" : ""
          }`}
        >
          <p
            className={`line-clamp-1 font-medium text-main-text text-[18px] leading-[20px]`}
          >
            {lang === "en" ? data.nameEn : data.name}
          </p>
          <div className="flex overflow-hidden w-full items-center gap-[10px] font-medium pr-[14px] text-[14px] leading-[16px]">
            {/* rating */}
            <div className="flex gap-[4px] text-primary-blue text-[16px] ">
              <svg
                viewBox="0 0 24 24"
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
              <p>
                {data.rating}
                <span className="text-[12px] leading-[14px] text-sub-text/50">
                  {" "}
                  / 10
                </span>
              </p>
            </div>
            {/* divider */}
            <div className="w-[1px] h-[16px] bg-black/[.25] sm:hidden md:block"></div>
            {/* address */}
            <div className="text-sub-text/50 flex gap-[4px] ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="2 2 22 22"
                fill="currentColor"
                className="w-[16px] h-[16px]"
              >
                <path
                  fillRule="evenodd"
                  d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                  clipRule="evenodd"
                />
              </svg>
              <p>
                {lang === "en"
                  ? `${
                      data?.province?.international
                        ? data.province.international
                        : "..."
                    }, ${
                      data?.district?.international
                        ? data.district.international
                        : "..."
                    }`
                  : `${data?.province?.name ? data.province.name : "..."}, ${
                      data?.district?.name ? data.district.name : "..."
                    }`}
              </p>
            </div>
          </div>
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

          {stat !== "data" && (
            <div className={`flex w-full justify-between items-center`}>
              <p className="text-[16px] font-semibold text-main-text xs:text-[18px] sm:text-[15px] md:text-[20px] lg:text-[20px]">
                {lang === "en"
                  ? `${
                      dollarRate
                        ? `${
                            defaultPrice.length > 0
                              ? (
                                  defaultPrice[0] / parseInt(dollarRate)
                                ).toLocaleString()
                              : (70000 / parseInt(dollarRate)).toLocaleString()
                          } $`
                        : `${(70000).toLocaleString()} $`
                    } `
                  : `${
                      defaultPrice.length > 0
                        ? defaultPrice[0].toLocaleString()
                        : (70000).toLocaleString()
                    }₮`}

                <span className="text-[12px] text-sub-text/75 xs:text-[14px] sm:text-[11px] md:text-[14px]">
                  / {lang === "en" ? "day" : "хоног"}
                </span>
              </p>
              <div
                className={`m-0 flex items-center justify-center gap-[4px] self-end rounded-tl-[20px] bg-primary-blue py-[6px] text-[12px] font-medium text-white xs:text-[14px] sm:text-[13px] md:text-[14px] lg:py-[8px] ${
                  stat === "offline"
                    ? "px-[18px] 2xs:px-[24px] lg:px-[16px]"
                    : "px-[12px] 2xs:px-[16px] sm:px-[10px] md:px-[20px]"
                }`}
              >
                {lang === "en" ? (
                  <p>{stat === "offline" ? "View" : "Order"}</p>
                ) : (
                  <p>{stat === "offline" ? "Харах" : "Захиалах"}</p>
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
          )}
        </div>
        {/* image */}
        {/* <div
          className={`flex w-full flex-col gap-[12px] justify-between pl-[14px] h-full ${
            stat === "data" ? "opacity-50" : ""
          }`}
        >
          <div className="flex flex-col gap-[12px]">
            <div className="flex w-full flex-col gap-[6px] pr-[14px]">
              <p
                className={`line-clamp-1 text-[16px] font-medium leading-[16px] text-main-text 2xs:text-[18px] 2xs:leading-[18px] sm:text-[14px] sm:leading-[14px] md:text-[16px] md:leading-[16px]`}
              >
                {lang === "en" ? data.nameEn : data.name}
              </p>
              <p
                className={`line-clamp-2 text-[12px] leading-[14px] text-sub-text/60 2xs:text-[14px] 2xs:leading-[16px]`}
              >
                {lang === "en" ? data?.addressEn : data?.address}
              </p>
              <div className="flex justify-between items-center text-[16px] leading-[16px] font-medium">
                <div className="flex items-end gap-[2px] text-primary-blue">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-[20px] h-[20px]"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
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
                  <p>
                    {data.rating}
                    <span className="text-sub-text/75 text-[12px] leading-[12px]">
                      {" "}
                      / 10
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div
              className={`relative flex w-full gap-[12px] pr-[8px] font-medium text-white ${
                stat === "data"
                  ? "justify-between pr-[24px] md:mb-[8px] md:pr-[32px]"
                  : "justify-start"
              }`}
            >
              <div className="flex h-[31px] min-w-[40px] items-center justify-center gap-[4px] rounded-[8px] bg-primary-blue text-[12px] 2xs:min-w-[50px] 2xs:text-[14px] sm:min-w-[38px] sm:gap-[2px] sm:text-[12px] md:min-w-[40px] md:text-[14px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-[12px] w-[12px]"
                >
                  <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
                </svg>

                <p>
                  {data.rating}
                  <span className="text-[10px] leading-[10px]">/10</span>
                </p>
              </div>
              {stat !== "data" ? (
                <div
                  className={`flex h-[31px] items-center justify-center gap-[4px] rounded-[8px] font-[600] text-center ${
                    stat === "online"
                      ? "bg-main-online px-[12px] text-[14px] sm:text-[11px] sm:leading-[12px] md:text-[14px] md:leading-[14px]"
                      : stat === "pending"
                      ? "bg-main-pending px-[6px] text-[11px] leading-[11px] text-main-text 2xs:px-[8px] 2xs:text-[12px] 2xs:leading-[12px] sm:px-[6px] sm:text-[10px] sm:leading-[10px] md:px-[8px] md:text-[14px] md:leading-[14px]"
                      : "bg-main-offline px-[6px] text-[11px] leading-[11px] 2xs:px-[12px] 2xs:text-[12px] 2xs:leading-[12px] sm:px-[4px] sm:text-[10px] sm:leading-[10px] md:px-[6px] md:text-[14px] md:leading-[14px]"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                    />
                  </svg>

                  {lang === "en" ? (
                    <p>
                      {stat === "online"
                        ? "Instant confirmation"
                        : stat === "pending"
                        ? "Confirmation delay: "
                        : stat === "offline"
                        ? "Booking unavailable"
                        : ""}
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
                        : stat === "offline"
                        ? "Онлайн захиалга боломжгүй"
                        : ""}
                      {stat === "pending" ? (
                        <span className="text-[14px] font-semibold sm:text-[11px] md:text-[14px]">
                          1-3 цаг
                        </span>
                      ) : null}
                    </p>
                  )}
                </div>
              ) : (
                <div className="self-end">
                  <p className="text-[16px] font-bold text-main-text xs:text-[18px] sm:text-[15px] md:text-[20px] lg:text-[20px]">
                    {lang === "en"
                      ? `${
                          dollarRate
                            ? `${
                                defaultPrice.length > 0
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
                        }₮`}
                    <span className="text-[12px] text-sub-text/75 xs:text-[14px] sm:text-[11px] md:text-[14px]">
                      / {lang === "en" ? "day" : "хоног"}
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
          {stat !== "data" ? (
            <div
              className={`flex items-center justify-between justify-self-end ${
                stat === "data" ? "h-0" : ""
              }`}
            >
              <p className="text-[16px] font-bold text-main-text xs:text-[18px] sm:text-[15px] md:text-[20px] lg:text-[20px]">
                {lang === "en"
                  ? `${
                      dollarRate
                        ? `${
                            defaultPrice.length > 0
                              ? (
                                  defaultPrice[0] / parseInt(dollarRate)
                                ).toLocaleString()
                              : (70000 / parseInt(dollarRate)).toLocaleString()
                          } $`
                        : `${(70000).toLocaleString()} $`
                    } `
                  : `${
                      defaultPrice.length > 0
                        ? defaultPrice[0].toLocaleString()
                        : (70000).toLocaleString()
                    }₮`}

                <span className="text-[12px] text-sub-text/75 xs:text-[14px] sm:text-[11px] md:text-[14px]">
                  / {lang === "en" ? "day" : "хоног"}
                </span>
              </p>
              <div
                className={`m-0 flex items-center justify-center gap-[4px] self-end rounded-tl-[20px] bg-primary-blue py-[10px] text-[12px] font-medium text-white xs:text-[14px] sm:text-[13px] md:text-[14px] lg:py-[8px] ${
                  stat === "offline"
                    ? "px-[18px] 2xs:px-[24px] lg:px-[16px]"
                    : "px-[12px] 2xs:px-[16px] sm:px-[10px] md:px-[20px]"
                }`}
              >
                {lang === "en" ? (
                  <p>{stat === "offline" ? "View" : "Order"}</p>
                ) : (
                  <p>{stat === "offline" ? "Харах" : "Захиалах"}</p>
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
        </div> */}
      </Link>
    </div>
  );
};

export default HotelCard;
