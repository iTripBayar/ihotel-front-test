import RoomSelection from './roomSelection';
import OrderDialog from './orderDialog';
import { useSearchParams } from 'next/navigation';
import CalendarDialog from './calendarDialog';

interface Props {
  roomPrices: number[];
  stat: string;
  allRooms: roomData.room[];
  slug: string;
}

export default function Dialogs({ roomPrices, stat, allRooms, slug }: Props) {
  const searchParams = useSearchParams();
  const room = searchParams.get('room');
  const roomSelect = searchParams.get('roomSelect');
  const dateStart = searchParams.get('dateStart');
  const calendar = searchParams.get('calendar');

  return (
    <div className="fixed bottom-0 z-[900] w-full sm:px-[50px] md:px-[72px] lg:hidden ">
      {roomSelect && roomSelect === 'open' ? (
        <RoomSelection
          roomData={allRooms.filter((index) => index.id.toString() === room)[0]}
        />
      ) : null}
      {calendar && calendar === 'open' && !roomSelect ? (
        <CalendarDialog ver={'mobile'}/>
      ) : null}

      {stat === 'online' || stat === 'pending' ? (
        !roomSelect && roomSelect !== 'open' && !dateStart && !calendar ? (
          <OrderDialog roomPrices={roomPrices} allRooms={allRooms} slug={slug}/>
        ) : null
      ) : null}
    </div>
  );
}
