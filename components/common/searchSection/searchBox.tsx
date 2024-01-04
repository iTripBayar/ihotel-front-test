"use client";
import React, { useState, useRef, useEffect } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAppCtx } from "@/contexts/app";
import { useRequest } from "ahooks";
import { fetchSearchQuery } from "@/utils";

interface iProps {
  placesData: SearchData.Places[];
  cityData: SearchData.Cities[];
  ver: string;
  changeSearchValue: (e: string) => void;
  value: string;
}

const SearchBox = ({
  placesData,
  cityData,
  ver,
  changeSearchValue,
  value,
}: iProps) => {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(false);
  const [showDefault, setShowDefault] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");
  const searchValue = searchParams.get("searchValue");
  const [currentIndex, setCurrentIndex] = useState(0);
  const { appState, dispatch } = useAppCtx();

  const { data: queryData, run } = useRequest(
    (queryValue: string) => {
      return fetchSearchQuery(queryValue);
    },
    {
      manual: true,
      // onSuccess: (res) => {
      //   console.log(res);
      // },
    },
  );

  const data: any[] = [];
  const suggestion = [
    {
      id: "Тэрэлж",
      mn: "Тэрэлж",
      en: "Terelj",
    },
    {
      id: "Улаанбаатар",
      mn: "Улаанбаатар",
      en: "Ulaanbaatar",
    },
    {
      id: "Хөвсгөл",
      mn: "Хөвсгөл",
      en: "Khuvsgul",
    },
  ];

  for (let i = 0; i < placesData.length; i++) {
    data.push({
      id: placesData[i].id,
      name: placesData[i].name,
      nameEn: placesData[i].nameEn ? placesData[i].nameEn : "",
      type: "place",
    });
  }
  for (let i = 0; i < cityData.length; i++) {
    data.push({
      id: cityData[i].id,
      name: cityData[i].name,
      nameEn: cityData[i].nameEn ? cityData[i].nameEn : "",
      type: "city",
    });
  }
  let recentSearch: string | null = null;

  if (typeof window !== "undefined") {
    recentSearch = localStorage.getItem("recentSearch");
  }

  useEffect(() => {
    if (searchValue && searchValue !== "") {
      // localStorage.removeItem("recentSearch");
      if (recentSearch === null) {
        localStorage.setItem("recentSearch", searchValue);
      } else if (recentSearch.split(",").length === 1) {
        if (recentSearch !== searchValue) {
          const update = [recentSearch.split(",")[0], searchValue];
          localStorage.setItem("recentSearch", update.join(","));
        }
      } else if (recentSearch.split(",").length === 2) {
        if (recentSearch.split(",")[0] !== searchValue) {
          const update = [searchValue, recentSearch.split(",")[0]];
          localStorage.setItem("recentSearch", update.join(","));
        }
      } else {
        localStorage.removeItem("recentSearch");
      }
      setQuery(searchValue.split("$")[0]);
      setSelected(true);
    }
  }, [searchValue]);

  const sliderRef = React.useRef<Slider>(null);
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    cssEase: "fade",
  };

  useEffect(() => {
    document
      .getElementById("searchBoxContainer")
      ?.addEventListener("click", () => {
        setShowDefault(true);
        document.getElementById("searchInput")?.focus();
      });
    document.addEventListener("click", (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.classList.contains("within")) {
        setShowDefault(false);
      } else {
        setShowDefault(true);
      }
      console.log(target);
    });
  }, []);

  return (
    <div
      className={`relative flex w-full  flex-col gap-[10px] within cursor-text ${
        ver === "normal" ? "lg:max-w-[500px] xl:max-w-none" : "lg:max-w-[500px]"
      }`}
      id="searchBoxContainer"
    >
      <div
        className={`flex w-full within items-center bg-white px-[12px] ${
          ver === "normal"
            ? "h-[46px] justify-start rounded-[8px] border border-black/[.25]  2xs:gap-[4px] lg:min-w-[280px] xl:min-w-[306px] "
            : ver === "fixed"
            ? "h-[36px] justify-start rounded-full"
            : ver === "headerSearch"
            ? "h-[46px] justify-between rounded-full pr-0 shadow-[0px_0px_12px_2px_rgb(0,0,0,0.15)]"
            : ver === "search"
            ? "h-[36px] justify-between rounded-full shadow-[0px_0px_12px_2px_rgb(0,0,0,0.25)] lg:pr-0"
            : ver === "hotel"
            ? "h-[36px] min-w-[225px] justify-between overflow-hidden rounded-full shadow-[0px_0px_12px_2px_rgb(0,0,0,0.25)] lg:pr-0 xl:min-w-[400px] 2xl:min-w-[500px]"
            : ""
        }`}
        // onClick={(e) => {
        //   if (ver === "normal" || ver == "fixed") {
        //     e.preventDefault();
        //     inputRef.current?.focus();
        //   }
        // }}
        ref={searchRef}
      >
        <div
          className={`flex items-center gap-[8px] within  ${
            query !== "" ? "w-full " : "w-auto"
          }`}
          // onClick={(e) => {
          //   if (ver === "search" || ver === "headerSearch") {
          //     e.preventDefault();
          //     inputRef.current?.focus();
          //   }
          // }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="max-h-[22px] min-h-[22px] min-w-[22px] max-w-[22px] text-primary-blue within"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <input
            type="text"
            name="searchInput"
            id="searchInput"
            placeholder={
              lang === "en" ? "Search destinations" : `Хайх газар оруулах`
            }
            autoComplete="off"
            onChange={(event) => {
              // event.target.value.trim();
              setQuery(event.target.value);
              setSelected(false);
              if (value && event.target.value.length < value.length) {
                changeSearchValue("");
              }
              if (event.target.value.trim().length >= 1) {
                run(event.target.value.trim());
              }
            }}
            onLoad={(e) => {
              e.preventDefault();
            }}
            value={query}
            ref={inputRef}
            onFocus={(e) => {
              // setShowDefault(true);
              // console.log("focus");
              // e.target.classList.add('w-full')
              e.preventDefault();
            }}
            onClick={(e) => {
              e.preventDefault();
            }}
            // className={` w-full within h-full border-transparent px-0 text-[16px] placeholder:text-[12px] text-sub-text/75 placeholder-sub-text/75 focus:border-transparent focus:ring-0 2xs:placeholder:text-[13px] sm:placeholder:text-[14px] lg:text-[12px] xl:text-[14px]
            // `}
            className={`within h-full border-transparent px-0 text-[16px] placeholder:text-[12px] text-sub-text/75 placeholder-sub-text/75 focus:border-transparent focus:ring-0 2xs:placeholder:text-[13px] sm:placeholder:text-[14px] lg:text-[12px] xl:text-[14px]
            ${
              query === ""
                ? "w-[124px] 2xs:w-[134px] sm:w-[144px] lg:w-[124px] xl:w-[144px]"
                : "w-full"
            }
            `}
          />
        </div>
        {/* filter */}
        {ver === "search" || ver === "headerSearch" ? (
          <div
            onClick={() => {
              const nextFilter =
                appState.filter === ""
                  ? `${ver === "search" ? "webFilter" : "mobile"}`
                  : "";
              dispatch({
                type: "CHANGE_APP_STATE",
                payload: {
                  filter: nextFilter,
                  logOrSign: "",
                  menu: "",
                },
              });
            }}
            className={`flex h-full cursor-pointer items-center justify-center gap-[4px] rounded-full bg-primary-blue ${
              ver === "headerSearch" ? "px-[8px]" : "px-[12px]"
            } text-[13px] font-medium text-white ring-1 ring-primary-blue xl:px-[14px] xl:text-[14px] ${
              query !== "" || appState.filter !== ""
                ? "w-[46px]"
                : "min-w-[100px]"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={
                query !== ""
                  ? "max-h-[24px] min-h-[24px] min-w-[24px] max-w-[24px]"
                  : " 2x:min-w-[24px] max-h-[22px] min-h-[22px] min-w-[22px] max-w-[22px] 2xs:max-h-[24px] 2xs:min-h-[24px] 2xs:max-w-[24px]"
              }
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
              />
            </svg>
            {query === "" ? (
              <p
                className={`${
                  appState.filter === "on" || appState.filter === ""
                    ? ""
                    : "hidden"
                }`}
              >
                {lang === "en" ? "Filter" : "Шүүлтүүр"}
              </p>
            ) : null}
          </div>
        ) : (
          ""
        )}
        {/* suggestion */}
        {query === "" &&
        ver !== "search" &&
        ver !== "headerSearch" &&
        ver !== "hotel" ? (
          <div className=" max-w-[125px] overflow-hidden within">
            <Slider {...settings} ref={sliderRef}>
              {suggestion.map((index, i) => (
                <p
                  key={i}
                  className={` w-full within text-[12px] leading-[12px] 2xs:text-[13px] 2xs:leading-[13px] sm:text-[14px] sm:leading-[14px] lg:text-[12px] lg:leading-[12px] xl:text-[14px] xl:leading-[14px]`}
                >
                  &ldquo;
                  {lang === "en" ? index.en : index.mn}
                  &rdquo;
                </p>
              ))}
            </Slider>
          </div>
        ) : null}
      </div>
      {selected === false && showDefault === true ? (
        <div
          id="resultsContainer"
          className={` flex h-[150px] w-full flex-col justify-start gap-[12px] overflow-x-hidden overflow-y-scroll within
           rounded-[8px] border border-black/20 bg-white px-[12px] text-main-text md:grid md:grid-cols-2 md:gap-[24px] md:px-[20px] lg:absolute lg:top-[50px] lg:h-[250px] lg:min-w-[400px] lg:gap-[16px] lg:px-[10px] xl:gap-[24px] xl:px-[20px] lg:max-w-[${searchRef.current?.clientWidth}px] lg:z-50`}
        >
          {queryData && query.trim().length >= 1 ? (
            <>
              {queryData.hotels.map((index, i) => (
                <div
                  onClick={() => {
                    const nextSearchValue = `${index.name}$${index.type}$${index.id}`;
                    setQuery(index.name);
                    changeSearchValue(nextSearchValue);
                    setSelected(true);
                  }}
                  key={i}
                  className="flex within max-h-[50px] min-h-[49px] cursor-pointer items-center justify-start gap-[24px] border-b-[1px] border-black/[.1] text-[12px] leading-[12px] sm:text-[14px] sm:leading-[14px] md:text-[12px] md:leading-[12px] lg:gap-[12px] xl:text-[13px] xl:leading-[13px]"
                >
                  {index.type === "place" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="max-h-[22px] min-h-[22px] min-w-[22px] max-w-[22px] text-primary-blue"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                  ) : index.type === "hotel" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="max-h-[22px] min-h-[22px] min-w-[22px] max-w-[22px] text-primary-blue"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="max-h-[22px] min-h-[22px] min-w-[22px] max-w-[22px] text-primary-blue"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 
                    01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                      />
                    </svg>
                  )}
                  {index.name}
                </div>
              ))}
            </>
          ) : (
            <>
              {/* {recentSearch ? } */}
              {recentSearch ? (
                <div className="flex max-h-[40px] within min-h-[39px]  items-end justify-center text-[16px] leading-[16px] md:col-span-2 font-medium">
                  {lang === "en" ? "Recent search" : "Өмнөх хайлтууд"}
                </div>
              ) : null}
              {recentSearch?.split(",").map((index, i) => (
                <div
                  onClick={() => {
                    const nextSearchValue = `${index.split("$")[0]}$${
                      index.split("$")[1]
                    }$${index.split("$")[2]}`;
                    setQuery(index.split("$")[0]);
                    changeSearchValue(nextSearchValue);
                    setSelected(true);
                  }}
                  key={i}
                  className=" flex max-h-[50px] within min-h-[49px] cursor-pointer items-center justify-start gap-[24px] border-b-[1px] border-black/[.1] text-[12px] leading-[12px] sm:text-[14px] sm:leading-[14px] md:text-[12px] md:leading-[12px] lg:gap-[12px] xl:text-[13px] xl:leading-[13px]"
                >
                  {index.split("$")[1] === "place" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="max-h-[22px] min-h-[22px] min-w-[22px] max-w-[22px] text-primary-blue"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                  ) : index.split("$")[1] === "hotel" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="max-h-[22px] min-h-[22px] min-w-[22px] max-w-[22px] text-primary-blue"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="max-h-[22px] min-h-[22px] min-w-[22px] max-w-[22px] text-primary-blue"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 
                    01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                      />
                    </svg>
                  )}
                  {index.split("$")[0]}
                </div>
              ))}
              {placesData.length > 0 ? (
                <div className="flex max-h-[40px] min-h-[39px]within items-end justify-center text-[16px] leading-[16px] md:col-span-2 font-medium">
                  {lang === "en" ? "Popular destination" : "Түгээмэл байршил"}
                </div>
              ) : null}
              {placesData.map((index, i) => (
                <div
                  onClick={() => {
                    const nextSearchValue = `${index.name}$place$${index.id}`;
                    setQuery(index.name);
                    changeSearchValue(nextSearchValue);
                    setSelected(true);
                  }}
                  key={i}
                  className=" flex max-h-[50px] within min-h-[49px] cursor-pointer items-center justify-start gap-[24px] border-b-[1px] border-black/[.1] text-[12px] leading-[12px] sm:text-[14px] sm:leading-[14px] md:text-[12px] md:leading-[12px] lg:gap-[12px] xl:text-[13px] xl:leading-[13px]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="max-h-[22px] min-h-[22px] min-w-[22px] max-w-[22px] text-primary-blue"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>

                  {index.name}
                </div>
              ))}
              {cityData.length > 0 ? (
                <div className="flex max-h-[40px] min-h-[39px] within items-end justify-center text-[16px] leading-[16px] md:col-span-2 font-medium">
                  {lang === "en" ? "City (Province)" : "Хот (Аймаг)"}
                </div>
              ) : null}
              {cityData.map((index, i) => (
                <div
                  onClick={() => {
                    const nextSearchValue = `${index.name}$city$${index.id}`;
                    setQuery(index.name);
                    changeSearchValue(nextSearchValue);
                    setSelected(true);
                  }}
                  key={i}
                  className=" flex max-h-[50px] within  min-h-[49px] cursor-pointer items-center justify-start gap-[24px] border-b-[1px] border-black/[.1] text-[12px] leading-[12px] sm:text-[14px] sm:leading-[14px] md:text-[12px] md:leading-[12px] lg:gap-[12px] xl:text-[13px] xl:leading-[13px]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="max-h-[22px] min-h-[22px] min-w-[22px] max-w-[22px] text-primary-blue"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 
                    01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                  </svg>

                  {index.name}
                </div>
              ))}
            </>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default SearchBox;
