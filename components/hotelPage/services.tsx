import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

interface Props {
  services: any[];
}

const Services = ({ services }: Props) => {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');
  const sample = [
    {
      key: 0,
      name: 'Abcd',
      nameEn: 'Abcd',
      desc: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi nam dolorum, pariatur atque voluptate molestias.',
      price: 70000,
    },
    {
      key: 1,
      name: 'Abcde',
      nameEn: 'Abcde',
      desc: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi nam dolorum, pariatur atque voluptate molestias.',
      price: 70000,
    },
    {
      key: 2,
      name: 'Abcdef',
      nameEn: 'Abcdef',
      desc: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi nam dolorum, pariatur atque voluptate molestias.',
      price: 70000,
    },
    {
      key: 3,
      name: 'Abcdefg',
      nameEn: 'Abcdefg',
      desc: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi nam dolorum, pariatur atque voluptate molestias.',
      price: 70000,
    },
    {
      key: 4,
      name: 'Abcdefgh',
      nameEn: 'Abcdefgh',
      desc: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi nam dolorum, pariatur atque voluptate molestias.',
      price: 70000,
    },
  ];

  return (
    <div className="flex flex-col gap-[24px] border-t-[1px] border-t-black/[.15] pt-[24px] text-[16px] text-main-text">
      <p className=" text-[20px] font-medium">
        {lang === 'en' ? 'Special services' : 'Онцлох үйлчилгээ'}
      </p>
      <div className="scrollHidden flex w-full gap-[8px] overflow-x-auto lg:gap-[20px]">
        {sample.map((index, i) => (
          <div
            key={i}
            className="w-[50%] min-w-[170px] overflow-hidden rounded-[16px] border border-black/[.15] lg:min-w-[250px]"
          >
            <div className="relative h-[125px] w-full overflow-hidden lg:h-[180px]">
              <Image
                src={'/samples/camp.png'}
                // src={
                //   data.image !== null && data.image !== ''
                //     ? `https://sandbox.api.myhotel.mn/image?path=${data.image}`
                //     : '/samples/camp.png'
                // }
                alt="/hotel"
                fill={true}
                //   priority
                quality={75}
                loading="lazy"
                sizes="50vw"
                placeholder="blur"
                // blurDataURL={
                //   data.image !== null
                //     ? `"_next/image/?url=${data.image}"`
                //     : '/samples/camp.png'
                // }
                blurDataURL="/samples/camp.png"
                className="absolute h-auto w-auto select-none object-cover duration-700 hover:scale-110"
                draggable={false}
              />
            </div>
            <div className="flex w-full flex-col gap-[6px] px-[10px] pt-[10px]">
              <p className="font-medium text-main-text">
                {lang === 'en' ? index.nameEn : index.name}
              </p>
              <p className="text-justify text-[14px] leading-[15px] text-sub-text">
                {index.desc.slice(0, 38)}...
              </p>
              <div className="flex w-full justify-end text-[18px] font-bold">
                {index?.price?.toLocaleString()} {lang === 'en' ? '$' : '₮'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
