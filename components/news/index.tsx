import Image from 'next/image';
import { useAppCtx } from '@/utils/app';

const News = () => {
  const { appState } = useAppCtx();

  const articles = [
    {
      key: 1,
      img: '/samples/hotel1.png',
      name: 'Дотоодын аялагчид хаана байрлаж хоноглож байна вэ?',
      nameEn: 'Where do the local travelers are staying?',
    },
    {
      key: 2,
      img: '/samples/hotel2.png',
      name: 'Дотоодын аялагчид хаана байрлаж хоноглож байна вэ?',
      nameEn: 'Where do the local travelers are staying?',
    },
    {
      key: 3,
      img: '/samples/hotel3.png',
      name: 'Дотоодын аялагчид хаана байрлаж хоноглож байна вэ?',
      nameEn: 'Where do the local travelers are staying?',
    },
    {
      key: 4,
      img: '/samples/hotel4.png',
      name: 'Дотоодын аялагчид хаана байрлаж хоноглож байна вэ?',
      nameEn: 'Where do the local travelers are staying?',
    },
    {
      key: 5,
      img: '/samples/hotel1.png',
      name: 'Дотоодын аялагчид хаана байрлаж хоноглож байна вэ?',
      nameEn: 'Where do the local travelers are staying?',
    },
    {
      key: 6,
      img: '/samples/hotel2.png',
      name: 'Дотоодын аялагчид хаана байрлаж хоноглож байна вэ?',
      nameEn: 'Where do the local travelers are staying?',
    },
  ];

  return (
    <div className="w-full px-[16px] pt-[32px] sm:px-[72px] md:px-[120px] lg:px-[150px] lg:py-[0] 2xl:px-[200px]">
      <div
        className="flex w-full flex-col gap-[18px] border-t-2 border-dashed border-black/[.15] pt-[32px] lg:gap-[32px]"
        // style={{ borderTop: 'dashed 2px rgb(0 0 0 /15%)' }}
      >
        <h3 className="text-[20px] font-bold text-main-text">
          {appState.lang === 'mn' ? 'Нийтлэлүүд' : 'Articles'}
        </h3>
        {/* cardContainer */}
        <div className="grid grid-cols-1 grid-rows-6 gap-[18px] 2xs:grid-cols-2 2xs:grid-rows-3 md:gap-[24px] lg:grid-cols-3 lg:grid-rows-2 2xl:gap-[48px]">
          {articles.map((data) => (
            <div
              key={data.key}
              className="flex w-full flex-col gap-[8px] overflow-hidden rounded-[20px] pb-[8px] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
            >
              {/* image */}
              <div className="relative h-[175px] w-full overflow-hidden md:h-[175px] lg:h-[225px] xl:h-[250px]">
                <Image
                  src={data.img}
                  alt="/hotel"
                  fill={true}
                  priority
                  quality={75}
                  sizes="50vw"
                  className="h-auto w-full object-cover duration-500 hover:scale-110"
                />
              </div>
              {/* bottom section */}
              <div className="flex w-full items-center justify-center px-[8px] text-[14px] text-main-text lg:px-[16px] lg:text-[16px]">
                <p>{appState.lang === 'mn' ? data.name : data.nameEn}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex max-w-[171px] cursor-pointer items-center justify-center self-center rounded-full bg-primary-blue px-[16px] py-[8px] text-[16px] text-white">
          <p className="flex gap-[4px]">
            {appState.lang === 'mn' ? 'Цааш үзэх' : 'More'} <span>(100+)</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default News;
