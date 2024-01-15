import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

interface Props {
  data: User.Order;
  handleCancelOrder: (id: number) => void;
  handlePayment: () => void;
}

export default function Order({
  data,
  handleCancelOrder,
  handlePayment,
}: Props) {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");
  const clientData = JSON.parse(data.userdata);

  return (
    <div className="flex flex-col gap-[12px] w-full md:flex-col-reverse md:items-center">
      {data.status === "pending" ? (
        <div className="flex flex-col gap-[12px] w-full pt-[16px] text-[16px] md:pt-0 md:hidden md:max-w-[450px] justify-center leading-[15px] ">
          <button
            className="w-full rounded-full bg-main-online flex justify-center items-center text-white font-semibold uppercase h-[42px]"
            onClick={handlePayment}
          >
            {lang === "en" ? "Proceed to payment" : "Төлбөр төлөх"}
          </button>
          <button
            className="w-full rounded-full border-[2px] border-main-offline uppercase text-main-offline h-[42px] flex justify-center items-center font-medium"
            onClick={() => {
              toast.custom(
                (t) => (
                  <div className="w-full flex flex-col gap-[24px] bg-white border font-medium border-black/[.25] rounded-[20px] px-[16px] py-[12px] items-center">
                    <button
                      className="absolute right-[12px] top-[12px]"
                      onClick={() => toast.dismiss(t)}
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
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                    <p className="w-full">
                      {lang === "en"
                        ? "Proceed with the cancel?"
                        : "Та энэ захиалгыг цуцлах гэж байгаадаа итгэлтэй байна уу?"}
                    </p>
                    <div className="flex gap-[12px]">
                      <button
                        onClick={() => {
                          handleCancelOrder(data.id);
                          setTimeout(() => {
                            toast.dismiss(t);
                            window.location.reload();
                          }, 1500);
                        }}
                        className="px-[32px] py-[6px] flex justify-center items-center bg-primary-blue text-white rounded-full"
                      >
                        {lang === "en" ? "Yes" : "Тийм"}
                      </button>
                      <button
                        onClick={() => toast.dismiss(t)}
                        className="px-[32px] py-[6px] flex justify-center items-center border border-main-offline text-main-offline rounded-full"
                      >
                        {lang === "en" ? "No" : "Үгүй"}
                      </button>
                    </div>
                  </div>
                ),
                {
                  position: "top-center",
                  duration: 1000 * 100,
                },
              );
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
              data.status === "checked-out" || data.status === "confirmed"
                ? "bg-main-online text-white"
                : data.status === "pending"
                ? "bg-main-pending"
                : "bg-main-offline text-white"
            }`}
          >
            {data.status === "check-out"
              ? `${lang === "en" ? "Confirmed" : "Баталгаажсан"}`
              : data.status === "confirmed"
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
