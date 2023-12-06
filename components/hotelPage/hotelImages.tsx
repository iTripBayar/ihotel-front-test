import React from 'react';
import Image from 'next/image';

interface Props {
  images: string[];
  image: string | never[];
  coverPhoto: string | null;
}

const HotelImages = ({ images, image, coverPhoto }: Props) => {
  const sample = [
    '/samples/camps.png',
    'samples/gobi.png',
    '/samples/camps.png',
    '/samples/camps.png',
    '/samples/camps.png',
    '/samples/camps.png',
    '/samples/camps.png',
    '/samples/camps.png',
    '/samples/camps.png',
    '/samples/camps.png',
    '/samples/camps.png',
  ];

  // console.log(images)

  return (
    <div className="flex w-full flex-col gap-[4px] overflow-hidden rounded-b-[6px] rounded-t-[12px]">
      <div className="relative h-[200px] w-full sm:h-[250px] md:h-[350px] lg:h-[400px] xl:h-[425px]">
        <Image
          src={
            coverPhoto
              ? `https://sandbox.api.myhotel.mn:9443/${coverPhoto}`
              : '/samples/camp.png'
          }
          alt="/hotel"
          fill={true}
          quality={90}
          loading="lazy"
          sizes="50vw"
          placeholder="blur"
          blurDataURL="/samples/camp.png"
          className="absolute h-auto w-auto select-none object-cover"
          draggable={false}
        />
      </div>
      <div className="scrollHidden flex h-[60px] w-full gap-[4px] overflow-x-auto overflow-y-hidden 2xs:h-[75px] sm:h-[100px]">
        {images && images.length > 0
          ? images.map((index, i) => (
              <div
                key={i}
                className="relative h-full w-[40%] lg:max-w-[100px] "
              >
                <Image
                  src={`https://sandbox.api.myhotel.mn/image?path=${index}`}
                  alt="/hotel"
                  fill={true}
                  loading="lazy"
                  sizes="50vw"
                  placeholder="blur"
                  blurDataURL={`"_next/image/?url=${index}"`}
                  className="absolute h-auto w-auto select-none object-fill"
                  draggable={false}
                />
              </div>
            ))
          : sample.map((index, i) => (
              <div
                key={i}
                className="relative h-full min-w-[100px] 2xs:min-w-[135px] md:min-w-[165px] lg:min-w-[100px]"
              >
                <Image
                  src="/samples/camp.png"
                  alt="/hotel"
                  fill={true}
                  loading="lazy"
                  sizes="50vw"
                  placeholder="blur"
                  blurDataURL={`"_next/image/?url=${index}"`}
                  className="absolute h-auto w-auto select-none object-cover "
                  draggable={false}
                />
              </div>
            ))}
      </div>
    </div>
  );
};

export default HotelImages;
