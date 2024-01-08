import { useSearchParams } from "next/navigation";
import { unserialize } from "serialize-php";
import format from "date-fns/format";
import subDays from "date-fns/subDays";

interface TermOfCancel {
  day: string;
  fee: string;
}
interface Props {
  data: string;
  totalPrice: { value: number; value_en: number };
  checkIn: string;
}

export default function TermOfCancel({ data, totalPrice, checkIn }: Props) {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");
  const cancelationData: TermOfCancel[] = unserialize(data);

  return (
    <div className="flex flex-col gap-[16px] w-full items-center">
      <p className="text-[18px] text-main-text font-semibold leading-[20px] w-full text-center border-t border-t-black/[.15] pt-[24px]">
        {lang === "en" ? "Term of cancellation" : "Цуцлалтын нөхцөл"}
      </p>
      <div className="relative w-full overflow-hidden rounded-[20px] border border-black/[.15] px-[8px] text-center">
        <div className="absolute left-0 top-0 h-[60px] w-full bg-black/5"></div>
        <table className="w-full px-[12px] text-[10px] leading-[12px] text-sub-text/75  2xs:text-[12px] lg:text-[14px] lg:leading-[16px]">
          <thead className="text-main-text ">
            <tr className="h-[60px] w-full">
              <th className="font-medium">
                {lang === "en"
                  ? "Allowed dates for cancellation"
                  : "Цуцлах боломжит хугацаа"}
              </th>
              <th className="font-medium">
                {lang === "en" ? "% of total amount" : "Нийт үнийн дүнгийн"}
              </th>
              <th className="font-medium">
                {lang === "en" ? "Cancellation fee" : "Торгууль"}
              </th>
            </tr>
          </thead>
          <tbody>
            {cancelationData
              ? cancelationData.map((index, i) => (
                  <tr className="h-[60px]" key={i}>
                    <td>
                      {lang === "en"
                        ? `Until ${format(
                            subDays(new Date(checkIn), parseInt(index.day)),
                            `${lang === "en" ? "MMM dd yyyy" : "yyyy-MM-dd"}`,
                          )}`
                        : `${format(
                            subDays(new Date(checkIn), parseInt(index.day)),
                            `${lang === "en" ? "MMM dd yyyy" : "yyyy-MM-dd"}`,
                          )} хүртэл`}
                    </td>
                    <td>{index.fee}%</td>
                    <td>
                      {lang === "en"
                        ? `${
                            (totalPrice.value_en / 100) * parseInt(index.fee)
                          } $`
                        : `${(totalPrice.value / 100) * parseInt(index.fee)} ₮`}
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
