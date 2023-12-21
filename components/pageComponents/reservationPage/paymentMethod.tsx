import Image from 'next/image';
import { useAppCtx } from '@/contexts/app';
import { Radio, RadioGroup, ChakraProvider } from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation';

export default function PaymentMethod() {
  const { appState, dispatch } = useAppCtx();
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');

  const handleChange = (e: string) => {
    dispatch({
      type: 'CHANGE_APP_STATE',
      payload: { paymentMethod: e },
    });
  };
  return (
    <div className='flex flex-col items-center gap-[16px] text-main-text'>
      <p className='text-[16px] font-medium sm:text-[20px] lg:text-[24px]'>
        {lang === 'en' ? 'Payment options' : 'Төлбөрийн сонголтууд'}
      </p>
      <ChakraProvider>
        <RadioGroup onChange={handleChange} value={appState.paymentMethod}>
          <div className='grid w-full grid-cols-1 items-center justify-start gap-[16px] text-[16px] text-main-text sm:grid-cols-2 sm:gap-[24px] lg:flex lg:flex-wrap lg:gap-[32px]'>
            <Radio value='SocialPay'>
              <div
                className='flex cursor-pointer items-center gap-[4px]'
                // onClick={() => document.getElementById('socialPay')?.click()}
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
              </div>
            </Radio>
            <Radio value='qPay'>
              <div className='flex cursor-pointer items-center gap-[4px]'>
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
              </div>
            </Radio>
            <Radio value='pass'>
              <div className='flex cursor-pointer items-center gap-[4px]'>
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
              </div>
            </Radio>
            <Radio value='card'>
              <div className='flex cursor-pointer items-center gap-[4px]'>
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
              </div>
            </Radio>
          </div>
        </RadioGroup>
      </ChakraProvider>
    </div>
  );
}
