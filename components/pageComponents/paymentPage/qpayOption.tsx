import Image from 'next/image';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { ChakraProvider, CircularProgress } from '@chakra-ui/react';
import { useRequest } from 'ahooks';
import { qPayInquiry, qPayPayment } from '@/utils/payment/qpay';
import { useEffect } from 'react';
import Timer from './timer';
import Success from './success';

interface Props {
  handleError: () => void;
  handleTimeOut: () => void;
}

export default function QpayOption({ handleError, handleTimeOut }: Props) {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');
  const id = searchParams.get('id');
  const pathname = usePathname();
  const router = useRouter();

  const { data, loading, error } = useRequest(
    () => {
      return qPayPayment(id ? id : '');
    },
    {
      onSuccess: (res) => {
        console.log(res);
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
  } = useRequest(
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
      if (id && data) {
        run({ order_id: id, invoice_id: data.response.invoiceId });
      } else if (pathname === '/reservation') {
        return () => clearInterval(check);
      }
    }, 5000);
    return () => clearInterval(check);
  }, [data]);
  
  if (!error) {
    if (loading === false && data) {
      return (
        <div className='flex flex-col items-center gap-[24px] py-[32px] pb-[50px] text-main-text'>
          <h3 className='text-[16px] font-bold uppercase'>QPay</h3>
          <div className='flex w-full min-w-[300px] items-center justify-between 2xs:min-w-[340px] sm:min-w-[400px] md:min-w-[450px]'>
            {/* info */}
            <div className='flex w-full flex-col justify-center gap-[12px] font-medium'>
              <div className='flex flex-col gap-[8px] leading-[16px]'>
                <p className=' opacity-60'>Merchant</p>
                <p className='pl-[12px] font-medium '>{`RN-${id}`}</p>
              </div>
              <div className='flex flex-col gap-[8px] leading-[16px]'>
                <p className=' opacity-60'>
                  {lang === 'en' ? 'Transfer amount' : 'Мөнгөн дүн'}
                </p>
                <p className='pl-[12px] font-medium '>{`${
                  lang === 'en' ? '50$' : 'MNT 70,000'
                }`}</p>
              </div>
            </div>
            <Timer time={data.createdAt} handleTimeOut={handleStop} />
          </div>
          {!paymentData?.response.rows[0] ||
          paymentData?.response.rows[0].paymentStatus !== 'PAID' ? (
            <div className='flex flex-col items-center justify-center gap-[24px]'>
              <div>
                <div className='relative h-[200px] w-[200px] overflow-hidden'>
                  <Image
                    src={'data:image/png;base64,' + data?.response.qrImage}
                    alt='/qr'
                    fill={true}
                    sizes='50vw'
                    quality={100}
                    className='absolute h-auto w-auto select-none object-cover'
                    draggable={false}
                  />
                </div>
              </div>
              <div className='flex min-w-[300px] flex-col items-center justify-start gap-[20px] rounded-[8px] border border-black/50 px-[16px] py-[16px] shadow-[0px_0px_12px_2px_rgb(255,255,255,0.1)] 2xs:min-w-[340px] 2xs:px-[24px] sm:min-w-[400px] md:min-w-[450px]'>
                {/* bank info */}
                <div className='flex w-full flex-col items-start justify-start gap-[20px] text-[16px] leading-[16px]'>
                  <div className='flex gap-[12px]'>
                    <p className='opacity-60'>
                      {lang === 'en' ? 'Account name:' : 'Дансны нэр:'}
                    </p>
                    <span className='font-medium'>{`Айхотел ХХК`}</span>
                  </div>
                  <div className='flex gap-[12px]'>
                    <p className='opacity-60'>
                      {lang === 'en' ? 'Currency:' : 'Валют:'}
                    </p>
                    <span className='font-medium uppercase'>
                      {lang === 'en' ? 'DOLLAR' : 'MNT'}
                    </span>
                  </div>
                  <div className='flex gap-[12px]'>
                    <p className='opacity-60'>
                      {lang === 'en' ? 'Remark:' : 'Гүйлгээний утга:'}
                    </p>

                    <span className='font-medium'>{`RN-11282`}</span>
                  </div>
                </div>
              </div>
              <p className='foont-bold w-[250px] text-center leading-[16px]'>
                {lang === 'en'
                  ? 'To proceed with the payment, please scan the QR code or use the above information.'
                  : 'Та QR кодыг уншуулах эсвэл дээрх мэдээллийг ашиглан төлбөр тооцоогоо хийнэ үү.'}
              </p>
            </div>
          ) : (
            <Success/>
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
