import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import CategoryFilter from "./categoryFilter";
import PriceFilter from "./priceFilter";
import ServiceFilter from "./serviceFilter";
import { useAppCtx } from "@/contexts/app";

interface Props {
  categories: SearchData.Categories[];
  services: SearchData.HotelServices[];
}

const FilterOptions = ({ categories, services }: Props) => {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");
  const router = useRouter();
  const { appState, dispatch } = useAppCtx();
  const filterServices = searchParams.get("services");
  const priceRangeParam = searchParams.get("priceRange");
  const category = searchParams.get("category");
  const [cat, setCat] = useState<string[]>(
    category ? JSON.parse(category) : [],
  );
  const [priceRange, setPriceRange] = useState<string[]>(
    priceRangeParam ? JSON.parse(priceRangeParam) : [],
  );

  const changeCat = (e: string) => {
    if (cat.length > 0) {
      if (cat.some((index) => index === e)) {
        setCat((prev) => prev.filter((index) => index !== e));
      } else {
        setCat((prev) => [...prev, e]);
      }
    } else {
      setCat([e]);
    }
  };
  const changePrice = (e: number[]) => {
    if (e.length < 2) {
      if (priceRange.length > 0) {
        if (priceRange.some((index) => index === `[${e[0]}]`)) {
          setPriceRange((prev) =>
            prev.filter((index) => index !== `[${e[0]}]`),
          );
        } else {
          setPriceRange((prev) => [...prev, `[${e[0]}]`]);
        }
      } else {
        setPriceRange([`[${e[0]}]`]);
      }
    } else {
      if (priceRange.length > 0) {
        if (priceRange.some((index) => index === `[${e[0]}, ${e[1]}]`)) {
          setPriceRange((prev) =>
            prev.filter((index) => index !== `[${e[0]}, ${e[1]}]`),
          );
        } else {
          setPriceRange((prev) => [...prev, `[${e[0]}, ${e[1]}]`]);
        }
      } else {
        setPriceRange([`[${e[0]}, ${e[1]}]`]);
      }
    }
  };

  const samplePrice = [
    { id: 7, min: 0, max: 50000 },
    { id: 8, min: 50000, max: 100000 },
    { id: 9, min: 100000, max: 150000 },
    { id: 10, min: 150000, max: 200000 },
    { id: 11, min: 200000, max: 0 },
  ];

  const [serv, setServices] = useState<string>(
    filterServices ? filterServices : "",
  );

  const createAdditionalQueryString = (
    name: string,
    value: string | null,
    name1: string,
    value1: string | null,
    name2: string,
    value2: string | null,
  ) => {
    const params = new URLSearchParams(searchParams);
    if (value !== null) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    if (value1 !== null) {
      params.set(name1, value1);
    } else {
      params.delete(name1);
    }
    if (value2 !== null) {
      params.set(name2, value2);
    } else {
      params.delete(name2);
    }
    return params.toString();
  };
  // const changeCat = (e: SearchData.Categories) => {
  //   if (cat === e) {
  //     setCat(null);
  //   } else {
  //     setCat(e);
  //   }
  // };

  const changeServ = (e: string) => {
    if (serv === "") {
      setServices(`${e}`);
    } else {
      if (serv.split(",").includes(e)) {
        const indexValue = serv.split(",").indexOf(e);
        setServices(serv.split(",").toSpliced(indexValue, 1).join());
      } else {
        setServices(`${serv},${e}`);
      }
    }
  };

  const iconRotateDuration = 700;

  if (appState.filter === "webFilter")
    return (
      <div
        className="flex max-h-[300px] w-[85vw] animate-fade500 items-end filter"
        id="container"
      >
        <div className="flex h-[95%] w-full flex-col items-center gap-[8px] rounded-[20px] border border-black/20 bg-white px-[24px] py-[12px] filter">
          <div className="flex h-full w-full items-start justify-between gap-[24px] filter">
            {/* Categories */}
            <CategoryFilter
              iconRotateDuration={iconRotateDuration}
              data={categories}
              value={cat}
              // changeValue={(e: SearchData.Categories) => changeCat(e)}
              changeValue={(e: string) => changeCat(e)}
              ver="web"
              // testChangeCat={(e: string) => testChangeCat(e)}
            />
            {/* Price */}
            <PriceFilter
              iconRotateDuration={iconRotateDuration}
              data={samplePrice}
              // value={minMax}
              value={priceRange}
              changeValue={changePrice}
              ver="web"
              // changeTestPrice={changePrice}
            />
            {/* services */}
            <ServiceFilter
              iconRotateDuration={iconRotateDuration}
              data={services}
              value={serv}
              changeValue={(e: string) => changeServ(e)}
              ver="web"
            />
          </div>
          {/* search Btn */}
          <div className="flex gap-[16px] self-end filter">
            <div
              onClick={() => {
                router.replace(
                  `/search/?${createAdditionalQueryString(
                    "services",
                    serv ? serv : null,
                    "category",
                    // cat ? `${cat?.id}` : null,
                    cat.length > 0 ? JSON.stringify(cat) : null,
                    "priceRange",
                    priceRange.length > 0 ? JSON.stringify(priceRange) : null,
                  )}`,
                  { scroll: false },
                );
                dispatch({
                  type: "CHANGE_APP_STATE",
                  payload: { filter: "" },
                });
              }}
              className="flex max-w-[180px] items-center  justify-center self-end rounded-full bg-primary-blue px-[14px] py-[4px] text-[13px] font-medium uppercase text-white filter"
            >
              {lang === "en" ? "Filter" : "Шүүх"}
            </div>
            <div
              onClick={() => {
                router.replace(
                  `/search/?${createAdditionalQueryString(
                    "services",
                    null,
                    "category",
                    null,
                    "priceRange",
                    null,
                  )}`,
                  { scroll: false },
                );
                // setCat(null);
                setCat([]);
                setPriceRange([]);
                // setMinMax(null);
                setServices("");
                dispatch({
                  type: "CHANGE_APP_STATE",
                  payload: { filter: "" },
                });
              }}
              className="flex max-w-[180px] items-center  justify-center self-end rounded-full bg-primary-blue px-[14px] py-[4px] text-[13px] font-medium uppercase text-white filter"
            >
              {lang === "en" ? "Clear" : "Цэвэрлэх"}
            </div>
          </div>
        </div>
      </div>
    );
  else
    return (
      <div
        className="flex w-full animate-fade500 flex-col gap-[24px] px-[20px] pb-[150px] sm:px-[50px] md:px-[72px] filter"
        id="container"
      >
        {/* Categories */}
        <CategoryFilter
          iconRotateDuration={iconRotateDuration}
          data={categories}
          value={cat}
          // changeValue={(e: SearchData.Categories) => changeCat(e)}
          changeValue={(e: string) => changeCat(e)}
          ver="mobile"
          // testChangeCat={(e: string) => testChangeCat(e)}
        />
        {/* Price */}
        <PriceFilter
          iconRotateDuration={iconRotateDuration}
          data={samplePrice}
          // value={minMax}
          value={priceRange}
          changeValue={changePrice}
          // changeValue={(e: { id: number; min: number; max: number }) =>
          //   changeMinMax(e)
          // }
          ver="mobile"
          // changeTestPrice={changePrice}
        />
        {/* services */}
        <ServiceFilter
          iconRotateDuration={iconRotateDuration}
          data={services}
          value={serv}
          changeValue={(e: string) => changeServ(e)}
          ver="mobile"
        />
        <div className="flex items-center justify-center gap-[16px] filter">
          <div
            onClick={() => {
              router.replace(
                `/search/?${createAdditionalQueryString(
                  "services",
                  serv ? `${serv}` : null,
                  "category",
                  // cat ? `${cat?.id}` : null,
                  cat.length > 0 ? JSON.stringify(cat) : null,
                  "priceRange",
                  priceRange.length > 0 ? JSON.stringify(priceRange) : null,
                )}`,
                { scroll: false },
              );
              dispatch({
                type: "CHANGE_APP_STATE",
                payload: { filter: "" },
              });
            }}
            className="flex min-h-[40px] w-auto min-w-[90px] items-center justify-center self-center rounded-full bg-primary-blue px-[12px] pt-[2px] text-[14px] font-medium uppercase tracking-wider text-white filter"
          >
            {lang === "en" ? "Filter" : "Шүүх"}
          </div>
          <div
            onClick={() => {
              router.replace(
                `/search/?${createAdditionalQueryString(
                  "services",
                  null,
                  "category",
                  null,
                  "priceRange",
                  null,
                )}`,
                { scroll: false },
              );
              // setCat(null);
              setCat([]);
              setPriceRange([]);
              // setMinMax(null);
              setServices("");
              dispatch({
                type: "CHANGE_APP_STATE",
                payload: { filter: "" },
              });
            }}
            className="flex min-h-[40px] w-auto min-w-[90px] items-center justify-center self-center rounded-full bg-primary-blue px-[12px] pt-[2px] text-[14px] font-medium uppercase tracking-wider text-white filter"
          >
            {lang === "en" ? "Clear" : "Цэвэрлэх"}
          </div>
        </div>
      </div>
    );
};

export default FilterOptions;
