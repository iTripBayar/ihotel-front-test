import { useRef } from 'react';

interface Props {
  ver: string;
  handleScrollToTopVer: () => void;
}

export default function ScrollTopBtn({ ver, handleScrollToTopVer }: Props) {
  const btnRef = useRef<HTMLDivElement>(null);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <div
      className={`relative flex h-[40px] w-[40px] items-center justify-center rounded-full border-2 border-white bg-primary-blue ${
        ver === 'search' ? 'lg:hidden' : ''
      }`}
      onClick={ver === 'search' ? handleScrollToTopVer : handleScrollToTop}
      ref={btnRef}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={2.75}
        stroke='currentColor'
        className='mb-[1px] h-[28px] w-[28px] '
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M4.5 15.75l7.5-7.5 7.5 7.5'
        />
      </svg>
    </div>
  );
}
