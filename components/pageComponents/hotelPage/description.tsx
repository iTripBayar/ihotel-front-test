import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

interface Props {
  introduction: string;
  introductionEn: string;
}

const Description = ({ introduction, introductionEn }: Props) => {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');
  const [open, setOpen] = useState(false);
  return (
    <div className='flex w-full flex-col border-t-[1px] border-t-black/[.15] pt-[24px] text-justify text-[14px] leading-[24px] text-sub-text/75 lg:pt-[32px]'>
      <div className='flex flex-col lg:gap-[16px]'>
        <p
          className={`${open === false ? 'line-clamp-3' : ''}`}
          dangerouslySetInnerHTML={{
            __html: lang === 'en' ? introductionEn : introduction,
          }}
        ></p>
        <div
          className='flex items-center gap-[8px] text-[14px] font-medium leading-[15px] text-primary-blue '
          onClick={() => setOpen(!open)}
        >
          <p>
            {open === false
              ? `${lang === 'en' ? 'More' : 'Дэлгэрэнгүй'}`
              : `${lang === 'en' ? 'Less' : 'Хураангуй'}`}
          </p>
          <svg
            viewBox='0 0 15 9'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className={`max-h-[14px] min-h-[14px] min-w-[14px] max-w-[14px] ${
              open === true && 'rotate-180'
            }`}
          >
            <path d='M1 1L7.5 8L1 1ZM7.5 8L14 1L7.5 8Z' fill='#3C76FE' />
            <path
              d='M1 1L7.5 8L14 1'
              stroke='#3C76FE'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Description;
