import Image from 'next/image';
import { useAppCtx } from '@/utils/app';
import HotelCard from '../common/hotelCard';

interface iProps {
  cap: number;
  title: string;
  data: any[];
}

const Featured = ({ cap, title, data }: iProps) => {
  const { appState } = useAppCtx();

  const hotels = [
    {
      key: 1,
      img: '/samples/hotel1.png',
      name: 'Lorem ipsum dolor sit amet. 1',
      location: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. 1',
      stat: 'online',
      review: 9.6,
      price: 70000,
    },
    {
      key: 2,
      img: '/samples/hotel2.png',
      name: 'Lorem ipsum dolor sit amet. 2',
      location: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. 2',
      stat: 'pending',
      review: 9.6,
      price: 70000,
    },
    {
      key: 3,
      img: '/samples/hotel3.png',
      name: 'Lorem ipsum dolor sit amet. 3',
      location: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. 3',
      stat: 'offline',
      review: 9.6,
      price: 70000,
    },
    {
      key: 4,
      img: '/samples/hotel4.png',
      name: 'Lorem ipsum dolor sit amet. 4',
      location: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. 4',
      stat: 'data',
      review: 9.6,
      price: 70000,
    },
    {
      key: 5,
      img: '/samples/hotel1.png',
      name: 'Lorem ipsum dolor sit amet. 1',
      location: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. 1',
      stat: 'online',
      review: 9.6,
      price: 70000,
    },
    {
      key: 6,
      img: '/samples/hotel2.png',
      name: 'Lorem ipsum dolor sit amet. 2',
      location: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. 2',
      stat: 'pending',
      review: 9.6,
      price: 70000,
    },
    {
      key: 7,
      img: '/samples/hotel1.png',
      name: 'Lorem ipsum dolor sit amet. 1',
      location: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. 1',
      stat: 'online',
      review: 9.6,
      price: 70000,
    },
    {
      key: 8,
      img: '/samples/hotel2.png',
      name: 'Lorem ipsum dolor sit amet. 2',
      location: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. 2',
      stat: 'pending',
      review: 9.6,
      price: 70000,
    },
  ];
  // const adjustedList = data;
  // for (let i = 0; i < cap; i++) {
  //   adjustedList.push(data[i]);
  // }
  if (cap != 0) {
    data = data.slice(0, cap);
  }
  return (
    <div className="w-full px-[16px] pt-[32px] sm:px-[72px] md:px-[120px] lg:px-[150px] lg:py-[0] 2xl:px-[200px]">
      <div
        className={`flex w-full flex-col gap-[24px] border-t-2 border-dashed border-black/[.15] pt-[32px] lg:gap-[32px] ${
          title === '' ? 'mt-[-64px] border-none' : ''
        }`}
        // style={{ borderTop: 'dashed 2px rgb(0 0 0 /15%)' }}
      >
        {title !== '' ? (
          <h3 className="text-[20px] font-bold text-main-text">
            {title === 'cheap'
              ? appState.lang === 'mn'
                ? 'Тохилог & Хямд буудлууд'
                : 'Comfortable & Cheap hotels'
              : null}
            {title === 'hotels'
              ? appState.lang === 'mn'
                ? 'Онцлох зочид буудлууд'
                : 'Featured hotels'
              : null}
            {title === 'camps'
              ? appState.lang === 'mn'
                ? 'Онцлох амралтын газрууд'
                : 'Featured camps'
              : null}
          </h3>
        ) : null}
        {/* cardContainer */}
        <div
          className={`grid grid-rows-${cap} gap-[32px] lg:grid-cols-2 lg:grid-rows-2 xl:grid-cols-3 xl:grid-rows-1 xl:gap-[24px] 2xl:gap-[48px]`}
        >
          {data.map((data, i: number) => (
            <HotelCard data={data} key={i} />
          ))}
        </div>
        {cap !== 3 ? (
          <div className="flex max-w-[171px] cursor-pointer items-center justify-center self-center rounded-full bg-primary-blue px-[16px] py-[8px] text-[16px] text-white">
            <p className="flex gap-[4px]">
              {appState.lang === 'mn' ? 'Цааш үзэх' : 'More'}{' '}
              <span>(100+)</span>
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Featured;

// {
//   data.map((data) => (
//     <div
//       key={data.id}
//       className={` mb-0 flex w-full flex-col justify-between gap-[16px] overflow-hidden rounded-[20px] pb-0 shadow-[0_8px_30px_rgb(0,0,0,0.20)] xl:gap-[24px] ${
//         data.isOffline == 1 && data.isOnline == 0 && data.phone === null
//           ? 'max-h-[350px] xl:max-h-[380px] 2xl:max-h-[410px]'
//           : null
//       }`}
//     >
//       {/* image */}
//       <div className="relative h-[200px] w-full overflow-hidden rounded-[20px] shadow-[0_3px_10px_rgb(0,0,0,0.2)] xs:h-[225px] sm:h-[250px] md:h-[300px] lg:h-[225px] xl:h-[250px] 2xl:h-[275px]">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="rgb(255 255 255/50%)"
//           viewBox="0 0 24 24"
//           strokeWidth={2.2}
//           stroke="currentColor"
//           className="absolute right-[16px] top-[16px] z-50 h-[24px] w-[24px] text-primary-blue"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
//           />
//         </svg>

//         <Image
//           // src={data.img}
//           src={`https://sandbox.api.myhotel.mn/image?path=${data.image}`}
//           // src={`https://ihotel.mn/${data.coverPhoto}`}
//           alt="/hotel"
//           fill={true}
//           priority
//           quality={75}
//           sizes="50vw"
//           className="object-cover w-full h-auto duration-500 hover:scale-110"
//         />
//       </div>
//       {/* bottom section */}
//       <div
//         className={`flex h-auto w-full flex-col gap-[12px] pl-[14px] ${
//           data.isOffline == 1 && data.isOnline == 0 && data.phone === null
//             ? ' opacity-50'
//             : null
//         }`}
//       >
//         {/* data.stat === 'data' ? ' opacity-50' : null */}
//         {/* name & location */}
//         <div className="flex w-full flex-col gap-[12px] justify-self-start pr-[14px]">
//           <h3 className="text-[18px]  font-medium leading-[18px] text-main-text">
//             {appState.lang === 'mn' ? data.name : data.nameEn}
//           </h3>
//           <p className="overflow-hidden text-[14px] leading-[13px] text-sub-text/60">
//             {data.address
//               ? data.address.length > 70
//                 ? data.address.slice(0, 70) + '...'
//                 : data.address
//               : ''}
//             {/* {appState.lang === 'mn'
//                       ? data.excerpt.length > 50
//                         ? data.excerpt.slice(0, 50) + '...'
//                         : data.excerpt
//                       : ''} */}
//           </p>
//         </div>
//         {/* review & stat */}
//         <div
//           className={`relative mb-0 flex w-full gap-[12px] pr-[8px] text-white ${
//             data.isOffline === 1 && data.isOnline === 0 && data.phone === null
//               ? 'mb-0 justify-between pb-0 pr-[24px] md:mb-[8px] md:pr-[32px]'
//               : 'mb-0 justify-start pb-0'
//           }`}
//         >
//           {/* review */}
//           <div className="flex h-[31px] min-w-[50px] items-center justify-center gap-[2px] rounded-[8px] bg-primary-blue text-[14px]">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="white"
//               viewBox="0 2 24 24"
//               strokeWidth={1}
//               stroke="white"
//               className="h-[12px] w-[12px]"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
//               />
//             </svg>
//             <p>{data.rating}</p>
//           </div>
//           {/* stat */}
//           {data.isOffline !== 1 ? (
//             <div
//               className={`flex h-[31px] items-center justify-center gap-[4px] rounded-[8px]  text-center font-medium ${
//                 data.isOnline === 1 && data.isOffline === 0
//                   ? 'bg-main-online px-[16px] text-[14px]'
//                   : data.isOffline === 0 && data.isOnline === 0
//                   ? 'bg-main-pending px-[6px] text-[11px] leading-[11px] text-main-text xs:px-[8px] xs:text-[12px] xs:leading-[12px]'
//                   : data.isOffline === 1 &&
//                     data.isOnline === 0 &&
//                     data.phone !== null
//                   ? 'bg-main-offline px-[6px] text-[11px] leading-[11px] xs:px-[12px] xs:text-[12px]'
//                   : null
//               }`}
//             >
//               <p>
//                 {data.isOnline === 1 && data.isOffline === 0
//                   ? 'Шууд баталгаажна'
//                   : data.isOnline === 0 && data.isOffline === 0
//                   ? 'Баталгаажих хугацаа:'
//                   : data.isOnline === 0 &&
//                     data.isOffline === 1 &&
//                     data.phone !== null
//                   ? 'Онлайн захиалга боломжгүй'
//                   : ''}
//                 {data.isOnline === 0 && data.isOffline === 0 ? (
//                   <span className="text-[14px] font-bold"> 1-3цаг</span>
//                 ) : null}
//               </p>
//             </div>
//           ) : (
//             <div className="self-end">
//               <p className="text-[22px] font-bold text-main-text">
//                 {data.includedPrice ? data.includedPrice : 70000} MNT
//                 <span className="text-[14px] text-sub-text/75"> / хоног</span>
//               </p>
//             </div>
//           )}
//         </div>
//         {/* price & orderBtn */}
//         {data.isOffline !== 1 && data.isOnline !== 0 && data.phone !== null ? (
//           <div
//             className={`flex items-center justify-between ${
//               data.isOffline === 1 && data.isOnline === 0 && data.phone === null
//                 ? 'h-0'
//                 : null
//             }`}
//           >
//             <p className="text-[16px] font-bold text-main-text xs:text-[18px] sm:text-[20px] lg:text-[20px]">
//               {data.includedPrice ? data.includedPrice : 70000} MNT
//               <span className="text-[12px] text-sub-text/75 xs:text-[14px]">
//                 / хоног
//               </span>
//             </p>
//             <div
//               className={`m-0 flex items-center justify-center gap-[4px] self-end rounded-tl-[20px] bg-primary-blue py-[10px] text-[12px] font-medium text-white xs:text-[14px] lg:py-[8px] ${
//                 data.isOffline === 1
//                   ? 'px-[18px] xs:px-[24px] sm:text-[16px] lg:px-[20px] lg:py-[12px]'
//                   : 'px-[12px] xs:px-[16px] sm:text-[16px] lg:px-[16px] lg:py-[12px]'
//               }`}
//             >
//               <p>
//                 {data.isOffline === 1 &&
//                 data.isOnline === 0 &&
//                 data.phone !== null
//                   ? 'Харах'
//                   : 'Захиалах'}
//               </p>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 2 20 20"
//                 strokeWidth={3}
//                 stroke="white"
//                 className="h-[12px] w-[12px]"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M8.25 4.5l7.5 7.5-7.5 7.5"
//                 />
//               </svg>
//             </div>
//           </div>
//         ) : null}
//       </div>
//     </div>
//   ));
// }
