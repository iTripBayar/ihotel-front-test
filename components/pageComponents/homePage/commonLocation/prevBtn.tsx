interface iProps {
  onClick: () => void;
}

const PrevBtn = ({ onClick }: iProps) => {
  return (
    <button
      aria-label="prevButton"
      className="absolute left-[24px] top-[50%] z-30 flex h-[30px] w-[30px] translate-x-[-50%] translate-y-[-50%] items-center justify-center rounded-full bg-black/[.7] pr-[2px] sm:left-[40px]  md:h-[40px] md:w-[40px] lg:left-[64px]"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={3}
        stroke="white"
        className="h-[24px] w-[24px] rotate-[180deg] md:h-[32px] md:w-[32px]"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 4.5l7.5 7.5-7.5 7.5"
        />
      </svg>
    </button>
  );
};

export default PrevBtn;
