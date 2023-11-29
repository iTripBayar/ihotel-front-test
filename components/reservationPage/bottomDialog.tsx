import React from 'react'
import { useSearchParams } from 'next/navigation'

interface Props{
    stat: string
}

export default function BottomDialog({stat}:Props) {
    const searchParams = useSearchParams();
    const lang = searchParams.get('lang')
  return (
    <div className="fixed bottom-0 left-0 z-[200] flex w-full flex-col items-center gap-[12px] rounded-t-[20px] bg-white px-[32px] py-[16px] shadow-[0px_0px_12px_2px_rgb(0,0,0,0.15)] sm:left-[50%] sm:w-[calc(100%-100px)] sm:translate-x-[-50%] md:w-[calc(100%-144px)] lg:hidden">
      <div className="flex w-full items-center justify-center gap-[8px] text-[12px] text-sub-text/75 2xs:text-[14px] sm:text-[16px]">
        <input type="checkBox" className="border-black/[.25] focus:ring-0 " />
        {lang === 'en'
          ? 'Accept Terms and Conditions'
          : 'Үйлчилгээний нөхцөл зөвшөөрөх'}
      </div>
      <div className="flex w-full max-w-[375px] items-center justify-center rounded-full bg-main-online py-[8px] font-medium text-white sm:text-[18px] ">
        {stat === 'pending'
          ? lang === 'en'
            ? 'Send order request'
            : 'Захиалах хүсэлт илгээх'
          : null}
        {stat === 'online' ? (lang === 'en' ? 'Order' : 'Захиалах') : null}
      </div>
    </div>
  );
}
