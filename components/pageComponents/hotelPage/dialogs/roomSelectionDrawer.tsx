"use client";

import { Drawer } from "vaul";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useAppCtx } from "@/contexts/app";
import { toast } from "sonner";

interface Props {
  roomData: roomData.room;
}

export default function RoomSelectionDrawer({ roomData }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const lang = searchParams.get("lang");
  const { appState, dispatch } = useAppCtx();
  const cart = searchParams.getAll("cart");

  const roomAmount = [{ id: roomData?.id, amount: 0 }];

  for (let i = 0; i < roomData.number; i++) {
    roomAmount.push({ id: roomData?.id, amount: i + 1 });
  }

  const showToast = (e: { roomName: string; amount: string }) => {
    toast.success(
      `${e.amount} ${e.roomName} ${lang === "en" ? "added" : "нэмэгдлээ"}`,
    );
  };

  const multipleCreateQueryString = (
    name: string,
    value: string | null,
    name1: string,
    value1: string | null,
    name2: string,
    value2: string | null,
  ) => {
    const params = new URLSearchParams(searchParams);

    if (value !== null && !params.get(name)) {
      params.set(name, value);
    } else if (value !== null && params.get(name)) {
      if (value.split("$")[1] !== "0") {
        for (let i = 0; i < cart.length; i++) {
          if (cart[i].split("$")[0] === appState.selectedRoom) {
            params.delete(name, cart[i]);
          }
        }
        params.append(name, value);
      } else {
        for (let i = 0; i < cart.length; i++) {
          if (cart[i].split("$")[0] === appState.selectedRoom) {
            params.delete(name, cart[i]);
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
    if (value2 !== null) {
      params.set(name2, value2);
    } else {
      params.delete(name2);
    }

    return params.toString();
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
                  // dispatch({
                  //   type: "CHANGE_APP_STATE",
                  //   payload: {
                  //     selectedRoom: "",
                  //     selectedAmount: (() => {
                  //       const newValue = `${appState.selectedRoom}$${roomAmount
                  //         .indexOf(index)
                  //         .toString()}`;
                  //       const indexOfId = appState.selectedAmount.findIndex(
                  //         (existingValue) => {
                  //           const [existingId] = existingValue.split("$");
                  //           return existingId === `${appState.selectedRoom}`;
                  //         },
                  //       );
                  //       // Check if the value already exists in the array
                  //       const updatedAmount = appState.selectedAmount.map(
                  //         (existingValue) => {
                  //           const [existingId] = existingValue.split("$");
                  //           if (existingId === `${appState.selectedRoom}`) {
                  //             // If the ID matches, update the existing value
                  //             return newValue;
                  //           }
                  //           return existingValue;
                  //         },
                  //       );

                  //       // If the ID doesn't exist, add the new value to the array
                  //       if (
                  //         indexOfId === -1 &&
                  //         !updatedAmount.includes(newValue)
                  //       ) {
                  //         updatedAmount.push(newValue);
                  //       } else if (
                  //         indexOfId !== -1 &&
                  //         roomAmount.indexOf(index) === 0
                  //       ) {
                  //         // If the ID exists and sampleRooms.indexOf(index) is 0, remove the value
                  //         updatedAmount.splice(indexOfId, 1);
                  //       }

                  //       return updatedAmount;
                  //     })(),
                  //   },
                  // });
                  // if (updatedAmount > 2) {
                  router.replace(
                    `${pathname}?${multipleCreateQueryString(
                      "cart",
                      `${appState.selectedRoom}$${i}`,
                      "roomSelect",
                      null,
                      "room",
                      null,
                    )}`,
                    { scroll: false },
                  );
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
                  // showToast({
                  //   roomName: data.name,
                  //   amount: updatedAmount.split("$")[1],
                  // });
                  // }

                  // if (updatedAmount.length > 2) {
                  //   router.replace(
                  //     `${pathname}?${multipleCreateQueryString(
                  //       "cart",
                  //       updatedAmount,
                  //       "roomSelect",
                  //       null,
                  //       "room",
                  //       null,
                  //     )}`,
                  //     { scroll: false },
                  //   );
                  //   showToast({
                  //     roomName: data.name,
                  //     amount: updatedAmount.split("$")[1],
                  //   });
                  // }
                }}
                className="leading relative flex min-h-[50px] w-full items-center  justify-center border-b border-b-black/[.15] text-[20px] font-medium text-main-text"
              >
                {roomAmount.indexOf(index)} {lang === "en" ? "rooms" : "өрөө"}
                {cart.some(
                  (index) =>
                    index.split("$")[0] === appState.selectedRoom &&
                    parseInt(index.split("$")[1]) === i,
                ) ||
                (i === 0 &&
                  !cart.some(
                    (index) => index.split("$")[0] === appState.selectedRoom,
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
                {/* {roomAmount.indexOf(index) === updatedAmount ? (
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
                ) : null} */}
              </div>
            ))}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
