import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

interface Props {
  data: User.Order;
}

export default function Order({ data }: Props) {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");
  const clientData = JSON.parse(data.userdata);

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
  return (
    <div className="flex flex-col gap-[12px] w-full md:flex-col-reverse md:items-center">
      {data.status === "pending" ? (
        <div className="flex flex-col gap-[12px] w-full pt-[16px] text-[16px] md:pt-0 md:flex-row md:max-w-[450px] justify-center leading-[15px] ">
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
      <div className={`w-full flex flex-col gap-[16px] items-center pt-[24px]`}>
        {/* orderID */}
        <div className="flex flex-col gap-[6px] items-center md:gap-[4px]">
          <p className="text-[14px] leading-[15px] text-sub-text/75 font-medium lg:text-[16px] lg:leading-[17px]">
            {lang === "en" ? "Order ID" : "Захиалгын дугаар"}
          </p>
          <p className="text-[18px] text-main-text font-semibold leading-[20px] md:text-[20px] md:leading-[22px]">
            {data.number}
          </p>
        </div>

        <div className="flex flex-col gap-[16px] w-full">
          {/* client name */}
          <div className="flex justify-between w-full text-[16px] leading-[17px] font-medium">
            <p className="text-sub-text/75">
              {lang === "en" ? `Client's name` : "Зочны нэр"}
            </p>
            <p className="text-main-text">{`${clientData.name} ${clientData.surname}`}</p>
          </div>
          {/* duration */}
          <div className="flex justify-between w-full text-[16px] leading-[17px] font-medium">
            <p className="text-sub-text/75">
              {lang === "en" ? `Duration of stay` : "Байрших хугацаа"}
            </p>
            <p className="text-main-text">
              {lang === "en"
                ? `${data.day} ${data.day > 1 ? "day" : "days"}`
                : `${data.day} хоног`}
            </p>
          </div>
          {/* number of clients */}
          <div className="flex justify-between w-full text-[16px] leading-[17px] font-medium">
            <p className="text-sub-text/75">
              {lang === "en" ? `Number of guests` : "Зочны тоо"}
            </p>
            <p className="text-main-text">
              {lang === "en"
                ? `${data.numberOfGuests} ${
                    data.numberOfGuests > 1 ? "people" : "person"
                  }`
                : `${data.numberOfGuests} хүн`}
            </p>
          </div>
        </div>
        {/* checkIn & checkOut */}
        <div className="flex justify-between items-center w-full max-w-[450px] mx-auto text-primary-blue px-[18px] py-[8px] rounded-[20px] border-[2px] border-primary-blue/[.5]">
          {/* checkIn */}
          <div className="flex flex-col gap-[2px]">
            <p className="text-[14px] leading-[14px] text-sub-text">
              {lang === "en" ? "Check in" : "Орох өдөр"}
            </p>
            <p className="text-[18px] leading-[18px] font-medium">
              {data.checkIn.split(" ")[0]}
            </p>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="min-w-[20px] max-w-[20px] min-h-[20px] max-h-[20px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
          {/* checkOut */}
          <div className="flex flex-col gap-[2px]">
            <p className="text-[14px] leading-[14px] text-sub-text">
              {lang === "en" ? "Check out" : "Гарах өдөр"}
            </p>
            <p className="text-[18px] leading-[18px] font-medium">
              {data.checkOut.split(" ")[0]}
            </p>
          </div>
        </div>
        {/* status */}
        <div
          className={`flex flex-col gap-[6px] items-center w-full max-w-[450px]`}
        >
          <p className="text-[16px] leading-[17px] text-sub-text/75 font-medium">
            {lang === "en" ? "Order status" : "Захиалгын төлөв"}
          </p>
          <div
            className={`w-full rounded-full flex justify-center items-center h-[42px] uppercase font-semibold text-[14px] leading-[15px] ${
              data.status === "checked-out"
                ? "bg-main-online text-white"
                : data.status === "pending"
                ? "bg-main-pending"
                : "bg-main-offline text-white"
            }`}
          >
            {data.status === "check-out"
              ? `${lang === "en" ? "Confirmed" : "Баталгаажсан"}`
              : data.status === "pending"
              ? `${lang === "en" ? "Pending" : "Хүлээгдэж байна"}`
              : `${lang === "en" ? "Canceled" : "Цуцлагдсан"}`}
          </div>
        </div>
      </div>
    </div>
  );
}
