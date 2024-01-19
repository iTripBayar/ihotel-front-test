import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface Props {
  id: string;
}

export default function Success({ id }: Props) {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");
  return (
    <div className="flex flex-col gap-[24px] w-full items-center justify-center text-main-online">
      <div className="flex items-center justify-center rounded-full border-[6px] border-main-online p-[16px]">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="max-h-[100px] min-h-[100px] min-w-[100px] max-w-[100px]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 12L10 17L20 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="flex gap-[16px] flex-wrap items-center justify-center px-[32px] font-medium text-[14px] leading-[14px] text-white">
        <Link
          href={{ pathname: "/" }}
          className="px-[16px] w-full text-center py-[10px] text-primary-blue bg-white border-[2px] border-primary-blue/50 uppercase rounded-[8px] "
        >
          {lang === "en" ? "Back to Home page" : "Нүүр хуудас руу бацах"}
        </Link>
        <Link
          href={{
            pathname: `/order/${id}`,
          }}
          className="px-[16px] w-full text-center py-[10px] bg-primary-blue border-[2px] border-primary-blue/50 uppercase rounded-[8px]"
        >
          {lang === "en" ? "Go to order page" : "Захиалгын хуудас руу очих"}
        </Link>
      </div>
    </div>
  );
}
