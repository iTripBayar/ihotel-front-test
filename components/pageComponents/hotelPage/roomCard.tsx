"use client";
import { useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useAppCtx } from "@/contexts/app";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { toast } from "sonner";
import { Listbox } from "@headlessui/react";

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
  data: roomData.room;
  stat: string;
  dollarRate: string;
  currentCart: CartItem[];
  changeCart: (e: CartItem) => void;
}

const RoomCard = ({
  data,
  stat,
  dollarRate,
  currentCart,
  changeCart,
}: Props) => {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");
  const checkOut = searchParams.get("checkOut");
  const { dispatch } = useAppCtx();
  const [openDesc, setOpenDesc] = useState(false);

  // let updatedAmount = "";
  // if (appState.selectedAmount.length > 0) {
  //   for (let i = 0; i < appState.selectedAmount.length; i++) {
  //     if (appState.selectedAmount[i].split("$")[0] === data.id.toString()) {
  //       updatedAmount = appState.selectedAmount[i];
  //     }
  //   }
  // }
  const roomAmount = [{ id: data?.id, amount: 0 }];
  for (let i = 0; i < data.number; i++) {
    roomAmount.push({ id: data?.id, amount: i + 1 });
  }

  const showToast = (e: { roomName: string; amount: string }) => {
    toast.success(
      `${e.amount} ${e.roomName} ${lang === "en" ? "added" : "нэмэгдлээ"}`,
    );
  };

  return (
    <div className=" flex flex-col  rounded-[16px] shadow-[0px_0px_12px_2px_rgb(0,0,0,0.25)] h-fit">
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        grabCursor
        rewind
        modules={[Pagination]}
        className=" roomImages h-[225px] w-full rounded-t-[16px] 2xs:h-[275px] sm:h-[325px] md:h-[225px] xl:h-[250px] 2xl:h-[275px]"
      >
        {data.images ? (
          data.images.map((index, i) => (
            <SwiperSlide
              className="relative h-full w-full overflow-hidden"
              key={i}
              onClick={() => {
                dispatch({
                  type: "CHANGE_APP_STATE",
                  payload: { biggerImage: data.images },
                });
              }}
            >
              <Image
                src={
                  data.images && data.images.length > 0
                    ? `${process.env.IMAGE_URL}${index}`
                    : "/samples/camp.png"
                }
                // src={index ? `${process.env.IMAGE_URL}${index}` : '/samples/camp.png'}
                alt="/hotel"
                fill={true}
                quality={75}
                loading="lazy"
                sizes="50vw"
                placeholder="blur"
                blurDataURL={
                  data.images.length > 0
                    ? `"_next/image/?url=${data.images[0]}"`
                    : "/samples/camp.png"
                }
                className="absolute h-auto w-auto select-none object-cover duration-700 "
                draggable={false}
              />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide
            className="relative h-full w-full overflow-hidden"
            // key={i}
            onClick={() => {
              if (data.images) {
                dispatch({
                  type: "CHANGE_APP_STATE",
                  payload: { biggerImage: data.images },
                });
              }
            }}
          >
            <Image
              src={"/samples/camp.png"}
              // src={index ? `${process.env.IMAGE_URL}${index}` : '/samples/camp.png'}
              alt="/hotel"
              fill={true}
              quality={75}
              loading="lazy"
              sizes="50vw"
              placeholder="blur"
              blurDataURL={"/samples/camp.png"}
              className="absolute h-auto w-auto select-none object-cover duration-700 blur-[2px]"
              draggable={false}
            />
          </SwiperSlide>
        )}
      </Swiper>
      <div className="flex w-full flex-col  gap-[16px] h-fit px-[16px] py-[16px]">
        <div className="flex flex-col gap-[16px]">
          <div className="flex flex-col w-full gap-[8px]">
            {/* name */}
            <p className="text-[18px] leading-[18px] font-bold text-main-text">
              {lang === "en" ? data.nameEn : data.name}{" "}
            </p>
            {/* bed, size, occupancy */}
            <ul className="text-[14px] leading-[14px] text-sub-text font-medium list-none flex gap-[6px]">
              <li className="flex items-center gap-[6px]">
                {data.occupancy}
                <span>{lang === "en" ? " guests" : " хүн"}</span>
              </li>
              {data.bedType ? (
                <li className="flex items-center gap-[6px]">
                  <div className="flex h-[3px] w-[3px] rounded-full bg-sub-text"></div>
                  {lang === "en"
                    ? data.bedType.nameEn
                      ? data.bedType.nameEn
                      : ""
                    : data.bedType.name
                    ? data.bedType.name
                    : ""}
                </li>
              ) : null}
              {data.floorSize ? (
                <li className="flex items-center gap-[6px]">
                  <div className="flex h-[3px] w-[3px] rounded-full bg-sub-text"></div>
                  <p>
                    {data.floorSize}
                    <span className="relative after:content-['2'] after:absolute after:right-0 after:top-0 after:text-[10px] after:leading-[10px] after:translate-x-[75%] after:translate-y-[-20%]">
                      {" "}
                      m
                    </span>
                  </p>
                </li>
              ) : null}
            </ul>
          </div>
          {data.description ? (
            <div className="flex w-full flex-col gap-[0px] text-[14px] text-sub-text border-t border-t-black/[.15] pt-[12px] font-medium">
              <p
                className={`${openDesc === false ? "line-clamp-3" : ""} w-full`}
                dangerouslySetInnerHTML={{
                  __html:
                    lang === "en"
                      ? `${data.introductionEn ? data.introductionEn : ""}`
                      : `${data.description ? data.description : ""}`,
                }}
              ></p>
              <p
                className="text-primary-blue flex items-center gap-[4px]"
                onClick={() => setOpenDesc(!openDesc)}
              >
                {openDesc === false
                  ? `${lang === "en" ? "More" : "Цааш унших"}`
                  : `${lang === "en" ? "Less" : "Хураангуй"}`}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className={`min-h-[15px] max-h-[15px] min-w-[18px] max-w-[18px] ${
                    openDesc === false
                      ? "rotate-0 duration-200"
                      : " rotate-180 duration-200"
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </p>
            </div>
          ) : null}
        </div>
        {stat === "online" || stat === "pending" ? (
          <div className="w-full flex items-center justify-between border-t border-t-black/[.15] pt-[12px]">
            <div className="text-[20px] leading-[22px] font-medium text-primary-blue flex items-end">
              <div
                className={`flex ${
                  data.sales.length > 0 ? "flex-col items-start" : ""
                }`}
              >
                <p
                  className={
                    data.sales.length > 0 &&
                    checkOut &&
                    new Date(data.sales[0].enddate) >= new Date(checkOut)
                      ? "text-sub-text/75 text-[18px] line-through"
                      : ""
                  }
                >
                  {lang === "en"
                    ? (
                        data.defaultPrice / parseInt(dollarRate)
                      ).toLocaleString()
                    : data.defaultPrice.toLocaleString()}
                </p>
                <p
                  className={`${
                    data.sales.length > 0 &&
                    checkOut &&
                    new Date(data.sales[0].enddate) >= new Date(checkOut)
                      ? ""
                      : "hidden"
                  }`}
                >
                  {lang === "en"
                    ? (
                        data.sales[0]?.price / parseInt(dollarRate)
                      ).toLocaleString()
                    : data.sales[0]?.price.toLocaleString()}
                </p>
              </div>
              <span>{lang === "en" ? "$" : "₮"}</span>
              <span className=" text-[12px] font-medium leading-[14px]">
                {" "}
                / {lang === "en" ? "day" : "хоног"}
              </span>
            </div>
            <button
              disabled={roomAmount.length === 1}
              className={` ${
                roomAmount.length === 1
                  ? "opacity-50 border-primary-blue/25"
                  : "border-primary-blue/50"
              } overflow-hidden rounded-[8px] border-[2px] lg:hidden border-primary-blue/50 px-[10px] text-[14px] font-medium leading-[16px] text-primary-blue 2xs:text-[16px] md:px-[8px] md:text-[14px]`}
              onClick={() => {
                dispatch({
                  type: "CHANGE_APP_STATE",
                  payload: {
                    selectedRoom: data.id.toString(),
                  },
                });
              }}
            >
              <div
                className={`flex h-[34px] items-center justify-center gap-[8px] `}
              >
                <p>
                  {currentCart.length > 0 &&
                  currentCart.some((index) => index.id === data.id)
                    ? currentCart.filter((index) => index.id === data.id)[0]
                        .amount
                    : 0}
                  {lang === "en" ? " rooms" : " өрөө"}
                </p>
                <svg
                  className="max-h-[8px] min-h-[8px] min-w-[12px] max-w-[12px]"
                  viewBox="0 0 12 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.04535 7.14L0.249351 1.658C-0.316649 1.013 0.143351 3.67706e-07 1.00235 3.67706e-07H10.5944C10.7866 -0.000164459 10.9748 0.0550878 11.1365 0.159141C11.2981 0.263194 11.4263 0.411637 11.5058 0.586693C11.5853 0.761749 11.6126 0.955998 11.5845 1.14618C11.5564 1.33636 11.474 1.51441 11.3474 1.659L6.55135 7.139C6.45749 7.24641 6.34174 7.3325 6.21186 7.39148C6.08198 7.45046 5.94099 7.48098 5.79835 7.48098C5.65571 7.48098 5.51472 7.45046 5.38484 7.39148C5.25497 7.3325 5.13921 7.24641 5.04535 7.139V7.14Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </button>
            <div className="hidden lg:flex relative w-[100px]">
              <Listbox
                value={0}
                disabled={roomAmount.length === 1}
                onChange={(e) => {
                  changeCart({
                    id: data.id,
                    name: data.name,
                    nameEn: data.nameEn ? data.nameEn : "",
                    amount: e,
                    occupancy: data.occupancy,
                    price:
                      data.sales.length > 0
                        ? data.sales[0].price
                        : data.defaultPrice,
                    method: e !== 0 ? "add" : "remove",
                  });
                  dispatch({
                    type: "CHANGE_APP_STATE",
                    payload: { selectedRoom: "" },
                  });
                  if (e !== 0) {
                    showToast({
                      roomName: data.name,
                      amount: e.toString(),
                    });
                  }
                }}
              >
                <Listbox.Button
                  className={`w-full h-[42px] text-[16px] rounded-[8px] border-primary-blue border text-primary-blue font-medium flex items-center px-[10px] justify-between  ${
                    roomAmount.length === 1
                      ? "opacity-50 border-primary-blue/50"
                      : " border-primary-blue"
                  }`}
                >
                  <p>
                    {currentCart.some((index) => index.id === data.id)
                      ? currentCart.filter((index) => index.id === data.id)[0]
                          .amount
                      : 0}
                    {lang === "en" ? " room" : " өрөө"}
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.25}
                    stroke="currentColor"
                    className="min-w-[16px] max-w-[16px] min-h-[16px] max-h-[16px]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </Listbox.Button>
                <Listbox.Options
                  className={`max-h-[200px] min-h-[42px] w-full overflow-auto bg-white rounded-[8px] z-[500] absolute border border-primary-blue text-primary-blue font-medium px-[12px] text-[14px] leading-[16px]`}
                >
                  {roomAmount.map((index, i) => (
                    <Listbox.Option
                      key={i}
                      value={i}
                      className={`flex min-h-[34px] relative cursor-pointer items-center justify-between border-b border-b-primary-blue/50`}
                    >
                      <p>
                        {index.amount}
                        {lang === "en" ? " room" : " өрөө"}
                      </p>
                      {currentCart.some(
                        (index) => index.id === data.id && index.amount === i,
                      ) ||
                      (i === 0 &&
                        !currentCart.some((index) => index.id === data.id)) ? (
                        <svg
                          viewBox="0 0 19 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="absolute right-0 top-[50%] max-h-[10px] min-h-[10px] min-w-[14px] max-w-[14px] translate-y-[-50%] text-primary-blue"
                        >
                          <path
                            d="M17 2L7 12L2 7"
                            stroke="#3C76FE"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : null}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Listbox>
            </div>
            {/* {appState.selectedRoom === data.id.toString() ? (
              <div className=" scrollHidden absolute left-0 z-50 hidden max-h-[166px] min-w-[90px] flex-col overflow-y-auto rounded-[8px] border-[2px] border-primary-blue/50 bg-white px-[12px] text-[14px] font-medium leading-[16px] text-primary-blue 2xs:text-[16px] md:px-[8px] md:text-[14px] lg:flex">
                {roomAmount.map((index, i) => (
                  <div
                    key={i}
                    className=" flex min-h-[34px] cursor-pointer items-center justify-center border-b border-b-primary-blue/50"
                    onClick={() => {
                      dispatch({
                        type: "CHANGE_APP_STATE",
                        payload: {
                          selectedRoom: "",
                          selectedAmount: (() => {
                            const newValue = `${data.id}$${roomAmount
                              .indexOf(index)
                              .toString()}`;
                            const indexOfId = appState.selectedAmount.findIndex(
                              (existingValue) => {
                                const [existingId] = existingValue.split("$");
                                return existingId === `${data.id}`;
                              },
                            );

                            // Check if the value already exists in the array
                            const updatedAmount = appState.selectedAmount.map(
                              (existingValue) => {
                                const [existingId] = existingValue.split("$");
                                if (existingId === `${data.id}`) {
                                  // If the ID matches, update the existing value
                                  return newValue;
                                }
                                return existingValue;
                              },
                            );

                            // If the ID doesn't exist, add the new value to the array
                            if (
                              indexOfId === -1 &&
                              !updatedAmount.includes(newValue)
                            ) {
                              updatedAmount.push(newValue);
                            } else if (
                              indexOfId !== -1 &&
                              roomAmount.indexOf(index) === 0
                            ) {
                              // If the ID exists and sampleRooms.indexOf(index) is 0, remove the value
                              updatedAmount.splice(indexOfId, 1);
                            }

                            return updatedAmount;
                          })(),
                        },
                      });
                    }}
                  >
                    {index.amount} {lang === "en" ? "rooms" : "өрөө"}{" "}
                    {roomAmount.indexOf(index) === parseInt(updatedAmount) ? (
                      <svg
                        viewBox="0 0 19 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute right-0 top-[50%] max-h-[14px] min-h-[14px] min-w-[20px] max-w-[20px] translate-y-[-50%] text-primary-blue"
                      >
                        <path
                          d="M17 2L7 12L2 7"
                          stroke="#3C76FE"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : null} */}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default RoomCard;
