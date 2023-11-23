import { SetStateAction, useCallback, useEffect } from 'react';
import { useState } from 'react';
import RoomSelection from './roomSelection';
import OrderDialog from './orderDialog';
import { useSearchParams, useRouter } from 'next/navigation';
import CalendarDialog from './calendarDialog';

interface Props {
  roomPrices: number[];
  stat: string;
  allRooms: roomData.room[];
}

export default function Dialogs({ roomPrices, stat, allRooms }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const room = searchParams.get('room');
  const roomSelect = searchParams.get('roomSelect');
  const amount = searchParams.get('amount');
  const dateStart = searchParams.get('dateStart');
  const dateEnd = searchParams.get('dateEnd');
  const calendar = searchParams.get('calendar');


  const createQueryString = useCallback(
    (
      name: string,
      value: string | null,
      name1: string,
      value1: string | null,
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
      return params.toString();
    },
    [searchParams],
  );

              // {`${month}/${date}/${year}`} - {`${month}/${date + 1}/${year}`}


  //   useEffect(() => {
  //     if (open.room.roomId) {
  //       router.push(
  //         `/hotel/?${createQueryString('room', open?.room?.roomId.toString())}`,
  //       );
  //     }
  //   }, [open.room]);
  //   console.log(room);

  //   console.log(allRooms);

  return (
    <div className="fixed bottom-0 z-[900] w-full sm:px-[50px] md:px-[72px] lg:hidden ">
      {roomSelect && roomSelect === 'open' ? (
        <RoomSelection
          roomData={allRooms.filter((index) => index.id.toString() === room)[0]}
        />
      ) : null}
      {calendar && calendar === 'open' && !roomSelect ? (
        <CalendarDialog />
      ) : null}

      {stat === 'online' || stat === 'pending' ? (
        !roomSelect && roomSelect !== 'open' && !dateStart && !calendar ? (
          <OrderDialog roomPrices={roomPrices} allRooms={allRooms} />
        ) : null
      ) : null}
    </div>
  );
}
