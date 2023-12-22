import { Collapse, useDisclosure, Button } from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

interface Props {
  iconRotateDuration: number;
  data: SearchData.HotelServices[];
  value: string;
  changeValue: (e: string) => void;
  ver: string;
}
export default function ServiceFilter({
  iconRotateDuration,
  data,
  value,
  changeValue,
  ver,
}: Props) {
  const { isOpen, onToggle } = useDisclosure();
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');
  const services = searchParams.get('services');

  useEffect(() => {
    if (services) {
      onToggle();
    }
  }, [services]);

  if (ver === 'web')
    return (
      <div className='flex h-full w-full flex-col items-center justify-start gap-[12px]'>
        <p className='text-[18px] font-medium'>
          {lang === 'en' ? 'Additional' : 'Нэмэлтээр'}
        </p>
        <div className='grid w-full grid-cols-2 gap-[8px] text-[15px] text-sub-text'>
          {data.map((index, i) => (
            <div
              onClick={() => changeValue(`"${index.id}"`)}
              key={i}
              id='additionalLink'
              className='flex w-full items-center gap-[8px]'
            >
              <input
                id={`serv${index.id}`}
                type='checkBox'
                value={index.name}
                checked={value.split(',').includes(`"${index.id}"`)}
                readOnly
                className='h-[20px] w-[20px] rounded-[4px] border border-black/50 ring-0 focus:shadow-none focus:ring-0 '
              />
              <label
                className='text-[14px] leading-[16px]'
                onClick={() => {
                  document.getElementById(`${index.id}`)?.click();
                }}
              >
                {index.name}
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  return (
    <div
      className='flex h-auto w-full flex-col rounded-[20px] px-[20px] shadow-[0px_0px_12px_2px_rgb(0,0,0,0.15)]'
      tabIndex={999}
    >
      <Button
        onClick={onToggle}
        className='!m-0 flex h-[41px] w-full items-center !justify-between sm:h-[46px]'
      >
        <p className='text-[18px] font-medium text-sub-text'>
          {lang === 'en' ? 'Additional' : 'Нэмэлтээр'}
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
        className={` !grid h-auto w-full  grid-cols-2  !gap-[20px] text-[15px] font-medium text-sub-text sm:!gap-[20px]  ${
          isOpen === true ? '!mt-[8px] !pb-[16px] sm:pb-[20px]' : 'h-0'
        }`}
      >
        {data.map((index, i) => (
          <div
            onClick={() => changeValue(`"${index.id}"`)}
            key={i}
            id='additionalLink'
            className='flex w-full items-center gap-[8px]'
          >
            <input
              id={`serv${index.id}`}
              type='checkBox'
              value={index.name}
              checked={value.split(',').includes(`"${index.id}"`)}
              readOnly
              className='h-[20px] w-[20px] rounded-[4px] border border-black/50 ring-0 focus:shadow-none focus:ring-0 '
            />
            <label className='text-[14px] leading-[16px]'>{index.name}</label>
          </div>
        ))}
      </Collapse>
    </div>
  );
}
