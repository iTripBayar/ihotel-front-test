import React, { useState, useRef } from 'react';
import { useAppCtx } from '@/utils/app';
import { Switch } from '@headlessui/react';

interface iProps {
  ver: string;
}

const OnlineToggle = ({ ver }: iProps) => {
  const { appState } = useAppCtx();
  const [enabled, setEnabled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={` relative flex h-[46px] w-full items-center justify-start gap-[6px]  rounded-[8px]  bg-white  text-[12px] 2xs:gap-[10px] 2xs:text-[14px] lg:min-w-[135px] lg:max-w-[320px]  ${
        ver === 'round'
          ? 'max-h-[36px] rounded-full border  border-black/20 bg-none lg:text-[11px] xl:text-[13px] xl:leading-[13px] 2xl:text-[14px]'
          : ver === 'search'
          ? ' h-[46px] overflow-hidden rounded-full shadow-[0px_0px_12px_2px_rgb(0,0,0,0.15)]'
          : ''
      }`}
      ref={containerRef}
    >
      {ver === 'search' ? (
        <div className=" animate-brotate  grid h-full w-full grid-cols-2 grid-rows-2 overflow-visible ">
          <div className="h-full w-full rounded-r-full bg-gradient-to-t from-main-online/90 from-50% via-white/90 to-transparent "></div>
          <div className="h-full w-full bg-white"></div>
          <div className="h-full w-full rounded-r-full bg-gradient-to-b from-main-online/90 from-50% via-white/90 to-transparent"></div>
          <div className="h-full w-full bg-white"></div>
        </div>
      ) : null}
      <div
        className={`absolute left-[50%] top-[50%] flex h-[41px] w-[calc(100%-5px)] translate-x-[-50.15%] translate-y-[-50%] items-center justify-center gap-[6px] rounded-full bg-white px-[8px] 2xs:gap-[10px] lg:bg-none ${
          ver === 'round'
            ? ' px-[4px] lg:gap-[12px] lg:bg-transparent lg:text-[14px] xl:gap-[8px]'
            : ''
        }`}
      >
        <svg
          fill="none"
          viewBox="0 0 24 24"
          className="h-[24px] w-[24px] text-main-online"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m12 0c-5.00156 0-9 3.99844-9 9 0 1.7297.51563 3.0656 1.41094 4.4203l6.64216 10.0781c.2016.3047.5485.5016.9469.5016s.75-.2016.9469-.5016l6.6422-10.0781c.8953-1.3547 1.4109-2.6906 1.4109-4.4203 0-5.00156-3.9984-9-9-9zm0 14.376c-2.76094 0-5.388-2.6197-5.388-5.38537 0-2.76563 2.62706-5.39063 5.388-5.39063 2.7609 0 5.388 2.625 5.388 5.39063 0 2.76567-2.6271 5.38537-5.388 5.38537z"
            fill="#0fbb50"
          />
          <path
            d="m14.5781 7.21875-3.4687 3.46875-1.7344-1.73437"
            stroke="#0fbb50"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
        <div className="flex w-full items-center justify-between gap-[4px] lg:gap-[0px] ">
          <p
            className={`text-main-text ${ver === 'round' ? 'lg:pb-[2px]' : ''}`}
          >
            {appState.lang === 'mn'
              ? 'Шууд баталгаажих газрууд'
              : 'Online order confirmation'}
          </p>
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className={`${
              enabled ? 'bg-main-online' : ' bg-black/[.03]'
            } relative  inline-flex h-[24px] w-[40px] items-center rounded-full border border-black/10 2xs:w-[44px] lg:w-[40px] xl:w-[44px]`}
          >
            {/* <span className="sr-only">Enable notifications</span> */}
            <div
              className={`${
                enabled
                  ? 'absolute left-[4px] h-[8px] w-[8px] rounded-full border border-white bg-white/[0.1] shadow-[inset_0_-2px_2px_rgba(0,0,0,0.15)] 2xs:left-[6px] 2xs:h-[10px] 2xs:w-[10px] lg:left-[4px] xl:left-[6px]'
                  : 'absolute right-[4px] h-[4px] w-[10px] rounded-full bg-white shadow-[inset_0_-2px_2px_rgba(0,0,0,0.15)] 2xs:right-[6px] lg:right-[4px] xl:right-[6px]'
              }`}
            ></div>
            <span
              className={`${
                enabled
                  ? 'translate-x-[18px] rotate-[-90deg] 2xs:translate-x-[22px] lg:translate-x-[18px] xl:translate-x-[22px]'
                  : 'translate-x-[2px] rotate-90 2xs:translate-x-1 lg:translate-x-[3px] xl:translate-x-1'
              } relative inline-block h-[18px] w-[18px] transform rounded-full bg-white shadow-[inset_0_-2px_6px_rgba(0,0,0,0.25)] transition`}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default OnlineToggle;
