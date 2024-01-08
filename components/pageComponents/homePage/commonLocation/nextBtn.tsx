interface iProps {
  onClick: () => void;
}
const NextBtn = ({ onClick }: iProps) => {
  // const swiper = useSwiper();

  return (
    <div
      className="absolute right-[36px] top-[50%] z-10 flex h-[30px] w-[30px] translate-x-[50%] translate-y-[-50%] items-center justify-center rounded-full bg-black/[.7] sm:right-[50px] md:h-[40px]  md:w-[40px] lg:right-[72px] "
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={3}
        stroke="white"
        className="h-[24px] w-[24px] md:h-[32px] md:w-[32px]"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 4.5l7.5 7.5-7.5 7.5"
        />
      </svg>
    </div>
  );
};

export default NextBtn;
