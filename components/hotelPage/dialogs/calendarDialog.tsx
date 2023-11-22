import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function CalendarDialog() {
  const searchParams = useSearchParams();
  const router = useRouter();
  return (
    <div className="flex w-full flex-col rounded-t-[30px] bg-white px-[16px] shadow-[0px_0px_12px_2px_rgb(0,0,0,0.25)] sm:px-[32px]">
      calendarDialog
    </div>
  );
}
