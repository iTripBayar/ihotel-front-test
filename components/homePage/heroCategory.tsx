import Image from 'next/image';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';

interface iProps {
  data: any[];
}

const HeroCategory = ({ data }: iProps) => {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');
  const router = useRouter();
  const pathname = usePathname();
  const type = searchParams.get('type');

  const createQueryString = useCallback(
    (name: string, value: string | null) => {
      const params = new URLSearchParams(searchParams);
      if (value !== null) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams],
  );
  return (
    <div className=" flex w-full items-start justify-between px-[10px] text-main-text sm:px-[50px] lg:px-[150px]">
      {data.map((data) => (
        <div
          className="flex w-1/4 cursor-pointer  flex-col items-center justify-center gap-[10px] font-medium md:gap-[16px]"
          key={data.id}
        >
          <div
            className="relative h-[50px] w-[50px] overflow-hidden rounded-full xs:h-[65px] xs:w-[65px] sm:h-[100px] sm:w-[100px] md:h-[120px] md:w-[120px] lg:h-[140px] lg:w-[140px] xl:h-[180px] xl:w-[180px] 2xl:h-[200px] 2xl:w-[200px]"
            onClick={() => {
              let nextType = !type ? data.id : null;
              router.push(`/search/?${createQueryString('type', nextType)}`, {
                scroll: false,
              });
            }}
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
              blurDataURL={`"_next/image/?url=${data.img}"`}
              quality={75}
              sizes="25vw"
              className="h-auto w-full object-cover duration-500 hover:scale-110"
            />
          </div>
          <p className="lg:text-[16px]] text-center text-[11px] xs:text-[12px] sm:text-[13px] md:text-[14px] xl:text-[18px]">
            {lang === 'en' ? data.nameEn : data.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default HeroCategory;
