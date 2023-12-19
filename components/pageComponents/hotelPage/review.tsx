import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import useWindowSize from '@/hooks/windowSize';
interface Props {
  ver: string;
  data: any[];
  handleScrollTo: (ver: string) => void;
}

const Review = ({ ver, data, handleScrollTo }: Props) => {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');
  const size = useWindowSize();

  const sample = [
    {
      key: 0,
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur magni corporis, at earum officiis possimus fugiat cupiditate iure provident illo!',
    },
    {
      key: 1,
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur magni corporis, at earum officiis possimus fugiat cupiditate iure provident illo!',
    },
    {
      key: 3,
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur magni corporis, at earum officiis possimus fugiat cupiditate iure provident illo!',
    },
    {
      key: 4,
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur magni corporis, at earum officiis possimus fugiat cupiditate iure provident illo!',
    },
  ];

  const sampleGraphs = [
    {
      key: 10,
      title: 'Буудлын ажилчид',
      titleEn: 'Hotel staff',
      rate: 10,
    },
    {
      key: 11,
      title: 'Өрөөний цэвэр ахуй',
      titleEn: 'Room cleanliness',
      rate: 9,
    },
    { key: 12, title: 'Тав тух', titleEn: 'Comfort', rate: 8 },
    { key: 13, title: 'Байршил', titleEn: 'Location', rate: 7 },
    { key: 14, title: 'Үнэ', titleEn: 'Price', rate: 5 },
    { key: 15, title: 'Эд хэрэгсэл', titleEn: 'Furniture', rate: 3.5 },
  ];

  return (
    <div className='flex w-full flex-col gap-[24px] border-t-[1px] border-t-black/[.1] pt-[24px] text-[16px] lg:border-none lg:pt-0 '>
      <p className='text-[20px] font-medium leading-[20px]'>
        {lang === 'en' ? 'Reviews' : 'Үйлчлүүлэгчдийн сэтгэгдэл'}
      </p>
      {/* graphs */}
      {ver === 'full' ? (
        <div className='grid w-full grid-cols-1 gap-[16px] pb-[10px] md:grid-cols-2 lg:grid-cols-3 lg:gap-[16px]'>
          {sampleGraphs.map((index, i) => (
            <div
              key={i}
              className='flex flex-col gap-[4px] text-[14px] font-medium leading-[16px] text-main-text lg:gap-[16px] lg:text-[16px] lg:leading-[20px]'
            >
              <p>{lang === 'en' ? index.titleEn : index.title}</p>
              <div className='flex h-[16px] w-full rounded-full bg-black/[.15] text-[12px] leading-[12px]'>
                <div
                  style={{ width: `${index.rate * 10}%` }}
                  className={`flex h-full items-center justify-end rounded-full bg-primary-blue px-[12px] tracking-wider text-white`}
                >
                  {index.rate * 10}%
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}
      {/* card */}
      <div
        className={`grid grid-cols-1 gap-[20px] md:grid-cols-2 ${
          ver === 'full' ? 'lg:grid-cols-2' : 'lg:grid-cols-1'
        }`}
      >
        {ver !== 'full' &&
          sample
            .slice(
              0,
              size.width && size.width >= 768 && size.width < 1024 ? 2 : 1,
            )
            .map((index, i) => (
              <div
                key={i}
                className='relative z-10 flex flex-col gap-[8px] justify-between rounded-[10px] p-[12px] text-[14px] shadow-[0px_4px_12px_4px_rgb(0,0,0,0.15)] 2xs:gap-[12px] sm:min-h-[200px] sm:px-[16px] '
              >
                {/* review number */}
                <div className='absolute right-[12px] top-[10px] z-10 flex h-[30px] w-[40px] items-center justify-center rounded-[6px] bg-primary-blue font-medium text-white 2xs:w-[50px] sm:right-[16px]  '>
                  {'9.6'}
                </div>
                {/* user info */}
                <div className='flex items-center gap-[8px]'>
                  <div className='flex h-[28px] w-[28px] items-center justify-center rounded-full bg-primary-blue/[.45] text-primary-blue'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                      className='max-h-[18px] min-h-[18px] min-w-[18px] max-w-[18px]'
                    >
                      <path
                        fillRule='evenodd'
                        d='M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </div>
                  <p className='font-medium'>{'Anonymous'}</p>
                  <div className='relative h-[10px] w-[20px] overflow-hidden'>
                    {' '}
                    <Image
                      src='/images/mongolian-flag.png'
                      alt='/lang'
                      width={28}
                      height={28}
                      sizes='20vw'
                      className='absolute left-0 top-0 translate-y-[-30%] scale-[110%] cursor-pointer object-fill'
                    />
                  </div>
                </div>
                {/* title */}
                <p className='text-[15px] font-medium'>
                  {'Great place to stay. Thank you so much'}
                </p>
                {/* review */}
                <p
                  className={` relative line-clamp-3 text-justify text-sub-text/50`}
                >
                  {/* {sample.slice(0, open === false ? 67 : sample.length)} */}
                  {index.desc}
                </p>

                {/* date */}
                <div className='flex w-full items-center border-t-[1px] border-t-black/[.15] pt-[8px]'>{`2023-09-02`}</div>
              </div>
            ))}
        {ver === 'full' &&
          sample.map((index, i) => (
            <div
              key={i}
              className='relative z-10 flex flex-col gap-[8px] rounded-[10px] p-[12px] text-[14px] shadow-[0px_4px_12px_4px_rgb(0,0,0,0.15)] 2xs:gap-[12px] sm:px-[16px] '
            >
              {/* review number */}
              <div className='absolute right-[12px] top-[10px] z-10 flex h-[30px] w-[40px] items-center justify-center rounded-[6px] bg-primary-blue font-medium text-white 2xs:w-[50px] sm:right-[16px]  '>
                {'9.6'}
              </div>
              {/* user info */}
              <div className='flex items-center gap-[8px]'>
                <div className='flex h-[28px] w-[28px] items-center justify-center rounded-full bg-primary-blue/[.45] text-primary-blue'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className='max-h-[18px] min-h-[18px] min-w-[18px] max-w-[18px]'
                  >
                    <path
                      fillRule='evenodd'
                      d='M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
                <p className='font-medium'>{'Anonymous'}</p>
                <div className='relative h-[10px] w-[20px] overflow-hidden'>
                  {' '}
                  <Image
                    src='/images/mongolian-flag.png'
                    alt='/lang'
                    width={28}
                    height={28}
                    sizes='20vw'
                    className='absolute left-0 top-0 translate-y-[-30%] scale-[110%] cursor-pointer object-fill'
                  />
                </div>
              </div>
              {/* title */}
              <p className='text-[15px] font-medium'>
                {'Great place to stay. Thank you so much'}
              </p>
              {/* review */}
              <p
                className={` relative line-clamp-3 text-justify text-sub-text/50`}
              >
                {index.desc}
              </p>

              {/* date */}
              <div className='flex w-full items-center border-t-[1px] border-t-black/[.15] pt-[8px]'>{`2023-09-02`}</div>
            </div>
          ))}
      </div>
      <button
        className='self-center rounded-full bg-primary-blue px-[16px] py-[8px] font-medium text-white'
        onClick={() => {
          if (ver !== 'full') {
            handleScrollTo('reviews');
          }
        }}
      >
        {lang === 'en' ? 'More' : 'Цааш үзэх'}{' '}
        {ver === 'full' ? `(${sample.length}+)` : null}
      </button>
    </div>
  );
};

export default Review;
