import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAppCtx } from '@/contexts/app';

interface Props {
  ver: string;
}
export default function MapBtn({ ver }: Props) {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');
  const { dispatch } = useAppCtx();
  const [delay, setDelay] = useState(false);
  setTimeout(() => {
    setDelay(true);
  }, 1500);

  if (ver === 'default')
    return (
      <div
        className={`relative flex h-[40px] animate-fade items-center  justify-center gap-[10px] self-end rounded-full border-2 border-white bg-primary-blue px-[8px] text-white duration-700 lg:hidden lg:h-[45px] ${
          delay == true ? 'w-[40px] lg:w-[45px] ' : 'w-[171px]'
        }`}
        onClick={() => {
          dispatch({
            type: 'CHANGE_APP_STATE',
            payload: { map: 'open' },
          });
        }}
      >
        <svg
          viewBox='0 0 24 22'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='max-h-[22px] min-h-[20px] min-w-[22px] max-w-[22px]'
        >
          <path
            d='M15 14H19L22 21H2L5 14H9M13 7C13 7.26522 12.8946 7.51957 12.7071 7.70711C12.5196 7.89464 12.2652 8 12 8C11.7348 8 11.4804 7.89464 11.2929 7.70711C11.1054 7.51957 11 7.26522 11 7C11 6.73478 11.1054 6.48043 11.2929 6.29289C11.4804 6.10536 11.7348 6 12 6C12.2652 6 12.5196 6.10536 12.7071 6.29289C12.8946 6.48043 13 6.73478 13 7ZM6 7C6 12 12 17 12 17C12 17 18 12 18 7C18 3.583 15.314 1 12 1C8.686 1 6 3.583 6 7Z'
            stroke='white'
            strokeWidth='2'
          />
        </svg>
        {delay == false ? (
          <p>{lang === 'en' ? 'Map' : 'Газрын зураг'}</p>
        ) : null}
        {delay == true ? (
          <div
            className={`absolute left-[70%] top-0 flex w-[90px] animate-fade items-center justify-center rounded-full bg-primary-blue text-[11px] font-medium  ${
              lang === 'en' ? 'max-w-[45px] duration-500' : ''
            }`}
          >
            {lang === 'en' ? 'Map' : 'Газрын зураг'}
          </div>
        ) : null}
      </div>
    );
  return (
    <div
      className='hidden h-[40px] min-w-[40px] items-center justify-center gap-[4px] rounded-full border-2 border-white bg-primary-blue px-[12px] lg:flex'
      onClick={() => {
        dispatch({
          type: 'CHANGE_APP_STATE',
          payload: { map: 'open' },
        });
      }}
    >
      {/* arrow */}
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={2.5}
        stroke='currentColor'
        className='h-[16px] w-[16px]'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18'
        />
      </svg>
      <svg
        viewBox='0 0 24 22'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='max-h-[22px] min-h-[20px] min-w-[22px] max-w-[22px]'
      >
        <path
          d='M15 14H19L22 21H2L5 14H9M13 7C13 7.26522 12.8946 7.51957 12.7071 7.70711C12.5196 7.89464 12.2652 8 12 8C11.7348 8 11.4804 7.89464 11.2929 7.70711C11.1054 7.51957 11 7.26522 11 7C11 6.73478 11.1054 6.48043 11.2929 6.29289C11.4804 6.10536 11.7348 6 12 6C12.2652 6 12.5196 6.10536 12.7071 6.29289C12.8946 6.48043 13 6.73478 13 7ZM6 7C6 12 12 17 12 17C12 17 18 12 18 7C18 3.583 15.314 1 12 1C8.686 1 6 3.583 6 7Z'
          stroke='white'
          strokeWidth='2'
        />
      </svg>
    </div>
  );
}
