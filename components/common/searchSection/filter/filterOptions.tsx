import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import CategoryFilter from './categoryFilter';
import PriceFilter from './priceFilter';
import ServiceFilter from './serviceFilter';
import { useAppCtx } from '@/contexts/app';

interface Props {
  categories: SearchData.Categories[];
  services: SearchData.HotelServices[];
}

const FilterOptions = ({ categories, services }: Props) => {
  // searchParams
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');
  const router = useRouter();
  const { appState, dispatch } = useAppCtx();
  const filterServices = searchParams.get('services');
  const category = searchParams.get('category');
  const min = searchParams.get('min');
  const max = searchParams.get('max');

  const [cat, setCat] = useState<SearchData.Categories | null>(
    category
      ? categories.filter((index) => index.id.toString() === category)[0]
      : null,
  );
  const samplePrice = [
    { id: 7, min: 0, max: 100000 },
    { id: 8, min: 100000, max: 150000 },
    { id: 9, min: 150000, max: 200000 },
    { id: 10, min: 200000, max: 250000 },
    { id: 11, min: 250000, max: 0 },
  ];
  const [minMax, setMinMax] = useState<{
    id: number;
    min: number;
    max: number;
  } | null>(
    min && max
      ? samplePrice.filter(
          (i) => i.min.toString() === min && i.max.toString() === max,
        )[0]
      : null,
  );
  const [serv, setServices] = useState<string>(
    filterServices ? filterServices : '',
  );

  

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
        className='flex max-h-[300px] w-[85vw] animate-fade500 items-end'
        id='container'
      >
        <div className='flex h-[95%] w-full flex-col items-center gap-[8px] rounded-[20px] border border-black/20 bg-white px-[24px] py-[12px]'>
          <div className='flex h-full w-full items-start justify-between gap-[24px]'>
            {/* Categories */}
            <CategoryFilter
              iconRotateDuration={0}
              data={categories}
              value={cat}
              changeValue={(e: SearchData.Categories) => changeCat(e)}
              ver='web'
            />
            {/* Price */}
            <PriceFilter
              iconRotateDuration={iconRotateDuration}
              data={samplePrice}
              value={minMax}
              changeValue={(e: { id: number; min: number; max: number }) =>
                changeMinMax(e)
              }
              ver='web'
            />
            {/* services */}
            <ServiceFilter
              iconRotateDuration={iconRotateDuration}
              data={services}
              value={serv}
              changeValue={(e: string) => changeServ(e)}
              ver='web'
            />
          </div>
          {/* search Btn */}
          <div className='flex gap-[16px] self-end'>
            <div
              onClick={() => {
                router.replace(
                  `/search/?${createAdditionalQueryString(
                    'services',
                    serv ? serv : null,
                    'category',
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
              className='flex max-w-[180px] items-center  justify-center self-end rounded-full bg-primary-blue px-[14px] py-[4px] text-[13px] font-medium uppercase text-white'
            >
              {lang === 'en' ? 'Filter' : 'Шүүх'}
            </div>
            <div
              onClick={() => {
                router.replace(
                  `/search/?${createAdditionalQueryString(
                    'services',
                    null,
                    'category',
                    null,
                    'min',
                    null,
                    'max',
                    null,
                  )}`,
                  { scroll: false },
                );
                setCat(null);
                setMinMax(null);
                setServices('');
                dispatch({
                  type: 'CHANGE_APP_STATE',
                  payload: { filter: '' },
                });
              }}
              className='flex max-w-[180px] items-center  justify-center self-end rounded-full bg-primary-blue px-[14px] py-[4px] text-[13px] font-medium uppercase text-white'
            >
              {lang === 'en' ? 'Clear' : 'Цэвэрлэх'}
            </div>
          </div>
        </div>
      </div>
    );
  else
    return (
      <div
        className='flex w-full animate-fade500 flex-col gap-[24px] px-[20px] pb-[150px] sm:px-[50px] md:px-[72px]'
        id='container'
      >
        {/* Categories */}
        <CategoryFilter
          iconRotateDuration={0}
          data={categories}
          value={cat}
          changeValue={(e: SearchData.Categories) => changeCat(e)}
          ver='mobile'
        />
        {/* Price */}
        <PriceFilter
          iconRotateDuration={iconRotateDuration}
          data={samplePrice}
          value={minMax}
          changeValue={(e: { id: number; min: number; max: number }) =>
            changeMinMax(e)
          }
          ver='mobile'
        />
        {/* services */}
        <ServiceFilter
          iconRotateDuration={iconRotateDuration}
          data={services}
          value={serv}
          changeValue={(e: string) => changeServ(e)}
          ver='mobile'
        />
        <div className='flex items-center justify-center gap-[16px]'>
          <div
            onClick={() => {
              router.replace(
                `/search/?${createAdditionalQueryString(
                  'services',
                  serv ? `${serv}` : null,
                  'category',
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
            className='flex min-h-[40px] w-auto min-w-[90px] items-center justify-center self-center rounded-full bg-primary-blue px-[12px] pt-[2px] text-[16px] font-medium uppercase tracking-wider text-white'
          >
            {lang === 'en' ? 'Filter' : 'Шүүх'}
          </div>
          <div
            onClick={() => {
              router.replace(
                `/search/?${createAdditionalQueryString(
                  'services',
                  null,
                  'category',
                  null,
                  'min',
                  null,
                  'max',
                  null,
                )}`,
                { scroll: false },
              );
              setCat(null);
              setMinMax(null);
              setServices('');
              dispatch({
                type: 'CHANGE_APP_STATE',
                payload: { filter: '' },
              });
            }}
            className='flex min-h-[40px] w-auto min-w-[90px] items-center justify-center self-center rounded-full bg-primary-blue px-[12px] pt-[2px] text-[16px] font-medium uppercase tracking-wider text-white'
          >
            {lang === 'en' ? 'Clear' : 'Цэвэрлэх'}
          </div>
        </div>
      </div>
    );
};

export default FilterOptions;
