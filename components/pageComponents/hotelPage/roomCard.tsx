import { useState } from "react";
import Image from "next/image";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useAppCtx } from "@/contexts/app";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { toast } from "sonner";
import { Listbox } from "@headlessui/react";

interface Props {
  data: roomData.room;
  stat: string;
  dollarRate: string;
}

const RoomCard = ({ data, stat, dollarRate }: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const lang = searchParams.get("lang");
  const router = useRouter();
  const cart = searchParams.getAll("cart");
  const checkOut = searchParams.get("checkOut");
  const { appState, dispatch } = useAppCtx();
  const [openDesc, setOpenDesc] = useState(false);

  const multipleCreateQueryString = (
    name: string,
    value: string | null,
    name1: string,
    value1: string | null,
    name2: string,
    value2: string | null,
  ) => {
    const params = new URLSearchParams(searchParams);

    if (value !== null && !params.get(name)) {
      params.set(name, value);
    } else if (value !== null && params.get(name)) {
      if (value.split("$")[1] !== "0") {
        for (let i = 0; i < cart.length; i++) {
          if (cart[i].split("$")[0] === data.id.toString()) {
            params.delete(name, cart[i]);
          }
        }
        params.append(name, value);
      } else {
        for (let i = 0; i < cart.length; i++) {
          if (cart[i].split("$")[0] === data.id.toString()) {
            params.delete(name, cart[i]);
          }
        }
      }
    } else {
      params.delete(name);
    }
    if (value1 !== null) {
      params.set(name1, value1);
    } else {
      params.delete(name1);
    }
    if (value2 !== null) {
      params.set(name2, value2);
    } else {
      params.delete(name2);
    }

    return params.toString();
  };

  let updatedAmount = "";
  if (appState.selectedAmount.length > 0) {
    for (let i = 0; i < appState.selectedAmount.length; i++) {
      if (appState.selectedAmount[i].split("$")[0] === data.id.toString()) {
        updatedAmount = appState.selectedAmount[i];
      }
    }
  }
  const roomAmount = [{ id: data?.id, amount: 0 }];
  for (let i = 0; i < data.number; i++) {
    roomAmount.push({ id: data?.id, amount: i + 1 });
  }

  const showToast = (e: { roomName: string; amount: string }) => {
    toast.success(
      `${e.amount} ${e.roomName} ${lang === "en" ? "added" : "нэмэгдлээ"}`,
    );
  };
  // if (data.sales.length > 0 && checkOut) {
  //   console.log();
  // }
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
                  {cart.filter(
                    (index) => parseInt(index.split("$")[0]) === data.id,
                  )[0]
                    ? cart
                        .filter(
                          (index) => parseInt(index.split("$")[0]) === data.id,
                        )[0]
                        .split("$")[1]
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
                  // const value = {
                  //   name: clients.name,
                  //   surName: clients.surName,
                  //   email: clients.email,
                  //   phone: clients.phone,
                  //   nationality: e,
                  // };
                  // updateClients(value);
                  router.replace(
                    `${pathname}?${multipleCreateQueryString(
                      "cart",
                      `${data.id}$${e}`,
                      "roomSelect",
                      null,
                      "room",
                      null,
                    )}`,
                    { scroll: false },
                  );
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
                    {cart.filter(
                      (index) => parseInt(index.split("$")[0]) === data.id,
                    )[0]
                      ? cart
                          .filter(
                            (index) =>
                              parseInt(index.split("$")[0]) === data.id,
                          )[0]
                          .split("$")[1]
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
                  // className={`h-[250px] w-full absolute overflow-auto bg-white rounded-[12px] z-[500] border border-black/[.15] translate-y-[-292px]`}
                  className={`max-h-[200px] min-h-[42px] w-full overflow-auto bg-white rounded-[8px] z-[500] absolute border border-primary-blue text-primary-blue font-medium px-[12px] text-[14px] leading-[16px]`}
                >
                  {roomAmount.map((index, i) => (
                    <Listbox.Option
                      key={i}
                      value={i}
                      className={`flex min-h-[34px] relative cursor-pointer items-center justify-between border-b border-b-primary-blue/50`}
                      // id={index.value}
                      // value={index.label}
                      // className={`h-[32px] w-full flex items-center px-[12px] ${
                      //   clients.nationality === index.label
                      //     ? "justify-between"
                      //     : ""
                      // } text-main-online`}
                      // disabled={person.unavailable}
                    >
                      <p>
                        {index.amount}
                        {lang === "en" ? " room" : " өрөө"}
                      </p>
                      {cart.some(
                        (index) =>
                          parseInt(index.split("$")[0]) === data.id &&
                          parseInt(index.split("$")[1]) === i,
                      ) ||
                      (i === 0 &&
                        !cart.some(
                          (index) => parseInt(index.split("$")[0]) === data.id,
                        )) ? (
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
                      {/* <p className="text-main-text">{index.label}</p> */}
                      {/* {clients.nationality === index.label ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="min-w-[18px] max-w-[18px] min-h-[18px] max-h-[18px]"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m4.5 12.75 6 6 9-13.5"
                          />
                        </svg>
                      ) : null} */}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Listbox>
            </div>
            {appState.selectedRoom === data.id.toString() ? (
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
            ) : null}
          </div>
        ) : null}
        {/* <div className="flex w-full flex-wrap justify-start gap-[16px] text-[14px] leading-[14px] font-medium text-main-text">
          <div className="flex items-center gap-[6px] rounded-[8px] bg-black/10 px-[12px] py-[8px] ">
            <svg
              viewBox="0 0 21 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              // className="max-h-[14px] min-h-[14px] min-w-[21px] max-w-[21px]"
              className="max-h-[12px] min-h-[12px] max-w-[16px] min-w-[16px]"
            >
              <path
                d="M17.1818 1.86667H9.54545V8.4H1.90909V0H0V14H1.90909V11.2H19.0909V14H21V5.6C21 4.60986 20.5977 3.66027 19.8817 2.96013C19.1656 2.26 18.1945 1.86667 17.1818 1.86667ZM5.72727 7.46667C6.48676 7.46667 7.21513 7.17167 7.75217 6.64657C8.28921 6.12146 8.59091 5.40927 8.59091 4.66667C8.59091 3.92406 8.28921 3.21187 7.75217 2.68677C7.21513 2.16167 6.48676 1.86667 5.72727 1.86667C4.96779 1.86667 4.23941 2.16167 3.70238 2.68677C3.16534 3.21187 2.86364 3.92406 2.86364 4.66667C2.86364 5.40927 3.16534 6.12146 3.70238 6.64657C4.23941 7.17167 4.96779 7.46667 5.72727 7.46667Z"
                fill="#212529"
              />
            </svg>
            {data.bedType ? (
              <p>{data.bedType.bedCount ? data.bedType.bedCount : ""}</p>
            ) : null}
          </div>
          {data.floorSize ? (
            <div className="flex items-center gap-[6px] rounded-[8px] bg-black/10 px-[16px] py-[8px] ">
              <svg
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="max-h-[12px] min-h-[12px] max-w-[12px] min-w-[12px]"
                // className="max-h-[14px] min-h-[14px] min-w-[14px] max-w-[14px]"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.2921 0C13.4799 0 13.6599 0.0745786 13.7927 0.207329C13.9254 0.34008 14 0.520128 14 0.707865V7C14 7.18774 13.9254 7.36779 13.7927 7.50054C13.6599 
                7.63329 13.4799 7.70786 13.2921 7.70786C13.1044 7.70786 12.9243 7.63329 12.7916 7.50054C12.6588 7.36779 12.5843 7.18774 12.5843 7V2.41618L2.41618 
                12.5843H7C7.18774 12.5843 7.36779 12.6588 7.50054 12.7916C7.63329 12.9243 7.70786 13.1044 7.70786 13.2921C7.70786 13.4799 7.63329 13.6599 7.50054 
                13.7927C7.36779 13.9254 7.18774 14 7 14H0.707865C0.520128 14 0.34008 13.9254 0.207329 13.7927C0.0745786 13.6599 0 13.4799 0 13.2921V7C-2.77037e-09 
                6.90704 0.0183096 6.81499 0.0538832 6.72911C0.0894567 6.64323 0.141598 6.56519 0.207329 6.49946C0.273061 6.43373 0.351095 6.38159 0.436977 6.34602C0.522859 
                6.31044 0.614907 6.29214 0.707865 6.29214C0.800823 6.29214 0.892871 6.31044 0.978754 6.34602C1.06464 6.38159 1.14267 6.43373 1.2084 6.49946C1.27413 6.56519 
                1.32627 6.64323 1.36185 6.72911C1.39742 6.81499 1.41573 6.90704 1.41573 7V11.5838L11.5838 1.41573H7C6.81226 1.41573 6.63221 1.34115 6.49946 1.2084C6.36671 
                1.07565 6.29214 0.895603 6.29214 0.707865C6.29214 0.520128 6.36671 0.34008 6.49946 0.207329C6.63221 0.0745786 6.81226 0 7 0H13.2921Z"
                  fill="#212529"
                />
              </svg>
              <p>
                {data.floorSize}
                <span className="relative after:content-['2'] after:absolute after:right-0 after:top-0 after:text-[10px] after:leading-[10px] after:translate-x-[70%] after:translate-y-[-15%]">
                  m
                </span>
              </p>
            </div>
          ) : null}
          <div className="flex items-center gap-[4px] rounded-[8px] bg-black/10 px-[16px] py-[8px] ">
            <svg
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="max-h-[12px] min-h-[12px] min-w-[12px] max-w-[12px]"
            >
              <path
                d="M7 0C7.92826 0 8.8185 0.368749 9.47487 1.02513C10.1313 1.6815 10.5 2.57174 10.5 3.5C10.5 4.42826 10.1313
                 5.3185 9.47487 5.97487C8.8185 6.63125 7.92826 7 7 7C6.07174 7 5.1815 6.63125 4.52513 5.97487C3.86875 5.3185 
                 3.5 4.42826 3.5 3.5C3.5 2.57174 3.86875 1.6815 4.52513 1.02513C5.1815 0.368749 6.07174 0 7 0ZM7 8.75C10.8675
                  8.75 14 10.3162 14 12.25V14H0V12.25C0 10.3162 3.1325 8.75 7 8.75Z"
                fill="#212529"
              />
            </svg>
            <p>x{data.occupancy}</p>
          </div>
        </div> */}
        {/* desc */}
        {/* <div className="flex min-h-[80px] w-full flex-col gap-[6px] border-y-[1px] border-y-black/[.15] py-[24px] text-[15px] leading-[16px] text-main-text/50">
          <p
            className={`${openDesc === false ? "line-clamp-1" : ""} w-full `}
            dangerouslySetInnerHTML={{
              __html: data.description ? data.description : "",
            }}
          ></p>
          <p
            className="self-end text-primary-blue"
            onClick={() => setOpenDesc(!openDesc)}
          >
            {openDesc === false
              ? `${lang === "en" ? "More" : "Цааш унших"}`
              : `${lang === "en" ? "Less" : "Хураангуй"}`}
          </p>
        </div> */}

        {/* room price & occupancy */}
        {/* {stat !== "data" ? (
          <div className="flex w-full items-center justify-between text-primary-blue border-t border-t-black/[.15] pt-[12px]">
            <div className="flex items-end gap-[4px]">
              <svg
                viewBox="-1 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="max-h-[20px] min-h-[20px] min-w-[20px] max-w-[20px] text-primary-blue 2xs:max-h-[24px] 2xs:min-h-[24px] 2xs:min-w-[24px] 2xs:max-w-[24px]"
              >
                <path
                  d="M7 0C7.92826 0 8.8185 0.368749 9.47487 1.02513C10.1313 1.6815 10.5 2.57174 10.5 3.5C10.5 4.42826 10.1313 5.3185 9.47487 5.97487C8.8185 6.63125 7.92826
                 7 7 7C6.07174 7 5.1815 6.63125 4.52513 5.97487C3.86875 5.3185 3.5 4.42826 3.5 3.5C3.5 2.57174 3.86875 1.6815 4.52513 1.02513C5.1815 0.368749 
                 6.07174 0 7 0ZM7 8.75C10.8675 8.75 14 10.3162 14 12.25V14H0V12.25C0 10.3162 3.1325 8.75 7 8.75Z"
                  fill="currentColor"
                />
              </svg>
              <p className="text-[16px] font-medium leading-[16px] 2xs:text-[18px] 2xs:leading-[18px]">
                x{data.occupancy}
              </p>
            </div>
            <div className="h-[24px] w-[1px] rounded-full bg-black/[.15] 2xs:h-[30px]">
              {" "}
            </div>
            <div className="text-[20px] font-medium 2xs:text-[24px]">
              {lang === "en"
                ? (data.defaultPrice / parseInt(dollarRate)).toLocaleString()
                : data.defaultPrice.toLocaleString()}
              {lang === "en" ? "$" : "₮"}
              <span className=" text-[14px] font-medium">
                {" "}
                / {lang === "en" ? "day" : "хоног"}
              </span>
            </div>
          </div>
        ) : null} */}
        {/* room select section */}
        {/* {stat === "online" || stat === "pending" ? (
          <div
            className={`relative flex w-full ${
              appState.selectedRoom === data.id.toString()
                ? " justify-between lg:justify-end"
                : "justify-between"
            }`}
          >
            <div
              className={`overflow-hidden rounded-[8px] border-[2px] border-primary-blue/50 px-[12px] text-[14px] font-medium leading-[16px] text-primary-blue 2xs:text-[16px] md:px-[8px] md:text-[14px] ${
                appState.selectedRoom !== data.id.toString()
                  ? "lg:max-h-[38px]"
                  : " lg:hidden"
              }`}
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
                  {updatedAmount.length > 2 ? updatedAmount.split("$")[1] : 0}

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
            </div>
            {appState.selectedRoom === data.id.toString() ? (
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
            ) : null}
            <div
              className="flex h-[38px] items-center justify-center rounded-[8px] border-[2px] border-primary-blue px-[12px] text-[14px] font-medium text-primary-blue 2xs:px-[16px] 2xs:text-[18px] md:px-[8px] md:text-[16px]"
              onClick={() => {
                if (updatedAmount.length > 2) {
                  router.replace(
                    `${pathname}?${multipleCreateQueryString(
                      "cart",
                      updatedAmount,
                      "roomSelect",
                      null,
                      "room",
                      null,
                    )}`,
                    { scroll: false },
                  );
                  showToast({
                    roomName: data.name,
                    amount: updatedAmount.split("$")[1],
                  });
                }
              }}
            >
              {lang === "en" ? "Add to cart" : "Сагсанд нэмэх"}
            </div>
          </div>
        ) : null} */}
        {/* {stat === "online" || stat === "pending" ? (
          <>
            {cart.length < 1 ? (
              <div
                onClick={() => handleScrollToRooms("rooms")}
                className="flex h-[40px] w-full items-center justify-center rounded-[8px] bg-main-online text-[18px] font-medium leading-[18px] text-white"
              >
                {lang === "en" ? "Order" : "Захиалах"}
              </div>
            ) : (
              <Link
                href={{
                  query: {
                    slug: pathname.split("/")[2],
                    checkIn: checkIn,
                    checkOut: checkOut,
                    days: days,
                    cart: cart,
                  },
                  pathname: "/reservation",
                }}
                target="_blank"
                className="flex h-[40px] w-full items-center justify-center rounded-[8px] bg-main-online text-[18px] font-medium leading-[18px] text-white"
              >
                {lang === "en" ? "Order" : "Захиалах"}
              </Link>
            )}
          </>
        ) : null} */}
        {/* <div
          onClick={() => {
            if (!cart || cart.length === 0) {
              handleScrollToRooms('rooms');
            } else {
              handleOrder();
            }
          }}
          className={`flex h-[45px] w-full items-center justify-center rounded-[8px] bg-main-online ${
            orderLoading === true ? 'text-[16px]' : 'text-[22px]'
          } font-medium text-white`}
        >
          {orderLoading === true
            ? `${lang === 'en' ? 'Loading...' : 'Уншиж байна...'}`
            : `${lang === 'en' ? 'Order' : 'Захиалах'}`}
        </div> */}
      </div>
    </div>
  );
};

export default RoomCard;
