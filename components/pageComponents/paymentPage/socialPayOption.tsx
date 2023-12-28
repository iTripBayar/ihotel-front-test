import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { ChakraProvider, CircularProgress } from '@chakra-ui/react';
import Image from 'next/image';
import { useRequest } from 'ahooks';
import { socialPayInquiry, socialPayPayment } from '@/utils/payment/socialPay';
import Timer from './timer';
import QRCode from 'qrcode';
import { useEffect, useState } from 'react';

interface Props {
  handleTimeOut: () => void;
}

export default function SocialPayOption({ handleTimeOut }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const lang = searchParams.get('lang');
  const id = searchParams.get('id');

  const router = useRouter();
  const [qr, setQr] = useState<string>('');
  const [stop, setStop] = useState(false);

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
      },
    },
  );
  const {
    run,
    error: paymentError,
    data: paymentData,
  } = useRequest(
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
    },
  );
  const handleStop = () => {
    setStop(true);
    handleTimeOut();
  };

  useEffect(() => {
    const check = setInterval(() => {
      if (id) {
        run({ order_id: id, ihotel_order_id: id });
      } else {
        clearInterval(check);
      }
    }, 5000);
    if (pathname !== '/payment/') {
      clearInterval(check);
    }
    if (paymentData?.response.status === 'SENT') {
      clearInterval(check);
    }
    if (stop === true) {
      clearInterval(check);
    }
  }, [data]);

  if (!error) {
    if (loading === false && data) {
      return (
        <div className='flex flex-col items-center gap-[24px] py-[32px] pb-[50px] text-main-text'>
          <h3 className='text-[16px] font-bold uppercase'>Social Pay</h3>
          <div className='flex w-full min-w-[300px] items-center justify-between 2xs:min-w-[340px] sm:min-w-[400px] md:min-w-[450px]'>
            <div className='flex flex-col gap-[12px] font-medium'>
              <div className='flex flex-col gap-[8px] leading-[16px]'>
                <p className=' opacity-60'>Merchant</p>
                <p className='pl-[12px] font-medium'>{`RN-11282`}</p>
              </div>
              <div className='flex flex-col gap-[8px] leading-[16px]'>
                <p className=' opacity-60'>
                  {lang === 'en' ? 'Transfer amount' : 'Мөнгөн дүн'}
                </p>
                <p className='pl-[12px] font-medium'>{`MNT ${data.order.amount.toLocaleString()}`}</p>
              </div>
            </div>
            <Timer time={data.order.createdAt} handleTimeOut={handleStop} />
          </div>
          {paymentData?.response.status !== 'SENT' ? (
            <div className='flex flex-col items-center justify-center gap-[24px]'>
              <div>
                <div className='relative h-[200px] w-[200px] overflow-hidden'>
                  <Image
                    src={qr}
                    alt='/qr'
                    fill={true}
                    sizes='50vw'
                    quality={100}
                    className='absolute h-auto w-auto select-none object-cover'
                    draggable={false}
                  />
                </div>
              </div>
              <p className='foont-bold w-[250px] text-center leading-[16px]'>
                {lang === 'en'
                  ? 'To proceed with the payment, please scan the QR code or use the application.'
                  : 'Та QR кодыг уншуулах эсвэл апп ашиглан төлбөр тооцоогоо хийнэ үү.'}
              </p>
            </div>
          ) : paymentError ? (
            <>Error</>
          ) : (
            <div>Success</div>
          )}
          <button
            className='font-medium leading-[16px] text-primary-blue'
            onClick={() => router.back()}
          >
            {lang === 'en' ? 'Back' : 'Буцах'}
          </button>
        </div>
      );
    } else {
      return (
        <ChakraProvider>
          <div className='flex h-[40vh] w-full items-center justify-center pb-[100px]'>
            <CircularProgress isIndeterminate={true} color='#3C76FE' />
          </div>
        </ChakraProvider>
      );
    }
  }
}