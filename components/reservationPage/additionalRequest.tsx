import { Collapse, Button, useDisclosure } from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function AdditionalRequest() {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');
  const { isOpen, onToggle } = useDisclosure();
  const [value, setValue] = useState('');

  return (
    <div className='flex h-auto w-full flex-col rounded-[20px] px-[20px]  shadow-[0px_0px_12px_2px_rgb(0,0,0,0.15)] lg:px-0 lg:shadow-none'>
      {/* title */}
      <div className='hidden lg:flex lg:flex-col lg:gap-[24px]'>
        <p className='text-[18px] font-medium leading-[18px] text-sub-text'>
          {lang === 'en' ? 'Add a request' : 'Хүсэлт нэмэх'}
        </p>
        <textarea
          rows={5}
          cols={50}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          placeholder={
            lang === 'en'
              ? 'Write your order request here'
              : 'Захиалгын хүсэлтээ энд бичнэ үү'
          }
          className='h-[150px] rounded-[20px] border-black/[.15] text-main-text placeholder:text-[16px]  placeholder:text-main-text/50 focus:outline-none focus:ring-0 xl:h-[175px] '
        ></textarea>
      </div>
      <div className='flex flex-col lg:hidden'>
        <Button
          onClick={onToggle}
          className='!m-0 flex h-[41px] w-full items-center !justify-between sm:h-[46px]'
        >
          <p className='text-[18px] font-medium leading-[18px] text-sub-text'>
            {lang === 'en' ? 'Add a request' : 'Хүсэлт нэмэх'}
          </p>
          <div className='relative h-[20px] w-[20px] rounded-full bg-primary-blue/25'>
            <div
              className={`absolute left-[50%] top-[50%] h-[3px] w-[14px] translate-x-[-50%] translate-y-[-50%] rounded-full bg-primary-blue ${
                isOpen === true
                  ? 'rotate-[180deg] duration-500'
                  : 'rotate-0 duration-500'
              }`}
            ></div>
            <div
              className={`absolute left-[50%] top-[50%] h-[14px] w-[3px] translate-x-[-50%] translate-y-[-50%] rounded-full bg-primary-blue ${
                isOpen === true
                  ? 'rotate-[270deg] duration-500'
                  : 'rotate-0 duration-500'
              }`}
            ></div>
          </div>
        </Button>
        {/* info */}
        <Collapse
          in={isOpen}
          animateOpacity
          transition={{
            enter: {
              duration: 0.25,
            },
          }}
          className={`!flex w-full !flex-col !gap-[16px] sm:!gap-[20px]  ${
            isOpen === true ? 'h-auto pb-[16px] sm:pb-[20px]' : 'hidden'
          }`}
        >
          <textarea
            rows={5}
            cols={50}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            placeholder={
              lang === 'en'
                ? 'Write your order request here'
                : 'Захиалгын хүсэлтээ энд бичнэ үү'
            }
            className='h-[150px] rounded-[8px] border-black/[.15] text-main-text  placeholder:text-[12px] placeholder:text-main-text/50 focus:outline-none focus:ring-0 2xs:placeholder:text-[14px]'
          ></textarea>
        </Collapse>
      </div>
    </div>
  );
}
