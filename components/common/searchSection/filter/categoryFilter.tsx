import { Collapse, useDisclosure, Button } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface Props {
  iconRotateDuration: number;
  data: SearchData.Categories[];
  // value: SearchData.Categories | null;
  value: string[];
  changeValue: (e: string) => void;
  // changeValue: (e: SearchData.Categories) => void;
  ver: string;
  // testChangeCat: (e: string) => void;
}
export default function CategoryFilter({
  iconRotateDuration,
  data,
  value,
  changeValue,
  ver, // testChangeCat,
}: Props) {
  const { isOpen, onToggle } = useDisclosure();
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");
  const category = searchParams.get("category");
  useEffect(() => {
    if (category) {
      onToggle();
    }
  }, [category]);

  if (ver === "web")
    return (
      <div className="flex h-full w-full flex-col items-center justify-start gap-[12px] filter">
        <p className="text-[18px] font-medium filter">
          {lang === "en" ? "Categories" : "Төрөл"}
        </p>
        {data.length > 0 ? (
          <div className="grid w-full grid-cols-2 gap-[12px] text-[15px] leading-[15px] text-sub-text filter">
            {data.map((index, i) => (
              <div
                // onClick={() => changeValue(index)}
                onClick={() => {
                  changeValue(`${index.id}`);
                  // testChangeCat(`${index.id}`);
                }}
                key={i}
                className="flex w-full items-center gap-[8px] filter"
              >
                <input
                  id={`cat${index.id}`}
                  type="checkbox"
                  readOnly
                  // value={index}
                  value={index.id}
                  checked={value.some((i) => i === `${index.id}`)}
                  // checked={value && index.id === value.id ? true : false}
                  className="h-[20px] w-[20px] rounded-[4px] border border-black/50 ring-0 focus:shadow-none focus:ring-0 filter"
                />
                <label
                  className="filter"
                  onClick={() => {
                    document.getElementById(`${index.id}`)?.click();
                  }}
                >
                  {index.name}
                </label>
              </div>
            ))}
          </div>
        ) : (
          <div className="filter">
            {lang === "en" ? "Empty" : "Хоосон байна"}
          </div>
        )}
      </div>
    );
  return (
    <div className="flex h-auto w-full flex-col rounded-[20px] px-[20px] shadow-[0px_0px_12px_2px_rgb(0,0,0,0.15)] filter">
      <Button
        onClick={onToggle}
        className="!m-0 flex h-[41px] w-full items-center !justify-between sm:h-[46px] !bg-transparent !px-0 filter"
      >
        <p className="text-[18px] font-medium text-sub-text filter">
          {lang === "en" ? "Category" : "Төрөл"}
        </p>
        {/* spinning + Icon */}
        <div className="relative h-[24px] w-[24px] rounded-full bg-primary-blue/25 filter">
          <div
            className={`absolute filter left-[50%] top-[50%] h-[3px] w-[18px] translate-x-[-50%] translate-y-[-50%] rounded-full bg-primary-blue ${
              isOpen === true
                ? `rotate-[360deg] duration-${iconRotateDuration}`
                : `rotate-0 duration-${iconRotateDuration}`
            }`}
          ></div>
          <div
            className={`absolute left-[50%] top-[50%] h-[18px] w-[3px] translate-x-[-50%] translate-y-[-50%] rounded-full filter bg-primary-blue ${
              isOpen === true
                ? `rotate-[270deg] duration-${iconRotateDuration}`
                : `rotate-0 duration-${iconRotateDuration}`
            }`}
          ></div>
        </div>
      </Button>
      <Collapse
        in={isOpen}
        animateOpacity
        className={` !grid h-auto w-full filter grid-cols-2 !gap-[20px] text-[15px] font-medium leading-[16px] text-sub-text sm:!gap-[20px]  ${
          isOpen === true ? "!mt-[8px] !pb-[16px] sm:pb-[20px]" : "h-0"
        }`}
      >
        {data.length > 0 ? (
          data.map((index, i) => (
            <div
              // onClick={() => changeValue(index)}
              onClick={() => {
                changeValue(`${index.id}`);
                // testChangeCat(`${index.id}`);
              }}
              key={i}
              className="flex w-full items-center gap-[8px] filter"
            >
              <input
                id={`cat${index.id}`}
                type="checkbox"
                readOnly
                // value={index.name}
                value={index.id}
                // checked={value && index.id === value.id ? true : false}
                checked={value.some((i) => i === `${index.id}`)}
                className="h-[20px] w-[20px] rounded-[4px] border border-black/50 ring-0 focus:shadow-none focus:ring-0 filter"
              />
              <label
                className="filter"
                onClick={() => {
                  document.getElementById(`${index.id}`)?.click();
                }}
              >
                {index.name}
              </label>
            </div>
          ))
        ) : (
          <div className="filter">
            {lang === "en" ? "Empty" : "Хоосон байна"}
          </div>
        )}
      </Collapse>
    </div>
  );
}
