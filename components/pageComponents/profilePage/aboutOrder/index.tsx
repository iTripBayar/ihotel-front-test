import { useSearchParams, useRouter } from "next/navigation";
import General from "./general";
import Order from "./order";
import Payment from "./payment";
import TermOfCancel from "./termOfCancel";
import { unserialize } from "serialize-php";
import { toast } from "sonner";

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
}

export default function AboutOrder({ data }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const lang = searchParams.get("lang");
  let totalPrice = { value: 0, value_en: 0 };
  const roomsData: OrderRooms[] = unserialize(data.rooms);

  for (let i = 0; i < roomsData.length; i++) {
    totalPrice = {
      value: totalPrice.value + roomsData[i].rates[0].value,
      value_en: totalPrice.value_en + roomsData[i].rates[0].value_en,
    };
  }

  const handleCancelOrder = async (id: number) => {
    try {
      const response = await fetch(
        `${process.env.WEB_URL}/ihotel/order/cancel/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          // body: JSON.stringify({
          //   id: id
          // }),
        },
      );
      if (!response.ok) {
        toast.error(`${lang === "en" ? "Error!" : "Алдаа гарлаа"}`);
      } else {
        toast.success(
          `${
            lang === "en" ? "Cancellation successful!" : "Амжилттай цуцлагдлаа!"
          }`,
        );
      }
      // const res = await response.json();
      // console.log(res);
    } catch (error: any) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("HTTP error! Status:", error.response.status);
        // You can also access the response data (if available)
        console.error("Response data:", error.response.data);
      } else {
        // The request was made but no response was received
        console.error("Request error:", error.message);
      }
    }
  };

  const handlePayment = () => {
    router.push(
      `/payment?id=${data.id}&tkn=${data.token}}&totalPrice=${totalPrice.value}`,
    );
  };

  return (
    <div className="flex flex-col w-full items-start sm:items-center gap-[16px] sm:gap-[20px] sm:pt-[8px] md:pt-[12px] md:gap-[24px] min-h-screen px-[16px] 2xs:px-[20px] sm:px-[50px] md:px-[72px] lg:px-[150px]">
      <h3 className="text-[16px] leading-[17px] text-main-text/75 font-medium md:text-[18px] md:leading-[20px]">
        {lang === "en" ? "Order information" : "Захиалгын дэлгэрэнгүй"}
      </h3>
      <div className="flex flex-col rounded-[20px] lg:rounded-none w-full gap-[24px] lg:gap-[32px] md:gap-[16px] pb-[16px] sm:pb-[20px]">
        <General data={data.hotel} />
        <div className="flex flex-col rounded-[20px] w-full gap-[24px] md:gap-[16px] shadow-[0px_0px_12px_4px_rgb(0,0,0,0.15)] md:px-[24px] sm:px-[20px] px-[16px] lg:px-[32px] pb-[16px] lg:pb-[20px] xl:px-[50px] xl:pb-[32px] 2xl:px-[100px] 2xl:pb-[48px]">
          <Order
            data={data}
            handleCancelOrder={(id: number) => handleCancelOrder(id)}
            handlePayment={handlePayment}
          />
          <Payment
            data={data}
            handleCancelOrder={(id: number) => handleCancelOrder(id)}
            handlePayment={handlePayment}
          />
          <TermOfCancel
            data={data.hotel.cancellationPolicies}
            totalPrice={totalPrice}
            checkIn={data.checkIn}
          />
        </div>
        <button
          className="flex gap-[6px] text-primary-blue justify-center items-center font-medium h-[42px]"
          onClick={() => router.back()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="min-w-[20px] max-w-[20px] min-h-[20px] max-h-[20px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
            />
          </svg>
          <span>{lang === "en" ? "Back" : "Буцах"}</span>
        </button>
      </div>
      {/* back btn */}
    </div>
  );
}
