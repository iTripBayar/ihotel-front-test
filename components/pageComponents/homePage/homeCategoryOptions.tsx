import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
// import { Chip } from "@nextui-org/react";

interface iProps {
  data: HomeData.PropertyTypes[];
}

const HomeCategoryOptions = ({ data }: iProps) => {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");
  return (
    <div className=" flex w-full overflow-auto items-start justify-start px-[16px] text-main-text sm:px-[50px] lg:px-[150px] gap-[12px] scrollHidden">
      {/* {data.map((index, i) => (
        <Chip
          key={i}
          className="bg-primary-blue text-white"
          startContent={
            <div className="w-[6px] h-[6px] ml-[6px] rounded-full bg-white"></div>
          }
          size="md"
          variant="flat"
          radius="lg"
        >
          <p className="font-medium">
            {lang === "en" ? index.nameEn : index.name}
          </p>
        </Chip>
      ))} */}
      {data.map((index, i) => (
        <div
          className="flex w-1/4 flex-col items-center justify-center gap-[10px] font-medium md:gap-[16px]"
          key={i}
        >
          <Link
            href={{
              query: { category: `["${index.id}"]` },
              pathname: "/search",
            }}
            className="relative h-[50px] w-[50px] overflow-hidden rounded-full  xs:h-[65px] xs:w-[65px] sm:h-[100px] sm:w-[100px] md:h-[120px] md:w-[120px] lg:h-[140px] lg:w-[140px] xl:h-[180px] xl:w-[180px] 2xl:h-[200px] 2xl:w-[200px]"
          >
            <div className="absolute z-[101] h-full w-full rounded-full shadow-[inset_0px_0px_12px_10px_rgb(0,0,0,0.15)]"></div>
            <Image
              src={
                index.nameEn === "Guest House"
                  ? `${process.env.WEB_URL}/img/type_2.jpg`
                  : index.name === "Амралтын газар"
                  ? `${process.env.WEB_URL}/img/type_3.jpg`
                  : index.nameEn === "Hotel"
                  ? `${process.env.WEB_URL}/img/type_5.jpg`
                  : index.nameEn === "Tourist camp"
                  ? "/samples/sampleCamp.jpg"
                  : "/samples/camp.png"
              }
              alt="/heroCategory"
              fill={true}
              priority
              placeholder="blur"
              blurDataURL={
                index.nameEn === "Guest House"
                  ? `"_next/image/?url=${process.env.WEB_URL}/img/type_2.jpg"`
                  : index.name === "Амралтын газар"
                  ? `"_next/image/?url=${process.env.WEB_URL}/img/type_3.jpg"`
                  : index.nameEn === "Hotel"
                  ? `"_next/image/?url=${process.env.WEB_URL}/img/type_5.jpg"`
                  : index.nameEn === "Tourist camp"
                  ? "/samples/sampleCamp.jpg"
                  : "/samples/camp.png"
              }
              sizes="20vw"
              quality={100}
              className="z-[100] h-auto w-full object-cover duration-500 hover:scale-110"
            />
          </Link>
          <Link
            href={{
              query: { category: index.id },
              pathname: "/search",
            }}
            className="lg:text-[16px]] text-center text-[11px] xs:text-[12px] sm:text-[13px] md:text-[14px] xl:text-[18px]"
          >
            {lang === "en" ? index.nameEn : index.name}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default HomeCategoryOptions;
