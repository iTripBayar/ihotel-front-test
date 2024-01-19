import { useSearchParams } from "next/navigation";
import { useState } from "react";
import useDetectKeyboardOpen from "use-detect-keyboard-open";

interface Props {
  stat: string;
  handleSubmit: () => void;
  orderLoading: boolean;
  clients: {
    name: string;
    surName: string;
    email: string;
    phone: string;
    nationality: string;
  };
}

export default function BottomDialog({
  stat,
  handleSubmit,
  orderLoading,
  clients,
}: Props) {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");
  const [isChecked, setIsChecked] = useState(false);
  const isKeyboardOpen = useDetectKeyboardOpen();

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div
      className={`${
        isKeyboardOpen === true ? "hidden" : "fixed"
      } bottom-0 left-0 z-[200] flex w-full flex-col items-center gap-[20px] rounded-t-[20px] bg-white px-[24px] py-[16px] shadow-[0px_0px_12px_2px_rgb(0,0,0,0.15)] sm:left-[50%] sm:w-[calc(100%-100px)] sm:translate-x-[-50%] md:w-[calc(100%-144px)] lg:hidden`}
    >
      <div className="flex w-full items-center justify-center gap-[8px] text-[12px] leading-[14px] text-sub-text/75 sm:text-[14px]">
        <input
          type="checkBox"
          name="termCheck"
          className={`${
            clients.name === "" &&
            clients.surName === "" &&
            clients.email === "" &&
            clients.phone === ""
              ? " cursor-not-allowed"
              : "cursor-pointer"
          } border-black/[.25] focus:ring-0`}
          checked={isChecked}
          onChange={handleCheckboxChange}
          disabled={
            clients.name === "" &&
            clients.surName === "" &&
            clients.email === "" &&
            clients.phone === ""
          }
        />
        <label htmlFor="termCheck">
          {lang === "en" ? (
            <>
              Accept{" "}
              <span className="underline ">Service and Cancelation term</span>
            </>
          ) : (
            <>
              <span className="underline ">
                Үйлчилгээний болон Цуцлалтын нөхцөл
              </span>{" "}
              зөвшөөрөх
            </>
          )}
        </label>
      </div>
      <button
        className={`flex w-full max-w-[375px] items-center justify-center rounded-full bg-main-online py-[8px] font-medium text-white ${
          orderLoading === true ? "sm:text-[12px]" : "sm:text-[18px]"
        } ${
          orderLoading === true || isChecked === false
            ? "cursor-not-allowed opacity-50"
            : ""
        }`}
        onClick={handleSubmit}
        disabled={orderLoading === true || isChecked === false}
      >
        {stat === "online"
          ? `${
              orderLoading === true
                ? `${lang === "en" ? "Loading..." : "Уншиж байна..."}`
                : `${lang === "en" ? "Proceed to payment" : "Төлбөр төлөх"}`
            }`
          : `${lang === "en" ? "" : ""}`}
      </button>
    </div>
  );
}
