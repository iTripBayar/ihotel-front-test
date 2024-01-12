import { useAppCtx } from '@/contexts/app';
import LangBtn from './fixedButtons/langBtn';
import ScrollTopBtn from './fixedButtons/scrollTopBtn';
import MapBtn from './fixedButtons/mapBtn';

type iProps = {
  ver: string;
  handleScrollToTopVer: () => void;
};

const BottomSection = ({ ver, handleScrollToTopVer }: iProps) => {
  const { appState } = useAppCtx();
  return (
    <div
      className={` fixed  z-[899] flex animate-fade  items-stretch gap-[16px] text-white  ${
        ver === "search"
          ? `bottom-[24px] right-[0%] w-auto flex-row justify-between px-[16px] sm:px-[42px] sm:pl-[39px] md:px-[32px] lg:bottom-[12px] ${
              appState.map !== "" ? "lg:right-[50px]" : " lg:right-[24px]"
            } lg:w-auto lg:px-0`
          : ver === "fixed"
          ? "bottom-[4%] right-[3.4%] flex-col"
          : ver === "hotel"
          ? "bottom-[4%] right-[3.4%] flex-col hidden lg:flex"
          : "hidden"
      }`}
    >
      {/* <!-- Messenger Chat plugin Code --> */}
      <div id="fb-root"></div>
      {/* <!-- Your Chat plugin code --> */}
      <div id="fb-customer-chat" className="fb-customerchat"></div>
      {/* map */}
      {/* {ver === 'search' && appState.map === '' ? (
        <MapBtn ver={'default'} />
      ) : null} */}
      {/* right section*/}
      <div
        className={`flex flex-col gap-[16px] ${
          ver === "search" && appState.map === ""
            ? "lg:items-end"
            : ver === "search" && appState.map === "open"
            ? "hidden "
            : ""
        }`}
      >
        {/* lang */}
        <LangBtn />
        {/* map with arrow when closed */}
        {ver === "search" && appState.map === "" ? (
          <MapBtn ver={"arrow"} />
        ) : null}
        {/* scrollToTop btn */}
        {appState.map !== "open" ? (
          <ScrollTopBtn ver={ver} handleScrollToTopVer={handleScrollToTopVer} />
        ) : null}
      </div>
    </div>
  );
};

export default BottomSection;
