import { useState } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

interface Props {
  data: roomData.room;
}

const RoomCard = ({ data }: Props) => {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');
  const [openDesc, setOpenDesc] = useState(false);

  return (
    <div className="flex flex-col overflow-hidden rounded-[16px] shadow-[0px_0px_12px_2px_rgb(0,0,0,0.25)]">
      <div className="relative h-[225px] w-full bg-sky-500 2xs:h-[260px] sm:h-[300px] ">
        <Image
          //   src={
          //     data.photos !== null
          //       ? `https://sandbox.api.myhotel.mn/image?path=${
          //           data.photos.split('"')[1]
          //         }`
          //       : '/samples/camp.png'
          //   }
          src={'/samples/camp.png'}
          alt="/hotel"
          fill={true}
          //   priority
          quality={75}
          loading="lazy"
          sizes="50vw"
          placeholder="blur"
          //   blurDataURL={
          //     data.photos !== null
          //       ? `"_next/image/?url=${data.photos}"`
          //       : '/samples/camp.png'
          //   }
          blurDataURL="/samples/camp.png"
          className="absolute h-auto w-auto select-none object-cover duration-700 hover:scale-110"
          draggable={false}
        />
      </div>
      <div className="flex w-full flex-col gap-[20px] px-[16px] pb-[20px] pt-[24px]">
        {/* name */}
        <p className="text-[18px] font-bold text-main-text">
          {lang === 'en' ? data.nameEn : data.name}{' '}
          <span className="text-[14px] text-sub-text">({data.bedNumber})</span>
        </p>
        {/* bed, size, occupancy */}
        <div className="flex w-full justify-start gap-[16px] text-[16px] font-medium text-main-text">
          <div className="flex items-center gap-[8px] rounded-[8px] bg-black/10 px-[16px] py-[8px] ">
            <svg
              viewBox="0 0 21 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="max-h-[14px] min-h-[14px] min-w-[21px] max-w-[21px]"
            >
              <path
                d="M17.1818 1.86667H9.54545V8.4H1.90909V0H0V14H1.90909V11.2H19.0909V14H21V5.6C21 4.60986 20.5977 3.66027 19.8817 2.96013C19.1656 2.26 18.1945 1.86667 17.1818 1.86667ZM5.72727 7.46667C6.48676 7.46667 7.21513 7.17167 7.75217 6.64657C8.28921 6.12146 8.59091 5.40927 8.59091 4.66667C8.59091 3.92406 8.28921 3.21187 7.75217 2.68677C7.21513 2.16167 6.48676 1.86667 5.72727 1.86667C4.96779 1.86667 4.23941 2.16167 3.70238 2.68677C3.16534 3.21187 2.86364 3.92406 2.86364 4.66667C2.86364 5.40927 3.16534 6.12146 3.70238 6.64657C4.23941 7.17167 4.96779 7.46667 5.72727 7.46667Z"
                fill="#212529"
              />
            </svg>
            <p>{data.bedNumber}</p>
          </div>
          <div className="flex items-center gap-[8px] rounded-[8px] bg-black/10 px-[16px] py-[8px] ">
            <svg
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="max-h-[14px] min-h-[14px] min-w-[14px] max-w-[14px]"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.2921 0C13.4799 0 13.6599 0.0745786 13.7927 0.207329C13.9254 0.34008 14 0.520128 14 0.707865V7C14 7.18774 13.9254 7.36779 13.7927 7.50054C13.6599 7.63329 13.4799 7.70786 13.2921 7.70786C13.1044 7.70786 12.9243 7.63329 12.7916 7.50054C12.6588 7.36779 12.5843 7.18774 12.5843 7V2.41618L2.41618 12.5843H7C7.18774 12.5843 7.36779 12.6588 7.50054 12.7916C7.63329 12.9243 7.70786 13.1044 7.70786 13.2921C7.70786 13.4799 7.63329 13.6599 7.50054 13.7927C7.36779 13.9254 7.18774 14 7 14H0.707865C0.520128 14 0.34008 13.9254 0.207329 13.7927C0.0745786 13.6599 0 13.4799 0 13.2921V7C-2.77037e-09 6.90704 0.0183096 6.81499 0.0538832 6.72911C0.0894567 6.64323 0.141598 6.56519 0.207329 6.49946C0.273061 6.43373 0.351095 6.38159 0.436977 6.34602C0.522859 6.31044 0.614907 6.29214 0.707865 6.29214C0.800823 6.29214 0.892871 6.31044 0.978754 6.34602C1.06464 6.38159 1.14267 6.43373 1.2084 6.49946C1.27413 6.56519 1.32627 6.64323 1.36185 6.72911C1.39742 6.81499 1.41573 6.90704 1.41573 7V11.5838L11.5838 1.41573H7C6.81226 1.41573 6.63221 1.34115 6.49946 1.2084C6.36671 1.07565 6.29214 0.895603 6.29214 0.707865C6.29214 0.520128 6.36671 0.34008 6.49946 0.207329C6.63221 0.0745786 6.81226 0 7 0H13.2921Z"
                fill="#212529"
              />
            </svg>

            <p>{data.floorSize}</p>
          </div>
          <div className="flex items-center gap-[8px] rounded-[8px] bg-black/10 px-[16px] py-[8px] ">
            <svg
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="max-h-[14px] min-h-[14px] min-w-[14px] max-w-[14px]"
            >
              <path
                d="M7 0C7.92826 0 8.8185 0.368749 9.47487 1.02513C10.1313 1.6815 10.5 2.57174 10.5 3.5C10.5 4.42826 10.1313 5.3185 9.47487 5.97487C8.8185 6.63125 7.92826 7 7 7C6.07174 7 5.1815 6.63125 4.52513 5.97487C3.86875 5.3185 3.5 4.42826 3.5 3.5C3.5 2.57174 3.86875 1.6815 4.52513 1.02513C5.1815 0.368749 6.07174 0 7 0ZM7 8.75C10.8675 8.75 14 10.3162 14 12.25V14H0V12.25C0 10.3162 3.1325 8.75 7 8.75Z"
                fill="#212529"
              />
            </svg>

            <p>x{data.occupancy}</p>
          </div>
        </div>
        {/* desc */}
        <div className="border-y-[1px] border-y-black/[.15] py-[24px] text-[15px] text-main-text/50">
          {data.description
            ? data.description?.slice(
                0,
                openDesc === false ? 30 : data.description.length,
              )
            : null}
          ...
          <span className="text-primary-blue">
            {openDesc === false
              ? `${lang === 'en' ? 'More' : 'Цааш унших'}`
              : `${lang === 'en' ? 'Less' : 'Хураангуй'}`}
          </span>
        </div>
        {/* room price & occupancy */}
        <div className="flex w-full items-center justify-between text-primary-blue">
          {/* occupancy */}
          <div className="flex items-end gap-[4px]">
            <svg
              viewBox="-1 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="max-h-[20px] min-h-[20px] min-w-[20px] max-w-[20px] text-primary-blue 2xs:max-h-[24px] 2xs:min-h-[24px] 2xs:min-w-[24px] 2xs:max-w-[24px]"
            >
              <path
                d="M7 0C7.92826 0 8.8185 0.368749 9.47487 1.02513C10.1313 1.6815 10.5 2.57174 10.5 3.5C10.5 4.42826 10.1313 5.3185 9.47487 5.97487C8.8185 6.63125 7.92826 7 7 7C6.07174 7 5.1815 6.63125 4.52513 5.97487C3.86875 5.3185 3.5 4.42826 3.5 3.5C3.5 2.57174 3.86875 1.6815 4.52513 1.02513C5.1815 0.368749 6.07174 0 7 0ZM7 8.75C10.8675 8.75 14 10.3162 14 12.25V14H0V12.25C0 10.3162 3.1325 8.75 7 8.75Z"
                fill="currentColor"
              />
            </svg>
            <p className="text-[16px] font-medium leading-[16px] 2xs:text-[18px] 2xs:leading-[18px]">
              x{data.occupancy}
            </p>
          </div>
          {/* divider */}
          <div className="h-[24px] w-[1px] rounded-full bg-primary-blue/50 2xs:h-[30px]">
            {' '}
          </div>
          <div className="text-[20px] font-medium 2xs:text-[24px]">
            {data.priceDayUse.toLocaleString()}
            {lang === 'en' ? '$' : '₮'}
            <span className=" text-[14px] font-medium">
              {' '}
              / {lang === 'en' ? 'day' : 'хоног'}
            </span>
          </div>
        </div>
        {/* room select section */}
        <div className="flex w-full justify-between">
          <div className="flex h-[38px] items-center justify-center gap-[8px] rounded-[8px] border-[2px] border-primary-blue/50 px-[12px] text-[14px] font-medium leading-[16px] text-primary-blue 2xs:text-[16px] md:px-[8px] md:text-[14px]">
            <p>
              {'0'}
              {lang === 'en' ? ' rooms' : ' өрөө'}
            </p>
            <svg
              className="max-h-[8px] min-h-[8px] min-w-[12px] max-w-[12px]"
              viewBox="0 0 12 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.04535 7.14L0.249351 1.658C-0.316649 1.013 0.143351 3.67706e-07 1.00235 3.67706e-07H10.5944C10.7866 -0.000164459 10.9748 0.0550878 11.1365 0.159141C11.2981 0.263194 11.4263 0.411637 11.5058 0.586693C11.5853 0.761749 11.6126 0.955998 11.5845 1.14618C11.5564 1.33636 11.474 1.51441 11.3474 1.659L6.55135 7.139C6.45749 7.24641 6.34174 7.3325 6.21186 7.39148C6.08198 7.45046 5.94099 7.48098 5.79835 7.48098C5.65571 7.48098 5.51472 7.45046 5.38484 7.39148C5.25497 7.3325 5.13921 7.24641 5.04535 7.139V7.14Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div className="flex h-[38px] items-center justify-center rounded-[8px] border-[2px] border-primary-blue px-[12px] text-[14px] font-medium text-primary-blue 2xs:px-[16px] 2xs:text-[18px] md:px-[8px] md:text-[16px]">
            {lang === 'en' ? 'Add to cart' : 'Сангсанд нэмэх'}
          </div>

          {/* <Listbox value={selected} onChange={setSelected}>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                <span className="block truncate">{selected.name}</span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronUpDownIcon
                    className="w-5 h-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black/5 focus:outline-none sm:text-sm">
                  {people.map((person, personIdx) => (
                    <Listbox.Option
                      key={personIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active
                            ? 'bg-amber-100 text-amber-900'
                            : 'text-gray-900'
                        }`
                      }
                      value={person}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            {person.name}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                              <CheckIcon
                                className="w-5 h-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox> */}
        </div>
        {/* order btn */}
        <div className="flex h-[40px] w-full items-center justify-center rounded-[8px] bg-main-online text-[18px] font-medium leading-[18px] text-white">
          {lang === 'en' ? 'Order' : 'Захиалах'}
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
