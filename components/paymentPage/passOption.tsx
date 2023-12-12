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
  const [countdown, setCountdown] = useState(600); // 10 minutes in seconds
  const [progressValue, setProgressValue] = useState(100);

  const [phoneNumber, setPhoneNumber] = useState('');

  const isButtonDisabled = phoneNumber.length !== 8;

  const handlePhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputPhoneNumber = event.target.value;

    // Ensure that the input only contains numeric values
    const numericValue = inputPhoneNumber.replace(/\D/g, '');

    // Set the phone number state with a maximum length of 8
    setPhoneNumber(numericValue.slice(0, 8));
  };

  const handleProceedClick = () => {
    // Implement your logic for the button click here
    // This function will be called when the button is clicked
    // You can use the 'phoneNumber' state value here
    console.log('Proceed clicked with phone number:', phoneNumber);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 0) {
          // Navigate back when countdown reaches zero
          router.back();
          clearInterval(interval);
          return 0;
        }

        // Calculate progress value based on the remaining time
        const newProgressValue = (prevCountdown / 600) * 100;
        setProgressValue(newProgressValue);
        // Format the countdown as "mm:ss"
        // const minutes = Math.floor(prevCountdown / 60);
        // const seconds = prevCountdown % 60;
        return prevCountdown - 1;
      });
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className='flex flex-col items-center gap-[24px] py-[32px] pb-[50px] text-white'>
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
        className=' bg-payment-black h-[40px] w-[250px] rounded-[12px] border-0 text-center text-[20px] font-bold tracking-[6px] text-white shadow-[1px_1px_4px_2px_rgb(37,228,106,0.45)] placeholder:mt-[-4px] placeholder:text-[14px] placeholder:font-medium placeholder:leading-[14px] placeholder:tracking-normal placeholder:text-white/25'
      />
      <button
        onClick={handleProceedClick}
        className={`bg-pass-green flex h-[40px] w-[200px] items-center justify-center rounded-[12px] font-semibold text-main-text ${
          isButtonDisabled ? 'cursor-not-allowed opacity-50' : ''
        }`}
        disabled={isButtonDisabled}
      >
        {lang === 'en' ? 'Proceed' : 'Үргэлжлүүлэх'}
      </button>
      <button className='text-pass-green font-medium leading-[16px]'>
        {lang === 'en' ? 'Back' : 'Буцах'}
      </button>
    </div>
  );
}
