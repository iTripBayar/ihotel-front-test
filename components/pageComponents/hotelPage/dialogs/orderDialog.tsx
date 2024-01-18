import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import format from "date-fns/format";

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
  roomPrices: number[];
  handleScrollToRooms: (ver: string) => void;
  totalPrice: number;
  inViewport: boolean | undefined;
  currentCart: CartItem[];
  changeCart: (e: CartItem) => void;
  dollarRate: string;
}
export default function OrderDialog({
  roomPrices,
  handleScrollToRooms,
  totalPrice,
  inViewport,
  currentCart,
  changeCart,
  dollarRate,
}: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const lang = searchParams.get("lang");
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const days = searchParams.get("days");

  const mnDate =
    checkIn?.split("/")[0] === checkOut?.split("/")[0]
      ? `${checkIn?.split("/")[0]}-р сар ${checkIn?.split(
          "/",
        )[1]}-${checkOut?.split("/")[1]}`
      : `${checkIn?.split("/")[0]}.${checkIn?.split("/")[1]}-${checkOut?.split(
          "/",
        )[0]}.${checkOut?.split("/")[1]}`;

  let enDate = "";
  if (checkIn && checkOut) {
    const dateFrom = format(new Date(checkIn), "MMM dd yyyy");
    const dateTo = format(new Date(checkOut), "MMM dd yyyy");
    enDate =
      checkIn?.split("/")[0] === checkOut?.split("/")[0]
        ? `${dateFrom.split(" ")[0]} ${dateFrom.split(" ")[1]}-${
            dateTo.split(" ")[1]
          }`
        : `${dateFrom.split(" ")[0]} ${dateFrom.split(" ")[1]}-${
            dateTo.split(" ")[0]
          } ${dateTo.split(" ")[1]}`;
  }

  return (
    <div
      className={`flex w-full flex-col rounded-t-[30px] bg-white px-[16px] shadow-[0px_0px_12px_2px_rgb(0,0,0,0.25)] sm:px-[32px] ${
        inViewport === true && currentCart.length === 0
          ? " translate-y-[400px] duration-1000"
          : " translate-y-0 duration-500"
      }`}
    >
      {currentCart.length > 0 ? (
        <div className={`flex-col justify-between gap-[4px] pt-[8px]`}>
          {currentCart.map((index, i) => (
            <div
              key={i}
              className={`flex min-h-[45px] w-full items-center justify-between gap-[10px] pb-[8px] text-primary-blue ${
                currentCart.length >= 1
                  ? "border-b border-b-black/[.15] pt-[6px]"
                  : ""
              }`}
            >
              <div className="flex w-full flex-col justify-between gap-[8px] font-medium">
                <div className="flex w-full items-end justify-between">
                  <h3 className="text-[20px] leading-[20px] text-main-text">
                    {lang === "en" ? index.nameEn : index.name}
                  </h3>
                  <p className="flex gap-[4px] text-[16px] leading-[16px] text-sub-text/75">
                    {lang === "en"
                      ? `${(
                          index.price / parseInt(dollarRate)
                        ).toLocaleString()} $`
                      : `${index.price.toLocaleString()} ₮`}
                    <span>x{index.amount}</span>
                  </p>
                </div>

                {currentCart.length < 2 ? (
                  <div className="flex w-full items-end justify-between text-[16px] leading-[16px] text-sub-text/75">
                    <p>
                      {index.occupancy} {lang === "en" ? "people" : "хүн"}
                    </p>
                    <p>
                      {lang === "en"
                        ? `${(
                            index.price / parseInt(dollarRate)
                          ).toLocaleString()} $`
                        : `${index.price.toLocaleString()} ₮`}
                    </p>
                  </div>
                ) : null}
              </div>
              <div
                className="flex h-[36px] w-[36px] items-center justify-center"
                onClick={() => {
                  changeCart({
                    id: index.id,
                    name: index.name,
                    nameEn: index.nameEn,
                    amount: index.amount,
                    occupancy: index.occupancy,
                    price: index.price,
                    method: "remove",
                  });
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
          ))}
        </div>
      ) : null}
      <div
        className={` flex min-h-[90px] w-full items-center justify-between gap-[2px]`}
      >
        {/* date & price */}
        <div className="flex flex-col justify-between gap-[8px]">
          <p className="text-[12px] font-medium leading-[13px] text-sub-text/75 2xs:text-[14px] 2xs:leading-[15px] 2xs:tracking-wide">
            {lang === "en"
              ? `${enDate} (${days ? days : 1} days)`
              : `${mnDate} (${days ? days : 1} хоног)`}
          </p>
          <h3 className="text-[20px] font-medium leading-[20px] text-main-text 2xs:text-[24px] 2xs:leading-[24px] 2xs:tracking-wide">
            {currentCart.length > 0
              ? totalPrice.toLocaleString()
              : (
                  roomPrices[0] * parseInt(`${days ? days : 1}`)
                ).toLocaleString()}{" "}
            {lang === "en" ? "$" : "₮"}
          </h3>
        </div>
        {/* orderBtn */}
        {currentCart.length < 1 ? (
          <div
            onClick={() => handleScrollToRooms("rooms")}
            className="rounded-full bg-main-online px-[18px] opacity-60 py-[12px] text-[18px] font-medium uppercase leading-[18px] text-white 2xs:px-[20px] 2xs:py-[14px] 2xs:text-[20px] 2xs:leading-[20px]"
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
                cart: JSON.stringify(currentCart),
              },
              pathname: "/reservation",
            }}
            target="_blank"
            className="rounded-full bg-main-online px-[18px] py-[12px] text-[18px] font-medium uppercase leading-[18px] text-white 2xs:px-[20px] 2xs:py-[14px] 2xs:text-[20px] 2xs:leading-[20px]"
          >
            {lang === "en" ? "Order" : "Захиалах"}
          </Link>
        )}
      </div>
    </div>
  );
}
