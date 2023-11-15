import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
interface Props {
  ver: string;
  data: any[];
}

const Review = ({ ver, data }: Props) => {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');
  const [open, setOpen] = useState(false);
  let sample =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur magni corporis, at earum officiis possimus fugiat cupiditate iure provident illo!';
  if (ver !== 'full')
    return (
      <div className="flex w-full flex-col gap-[16px] border-t-[1px] border-t-black/[.15] pt-[24px] text-[16px] ">
        <p className="font-medium">
          {lang === 'en' ? 'Reviews' : 'Үйлчлүүлэгчдийн сэтгэгдэл'}
        </p>
        {/* card */}
        <div className="relative z-10 flex flex-col gap-[8px] rounded-[10px] p-[12px] text-[14px] shadow-[0px_4px_12px_4px_rgb(0,0,0,0.25)]">
          {/* review number */}
          <div className="absolute right-[10px] top-[10px] z-10 flex h-[30px] w-[40px] items-center justify-center rounded-[6px] bg-primary-blue font-medium text-white ">
            {'9.6'}
          </div>
          {/* <div className="absolute right-0 top-[16px] z-0 h-[30px] w-[40px] translate-x-[40%] translate-y-[50%] rotate-[-45deg] bg-[#1C49BF]"></div> */}

          {/* user info */}
          <div className="flex items-center gap-[8px]">
            <div className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-primary-blue/[.45] text-primary-blue">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="max-h-[18px] min-h-[18px] min-w-[18px] max-w-[18px]"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="font-medium">{'Anonymous'}</p>
            <div className="relative h-[10px] w-[20px] overflow-hidden">
              {' '}
              <Image
                src="/images/mongolian-flag.png"
                alt="/lang"
                width={28}
                height={28}
                priority
                quality={100}
                sizes="20vw"
                className="absolute left-0 top-0 translate-y-[-30%] scale-[110%] cursor-pointer object-fill"
              />
            </div>
          </div>
          {/* title */}
          <p className="text-[15px] font-medium">
            {'Great place to stay. Thank you so much'}
          </p>
          {/* review */}
          <p className="text-justify text-sub-text/50">
            {sample.slice(0, open === false ? 67 : sample.length)}
            <span
              className="font-medium text-primary-blue"
              onClick={() => setOpen(!open)}
            >
              {' '}
              {lang === 'en'
                ? `${open === false ? '...Read More' : 'Less'}`
                : `${open === false ? '...Цааш унших' : 'Хураангуй'}`}
            </span>
          </p>
          {/* date */}
          <div className="flex w-full items-center border-t-[1px] border-t-black/[.15] pt-[8px]">{`2023-09-02`}</div>
        </div>
        <div className="self-center rounded-full bg-primary-blue px-[16px] py-[12px] font-medium text-white">
          {lang === 'en' ? 'More' : 'Цааш үзэх'}
        </div>
      </div>
    );
  return <div></div>;
};

export default Review;
