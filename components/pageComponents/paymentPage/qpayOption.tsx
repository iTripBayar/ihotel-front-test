import Image from "next/image";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { CircularProgress } from "@chakra-ui/react";
import { useRequest } from "ahooks";
import { qPayInquiry, qPayPayment } from "@/utils/payment/qpay";
import { useEffect } from "react";
import Timer from "./timer";
import Success from "./success";
import Link from "next/link";

interface Props {
  handleError: () => void;
  handleTimeOut: () => void;
  time: Date;
}

export default function QpayOption({
  handleError,
  handleTimeOut,
  time,
}: Props) {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");
  const id = searchParams.get("id");
  const pathname = usePathname();
  const router = useRouter();
  const totalPrice = searchParams.get("totalPrice");

  const { data, loading, error } = useRequest(
    () => {
      return qPayPayment(id ? id : "");
    },
    {
      onSuccess: (res) => {
        console.log(res);
      },
      onError: () => {
        handleError();
      },
    },
  );
  const { run, data: paymentData } = useRequest(
    (e: { order_id: string; invoice_id: string }) => {
      return qPayInquiry({
        order_id: e.order_id,
        invoice_id: e.invoice_id,
      });
    },
    {
      manual: true,
      onSuccess: (res) => {
        console.log(res);
      },
      onError: () => {
        handleError();
      },
    },
  );
  const handleStop = () => {
    handleTimeOut();
  };
  useEffect(() => {
    const check = setInterval(() => {
      if (id && data) {
        run({ order_id: id, invoice_id: data.response.invoiceId });
      } else if (pathname === "/reservation") {
        return () => clearInterval(check);
      }
    }, 5000);
    return () => clearInterval(check);
  }, [data]);

  if (!error) {
    if (loading === false && data) {
      return (
        <div className="flex flex-col items-center gap-[24px] py-[32px] pb-[50px] text-main-text">
          <h3 className="text-[16px] font-bold uppercase">QPay</h3>
          <div className="flex w-full min-w-[300px] items-center justify-between 2xs:min-w-[340px] sm:min-w-[400px] md:min-w-[450px]">
            {/* info */}
            <div className="flex w-full flex-col justify-center gap-[12px] font-medium">
              <div className="flex flex-col gap-[8px] leading-[16px]">
                <p className=" opacity-60">Merchant</p>
                <p className="pl-[12px] font-medium ">{`RN-${id}`}</p>
              </div>
              <div className="flex flex-col gap-[8px] leading-[16px]">
                <p className=" opacity-60">
                  {lang === "en" ? "Transfer amount" : "Мөнгөн дүн"}
                </p>
                <p className="pl-[12px] font-medium ">
                  MNT {totalPrice ? parseInt(totalPrice).toLocaleString() : 0}
                </p>
              </div>
            </div>
            <Timer time={time} handleTimeOut={handleStop} />
          </div>
          {!paymentData?.response.rows[0] ||
          paymentData?.response.rows[0].paymentStatus !== "PAID" ? (
            <div className="flex flex-col items-center justify-center gap-[24px]">
              <div>
                <div className="relative h-[200px] w-[200px] overflow-hidden">
                  <Image
                    src={"data:image/png;base64," + data?.response.qrImage}
                    alt="/qr"
                    fill={true}
                    sizes="50vw"
                    quality={100}
                    className="absolute h-auto w-auto select-none object-cover"
                    draggable={false}
                  />
                </div>
              </div>
              <div className="grid grid-cols-[repeat(3,48px)] gap-[10px] px-2 lg:hidden">
                {data.response.urls
                  .filter(
                    (index) =>
                      index.name !== "qPay wallet" &&
                      index.name !== "State bank" &&
                      index.name !== "State bank 3.0" &&
                      index.name !== "Social Pay" &&
                      index.name !== "Most money" &&
                      index.name !== "National investment bank" &&
                      index.name !== "Chinggis khaan bank" &&
                      index.name !== "Bogd bank" &&
                      index.name !== "Trans bank" &&
                      index.name !== "Ard App" &&
                      index.name !== "Arig bank",
                  )
                  .map((index) => (
                    <Link
                      href={index.link}
                      target="_blank"
                      key={index.name}
                      className="w-[48px] h-[48px] border border-black/[.25] rounded-[8px] overflow-hidden p-[4px]"
                    >
                      <img
                        src={index.logo}
                        alt={index.description}
                        className="w-full h-full rounded-[4px]"
                      />
                    </Link>
                  ))}
              </div>
              <div className="flex min-w-[300px] flex-col items-center justify-start gap-[20px] rounded-[8px] border border-black/50 px-[16px] py-[16px] shadow-[0px_0px_12px_2px_rgb(255,255,255,0.1)] 2xs:min-w-[340px] 2xs:px-[24px] sm:min-w-[400px] md:min-w-[450px]">
                {/* bank info */}
                <div className="flex w-full flex-col items-start justify-start gap-[20px] text-[16px] leading-[16px]">
                  <div className="flex gap-[12px]">
                    <p className="opacity-60">
                      {lang === "en" ? "Account name:" : "Дансны нэр:"}
                    </p>
                    <span className="font-medium">{`Айхотел ХХК`}</span>
                  </div>
                  <div className="flex gap-[12px]">
                    <p className="opacity-60">
                      {lang === "en" ? "Currency:" : "Валют:"}
                    </p>
                    <span className="font-medium uppercase">
                      {lang === "en" ? "DOLLAR" : "MNT"}
                    </span>
                  </div>
                  <div className="flex gap-[12px]">
                    <p className="opacity-60">
                      {lang === "en" ? "Remark:" : "Гүйлгээний утга:"}
                    </p>

                    <span className="font-medium">{`RN-${id}`}</span>
                  </div>
                </div>
              </div>

              <p className="foont-bold w-[250px] text-center leading-[16px] hidden lg:flex">
                {lang === "en"
                  ? "To proceed with the payment, please scan the QR code."
                  : "Та QR кодыг уншуулан төлбөр тооцоогоо хийнэ үү."}
              </p>
              <p className="foont-bold w-[250px] text-center leading-[16px] lg:hidden">
                {lang === "en"
                  ? "To proceed with the payment, please scan the QR code or use the bank applocations."
                  : "Та QR кодыг уншуулах эсвэл банкны апп уудаас ашиглан төлбөр тооцоогоо хийнэ үү."}
              </p>
            </div>
          ) : (
            <Success id={id ? id : ""} />
          )}
          <button
            className="font-medium leading-[16px] text-primary-blue"
            onClick={() => router.back()}
          >
            {lang === "en" ? "Back" : "Буцах"}
          </button>
        </div>
      );
    } else {
      return (
        <div className="flex h-[40vh] w-full items-center justify-center pb-[100px]">
          <CircularProgress isIndeterminate={true} color="#3C76FE" />
        </div>
      );
    }
  }
}
