import Image from 'next/image';
import { useSearchParams} from 'next/navigation';
import Link from 'next/link';

interface iProps {
  data: HomeData.PropertyTypes[];
}

const HeroCategory = ({ data }: iProps) => {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');
  return (
    <div className=" flex w-full items-start justify-between px-[10px] text-main-text sm:px-[50px] lg:px-[150px]">
      {data.map((data, i) => (
        <Link
        href={{
          query: {type: data.id}, pathname: '/search'
        }}
          className="flex w-1/4 cursor-pointer  flex-col items-center justify-center gap-[10px] font-medium md:gap-[16px]"
          key={i}
        >
          <div
            className="relative h-[50px] w-[50px] overflow-hidden rounded-full xs:h-[65px] xs:w-[65px] sm:h-[100px] sm:w-[100px] md:h-[120px] md:w-[120px] lg:h-[140px] lg:w-[140px] xl:h-[180px] xl:w-[180px] 2xl:h-[200px] 2xl:w-[200px]"
          >
            <Image
              src={
                data.image
                  ? `https://sandbox.api.myhotel.mn:9443/img/type_${data.image}`
                  : '/samples/camp.png'
              }
              alt="/heroCategory"
              fill={true}
              priority
              placeholder="blur"
              blurDataURL={`"_next/image/?url=${data.image}"`}
              quality={75}
              sizes="25vw"
              className="h-auto w-full object-cover duration-500 hover:scale-110"
            />
          </div>
          <p className="lg:text-[16px]] text-center text-[11px] xs:text-[12px] sm:text-[13px] md:text-[14px] xl:text-[18px]">
            {lang === 'en' ? data.nameEn : data.name}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default HeroCategory;
