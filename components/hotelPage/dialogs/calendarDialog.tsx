import {useState, useCallback,useRef} from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { addDays, format } from 'date-fns';
import {
  DateRange,
  DayPicker,
  ClassNames,
  Row,
  RowProps,
} from 'react-day-picker';
import 'react-day-picker/dist/style.css';

let newDate = new Date();
let date = newDate.getDate();
let month = newDate.getMonth() + 1;
let year = newDate.getFullYear();

interface Props{
  ver: string
}


export default function CalendarDialog({ver}:Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const lang = searchParams.get('lang')
  const dateFrom = searchParams.get('dateFrom');
  const dateTo = searchParams.get('dateTo');
const pastMonth = new Date(
  year,
  (!dateFrom && !dateTo
    ? month
    : parseInt(dateFrom ? dateFrom?.split('|')[0].split('/')[0] : '0')) - 1,
  !dateFrom && !dateTo
    ? date
    : parseInt(dateFrom ? dateFrom?.split('|')[0].split('/')[1] : '0'),
);
  const [startDate, setStartDate] = useState(new Date());
  const defaultSelected: DateRange = {
    from: pastMonth,
    to: addDays(
      pastMonth,
      !dateFrom && !dateTo
        ? 1
        : parseInt(
            dateFrom && dateTo
              ? `${
                  parseInt(dateTo?.split('|')[0].split('/')[1]) -
                  parseInt(dateFrom?.split('|')[0].split('/')[1])
                }`
              : '0',
          ),
    ),
  };



  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);
const createQueryString = useCallback(
  (name: string, value: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (value !== null) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    return params.toString();
  },
  [searchParams],
);
const multipleCreateQueryString = useCallback(
  (
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
  },
  [searchParams],
);
// if(range && range.to && range.from){
// console.log(
//   (range?.to?.getTime() - range?.from?.getTime()) / (1000 * 3600 * 24),
// );
// }
if(ver === 'mobile')
  return (
    <div
      className={`relative flex h-[90vh] w-full flex-col  items-center justify-start rounded-t-[30px] bg-white pt-[24px] shadow-[0px_0px_12px_2px_rgb(0,0,0,0.25)] sm:px-[32px]`}
    >
      <div
        className="absolute right-[16px] top-[16px] text-primary-blue"
        onClick={() => {
          router.push(`/hotel/?${createQueryString('calendar', null)}`);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.75}
          stroke="currentColor"
          className="max-h-[30px] min-h-[30px] min-w-[30px] max-w-[30px]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>

      <DayPicker
        id="test"
        mode="range"
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
        className="flex max-w-[150px] items-center justify-center rounded-full bg-primary-blue px-[16px] py-[10px] text-[14px] font-medium uppercase text-white"
        onClick={() => {
          if (range?.from && range.to) {
            router.push(
              `/hotel/?${multipleCreateQueryString(
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
                'calendar',
                null,
              )}`,
              { scroll: false },
            );
          }
        }}
        // range?.from?.toDateString().split(' ')[1]
      >
        {lang === 'en' ? 'Allow' : 'Зөвшөөрөх'}
      </div>
    </div>
  );
 return (
   <div
     className={`relative flex w-full flex-col h-full items-center justify-start lg:justify-center rounded-[20px] bg-white pt-[24px] shadow-[0px_0px_12px_2px_rgb(0,0,0,0.25)] sm:px-[32px] lg:pb-[16px]`}
   >
     <div
       className="absolute right-[10px] top-[10px] text-primary-blue"
       onClick={() => {
         router.push(`/hotel/?${createQueryString('calendar', null)}`);
       }}
     >
       <svg
         xmlns="http://www.w3.org/2000/svg"
         fill="none"
         viewBox="0 0 24 24"
         strokeWidth={1.75}
         stroke="currentColor"
         className="max-h-[30px] min-h-[30px] min-w-[30px] max-w-[30px]"
       >
         <path
           strokeLinecap="round"
           strokeLinejoin="round"
           d="M6 18L18 6M6 6l12 12"
         />
       </svg>
     </div>

     <DayPicker
       id="test"
       mode="range"
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
       className="flex max-w-[150px] items-center justify-center rounded-full bg-primary-blue px-[16px] py-[10px] text-[14px] font-medium uppercase text-white"
       onClick={() => {
         if (range?.from && range.to) {
           router.push(
             `/hotel/?${multipleCreateQueryString(
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
               'calendar',
               null,
             )}`,
             { scroll: false },
           );
         }
       }}
       // range?.from?.toDateString().split(' ')[1]
     >
       {lang === 'en' ? 'Allow' : 'Зөвшөөрөх'}
     </div>
   </div>
 );
}
