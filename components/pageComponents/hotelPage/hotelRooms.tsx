import { useSearchParams, useRouter } from 'next/navigation';
import RoomCard from './roomCard';
import { useAppCtx } from '@/contexts/app';
import Link from 'next/link';

interface Props {
  data: roomData.room[] | undefined;
  handleScrollToRooms: (ver: string) => void;
  totalPrice: number;
  stat: string;
  dollarRate: string;
  formattedDate: {
    from: { year: string; month: string; date: string };
    fromEn: { year: string; month: string; date: string };
    to: { year: string; month: string; date: string };
    toEn: { year: string; month: string; date: string };
  };
}

const HotelRooms = ({
  data,
  handleScrollToRooms,
  totalPrice,
  stat,
  dollarRate,
  formattedDate,
}: Props) => {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');
  const cart = searchParams.getAll('cart');
  const router = useRouter();
  const checkIn = searchParams.get('checkIn');
  const checkOut = searchParams.get('checkOut');
  const days = searchParams.get('days');
  const slug = searchParams.get('slug');
  const { dispatch } = useAppCtx();

  const createQueryString = (name: string, index: number) => {
    const params = new URLSearchParams(searchParams);
    params.delete(name, cart[index]);
    return params.toString();
  };

  let displayDate = { mn: '', en: '', days: '' };

  const mnDate = {
    from: {
      month: checkIn?.split('|')[0].split('/')[0],
      date: checkIn?.split('|')[0].split('/')[1],
    },
    to: {
      month: checkOut?.split('|')[0].split('/')[0],
      date: checkOut?.split('|')[0].split('/')[1],
    },
  };
  const enDate = {
    from: {
      month: checkIn?.split('|')[1]?.split('-')[0],
      date: checkIn?.split('|')[1]?.split('-')[1],
    },
    to: {
      month: checkOut?.split('|')[1].split('-')[0],
      date: checkOut?.split('|')[1].split('-')[1],
    },
  };
  if (mnDate.from.month === mnDate.to.month) {
    displayDate = {
      mn: `${mnDate.from.month}-р сар ${mnDate.from.date}-${mnDate.to.date}`,
      en: `${enDate.from.month} ${enDate.from.date}-${enDate.to.date}`,
      days: `${
        parseInt(mnDate.to.date ? mnDate.to.date : '0') -
        parseInt(mnDate.from.date ? mnDate.from.date : '0') +
        1
      }`,
    };
  } else {
    displayDate = {
      mn: `${mnDate.from.month}.${mnDate.from.date}-${mnDate.to.month}.${mnDate.to.date}`,
      en: `${enDate.from.month} ${enDate.from.date}-${enDate.to.month} ${enDate.to.date}`,
      days: `${
        parseInt(mnDate.to.date ? mnDate.to.date : '0') -
        parseInt(mnDate.from.date ? mnDate.from.date : '0') +
        1
      }`,
    };
  }

  return (
    <div className="flex flex-col gap-[24px] border-t-[1px] border-t-black/[.15] pt-[24px] text-main-text lg:gap-[32px] lg:pt-[32px]">
      <p className="text-[20px] font-medium leading-[20px]">
        {lang === "en" ? "Available rooms" : "Боломжит өрөөнүүд"}
      </p>
      {/* calendar */}
      <div
        className="flex h-[46px] items-center justify-between rounded-[12px] border border-black/[.15] px-[16px] text-[12px] font-medium leading-[1px] text-primary-blue 2xs:text-[15px] lg:hidden"
        onClick={() => {
          dispatch({
            type: "CHANGE_APP_STATE",
            payload: {
              menu: "",
              filter: "",
              logOrSign: "",
              calendar: "open",
            },
          });
        }}
      >
        <div className="flex items-center gap-[12px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="max-h-[22px] min-h-[22px] min-w-[22px] max-w-[22px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
            />
          </svg>
          <p className="text-sub-text">
            {`${formattedDate.from.month}/${formattedDate.from.date}/${formattedDate.from.year} - ${formattedDate.to.month}/${formattedDate.to.date}/${formattedDate.to.year}`}
          </p>
        </div>
        {/* selected days */}
        <div className="text-sub-text">
          ({days ? days : 1} {lang === "en" ? "days" : "хоног"})
        </div>
      </div>
      <div className="relative grid grid-cols-1 gap-[24px] md:grid-cols-2 lg:grid-cols-6 lg:gap-[24px]">
        {/* roomCards */}
        <div className=" flex flex-col gap-[24px] md:col-span-2 md:grid md:grid-cols-2 lg:col-span-4 lg:grid lg:grid-cols-2">
          {data &&
            data.map((index, i) => (
              <RoomCard
                stat={stat}
                data={index}
                key={i}
                handleScrollToRooms={(ver: string) => handleScrollToRooms(ver)}
                dollarRate={dollarRate}
              />
            ))}
        </div>
        {/* side order & calendar */}
        <div className="hidden flex-col items-center justify-start lg:sticky lg:col-span-2 lg:flex">
          <div
            onClick={() => {
              dispatch({
                type: "CHANGE_APP_STATE",
                payload: {
                  menu: "",
                  filter: "",
                  logOrSign: "",
                  calendar: "open",
                },
              });
            }}
            className="flex h-[46px] items-center justify-between gap-[16px] rounded-t-[12px] border border-b-0 border-black/[.15] px-[16px] text-[12px] font-medium leading-[1px] text-primary-blue 2xs:text-[15px]"
          >
            <div className="flex items-center gap-[12px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="max-h-[22px] min-h-[22px] min-w-[22px] max-w-[22px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                />
              </svg>
              <p className="text-sub-text">
                {`${formattedDate.from.month}/${formattedDate.from.date}/${formattedDate.from.year} - ${formattedDate.to.month}/${formattedDate.to.date}/${formattedDate.to.year}`}
              </p>
            </div>
          </div>
          {/* inside cart */}
          <div className="flex w-full flex-col items-start justify-center rounded-[12px] border border-black/[.15] px-[12px] py-[10px]">
            {cart && cart.length > 0 ? (
              <div className="flex w-full flex-col-reverse justify-between gap-[24px]">
                <div className="mb-[12px] flex h-[50px] flex-col items-center gap-[8px]">
                  <p className="text-[12px] font-medium leading-[13px] text-sub-text/75 2xs:text-[14px] 2xs:leading-[15px] 2xs:tracking-wide">
                    {lang === "en"
                      ? `${displayDate.en} (${days ? days : 1} days)`
                      : `${displayDate.mn} (${days ? days : 1} хоног)`}
                  </p>
                  <div className="flex w-full items-center justify-between text-[20px] font-medium leading-[20px] text-main-text">
                    <p>{lang === "en" ? "Total price:" : "Нийт үнэ:"}</p>
                    <h3 className="text-[20px] font-medium leading-[20px] text-main-text 2xs:text-[24px] 2xs:leading-[24px] 2xs:tracking-wide">
                      {lang === "en"
                        ? (
                            (totalPrice * parseInt(`${days ? days : 1}`)) /
                            parseInt(dollarRate)
                          ).toLocaleString()
                        : (
                            totalPrice * parseInt(`${days ? days : 1}`)
                          ).toLocaleString()}
                      {lang === "en" ? "$" : "₮"}
                    </h3>
                  </div>
                </div>
                {cart &&
                  cart.map((index, i) => (
                    <div
                      key={i}
                      className={`flex min-h-[45px] w-full items-center  justify-between gap-[10px] border-b border-b-black/[.15] pb-[8px] pt-[6px] text-primary-blue `}
                    >
                      <div className="flex w-full flex-col justify-between gap-[8px] font-medium">
                        <div className="flex w-full items-center justify-between">
                          <h3 className="text-[20px] leading-[20px] text-main-text">
                            {cart && index && data
                              ? data.filter(
                                  (room) =>
                                    room.id === parseInt(index.split("$")[0]),
                                )[0].name
                              : null}
                          </h3>
                          <div
                            className="flex h-[36px] w-[36px] items-center justify-end"
                            onClick={() => {
                              router.replace(
                                `/hotel/?${createQueryString(
                                  "cart",
                                  cart.indexOf(index),
                                )}`,
                                { scroll: false },
                              );
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2}
                              stroke="currentColor"
                              className="max-h-[24px] min-h-[24px] min-w-[24px] max-w-[24px]"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </div>
                        </div>

                        {data ? (
                          <div className="flex w-full items-end justify-between text-[16px] leading-[16px] text-sub-text/75">
                            <p>
                              {
                                data.filter(
                                  (room) =>
                                    room.id === parseInt(index.split("$")[0]),
                                )[0].occupancy
                              }{" "}
                              {lang === "en" ? "people" : "хүн"}
                            </p>
                            <p>
                              {data
                                .filter(
                                  (room) =>
                                    room.id === parseInt(index.split("$")[0]),
                                )[0]
                                .priceDayUse.toLocaleString()}{" "}
                              {lang === "en" ? "$" : "₮"}
                              <span> x{index.split("$")[1]}</span>
                            </p>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ))}
              </div>
            ) : null}
            {stat === "online" || stat === "pending" ? (
              <>
                {cart.length < 1 ? (
                  <div
                    onClick={() => handleScrollToRooms("rooms")}
                    className="flex h-[45px] w-full items-center justify-center rounded-[8px] bg-main-online text-[22px] font-medium text-white"
                  >
                    {lang === "en" ? "Order" : "Захиалах"}
                  </div>
                ) : (
                  <Link
                    href={{
                      query: {
                        slug: slug,
                        checkIn: checkIn,
                        checkOut: checkOut,
                        days: days,
                        cart: cart,
                      },
                      pathname: "/reservation",
                    }}
                    target='_blank'
                    className="flex h-[45px] w-full items-center justify-center rounded-[8px] bg-main-online text-[22px] font-medium text-white"
                  >
                    {lang === "en" ? "Order" : "Захиалах"}
                  </Link>
                )}
              </>
            ) : (
              <button
                disabled={true}
                className="flex h-[45px] w-full cursor-not-allowed items-center justify-center rounded-[8px] bg-main-online text-[22px] font-medium text-white opacity-50"
              >
                {lang === "en" ? "Order" : "Захиалаx"}
              </button>
            )}
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
      </div>
    </div>
  );
};

export default HotelRooms;
