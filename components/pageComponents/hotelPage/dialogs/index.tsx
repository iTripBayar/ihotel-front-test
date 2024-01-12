import OrderDialog from "./orderDialog";
import { useSearchParams } from "next/navigation";
import CalendarDialog from "./calendarDialog";
import { useAppCtx } from "@/contexts/app";
import ScrollTopBtn from "@/components/common/fixedButtons/scrollTopBtn";
import RoomSelectionDrawer from "./roomSelectionDrawer";
import useWindowSize from "@/hooks/windowSize";
import LangBtn from "@/components/common/fixedButtons/langBtn";

interface Props {
  roomPrices: number[];
  stat: string;
  allRooms: roomData.room[];
  handleScrollToRooms: (ver: string) => void;
  totalPrice: number;
}

export default function Dialogs({
  roomPrices,
  stat,
  allRooms,
  handleScrollToRooms,
  totalPrice,
}: Props) {
  const searchParams = useSearchParams();
  const roomSelect = searchParams.get("roomSelect");
  const { appState } = useAppCtx();
  const size = useWindowSize();

  return (
    <div className="fixed bottom-0 z-[888] flex w-full flex-col justify-end sm:px-[50px] md:px-[72px] lg:hidden">
      {appState.calendar === "" && !appState.selectedRoom ? (
        <div className="flex absolute top-0 translate-y-[-100px] w-auto flex-col gap-[8px] self-end pb-[12px] pr-[14px] text-white">
          <LangBtn/> 
          <ScrollTopBtn ver={"fixed"} handleScrollToTopVer={() => {}} />
        </div>
      ) : null}
      {size.width && size.width < 1024 && appState.selectedRoom ? (
        <RoomSelectionDrawer
          roomData={
            allRooms.filter(
              (index) => index.id.toString() === appState.selectedRoom,
            )[0]
          }
        />
      ) : null}
      {/* {appState.selectedRoom ? (
        <RoomSelection
          roomData={
            allRooms.filter(
              (index) => index.id.toString() === appState.selectedRoom,
            )[0]
          }
        />
      ) : null} */}
      {appState.calendar === "open" && !roomSelect ? (
        <CalendarDialog ver={"mobile"} />
      ) : null}

      {stat === "online" || stat === "pending" ? (
        appState.selectedRoom === "" && appState.calendar === "" ? (
          <OrderDialog
            roomPrices={roomPrices}
            allRooms={allRooms}
            handleScrollToRooms={(ver: string) => handleScrollToRooms(ver)}
            totalPrice={totalPrice}
          />
        ) : null
      ) : null}
    </div>
  );
}
