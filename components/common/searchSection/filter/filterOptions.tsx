import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import CategoryFilter from './categoryFilter';
import PriceFilter from './priceFilter';
import ServiceFilter from './serviceFilter';
import { useAppCtx } from '@/contexts/app';

interface Props {
  categories: SearchData.Categories[];
  services: any[];
}

const FilterOptions = ({ categories, services }: Props) => {
  // searchParams
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');
  const router = useRouter();
  const { appState, dispatch } = useAppCtx();

  const [cat, setCat] = useState<SearchData.Categories | null>(null);
  const [minMax, setMinMax] = useState<{
    id: number;
    min: number;
    max: number;
  } | null>(null);
  const [serv, setServices] = useState<string>('');

  let sampleCat: SearchData.Categories[] = [
    {
      id: 0,
      name: 'Зочид буудал',
      nameEn: '',
      createdAt: '',
      image: '',
      updatedAt: '',
    },
    {
      id: 1,
      name: 'Гэст хаус',
      nameEn: '',
      createdAt: '',
      image: '',
      updatedAt: '',
    },
    {
      id: 2,
      name: 'Амралтын газар',
      nameEn: '',
      createdAt: '',
      image: '',
      updatedAt: '',
    },
    {
      id: 3,
      name: 'Рашаан сувилал',
      nameEn: '',
      createdAt: '',
      image: '',
      updatedAt: '',
    },
    {
      id: 4,
      name: 'Жуулчны бааз',
      nameEn: '',
      createdAt: '',
      image: '',
      updatedAt: '',
    },
    { id: 5, name: 'Айл', nameEn: '', createdAt: '', image: '', updatedAt: '' },
    {
      id: 6,
      name: 'Ресорт',
      nameEn: '',
      createdAt: '',
      image: '',
      updatedAt: '',
    },
  ];
  if (categories) {
    sampleCat = categories;
  }
  const samplePrice = [
    { id: 7, min: 0, max: 100000 },
    { id: 8, min: 100000, max: 150000 },
    { id: 9, min: 150000, max: 200000 },
    { id: 10, min: 200000, max: 250000 },
    { id: 11, min: 250000, max: 0 },
  ];
  let sampleAdditional = [
    { id: 12, name: 'Хими цэвэрлэгээ', nameEn: '' },
    { id: 13, name: 'Номын сан', nameEn: '' },
    { id: 14, name: 'Усан сан', nameEn: '' },
    { id: 15, name: 'Морь унах', nameEn: '' },
    { id: 16, name: 'Англи хэлтэй', nameEn: '' },
    { id: 17, name: 'Дугуй унах', nameEn: '' },
    { id: 18, name: 'Элсний волейбол', nameEn: '' },
    { id: 19, name: 'Дотоод аялал', nameEn: '' },
  ];
  if (services && services.length > 0) {
    sampleAdditional = services;
  }

  const createAdditionalQueryString = (
    name: string,
    value: string | null,
    name1: string,
    value1: string | null,
    name2: string,
    value2: string | null,
    name3: string,
    value3: string | null,
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
    if (value3 !== null) {
      params.set(name3, value3);
    } else {
      params.delete(name3);
    }
    return params.toString();
  };
  const changeCat = (e: SearchData.Categories) => {
    if (cat === e) {
      setCat(null);
    } else {
      setCat(e);
    }
  };
  const changeMinMax = (e: { id: number; min: number; max: number }) => {
    if (minMax !== null && minMax.id === e.id) {
      setMinMax(null);
    } else {
      setMinMax(e);
    }
  };
  const changeServ = (e: string) => {
    if (serv === '') {
      setServices(`${e}`);
    } else {
      if (serv.split(',').includes(e)) {
        const indexValue = serv.split(',').indexOf(e);
        setServices(serv.split(',').toSpliced(indexValue, 1).join());
      } else {
        setServices(`${serv},${e}`);
      }
    }
  };

  const iconRotateDuration = 700;
  if (appState.filter === 'webFilter')
    return (
      <div
        className="flex max-h-[300px] w-[85vw] animate-fade500 items-end"
        id="container"
      >
        <div className="flex h-[95%] w-full flex-col items-center gap-[8px] rounded-[20px] border border-black/20 bg-white px-[24px] py-[12px]">
          <div className="flex h-full w-full items-start justify-between gap-[24px]">
            {/* Categories */}
            <CategoryFilter
              iconRotateDuration={0}
              data={sampleCat}
              value={cat}
              changeValue={(e: SearchData.Categories) => changeCat(e)}
              ver="web"
            />
            {/* Price */}
            <PriceFilter
              iconRotateDuration={iconRotateDuration}
              data={samplePrice}
              value={minMax}
              changeValue={(e: { id: number; min: number; max: number }) =>
                changeMinMax(e)
              }
              ver="web"
            />
            {/* services */}
            <ServiceFilter
              iconRotateDuration={iconRotateDuration}
              data={sampleAdditional}
              value={serv}
              changeValue={(e: string) => changeServ(e)}
              ver="web"
            />
          </div>
          {/* search Btn */}
          <div
            onClick={() => {
              router.replace(
                `/search/?${createAdditionalQueryString(
                  'services',
                  serv ? serv : null,
                  'catVal',
                  cat ? `${cat?.id}` : null,
                  'min',
                  minMax ? `${minMax.min}` : null,
                  'max',
                  minMax ? `${minMax.max}` : null,
                )}`,
                { scroll: false },
              );
              dispatch({
                type: 'CHANGE_APP_STATE',
                payload: { filter: '' },
              });
            }}
            className="flex max-w-[180px] items-center  justify-center self-end rounded-full bg-primary-blue px-[14px] py-[4px] text-[13px] font-medium uppercase text-white"
          >
            {lang === 'en' ? 'Filter' : 'Шүүх'}
          </div>
        </div>
      </div>
    );
  else
    return (
      <div
        className="flex w-full animate-fade500 flex-col gap-[24px] px-[20px] pb-[150px] sm:px-[50px] md:px-[72px]"
        id="container"
      >
        {/* Categories */}
        <CategoryFilter
          iconRotateDuration={0}
          data={sampleCat}
          value={cat}
          changeValue={(e: SearchData.Categories) => changeCat(e)}
          ver="mobile"
        />
        {/* Price */}
        <PriceFilter
          iconRotateDuration={iconRotateDuration}
          data={samplePrice}
          value={minMax}
          changeValue={(e: { id: number; min: number; max: number }) =>
            changeMinMax(e)
          }
          ver="mobile"
        />
        {/* services */}
        <ServiceFilter
          iconRotateDuration={iconRotateDuration}
          data={sampleAdditional}
          value={serv}
          changeValue={(e: string) => changeServ(e)}
          ver="mobile"
        />
        <div
          onClick={() => {
            router.replace(
              `/search/?${createAdditionalQueryString(
                'services',
                serv ? `${serv}` : null,
                'catVal',
                cat ? `${cat?.id}` : null,
                'min',
                minMax ? `${minMax.min}` : null,
                'max',
                minMax ? `${minMax.max}` : null,
              )}`,
              { scroll: false },
            );
            dispatch({
              type: 'CHANGE_APP_STATE',
              payload: { filter: '' },
            });
          }}
          className="flex min-h-[40px] w-auto min-w-[90px] items-center justify-center self-center rounded-full bg-primary-blue px-[12px] pt-[2px] text-[16px] font-medium uppercase tracking-wider text-white"
        >
          {lang === 'en' ? 'Filter' : 'Шүүх'}
        </div>
      </div>
    );
};

export default FilterOptions;
