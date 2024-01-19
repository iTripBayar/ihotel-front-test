import { useSearchParams } from "next/navigation";
import { Collapse, Button, useDisclosure } from "@chakra-ui/react";
import format from "date-fns/format";
import subDays from "date-fns/subDays";

interface Props {
  data: { day: string; fee: string }[] | undefined;
  dollarRate: string;
  totalPrice: number;
}
export default function CancelTerm({ data, dollarRate, totalPrice }: Props) {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");
  const checkIn = searchParams.get("checkIn");
  const { isOpen, onToggle } = useDisclosure();

  return (
    <div
      className="flex h-auto w-full flex-col pt-[4px] gap-[12px] lg:border-t lg:border-dashed lg:border-t-black/[.15] lg:pt-[24px]"

      // className="flex h-auto w-full flex-col  rounded-[20px] px-[20px] shadow-[0px_0px_12px_2px_rgb(0,0,0,0.15)] lg:rounded-none lg:border-t lg:border-dashed lg:border-t-black/[.15] lg:px-0 lg:pt-[32px] lg:shadow-none"
    >
      <div className="px-[12px] flex flex-col gap-[12px] lg:px-0">
        <p className="text-[18px] font-medium leading-[20px] text-main-text">
          {lang === "en" ? "Cancellation term" : "Цуцлалтын нөхцөл"}
        </p>
      </div>
      <Collapse
        in={isOpen}
        animateOpacity
        transition={{
          enter: {
            duration: 0.25,
          },
        }}
        startingHeight={125}
        className={`!flex w-full !relative !flex-col !gap-[16px] !px-[12px] lg:!px-0 sm:!gap-[20px] ${
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
        {data &&
          data.map((index, i: number) => (
            <div
              className={`flex w-full flex-col gap-[10px] ${
                i + 1 !== data.length
                  ? " border-b border-b-black/[.15] pb-[16px]"
                  : ""
              } `}
              key={i}
            >
              {/* roomType */}
              <div className="leadin-[14px] flex flex-col w-full items-start gap-[8px] justify-between text-[14px] font-medium">
                <p className="text-[16px] text-main-text">
                  {lang === "en"
                    ? `${i + 1}) ${index.day} ${
                        parseInt(index.day) > 1 ? "days" : "day"
                      } before the check in date`
                    : `${i + 1}. Ирэх өдрөөс ${index.day} өдрийн өмнө`}
                </p>
                {/* <p className="text-[16px] text-main-text">
                  {lang === "en"
                    ? `${index.day} ${
                        parseInt(index.day) > 1 ? "days" : "day"
                      } before`
                    : `${index.day} өдрийн өмнө`}
                </p> */}
              </div>
              {/* percent */}
              <div className="leadin-[14px] flex w-full items-center justify-between text-[14px] font-medium">
                <p className="  text-main-text/[.65]">
                  {lang === "en" ? "Deduction percent" : "Суутгалын хувь"}
                </p>
                <p className="text-[16px] text-main-text">
                  {index.fee} %{/* {index.amount} {lang === "en" ? "" : "ш"} */}
                </p>
              </div>
              {/* amount */}
              <div className="leadin-[14px] flex w-full items-center justify-between text-[14px] font-medium">
                <p className="  text-main-text/[.65]">
                  {lang === "en" ? "Deduction amount" : "Суутгагдах төлбөр"}
                </p>
                <p className="text-[16px] text-main-text">
                  {lang === "en"
                    ? `${(
                        (totalPrice / parseInt(dollarRate) / 100) *
                        parseInt(index.fee)
                      ).toLocaleString()}$`
                    : `${(
                        (totalPrice / 100) *
                        parseInt(index.fee)
                      ).toLocaleString()}₮`}
                  {/* {days} {lang === "en" ? "days" : "хоног"} */}
                </p>
              </div>
            </div>
          ))}
      </Collapse>
      {/* <div className="hidden w-full flex-col gap-[24px] lg:flex">
        <p className="text-[18px] font-medium leading-[18px] text-sub-text">
          {lang === "en" ? "Term of cancellation" : "Цуцлалтын нөхцөл"}
        </p>
        {checkIn ? (
          <div className="flex w-full">
            <div className="relative w-full overflow-hidden rounded-[20px] border border-black/[.15] px-[8px] text-center">
              <div className="absolute left-0 top-0 h-[60px] w-full bg-black/5"></div>
              <table className="w-full px-[12px] text-[10px] leading-[12px] text-sub-text/75  2xs:text-[12px] lg:text-[14px] lg:leading-[16px]">
                <thead className="text-main-text ">
                  <tr className="h-[60px] w-full">
                    <th className="font-medium">
                      {lang === "en"
                        ? "Before check in date"
                        : "Ирэх өдрөөс өмнө"}
                    </th>
                    <th className="font-medium">
                      {lang === "en"
                        ? "Deduction % from total amount"
                        : "Нийт үнийн дүнгээс суутгах хувь"}
                    </th>
                    <th className="font-medium">
                      {lang === "en"
                        ? "Deduction fee from total amount"
                        : "Нийт үнийн дүнгээс суутгагдах төлбөр"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data
                    ? data.map((index, i) => (
                        <tr className="h-[60px]" key={i}>
                          <td>
                            {lang === "en"
                              ? `Until ${format(
                                  subDays(
                                    new Date(checkIn),
                                    parseInt(index.day),
                                  ),
                                  `${
                                    lang === "en" ? "MMM dd yyyy" : "yyyy-MM-dd"
                                  }`,
                                )}`
                              : `${format(
                                  subDays(
                                    new Date(checkIn),
                                    parseInt(index.day),
                                  ),
                                  `${
                                    lang === "en" ? "MMM dd yyyy" : "yyyy-MM-dd"
                                  }`,
                                )} хүртэл`}
                          </td>
                          <td>{index.fee}%</td>
                          <td>
                            {lang === "en" && dollarRate
                              ? `${(
                                  totalPrice /
                                  parseInt(dollarRate) /
                                  100
                                ).toLocaleString()} $`
                              : `${(
                                  (totalPrice / 100) *
                                  parseInt(index.fee)
                                ).toLocaleString()} ₮`}
                          </td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}
      </div>
      <div className="flex flex-col lg:hidden">
        <Button
          onClick={onToggle}
          className="!m-0 flex h-[41px] w-full items-center !justify-between sm:h-[46px] !bg-transparent !px-0"
        >
          <p className="text-[18px] font-medium leading-[18px] text-sub-text">
            {lang === "en" ? "Term of cancellation" : "Цуцлалтын нөхцөл"}
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
        <Collapse
          in={isOpen}
          animateOpacity
          transition={{
            enter: {
              duration: 0.25,
            },
          }}
          className={`!flex w-full !flex-col !gap-[16px] sm:!gap-[20px] ${
            isOpen === true
              ? "mt-[10px] h-auto pb-[16px] sm:pb-[20px] "
              : "hidden"
          }`}
        >
          <div className="relative w-full overflow-hidden rounded-[20px] border border-black/[.15] px-[8px] text-center">
            <div className="absolute left-0 top-0 h-[47px] w-full bg-black/5"></div>
            <table className="w-full px-[12px] text-[10px] leading-[12px] text-sub-text/75  2xs:text-[12px]">
              <thead className="text-main-text ">
                <tr className="h-[47px] w-full">
                  <th className="font-medium">
                    {lang === "en"
                      ? "Allowed dates for cancellation"
                      : "Цуцлах боломжит хугацаа"}
                  </th>
                  <th className="font-medium">
                    {lang === "en" ? "% of total amount" : "Нийт үнийн дүнгийн"}
                  </th>
                  <th className="font-medium">
                    {lang === "en" ? "Cancellation fee" : "Торгууль"}
                  </th>
                </tr>
              </thead>
              {checkIn ? (
                <tbody>
                  {data
                    ? data.map((index, i) => (
                        <tr className="h-[60px]" key={i}>
                          <td>
                            {lang === "en"
                              ? `Until ${format(
                                  subDays(
                                    new Date(checkIn),
                                    parseInt(index.day),
                                  ),
                                  `${
                                    lang === "en" ? "MMM dd yyyy" : "yyyy-MM-dd"
                                  }`,
                                )}`
                              : `${format(
                                  subDays(
                                    new Date(checkIn),
                                    parseInt(index.day),
                                  ),
                                  `${
                                    lang === "en" ? "MMM dd yyyy" : "yyyy-MM-dd"
                                  }`,
                                )} хүртэл`}
                          </td>
                          <td>{index.fee}%</td>
                          <td>
                            {lang === "en" && dollarRate
                              ? `${(
                                  totalPrice /
                                  parseInt(dollarRate) /
                                  100
                                ).toLocaleString()} $`
                              : `${(
                                  (totalPrice / 100) *
                                  parseInt(index.fee)
                                ).toLocaleString()} ₮`}
                          </td>
                        </tr>
                      ))
                    : null}
                </tbody>
              ) : null}
            </table>
          </div>
        </Collapse>
      </div> */}
    </div>
  );
}
