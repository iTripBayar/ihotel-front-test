import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, ChangeEvent } from 'react';
import {
  ChakraProvider,
  CircularProgress,
  CircularProgressLabel,
} from '@chakra-ui/react';
import Image from 'next/image';

export default function PassOption() {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');

  const router = useRouter();
  const duration = 600; // 10 minutes in seconds
  const [countdown, setCountdown] = useState(duration); // 10 minutes in seconds
  const [progressValue, setProgressValue] = useState(100);

  const [phoneNumber, setPhoneNumber] = useState('');

  const isButtonDisabled = phoneNumber.length !== 8;

  const handlePhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputPhoneNumber = event.target.value;

    const numericValue = inputPhoneNumber.replace(/\D/g, '');

    setPhoneNumber(numericValue.slice(0, 8));
  };

  const handleProceedClick = () => {
    console.log('Proceed clicked with phone number:', phoneNumber);
  };

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
      <h3 className='text-[16px] font-bold uppercase'>Pass.mn</h3>
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
              color='#25E46A'
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
            alt='/qrSample'
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
          ? 'To proceed with the payment, please scan the QR code or enter your phone number.'
          : 'Та QR кодыг уншуулах эсвэл утасны дугаараа оруулан төлбөр тооцоогоо хийнэ үү.'}
      </p>
      <input
        type='number'
        placeholder={
          lang === 'en'
            ? 'Enter your phone number'
            : 'Утасны дугаараа оруулна уу'
        }
        maxLength={8}
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        className=' h-[40px] w-[250px] rounded-[12px] border border-pass-green bg-payment-black/[.1] text-center text-[16px] font-bold tracking-[6px] text-main-text shadow-[0px_0px_4px_1px_rgb(37,228,106,0.75)] placeholder:mt-[-4px] placeholder:text-[14px]  placeholder:font-medium placeholder:tracking-normal placeholder:text-main-text focus:border-pass-green focus:ring-pass-green'
      />
      <button
        onClick={handleProceedClick}
        className={`flex h-[40px] w-[200px] items-center justify-center rounded-[12px] bg-pass-green font-semibold text-white ${
          isButtonDisabled ? 'cursor-not-allowed opacity-50' : ''
        }`}
        disabled={isButtonDisabled}
      >
        {lang === 'en' ? 'Proceed' : 'Үргэлжлүүлэх'}
      </button>
      <button
        className='font-medium leading-[16px] text-pass-green'
        onClick={() => router.back()}
      >
        {lang === 'en' ? 'Back' : 'Буцах'}
      </button>
    </div>
  );
}
