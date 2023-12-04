import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';

const FilterOptions = () => {
  // searchParams
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');
  const filter = searchParams.get('filter');
  const catVal = searchParams.get('catVal');
  const minVal = searchParams.get('minVal');
  const maxVal = searchParams.get('maxVal');
  const additionalVal = searchParams.getAll('additionalVal');
  const router = useRouter();

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

  const createAdditionalQueryString = (
    name: string,
    value: string | null,
    name1: string,
    value1: string | null,
    name2: string,
    value2: string | null,
  ) => {
    const params = new URLSearchParams(searchParams);
    if (value !== null && !params.get(name)) {
      params.set(name, value);
    } else if (value !== null && params.get(name)) {
      if (additionalVal.includes(value)) {
        for (let i = 0; i < additionalVal.length; i++) {
          if (additionalVal[i] === value) {
            params.delete(name, additionalVal[i]);
          }
        }
      } else {
        params.append(name, value);
      }
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
  const [open, setOpen] = useState('category');
  // Animation durations
  const colapseDuration = 700;
  const iconRotateDuration = 700;

  if (filter === 'webFilter')
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
                {lang === 'en' ? 'Categories' : 'Төрөл'}
              </p>
              <div className="grid w-full grid-cols-2 gap-[8px] text-[15px] text-sub-text">
                {sampleCat.map((index) => (
                  <div
                    onClick={() => {
                      router.replace(
                        `/search/?${createAdditionalQueryString(
                          'null',
                          null,
                          'catVal',
                          index.desc,
                          'null',
                          null,
                        )}`,
                        { scroll: false },
                      );
                    }}
                    key={index.id}
                    className="flex w-full items-center gap-[8px]"
                  >
                    <input
                      id={`${index.id}`}
                      type="checkbox"
                      readOnly
                      value={index.desc}
                      checked={index.desc === catVal}
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
              </div>
            </div>
            {/* Price */}
            <div className="flex h-full w-[70%] flex-col items-center justify-start gap-[12px]">
              <p className="text-[18px] font-medium">
                {lang === 'en' ? 'Price' : 'Үнэ'}
              </p>
              <div className="grid w-full grid-cols-1 gap-[8px] text-[15px] text-sub-text">
                {samplePrice.map((index) => (
                  <div
                    onClick={() => {
                      router.replace(
                        `/search/?${createAdditionalQueryString(
                          'null',
                          null,
                          'minVal',
                          index.min.toString(),
                          'maxVal',
                          index.max.toString(),
                        )}`,
                        { scroll: false },
                      );
                    }}
                    key={index.id}
                    className="flex w-full items-center gap-[8px]"
                  >
                    <input
                      id={`${index.id}`}
                      type="checkBox"
                      value={index.max}
                      checked={
                        `${index.min}` === minVal && `${index.max}` === maxVal
                      }
                      readOnly
                      className="h-[20px] w-[20px] rounded-[4px] border border-black/50 ring-0 focus:shadow-none focus:ring-0 "
                    />
                    <label
                      onClick={() => {
                        document.getElementById(`${index.id}`)?.click();
                      }}
                    >
                      {index.min.toLocaleString()} {lang === 'en' ? '$' : '₮'}
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
              </div>
            </div>
            {/* Additional */}
            <div className="flex h-full w-full flex-col items-center justify-start gap-[12px]">
              <p className="text-[18px] font-medium">
                {lang === 'en' ? 'Additional' : 'Нэмэлтээр'}
              </p>
              <div className="grid w-full grid-cols-2 gap-[8px] text-[15px] text-sub-text">
                {sampleAdditional.map((index) => (
                  <div
                    onClick={() => {
                      router.replace(
                        `/search/?${createAdditionalQueryString(
                          'additionalVal',
                          index.desc,
                          'null',
                          null,
                          'null',
                          null,
                        )}`,
                        { scroll: false },
                      );
                      // console.log(additionalVal);
                    }}
                    key={index.id}
                    id="additionalLink"
                    className="flex w-full items-center gap-[8px]"
                  >
                    <input
                      id={`${index.id}`}
                      type="checkBox"
                      value={index.desc}
                      checked={additionalVal.includes(index.desc)}
                      readOnly
                      className="h-[20px] w-[20px] rounded-[4px] border border-black/50 ring-0 focus:shadow-none focus:ring-0 "
                    />
                    <label
                      className="text-[14px] leading-[16px]"
                      onClick={() => {
                        document.getElementById(`${index.id}`)?.click();
                      }}
                    >
                      {index.desc}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* search Btn */}
          <div
            onClick={() => {
              router.replace(
                `/search/?${createAdditionalQueryString(
                  'null',
                  null,
                  'filter',
                  'on',
                  'null',
                  null,
                )}`,
                { scroll: false },
              );
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
        className="flex w-full animate-fade500 flex-col gap-[24px] px-[20px] sm:px-[50px] md:px-[72px]"
        id="container"
      >
        {/* category */}
        <div
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
          {/* title section */}
          <div className="flex w-full items-center justify-between">
            <p className="text-[18px] font-medium text-sub-text">
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
          <div
            className={`grid-rows-${
              sampleCat.length / 2
            } grid h-auto w-full grid-cols-2 gap-[20px] text-[15px] font-medium text-sub-text ${
              open === 'category' ? '   animate-fade  duration-500' : ''
            }`}
          >
            {sampleCat.map((index) => (
              <div
                onClick={() => {
                  router.replace(
                    `/search/?${createAdditionalQueryString(
                      'null',
                      null,
                      'catVal',
                      index.desc,
                      'null',
                      null,
                    )}`,
                    { scroll: false },
                  );
                }}
                key={index.id}
                className="flex w-full items-center gap-[8px]"
              >
                <input
                  id={`${index.id}`}
                  type="checkbox"
                  readOnly
                  value={index.desc}
                  checked={index.desc === catVal}
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
          </div>
        </div>
        {/* price */}
        <div
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
          {/* title section */}
          <div className="flex w-full items-center justify-between">
            <p className="text-[18px] font-medium text-sub-text">
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
              <div
                onClick={() => {
                  router.replace(
                    `/search/?${createAdditionalQueryString(
                      'null',
                      null,
                      'minVal',
                      index.min.toString(),
                      'maxVal',
                      index.max.toString(),
                    )}`,
                    { scroll: false },
                  );
                }}
                key={index.id}
                className="flex w-full items-center gap-[8px]"
              >
                <input
                  id={`${index.id}`}
                  type="checkBox"
                  value={index.max}
                  checked={
                    `${index.min}` === minVal && `${index.max}` === maxVal
                  }
                  readOnly
                  className="h-[20px] w-[20px] rounded-[4px] border border-black/50 ring-0 focus:shadow-none focus:ring-0 "
                />
                <label
                  onClick={() => {
                    document.getElementById(`${index.id}`)?.click();
                  }}
                >
                  {index.min.toLocaleString()} {lang === 'en' ? '$' : '₮'}
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
          </div>
        </div>
        {/* additional */}
        <div
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
          {/* title section */}
          <div className="flex w-full items-center justify-between">
            <p className="text-[18px] font-medium text-sub-text">
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
              <div
                onClick={() => {
                  router.replace(
                    `/search/?${createAdditionalQueryString(
                      'additionalVal',
                      index.desc,
                      'null',
                      null,
                      'null',
                      null,
                    )}`,
                    { scroll: false },
                  );
                  // console.log(additionalVal)
                }}
                key={index.id}
                id="additionalLink"
                className="flex w-full items-center gap-[8px]"
              >
                <input
                  id={`${index.id}`}
                  type="checkBox"
                  value={index.desc}
                  checked={additionalVal.includes(index.desc)}
                  readOnly
                  className="h-[20px] w-[20px] rounded-[4px] border border-black/50 ring-0 focus:shadow-none focus:ring-0 "
                />
                <label
                  className="text-[14px] leading-[16px]"
                  onClick={() => {
                    document.getElementById(`${index.id}`)?.click();
                  }}
                >
                  {index.desc}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div
          onClick={() => {
            router.replace(
              `/search/?${createAdditionalQueryString(
                'null',
                null,
                'filter',
                'on',
                'null',
                null,
              )}`,
              { scroll: false },
            );
          }}
          className="flex min-h-[40px] w-auto min-w-[90px] items-center justify-center self-center rounded-full bg-primary-blue px-[12px] pt-[2px] text-[16px] font-medium uppercase tracking-wider text-white"
        >
          {lang === 'en' ? 'Filter' : 'Шүүх'}
        </div>
      </div>
    );
};

export default FilterOptions;
