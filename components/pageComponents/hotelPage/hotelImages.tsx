import Image from 'next/image';
import { useAppCtx } from '@/contexts/app';

interface Props {
  images: string[];
  image: string;
}

const HotelImages = ({ images, image }: Props) => {
  const { dispatch } = useAppCtx();

  let aditionalImages = [
    '/images/imageSample.png',
    '/images/imageSample.png',
    '/images/imageSample.png',
    '/images/imageSample.png',
    '/images/imageSample.png',
    '/images/imageSample.png',
    '/images/imageSample.png',
    '/images/imageSample.png',
  ];
  if (images.length < 10) {
    aditionalImages = aditionalImages.slice(0, 10 - images.length);
  }

  return (
    <div className='flex w-full flex-col gap-[4px] overflow-hidden rounded-b-[6px] rounded-t-[12px]'>
      <div
        className='relative h-[200px] w-full 2xs:h-[250px] sm:h-[300px] md:h-[375px] lg:h-[400px] xl:h-[425px] 2xl:h-[500px]'
        onClick={() => {
          dispatch({
            type: 'CHANGE_APP_STATE',
            payload: { biggerImage: [image, ...images] },
          });
        }}
      >
        <Image
          src={image ? `${process.env.IMAGE_URL}${image}` : '/samples/camp.png'}
          alt='/hotel'
          fill={true}
          quality={90}
          loading='lazy'
          sizes='50vw'
          placeholder='blur'
          // blurDataURL='/samples/camp.png'
          blurDataURL={
            images ? `"_next/image/?url=${image}"` : '/samples/camp.png'
          }
          className='absolute h-auto w-auto select-none object-cover'
          draggable={false}
        />
      </div>
      <div className='scrollHidden flex h-auto w-full gap-[4px] overflow-x-auto overflow-y-hidden'>
        {images && images.length > 0
          ? images.map((index, i) => (
              <div
                key={i}
                className='relative h-[60px] w-[60px] min-w-[60px] cursor-pointer 2xs:h-[75px] 2xs:w-[75px] 2xs:min-w-[75px] md:h-[100px] md:w-[100px] md:min-w-[100px] lg:max-w-[100px] '
                onClick={() => {
                  dispatch({
                    type: 'CHANGE_APP_STATE',
                    payload: { biggerImage: [image, ...images] },
                  });
                }}
              >
                <Image
                  src={`${process.env.IMAGE_URL}${index}`}
                  alt='/hotel'
                  fill={true}
                  loading='lazy'
                  sizes='50vw'
                  placeholder='blur'
                  blurDataURL={`"_next/image/?url=${index}"`}
                  className='absolute h-auto w-auto select-none object-fill'
                  draggable={false}
                />
              </div>
            ))
          : null}
        {images.length < 10
          ? aditionalImages.map((index, i) => (
              <div
                key={i}
                onClick={() => {
                  dispatch({
                    type: 'CHANGE_APP_STATE',
                    payload: { biggerImage: [image, ...images] },
                  });
                }}
                className='relative h-[60px] w-[60px] min-w-[60px] cursor-pointer opacity-60 2xs:h-[75px] 2xs:w-[75px] 2xs:min-w-[75px] md:h-[100px] md:w-[100px] md:min-w-[100px] lg:max-w-[100px] '
              >
                <Image
                  src={index}
                  alt='/hotel'
                  fill={true}
                  loading='lazy'
                  sizes='50vw'
                  placeholder='blur'
                  blurDataURL={`"_next/image/?url=${index}"`}
                  className='absolute h-auto w-auto select-none object-cover '
                  draggable={false}
                />
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default HotelImages;
