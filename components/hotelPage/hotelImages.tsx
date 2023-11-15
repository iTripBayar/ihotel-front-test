import React from 'react';
import Image from 'next/image';

interface Props {
  images: string[];
  image: string;
}

const HotelImages = ({ images, image }: Props) => {
  // console.log(images);

  const sample = [
    '/samples/camps.png',
    'samples/gobi.png',
    '/samples/camps.png',
  ];

  return (
    <div className="flex w-full flex-col gap-[4px] overflow-hidden rounded-b-[6px] rounded-t-[12px]">
      <div className="relative h-[200px] w-full">
        <Image
          src={
            image
              ? `https://sandbox.api.myhotel.mn/image?path=${image}`
              : '/samples/camp.png'
          }
          alt="/hotel"
          fill={true}
          //   priority
          quality={100}
          loading="lazy"
          sizes="50vw"
          placeholder="blur"
          blurDataURL={
            image !== null ? `"_next/image/?url=${image}"` : '/samples/camp.png'
          }
          className="absolute h-auto w-auto select-none object-cover duration-700 hover:scale-110"
          draggable={false}
        />
      </div>
      <div className="flex h-[75px] w-full gap-[4px]">
        {images && images.length > 0
          ? images.map((index, i) => (
              <div key={i} className="relative h-full w-[40%]">
                <Image
                  src={`https://sandbox.api.myhotel.mn/image?path=${index}`}
                  alt="/hotel"
                  fill={true}
                  //   priority
                  quality={75}
                  loading="lazy"
                  sizes="50vw"
                  placeholder="blur"
                  blurDataURL={`"_next/image/?url=${index}"`}
                  className="absolute h-auto w-auto select-none object-cover duration-700 hover:scale-110"
                  draggable={false}
                />
              </div>
            ))
          : sample.map((index, i) => (
              <div key={i} className="relative h-full w-[40%]">
                <Image
                  src="/samples/camp.png"
                  alt="/hotel"
                  fill={true}
                  //   priority
                  quality={75}
                  loading="lazy"
                  sizes="50vw"
                  placeholder="blur"
                  blurDataURL={`"_next/image/?url=${index}"`}
                  className="absolute h-auto w-auto select-none object-cover duration-700 hover:scale-110"
                  draggable={false}
                />
              </div>
            ))}
      </div>
    </div>
  );
};

export default HotelImages;
