import Image from 'next/image';
import { useAppCtx } from '@/contexts/app';
import { Radio, RadioGroup, ChakraProvider } from '@chakra-ui/react';

export default function PaymentMethod() {
  const { appState, dispatch } = useAppCtx();

  const handleChange = (e: string) => {
    dispatch({
      type: 'CHANGE_APP_STATE',
      payload: { paymentMethod: e },
    });
  };
   return (
     <div>
       <ChakraProvider>
         <RadioGroup onChange={handleChange} value={appState.paymentMethod}>
           <div className='grid w-full grid-cols-1 items-center justify-start gap-[24px] text-[16px] text-main-text 2xs:grid-cols-2 md:grid-cols-3 lg:flex lg:flex-wrap'>
             <Radio
               value='SocialPay'
             >
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
                     className='absolute object-cover w-auto h-auto select-none'
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
                     className='absolute object-cover w-auto h-auto select-none'
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
                     className='absolute object-cover w-auto h-auto select-none'
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
                     className='absolute object-cover w-auto h-auto select-none'
                     draggable={false}
                   />
                 </div>
                 <p>Card</p>
               </div>
             </Radio>
             <Radio value='bank'>
               <div className='flex cursor-pointer items-center gap-[4px]'>
                 <div className='relative h-[40px] w-[40px] overflow-hidden'>
                   <Image
                     src={'/khaan-logo.png'}
                     alt='/hotel'
                     fill={true}
                     loading='lazy'
                     sizes='50vw'
                     placeholder='blur'
                     blurDataURL={'/khaan-logo.png'}
                     className='absolute object-cover w-auto h-auto select-none'
                     draggable={false}
                   />
                 </div>
                 <p>Bank</p>
               </div>
             </Radio>
           </div>
         </RadioGroup>
       </ChakraProvider>
     </div>
   );
}
