import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import useWindowSize from '@/hooks/windowSize';

interface Props {
  data: string[];
}

const Amenity = ({ data }: Props) => {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');
  const size = useWindowSize();

  const sample = [
    { key: 0, name: 'Утасгүй интернэт', nameEn: 'Wifi', category: 'wifi' },
    { key: 1, name: 'Мини бар', nameEn: 'Minibar', category: 'fridge' },
    { key: 2, name: 'Буфет', nameEn: 'Buffet', category: 'food' },
    {
      key: 3,
      name: 'Өглөөний цай (үнэгүй)',
      nameEn: 'Breakfast (free)',
      category: 'food',
    },
    {
      key: 4,
      name: 'Европ хоолны ресторан',
      nameEn: 'European restaurant',
      category: 'food',
    },
    {
      key: 5,
      name: 'Тосох үйлчилгээ (төлбөртэй)',
      nameEn: 'Pick up service',
      category: 'drive',
    },
    {
      key: 6,
      name: 'Өдөр тутмын цэвэрлэгээ',
      nameEn: 'Daily cleaning',
      category: 'daily',
    },
    { key: 7, name: 'Англи', nameEn: 'English', category: 'lang' },
    { key: 8, name: 'Хятад', nameEn: 'Chinese', category: 'lang' },
    { key: 9, name: 'Япон', nameEn: 'Japanese', category: 'lang' },
    { key: 10, name: 'Франц', nameEn: 'French', category: 'lang' },
    { key: 11, name: 'Орос', nameEn: 'Russian', category: 'lang' },
    { key: 12, name: 'Монгол', nameEn: 'Mongolian', category: 'lang' },
  ];
  return (
    <div className="flex flex-col gap-[16px] border-t-[1px] border-t-black/[.1] pt-[24px] text-[16px] text-main-text lg:gap-[24px] lg:border-none lg:pt-0">
      <p className=" text-[20px] font-medium leading-[20px]">
        {lang === 'en' ? 'Amenities' : 'Уг газарт'}
      </p>
      <div className="flex w-full flex-wrap gap-[12px] 2xs:gap-[8px] sm:gap-[12px] lg:gap-[16px]">
        {data?.length > 3
          ? data
              .splice(0, open === false ? 4 : data.length)
              .map((index, i) => <div key={i}></div>)
          : sample
              .slice(
                0,
                open === false
                  ? size.width && size?.width < 360
                    ? 3
                    : size.width && size?.width < 450
                    ? 4
                    : size.width && size?.width < 640
                    ? 5
                    : size.width && size?.width < 800
                    ? 6
                    : size.width && size?.width < 850
                    ? 7
                    : size.width && size?.width < 1000
                    ? 8
                    : 10
                  : sample.length,
              )
              .map((index, i) => (
                <div
                  key={i}
                  className="md:w-[86px]lg:h-[90px] flex h-[84px] w-[84px] flex-col justify-between rounded-[10px] border border-sub-text/[.35] bg-white p-[6px] text-main-text 2xs:h-[76px] 2xs:w-[76px] sm:h-[80px] sm:w-[80px]  sm:p-[8px] md:h-[86px] lg:w-[90px]"
                >
                  {index.category === 'wifi' ? (
                    // wifi
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.75}
                      stroke="currentColor"
                      className="max-h-[18px] min-h-[18px] min-w-[18px] max-w-[18px] text-main-online"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565
                         14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"
                      />
                    </svg>
                  ) : index.category === 'fridge' ? (
                    // fridge
                    <svg
                      viewBox="0 0 14 16"
                      className="max-h-[18px] min-h-[18px] min-w-[18px] max-w-[18px] "
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.1675 1H1.70844C1.04104 1 0.5 1.44772 0.5 2V12C0.5 12.5523 1.04104 13 1.70844 13H10.1675C10.8349
                         13 11.376 12.5523 11.376 12V2C11.376 1.44772 10.8349 1 10.1675 1Z"
                        stroke="#444444"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M0.5 6.5H11.376M2.91688 3.5V4M2.31266 13V14M9.5633 13V14"
                        stroke="#444444"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : index.category === 'food' ? (
                    // food
                    <svg
                      className="max-h-[18px] min-h-[18px] min-w-[18px] max-w-[18px] "
                      viewBox="0 0 17 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.5949 0.528094V12.4803C13.5949 12.6182 13.5327 12.7503 13.4218 12.8478C13.311 12.9452 13.1606 13 13.0039 13C12.8471 13 12.6967 12.9452 12.5859 12.8478C12.475 12.7503 12.4128 12.6182 12.4128 12.4803V9.36236H8.86626C8.7095 9.36236 8.55915 9.30761 8.4483 9.21015C8.33745 9.1127 8.27518 8.98052 8.27518 8.8427C8.30263 7.5979 8.48146 6.35925 8.80863 5.1479C9.53123 2.51775 10.9011 0.754797 12.7711 0.050654C12.861 0.0168047 12.959 0.00308804 13.0564 0.0107334C13.1538 0.0183787 13.2475 0.047147 13.3292 0.0944607C13.4108 0.141774 13.4778 0.206155 13.5242 0.281834C13.5706 0.357514 13.5949 0.442128 13.5949 0.528094ZM6.4938 0.442999C6.48222 0.374764 6.45531 0.309238 6.41462 0.250244C6.37394 0.19125 6.3203 0.139969 6.25684 0.099391C6.19337 0.0588133 6.12136 0.0297517 6.04498 0.0139012C5.96861 -0.00194933 5.88941 -0.00427132 5.81201 0.00707059C5.7346 0.0184125 5.66054 0.0431914 5.59415 0.0799617C5.52775 0.116732 5.47034 0.164758 5.42528 0.221238C5.38022 0.277718 5.3484 0.341521 5.33167 0.408927C5.31495 0.476333 5.31366 0.545991 5.32789 0.613838L5.90271 3.64607H4.13759V0.528094C4.13759 0.390271 4.07531 0.258093 3.96446 0.160637C3.85361 0.0631815 3.70327 0.00843135 3.5465 0.00843135C3.38974 0.00843135 3.2394 0.0631815 3.12855 0.160637C3.0177 0.258093 2.95542 0.390271 2.95542 0.528094V3.64607H1.1903L1.76513 0.613838C1.77935 0.545991 1.77806 0.476333 1.76134 0.408927C1.74461 0.341521 1.71279 0.277718 1.66773 0.221238C1.62267 0.164758 1.56526 0.116732 1.49886 0.0799617C1.43247 0.0431914 1.35841 0.0184125 1.281 0.00707059C1.2036 -0.00427132 1.1244 -0.00194933 1.04803 0.0139012C0.971654 0.0297517 0.899635 0.0588133 0.836172 0.099391C0.772708 0.139969 0.719071 0.19125 0.678387 0.250244C0.637703 0.309238 0.610788 0.374764 0.599212 0.442999L0.00812745 3.56098C0.0028228 3.5891 0.000104825 3.61756 0 3.64607C0.00118104 4.38257 0.298437 5.095 0.839242 5.65746C1.38005 6.21993 2.12959 6.59623 2.95542 6.71988V12.4803C2.95542 12.6182 3.0177 12.7503 3.12855 12.8478C3.2394 12.9452 3.38974 13 3.5465 13C3.70327 13 3.85361 12.9452 3.96446 12.8478C4.07531 12.7503 4.13759 12.6182 4.13759 12.4803V6.71988C4.96342 6.59623 5.71296 6.21993 6.25377 5.65746C6.79457 5.095 7.09183 4.38257 7.09301 3.64607C7.09291 3.61756 7.09019 3.5891 7.08488 3.56098L6.4938 0.442999Z"
                        fill="#444444"
                      />
                    </svg>
                  ) : index.category === 'drive' ? (
                    // drive
                    <svg
                      className="max-h-[18px] min-h-[18px] min-w-[18px] max-w-[18px] "
                      viewBox="1 2.5 17 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.86637 3.31605L4.08133 5.51409H12.9183L12.1332 3.31605C11.9979 2.93891 11.6339 2.68552 11.2249 2.68552H5.77473C5.36566
                         2.68552 5.00172 2.93891 4.86637 3.31605ZM1.9909 5.65552L3.04965 2.69436C3.4557 1.55998 4.54754 0.799805 5.77473
                          0.799805H11.2249C12.4521 0.799805 13.5439 1.55998 13.95 2.69436L15.0087 5.65552C15.7065 5.93838 16.1998 6.61311 16.1998
                           7.3998V13.0569C16.1998 13.5785 15.7697 13.9998 15.2373 13.9998H14.2748C13.7424 13.9998 13.3123 13.5785 13.3123
                            13.0569V11.6427H3.6873V13.0569C3.6873 13.5785 3.25719 13.9998 2.7248 13.9998H1.7623C1.22992 13.9998 0.799805
                             13.5785 0.799805 13.0569V7.3998C0.799805 6.61311 1.29309 5.93838 1.9909 5.65552ZM4.6498 8.34266C4.6498 8.0926 4.5484
                              7.85278 4.36789 7.67596C4.18739 7.49914 3.94258 7.3998 3.6873 7.3998C3.43203 7.3998 3.18722 7.49914 3.00671 7.67596C2.82621
                               7.85278 2.7248 8.0926 2.7248 8.34266C2.7248 8.59272 2.82621 8.83254 3.00671 9.00936C3.18722 9.18618 3.43203 9.28552 3.6873
                                9.28552C3.94258 9.28552 4.18739 9.18618 4.36789 9.00936C4.5484 8.83254 4.6498 8.59272 4.6498 8.34266ZM13.3123 9.28552C13.5676
                                 9.28552 13.8124 9.18618 13.9929 9.00936C14.1734 8.83254 14.2748 8.59272 14.2748 8.34266C14.2748 8.0926 14.1734 7.85278
                                  13.9929 7.67596C13.8124 7.49914 13.5676 7.3998 13.3123 7.3998C13.057 7.3998 12.8122 7.49914 12.6317 7.67596C12.4512
                                   7.85278 12.3498 8.0926 12.3498 8.34266C12.3498 8.59272 12.4512 8.83254 12.6317 9.00936C12.8122 9.18618 13.057 9.28552
                                    13.3123 9.28552Z"
                        fill="#444444"
                      />
                    </svg>
                  ) : index.category === 'daily' ? (
                    // daily
                    <svg
                      className="max-h-[18px] min-h-[18px] min-w-[18px] max-w-[18px] "
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6.8625 0.0271663C8.15692 -0.0833052 9.45783 0.144367 10.6378 0.68788C11.8178 1.23139 12.8364
                         2.07211 13.5938 3.12767V1.6407C13.5938 1.45421 13.6678 1.27536 13.7997 1.14349C13.9316 1.01162 14.1104
                          0.937535 14.2969 0.937535C14.4834 0.937535 14.6622 1.01162 14.7941 1.14349C14.9259 1.27536 15 1.45421
                           15 1.6407V5.62533H11.0156C10.8291 5.62533 10.6503 5.55124 10.5184 5.41937C10.3866 5.2875 10.3125 5.10865
                            10.3125 4.92216C10.3125 4.73567 10.3866 4.55681 10.5184 4.42494C10.6503 4.29307 10.8291 4.21899 11.0156
                             4.21899H12.6347C11.9935 3.21571 11.0726 2.42224 9.98552 1.93659C8.89847 1.45093 7.69298 1.29438 6.51795
                              1.48625C5.34293 1.67813 4.24984 2.21004 3.37373 3.01627C2.49761 3.8225 1.87685 4.86773 1.58812 6.02285C1.56683
                               6.11359 1.5277 6.19919 1.47303 6.27467C1.41836 6.35015 1.34922 6.41401 1.26965 6.46253C1.19008 6.51106 1.10165
                                6.54327 1.00952 6.55731C0.917381 6.57135 0.823373 6.56693 0.732961 6.54431C0.642548 6.52169 0.557534 6.48132
                                 0.482863 6.42555C0.408191 6.36978 0.345352 6.29972 0.297998 6.21944C0.250645 6.13916 0.219723 6.05027 0.20703
                                  5.95793C0.194337 5.8656 0.200127 5.77166 0.224062 5.68158C0.603322 4.16501 1.44694 2.80485 2.63699 1.79123C3.82705
                                   0.777601 5.30405 0.161172 6.86156 0.0281038L6.8625 0.0271663ZM3.675 13.9518C4.67999 14.5475 5.81023 14.9002 6.97564
                                    14.9817C8.14104 15.0633 9.30938 14.8714 10.3875 14.4214C11.4657 13.9715 12.4238 13.2759 13.1855 12.3901C13.9473
                                     11.5043 14.4916 10.4527 14.775 9.3193C14.8172 9.13948 14.787 8.95026 14.6908 8.79255C14.5947 8.63484 14.4403
                                      8.52131 14.2611 8.47648C14.0819 8.43165 13.8923 8.45913 13.7332 8.55298C13.5741 8.64683 13.4584 8.79951 13.4109
                                       8.97803C13.1221 10.1329 12.5013 11.1779 11.6252 11.9839C10.7492 12.7899 9.65628 13.3217 8.48145 13.5136C7.30663
                                        13.7054 6.10133 13.549 5.01441 13.0635C3.9275 12.5781 3.00655 11.7849 2.36531 10.7819H3.98438C4.17086 10.7819
                                         4.3497 10.7078 4.48156 10.5759C4.61342 10.4441 4.6875 10.2652 4.6875 10.0787C4.6875 9.89223 4.61342 9.71338
                                          4.48156 9.58151C4.3497 9.44964 4.17086 9.37556 3.98438 9.37556H0V13.3602C0 13.5467 0.074079 13.7255 0.205941
                                           13.8574C0.337802 13.9893 0.516645 14.0633 0.703125 14.0633C0.889605 14.0633 1.06845 13.9893 1.20031
                                            13.8574C1.33217 13.7255 1.40625 13.5467 1.40625 13.3602V11.8732C2.01073 12.7154 2.78324 13.4232 3.675 13.9518Z"
                        fill="#444444"
                      />
                    </svg>
                  ) : index.category === 'lang' ? (
                    // lang
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="2.5 2.5 22 22"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="max-h-[18px] min-h-[18px] min-w-[18px] max-w-[18px] "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427
                         1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9
                          9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586
                           1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25"
                      />
                    </svg>
                  ) : (
                    <></>
                  )}
                  <p className="text-[11px] leading-[12px] text-main-text lg:text-[12px] lg:leading-[13px]">
                    {lang === 'en' ? index.nameEn : index.name}
                  </p>
                </div>
              ))}
      </div>
      <div
        className="flex items-center gap-[8px] text-[15px] font-medium leading-[15px] text-primary-blue lg:text-[16px] lg:leading-[17px]"
        onClick={() => setOpen(!open)}
      >
        <p>
          {open === false
            ? `${lang === 'en' ? 'More' : 'Дэлгэрэнгүй'}`
            : `${lang === 'en' ? 'Less' : 'Хураангуй'}`}
        </p>
        <svg
          viewBox="0 0 15 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`max-h-[14px] min-h-[14px] min-w-[14px] max-w-[14px] ${
            open === true && 'rotate-180'
          }`}
        >
          <path d="M1 1L7.5 8L1 1ZM7.5 8L14 1L7.5 8Z" fill="#3C76FE" />
          <path
            d="M1 1L7.5 8L14 1"
            stroke="#3C76FE"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default Amenity;
