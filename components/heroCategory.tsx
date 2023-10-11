import Image from 'next/image';

interface iProps {
  title: string;
}

const HeroCategory = ({ title }: iProps) => {
  const categoryData = [
    {
      id: 'camp',
      img: '/samples/camp.png',
      title: 'Амралтын газар',
    },
    {
      id: 'hotel',
      img: '/samples/hotel.png',
      title: 'Зочид буудал',
    },
    {
      id: 'guestHouse',
      img: '/samples/guestHouse.png',
      title: 'Гэст хаус',
    },
    {
      id: 'spa',
      img: '/samples/spa.png',
      title: 'Рашаан сувилал',
    },
  ];
  // md:gap-[32px] lg:gap-[48px] xl:gap-[64px]
  return (
    <div className="text-main-text mt-[74px] flex w-full items-start justify-between px-[10px] sm:px-[50px] md:mt-[82px] md:px-[100px] lg:mt-[0]">
      {categoryData.map((data) => (
        <div
          className="flex w-1/4 cursor-pointer  flex-col items-center justify-center gap-[10px] font-medium md:gap-[16px]"
          key={data.id}
        >
          <div className="xs:h-[65px] xs:w-[65px] relative h-[50px] w-[50px] overflow-hidden rounded-full sm:h-[80px] sm:w-[80px] md:h-[100px] md:w-[100px] lg:h-[140px] lg:w-[140px] xl:h-[180px] xl:w-[180px] 2xl:h-[200px] 2xl:w-[200px]">
            <Image
              src={data.img}
              alt="/heroCategory"
              fill={true}
              //   layout="fill"
              //   width={114}
              //   height={36}
              //   objectFit="cover"
              priority
              quality={75}
              sizes="25vw"
              className="h-auto w-full object-cover duration-500 hover:scale-110"
            />
          </div>
          <p className="xs:text-[12px] lg:text-[16px]] text-center text-[11px] sm:text-[13px] md:text-[14px] xl:text-[18px]">
            {data.title}
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
              className="h-auto w-full object-cover duration-500 hover:scale-110"
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
