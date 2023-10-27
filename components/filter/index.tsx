import React from 'react';
import { useState } from 'react';
import { useAppState } from '@/contexts/appStateContext';

const Filter = () => {
  // const { appState, dispatch } = useAppCtx();
  const { state, dispatch } = useAppState();
  const [open, setOpen] = useState('category');
  const [cat, setCat] = useState({ id: 0, desc: '' });
  const [price, setPrice] = useState({ id: 0, min: 0, max: 0 });
  const [additional, setAdditional] = useState({ id: 0, desc: '' });

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

  const closeFilter = () => {
    dispatch({ type: 'TOGGLE_FILTER', payload: false });
  };

  return (
    <div className="flex w-full flex-col gap-[24px] px-[20px] sm:px-[50px] md:px-[72px]">
      <div
        id="category"
        className={` over grid-rows-[repeat(2, minmax(40px, 1fr))] grid w-full gap-[20px] overflow-hidden rounded-[20px] px-[16px]  py-[8px] shadow-[0px_2px_12px_0px_rgb(0,0,0,0.15)] ${
          open === 'category'
            ? ' h-[240px] rounded-[20px] pb-[16px]  duration-1000'
            : '  h-[42px] rounded-[20px] duration-1000'
        } `}
        onClick={() => {
          if (open !== 'category') {
            setOpen('category');
          }
        }}
      >
        <div className="flex w-full items-center justify-between">
          <p className="text-[18px] font-medium text-sub-text">
            {state.language === 'mn' ? 'Төрөл' : 'Category'}
          </p>
          <div className="relative h-[24px] w-[24px] rounded-full bg-primary-blue/25">
            <div
              className={`absolute left-[50%] top-[50%] h-[3px] w-[18px] translate-x-[-50%] translate-y-[-50%] rounded-full bg-primary-blue ${
                open === 'category'
                  ? 'rotate-[360deg] duration-1000'
                  : ' rotate-0 duration-1000'
              }`}
            ></div>
            <div
              className={`absolute left-[50%] top-[50%] h-[18px] w-[3px] translate-x-[-50%] translate-y-[-50%] rounded-full bg-primary-blue ${
                open === 'category'
                  ? 'rotate-[270deg] duration-1000'
                  : ' rotate-0 duration-1000'
              }`}
            ></div>
          </div>
        </div>
        <div
          className={`grid-rows-${
            sampleCat.length / 2
          } grid h-auto w-full grid-cols-2 gap-[20px] text-[15px] font-medium text-sub-text ${
            open === 'category' ? '   animate-fade  duration-500' : ''
          }`}
        >
          {sampleCat.map((index) => (
            <div key={index.id} className="flex w-full items-center gap-[8px]">
              <input
                id={`${index.id}`}
                type="radio"
                className="h-[20px] w-[20px] rounded-[4px] border border-black/50 ring-0 focus:border-none focus:shadow-none focus:ring-0"
              />
              <label>{index.desc}</label>
            </div>
          ))}
        </div>
      </div>
      <div
        id="price"
        className={` over grid-rows-[repeat(2, minmax(40px, 1fr))] grid w-full gap-[20px] overflow-hidden rounded-[20px] px-[16px]  py-[8px] shadow-[0px_2px_12px_0px_rgb(0,0,0,0.15)] ${
          open === 'price'
            ? ' h-[260px] rounded-[20px] pb-[16px]  duration-1000'
            : '  h-[42px] rounded-[20px] duration-1000'
        } `}
        onClick={() => {
          if (open !== 'price') {
            setOpen('price');
          }
        }}
      >
        <div className="flex w-full items-center justify-between">
          <p className="text-[18px] font-medium text-sub-text">
            {state.language === 'mn' ? 'Үнэ' : 'Price'}
          </p>
          <div className="relative h-[24px] w-[24px] rounded-full bg-primary-blue/25">
            <div
              className={`absolute left-[50%] top-[50%] h-[3px] w-[18px] translate-x-[-50%] translate-y-[-50%] rounded-full bg-primary-blue ${
                open === 'price'
                  ? 'rotate-[360deg] duration-1000'
                  : ' rotate-0 duration-1000'
              }`}
            ></div>
            <div
              className={`absolute left-[50%] top-[50%] h-[18px] w-[3px] translate-x-[-50%] translate-y-[-50%] rounded-full bg-primary-blue ${
                open === 'price'
                  ? 'rotate-[270deg] duration-1000'
                  : ' rotate-0 duration-1000'
              }`}
            ></div>
          </div>
        </div>
        <div
          className={`grid-rows-${
            samplePrice.length / 2
          } grid h-auto w-full grid-cols-1 gap-[20px] text-[15px] font-medium text-sub-text ${
            open === 'price' ? '   animate-fade  duration-500' : ''
          }`}
        >
          {samplePrice.map((index) => (
            <div key={index.id} className="flex w-full items-center gap-[8px]">
              <input
                id={`${index.id}`}
                type="radio"
                name="priceRadio"
                className="h-[20px] w-[20px] rounded-[4px] border border-black/50 ring-0 focus:border-none focus:shadow-none focus:ring-0 "
              />
              <label>
                {index.min.toLocaleString()}{' '}
                {state.language === 'mn' ? '₮' : '$'}{' '}
                {index.max !== 0 ? '-' : null}{' '}
                {index.max !== 0 ? (
                  index.max.toLocaleString()
                ) : (
                  <span className="text-[18px]">+</span>
                )}
                {index.max !== 0 ? (state.language === 'mn' ? '₮' : '$') : null}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div
        id="additional"
        className={` over grid-rows-[repeat(2, minmax(40px, 1fr))] grid w-full gap-[20px] overflow-hidden rounded-[20px] px-[16px]  py-[8px] shadow-[0px_2px_12px_0px_rgb(0,0,0,0.15)] ${
          open === 'additional'
            ? ' h-[260px] rounded-[20px] pb-[24px]  duration-1000'
            : '  h-[42px] rounded-[20px] duration-1000'
        } `}
        onClick={() => {
          if (open !== 'additional') {
            setOpen('additional');
          }
        }}
      >
        <div className="flex w-full items-center justify-between">
          <p className="text-[18px] font-medium text-sub-text">
            {state.language === 'mn' ? 'Нэмэлтээр' : 'Additional'}
          </p>
          <div className="relative h-[24px] w-[24px] rounded-full bg-primary-blue/25">
            <div
              className={`absolute left-[50%] top-[50%] h-[3px] w-[18px] translate-x-[-50%] translate-y-[-50%] rounded-full bg-primary-blue ${
                open === 'additional'
                  ? 'rotate-[360deg] duration-1000'
                  : ' rotate-0 duration-1000'
              }`}
            ></div>
            <div
              className={`absolute left-[50%] top-[50%] h-[18px] w-[3px] translate-x-[-50%] translate-y-[-50%] rounded-full bg-primary-blue ${
                open === 'additional'
                  ? 'rotate-[270deg] duration-1000'
                  : ' rotate-0 duration-1000'
              }`}
            ></div>
          </div>
        </div>
        <div
          className={`grid-rows-${
            sampleAdditional.length / 2
          } grid h-auto w-full grid-cols-2 gap-[20px] text-[15px] font-medium text-sub-text ${
            open === 'additional' ? '   animate-fade  duration-500' : ''
          }`}
        >
          {sampleAdditional.map((index) => (
            <div key={index.id} className="flex w-full items-center gap-[8px]">
              <input
                type="radio"
                className="h-[20px] w-[20px] rounded-[4px] border border-black/50 ring-0 focus:border-none focus:shadow-none focus:ring-0"
              />
              <p>{index.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <p
        className="flex h-[42px] w-auto min-w-[120px] items-center justify-center self-center rounded-full bg-primary-blue px-[16px] text-[16px] font-medium uppercase text-white"
        onClick={() => closeFilter()}
      >
        {state.language === 'mn' ? 'Хайх' : 'Search'}
      </p>
    </div>
  );
};

export default Filter;
