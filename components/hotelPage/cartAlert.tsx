import { useSearchParams } from 'next/navigation';

interface Props {
  close: () => void;
}

export default function CartAlert({ close }: Props) {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');
  return (
    <div
      className='fixed left-[50%] top-[72px] z-[800] flex min-w-[280px] translate-x-[-50%] animate-fade500 items-center justify-center gap-[8px] rounded-[8px] bg-[#feebc8] px-[20px] py-[12px] text-[14px] leading-[14px] text-[#C05621] '
      onClick={close}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth='2'
        stroke='currentColor'
        className='max-h-[30px] min-h-[30px] min-w-[30px] max-w-[30px]'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z'
        />
      </svg>
      <p className='text-main-text'>
        {lang === 'en' ? 'Please select a room.' : 'Захиалах өрөө сонгоно уу.'}
      </p>
    </div>
  );
}
