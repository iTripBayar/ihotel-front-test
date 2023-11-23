import { useSearchParams, useRouter } from 'next/navigation';
import { useCallback } from 'react';
interface Props {
  roomData: roomData.room;
}
export default function RoomSelection({ roomData }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const lang = searchParams.get('lang');
  const room = searchParams.get('room');
  const roomAmount = searchParams.getAll('roomAmount');

  const createQueryString = useCallback(
    (
      name: string,
      value: string | null,
      name1: string,
      value1: string | null,
    ) => {
      const params = new URLSearchParams(searchParams);

      if (value !== null && !params.get(name)) {
        params.set(name, value);
      } else if (value !== null && params.get(name)) {
        if (value.split('$')[1] !== '0') {
          for (let i = 0; i < roomAmount.length; i++) {
            if (roomAmount[i].split('$')[0] === roomData.id.toString()) {
              params.delete(name, roomAmount[i]);
            }
          }
          params.append(name, value);
        } else {
          for (let i = 0; i < roomAmount.length; i++) {
            if (roomAmount[i].split('$')[0] === roomData.id.toString()) {
              params.delete(name, roomAmount[i]);
            }
          }
        }
      } else {
        params.delete(name);
      }
      if (value1 !== null) {
        params.set(name1, value1);
      } else {
        params.delete(name1);
      }
      return params.toString();
    },
    [searchParams],
  );
  const sampleRooms = [
    { id: roomData?.id, hotelId: 0 },
    { id: roomData?.id, hotelId: 1 },
    { id: roomData?.id, hotelId: 2 },
    { id: roomData?.id, hotelId: 3 },
    { id: roomData?.id, hotelId: 4 },
    { id: roomData?.id, hotelId: 5 },
    { id: roomData?.id, hotelId: 6 },
    { id: roomData?.id, hotelId: 7 },
    { id: roomData?.id, hotelId: 8 },
  ];

  let updatedAmount = 0;
  if (roomAmount.length > 0) {
    for (let i = 0; i < roomAmount.length; i++) {
      if (roomAmount[i].split('$')[0] === roomData?.id.toString()) {
        updatedAmount = parseInt(roomAmount[i].split('$')[1]);
      }
    }
    // console.log(roomAmount);
  }
  return (
    <div
      className="flex max-h-[420px] min-h-[50px] flex-col overflow-y-auto rounded-t-[30px] bg-white px-[36px] pb-[50px] pt-[16px] shadow-[0px_0px_12px_2px_rgb(0,0,0,0.25)]"
      id="container"
    >
      {sampleRooms.map((index, i) => (
        <div
          key={i}
          onClick={() => {
            router.push(
              `/hotel/?${createQueryString(
                'roomAmount',
                `${room}$${sampleRooms.indexOf(index).toString()}`,
                'roomSelect',
                null,
              )}`,
              { scroll: false },
            );
          }}
          className="leading relative flex min-h-[50px] w-full items-center  justify-center border-b border-b-black/[.15] text-[20px] font-medium text-main-text"
        >
          {sampleRooms.indexOf(index)} {lang === 'en' ? 'rooms' : 'өрөө'}
          {sampleRooms.indexOf(index) === updatedAmount ? (
            <svg
              viewBox="0 0 19 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute right-0 top-[50%] max-h-[14px] min-h-[14px] min-w-[20px] max-w-[20px] translate-y-[-50%] text-primary-blue"
            >
              <path
                d="M17 2L7 12L2 7"
                stroke="#3C76FE"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : null}
        </div>
      ))}
    </div>
  );
}
