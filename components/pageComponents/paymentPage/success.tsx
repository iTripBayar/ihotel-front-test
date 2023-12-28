export default function Success() {
  return (
    <div className='flex w-full items-center justify-center text-main-online'>
      <div className='flex items-center justify-center rounded-full border-[6px] border-main-online p-[16px]'>
        <svg
          viewBox='0 0 24 24'
          fill='none'
          className='max-h-[100px] min-h-[100px] min-w-[100px] max-w-[100px]'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M5 12L10 17L20 7'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </div>
    </div>
  );
}
