import { Collapse, useDisclosure } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { useEffect, useRef } from "react";

interface CartItem {
  id: number;
  name: string;
  nameEn: string;
  amount: number;
  occupancy: number;
  price: number;
  method: string;
}
interface Props {
  dollarRate: string;
  totalPrice: number;
  data: HotelData.Hotel | null;
}

export default function OrderInfo({ dollarRate, totalPrice, data }: Props) {
  const { isOpen, onToggle } = useDisclosure();
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");
  const days = searchParams.get("days");
  const cartArray = searchParams.get("cart");
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const titleRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (titleRef && containerRef) {
      containerRef.current?.scrollTo({
        left: 0,
        top: titleRef.current?.clientTop,
      });
    }
  }, []);

  return (
    <div
      // className="flex h-auto w-full flex-col rounded-[20px] px-[20px] shadow-[0px_0px_12px_2px_rgb(0,0,0,0.15)] lg:mt-[-20px] lg:px-0 lg:shadow-none"
      className="flex h-auto w-full flex-col lg:mt-[-20px]"
      ref={containerRef}
    >
      {/* title */}
      <div className="hidden w-full gap-[24px] lg:flex lg:flex-col">
        {cartArray &&
          JSON.parse(cartArray).map((index: CartItem, i: number) => (
            <div
              className="flex w-full flex-col gap-[10px] border-b border-b-black/[.15] pb-[16px]"
              key={i}
            >
              {/* roomType */}
              <div className="leadin-[14px] flex w-full items-center justify-between text-[14px] font-medium">
                <p className="  text-main-text/[.65]">
                  {lang === "en" ? "Room name" : "Өрөөний нэр"}
                </p>
                <p className="text-[16px] text-main-text">
                  {lang === "en" ? index.nameEn : index.name}
                </p>
              </div>
              {/* Amount */}
              <div className="leadin-[14px] flex w-full items-center justify-between text-[14px] font-medium">
                <p className="  text-main-text/[.65]">
                  {lang === "en" ? "Total rooms" : "Өрөөний тоо"}
                </p>
                <p className="text-[16px] text-main-text">
                  {index.amount} {lang === "en" ? "" : "ш"}
                </p>
              </div>
              {/* duration */}
              <div className="leadin-[14px] flex w-full items-center justify-between text-[14px] font-medium">
                <p className="  text-main-text/[.65]">
                  {lang === "en" ? "Duration" : "Хугацаа"}
                </p>
                <p className="text-[16px] text-main-text">
                  {days} {lang === "en" ? "days" : "хоног"}
                </p>
              </div>
              {/* price per room */}
              <div className="leadin-[14px] flex w-full items-center justify-between text-[14px] font-medium">
                <p className="  text-main-text/[.65]">
                  {lang === "en" ? "Price per day for 1 room" : "Нэгж үнэ"}
                </p>
                <p className="text-[16px] text-main-text">
                  {lang === "en"
                    ? (index.price / parseInt(dollarRate)).toLocaleString()
                    : index.price.toLocaleString()}
                  {lang === "en" ? "$" : "₮"}
                </p>
              </div>
            </div>
          ))}
        <div className="flex w-full items-center justify-between py-[4px] text-[18px] font-medium leading-[18px] text-main-text">
          <h3>{lang === "en" ? "Total price" : "Нийт үнэ"}</h3>
          <h3>
            {lang === "en"
              ? dollarRate
                ? (totalPrice / parseInt(dollarRate)).toLocaleString()
                : ""
              : totalPrice.toLocaleString()}
            {lang === "en" ? "$" : "₮"}
          </h3>
        </div>
      </div>
      {data ? (
        <div className="flex flex-col lg:hidden gap-[16px]">
          {/* <p className="text-[18px] font-medium leading-[18px] text-sub-text lg:hidden">
            {lang === "en" ? "Order information" : "Захиалгийн мэдээлэл"}
          </p> */}
          {/* <div className="relative h-[200px] 2xs:h-[225px] w-full overflow-hidden rounded-[10px] sm:h-[250px] xl:h-[300px]">
            <Image
              src={
                data.image
                  ? `${process.env.IMAGE_URL}${data.image}`
                  : "/samples/camp.png"
              }
              alt="/hotel"
              fill={true}
              quality={100}
              loading="lazy"
              sizes="50vw"
              placeholder="blur"
              blurDataURL={
                data.image !== null
                  ? `"_next/image/?url=${data.image}"`
                  : "/samples/camp.png"
              }
              className="absolute h-auto w-auto select-none object-cover"
              draggable={false}
            />
          </div> */}
          <div className=" px-[12px] flex flex-col gap-[12px]">
            <p
              className="text-[18px] font-medium leading-[20px] text-sub-text"
              ref={titleRef}
            >
              {lang === "en" ? data.nameEn : data.name}
            </p>
            <p className="relative text-justify indent-5 text-[14px] leading-[16px] text-sub-text/75">
              <svg
                viewBox="0 0 13 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-0 top-0 max-h-[14px] min-h-[14px] min-w-[14px] max-w-[14px] translate-y-[0%] lg:max-h-[17px] lg:min-h-[17px] lg:min-w-[17px] lg:max-w-[17px] "
              >
                <path
                  d="M12.9656 0.604255C12.9999 0.524592 13.0096 0.436465 12.9932 0.351279C12.9769 0.266092 12.9354 0.187765 12.8741 0.126432C12.8127 0.0650999 12.7344 0.0235845 12.6492 0.00725787C12.564 -0.00906876 12.4759 0.000544753 12.3962 0.0348545L0.2629 5.23485C0.18211 5.26947 0.113755 5.32783 0.0669079 5.4022C0.0200605 5.47657 -0.0030632 5.56343 0.000603676 5.65125C0.00427055 5.73906 0.0345554 5.82369 0.0874395 5.89389C0.140323 5.9641 0.213305 6.01656 0.2967 6.04432L5.2913 7.70919L6.9553 12.7038C6.98289 12.7875 7.03533 12.8607 7.10563 12.9138C7.17593 12.9669 7.26075 12.9974 7.34877 13.001C7.4368 13.0047 7.52385 12.9815 7.59833 12.9344C7.67281 12.8873 7.73117 12.8187 7.76563 12.7376L12.9656 0.604255Z"
                  fill="#3C76FE"
                />
              </svg>
              {lang === "en" ? data.addressEn : data.address}
            </p>
            <div className="flex flex-wrap gap-[10px]">
              <div className="flex items-center gap-[8px] text-[14px] tracking-wider text-sub-text">
                <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-primary-blue text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
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
                <p>
                  {data.phone &&
                    `${data.phone.slice(0, 4)}-${data.phone.slice(4)}`}
                </p>
              </div>
              <div className="flex items-center gap-[8px] text-[14px] tracking-wider text-sub-text">
                <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-primary-blue text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="max-h-[20px] min-h-[20px] min-w-[20px] max-w-[20px]"
                  >
                    <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                    <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                  </svg>
                </div>
                <p>{data.email}</p>
              </div>
            </div>
          </div>
          {checkIn && checkOut ? (
            <div
              className="flex w-full items-center justify-between gap-[20px] rounded-[20px] bg-white px-[16px] py-[12px] shadow-[0px_0px_12px_2px_rgb(0,0,0,0.15)] 2xs:gap-[36px]"
              // className="flex w-full items-center justify-between gap-[20px] rounded-[20px] bg-white 2xs:gap-[36px] lg:col-span-4 lg:px-0 lg:shadow-none"
            >
              {/* checkIn */}
              <div className="flex flex-col items-center justify-center gap-[4px] sm:gap-[8px] lg:items-start">
                <p className="text-[12px] leading-[14px] text-sub-text/75 sm:text-[14px]">
                  {lang === "en" ? "Check In" : "Ирэх өдөр"}
                </p>
                <h4 className="text-[18px] font-medium leading-[20px] text-primary-blue sm:text-[20px]">
                  {lang === "en"
                    ? format(new Date(checkIn), "MMM dd yyyy")
                    : checkIn}
                </h4>
              </div>
              {/* arrow */}
              <div className="flex items-center justify-center text-primary-blue">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="2 2 24 20"
                  strokeWidth="2.15"
                  stroke="currentColor"
                  className="max-h-[20px] min-h-[20px] min-w-[24px] max-w-[24px]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </div>
              {/* checkOut */}
              <div className="flex flex-col items-center justify-center gap-[4px] sm:gap-[8px] lg:items-start">
                <p className="text-[12px] leading-[14px] text-sub-text/75 sm:text-[14px]">
                  {lang === "en" ? "Check Out" : "Гарах өдөр"}
                </p>
                <h4 className="text-[18px] font-medium  leading-[20px] text-primary-blue sm:text-[20px]">
                  {lang === "en"
                    ? format(new Date(checkOut), "MMM dd yyyy")
                    : checkOut}
                </h4>
              </div>
            </div>
          ) : null}
          <div className="px-[12px] flex flex-col gap-[12px]">
            <p className="text-[18px] font-medium leading-[20px] text-sub-text">
              {lang === "en" ? "Order info" : "Захиалгын мэдээлэл"}
            </p>
          </div>
          {/* info */}
          <Collapse
            in={isOpen}
            animateOpacity
            transition={{
              enter: {
                duration: 0.25,
              },
            }}
            startingHeight={125}
            className={`!flex w-full !relative !flex-col !gap-[16px] !px-[12px] sm:!gap-[20px] ${
              isOpen === true ? " !overflow-visible mb-[40px]" : ""
            } `}
          >
            <button
              onClick={onToggle}
              className={`${
                isOpen === false
                  ? " duration-200 pt-[50px] bg-gradient-to-t from-white bottom-0 to-transparent flex-col backdrop-blur-[0.5px]"
                  : " duration-200  pt-0 bg-transparent bottom-[-40px] flex-col-reverse"
              } transition-all absolute w-full  left-0 text-[16px] leading-[18px] font-medium text-primary-blue flex items-center justify-center   `}
            >
              {isOpen === false
                ? `${lang === "en" ? "See more" : "Дэлгэнэргүй"}`
                : `${lang === "en" ? "See less" : "Хураагуй"}`}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className={`w-5 h-5 ${
                  isOpen === true ? " rotate-180" : "rotate-0"
                } transition-all`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>
            {cartArray &&
              JSON.parse(cartArray).map((index: CartItem, i: number) => (
                <div
                  className="flex w-full flex-col gap-[10px] border-b border-b-black/[.15] pb-[16px]"
                  key={i}
                >
                  {/* roomType */}
                  <div className="leadin-[14px] flex w-full items-center justify-between text-[14px] font-medium">
                    <p className="  text-main-text/[.65]">
                      {lang === "en" ? "Room name" : "Өрөөний нэр"}
                    </p>
                    <p className="text-[16px] text-main-text">
                      {lang === "en" ? index.nameEn : index.name}
                    </p>
                  </div>
                  {/* Amount */}
                  <div className="leadin-[14px] flex w-full items-center justify-between text-[14px] font-medium">
                    <p className="  text-main-text/[.65]">
                      {lang === "en" ? "Total rooms" : "Өрөөний тоо"}
                    </p>
                    <p className="text-[16px] text-main-text">
                      {index.amount} {lang === "en" ? "" : "ш"}
                    </p>
                  </div>
                  {/* duration */}
                  <div className="leadin-[14px] flex w-full items-center justify-between text-[14px] font-medium">
                    <p className="  text-main-text/[.65]">
                      {lang === "en" ? "Duration" : "Хугацаа"}
                    </p>
                    <p className="text-[16px] text-main-text">
                      {days} {lang === "en" ? "days" : "хоног"}
                    </p>
                  </div>
                  {/* price per room */}
                  <div className="leadin-[14px] flex w-full items-center justify-between text-[14px] font-medium">
                    <p className="  text-main-text/[.65]">
                      {lang === "en" ? "price per day for 1 room" : "Нэгж үнэ"}
                    </p>
                    <p className="text-[16px] text-main-text">
                      {lang === "en"
                        ? (index.price / parseInt(dollarRate)).toLocaleString()
                        : index.price.toLocaleString()}
                      {lang === "en" ? "$" : "₮"}
                    </p>
                  </div>
                </div>
              ))}
            <div className="flex w-full items-center justify-between py-[4px] text-[18px] font-medium leading-[18px] text-main-text">
              <h3>{lang === "en" ? "Total price" : "Нийт үнэ"}</h3>
              <h3>
                {lang === "en"
                  ? dollarRate
                    ? (totalPrice / parseInt(dollarRate)).toLocaleString()
                    : ""
                  : totalPrice.toLocaleString()}
                {lang === "en" ? "$" : "₮"}
              </h3>
            </div>
          </Collapse>
        </div>
      ) : null}
    </div>
  );
}
