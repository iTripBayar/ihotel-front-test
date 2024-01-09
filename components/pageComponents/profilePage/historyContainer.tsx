import { useSearchParams, useRouter } from "next/navigation";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
} from "@chakra-ui/react";
import HistoryCard from "./historyCard";
import { NextUIProvider } from "@nextui-org/react";
import { Pagination } from "@nextui-org/react";

interface Props {
  orderData: User.Order[];
  couponData: User.Order[];
  totalOrders: number | undefined;
  totalCoupon: number | undefined;
}
export default function HistoryContainer({
  orderData,
  totalOrders,
  couponData,
  totalCoupon,
}: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const lang = searchParams.get("lang");
  const total_page = searchParams.get("total_page");
  const order_page = searchParams.get("order_page");
  const coupon_page = searchParams.get("coupon_page");

  const multipleCreateQueryString = (
    name: string,
    value: string | null,
    name1: string,
    value1: string | null,
    name2: string,
    value2: string | null,
  ) => {
    const params = new URLSearchParams(searchParams);
    if (value !== null) {
      params.set(name, value);
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

  return (
    <div className="flex w-full flex-col text-primary-blue text-[16px]">
      <NextUIProvider>
        <Tabs
          position="relative"
          variant="unstyled"
          className="!w-full text-sub-text"
          defaultIndex={order_page ? 2 : coupon_page ? 1 : 0}
        >
          <TabList className="font-medium w-full justify-between">
            <Tab
              className="w-full flex !justify-start !px-0 gap-[4px] opacity-50 scale-75 lg:!justify-center md:!text-[18px] lg:!text-[20px]"
              _selected={{
                color: "#3C76FE",
                opacity: "100%",
                transform: "scale(1)",
              }}
            >
              {lang === "en" ? "All" : "Бүгд"}
              <div
                className={`px-[6px] py-[2px] font-medium  flex justify-between items-center bg-black/[.075] text-main-text rounded-full text-[12px]`}
              >
                {totalOrders}
              </div>
            </Tab>
            <Tab
              className="w-full flex !justify-start !px-0 gap-[4px] opacity-50 scale-75 lg:!justify-center md:!text-[18px] lg:!text-[20px]"
              _selected={{
                color: "#3C76FE",
                opacity: "100%",
                transform: "scale(1)",
              }}
            >
              {lang === "en" ? "Coupon" : "Купонууд"}
              <div
                className={`px-[6px] py-[2px] font-medium  flex justify-between items-center bg-black/[.075] text-main-text rounded-full text-[12px] `}
              >
                {/* {orderData.filter((index) => index.isOrderRequest === 1).length} */}
                {totalCoupon}
              </div>
            </Tab>
            <Tab
              className="w-full flex !justify-start !px-0 gap-[4px] opacity-50 scale-75 lg:!justify-center md:!text-[18px] lg:!text-[20px]"
              _selected={{
                color: "#3C76FE",
                opacity: "100%",
                transform: "scale(1)",
              }}
            >
              {lang === "en" ? "Reservations" : "Захиалгууд"}
              <div
                className={`px-[6px] py-[2px] font-medium  flex justify-between items-center bg-black/[.075] text-main-text rounded-full text-[12px]`}
              >
                {totalOrders}
              </div>
            </Tab>
          </TabList>
          <TabIndicator
            width="100%"
            mt="-1.5px"
            height="2px"
            bg="#3C76FE"
            borderRadius="2px"
          />
          <TabPanels className="md:pt-[20px]">
            {/* total */}
            <TabPanel className="flex flex-col gap-[20px] w-full">
              {orderData.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] xl:grid-cols-3">
                  {orderData
                    .sort(
                      (a, b) =>
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime(),
                    )
                    .map((index, i) => (
                      <HistoryCard key={i} data={index} />
                    ))}
                </div>
              ) : (
                <div className="w-full text-center col-span-1 md:col-span-2 xl:col-span-3">
                  {lang === "en" ? "Currently empty!" : "Одоогоор оосон байна!"}
                </div>
              )}
              {totalOrders && totalOrders > 8 ? (
                <Pagination
                  isCompact
                  showControls
                  id="totalPagination"
                  // total={parseInt(`${totalOrders / 8}`)}
                  total={Math.ceil(parseInt(`${totalOrders}`) / 8)}
                  initialPage={total_page ? parseInt(total_page) : 1}
                  onChange={(e) => {
                    router.replace(
                      `/profile?${multipleCreateQueryString(
                        "total_page",
                        `${e}`,
                        "order_page",
                        null,
                        "coupon_page",
                        null,
                      )}`,
                      {
                        scroll: false,
                      },
                    );
                  }}
                  classNames={{
                    base: "flex justify-center py-0 px-[24px] m-0 w-full overflow-visible",
                    cursor: "bg-primary-blue rounded-full",
                    wrapper:
                      "max-w-[324px] w-full p-0 bg-black/[.05] overflow-visible w-auto",
                    item: "bg-transparent",
                    next: "bg-transparent",
                    prev: "bg-transparent",
                  }}
                />
              ) : null}
            </TabPanel>
            {/* cuppon */}
            <TabPanel className="flex flex-col gap-[20px] w-full">
              {couponData.filter((index) => index.isOrderRequest === 1).length >
              0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] xl:grid-cols-3">
                  {couponData
                    .sort(
                      (a, b) =>
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime(),
                    )
                    .map((index, i) => (
                      <HistoryCard key={i} data={index} />
                    ))}
                </div>
              ) : (
                <div className="w-full text-center col-span-1 md:col-span-2 xl:col-span-3 font-medium text-sub-text/75">
                  {lang === "en" ? "Currently empty!" : "Одоогоор оосон байна!"}
                </div>
              )}
              {totalCoupon && totalCoupon > 8 ? (
                <Pagination
                  isCompact
                  showControls
                  id="ordersPagination"
                  total={Math.ceil(parseInt(`${totalCoupon}`) / 8)}
                  initialPage={coupon_page ? parseInt(coupon_page) : 1}
                  onChange={(e) => {
                    router.replace(
                      `/profile?${multipleCreateQueryString(
                        "order_page",
                        null,
                        "total_page",
                        null,
                        "coupon_page",
                        `${e}`,
                      )}`,
                      {
                        scroll: false,
                      },
                    );
                  }}
                  classNames={{
                    base: "flex justify-center py-0 px-[24px] m-0 w-full overflow-visible",
                    cursor: "bg-primary-blue rounded-full",
                    wrapper:
                      "max-w-[324px] w-full p-0 bg-black/[.05] overflow-visible w-auto",
                    item: "bg-transparent",
                    next: "bg-transparent",
                    prev: "bg-transparent",
                  }}
                />
              ) : null}
            </TabPanel>
            {/* orders */}
            <TabPanel className="flex flex-col gap-[20px] w-full">
              {orderData.filter((index) => index.isOrderRequest === 0).length >
              0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] xl:grid-cols-3">
                  {orderData
                    .sort(
                      (a, b) =>
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime(),
                    )
                    .map((index, i) => (
                      <HistoryCard key={i} data={index} />
                    ))}
                </div>
              ) : (
                <div className="w-full text-center col-span-1 md:col-span-2 xl:col-span-3 font-medium text-sub-text/75">
                  {lang === "en" ? "Currently empty!" : "Одоогоор оосон байна!"}
                </div>
              )}
              {totalOrders && totalOrders > 8 ? (
                <Pagination
                  isCompact
                  showControls
                  id="ordersPagination"
                  total={Math.ceil(parseInt(`${totalOrders}`) / 8)}
                  initialPage={order_page ? parseInt(order_page) : 1}
                  onChange={(e) => {
                    router.replace(
                      `/profile?${multipleCreateQueryString(
                        "order_page",
                        `${e}`,
                        "total_page",
                        null,
                        "coupon_page",
                        null,
                      )}`,
                      {
                        scroll: false,
                      },
                    );
                  }}
                  classNames={{
                    base: "flex justify-center py-0 px-[24px] m-0 w-full overflow-visible",
                    cursor: "bg-primary-blue rounded-full",
                    wrapper:
                      "max-w-[324px] w-full p-0 bg-black/[.05] overflow-visible w-auto",
                    item: "bg-transparent",
                    next: "bg-transparent",
                    prev: "bg-transparent",
                  }}
                />
              ) : null}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </NextUIProvider>
    </div>
  );
}

