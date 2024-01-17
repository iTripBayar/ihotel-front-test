import { Drawer } from "vaul";
import { useSearchParams } from "next/navigation";
import { useAppCtx } from "@/contexts/app";
import { toast } from "sonner";

interface CartItem {
  id: number;
  name: string;
  nameEn: string;
  amount: number;
  occupancy: number;
  price: number;
  method: string;
}
interface Props {
  roomData: roomData.room;
  currentCart: CartItem[];
  changeCart: (e: CartItem) => void;
}

export default function RoomSelectionDrawer({
  roomData,
  currentCart,
  changeCart,
}: Props) {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");
  const { appState, dispatch } = useAppCtx();

  const roomAmount = [{ id: roomData?.id, amount: 0 }];

  for (let i = 0; i < roomData.number; i++) {
    roomAmount.push({ id: roomData?.id, amount: i + 1 });
  }

  const showToast = (e: { roomName: string; amount: string }) => {
    toast.success(
      `${e.amount} ${e.roomName} ${lang === "en" ? "added" : "нэмэгдлээ"}`,
    );
  };

  return (
    <Drawer.Root
      open={true}
      onClose={() => {
        dispatch({
          type: "CHANGE_APP_STATE",
          payload: {
            selectedRoom: "",
          },
        });
      }}
    >
      <Drawer.Portal>
        <Drawer.Overlay
          className="fixed inset-0 bg-black/40 z-[100]"
          onClick={() => {
            dispatch({
              type: "CHANGE_APP_STATE",
              payload: {
                selectedRoom: "",
              },
            });
          }}
        />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 mt-24 flex flex-col rounded-t-[20px] bg-white focus-visible:outline-none z-[101] max-h-[60vh] ">
          <div className="flex w-full flex-col gap-[12px] rounded-t-[20px] bg-white p-4 ring-0 selection:ring-0 ">
            <div className="mx-auto h-[6px] w-12 flex-shrink-0 rounded-full bg-zinc-300" />
          </div>
          <div className="w-full bg-white p-4 overflow-y-auto">
            {roomAmount.map((index, i) => (
              <div
                key={i}
                onClick={() => {
                  changeCart({
                    id: roomData.id,
                    name: roomData.name,
                    nameEn: roomData.nameEn ? roomData.nameEn : "",
                    amount: i,
                    occupancy: roomData.occupancy,
                    price:
                      roomData.sales.length > 0
                        ? roomData.sales[0].price
                        : roomData.defaultPrice,
                    method: i !== 0 ? "add" : "remove",
                  });
                  dispatch({
                    type: "CHANGE_APP_STATE",
                    payload: { selectedRoom: "" },
                  });
                  if (i !== 0) {
                    showToast({
                      roomName: roomData.name,
                      amount: i.toString(),
                    });
                  }
                }}
                className="leading relative flex min-h-[50px] w-full items-center  justify-center border-b border-b-black/[.15] text-[20px] font-medium text-main-text"
              >
                {roomAmount.indexOf(index)} {lang === "en" ? "rooms" : "өрөө"}
                {currentCart.some(
                  (index) =>
                    index.id === parseInt(appState.selectedRoom) &&
                    index.amount === i,
                ) ||
                (i === 0 &&
                  !currentCart.some(
                    (index) => index.id === parseInt(appState.selectedRoom),
                  )) ? (
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
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
