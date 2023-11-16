import { useSearchParams } from 'next/navigation';
import RoomCard from './roomCard';

interface Props {
  data: roomData.room[];
}

const HotelRooms = ({ data }: Props) => {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');

  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  console.log(data);
  return (
    <div className="flex flex-col gap-[24px] border-t-[1px] border-t-black/[.15] pt-[24px] text-main-text">
      <p className="text-[20px] font-medium">
        {lang === 'en' ? 'Available rooms' : 'Боломжит өрөөнүүд'}
      </p>
      <div className="flex h-[46px] items-center justify-between rounded-[12px] border border-black/[.15] px-[16px] text-[12px] font-medium leading-[1px] text-primary-blue 2xs:text-[15px]">
        <div className="flex items-center gap-[12px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="max-h-[22px] min-h-[22px] min-w-[22px] max-w-[22px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
            />
          </svg>
          <p className="text-sub-text">
            {`${month}/${date}/${year}`} - {`${month}/${date + 1}/${year}`}
          </p>
        </div>
        {/* selected days */}
        <div className="text-sub-text">
          (1 {lang === 'en' ? 'days' : 'хоног'})
        </div>
      </div>
      <div className="grid grid-cols-1 gap-[24px] lg:grid-cols-6 lg:gap-[24px]">
        <div className=" flex flex-col gap-[24px] lg:col-span-4 lg:grid lg:grid-cols-2">
          {data.map((index, i) => (
            <RoomCard data={index} key={i} />
          ))}
        </div>
        <div className="hidden lg:col-span-2 lg:flex">a</div>
      </div>
    </div>
  );
};

export default HotelRooms;
