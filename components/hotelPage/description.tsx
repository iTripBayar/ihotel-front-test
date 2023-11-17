import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

interface Props {
  introduction: string | null | undefined;
  introductionEn: string | null | undefined;
}

const Description = ({ introduction, introductionEn }: Props) => {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');
  const [open, setOpen] = useState(false);
  const sample =
    ' Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis animi numquam blanditiis nihil aspernatur autem distinctio vero quia tempora nesciunt, consequuntur natus, voluptatum iste quibusdam architecto possimus vitae iusto cum expedita doloremque saepe, praesentium dolores modi? Reprehenderit nobis soluta fuga. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis animi numquam blanditiis nihil aspernatur autem distinctio vero quia tempora nesciunt, consequuntur natus, voluptatum iste quibusdam architecto possimus vitae iusto cum expedita doloremque saepe, praesentium dolores modi? Reprehenderit nobis soluta fuga.';

  return (
    <div className="flex w-full flex-col border-t-[1px] border-t-black/[.15] pt-[24px] text-justify text-[14px] leading-[24px] text-sub-text/75 lg:pt-[32px]">
      <div className="flex flex-col lg:gap-[16px]">
        <p className={`${open === false ? ' line-clamp-3' : ''}`}>
          {introduction
            ? `${lang === 'en' ? introductionEn : introduction}`
            : sample}
        </p>
        <div
          className="flex items-center gap-[8px] text-[14px] font-medium leading-[15px] text-primary-blue "
          onClick={() => setOpen(!open)}
        >
          <p>
            {open === false
              ? `${lang === 'en' ? 'More' : 'Дэлгэрэнгүй'}`
              : `${lang === 'en' ? 'Less' : 'Хураангуй'}`}
          </p>
          <svg
            viewBox="0 0 15 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`max-h-[14px] min-h-[14px] min-w-[14px] max-w-[14px] ${
              open === true && 'rotate-180'
            }`}
          >
            <path d="M1 1L7.5 8L1 1ZM7.5 8L14 1L7.5 8Z" fill="#3C76FE" />
            <path
              d="M1 1L7.5 8L14 1"
              stroke="#3C76FE"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Description;
