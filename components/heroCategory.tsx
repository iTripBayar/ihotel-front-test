import Image from 'next/image';
import { useAppCtx } from '@/utils/app';

interface iProps {
  data: any[];
}

const HeroCategory = ({ data }: iProps) => {
  const { appState } = useAppCtx();

  const categoryData = [
    {
      id: 'camp',
      img: '/samples/camp.png',
      title: 'Амралтын газар',
      titleEn: 'Tourist camps',
    },
    {
      id: 'hotel',
      img: '/samples/hotel.png',
      title: 'Зочид буудал',
      titleEn: 'Hotels',
    },
    {
      id: 'guestHouse',
      img: '/samples/guestHouse.png',
      title: 'Гэст хаус',
      titleEn: 'Guest houses',
    },
    {
      id: 'spa',
      img: '/samples/spa.png',
      title: 'Рашаан сувилал',
      titleEn: 'Spa resorts',
    },
  ];
  // console.log(data);
  // md:gap-[32px] lg:gap-[48px] xl:gap-[64px]
  return (
    <div className=" flex w-full items-start justify-between px-[10px] text-main-text sm:px-[50px] lg:px-[150px]">
      {data.map((data) => (
        <div
          className="flex w-1/4 cursor-pointer  flex-col items-center justify-center gap-[10px] font-medium md:gap-[16px]"
          key={data.id}
        >
          <div className="relative h-[50px] w-[50px] overflow-hidden rounded-full xs:h-[65px] xs:w-[65px] sm:h-[100px] sm:w-[100px] md:h-[120px] md:w-[120px] lg:h-[140px] lg:w-[140px] xl:h-[180px] xl:w-[180px] 2xl:h-[200px] 2xl:w-[200px]">
            <Image
              src={
                data.image
                  ? `https://ihotel.mn/${data.image}`
                  : '/samples/camp.png'
              }
              // src={`https://ihotel.mn/${index.coverPhoto}`}
              // src={`https://ihotel.mn/${data.image}`}
              alt="/heroCategory"
              fill={true}
              priority
              placeholder="blur"
              blurDataURL={`"_next/image/?url=${data.img}"`}
              quality={75}
              sizes="25vw"
              className="h-auto w-full object-cover duration-500 hover:scale-110"
            />
          </div>
          <p className="lg:text-[16px]] text-center text-[11px] xs:text-[12px] sm:text-[13px] md:text-[14px] xl:text-[18px]">
            {/* {appState.lang === 'mn' ? data.name : data.nameEn} */}
            {appState.lang === 'mn' ? data.name : data.nameEn}
          </p>
          {/* <div className="relative h-[65px] w-[65px] overflow-hidden  rounded-full bg-black sm:h-[100px] sm:w-[100px]  md:h-[140px] md:w-[140px] lg:h-[190px] lg:w-[190px]">
            <Image
              src={data.img}
              alt="heroCategory"
              fill={true}
              //   layout="fill"
              //   width={114}
              //   height={36}
              //   objectFit="cover"
              priority
              quality={75}
              sizes="25vw"
              className="object-cover w-full h-auto duration-500 hover:scale-110"
            />
          </div> */}

          {/*  */}
          {/* {data.id === 'guestHouse' ? (
            <p className="w-2/5 text-center text-[12px] md:w-full md:text-[14px] lg:text-[16px]">
              {data.title}
            </p>
          ) : data.id === 'hotel' ? (
            <p className="w-3/5 text-center text-[12px] md:w-full md:text-[14px] lg:text-[16px]">
              {data.title}
            </p>
          ) : (
            <p className="w-4/7 text-center text-[12px] md:w-full md:text-[14px] lg:text-[16px]">
              {data.title}
            </p>
          )} */}
          {/* <p className="w-4/7 text-center text-[12px] md:w-full md:text-[14px] lg:text-[16px]">
            {data.title}
          </p> */}
        </div>
      ))}
    </div>
  );
};

export default HeroCategory;
