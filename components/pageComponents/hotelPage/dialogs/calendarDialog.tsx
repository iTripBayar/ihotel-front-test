import { useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { addDays, format } from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useAppCtx } from "@/contexts/app";
import { toast } from "sonner";

interface Props {
  ver: string;
}

export default function CalendarDialog({ ver }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const lang = searchParams.get("lang");
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const days = searchParams.get("days");
  const { dispatch } = useAppCtx();

  const newDate = new Date();
  const date = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();

  const pathname = usePathname();
  const pastMonth = new Date(
    year,
    checkIn && checkOut
      ? parseInt(checkIn ? checkIn?.split("|")[0].split("/")[0] : "0") - 1
      : month,
    // (!checkIn && !checkOut
    //   ? month
    //   : parseInt(checkIn ? checkIn?.split("|")[0].split("/")[0] : "0")) - 1,
    checkIn && checkOut
      ? parseInt(checkIn ? checkIn?.split("|")[0].split("/")[1] : "0")
      : date,
    // !checkIn && !checkOut
    //   ? date
    //   : parseInt(checkIn ? checkIn?.split("|")[0].split("/")[1] : "0"),
  );
  const defaultSelected: DateRange = {
    from: pastMonth,
    to: addDays(pastMonth, days !== null ? parseInt(days) : 1),
  };

  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);
  const multipleCreateQueryString = (
    name: string,
    value: string | null,
    name1: string,
    value1: string | null,
    name2: string,
    value2: string | null,
    name3: string,
    value3: string | null,
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
    if (value3 !== null) {
      params.set(name3, value3);
    } else {
      params.delete(name3);
    }
    return params.toString();
  };
  // h-[84vh]

  if (ver === "mobile")
    return (
      <div
        className={`relative flex  h-[calc(100vh-72px)] w-full flex-col  items-center justify-start rounded-t-[30px] bg-white pt-[32px] shadow-[0px_0px_12px_2px_rgb(0,0,0,0.25)] sm:px-[32px]`}
      >
        <div
          className="absolute right-[16px] top-[16px] text-primary-blue"
          onClick={() => {
            dispatch({
              type: "CHANGE_APP_STATE",
              payload: {
                calendar: "",
              },
            });
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.75}
            stroke="currentColor"
            className="max-h-[30px] min-h-[30px] min-w-[30px] max-w-[30px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        <DayPicker
          mode="range"
          defaultMonth={range ? range.from : pastMonth}
          selected={range}
          onDayClick={(e) => {
            if (range?.to) {
              setRange({ from: e, to: undefined });
            } else {
              if (range?.from && e < range?.from) {
                setRange((prev) => ({ from: e, to: prev?.from }));
              } else {
                setRange((prev) => ({ from: prev?.from, to: e }));
              }

              // setRange((prev) => ({ from: prev?.from, to: e }));
            }
            // console.log(e);
          }}
          numberOfMonths={2}
          showOutsideDays
          ISOWeek
          disabled={(date) => date < new Date(Date.now())}
          style={{
            width: "76%",
            maxHeight: "100%",
            borderRadius: "16px",
            border: "1px solid rgb(0,0,0,0.15)",
            padding: "8px",
            overflow: "hidden",
          }}
        />
        <div
          className="flex max-w-[150px] items-center justify-center rounded-full bg-primary-blue px-[16px] py-[10px] text-[14px] font-medium uppercase text-white"
          onClick={() => {
            if (range?.from && range.to) {
              router.replace(
                `${pathname}/?${multipleCreateQueryString(
                  "checkIn",
                  `${format(range.from, "MM/dd/yyyy")}`,
                  "checkOut",
                  `${format(range.to, "MM/dd/yyyy")}`,
                  "days",
                  `${
                    (range?.to?.getTime() - range?.from?.getTime()) /
                    (1000 * 3600 * 24)
                  }`,
                  "",
                  null,
                )}`,
                { scroll: false },
              );
              toast.success(
                `${lang === "en" ? "Date changed!" : "Өдөр солигдлоо!"}`,
              );
              dispatch({
                type: "CHANGE_APP_STATE",
                payload: {
                  calendar: "",
                },
              });
            }
          }}
        >
          {lang === "en" ? "Select" : "Сонгох"}
        </div>
      </div>
    );
  return (
    <div
      className={`relative flex h-full w-full flex-col items-center justify-start rounded-[20px] bg-white pt-[24px] shadow-[0px_0px_12px_2px_rgb(0,0,0,0.25)] sm:px-[32px] lg:justify-center lg:pb-[16px]`}
    >
      <div
        className="absolute right-[10px] top-[10px] text-primary-blue"
        onClick={() => {
          dispatch({
            type: "CHANGE_APP_STATE",
            payload: {
              calendar: "",
            },
          });
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.75}
          stroke="currentColor"
          className="max-h-[30px] min-h-[30px] min-w-[30px] max-w-[30px]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>

      <DayPicker
        mode="range"
        defaultMonth={range ? range.from : pastMonth}
        selected={range}
        onDayClick={(e) => {
          if (range?.to) {
            setRange({ from: e, to: undefined });
          } else {
            if (range?.from && e < range?.from) {
              setRange((prev) => ({ from: e, to: prev?.from }));
            } else {
              setRange((prev) => ({ from: prev?.from, to: e }));
            }

            // setRange((prev) => ({ from: prev?.from, to: e }));
          }
          // console.log(e);
        }}
        numberOfMonths={2}
        showOutsideDays
        ISOWeek
        disabled={(date) => date < new Date(Date.now())}
        style={{
          width: "100%",
          maxHeight: "100%",
          borderRadius: "16px",
          justifyContent: "center",
          border: "1px solid rgb(0,0,0,0.15)",
          padding: "8px",
          overflow: "hidden",
        }}
      />
      <div
        className="flex max-w-[150px] items-center justify-center rounded-full bg-primary-blue px-[16px] py-[10px] text-[14px] font-medium uppercase text-white"
        onClick={() => {
          if (range?.from && range.to) {
            router.replace(
              `${pathname}/?${multipleCreateQueryString(
                "checkIn",
                `${format(range.from, "MM/dd/yyyy")}`,
                "checkOut",
                `${format(range.to, "MM/dd/yyyy")}`,
                "days",
                `${
                  (range?.to?.getTime() - range?.from?.getTime()) /
                  (1000 * 3600 * 24)
                }`,
                "",
                null,
              )}`,
              { scroll: false },
            );
            toast.success(
              `${lang === "en" ? "Date changed!" : "Өдөр солигдлоо!"}`,
            );
            dispatch({
              type: "CHANGE_APP_STATE",
              payload: {
                calendar: "",
              },
            });
          }
        }}
      >
        {lang === "en" ? "Select" : "Сонгох"}
      </div>
    </div>
  );
}
