import useWindowSize from '@/hooks/windowSize';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { unserialize } from 'serialize-php';

interface iProps {
  data: HomeData.Posts[];
}
const News = ({ data }: iProps) => {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');
  const size = useWindowSize();
  let cap = 4;
  if (size.width && size.width >= 1024) {
    cap = 6;
  }
  if (cap != 0) {
    data = data.slice(0, cap);
  }
  // const serializedData: string | undefined = data?.photos;
  // let unserializedData: { day: string; fee: string }[] = [{ day: '', fee: '' }];

  // if (serializedData) {
  //   unserializedData = unserialize(serializedData);
  // }
  return (
    <div className='w-full px-[16px] pt-[32px] sm:px-[42px] md:px-[72px] lg:px-[150px] lg:py-[0] 2xl:px-[200px]'>
      <div
        className='flex w-full flex-col gap-[18px] border-t-[1px] border-black/[.15] pt-[32px] lg:gap-[32px]'
        // style={{ borderTop: 'dashed 2px rgb(0 0 0 /15%)' }}
      >
        <h3 className='text-[20px] font-bold text-main-text'>
          {/* {state.language === 'mn' ? 'Нийтлэлүүд' : 'Articles'} */}
          {lang === 'en' ? 'Articles' : 'Нийтлэлүүд'}
        </h3>
        {/* cardContainer */}
        <div
          className={`grid grid-cols-1 grid-rows-${cap} gap-[18px] 2xs:grid-rows-${
            cap / 2
          } 2xs:grid-cols-2  md:gap-[24px] lg:grid-cols-3 lg:grid-rows-2 2xl:gap-[48px]`}
        >
          {data.map((index) => (
            <div
              key={index.id}
              className='flex w-full flex-col justify-start gap-[8px] overflow-hidden rounded-[20px] pb-[8px] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]'
            >
              {/* image */}
              <div className='relative h-[175px] w-full overflow-hidden md:h-[175px] lg:h-[225px] xl:h-[250px]'>
                <Image
                  // src={`https://ihotel.mn/${unserialize(index.photos)[0]}`}
                  src={`${process.env.IMAGE_URL}${
                    unserialize(index.photos)[0]
                  }`}
                  alt='/posts'
                  fill={true}
                  quality={75}
                  sizes='50vw'
                  className='object-cover duration-700 hover:scale-110'
                />
              </div>
              {/* bottom section */}
              <div className='flex w-full items-center justify-center px-[8px] text-[14px] text-main-text lg:px-[16px] lg:text-[16px]'>
                <p className=' line-clamp-3 2xs:line-clamp-2'>
                  {/* {state.language === 'mn' ? data.title : ''} */}
                  {lang === 'en' ? '' : index.title}
                </p>
              </div>
            </div>
          ))}
        </div>
        <Link
          href={`${process.env.TEMPORARY_URL}/posts`}
          className='flex max-w-[171px] cursor-pointer items-center justify-center self-center rounded-full bg-primary-blue px-[16px] py-[8px] text-[16px] text-white'
        >
          <p className='flex gap-[4px]'>
            {/* {state.language === 'mn' ? 'Цааш үзэх' : 'More'}{' '} */}
            {lang === 'en' ? 'More' : 'Цааш үзэх'}{' '}
            {data.length - cap > 0 ? <span>({data.length - cap}+)</span> : null}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default News;
