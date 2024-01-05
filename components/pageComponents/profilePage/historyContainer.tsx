import { useSearchParams } from "next/navigation";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
} from "@chakra-ui/react";
import HistoryCard from "./historyCard";

interface Props {
  data: User.Order[]
}
export default function HistoryContainer({ data }: Props) {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");
  return (
    <div className="flex w-full flex-col text-primary-blue text-[16px]">
      <Tabs
        position="relative"
        variant="unstyled"
        className="!w-full text-sub-text"
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
              {data.length}
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
              {data.filter((index) => index.isOrderRequest === 1).length}
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
              {data.filter((index) => index.isOrderRequest === 0).length}
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
          <TabPanel className="grid grid-cols-1 md:grid-cols-2 gap-[20px] xl:grid-cols-3">
            {data.length > 0 ? (
              data.map((index, i) => <HistoryCard key={i} data={index} />)
            ) : (
              <div className="w-full text-center col-span-1 md:col-span-2 xl:col-span-3">
                {lang === "en" ? "Currently empty!" : "Одоогоор оосон байна!"}
              </div>
            )}
          </TabPanel>
          <TabPanel className="grid grid-cols-1 md:grid-cols-2 gap-[20px] xl:grid-cols-3">
            {data.filter((index) => index.isOrderRequest === 1).length > 0 ? (
              data
                .filter((index) => index.isOrderRequest === 1)
                .map((index, i) => <HistoryCard key={i} data={index} />)
            ) : (
              <div className="w-full text-center col-span-1 md:col-span-2 xl:col-span-3 font-medium text-sub-text/75">
                {lang === "en" ? "Currently empty!" : "Одоогоор оосон байна!"}
              </div>
            )}
          </TabPanel>
          <TabPanel className="grid grid-cols-1 md:grid-cols-2 gap-[20px] xl:grid-cols-3 font-medium text-sub-text/75">
            {data.filter((index) => index.isOrderRequest === 0).length > 0 ? (
              data
                .filter((index) => index.isOrderRequest === 0)
                .map((index, i) => <HistoryCard key={i} data={index} />)
            ) : (
              <div className="w-full text-center col-span-1 md:col-span-2 xl:col-span-3 font-medium text-sub-text/75">
                {lang === "en" ? "Currently empty!" : "Одоогоор оосон байна!"}
              </div>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
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
