import { Collapse, useDisclosure, Button } from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import useWindowSize from '@/hooks/windowSize';

export default function InfoCollapse() {
  const { isOpen, onToggle } = useDisclosure();
  const searchParams = useSearchParams();
  const size = useWindowSize();
  const lang = searchParams.get('lang');
  return (
    <div
      className={`mb-[32px] flex w-full flex-col gap-[24px] overflow-hidden border-b-[1px] border-white/25 md:w-[94%] md:border-none `}
    >
      <Button
        onClick={size.width && size.width >= 768 ? () => {} : onToggle}
        className='flex w-full !items-center !justify-between'
      >
        <h3 className='text-[18px]'>
          {/* {state.language === 'mn' ? 'Тухай' : 'About'} */}
          {lang === 'en' ? 'News' : 'Мэдээлэл'}
        </h3>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='2 0 20 20'
          strokeWidth={3}
          stroke='currentColor'
          className={`h-[16px] w-[16px] md:hidden ${
            isOpen === true ? 'rotate-180' : null
          }`}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M19.5 8.25l-7.5 7.5-7.5-7.5'
          />
        </svg>
      </Button>
      <Collapse
        in={size.width && size.width > 768 ? true : isOpen}
        animateOpacity
        transition={{
          enter: { duration: size.width && size.width > 768 ? 0 : undefined },
        }}
        className={`!flex !flex-col justify-start gap-[16px] ${
          (size.width && size.width >= 768) || isOpen === true
            ? ' !pb-[16px]'
            : 'h-0'
        }`}
      >
        <Link href='/' className='underline-0 group relative text-white'>
          {lang === 'en' ? 'Articles' : 'Мэдээ мэдээлэл'}
          <span className='ease absolute bottom-0 left-0 h-0 w-0 border-b-2 border-white/50 transition-all duration-200 group-hover:w-1/2'></span>
        </Link>

        <Link href='/' className='underline-0 group relative text-white'>
          {lang === 'en' ? 'Tips for hotels' : 'Буудалд зориулсан зөвлөмж'}
          <span className='ease absolute bottom-0 left-0 h-0 w-0 border-b-2 border-white/50 transition-all duration-200 group-hover:w-1/2'></span>
        </Link>

        <Link href='/' className='underline-0 group relative text-white'>
          {lang === 'en' ? 'Tips for travelers' : 'Аялагчдад зориулсан зөвлөмж'}
          <span className='ease absolute bottom-0 left-0 h-0 w-0 border-b-2 border-white/50 transition-all duration-200 group-hover:w-1/2'></span>
        </Link>

        <Link href='/' className='underline-0 group relative text-white'>
          {lang === 'en' ? "iHotel's success history" : 'iHotel амжилтын түүх'}
          <span className='ease absolute bottom-0 left-0 h-0 w-0 border-b-2 border-white/50 transition-all duration-200 group-hover:w-1/2'></span>
        </Link>
      </Collapse>
    </div>
  );
}
