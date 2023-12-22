import { Collapse, useDisclosure, Button } from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

interface Props {
  iconRotateDuration: number;
  data: { id: number; min: number; max: number }[];
  value: { id: number; min: number; max: number } | null;
  changeValue: (e: { id: number; min: number; max: number }) => void;
  ver: string;
}
export default function PriceFilter({
  iconRotateDuration,
  data,
  value,
  changeValue,
  ver,
}: Props) {
  const { isOpen, onToggle } = useDisclosure();
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');
  const min = searchParams.get('min');
  const max = searchParams.get('max');

  useEffect(() => {
    if (min && max) {
      onToggle();
    }
  }, [min && max]);

  if (ver === 'web')
    return (
      <div className='flex h-full w-[70%] flex-col items-center justify-start gap-[12px]'>
        <p className='text-[18px] font-medium'>
          {lang === 'en' ? 'Price' : 'Үнэ'}
        </p>
        <div className='grid w-full grid-cols-1 gap-[8px] text-[15px] text-sub-text'>
          {data.map((index, i) => (
            <div
              onClick={() => changeValue(index)}
              key={i}
              className='flex w-full items-center gap-[8px]'
            >
              <input
                id={`price${index.id}`}
                type='checkBox'
                value={index.max}
                checked={value && index.id === value.id ? true : false}
                readOnly
                className='h-[20px] w-[20px] rounded-[4px] border border-black/50 ring-0 focus:shadow-none focus:ring-0 '
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
                  <span className='text-[18px]'>+</span>
                )}
                {index.max !== 0 ? (lang === 'en' ? '$' : '₮') : null}
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  return (
    <div className='flex h-auto w-full flex-col rounded-[20px] px-[20px] shadow-[0px_0px_12px_2px_rgb(0,0,0,0.15)]'>
      <Button
        onClick={onToggle}
        className='!m-0 flex h-[41px] w-full items-center !justify-between sm:h-[46px]'
      >
        <p className='text-[18px] font-medium text-sub-text'>
          {lang === 'en' ? 'Price' : 'Үнэ'}
        </p>
        {/* spinning + Icon */}
        <div className='relative h-[24px] w-[24px] rounded-full bg-primary-blue/25'>
          <div
            className={`absolute left-[50%] top-[50%] h-[3px] w-[18px] translate-x-[-50%] translate-y-[-50%] rounded-full bg-primary-blue ${
              isOpen === true
                ? `rotate-[360deg] duration-${iconRotateDuration}`
                : `rotate-0 duration-${iconRotateDuration}`
            }`}
          ></div>
          <div
            className={`absolute left-[50%] top-[50%] h-[18px] w-[3px] translate-x-[-50%] translate-y-[-50%] rounded-full bg-primary-blue ${
              isOpen === true
                ? `rotate-[270deg] duration-${iconRotateDuration}`
                : `rotate-0 duration-${iconRotateDuration}`
            }`}
          ></div>
        </div>
      </Button>
      <Collapse
        in={isOpen}
        animateOpacity
        className={` !grid h-auto w-full !gap-[20px] text-[15px] font-medium text-sub-text sm:!gap-[20px]  ${
          isOpen === true ? '!mt-[8px] !pb-[16px] sm:pb-[20px]' : 'h-0'
        }`}
      >
        {data.map((index, i) => (
          <div
            onClick={() => changeValue(index)}
            key={i}
            className='flex w-full items-center gap-[8px]'
          >
            <input
              id={`price${index.id}`}
              type='checkBox'
              value={index.max}
              checked={
                value && index.min === value.min && index.max === value.max
                  ? true
                  : false
              }
              readOnly
              className='h-[20px] w-[20px] rounded-[4px] border border-black/50 ring-0 focus:shadow-none focus:ring-0 '
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
                <span className='text-[18px]'>+</span>
              )}
              {index.max !== 0 ? (lang === 'en' ? '$' : '₮') : null}
            </label>
          </div>
        ))}
      </Collapse>
    </div>
  );
}
