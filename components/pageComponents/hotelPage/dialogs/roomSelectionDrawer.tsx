'use client';

import { Drawer } from 'vaul';
import { useSearchParams } from 'next/navigation';
import { useAppCtx } from '@/contexts/app';
interface Props {
  roomData: roomData.room;
}

export default function RoomSelectionDrawer({ roomData }: Props) {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');
  const { appState, dispatch } = useAppCtx();

  const roomAmount = [{ id: roomData?.id, amount: 0 }];

  for (let i = 0; i < roomData.number; i++) {
    roomAmount.push({ id: roomData?.id, amount: i + 1 });
  }

  let updatedAmount = 0;
  if (appState.selectedAmount.length > 0) {
    for (let i = 0; i < appState.selectedAmount.length; i++) {
      if (appState.selectedAmount[i].split('$')[0] === appState.selectedRoom) {
        updatedAmount = parseInt(appState.selectedAmount[i].split('$')[1]);
      }
    }
  }
  return (
    <Drawer.Root
      open={true}
      onClose={() => {
        dispatch({
          type: 'CHANGE_APP_STATE',
          payload: {
            selectedRoom: '',
          },
        });
      }}
    >
      <Drawer.Portal>
        <Drawer.Overlay
          className='fixed inset-0 bg-black/40'
          onClick={() => {
            dispatch({
              type: 'CHANGE_APP_STATE',
              payload: {
                selectedRoom: '',
              },
            });
          }}
        />
        <Drawer.Content className='fixed bottom-0 left-0 right-0 mt-24 flex flex-col rounded-t-[20px] bg-white focus-visible:outline-none'>
          <div className='flex w-full flex-col gap-[12px] rounded-t-[20px] bg-white p-4 ring-0 selection:ring-0'>
            <div className='mx-auto h-[6px] w-12 flex-shrink-0 rounded-full bg-zinc-300' />
          </div>
          <div className='w-full bg-white p-4'>
            {roomAmount.map((index, i) => (
              <div
                key={i}
                onClick={() => {
                  dispatch({
                    type: 'CHANGE_APP_STATE',
                    payload: {
                      selectedRoom: '',
                      selectedAmount: (() => {
                        const newValue = `${appState.selectedRoom}$${roomAmount
                          .indexOf(index)
                          .toString()}`;
                        const indexOfId = appState.selectedAmount.findIndex(
                          (existingValue) => {
                            const [existingId] = existingValue.split('$');
                            return existingId === `${appState.selectedRoom}`;
                          },
                        );
                        // Check if the value already exists in the array
                        const updatedAmount = appState.selectedAmount.map(
                          (existingValue) => {
                            const [existingId] = existingValue.split('$');
                            if (existingId === `${appState.selectedRoom}`) {
                              // If the ID matches, update the existing value
                              return newValue;
                            }
                            return existingValue;
                          },
                        );

                        // If the ID doesn't exist, add the new value to the array
                        if (
                          indexOfId === -1 &&
                          !updatedAmount.includes(newValue)
                        ) {
                          updatedAmount.push(newValue);
                        } else if (
                          indexOfId !== -1 &&
                          roomAmount.indexOf(index) === 0
                        ) {
                          // If the ID exists and sampleRooms.indexOf(index) is 0, remove the value
                          updatedAmount.splice(indexOfId, 1);
                        }

                        return updatedAmount;
                      })(),
                    },
                  });
                }}
                className='leading relative flex min-h-[50px] w-full items-center  justify-center border-b border-b-black/[.15] text-[20px] font-medium text-main-text'
              >
                {roomAmount.indexOf(index)} {lang === 'en' ? 'rooms' : 'өрөө'}
                {roomAmount.indexOf(index) === updatedAmount ? (
                  <svg
                    viewBox='0 0 19 14'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    className='absolute right-0 top-[50%] max-h-[14px] min-h-[14px] min-w-[20px] max-w-[20px] translate-y-[-50%] text-primary-blue'
                  >
                    <path
                      d='M17 2L7 12L2 7'
                      stroke='#3C76FE'
                      strokeWidth='2.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
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
