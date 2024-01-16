import { Collapse, Button, useDisclosure } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";

interface Props {
  rooms: roomData.room[];
  dollarRate: string;
  totalPrice: number;
}

export default function OrderInfo({ rooms, dollarRate, totalPrice }: Props) {
  const { isOpen, onToggle } = useDisclosure();
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");
  const days = searchParams.get("days");
  const cart = searchParams.getAll("cart");
  const checkOut = searchParams.get("checkOut");

  return (
    <div className="flex h-auto w-full flex-col rounded-[20px]  px-[20px] shadow-[0px_0px_12px_2px_rgb(0,0,0,0.15)] lg:mt-[-20px] lg:px-0 lg:shadow-none">
      {/* title */}
      <div className="hidden w-full gap-[24px] lg:flex lg:flex-col">
        {cart.map((index, i) => (
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
                {/* {} {lang === 'en' ? '' : ''} */}
                {lang === "en"
                  ? rooms.filter(
                      (room) => room.id === parseInt(index.split("$")[0]),
                    )[0]?.nameEn
                  : rooms.filter(
                      (room) => room.id === parseInt(index.split("$")[0]),
                    )[0]?.name}
              </p>
            </div>
            {/* Amount */}
            <div className="leadin-[14px] flex w-full items-center justify-between text-[14px] font-medium">
              <p className="  text-main-text/[.65]">
                {lang === "en" ? "Total rooms" : "Өрөөний тоо"}
              </p>
              <p className="text-[16px] text-main-text">
                {index.split("$")[1]} {lang === "en" ? "" : "ш"}
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
                {rooms.filter(
                  (room) => room.id === parseInt(index.split("$")[0]),
                )[0].sales.length > 0 &&
                checkOut &&
                new Date(
                  rooms.filter(
                    (room) => room.id === parseInt(index.split("$")[0]),
                  )[0].sales[0].enddate,
                ) >= new Date(checkOut)
                  ? `${
                      lang === "en"
                        ? (
                            rooms.filter(
                              (room) =>
                                room.id === parseInt(index.split("$")[0]),
                            )[0].sales[0].price / parseInt(dollarRate)
                          ).toLocaleString()
                        : rooms
                            .filter(
                              (room) =>
                                room.id === parseInt(index.split("$")[0]),
                            )[0]
                            .sales[0].price.toLocaleString()
                    }`
                  : `${
                      lang === "en"
                        ? (
                            rooms.filter(
                              (room) =>
                                room.id === parseInt(index.split("$")[0]),
                            )[0]?.defaultPrice / parseInt(dollarRate)
                          ).toLocaleString()
                        : rooms
                            .filter(
                              (room) =>
                                room.id === parseInt(index.split("$")[0]),
                            )[0]
                            ?.defaultPrice.toLocaleString()
                    }`}
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
      <div className="flex flex-col lg:hidden ">
        <Button
          onClick={onToggle}
          className="!m-0 flex h-[41px] w-full items-center !justify-between sm:h-[46px] !bg-transparent !px-0"
        >
          <p className="text-[18px] font-medium leading-[18px] text-sub-text">
            {lang === "en" ? "Order Information" : "Захиалгын мэдээлэл"}
          </p>
          <div className="relative h-[20px] w-[20px] rounded-full bg-primary-blue/25">
            <div
              className={`absolute left-[50%] top-[50%] h-[3px] w-[14px] translate-x-[-50%] translate-y-[-50%] rounded-full bg-primary-blue ${
                isOpen === true
                  ? "rotate-[180deg] duration-500"
                  : "rotate-0 duration-500"
              }`}
            ></div>
            <div
              className={`absolute left-[50%] top-[50%] h-[14px] w-[3px] translate-x-[-50%] translate-y-[-50%] rounded-full bg-primary-blue ${
                isOpen === true
                  ? "rotate-[270deg] duration-500"
                  : "rotate-0 duration-500"
              }`}
            ></div>
          </div>
        </Button>
        {/* info */}
        <Collapse
          in={isOpen}
          animateOpacity
          transition={{
            enter: {
              duration: 0.25,
            },
          }}
          className={`!flex w-full !flex-col !gap-[16px] sm:!gap-[20px]  ${
            isOpen === true ? "h-auto pb-[16px] sm:pb-[20px]" : "hidden"
          }`}
        >
          {cart.map((index, i) => (
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
                  {/* {} {lang === 'en' ? '' : ''} */}

                  {lang === "en"
                    ? rooms.filter(
                        (room) => room.id === parseInt(index.split("$")[0]),
                      )[0]?.nameEn
                    : rooms.filter(
                        (room) => room.id === parseInt(index.split("$")[0]),
                      )[0]?.name}
                </p>
              </div>
              {/* Amount */}
              <div className="leadin-[14px] flex w-full items-center justify-between text-[14px] font-medium">
                <p className="  text-main-text/[.65]">
                  {lang === "en" ? "Total rooms" : "Өрөөний тоо"}
                </p>
                <p className="text-[16px] text-main-text">
                  {index.split("$")[1]} {lang === "en" ? "" : "ш"}
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
                  {/* {rooms
                    .filter(
                      (room) => room.id === parseInt(index.split("$")[0]),
                    )[0]
                    ?.priceDayUse.toLocaleString()} */}
                  {rooms.filter(
                    (room) => room.id === parseInt(index.split("$")[0]),
                  )[0].sales.length > 0 &&
                  checkOut &&
                  new Date(
                    rooms.filter(
                      (room) => room.id === parseInt(index.split("$")[0]),
                    )[0].sales[0].enddate,
                  ) >= new Date(checkOut)
                    ? `${
                        lang === "en"
                          ? (
                              rooms.filter(
                                (room) =>
                                  room.id === parseInt(index.split("$")[0]),
                              )[0].sales[0].price / parseInt(dollarRate)
                            ).toLocaleString()
                          : rooms
                              .filter(
                                (room) =>
                                  room.id === parseInt(index.split("$")[0]),
                              )[0]
                              .sales[0].price.toLocaleString()
                      }`
                    : `${
                        lang === "en"
                          ? (
                              rooms.filter(
                                (room) =>
                                  room.id === parseInt(index.split("$")[0]),
                              )[0]?.defaultPrice / parseInt(dollarRate)
                            ).toLocaleString()
                          : rooms
                              .filter(
                                (room) =>
                                  room.id === parseInt(index.split("$")[0]),
                              )[0]
                              ?.defaultPrice.toLocaleString()
                      }`}
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
    </div>
  );
}
