import { useSearchParams } from 'next/navigation'
import { Collapse, Button, useDisclosure } from '@chakra-ui/react';

export default function CancelTerm() {
  const searchParams = useSearchParams()
  const lang = searchParams.get('lang')
  const { isOpen, onToggle } = useDisclosure();

  return (
    <div className="flex h-auto w-full flex-col  rounded-[20px] px-[20px] shadow-[0px_0px_12px_2px_rgb(0,0,0,0.15)]">
      {/* title */}
      <Button
        onClick={onToggle}
        className="!m-0 flex h-[41px] sm:h-[46px] w-full items-center !justify-between"
      >
        <p className="text-[18px] font-medium leading-[18px] text-sub-text">
          {lang === 'en' ? 'Term of cancellation' : 'Цуцлалтын нөхцөл'}
        </p>
        <div className="relative h-[20px] w-[20px] rounded-full bg-primary-blue/25">
          <div
            className={`absolute left-[50%] top-[50%] h-[3px] w-[14px] translate-x-[-50%] translate-y-[-50%] rounded-full bg-primary-blue ${
              isOpen === true
                ? 'rotate-[180deg] duration-500'
                : 'rotate-0 duration-500'
            }`}
          ></div>
          <div
            className={`absolute left-[50%] top-[50%] h-[14px] w-[3px] translate-x-[-50%] translate-y-[-50%] rounded-full bg-primary-blue ${
              isOpen === true
                ? 'rotate-[270deg] duration-500'
                : 'rotate-0 duration-500'
            }`}
          ></div>
        </div>
      </Button>
      {/* info */}
      <Collapse
        in={isOpen}
        animateOpacity
        className={`!flex w-full !flex-col !gap-[16px] sm:!gap-[20px] ${
          isOpen === true ? 'mt-[10px] h-auto pb-[16px] sm:pb-[20px] ' : 'hidden'
        }`}
      >
        <div className="relative w-full overflow-hidden rounded-[20px] border border-black/[.15] px-[8px] text-center">
          <div className="absolute left-0 top-0 h-[47px] w-full bg-black/5"></div>
          <table className="w-full px-[12px] text-[10px] 2xs:text-[12px] leading-[12px]  text-sub-text/75">
            <thead className="text-main-text ">
              <tr className="h-[47px] w-full">
                <th className="font-medium">
                  {lang === 'en'
                    ? 'Allowed dates for cancellation'
                    : 'Цуцлах боломжит хугацаа'}
                </th>
                <th className="font-medium">
                  {lang === 'en' ? '% of total amount' : 'Нийт үнийн дүнгийн'}
                </th>
                <th className="font-medium">
                  {lang === 'en' ? 'Cancellation fee' : 'Торгууль'}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="h-[47px]">
                <td>
                  {lang === 'en' ? 'Until Nov 10 2023' : '2023-10-28 хүртэл'}
                </td>
                <td>0%</td>
                <td>{lang === 'en' ? 'No fees' : 'Торгуульгүй'}</td>
              </tr>
              <tr className="h-[47px]">
                <td>
                  {lang === 'en'
                    ? 'Between Nov 10 2023 & Nov 20 2023'
                    : '2023-10-28 - 2023-10-31 хооронд'}
                </td>
                <td>10%</td>
                <td>10,000₮</td>
              </tr>
              <tr className="h-[47px]">
                <td>
                  {lang === 'en'
                    ? 'Between Nov 20 2023 & Nov 30 2023'
                    : '2023-11-02 - 2023-11-50 хооронд'}
                </td>
                <td>20%</td>
                <td>20,000₮</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Collapse>
    </div>
  );
}
