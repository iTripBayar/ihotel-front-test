import Image from 'next/image';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { ChakraProvider, CircularProgress } from '@chakra-ui/react';
import { useRequest } from 'ahooks';
import { qPayInquiry, qPayPayment } from '@/utils/payment/qpay';
import { useEffect, useState } from 'react';

export default function QpayOption() {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');
  const id = searchParams.get('id');
  const pathname = usePathname();
  const router = useRouter();

  const [stop, setStop] = useState(false);
  // const sampleBanks = [
  //   {
  //     id: 1,
  //     international: false,
  //     name: 'Хаан банк',
  //     nameEn: 'Khaan bank',
  //     account: '5111449137',
  //     image: '/khaan-logo.png',
  //   },
  //   {
  //     id: 2,
  //     international: true,
  //     name: 'Голомт банк',
  //     nameEn: 'Golomt bank',
  //     account: '1415100268',
  //     image: '/golomt-logo.png',
  //   },
  //   {
  //     id: 3,
  //     international: false,
  //     name: 'TDB банк',
  //     nameEn: 'TDB bank',
  //     account: '470021901',
  //     image: '/tdb-logo.png',
  //   },
  //   {
  //     id: 4,
  //     international: true,
  //     name: 'Капитрон банк',
  //     nameEn: 'Kapitron bank',
  //     account: '3011012058',
  //     image: '/kapitron_logo.png',
  //   },
  // ];
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
      },
    },
  );
  const {
    run,
    error: paymentError,
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
    },
  );
  useEffect(() => {
    const check = setInterval(() => {
      if (id && data) {
        run({ order_id: id, invoice_id: data.response.invoiceId });
      } else {
        clearInterval(check);
      }
    }, 5000);
    if (pathname !== '/payment/') {
      clearInterval(check);
    }
    if (paymentData?.response.rows[0].paymentStatus === 'PAID') {
      clearInterval(check);
    }
    if (stop === true) {
      clearInterval(check);
    }
  }, [data]);
  // const handleCopyClick = async (e: string) => {
  //   try {
  //     await navigator.clipboard.writeText(e);
  //   } catch (err) {
  //     console.error('Unable to copy text to clipboard.', err);
  //   }
  // };
  if (!error) {
    if (loading === false && data) {
      return (
        <div className='flex flex-col items-center gap-[24px] py-[32px] pb-[50px] text-main-text'>
          <h3 className='text-[16px] font-bold uppercase'>QPay</h3>
          <div className='flex w-full min-w-[300px] items-center justify-between 2xs:min-w-[340px] sm:min-w-[400px] md:min-w-[450px]'>
            {/* info */}
            <div className='flex w-full justify-center gap-[12px] font-medium'>
              <div className='flex flex-col gap-[8px] leading-[16px]'>
                <p className=' opacity-60'>Merchant</p>
                <p className='font-medium '>{`RN-11282`}</p>
              </div>
              <div className='flex flex-col gap-[8px] leading-[16px]'>
                <p className=' opacity-60'>
                  {lang === 'en' ? 'Transfer amount' : 'Мөнгөн дүн'}
                </p>
                <p className='font-medium '>{`${
                  lang === 'en' ? '50$' : 'MNT 70,000'
                }`}</p>
              </div>
            </div>
          </div>
          {!paymentData?.response.rows[0] || paymentData?.response.rows[0].paymentStatus !== 'PAID' ? <div className='flex flex-col items-center justify-center gap-[24px]'>
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
                {/* <div className='flex w-full flex-col gap-[12px]'>
            {sampleBanks
              .filter((index) =>
                lang === 'en' ? index.international === true : index,
              )
              .map((index, i) => (
                <div
                  className='flex items-center justify-between w-full'
                  key={i}
                >
                  <div className='flex items-center justify-start gap-[16px]'>
                    <div className='relative h-[40px] w-[40px] overflow-hidden'>
                      <Image
                        src={index.image}
                        alt='/hotel'
                        fill={true}
                        sizes='50vw'
                        quality={100}
                        className='absolute object-cover w-auto h-auto select-none'
                        draggable={false}
                      />
                    </div>
                    <div className='flex h-full flex-col items-start justify-between gap-[6px]'>
                      <p className='font-medium'>
                        {lang === 'en' ? index.nameEn : index.name}
                      </p>
                      <p>{index.account}</p>
                    </div>
                  </div>
                  <button
                    className='flex h-[40px] w-[80px] items-center justify-center rounded-[8px] border border-black/[.3]  bg-payment-black/[.05] font-medium hover:border-white hover:bg-payment-black/25'
                    onClick={() => handleCopyClick(index.account)}
                  >
                    {lang === 'en' ? 'Copy' : 'Хуулах'}
                  </button>
                </div>
              ))}
          </div> */}
              </div>
            </div>
            <p className='foont-bold w-[250px] text-center leading-[16px]'>
              {lang === 'en'
                ? 'To proceed with the payment, please scan the QR code or use the above information.'
                : 'Та QR кодыг уншуулах эсвэл дээрх мэдээллийг ашиглан төлбөр тооцоогоо хийнэ үү.'}
            </p>
          </div> : paymentError ? <>Error</> : <div>Success</div>}
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
