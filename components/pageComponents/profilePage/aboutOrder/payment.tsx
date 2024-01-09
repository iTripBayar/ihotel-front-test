import { useSearchParams } from "next/navigation";
import { format, subHours } from "date-fns";
import { unserialize } from "serialize-php";

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
  data: User.Order;
  handleCancelOrder: (id: number) => void;
}

export default function Payment({
  data,
  handleCancelOrder,
}: Props) {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");

  
  let totalPrice = { value: 0, value_en: 0 };
  const roomsData: OrderRooms[] = unserialize(data.rooms);

  for (let i = 0; i < roomsData.length; i++) {
    totalPrice = {
      value: totalPrice.value + roomsData[i].rates[0].value,
      value_en: totalPrice.value_en + roomsData[i].rates[0].value_en,
    };
  }
  const payBy = format(
    subHours(new Date(data.checkIn), 3),
    `${lang === "en" ? "MMM dd, yyyy HH:mm:ss" : "yyyy-MM-dd HH:mm:ss"}`,
  );

  console.log();

  return (
    <div className="flex flex-col gap-[16px] w-full items-center">
      <p className="text-[18px] text-main-text font-semibold leading-[20px] w-full text-center border-t border-t-black/[.15] pt-[24px]">
        {lang === "en" ? "Payment information" : "Төлбөрийн мэдээлэл"}
      </p>
      <div className="flex flex-col w-full gap-[16px]">
        {roomsData.length > 0
          ? roomsData.map((index, i) => (
              <div
                className={`flex flex-col gap-[16px] 
                `}
                key={i}
              >
                {/* room number */}
                {roomsData.length > 1 ? (
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
              ? `${data.day} ${data.day > 1 ? "days" : "day"}`
              : `${data.day} хоног`}
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
        <div
          className={`flex flex-col w-full gap-[16px] items-center ${
            data.status === "pending"
              ? "md:grid md:grid-cols-2  md:items-start"
              : ""
          }`}
        >
          <p
            className={`w-full flex justify-center items-center p-[16px] text-sub-text md:h-full md:items-start font-medium text-[14px] border border-sub-text/50 rounded-[12px] text-justify ${
              data.status !== "pending" ? "max-w-[450px]" : ""
            }`}
          >
            {lang === "en"
              ? "Above amount is to be paid to the Property (Hotel & Tourist Camp) and iHotel.mn does not charge you any additional fee such as booking or administration fee."
              : "Дээрх дүн нь зочид буудал (амралтын газар) төлөгдөх дүн бөгөөд iHotel.mn нь танаас ямар нэгэн нэмэлт төлбөр авахгүй болно."}
          </p>

          {data.status === "pending" ? (
            <p className="w-full flex justify-center items-center p-[16px] text-primary-blue ] font-medium text-[14px] border border-primary-blue rounded-[12px] text-justify">
              {lang === "en"
                ? `Your reservation will be confirmed once your payment is completed before ${payBy}. If your payment is not confirmed, please be noted that your reservation will be cancelled automatically.`
                : `Та ${payBy} өдрөөс өмнө дээрх төлбөрийг төлж захиалгаа баталгаажуулна уу. Дурдсан хугацаанд төлбөр хийгдээгүй тохиолдолд таны захиалга автоматаар цуцлагдах болно.`}
            </p>
          ) : null}
        </div>
        {data.status === "pending" ? (
          <div className="hidden gap-[12px] w-full pt-[16px] text-[16px] md:pt-0 m-auto md:flex md:flex-row md:max-w-[450px] justify-center items-center leading-[15px] ">
            <button className="w-full rounded-full bg-main-online flex justify-center items-center text-white font-semibold uppercase h-[42px]">
              {lang === "en" ? "Proceed to payment" : "Төлбөр төлөх"}
            </button>
            <button
              className="w-full rounded-full border-[2px] border-main-offline uppercase text-main-offline h-[42px] flex justify-center items-center font-medium"
              onClick={() => {
                handleCancelOrder(data.id);
                setTimeout(() => {
                  window.location.reload();
                }, 1500);
              }}
            >
              {lang === "en" ? "Cancel" : "Цуцлах"}
            </button>
          </div>
        ) : null}

        {data.status === "pending" ? (
          <button className="w-full rounded-full bg-main-online mt-[6px] flex justify-center items-center text-white font-semibold uppercase h-[42px] md:hidden">
            {lang === "en" ? "Proceed to payment" : "Төлбөр төлөх"}
          </button>
        ) : null}
      </div>
    </div>
  );
}
