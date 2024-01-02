"use client";

import { useEffect } from "react";
import { Drawer } from "vaul";

// interface Props {
//   roomData: roomData.room;
// }
export function MyDrawer() {
  useEffect(() => {}, []);
  return (
    <Drawer.Root open={true}>
      <Drawer.Trigger asChild>
        <button>Open Drawer</button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 mt-24 flex flex-col rounded-t-[10px] bg-zinc-100">
          <div className="flex-1 rounded-t-[10px] bg-white p-4">
            <div className="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-zinc-300" />
            <div className="mx-auto max-w-md">
              <Drawer.Title className="mb-4 font-medium">
                Unstyled drawer for React.
              </Drawer.Title>
              <p className="mb-2 text-zinc-600">
                This component can be used as a replacement for a Dialog on
                mobile and tablet devices.
              </p>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
