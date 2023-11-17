import { useSearchParams } from 'next/navigation';

interface Props {
  count: number;
}

const OrderCount = ({ count }: Props) => {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');
  return (
    <div className="relative h-[110px] w-full max-w-[400px] self-center lg:h-[120px] ">
      <div className="absolute top-[12px] z-20 w-[200px] rounded-[6px] bg-primary-blue py-[8px] pl-[25px] pr-[12px] text-[15px] font-medium text-white lg:top-[16px]">
        {lang === 'en' ? 'Total order count' : 'Нийт захиалсан тоо'}
      </div>
      <div className="absolute left-[6%] top-0  z-10 flex h-[110px] w-[88%] items-end justify-center rounded-[16px] bg-white pb-[10px] text-[30px] font-bold text-primary-blue shadow-[0px_0px_12px_4px_rgb(0,0,0,0.15)] lg:h-[120px]">
        {count}
      </div>
      <div className="absolute top-[12px] z-0 h-[38px] w-[50px] translate-x-[8px] translate-y-[22px] rotate-[45deg]  bg-[#2E59C0] lg:top-[16px]"></div>
    </div>
  );
};

export default OrderCount;
