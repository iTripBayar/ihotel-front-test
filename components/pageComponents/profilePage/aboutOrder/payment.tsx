import { useSearchParams } from "next/navigation";

interface OrderRooms {
  by_person: boolean;
  guests: number;
  person_number: number | null;
  rates: [
    {
      end_date: string;
      start_date: string;
      value: number;
      value_en: number;
    },
  ];
  room_category: string;
  room_id: number;
  room_name: string;
  room_number: string;
  room_price: number;
  sync_id: number | null;
}

interface Props {
  data: OrderRooms[];
  duration: number;
  totalPrice: { value: number; value_en: number };
  status: string;
}

export default function Payment({ data, duration, totalPrice, status }: Props) {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");

  return (
    <div className="flex flex-col gap-[16px] w-full items-center">
      <p className="text-[18px] text-main-text font-semibold leading-[20px] w-full text-center border-t border-t-black/[.15] pt-[24px]">
        {lang === "en" ? "Payment information" : "Төлбөрийн мэдээлэл"}
      </p>
      <div className="flex flex-col w-full gap-[16px]">
        {data.length > 0
          ? data.map((index, i) => (
              <div
                className={`flex flex-col gap-[16px] 
                `}
                key={i}
              >
                {/* room number */}
                {data.length > 1 ? (
                  <div className="flex justify-between items-center gap-[12px]">
                    <div className="w-full h-[1px] border-t-sub-text/25 border-t border-dashed"></div>
                    <p className="text-sub-text/50 uppercase text-[14px] leading-[14px] flex justify-center items-center gap-[6px]">
                      {lang === "en" ? `Room` : `Өрөө`}
                      <span>{i + 1}</span>
                    </p>
                    <div className="w-full h-[1px] border-t-sub-text/25 border-t border-dashed"></div>
                  </div>
                ) : null}
                {/* room name */}
                <div
                  className={`flex justify-between w-full text-[16px] leading-[17px] font-medium `}
                >
                  <p className="text-sub-text/75">
                    {lang === "en" ? "Room name" : "Өрөөний нэр"}
                  </p>
                  <p className="text-main-text">{index.room_name}</p>
                </div>
                {/* room number */}
                <div
                  className={`flex justify-between w-full text-[16px] leading-[17px] font-medium `}
                >
                  <p className="text-sub-text/75">
                    {lang === "en" ? "Number of rooms" : "Өрөөний тоо"}
                  </p>
                  <p className="text-main-text">
                    {index.room_number}
                    {lang === "en" ? null : " ш"}
                  </p>
                </div>
                {/* price for 1 room */}
                <div
                  className={`flex justify-between w-full text-[16px] leading-[17px] font-medium `}
                >
                  <p className="text-sub-text/75">
                    {lang === "en"
                      ? "Price per day for 1 room"
                      : "Нэгж өрөөний үнэ"}
                  </p>
                  <p className="text-main-text">
                    {lang === "en"
                      ? `${index.rates[0].value_en.toLocaleString()} $`
                      : `${index.rates[0].value.toLocaleString()} ₮`}
                  </p>
                </div>
              </div>
            ))
          : null}
        <div
          className={`flex justify-between w-full text-[16px] leading-[15px] font-medium border-t border-t-black/50 pt-[12px] `}
        >
          <p className="text-sub-text">
            {lang === "en" ? "Duration" : "Хугацаа"}
          </p>
          <p className="text-main-text">
            {lang === "en"
              ? `${duration} ${duration > 1 ? "days" : "day"}`
              : `${duration} хоног`}
          </p>
        </div>
        <div
          className={`flex justify-between w-full text-[20px] leading-[21px] font-medium`}
        >
          <p className="text-sub-text">
            {lang === "en" ? "Total price" : "Нийт үнэ"}
          </p>
          <p className="text-main-text">
            {lang === "en"
              ? `${totalPrice.value_en.toLocaleString()} $`
              : `${totalPrice.value.toLocaleString()} ₮`}
          </p>
        </div>
        {status === "pending" ? (
          <button className="w-full rounded-full bg-main-online my-[12px] flex justify-center items-center text-white font-semibold uppercase h-[42px] md:hidden">
            {lang === "en" ? "Proceed to payment" : "Төлбөр төлөх"}
          </button>
        ) : null}
      </div>
    </div>
  );
}
