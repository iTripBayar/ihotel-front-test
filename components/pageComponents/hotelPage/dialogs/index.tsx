import RoomSelection from './roomSelection';
import OrderDialog from './orderDialog';
import { useSearchParams } from 'next/navigation';
import CalendarDialog from './calendarDialog';
import { useAppCtx } from '@/contexts/app';

interface Props {
  roomPrices: number[];
  stat: string;
  allRooms: roomData.room[];
  slug: string;
  handleScrollToRooms: (ver: string) => void;
  totalPrice: number;
  
}

export default function Dialogs({
  roomPrices,
  stat,
  allRooms,
  slug,
  handleScrollToRooms,
  totalPrice,
}: Props) {
  const searchParams = useSearchParams();
  const roomSelect = searchParams.get('roomSelect');
  const { appState } = useAppCtx();

  return (
    <div className='fixed bottom-0 z-[900] w-full sm:px-[50px] md:px-[72px] lg:hidden '>
      {appState.selectedRoom ? (
        <RoomSelection
          roomData={
            allRooms.filter(
              (index) => index.id.toString() === appState.selectedRoom,
            )[0]
          }
        />
      ) : null}
      {appState.calendar === 'open' && !roomSelect ? (
        <CalendarDialog ver={'mobile'} />
      ) : null}

      {stat === 'online' || stat === 'pending' ? (
        appState.selectedRoom === '' && appState.calendar === '' ? (
          <OrderDialog
            roomPrices={roomPrices}
            allRooms={allRooms}
            slug={slug}
            handleScrollToRooms={(ver: string) => handleScrollToRooms(ver)}
            totalPrice={totalPrice}
          />
        ) : null
      ) : null}
    </div>
  );
}