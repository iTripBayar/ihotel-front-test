import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { CircularProgress } from '@chakra-ui/react';
import Image from 'next/image';
import { useRequest } from 'ahooks';
import { socialPayInquiry, socialPayPayment } from '@/utils/payment/socialPay';
import Timer from './timer';
import QRCode from 'qrcode';
import { useEffect, useState } from 'react';
import Success from './success';
import { useAppCtx } from '@/contexts/app';
import Link from 'next/link';

interface Props {
  handleTimeOut: () => void;
  handleError: () => void;
  time: Date
}

export default function SocialPayOption({ handleTimeOut, handleError, time }: Props) {
  const searchParams = useSearchParams();
  const { appState } = useAppCtx();
  const pathname = usePathname();
  const lang = searchParams.get('lang');
  const id = searchParams.get('id');
  const router = useRouter();
  const [qr, setQr] = useState<string>('');
  const totalPrice = searchParams.get("totalPrice");

  const { data, loading, error } = useRequest(
    () => {
      return socialPayPayment(id ? id : '');
    },
    {
      onSuccess: (res) => {
        console.log(res);
        QRCode.toDataURL(res.qpay).then(setQr);
      },
      onError: (err) => {
        console.log(err);
        handleError();
      },
    },
  );
  const { run, data: paymentData } = useRequest(
    (e: { order_id: string; ihotel_order_id: string }) => {
      return socialPayInquiry({
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
    },
  );
  const handleStop = () => {
    handleTimeOut();
  };

  useEffect(() => {
    const check = setInterval(() => {
      if (id) {
        run({ order_id: id, ihotel_order_id: id });
      } else if (pathname === '/reservation') {
        return () => clearInterval(check);
      }
    }, 5000);
    return () => clearInterval(check);
  }, [data, appState.paymentMethod]);

  if (!error) {
    if (loading === false && data) {
      return (
        <div className="flex flex-col items-center gap-[24px] py-[32px] pb-[50px] text-main-text">
          <h3 className="text-[16px] font-bold uppercase">Social Pay</h3>
          <div className="flex w-full min-w-[300px] items-center justify-between 2xs:min-w-[340px] sm:min-w-[400px] md:min-w-[450px]">
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
                  {/* {`MNT ${data.order.amount.toLocaleString()}`} */}
                  MNT {totalPrice ? parseInt(totalPrice).toLocaleString() : 0}
                </p>
              </div>
            </div>
            <Timer time={time} handleTimeOut={handleStop} />
          </div>
          {paymentData?.response.status !== "SENT" ? (
            <div className="flex flex-col items-center justify-center gap-[24px]">
              <div>
                <div className="relative h-[200px] w-[200px] overflow-hidden">
                  <Image
                    src={qr}
                    alt="/qr"
                    fill={true}
                    sizes="50vw"
                    quality={100}
                    className="absolute h-auto w-auto select-none object-cover"
                    draggable={false}
                  />
                </div>
              </div>
              <Link
                href={data.order.socialpayDeeplink}
                target="_blank"
                id={`${data.orderId}`}
                className="w-[48px] h-[48px] border border-black/[.25] rounded-[8px] overflow-hidden p-[4px]"
              >
                <img
                  src="/SocialPay.png"
                  alt="/socialPay"
                  className="w-full h-full rounded-[4px]"
                />
              </Link>
              <p className="foont-bold w-[250px] text-center leading-[16px] hidden lg:flex">
                {lang === "en"
                  ? "To proceed with the payment, please scan the QR code."
                  : "Та QR кодыг уншуулан төлбөр тооцоогоо хийнэ үү."}
              </p>
              <p className="foont-bold w-[250px] text-center leading-[16px] lg:hidden">
                {lang === "en"
                  ? "To proceed with the payment, please scan the QR code or use the application."
                  : "Та QR кодыг уншуулах эсвэл апп ашиглан төлбөр тооцоогоо хийнэ үү."}
              </p>
            </div>
          ) : (
            <Success />
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
          <div className='flex h-[40vh] w-full items-center justify-center pb-[100px]'>
            <CircularProgress isIndeterminate={true} color='#3C76FE' />
          </div>
      );
    }
  }
}
