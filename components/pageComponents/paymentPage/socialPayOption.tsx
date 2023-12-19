import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  ChakraProvider,
  CircularProgress,
  CircularProgressLabel,
} from '@chakra-ui/react';
import Image from 'next/image';

export default function SocialPayOption() {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');

  const router = useRouter();
  const duration = 600; // 10 minutes in seconds
  const [countdown, setCountdown] = useState(duration); // 10 minutes in seconds
  const [progressValue, setProgressValue] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 0) {
          router.back();
          clearInterval(interval);
          return 0;
        }

        const newProgressValue = (prevCountdown / duration) * 100;
        setProgressValue(newProgressValue);

        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className='flex flex-col items-center gap-[24px] py-[32px] pb-[50px] text-main-text'>
      <h3 className='text-[16px] font-bold uppercase'>Social Pay</h3>
      <div className='flex w-full min-w-[300px] items-center justify-between 2xs:min-w-[340px] sm:min-w-[400px] md:min-w-[450px]'>
        {/* info */}
        <div className='flex flex-col gap-[12px] font-medium'>
          <div className='flex flex-col gap-[8px] leading-[16px]'>
            <p className=' opacity-60'>Merchant</p>
            <p className='pl-[12px] font-medium'>{`RN-11282`}</p>
          </div>
          <div className='flex flex-col gap-[8px] leading-[16px]'>
            <p className=' opacity-60'>
              {lang === 'en' ? 'Transfer amount' : 'Мөнгөн дүн'}
            </p>
            <p className='pl-[12px] font-medium'>{`${
              lang === 'en' ? '50$' : 'MNT 70,000'
            }`}</p>
          </div>
        </div>
        {/* timer */}
        <div>
          <ChakraProvider>
            <CircularProgress
              value={progressValue}
              color='#3C76FE'
              size='90px'
              thickness='4px'
              capIsRound={true}
            >
              <CircularProgressLabel>
                {`${Math.floor(countdown / 60)
                  .toString()
                  .padStart(2, '0')}:${(countdown % 60)
                  .toString()
                  .padStart(2, '0')}`}
              </CircularProgressLabel>
            </CircularProgress>
          </ChakraProvider>
        </div>
      </div>
      <div>
        <div className='relative h-[200px] w-[200px] overflow-hidden'>
          <Image
            src='/qrSample.png'
            alt='/hotel'
            fill={true}
            sizes='50vw'
            quality={100}
            className='absolute object-cover w-auto h-auto select-none'
            draggable={false}
          />
        </div>
      </div>
      <p className='foont-bold w-[250px] text-center leading-[16px]'>
        {lang === 'en'
          ? 'To proceed with the payment, please scan the QR code or use the application.'
          : 'Та QR кодыг уншуулах эсвэл апп ашиглан төлбөр тооцоогоо хийнэ үү.'}
      </p>
      <button
        className='font-medium leading-[16px] text-primary-blue'
        onClick={() => router.back()}
      >
        {lang === 'en' ? 'Cancel' : 'Цуцлах'}
      </button>
    </div>
  );
}
