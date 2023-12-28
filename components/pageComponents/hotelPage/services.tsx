import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

interface Props {
  activities: HotelData.Activities[];
  dollarRate: string
}

const Services = ({ activities, dollarRate }: Props) => {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');

  return (
    <div className='flex flex-col gap-[24px] border-t-[1px] border-t-black/[.15] pt-[24px] text-[16px] text-main-text lg:gap-[32px] lg:pt-[32px]'>
      <p className=' text-[20px] font-medium leading-[20px]'>
        {lang === 'en' ? 'Special services' : 'Онцлох үйлчилгээ'}
      </p>
      <div className='scrollHidden flex w-full gap-[8px] overflow-x-auto lg:gap-[20px]'>
        {activities.map((index, i) => (
          <div
            key={i}
            className='w-[50%] max-w-[170px] overflow-hidden rounded-[16px] border border-black/[.15] sm:max-w-[200px] md:max-w-[220px] lg:max-w-[250px]'
          >
            <div className='relative h-[125px] w-full overflow-hidden sm:h-[150px] md:h-[160px] lg:h-[180px]'>
              <Image
                src={`${process.env.WEB_URL}/${index.image}`}
                alt='/hotel'
                fill={true}
                loading='lazy'
                sizes='50vw'
                placeholder='blur'
                blurDataURL='/samples/camp.png'
                className='absolute h-auto w-auto select-none object-cover duration-700 hover:scale-110'
                draggable={false}
              />
            </div>
            <div className='flex w-full flex-col gap-[6px] px-[10px] pt-[10px]'>
              <p className='font-medium text-main-text'>
                {lang === 'en' ? index.titleEn : index.title}
              </p>
              <p className='line-clamp-2 text-justify text-[14px] leading-[15px] text-sub-text'>
                {lang === 'en' ? index.descriptionEn : index.description}
              </p>
              <div className='flex w-full justify-end text-[18px] font-semibold'>
                {lang === 'en'
                  ? `${(
                      parseInt(index.price) / parseInt(dollarRate)
                    ).toLocaleString()} $`
                  : `${parseInt(index.price).toLocaleString()} ₮`}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
