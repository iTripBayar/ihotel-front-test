"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NextBtn from "./nextBtn";
import PrevBtn from "./prevBtn";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface iProps {
  data: HomeData.DestCategories[];
  destinations: HomeData.TopDestinations[];
}

const CommonLocation = ({ data, destinations }: iProps) => {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");
  const sliderRef = useRef<Slider>(null);
  const [currentSlide, setCurrentSlide] = useState(1);

  function SampleNextArrow(props: any) {
    const { onClick } = props;
    return <NextBtn onClick={onClick} />;
  }

  function SamplePrevArrow(props: any) {
    const { onClick } = props;
    return <PrevBtn onClick={onClick} />;
  }

  // const [activeIndex, setActive] = useState<any>(0);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "5%",
    slidesToShow: 1,
    initialSlide: 0,
    speed: 500,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    // afterChange: (current: number) => setActive({ current }),
  };
  const sample = {
      coverPhoto: null,
      createdAt: "",
      description: "empty",
      districtId: 0,
      id: 0,
      image: null,
      isRecommended: 1,
      isSearch: 1,
      longitudeLatitude: {
        lat: "",
        lng: "",
      },
      name: "Empty",
      nameEn: "Empty",
      placeKey: 0,
      provinceId: null,
      slug: "empty",
      thumbnail: "",
      updatedAt: "",
    };

  console.log(destinations.filter((index) => index.placeKey === currentSlide));

  return (
    <div className="flex w-full flex-col gap-[20px]">
      <h3 className="mb-[-10px] self-center text-[16px] font-medium md:text-[18px] lg:text-[22px]">
        {/* {state.language === 'mn' ? 'Түгээмэл байршлууд' : 'Common destinations'} */}
        {lang === "en" ? "Common destinations" : "Түгээмэл байршлууд"}
      </h3>
      <Slider
        {...settings}
        ref={sliderRef}
        beforeChange={(current, next) => {
          const currentSlideId = data[next].id;
          setCurrentSlide(currentSlideId);
        }}
      >
        {data.map((index, i) => (
          <div
            className="relative h-[150px] !w-[calc(100%-12px)]  overflow-hidden rounded-[10px] text-center text-white xs:h-[200px] md:h-[275px] lg:h-[350px] lg:rounded-[20px]"
            key={i}
            id={`${index.id}here`}
          >
            <Image
              // src={`https://ihotel.mn/${index.coverPhoto}`}
              src={
                index.id === 1
                  ? "/images/top100/DJI_0437.jpg"
                  : index.id === 2
                  ? "/images/top100/lakes.jpg"
                  : index.id === 3
                  ? "/images/top100/gobi.jpg"
                  : index.id === 4
                  ? "/images/top100/tal_hangai.jpg"
                  : "/images/top100/rashaan.jpg"
              }
              alt="/commonLocs"
              fill={true}
              priority
              quality={100}
              sizes="90vw"
              placeholder="blur"
              blurDataURL={`"_next/image/?url=${
                index.id === 1
                  ? "/images/top100/ub_city.jpg"
                  : index.id === 2
                  ? "/images/top100/lakes.jpg"
                  : index.id === 3
                  ? "/images/top100/gobi.jpg"
                  : index.id === 4
                  ? "/images/top100/tal_hangai.jpg"
                  : "/images/top100/rashaan.jpg"
              }"`}
              className="h-auto w-full object-cover duration-1000 hover:scale-110"
            />
            <div className="absolute bottom-0 z-[1] flex h-[50px] w-full flex-col items-center justify-center gap-[2px] bg-black/50 md:h-[75px] md:gap-[4px]">
              <h3 className="text-[16px] font-medium leading-[14px] md:text-[18px] md:leading-[18px]">
                {lang === "en" ? "" : index.name}
              </h3>
              <p className="text-[12px] md:text-[14px]">
                {lang === "en" ? "" : index.subtitle}
              </p>
            </div>
          </div>
        ))}
      </Slider>
      <div className=" grid w-full gap-[20px] px-[24px] text-white sm:grid-cols-2 sm:px-[38px] md:px-[68px] lg:grid-cols-3 lg:px-[140px] xl:grid-cols-4 xl:px-[150px] 2xl:px-[200px]">
        {destinations.filter((index) => index.placeKey === currentSlide)
          .length > 0 ? (
          destinations
            .filter((index) => index.placeKey === currentSlide)
            .map((data, i) => (
              <Link
                href={{
                  query: {
                    searchValue: `${data.name}$place$${data.id}`,
                    // lat: data.district.location.lat,
                    // lng: data.district.location.lng,
                  },
                  pathname: "/search",
                }}
                key={i}
                className="group relative h-[175px] w-full cursor-pointer overflow-hidden rounded-[10px] shadow-[0px_0px_12px_4px_rgb(0,0,0,0.25)] 2xs:h-[200px]  sm:h-[225px] md:h-[250px] md:rounded-[16px] lg:h-[225px] lg:rounded-[16px] 2xl:h-[250px]"
              >
                {/* 1-р хороолол$place$1 */}
                <Image
                  src={
                    data.thumbnail !== null
                      ? `${process.env.WEB_URL}/${data.thumbnail}`
                      : "/samples/camp.png"
                  }
                  alt="/commonLocs"
                  fill={true}
                  quality={75}
                  placeholder="blur"
                  blurDataURL={
                    data.image
                      ? `"_next/image/?url=${data.image}"`
                      : "/samples/camp.png"
                  }
                  sizes="(max-width: 576px) 50vw, (max-width: 768px) 40vw, 50vw"
                  className="h-auto w-full object-cover duration-500 group-hover:scale-110"
                />
                <div className="absolute z-10 flex h-full w-full flex-col items-start justify-end gap-[4px] bg-gradient-to-t from-black/60 to-transparent px-[16px] py-[12px] lg:gap-[6px]">
                  <h3 className="text-[18px] font-medium leading-[18px] md:text-[20px] lg:text-[18px]">
                    {lang === "en" ? data.nameEn : data.name}
                  </h3>
                  <p className="text-[14px] leading-[14px] md:text-[16px] lg:w-[80%] lg:text-[14px] lg:leading-[16px]">
                    {data.description}
                  </p>
                </div>
              </Link>
            ))
        ) : (
          <div className="group relative h-[175px] w-full cursor-pointer overflow-hidden rounded-[10px] shadow-[0px_0px_12px_4px_rgb(0,0,0,0.25)] 2xs:h-[200px]  sm:h-[225px] md:h-[250px] md:rounded-[16px] lg:h-[225px] lg:rounded-[16px] 2xl:h-[250px]">
            {/* 1-р хороолол$place$1 */}
            <Image
              src={"/samples/camp.png"}
              alt="/commonLocs"
              fill={true}
              quality={75}
              placeholder="blur"
              blurDataURL={"/samples/camp.png"}
              sizes="(max-width: 576px) 50vw, (max-width: 768px) 40vw, 50vw"
              className="h-auto w-full object-cover duration-500 group-hover:scale-110"
            />
            <div className="absolute z-10 flex h-full w-full flex-col items-start justify-end gap-[4px] bg-gradient-to-t from-black/60 to-transparent px-[16px] py-[12px] lg:gap-[6px]">
              <h3 className="text-[18px] font-medium leading-[18px] md:text-[20px] lg:text-[18px]">
                {lang === "en" ? sample.nameEn : sample.name}
              </h3>
              <p className="text-[14px] leading-[14px] md:text-[16px] lg:w-[80%] lg:text-[14px] lg:leading-[16px]">
                {sample.description}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommonLocation;
