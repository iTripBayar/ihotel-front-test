import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useAppCtx } from '@/contexts/app';
import Link from 'next/link';

interface Props {
  stat: string;
}

export default function BottomDialog({ stat }: Props) {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');
  const [isChecked, setIsChecked] = useState(false);
  const { appState } = useAppCtx();

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const buttonDisabled = !isChecked;
  return (
    <div className='fixed bottom-0 left-0 z-[200] flex w-full flex-col items-center gap-[20px] rounded-t-[20px] bg-white px-[32px] py-[16px] shadow-[0px_0px_12px_2px_rgb(0,0,0,0.15)] sm:left-[50%] sm:w-[calc(100%-100px)] sm:translate-x-[-50%] md:w-[calc(100%-144px)] lg:hidden'>
      <div className='flex w-full items-center justify-center gap-[8px] text-[12px] text-sub-text/75 2xs:text-[14px] sm:text-[16px]'>
        <input
          type='checkBox'
          name='termCheck'
          className='border-black/[.25] focus:ring-0'
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <label htmlFor='termCheck'>
          {lang === 'en' ? (
            <>
              Accept <span className='underline '>Terms and Conditions</span>
            </>
          ) : (
            <>
              <span className='underline '>Үйлчилгээний нөхцөл</span> зөвшөөрөх
            </>
          )}
        </label>
      </div>
      {!buttonDisabled && appState.paymentMethod !== '' ? (
        <Link
          href={{
            query: { method: appState.paymentMethod },
            pathname: '/payment',
          }}
          className={`flex w-full max-w-[375px] items-center justify-center rounded-full bg-main-online py-[8px] font-medium text-white sm:text-[18px]  ${
            buttonDisabled ? 'cursor-not-allowed opacity-50' : ''
          }`}
        >
          {lang === 'en' ? 'Proceed to payment' : 'Төлбөр төлөх'}
        </Link>
      ) : (
        <button
          className={`flex w-full max-w-[375px] cursor-not-allowed items-center justify-center rounded-full bg-main-online py-[8px] font-medium text-white opacity-50 sm:text-[18px]`}
          disabled={true}
        >
          {lang === 'en' ? 'Proceed to payment' : 'Төлбөр төлөх'}
        </button>
      )}
      {/* <button
        className={`flex w-full max-w-[375px] items-center justify-center rounded-full bg-main-online py-[8px] font-medium text-white sm:text-[18px] ${
          buttonDisabled ? 'cursor-not-allowed opacity-50' : ''
        }`}
        disabled={buttonDisabled}
      >
        {stat === 'pending'
          ? lang === 'en'
            ? 'Send order request'
            : 'Захиалах хүсэлт илгээх'
          : null}
        {stat === 'online' ? (lang === 'en' ? 'Order' : 'Захиалах') : null}
      </button> */}
    </div>
  );
}
