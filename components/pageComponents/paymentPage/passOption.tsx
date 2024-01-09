import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState, useEffect, ChangeEvent } from "react";
import { CircularProgress } from "@chakra-ui/react";
import Timer from "./timer";
import { useRequest } from "ahooks";
import { passInquiry, passNotify, passPayment } from "@/utils/payment/pass";
import QRCode from "qrcode";
import Success from "./success";

interface Props {
  handleTimeOut: () => void;
  handleError: () => void;
  time: Date
}

export default function PassOption({ handleTimeOut, handleError,time }: Props) {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");
  const id = searchParams.get("id");
  const pathname = usePathname();
  const router = useRouter();
  const [rerender, setRerender] = useState(false);
  const totalPrice = searchParams.get("totalPrice");

  const canvas: HTMLElement | null = document.getElementById("canvas");

  const { data, loading, error } = useRequest(
    () => {
      return passPayment(id ? id : "");
    },
    {
      onSuccess: (res) => {
        console.log(res);
        setTimeout(() => {
          setRerender(!rerender);
        }, 100);
        if (canvas !== null) {
          console.log("not null");
          QRCode.toCanvas(canvas, res.orderId, function (error) {
            if (error) console.error(error);
            console.log("success!");
          });
        }
      },
      onError: (err) => {
        console.log(err);
        handleError();
      },
    },
  );
  const {
    run,
    data: paymentData,
    cancel: cancelInquiry,
  } = useRequest(
    (e: { order_id: string; ihotel_order_id: string }) => {
      return passInquiry({
        order_id: e.order_id,
        ihotel_order_id: e.ihotel_order_id,
      });
    },
    {
      manual: true,
      onSuccess: (res) => {
        console.log(res);
      },
      onError: (err) => {
        console.log(err);
        handleError();
      },
      onBefore: () => {
        if (pathname === "/reservation") {
          cancelInquiry();
        }
      },
    },
  );
  const { run: runNotif } = useRequest(
    (e: { order_id: string; phone: string }) => {
      return passNotify({
        order_id: e.order_id,
        phone: e.phone,
      });
    },
    {
      manual: true,
      onSuccess: (res) => {
        console.log(res);
      },
      onError: (err) => {
        console.log(err);
        handleError();
      },
    },
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (data && id) {
        run({
          order_id: data.orderId,
          ihotel_order_id: id,
        });
      } else if (pathname === "/reservation") {
        return () => clearInterval(interval);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [data]);

  const [phoneNumber, setPhoneNumber] = useState("");
  const isButtonDisabled = phoneNumber.length !== 8;
  const handlePhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputPhoneNumber = event.target.value;

    const numericValue = inputPhoneNumber.replace(/\D/g, "");

    setPhoneNumber(numericValue.slice(0, 8));
  };

  const handleStop = () => {
    handleTimeOut();
  };

  if (!error) {
    if (loading === false && data) {
      const handleProceedClick = () => {
        runNotif({ order_id: data ? data?.orderId : "", phone: phoneNumber });
      };
      if (canvas !== null && data) {
        QRCode.toCanvas(canvas, data?.orderId);
      }
      return (
        <div className="flex flex-col items-center gap-[24px] py-[32px] pb-[50px] text-main-text">
          <h3 className="text-[16px] font-bold uppercase">Pass.mn</h3>
          <div className="flex w-full min-w-[300px] items-center justify-between 2xs:min-w-[340px] sm:min-w-[400px] md:min-w-[450px]">
            {/* info */}
            <div className="flex flex-col gap-[12px] font-medium">
              <div className="flex flex-col gap-[8px] leading-[16px]">
                <p className=" opacity-60">Merchant</p>
                <p className="pl-[12px] font-medium">{`RN-${id}`}</p>
              </div>
              <div className="flex flex-col gap-[8px] leading-[16px]">
                <p className=" opacity-60">
                  {lang === "en" ? "Transfer amount" : "Мөнгөн дүн"}
                </p>
                <p className="pl-[12px] font-medium">
                  MNT {totalPrice ? parseInt(totalPrice).toLocaleString() : 0}
                </p>
              </div>
            </div>
            <Timer time={time} handleTimeOut={handleStop} />
          </div>
          {/* {paymentData?.response ? <>
          
          </> : <>Error</>} */}
          {paymentData?.response.ret.status !== "paid" ? (
            <div className="flex flex-col items-center justify-center gap-[24px]">
              <div>
                <div className="relative h-[200px] w-[200px] overflow-hidden">
                  <canvas
                    id="canvas"
                    height={200}
                    width={200}
                    className="!h-[200px] !w-[200px] bg-white text-black"
                  ></canvas>
                </div>
              </div>
              <p className="foont-bold w-[250px] text-center leading-[16px]">
                {lang === "en"
                  ? "To proceed with the payment, please scan the QR code or enter your phone number."
                  : "Та QR кодыг уншуулах эсвэл утасны дугаараа оруулан төлбөр тооцоогоо хийнэ үү."}
              </p>
              <input
                type="number"
                placeholder={
                  lang === "en"
                    ? "Enter your phone number"
                    : "Утасны дугаараа оруулна уу"
                }
                maxLength={8}
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                className=" h-[40px] w-[250px] rounded-[12px] border border-pass-green bg-payment-black/[.1] text-center text-[16px] font-bold tracking-[6px] text-main-text shadow-[0px_0px_4px_1px_rgb(37,228,106,0.75)] placeholder:mt-[-4px] placeholder:text-[14px]  placeholder:font-medium placeholder:tracking-normal placeholder:text-main-text focus:border-pass-green focus:ring-pass-green"
              />
              <button
                onClick={handleProceedClick}
                className={`flex h-[40px] w-[200px] items-center justify-center rounded-[12px] bg-pass-green font-semibold text-white ${
                  isButtonDisabled ? "cursor-not-allowed opacity-50" : ""
                }`}
                disabled={isButtonDisabled}
              >
                {lang === "en" ? "Proceed" : "Үргэлжлүүлэх"}
              </button>
            </div>
          ) : (
            <Success />
          )}
          <button
            className="font-medium leading-[16px] text-pass-green"
            onClick={() => {
              setTimeout(() => {
                router.back();
              }, 1000);
            }}
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
