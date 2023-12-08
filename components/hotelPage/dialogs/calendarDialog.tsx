import { useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { addDays } from 'date-fns';
import { DateRange, DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useAppCtx } from '@/contexts/app';

const newDate = new Date();
const date = newDate.getDate();
const month = newDate.getMonth() + 1;
const year = newDate.getFullYear();

interface Props {
  ver: string;
}

export default function CalendarDialog({ ver }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const lang = searchParams.get('lang');
  const dateFrom = searchParams.get('dateFrom');
  const dateTo = searchParams.get('dateTo');
  const days = searchParams.get('days');
  const { dispatch } = useAppCtx();

  const pathname = usePathname();
  const pastMonth = new Date(
    year,
    (!dateFrom && !dateTo
      ? month
      : parseInt(dateFrom ? dateFrom?.split('|')[0].split('/')[0] : '0')) - 1,
    !dateFrom && !dateTo
      ? date
      : parseInt(dateFrom ? dateFrom?.split('|')[0].split('/')[1] : '0'),
  );
  const defaultSelected: DateRange = {
    from: pastMonth,
    to: addDays(pastMonth, days !== null ? parseInt(days) : 1),
  };

  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);
  const multipleCreateQueryString = (
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

  if (ver === 'mobile')
    return (
      <div
        className={`relative flex h-[90vh] w-full flex-col  items-center justify-start rounded-t-[30px] bg-white pt-[24px] shadow-[0px_0px_12px_2px_rgb(0,0,0,0.25)] sm:px-[32px]`}
      >
        <div
          className='absolute right-[16px] top-[16px] text-primary-blue'
          onClick={() => {
            dispatch({
              type: 'CHANGE_APP_STATE',
              payload: {
                calendar: '',
              },
            });
          }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.75}
            stroke='currentColor'
            className='max-h-[30px] min-h-[30px] min-w-[30px] max-w-[30px]'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </div>

        <DayPicker
          id='test'
          mode='range'
          defaultMonth={pastMonth}
          selected={range}
          // footer={footer}
          onSelect={setRange}
          numberOfMonths={2}
          // fromDate={new Date()}
          // components={{ Row: OnlyFutureRow }}
          // hidden={isPastDate}
          showOutsideDays
          style={{
            width: '76%',
            maxHeight: '100%',
            borderRadius: '16px',
            border: '1px solid rgb(0,0,0,0.15)',
            padding: '8px',
            overflow: 'hidden',
          }}
        />
        <div
          className='flex max-w-[150px] items-center justify-center rounded-full bg-primary-blue px-[16px] py-[10px] text-[14px] font-medium uppercase text-white'
          onClick={() => {
            if (range?.from && range.to) {
              router.replace(
                `${pathname}/?${multipleCreateQueryString(
                  'dateFrom',
                  `${range?.from?.toLocaleDateString()}|${range?.from
                    ?.toDateString()
                    .split(' ')[1]}-${range?.from
                    ?.toDateString()
                    .split(' ')[2]}-${range?.from
                    ?.toDateString()
                    .split(' ')[3]}`,
                  'dateTo',
                  `${range?.to?.toLocaleDateString()}|${range?.to
                    ?.toDateString()
                    .split(' ')[1]}-${range?.to
                    ?.toDateString()
                    .split(' ')[2]}-${range?.to?.toDateString().split(' ')[3]}`,
                  'days',
                  `${
                    (range?.to?.getTime() - range?.from?.getTime()) /
                    (1000 * 3600 * 24)
                  }`,
                  '',
                  null,
                )}`,
                { scroll: false },
              );
              dispatch({
                type: 'CHANGE_APP_STATE',
                payload: {
                  calendar: '',
                },
              });
            }
          }}
        >
          {lang === 'en' ? 'Allow' : 'Зөвшөөрөх'}
        </div>
      </div>
    );
  return (
    <div
      className={`relative flex h-full w-full flex-col items-center justify-start rounded-[20px] bg-white pt-[24px] shadow-[0px_0px_12px_2px_rgb(0,0,0,0.25)] sm:px-[32px] lg:justify-center lg:pb-[16px]`}
    >
      <div
        className='absolute right-[10px] top-[10px] text-primary-blue'
        onClick={() => {
          dispatch({
            type: 'CHANGE_APP_STATE',
            payload: {
              calendar: '',
            },
          });
        }}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.75}
          stroke='currentColor'
          className='max-h-[30px] min-h-[30px] min-w-[30px] max-w-[30px]'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M6 18L18 6M6 6l12 12'
          />
        </svg>
      </div>

      <DayPicker
        id='test'
        mode='range'
        defaultMonth={range ? range.from : pastMonth}
        selected={range}
        onSelect={setRange}
        numberOfMonths={2}
        showOutsideDays
        style={{
          width: '100%',
          maxHeight: '100%',
          borderRadius: '16px',
          justifyContent: 'center',
          border: '1px solid rgb(0,0,0,0.15)',
          padding: '8px',
          overflow: 'hidden',
        }}
      />
      <div
        className='flex max-w-[150px] items-center justify-center rounded-full bg-primary-blue px-[16px] py-[10px] text-[14px] font-medium uppercase text-white'
        onClick={() => {
          if (range?.from && range.to) {
            router.replace(
              `${pathname}/?${multipleCreateQueryString(
                'dateFrom',
                `${range?.from?.toLocaleDateString()}|${range?.from
                  ?.toDateString()
                  .split(' ')[1]}-${range?.from
                  ?.toDateString()
                  .split(' ')[2]}-${range?.from?.toDateString().split(' ')[3]}`,
                'dateTo',
                `${range?.to?.toLocaleDateString()}|${range?.to
                  ?.toDateString()
                  .split(' ')[1]}-${range?.to
                  ?.toDateString()
                  .split(' ')[2]}-${range?.to?.toDateString().split(' ')[3]}`,
                'days',
                `${
                  (range?.to?.getTime() - range?.from?.getTime()) /
                  (1000 * 3600 * 24)
                }`,
                '',
                null,
              )}`,
              { scroll: false },
            );
            dispatch({
              type: 'CHANGE_APP_STATE',
              payload: {
                calendar: '',
              },
            });
          }
        }}
      >
        {lang === 'en' ? 'Allow' : 'Зөвшөөрөх'}
      </div>
    </div>
  );
}
