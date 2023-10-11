import Image from 'next/image';

const News = () => {
  const articles = [
    {
      key: 1,
      img: '/samples/hotel1.png',
      name: 'Дотоодын аялагчид хаана байрлаж хоноглож байна вэ?',
    },
    {
      key: 2,
      img: '/samples/hotel2.png',
      name: 'Дотоодын аялагчид хаана байрлаж хоноглож байна вэ?',
    },
    {
      key: 3,
      img: '/samples/hotel3.png',
      name: 'Дотоодын аялагчид хаана байрлаж хоноглож байна вэ?',
    },
    {
      key: 4,
      img: '/samples/hotel4.png',
      name: 'Дотоодын аялагчид хаана байрлаж хоноглож байна вэ?',
    },
    {
      key: 5,
      img: '/samples/hotel1.png',
      name: 'Дотоодын аялагчид хаана байрлаж хоноглож байна вэ?',
    },
    {
      key: 6,
      img: '/samples/hotel2.png',
      name: 'Дотоодын аялагчид хаана байрлаж хоноглож байна вэ?',
    },
  ];

  return (
    <div className="w-full px-[16px] pt-[32px] sm:px-[72px] md:px-[120px] lg:px-[150px] lg:py-[0]">
      <div
        className="flex w-full flex-col gap-[18px] border-t-2 border-dashed border-black/[.15] pt-[32px] lg:gap-[32px]"
        // style={{ borderTop: 'dashed 2px rgb(0 0 0 /15%)' }}
      >
        <h3 className="text-main-text text-[20px] font-bold">Нийтлэлүүд</h3>
        {/* cardContainer */}
        <div className="2xs:grid-cols-2 2xs:grid-rows-3 grid grid-cols-1 grid-rows-6 gap-[18px] md:gap-[24px] lg:grid-cols-3 lg:grid-rows-2">
          {articles.map((data) => (
            <div
              key={data.key}
              className="flex w-full flex-col gap-[8px] overflow-hidden rounded-[20px] pb-[8px] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
            >
              {/* image */}
              <div className="relative h-[175px] w-full overflow-hidden md:h-[175px] lg:h-[225px]">
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
              <div className="text-main-text flex w-full items-center justify-center px-[8px] text-[14px] lg:px-[16px] lg:text-[16px]">
                <p>{data.name}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-primary-blue flex max-w-[171px] cursor-pointer items-center justify-center self-center rounded-full px-[16px] py-[8px] text-[16px] text-white">
          <p className="flex gap-[4px]">
            Цааш үзэх <span>(100+)</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default News;