{
  /* <div className="flex w-full justify-between items-center border-b-black/[.2] border-b pt-[12px] relative">
  <div
    className={`flex gap-[4px] w-full justify-start items-center pb-[12px] relative`}
    onClick={() => {
      setSelected((pre) => ({ prev: pre.now, now: "all" }));
    }}
  >
    <span
      className={`absolute bottom-0 right-0  w-0 h-0 transition-all duration-200 border-b-2 ease border-primary-blue ${
        selected.now === "all" ? "w-full" : "w-0"
      }`}
    ></span>
    <span
      className={`text-[18px] font-medium leading-[18px] ${
        selected.now === "all"
          ? " opacity-100 scale-100 duration-150 "
          : " opacity-75 scale-75 duration-150"
      }`}
    >
      {lang === "en" ? "All" : "Бүгд"}
    </span>
    <div
      className={`px-[6px] py-[2px] font-medium  flex justify-between items-center bg-black/[.075] text-main-text rounded-full text-[12px] ${
        selected.now === "all"
          ? " opacity-100 scale-100 duration-150 "
          : " opacity-75 scale-75 duration-150"
      }`}
    >
      146
    </div>
  </div>
  <div
    className={`flex gap-[4px] w-full justify-start items-center pb-[12px] relative `}
    onClick={() => {
      setSelected((pre) => ({ prev: pre.now, now: "coupon" }));
    }}
  >
    <span
      className={`absolute bottom-0 ${
        (selected.prev === "all" && selected.now === "coupon") ||
        (selected.prev === "coupon" && selected.now === "all")
          ? "left-0"
          : "right-0"
      } w-0 h-0 transition-all duration-200 border-b-2 ease border-primary-blue ${
        selected.now === "coupon" ? "w-full" : "w-0"
      }`}
    ></span>
    <span
      className={`text-[18px] font-medium leading-[18px] ${
        selected.now === "coupon"
          ? "opacity-100 scale-100 duration-150 "
          : " opacity-75 scale-75 duration-150"
      }`}
    >
      {lang === "en" ? "Coupon" : "Купонууд"}
    </span>
    <div
      className={`px-[6px] py-[2px] font-medium  flex justify-between items-center bg-black/[.075] text-main-text rounded-full text-[12px] ${
        selected.now === "coupon"
          ? "opacity-100 scale-100 duration-150 "
          : " opacity-75 scale-75 duration-150"
      }`}
    >
      3
    </div>
  </div>
  <div
    className={`flex gap-[4px] w-full justify-start items-center pb-[12px] relative `}
    onClick={() => {
      setSelected((pre) => ({ prev: pre.now, now: "reservations" }));
    }}
  >
    <span
      className={`absolute bottom-0  left-0  w-0 h-0 transition-all duration-200 border-b-2 ease border-primary-blue ${
        selected.now === "reservations" ? "w-full" : "w-0"
      }`}
    ></span>
    <span
      className={`text-[18px] font-medium leading-[18px] ${
        selected.now === "reservations"
          ? "opacity-100 scale-100 duration-150 "
          : " opacity-75 scale-75 duration-150"
      }`}
    >
      {lang === "en" ? "reservations" : "Захиалгууд"}
    </span>
    <div
      className={`px-[6px] py-[2px] font-medium  flex justify-between items-center bg-black/[.075] text-main-text rounded-full text-[12px] ${
        selected.now === "reservations"
          ? "opacity-100 scale-100 duration-150 "
          : " opacity-75 scale-75 duration-150"
      }`}
    >
      146
    </div>
  </div>
</div>; */
}
