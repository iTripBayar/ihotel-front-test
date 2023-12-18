import Image from 'next/image';
import { useAppCtx } from '@/contexts/app';
import { useState } from 'react';


export default function PaymentMethod() {
    const {appState, dispatch} = useAppCtx()

    const handleChange = (e: string)=>{
        dispatch({
          type: 'CHANGE_APP_STATE',
          payload: { paymentMethod: e },
        });
    }


  return (
    <div className='grid w-full grid-cols-1 items-center justify-start gap-[24px] text-[16px] text-main-text 2xs:grid-cols-2 md:grid-cols-3 lg:flex lg:flex-wrap'>
      {/* socialPay */}
      <div className='flex cursor-pointer items-center gap-[8px]'>
        <input
          type='radio'
          name='paymentMethod'
          id='socialPay'
          className='h-[14px] w-[14px] cursor-pointer border-black/[.35]'
          checked={appState.paymentMethod === 'socialPay'}
          onChange={() => handleChange('socialPay')}
        />
        <label
          htmlFor='socialPay'
          className='flex cursor-pointer items-center gap-[4px]'
        >
          <div className='relative h-[40px] w-[40px] overflow-hidden'>
            <Image
              src={'/SocialPay.png'}
              alt='/hotel'
              fill={true}
              loading='lazy'
              sizes='50vw'
              placeholder='blur'
              blurDataURL={'/SocialPay.png'}
              className='absolute h-auto w-auto select-none object-cover'
              draggable={false}
            />
          </div>
          <p>Social Pay</p>
        </label>
      </div>
      {/* qPay */}
      <div className='flex cursor-pointer items-center gap-[8px]'>
        <input
          type='radio'
          className='h-[14px] w-[14px] cursor-pointer border-black/[.35]'
          name='paymentMethod'
          id='qPay'
          checked={appState.paymentMethod === 'qPay'}
          onChange={() => handleChange('qPay')}
        />
        <label
          htmlFor='qPay'
          className='flex cursor-pointer items-center gap-[4px]'
        >
          <div className='relative h-[40px] w-[40px] overflow-hidden'>
            <Image
              src={'/QPay.png'}
              alt='/hotel'
              fill={true}
              loading='lazy'
              sizes='50vw'
              placeholder='blur'
              blurDataURL={'/QPay.png'}
              className='absolute h-auto w-auto select-none object-cover'
              draggable={false}
            />
          </div>
          <p>QPay</p>
        </label>
      </div>
      {/* pass */}
      <div className='flex cursor-pointer items-center gap-[8px]'>
        <input
          type='radio'
          className='h-[14px] w-[14px] cursor-pointer border-black/[.35]'
          name='paymentMethod'
          id='pass'
          checked={appState.paymentMethod === 'pass'}
          onChange={() => handleChange('pass')}
        />
        <label
          htmlFor='pass'
          className='flex cursor-pointer items-center gap-[4px]'
        >
          <div className='relative h-[32px] w-[90px] overflow-hidden'>
            <Image
              src={'/pass-logo.png'}
              alt='/hotel'
              fill={true}
              loading='lazy'
              sizes='50vw'
              placeholder='blur'
              blurDataURL={'/pass-logo.png'}
              className='absolute h-auto w-auto select-none object-cover'
              draggable={false}
            />
          </div>
          <p>Pass.mn</p>
        </label>
      </div>
      {/* card */}
      <div className='flex cursor-pointer items-center gap-[8px]'>
        <input
          type='radio'
          className='h-[14px] w-[14px] cursor-pointer border-black/[.35]'
          name='paymentMethod'
          id='card'
          checked={appState.paymentMethod === 'card'}
          onChange={() => handleChange('card')}
        />
        <label
          htmlFor='card'
          className='flex cursor-pointer items-center gap-[4px]'
        >
          <div className='relative h-[40px] w-[40px] overflow-hidden'>
            <Image
              src={'/golomt-logo.png'}
              alt='/hotel'
              fill={true}
              loading='lazy'
              sizes='50vw'
              placeholder='blur'
              blurDataURL={'/golomt-logo.png'}
              className='absolute h-auto w-auto select-none object-cover'
              draggable={false}
            />
          </div>
          <p>Card</p>
        </label>
      </div>
      {/* bank */}
      <div className='flex cursor-pointer items-center gap-[8px]'>
        <input
          type='radio'
          className='h-[14px] w-[14px] cursor-pointer border-black/[.35]'
          name='paymentMethod'
          id='bank'
          checked={appState.paymentMethod === 'bank'}
          onChange={() => handleChange('bank')}
        />
        <label
          htmlFor='bank'
          className='flex cursor-pointer items-center gap-[4px]'
        >
          <div className='relative h-[40px] w-[40px] overflow-hidden'>
            <Image
              src={'/khaan-logo.png'}
              alt='/hotel'
              fill={true}
              loading='lazy'
              sizes='50vw'
              placeholder='blur'
              blurDataURL={'/khaan-logo.png'}
              className='absolute h-auto w-auto select-none object-cover'
              draggable={false}
            />
          </div>
          <p>Bank</p>
        </label>
      </div>
    </div>
  );
}
