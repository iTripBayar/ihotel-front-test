import { Collapse, useDisclosure, Button } from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import useWindowSize from '@/hooks/windowSize';

export default function ServiceCollapse() {
  const { isOpen, onToggle } = useDisclosure();
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');
  const size = useWindowSize();
  return (
    <div
      className={`mb-[32px] flex w-full flex-col gap-[24px] overflow-hidden border-b-[1px] border-white/25 md:w-[94%] md:border-none `}
    >
      <Button
        onClick={size.width && size.width >= 768 ? () => {} : onToggle}
        // disabled={size.width && size.width >= 768 ? true : false}
        className="flex w-full !items-center !justify-between !bg-transparent !px-0 !text-white"
      >
        <h3 className="text-[18px]">
          {lang === "en" ? "Services" : "Үйлчилгээ"}
        </h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="2 0 20 20"
          strokeWidth={3}
          stroke="currentColor"
          className={`h-[16px] w-[16px] md:hidden ${
            isOpen === true ? "rotate-180" : null
          }`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </Button>
      <Collapse
        in={size.width && size.width > 768 ? true : isOpen}
        animateOpacity
        transition={{
          enter: { duration: size.width && size.width > 768 ? 0 : undefined },
        }}
        className={`!flex !flex-col justify-start gap-[16px] ${
          (size.width && size.width >= 768) || isOpen === true
            ? " !pb-[16px]"
            : "h-0"
        }`}
      >
        {/* Room management system */}
        <Link
          href={`${process.env.TEMPORARY_URL1}`}
          target="_blank"
          className="underline-0 group relative text-white"
        >
          {lang === "en"
            ? "Room management system"
            : "Өрөөний удирдлагын систем"}
          <span className="ease absolute bottom-0 left-0 h-0 w-0 border-b-2 border-white/50 transition-all duration-200 group-hover:w-1/2"></span>
        </Link>
        {/* Web service */}
        <Link
          href={`${process.env.TEMPORARY_URL}/website`}
          className="underline-0 group relative text-white"
        >
          {lang === "en" ? "Web service" : "Веб сайт бүтээх"}
          <span className="ease absolute bottom-0 left-0 h-0 w-0 border-b-2 border-white/50 transition-all duration-200 group-hover:w-1/2"></span>
        </Link>
        {/* Support */}
        <Link
          href={`${process.env.TEMPORARY_URL}/helps`}
          className="underline-0 group relative text-white"
        >
          {lang === "en" ? "Support" : "Тусламж"}
          <span className="ease absolute bottom-0 left-0 h-0 w-0 border-b-2 border-white/50 transition-all duration-200 group-hover:w-1/2"></span>
        </Link>
      </Collapse>
    </div>
  );
}
