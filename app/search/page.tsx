"use client";
import { useRequest } from "ahooks";
import { fetchCheckHotel } from "@/utils";
import HeaderVariants from "@/components/common/headerVariants";
import BottomSection from "@/components/common/bottomSection";
import SearchSection from "@/components/common/searchSection";
import SearchCards from "@/components/pageComponents/searchPage/searchCards";
import MapContainer from "@/components/pageComponents/searchPage/map/map";
import FilterOptions from "@/components/common/searchSection/filter/filterOptions";
import { useAppCtx } from "@/contexts/app";
import { CircularProgress } from "@chakra-ui/react";
import LogIn from "@/components/common/signIn/logIn";
import SignUp from "@/components/common/signIn/signUp";
import { useSearchParams, useRouter } from "next/navigation";
import { addDays, format } from "date-fns";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import useWindowSize from "@/hooks/windowSize";
import MapBtn from "@/components/common/fixedButtons/mapBtn";
import SideMenu from "@/components/common/sidemenu";
import { useSession } from "next-auth/react";
import ScrollTopBtn from "@/components/common/fixedButtons/scrollTopBtn";
const ErrorComponent = dynamic(() => import("@/components/common/404"));

const SearchPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchValue = searchParams.get("searchValue");
  const category = searchParams.get("category");
  const page = searchParams.get("page");
  const min = searchParams.get("min");
  const max = searchParams.get("max");
  const services = searchParams.get("services");
  const lang = searchParams.get("lang");
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const { appState, dispatch } = useAppCtx();
  const size = useWindowSize();
  const divRef = useRef<HTMLDivElement>(null);

  const { data: session } = useSession({
    required: false,
  });

  const newDate = new Date();
  const nextDay = addDays(newDate, 1);
  const hotel =
    searchValue?.split("$")[1] === "hotel" ? searchValue?.split("$")[2] : "";
  const city =
    searchValue?.split("$")[1] === "city" ? searchValue?.split("$")[2] : "";
  const place =
    searchValue?.split("$")[1] === "place" ? searchValue?.split("$")[2] : "";

  useEffect(() => {
    dispatch({
      type: "CHANGE_APP_STATE",
      payload: { logOrSign: "", menu: "" },
    });
  }, []);

  useEffect(() => {
    if (size.width && size.width >= 1024) {
      dispatch({
        type: "CHANGE_APP_STATE",
        payload: { map: "open" },
      });
    } else {
      dispatch({
        type: "CHANGE_APP_STATE",
        payload: { map: "" },
      });
    }
    return;
  }, [size.width]);
  const createQueryString = (name: string, value: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (value !== null) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    return params.toString();
  };
  useEffect(() => {
    router.replace(`/search?${createQueryString("page", `1`)}`, {
      scroll: false,
    });
  }, [min, max, services, category]);

  const { data, loading, error } = useRequest(
    () => {
      return fetchCheckHotel({
        hotel: hotel,
        place: place,
        city: city,
        checkin: encodeURIComponent(format(newDate, "MM/dd/yyyy")),
        // checkin: '',
        checkout: encodeURIComponent(format(nextDay, "MM/dd/yyyy")),
        // checkout: '',
        isClosed: "",
        page: page !== null ? page : "1",
        prices:
          min && max
            ? encodeURIComponent(`["[${min}${max !== "0" ? `, ${max}` : ""}]"]`)
            : "",
        filterstar: "",
        rating1: "",
        rating2: "",
        hotelServices: services ? encodeURIComponent(`[${services}]`) : "",
        // hotelServices: services ? encodeURI(`[${services}]`) : '',
        roomServices: "",
        categories: category ? encodeURIComponent(`["${category}"]`) : "",
      });
    },
    { refreshDeps: [searchParams] },
  );

  useEffect(() => {
    if (appState.filter === "webFilter") {
      document.addEventListener("click", (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target.classList.contains("filter")) {
          dispatch({
            type: "CHANGE_APP_STATE",
            payload: {
              filter: "",
              logOrSign: "",
              menu: "",
            },
          });
        }
      });
    }
  }, [appState.filter]);

  const handleScrollToTop = () => {
    divRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (!error)
    return (
      <main
        className={`relative flex h-screen w-full flex-col gap-[20px] overflow-y-auto  ${
          appState.map === "open" ? " overflow-hidden pb-[25px]" : ""
        }`}
        id="container"
      >
        <>
          <title>
            {lang === "en"
              ? "Ulaanbaatar Hotels, ger and camp | Search result | iHotel"
              : "Улаанбаатар Тохилог зочид буудал, амралтын газар хямд үнээр захиалах | iHotel"}
          </title>
          <meta
            name="keywords"
            content={
              lang === "en"
                ? "hotel, hotels, book, ger, yurt, camp, Ger camp, tourist camp, resort, cheap, accommodation, group booking, Mongolia, Mongolian, Ulaanbaatar, Mongolian ger, Ulaanbaatar hotel, Mongolia hotel, Hotels in Ulaanbaatar, Mongolian camp, travel, tour, offer, discount, deal, Gobi hotel"
                : `Зочид буудал, зочид буудлууд, амралтын газар, амралтын газрууд, амралт сувилалын газрууд, амралтын газар лавлах, амралтын газруудын үнэ ханш, zochid buudal, zochid buudluud, буудал, буудлууд, buudal, buudluud, amraltiin gazar, amraltiin gazruud, жуулчны бааз, juulchnii baaz, 
                аялал жуулчлал, гэр бүлийн амралт, зугаалга, гэр буудал, Ger buudal, зочид буудал үнэ ханш, зочид буудлын үнэ, зочид буудлуудын үнэ, амралтын газрын үнэ ханш, хямд зочид буудал, hyamd zochid buudal, хямд зочид буудлууд, hyamd zochid buudluud, хөдөө орон нутаг, хонох газар, Зочид 
                буудал захиалах, Амралтын газар захиалах, zochid buudal zahialah, amraltiin gazar zahialah, амралт сувиллын газрууд, амралт сувилалын үнэ ханш, амралт сувилал, амралтын газруудын танилцуулга, Зочид буудлын үнэ тариф, өвлийн амралтын газар, зочид буудал үнэ ханш, рашаан сувилалын газрууд, 
                жуулчны баазууд, тэрэлж амралтын газрууд, эх хүүхдийн амралт сувилал, танилцуулга, байршил, утас, хаяг, utas, bairshil, taniltsuulga, hayag, hotod oir, hotod oirhon, буудал захиалга, буудал үнэ, buudal zahialga, hotel, resort, tourist camp`.replace(
                    /\s+/g,
                    " ",
                  )
            }
          />
          <meta
            name="description"
            content={
              lang === "en"
                ? "Hotel and Mongolian ger Search result in Ulaanbaatar, Mongolia ✓ Lowest price guaranteed ✓ up to 50% discount for group reservation"
                : "Улаанбаатар байрлах ✓ Зочид буудал, амралтын газрууд ✓ Хамгийн хямд үнээр ✓ шуурхай захиалах. Монголын хамгийн том захиалгын систем | iHotel.mn"
            }
          />
          {/* Facebook Metadata */}
          <meta
            property="og:url"
            content={`${process.env.CURRENT_URL}/search`}
          />
          <meta
            property="og:title"
            content={
              lang === "en"
                ? "Ulaanbaatar Hotels, ger and camp | Search result | iHotel"
                : "Улаанбаатар Тохилог зочид буудал, амралтын газар хямд үнээр захиалах | iHotel"
            }
          />
          <meta
            property="og:image"
            content={`${process.env.CURRENT_URL}/sharephoto.jpg`}
          />
          <meta
            property="og:description"
            content={
              lang === "en"
                ? "Hotel and Mongolian ger Search result in Ulaanbaatar, Mongolia ✓ Lowest price guaranteed ✓ up to 50% discount for group reservation"
                : "Улаанбаатар байрлах ✓ Зочид буудал, амралтын газрууд ✓ Хамгийн хямд үнээр ✓ шуурхай захиалах. Монголын хамгийн том захиалгын систем | iHotel.mn"
            }
          />
          {/* Google Metadata */}
          <meta
            item-prop="name"
            content={
              lang === "en"
                ? "Ulaanbaatar Hotels, ger and camp | Search result | iHotel"
                : "Улаанбаатар Тохилог зочид буудал, амралтын газар хямд үнээр захиалах | iHotel"
            }
          ></meta>
          <meta
            item-prop="image"
            content={`${process.env.CURRENT_URL}/sharephoto.jpg`}
          ></meta>
          <meta
            item-prop="description"
            content={
              lang === "en"
                ? "Hotel and Mongolian ger Search result in Ulaanbaatar, Mongolia ✓ Lowest price guaranteed ✓ up to 50% discount for group reservation"
                : "Улаанбаатар байрлах ✓ Зочид буудал, амралтын газрууд ✓ Хамгийн хямд үнээр ✓ шуурхай захиалах. Монголын хамгийн том захиалгын систем | iHotel.mn"
            }
          ></meta>
        </>
        <HeaderVariants
          ver={"search"}
          placesData={data ? data.places : []}
          cityData={data ? data.cities : []}
        />
        {appState.logOrSign === "log" ||
        appState.logOrSign === "forgotPassword" ? (
          <LogIn />
        ) : null}
        {appState.logOrSign === "sign" ? <SignUp /> : null}
        {appState.menu === "open" ? <SideMenu session={session} /> : null}
        {appState.map !== "open" ? (
          <div className="fixed  bottom-[24px] left-[0%] z-[899]  flex w-auto animate-fade flex-row items-stretch justify-between gap-[16px] px-[16px] text-white sm:px-[42px] sm:pl-[39px] md:px-[32px] lg:bottom-[12px]">
            {appState.map === "" ? <MapBtn ver={"default"} /> : null}
          </div>
        ) : null}
        {/* {appState.map !== "open" ? (
          <div className="fixed bottom-[80px] right-[0%] z-[899] flex w-auto animate-fade flex-row items-center justify-center px-[16px] text-white sm:px-[42px] md:px-[32px] bg-left-bottom-[12px]">
            <ScrollTopBtn
              ver={"search"}
              handleScrollToTopVer={handleScrollToTop}
            />
          </div>
        ) : null} */}
        <BottomSection
          ver={"search"}
          handleScrollToTopVer={handleScrollToTop}
        />
        <div
          className={`${
            appState.filter === "webFilter"
              ? "absolute left-[50%] top-[55px] z-[500] translate-x-[-50%]"
              : "hidden"
          }`}
        >
          <FilterOptions
            categories={data?.categories ? data?.categories : []}
            services={data?.hotelServices ? data.hotelServices : []}
          />
        </div>
        <div
          className={`lg:hidden ${
            appState.filter === "mobile" ? "flex flex-col gap-[24px]" : ""
          }`}
          ref={divRef}
        >
          <SearchSection
            ver={"headerSearch"}
            placesData={data ? data.places : []}
            cityData={data ? data.cities : []}
          />
          {appState.filter === "mobile" ? (
            <FilterOptions
              categories={data?.categories ? data?.categories : []}
              services={data?.hotelServices ? data.hotelServices : []}
            />
          ) : null}
        </div>
        {loading === true ? (
          <div className="flex h-full w-full items-center justify-center pb-[100px]">
            <CircularProgress isIndeterminate={true} color="#3C76FE" />
          </div>
        ) : appState.filter !== "mobile" ? (
          <div
            className={`relative grid h-full w-full grid-cols-1 gap-[24px] lg:grid-cols-6 lg:gap-[12px] lg:px-[50px] lg:pt-[56px] xl:grid-cols-5 2xl:grid-cols-6`}
          >
            <SearchCards
              data={data ? data.data : []}
              dollarRate={data ? data.dollarRate : "1"}
              totalLength={data ? data.result : 0}
            />
            {appState.map === "open" ? (
              <MapContainer
                data={data ? data.data : []}
                zoom={lat && lng ? 8 : 11}
                lat={lat ? parseInt(lat) : data?.mapCenter.lat}
                lng={lng ? parseInt(lng) : data?.mapCenter.lng}
                dollarRate={data ? data.dollarRate : "1"}
              />
            ) : null}
          </div>
        ) : null}
        {/* <!-- Messenger Chat plugin Code --> */}
      </main>
    );
  return <ErrorComponent />;
};

export default SearchPage;
