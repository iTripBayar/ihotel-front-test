import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, ChangeEvent } from 'react';
import {
  ChakraProvider,
  CircularProgress,
  CircularProgressLabel,
} from '@chakra-ui/react';
import Image from 'next/image';

export default function CardOption() {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');

  const router = useRouter();
  const [countdown, setCountdown] = useState(600); // 10 minutes in seconds
  const [progressValue, setProgressValue] = useState(100);
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvvCode, setCvvCode] = useState('');

const handleCardNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
  const inputNumber = event.target.value.replace(/\D/g, '').slice(0, 16);
  const formattedNumber = inputNumber.replace(/(\d{4})(?=\d)/g, '$1 ');

  setCardNumber(formattedNumber);
};

 const handleCardHolderChange = (event: ChangeEvent<HTMLInputElement>) => {
   const inputName = event.target.value.replace(/[^A-Za-z.]/g, '');
   setCardHolder(inputName.toUpperCase());
 };

 const handleExpiryMonthChange = (event: ChangeEvent<HTMLInputElement>) => {
   const inputMonth = event.target.value.replace(/\D/g, '').slice(0, 2);
   setExpiryMonth(inputMonth.padStart(2, '0'));
 };

 const handleExpiryYearChange = (event: ChangeEvent<HTMLInputElement>) => {
   const inputYear = event.target.value.replace(/\D/g, '').slice(0, 2);
   setExpiryYear(inputYear);
 };

 const handleCvvCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
   const inputCvv = event.target.value.replace(/\D/g, '').slice(0, 3);
   setCvvCode(inputCvv);
 };

 const isFormValid = () => {
   return (
     cardNumber !== '' &&
     cardHolder !== '' &&
     expiryMonth !== '' &&
     expiryYear !== '' &&
     cvvCode !== ''
   );
 };

 const handleSubmit = (event: React.FormEvent) => {
   event.preventDefault();
   console.log('Form submitted:', {
     cardNumber,
     cardHolder,
     expiryMonth,
     expiryYear,
     cvvCode,
   });
 };

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 0) {
          router.back();
          clearInterval(interval);
          return 0;
        }

        const newProgressValue = (prevCountdown / 600) * 100;
        setProgressValue(newProgressValue);
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className='flex flex-col items-center gap-[24px] py-[32px] pb-[50px] text-main-text'>
      <div className='flex flex-col items-center justify-center gap-[4px]'>
        <h3 className='text-[16px] font-bold uppercase'>Card payment</h3>
        <p className='text-[12px] font-bold leading-[12px] opacity-75'>{`RN-11282#84`}</p>
      </div>
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
      <div className='flex min-w-[300px] flex-col items-center justify-start gap-[20px] rounded-[8px] border border-white/50 px-[16px] py-[16px] shadow-[0px_0px_12px_2px_rgb(255,255,255,0.1)] 2xs:min-w-[340px] 2xs:px-[24px] sm:min-w-[400px] md:min-w-[450px]'>
        {/* bank info */}
        <form
          className='flex w-full flex-col items-center justify-start gap-[20px] text-[16px] leading-[16px]'
          onSubmit={handleSubmit}
        >
          {/* card number */}
          <div className='flex w-full flex-col gap-[8px]'>
            <label htmlFor='cardNumber' className='font-semibold'>
              Card number
            </label>
            <input
              type='text'
              pattern='\d*'
              inputMode='numeric'
              name='cardNumber'
              value={cardNumber}
              onChange={handleCardNumberChange}
              className='h-[36px] w-full min-w-[300px] rounded-[8px] border border-payment-black bg-payment-black/[.1] text-[18px] font-semibold'
            />
          </div>
          {/* card holder name */}
          <div className='flex w-full flex-col gap-[8px]'>
            <label htmlFor='cardHolder' className='font-semibold'>
              Cardholder name
            </label>
            <input
              type='text'
              pattern='[A-Za-z.]*'
              name='cardHolder'
              value={cardHolder}
              onChange={handleCardHolderChange}
              className='h-[36px] w-full rounded-[8px] border border-payment-black bg-payment-black/[.1] text-[18px] font-semibold'
            />
          </div>
          {/* expiration date & CVV code */}
          <div className='flex w-full items-center justify-between'>
            {/* Expiry Month Dropdown */}
            <div className='flex flex-col gap-[8px]'>
              <label htmlFor='' className='font-semibold'>
                Expiry date
              </label>
              <div className='flex gap-[8px]'>
                <input
                  type='text'
                  pattern='\d*'
                  inputMode='numeric'
                  name='MM'
                  placeholder='MM'
                  value={expiryMonth}
                  onChange={handleExpiryMonthChange}
                  className='h-[36px] w-[75px] rounded-[8px] border border-payment-black bg-payment-black/[.1] text-center text-[18px] font-semibold'
                />
                <input
                  type='text'
                  pattern='\d*'
                  inputMode='numeric'
                  name='YY'
                  placeholder='YY'
                  value={expiryYear}
                  onChange={handleExpiryYearChange}
                  className='h-[36px] w-[75px] rounded-[8px] border border-payment-black bg-payment-black/[.1] text-center text-[18px] font-semibold'
                />
              </div>
            </div>
            {/* CVV */}
            <div className='flex w-fit flex-col gap-[8px]'>
              <label htmlFor='CVV' className='font-semibold '>
                CVV code
              </label>
              <input
                type='text'
                pattern='\d*'
                inputMode='numeric'
                name='CVV'
                placeholder='CVV'
                value={cvvCode}
                onChange={handleCvvCodeChange}
                className='h-[36px] w-[100px] rounded-[8px] border border-payment-black bg-payment-black/[.1] text-[18px] font-semibold'
              />
            </div>
          </div>
          <button
            type='submit'
            className={`rounded-md  px-[16px] py-[12px] font-semibold uppercase text-white transition duration-300 hover:bg-blue-600 ${
              isFormValid() ? 'bg-blue-500' : 'cursor-not-allowed bg-blue-200'
            }`}
            disabled={!isFormValid()}
          >
            {lang === 'en' ? 'Proceed payment' : 'Төлөх'}
          </button>
        </form>
        <div className='flex w-full justify-between gap-[16px]'>
          {/* tcard */}
          <div className='relative h-[45px] w-[33px]'>
            <Image
              src='/tcard.png'
              alt='/tcard'
              fill={true}
              sizes='50vw'
              quality={100}
              className='absolute h-auto w-auto select-none object-cover'
              draggable={false}
            />
          </div>
          {/* footer_visa */}
          <div className='relative h-[45px] w-[102px]'>
            <Image
              src='/footer_visa.png'
              alt='/footer_visa'
              fill={true}
              sizes='50vw'
              quality={100}
              className='absolute h-auto w-auto select-none object-cover'
              draggable={false}
            />
          </div>
          {/* footer_master */}
          <div className='relative h-[45px] w-[126px]'>
            <Image
              src='/footer_master.png'
              alt='/footer_master'
              fill={true}
              sizes='50vw'
              quality={100}
              className='absolute h-auto w-auto select-none object-cover'
              draggable={false}
            />
          </div>
          {/* footer_amex */}
          <div className='relative h-[45px] w-[109px]'>
            <Image
              src='/footer_amex.png'
              alt='/footer_amex'
              fill={true}
              sizes='50vw'
              quality={100}
              className='absolute h-auto w-auto select-none object-cover'
              draggable={false}
            />
          </div>
        </div>
        <div className='flex w-full justify-end text-[12px] font-semibold leading-[2px]'>
          Powered by Golomt Bank
        </div>
      </div>
      <button
        className='my-[12px] font-medium leading-[16px] text-primary-blue'
        onClick={() => router.back()}
      >
        {lang === 'en' ? 'Back' : 'Буцах'}
      </button>
      <div className='flex w-full flex-col items-center justify-center gap-[12px]'>
        <p className='flex gap-[8px] font-medium'>
          {lang === 'en'
            ? `How to get Golomt bank's E-code?`
            : 'Голомт банкны и-код хэрхэн авах вэ?'}
          <span className='text-[#FF659B]'>
            {lang === 'en' ? 'See guide' : 'Заавар харах'}
          </span>
        </p>
        <p className='flex gap-[8px] font-medium'>
          {lang === 'en'
            ? `How to get Other bank's E-code?`
            : 'Бусад банкны и-код хэрхэн авах вэ?'}
          <span className='text-[#FF659B]'>
            {lang === 'en' ? 'See guide' : 'Заавар харах'}
          </span>
        </p>
      </div>
    </div>
  );
}
