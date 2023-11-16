import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

interface iProps {
  data: any[];
  cap: number;
}

const News = ({ data, cap }: iProps) => {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');
  if (cap != 0) {
    data = data.slice(0, cap);
  }

  return (
    <div className="w-full px-[16px] pt-[32px] sm:px-[42px] md:px-[72px] lg:px-[150px] lg:py-[0] 2xl:px-[200px]">
      <div
        className="flex w-full flex-col gap-[18px] border-t-[1px] border-black/[.15] pt-[32px] lg:gap-[32px]"
        // style={{ borderTop: 'dashed 2px rgb(0 0 0 /15%)' }}
      >
        <h3 className="text-[20px] font-bold text-main-text">
          {/* {state.language === 'mn' ? 'Нийтлэлүүд' : 'Articles'} */}
          {lang === 'en' ? 'Articles' : 'Нийтлэлүүд'}
        </h3>
        {/* cardContainer */}
        <div
          className={`grid grid-cols-1 grid-rows-${cap} gap-[18px] 2xs:grid-rows-${
            cap / 2
          } 2xs:grid-cols-2  md:gap-[24px] lg:grid-cols-3 lg:grid-rows-2 2xl:gap-[48px]`}
        >
          {data.map((data) => (
            <div
              key={data.id}
              className="flex w-full flex-col justify-start gap-[8px] overflow-hidden rounded-[20px] pb-[8px] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
            >
              {/* image */}
              <div className="relative h-[175px] w-full overflow-hidden md:h-[175px] lg:h-[225px] xl:h-[250px]">
                <Image
                  // src={data.img}
                  src={`https://ihotel.mn/${data.photos.match(/"([^"]+)"/)[1]}`}
                  alt="/hotel"
                  fill={true}
                  priority
                  quality={75}
                  sizes="50vw"
                  className="h-auto w-full object-cover duration-700 hover:scale-110"
                />
              </div>
              {/* bottom section */}
              <div className="flex w-full items-center justify-center px-[8px] text-[14px] text-main-text lg:px-[16px] lg:text-[16px]">
                <p className=" line-clamp-3 2xs:line-clamp-2 ">
                  {/* {state.language === 'mn' ? data.title : ''} */}
                  {lang === 'en' ? '' : data.title}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex max-w-[171px] cursor-pointer items-center justify-center self-center rounded-full bg-primary-blue px-[16px] py-[8px] text-[16px] text-white">
          <p className="flex gap-[4px]">
            {/* {state.language === 'mn' ? 'Цааш үзэх' : 'More'}{' '} */}
            {lang === 'en' ? 'More' : 'Цааш үзэх'} <span>(100+)</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default News;
