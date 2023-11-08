import React from 'react';
import { useState } from 'react';
import { useAppState } from '@/contexts/appStateContext';
import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';

interface Props {
  getFilterValue: (e: {
    category: string[];
    price: { min: number; max: number };
    additional: string[];
  }) => void;
}

const OldFilter = ({ getFilterValue }: Props) => {
  // const { appState, dispatch } = useAppCtx();
  const { state, dispatch } = useAppState();
  const [open, setOpen] = useState('category');
  const [cat, setCat] = useState<string[]>([]);
  const [price, setPrice] = useState({ min: 0, max: 0 });
  const [additional, setAdditional] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const lang = searchParams.get('lang');
  const toggle = searchParams.get('toggle');
  const searchValue = searchParams.get('searchValue');
  const filter = searchParams.get('filter');
  const type = searchParams.get('type');

  const sampleCat = [
    { id: 0, desc: 'Зочид буудал' },
    { id: 1, desc: 'Гэст хаус' },
    { id: 2, desc: 'Амралтын газар' },
    { id: 3, desc: 'Рашаан сувилал' },
    { id: 4, desc: 'Жуулчны бааз' },
    { id: 5, desc: 'Айл' },
    { id: 6, desc: 'Ресорт' },
  ];
  const samplePrice = [
    { id: 7, min: 0, max: 100000 },
    { id: 8, min: 100000, max: 150000 },
    { id: 9, min: 150000, max: 200000 },
    { id: 10, min: 200000, max: 250000 },
    { id: 11, min: 250000, max: 0 },
  ];
  const sampleAdditional = [
    { id: 12, desc: 'Хими цэвэрлэгээ' },
    { id: 13, desc: 'Номын сан' },
    { id: 14, desc: 'Усан сан' },
    { id: 15, desc: 'Морь унах' },
    { id: 16, desc: 'Англи хэлтэй' },
    { id: 17, desc: 'Дугуй унах' },
    { id: 18, desc: 'Элсний волейбол' },
    { id: 19, desc: 'Дотоод аялал' },
  ];

  const colapseDuration = 700;
  const iconRotateDuration = 700;

  // console.log(state.showFilter);

  // const closeFilter = () => {
  //   document.getElementById('container')?.classList.remove('animate-fade500');
  //   document.getElementById('container')?.classList.add('animate-fadeOut300');

  //   setTimeout(() => {
  //     dispatch({ type: 'TOGGLE_FILTER', payload: '' });
  //   }, 300);
  // };
  let catVal: string[] = [];
  let priceVal = { min: 0, max: 0 };
  let addVal: string[] = [];
  if (filter === 'web')
    return (
      <div
        className="flex max-h-[300px] w-[85vw] animate-fade500 items-end"
        id="container"
      >
        <div className="flex h-[95%] w-full flex-col items-center gap-[8px] rounded-[20px] border border-black/20 bg-white px-[24px] py-[12px]">
          <div className="flex h-full w-full items-start justify-between gap-[24px]">
            {/* Categories */}
            <div className="flex h-full w-full flex-col items-center justify-start gap-[12px]">
              <p className="text-[18px] font-medium">
                {/* {state.language === 'mn' ? 'Төрөл' : 'Categories'} */}
                {lang === 'en' ? 'Categories' : 'Төрөл'}
              </p>
              <div className="grid w-full grid-cols-2 gap-[8px] text-[15px] text-sub-text">
                {sampleCat.map((index) => (
                  <form
                    key={index.id}
                    className="flex w-full items-center gap-[8px]"
                  >
                    <input
                      id={`${index.id}`}
                      type="radio"
                      className="h-[20px] w-[20px] rounded-[4px] border border-black/50 ring-0 focus:shadow-none focus:ring-0"
                    />
                    <label
                      onClick={() => {
                        document.getElementById(`${index.id}`)?.click();
                      }}
                    >
                      {index.desc}
                    </label>
                  </form>
                ))}
              </div>
            </div>
            {/* Price */}
            <div className="flex h-full w-[70%] flex-col items-center justify-start gap-[12px]">
              <p className="text-[18px] font-medium">
                {/* {state.language === 'mn' ? 'Үнэ' : 'Price'} */}
                {lang === 'en' ? 'Price' : 'Үнэ'}
              </p>
              <form
                className="grid w-full grid-cols-1 gap-[8px] text-[15px] text-sub-text"
                onChange={(e) => {
                  console.log(e);
                }}
              >
                {samplePrice.map((index) => (
                  <div
                    key={index.id}
                    className="flex w-full items-center gap-[8px]"
                  >
                    <input
                      id={`${index.id}`}
                      type="checkbox"
                      name="groupPriceCheckBox"
                      value={`min: ${index.min}, max: ${index.max}`}
                      className="h-[20px] w-[20px] rounded-[4px] border border-black/50 ring-0 focus:shadow-none focus:ring-0 "
                    />
                    <label
                      onClick={() => {
                        document.getElementById(`${index.id}`)?.click();
                      }}
                    >
                      {index.min.toLocaleString()}{' '}
                      {/* {state.language === 'mn' ? '₮' : '$'} */}
                      {lang === 'en' ? '$' : '₮'}
                      {index.max !== 0 ? '-' : null}{' '}
                      {index.max !== 0 ? (
                        index.max.toLocaleString()
                      ) : (
                        <span className="text-[18px]">+</span>
                      )}
                      {index.max !== 0 ? (lang === 'en' ? '$' : '₮') : null}
                    </label>
                  </div>
                ))}
              </form>
            </div>
            {/* Additional */}
            <div className="flex h-full w-full flex-col items-center justify-start gap-[12px]">
              <p className="text-[18px] font-medium">
                {/* {state.language === 'mn' ? 'Нэмэлтээр' : 'Additional'} */}
                {lang === 'en' ? 'Additional' : 'Нэмэлтээр'}
              </p>
              <div className="grid w-full grid-cols-2 gap-[8px] text-[15px] text-sub-text">
                {sampleAdditional.map((index) => (
                  <form
                    key={index.id}
                    className="flex w-full items-center gap-[8px]"
                  >
                    <input
                      id={`${index.id}`}
                      type="radio"
                      className="h-[20px] w-[20px] rounded-[4px] border border-black/50 ring-0 focus:shadow-none focus:ring-0"
                    />
                    <label
                      onClick={() => {
                        document.getElementById(`${index.id}`)?.click();
                      }}
                    >
                      {index.desc}
                    </label>
                  </form>
                ))}
              </div>
            </div>
          </div>
          {/* search Btn */}
          <Link
            href={{
              pathname: `${pathname}`,
              query: {
                lang: lang,
                searchValue: searchValue,
                toggle: toggle,
                filter: '',
                type: type,
              },
            }}
            scroll={false}
            className="flex max-w-[180px] items-center  justify-center self-end rounded-full bg-primary-blue px-[14px] py-[4px] text-[13px] font-medium uppercase text-white"
            // onClick={() => closeFilter()}
          >
            {/* {state.language === 'mn' ? 'Шүүх' : 'filter'} */}
            {lang === 'en' ? 'Filter' : 'Шүүх'}
          </Link>
        </div>
      </div>
    );
  else
    return (
      <div
        className="flex w-full animate-fade500 flex-col gap-[24px] px-[20px] sm:px-[50px] md:px-[72px]"
        id="container"
      >
        {/* category */}
        <div
          id="category"
          className={` over grid-rows-[repeat(2, minmax(40px, 1fr))] grid w-full gap-[20px] overflow-hidden rounded-[20px] px-[16px]  py-[8px] shadow-[0px_2px_12px_0px_rgb(0,0,0,0.15)] ${
            open === 'category'
              ? `h-[240px] rounded-[20px] pb-[16px]  duration-${colapseDuration}`
              : `h-[42px] rounded-[20px] duration-${colapseDuration}`
          } `}
          onClick={() => {
            if (open !== 'category') {
              setOpen('category');
            }
          }}
        >
          <div className="flex w-full items-center justify-between">
            <p className="text-[18px] font-medium text-sub-text">
              {/* {state.language === 'mn' ? 'Төрөл' : 'Category'} */}
              {lang === 'en' ? 'Category' : 'Төрөл'}
            </p>
            {/* spinning + Icon */}
            <div className="relative h-[24px] w-[24px] rounded-full bg-primary-blue/25">
              <div
                className={`absolute left-[50%] top-[50%] h-[3px] w-[18px] translate-x-[-50%] translate-y-[-50%] rounded-full bg-primary-blue ${
                  open === 'category'
                    ? `rotate-[360deg] duration-${iconRotateDuration}`
                    : `rotate-0 duration-${iconRotateDuration}`
                }`}
              ></div>
              <div
                className={`absolute left-[50%] top-[50%] h-[18px] w-[3px] translate-x-[-50%] translate-y-[-50%] rounded-full bg-primary-blue ${
                  open === 'category'
                    ? `rotate-[270deg] duration-${iconRotateDuration}`
                    : `rotate-0 duration-${iconRotateDuration}`
                }`}
              ></div>
            </div>
          </div>
          {/* inputs */}
          <form
            className={`grid-rows-${
              sampleCat.length / 2
            } grid h-auto w-full grid-cols-2 gap-[20px] text-[15px] font-medium text-sub-text ${
              open === 'category' ? '   animate-fade  duration-500' : ''
            }`}
          >
            {sampleCat.map((index) => (
              <div
                key={index.id}
                className="flex w-full items-center gap-[8px]"
              >
                <input
                  id={`${index.id}`}
                  type="checkbox"
                  value={index.desc}
                  onChange={(e) => {
                    console.log(index.id);
                    if (e.target.checked) {
                      setCat((prevCat) => {
                        // Use a callback to ensure that you are working with the latest state
                        const updatedCat = [...prevCat, e.target.value];

                        console.log(updatedCat);
                        return updatedCat; // Update the state
                      });
                    }
                  }}
                  className="h-[20px] w-[20px] rounded-[4px] border border-black/50 ring-0 focus:shadow-none focus:ring-0"
                />
                <label
                  onClick={() => {
                    document.getElementById(`${index.id}`)?.click();
                  }}
                >
                  {index.desc}
                </label>
              </div>
            ))}
          </form>
        </div>
        {/* price */}
        <div
          id="price"
          className={` over grid-rows-[repeat(2, minmax(40px, 1fr))] grid w-full gap-[20px] overflow-hidden rounded-[20px] px-[16px]  py-[8px] shadow-[0px_2px_12px_0px_rgb(0,0,0,0.15)] ${
            open === 'price'
              ? `h-[260px] rounded-[20px] pb-[16px]  duration-${colapseDuration}`
              : `h-[42px] rounded-[20px] duration-${colapseDuration}`
          } `}
          onClick={() => {
            if (open !== 'price') {
              setOpen('price');
            }
          }}
        >
          <div className="flex w-full items-center justify-between">
            <p className="text-[18px] font-medium text-sub-text">
              {/* {state.language === 'mn' ? 'Үнэ' : 'Price'} */}
              {lang === 'en' ? 'Price' : 'Үнэ'}
            </p>
            {/* spinning + Icon */}
            <div className="relative h-[24px] w-[24px] rounded-full bg-primary-blue/25">
              <div
                className={`absolute left-[50%] top-[50%] h-[3px] w-[18px] translate-x-[-50%] translate-y-[-50%] rounded-full bg-primary-blue ${
                  open === 'price'
                    ? `rotate-[360deg] duration-${iconRotateDuration}`
                    : `rotate-0 duration-${iconRotateDuration}`
                }`}
              ></div>
              <div
                className={`absolute left-[50%] top-[50%] h-[18px] w-[3px] translate-x-[-50%] translate-y-[-50%] rounded-full bg-primary-blue ${
                  open === 'price'
                    ? `rotate-[270deg] duration-${iconRotateDuration}`
                    : `rotate-0 duration-${iconRotateDuration}`
                }`}
              ></div>
            </div>
          </div>
          {/* inputs */}
          <div
            className={`grid-rows-${
              samplePrice.length / 2
            } grid h-auto w-full grid-cols-1 gap-[20px] text-[15px] font-medium text-sub-text ${
              open === 'price' ? '   animate-fade  duration-500' : ''
            }`}
          >
            {samplePrice.map((index) => (
              <form
                key={index.id}
                className="flex w-full items-center gap-[8px]"
              >
                <input
                  id={`${index.id}`}
                  type="radio"
                  name={'priceInput'}
                  value={`min: ${index.min}, max: ${index.max}`}
                  onChange={(e) => {
                    if (e.target.checked) {
                      console.log(e.target.value.split(','));
                      const updatedPrice = e.target.value.split(',');
                      const updatedPrice1 = parseInt(
                        updatedPrice[0].split(':')[1],
                      );
                      const updatedPrice2 = parseInt(
                        updatedPrice[1].split(':')[1],
                      );
                      setPrice(() => {
                        const finalPrice = {
                          min: updatedPrice1,
                          max: updatedPrice2,
                        };
                        dispatch({
                          type: 'SET_FILTERVALUE',
                          payload: {
                            category: catVal, // Use updatedCat here
                            price: finalPrice,
                            additional: addVal,
                          },
                        });
                        return finalPrice;
                      });

                      // setPrice(() => {
                      //   const updatedCat = [e.target.value];
                      //   dispatch({
                      //     type: 'SET_FILTERVALUE',
                      //     payload: {
                      //       category: updatedCat, // Use updatedCat here
                      //       price: priceVal,
                      //       additional: addVal,
                      //     },
                      //   });
                      //   return updatedCat; // Update the state
                      // });
                    }
                  }}
                  className="h-[20px] w-[20px] rounded-[4px] border border-black/50 ring-0 focus:shadow-none focus:ring-0 "
                />
                <label
                  onClick={() => {
                    document.getElementById(`${index.id}`)?.click();
                  }}
                >
                  {index.min.toLocaleString()}{' '}
                  {/* {state.language === 'mn' ? '₮' : '$'} */}
                  {lang === 'en' ? '$' : '₮'}
                  {index.max !== 0 ? '-' : null}{' '}
                  {index.max !== 0 ? (
                    index.max.toLocaleString()
                  ) : (
                    <span className="text-[18px]">+</span>
                  )}
                  {index.max !== 0 ? (lang === 'en' ? '$' : '₮') : null}
                </label>
              </form>
            ))}
          </div>
        </div>
        {/* additional */}
        <div
          id="additional"
          className={` over grid-rows-[repeat(2, minmax(40px, 1fr))] grid w-full gap-[20px] overflow-hidden rounded-[20px] px-[16px]  py-[8px] shadow-[0px_2px_12px_0px_rgb(0,0,0,0.15)] ${
            open === 'additional'
              ? `h-[260px] rounded-[20px] pb-[24px]  duration-${colapseDuration}`
              : `h-[42px] rounded-[20px] duration-${colapseDuration}`
          } `}
          onClick={() => {
            if (open !== 'additional') {
              setOpen('additional');
            }
          }}
        >
          <div className="flex w-full items-center justify-between">
            <p className="text-[18px] font-medium text-sub-text">
              {/* {state.language === 'mn' ? 'Нэмэлтээр' : 'Additional'} */}
              {lang === 'en' ? 'Additional' : 'Нэмэлтээр'}
            </p>
            {/* spinning + Icon */}
            <div className="relative h-[24px] w-[24px] rounded-full bg-primary-blue/25">
              <div
                className={`absolute left-[50%] top-[50%] h-[3px] w-[18px] translate-x-[-50%] translate-y-[-50%] rounded-full bg-primary-blue ${
                  open === 'additional'
                    ? `rotate-[360deg] duration-${iconRotateDuration}`
                    : `rotate-0 duration-${iconRotateDuration}`
                }`}
              ></div>
              <div
                className={`absolute left-[50%] top-[50%] h-[18px] w-[3px] translate-x-[-50%] translate-y-[-50%] rounded-full bg-primary-blue ${
                  open === 'additional'
                    ? `rotate-[270deg] duration-${iconRotateDuration}`
                    : `rotate-0 duration-${iconRotateDuration}`
                }`}
              ></div>
            </div>
          </div>
          {/* inputs */}
          <div
            className={`grid-rows-${
              sampleAdditional.length / 2
            } grid h-auto w-full grid-cols-2 gap-[20px] text-[15px] font-medium text-sub-text ${
              open === 'additional' ? '   animate-fade  duration-500' : ''
            }`}
          >
            {sampleAdditional.map((index) => (
              <form
                key={index.id}
                className="flex w-full items-center gap-[8px]"
              >
                <input
                  type="checkbox"
                  id={`${index.id}`}
                  value={index.desc}
                  className="h-[20px] w-[20px] rounded-[4px] border border-black/50 ring-0 focus:shadow-none focus:ring-0"
                />
                <label
                  onClick={() => {
                    document.getElementById(`${index.id}`)?.click();
                  }}
                >
                  {index.desc}
                </label>
              </form>
            ))}
          </div>
        </div>

        <Link
          href={{
            pathname: `${pathname}`,
            query: {
              lang: lang,
              searchValue: searchValue,
              toggle: toggle,
              filter: '',
              type: type,
            },
          }}
          scroll={false}
          // href={{
          //   pathname: '/search',
          //   query: {
          //     category: catVal,
          //     price: priceVal,
          //     additional: addVal,
          //   }, // the data
          // }}
          className="flex min-h-[40px] w-auto min-w-[90px] items-center justify-center self-center rounded-full bg-primary-blue px-[12px] pt-[2px] text-[16px] font-medium uppercase tracking-wider text-white"
          // onClick={() => {
          //   closeFilter();

          //   // console.log(state.filterValue);

          //   // setTimeout(() => {
          //   //   console.log(state.filterValue);
          //   // }, 1000);
          // }}
        >
          {/* {state.language === 'mn' ? 'Шүүх' : 'Filter'} */}
          {lang === 'en' ? 'Filter' : 'Шүүх'}
        </Link>
      </div>
    );
};

export default OldFilter;
