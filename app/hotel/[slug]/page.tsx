"use client";
import HeaderVariants from "@/components/common/headerVariants";
import HotelImages from "@/components/pageComponents/hotelPage/hotelImages";
import { useRequest } from "ahooks";
import { fetchDataHotel } from "@/utils";
import HotelInfo from "@/components/pageComponents/hotelPage/hotelInfo";
import Amenity from "@/components/pageComponents/hotelPage/amenity";
import Review from "@/components/pageComponents/hotelPage/review";
import HotelMap from "@/components/pageComponents/hotelPage/hotelMap";
import OrderCount from "@/components/pageComponents/hotelPage/orderCount";
import Services from "@/components/pageComponents/hotelPage/services";
import HotelRooms from "@/components/pageComponents/hotelPage/hotelRooms";
import Description from "@/components/pageComponents/hotelPage/description";
import HotelCard from "@/components/common/hotelCard";
import Footer from "@/components/common/footer";
import Dialogs from "@/components/pageComponents/hotelPage/dialogs";
import CalendarDialog from "@/components/pageComponents/hotelPage/dialogs/calendarDialog";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useAppCtx } from "@/contexts/app";
import { useEffect, useRef } from "react";
import LogIn from "@/components/common/signIn/logIn";
import SignUp from "@/components/common/signIn/signUp";
import { CircularProgress } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import ImagesDialog from "@/components/pageComponents/hotelPage/imagesDialog";
import { format } from "date-fns";
const ErrorComponent = dynamic(() => import("@/components/common/404"));
import { Toaster, toast } from "sonner";
import SideMenu from "@/components/common/sidemenu";
import { useSession } from "next-auth/react";
import { useInViewport } from "ahooks";
import BottomSection from "@/components/common/bottomSection";

const HotelPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  // const slug = searchParams.get("slug");
  const lang = searchParams.get("lang");
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const cart = searchParams.getAll("cart");

  const { data: session } = useSession({
    required: false,
  });
  const { appState, dispatch } = useAppCtx();
  const roomsContainer = useRef<HTMLDivElement>(null);
  const reviewsContainer = useRef<HTMLDivElement>(null);
  const [inViewport] = useInViewport(roomsContainer);

  // const [inViewPort] = useInViewport(roomsContainer);

  const createQueryString = (
    name: string,
    value: string | null,
    name1: string,
    value1: string | null,
    name2: string,
    value2: string | null,
  ) => {
    const params = new URLSearchParams(searchParams);
    if (value !== null) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    if (value1 !== null) {
      params.set(name1, value1);
    } else {
      params.delete(name1);
    }
    if (value2 !== null) {
      params.set(name2, value2);
    } else {
      params.delete(name2);
    }
    return params.toString();
  };
  useEffect(() => {
    dispatch({
      type: "CHANGE_APP_STATE",
      payload: { logOrSign: "", menu: "", calendar: "" },
    });
  }, []);

  const { data, loading, error } = useRequest(
    () => {
      if (pathname)
        return fetchDataHotel({
          slug: pathname.split("/")[2],
          checkIn: checkIn ? checkIn.split("|")[0] : "",
          checkOut: checkOut ? checkOut.split("|")[0] : "",
        });
      return fetchDataHotel({ slug: "", checkIn: "", checkOut: "" });
    },
    {
      onSuccess: (res) => {
        router.replace(
          `${pathname}?${createQueryString(
            "checkIn",
            `${format(new Date(res.startdate), "MM/dd/yyyy")}`,
            "checkOut",
            `${format(new Date(res.enddate), "MM/dd/yyyy")}`,
            "days",
            "1",
          )}`,
        );
      },
      // refreshDeps: [checkIn, checkOut],
    },
  );

  let stat = "";
  if (data?.hotel.isOnline == 1 && data?.hotel.isOffline == 0) {
    stat = "online";
  } else if (data?.hotel.isOnline == 0 && data?.hotel.isOffline == 0) {
    stat = "pending";
  } else if (
    data?.hotel.isOnline == 0 &&
    data?.hotel.isOffline == 1 &&
    data?.hotel.phone != null
  ) {
    stat = "offline";
  } else if (
    data?.hotel.isOnline == 0 &&
    data?.hotel.isOffline == 1 &&
    data?.hotel.phone == null
  ) {
    stat = "data";
  }
  const roomPrices: any[] = [];
  if (data?.rooms && data?.rooms.length) {
    for (let i = 0; i < data?.rooms.length; i++) {
      roomPrices.push(data?.rooms[i].defaultPrice);
    }
  }
  roomPrices.sort((a, b) => a - b);

  let totalPrice = 0; //total price of the rooms inside the cart
  if (cart && cart.length > 0 && data) {
    for (let i = 0; i < data.rooms.length; i++) {
      for (let j = 0; j < cart.length; j++) {
        if (data.rooms[i].id === parseInt(cart[j].split("$")[0])) {
          totalPrice =
            totalPrice +
            data.rooms[i].defaultPrice * parseInt(cart[j].split("$")[1]);
        }
      }
    }
  }

  const handleScrollTo = (ver: string) => {
    if (ver === "reviews") {
      const container = reviewsContainer.current;
      if (container) {
        // Get the position of the element relative to the viewport
        const rect = container.getBoundingClientRect();
        // Scroll to the top of the element with smooth behavior
        window.scrollTo({
          top: rect.top + window.scrollY - 75,
          behavior: "smooth",
        });
      }
    }
    if (ver === "rooms") {
      toast.warning(
        `${
          lang === "en"
            ? "Please add a room into the cart!."
            : "Захиалах өрөө сонгож сагсанд хийнэ үү!."
        }`,
      );
      // Get the DOM element from the ref
      const container = roomsContainer.current;

      if (container) {
        // Get the position of the element relative to the viewport
        const rect = container.getBoundingClientRect();

        // Scroll to the top of the element with smooth behavior
        window.scrollTo({
          top: rect.top + window.scrollY,
          behavior: "smooth",
        });
      }
    }
  };

  const imagesData: string[] = [];
  if (data?.hotel.images && data.hotel.coverPhoto) {
    imagesData.push(data.hotel.coverPhoto);
    for (let i = 0; i < data?.hotel.images?.length; i++) {
      imagesData.push(data.hotel.images[i]);
    }
  }

  let metaCommonLoc = { mn: "", en: "" };
  if (data?.hotel.commonLocations) {
    for (let i = 0; i < data?.hotel.commonLocations.length; i++) {
      metaCommonLoc = {
        mn: [metaCommonLoc.mn, data.hotel.commonLocations[i].name].join(", "),
        en: [metaCommonLoc.en, data.hotel.commonLocations[i].nameEn].join(", "),
      };
    }
  }

  console.log(data);

  if (!error)
    return (
      <main className="relative">
        <>
          <title>{lang === "en" ? data?.hotel.nameEn : data?.hotel.name}</title>
          <meta
            name="keywords"
            content={`${
              lang === "en" ? data?.hotel.nameEn : data?.hotel.name
            } ${lang === "en" ? metaCommonLoc.en : metaCommonLoc.mn} , ${
              lang === "en"
                ? "hotel, book, ger, yurt, camp, Ger camp, tourist camp, resort, cheap, accommodation, group booking, Mongolia, Mongolian, travel, tour, offer, discount, deal"
                : "Зочид буудал, амралтын газар, амралтын газар лавлах, zochid buudal, буудал, буудлууд, buudal, amraltiin gazar, жуулчны бааз, juulchnii baaz, аялал жуулчлал, гэр бүлийн амралт, зугаалга, гэр буудал, Ger buudal, гэр буудал, үнэ ханш, зочид буудлын үнэ, амралтын газрын үнэ ханш, хямд зочид буудал, hyamd zochid buudal, хонох газар, Зочид буудал захиалах, Амралтын газар захиалах, zochid buudal zahialah, amraltiin gazar zahialah, амралт сувилалын үнэ ханш, амралт сувилал, амралтын газруудын танилцуулга, Зочид буудлын үнэ тариф, өвлийн амралтын газар, зочид буудал үнэ ханш, эх хүүхдийн амралт сувилал, танилцуулга, байршил, утас, хаяг, utas, bairshil, taniltsuulga, hayag, hotod oir, hotod oirhon, буудал захиалга, буудал үнэ, buudal zahialga, hotel, resort, tourist camp"
            }`}
          />
          <meta
            name="description"
            content={`${
              lang === "en" ? data?.hotel.nameEn : data?.hotel.name
            } ${lang === "en" ? metaCommonLoc.en : metaCommonLoc.mn}. ${
              lang === "en"
                ? data?.hotel.introductionEn
                    ?.replace(/<\/?[^>]+(>|$)/g, "")
                    .replace(/\s+/g, " ")
                    .slice(0, 50)
                : data?.hotel.introduction
                    ?.replace(/<\/?[^>]+(>|$)/g, "")
                    .replace(/\s+/g, " ")
                    .slice(0, 50)
            } , ${
              lang === "en"
                ? "hotel, book, ger, yurt, camp, Ger camp, tourist camp, resort, cheap, accommodation, group booking, Mongolia, Mongolian, travel, tour, offer, discount, deal"
                : "Зочид буудал, амралтын газар, амралтын газар лавлах, zochid buudal, буудал, буудлууд, buudal, amraltiin gazar, жуулчны бааз, juulchnii baaz, аялал жуулчлал, гэр бүлийн амралт, зугаалга, гэр буудал, Ger buudal, гэр буудал, үнэ ханш, зочид буудлын үнэ, амралтын газрын үнэ ханш, хямд зочид буудал, hyamd zochid buudal, хонох газар, Зочид буудал захиалах, Амралтын газар захиалах, zochid buudal zahialah, amraltiin gazar zahialah, амралт сувилалын үнэ ханш, амралт сувилал, амралтын газруудын танилцуулга, Зочид буудлын үнэ тариф, өвлийн амралтын газар, зочид буудал үнэ ханш, эх хүүхдийн амралт сувилал, танилцуулга, байршил, утас, хаяг, utas, bairshil, taniltsuulga, hayag, hotod oir, hotod oirhon, буудал захиалга, буудал үнэ, buudal zahialga, hotel, resort, tourist camp"
            }`}
          ></meta>
          {/* Facebook Metadata */}
          <meta
            property="og:url"
            content={`${process.env.CURRENT_URL}/${pathname}`}
          />
          <meta
            property="og:image"
            content={`${process.env.IMAGE_URL}${data?.hotel.image}`}
          />
          <meta
            property="og:title"
            content={
              lang === "en" ? `${data?.hotel.nameEn}` : `${data?.hotel.name}`
            }
          />
          <meta
            property="og:description"
            content={`${
              lang === "en" ? data?.hotel.nameEn : data?.hotel.name
            } ${lang === "en" ? metaCommonLoc.en : metaCommonLoc.mn}. ${
              lang === "en"
                ? data?.hotel.introductionEn
                    ?.replace(/<\/?[^>]+(>|$)/g, "")
                    .replace(/\s+/g, " ")
                    .slice(0, 50)
                : data?.hotel.introduction
                    ?.replace(/<\/?[^>]+(>|$)/g, "")
                    .replace(/\s+/g, " ")
                    .slice(0, 50)
            } , ${
              lang === "en"
                ? "hotel, book, ger, yurt, camp, Ger camp, tourist camp, resort, cheap, accommodation, group booking, Mongolia, Mongolian, travel, tour, offer, discount, deal"
                : "Зочид буудал, амралтын газар, амралтын газар лавлах, zochid buudal, буудал, буудлууд, buudal, amraltiin gazar, жуулчны бааз, juulchnii baaz, аялал жуулчлал, гэр бүлийн амралт, зугаалга, гэр буудал, Ger buudal, гэр буудал, үнэ ханш, зочид буудлын үнэ, амралтын газрын үнэ ханш, хямд зочид буудал, hyamd zochid buudal, хонох газар, Зочид буудал захиалах, Амралтын газар захиалах, zochid buudal zahialah, amraltiin gazar zahialah, амралт сувилалын үнэ ханш, амралт сувилал, амралтын газруудын танилцуулга, Зочид буудлын үнэ тариф, өвлийн амралтын газар, зочид буудал үнэ ханш, эх хүүхдийн амралт сувилал, танилцуулга, байршил, утас, хаяг, utas, bairshil, taniltsuulga, hayag, hotod oir, hotod oirhon, буудал захиалга, буудал үнэ, buudal zahialga, hotel, resort, tourist camp"
            }`}
          />
          {/* Google Metadata */}
          <meta
            item-prop="name"
            content={
              lang === "en" ? `${data?.hotel.nameEn}` : `${data?.hotel.name}`
            }
          ></meta>
          <meta
            item-prop="image"
            content={`${process.env.IMAGE_URL}${data?.hotel.image}`}
          ></meta>
          <meta
            item-prop="description"
            content={`${
              lang === "en" ? data?.hotel.nameEn : data?.hotel.name
            } ${lang === "en" ? metaCommonLoc.en : metaCommonLoc.mn}. ${
              lang === "en"
                ? data?.hotel.introductionEn
                    ?.replace(/<\/?[^>]+(>|$)/g, "")
                    .replace(/\s+/g, " ")
                    .slice(0, 50)
                : data?.hotel.introduction
                    ?.replace(/<\/?[^>]+(>|$)/g, "")
                    .replace(/\s+/g, " ")
                    .slice(0, 50)
            } , ${
              lang === "en"
                ? "hotel, book, ger, yurt, camp, Ger camp, tourist camp, resort, cheap, accommodation, group booking, Mongolia, Mongolian, travel, tour, offer, discount, deal"
                : "Зочид буудал, амралтын газар, амралтын газар лавлах, zochid buudal, буудал, буудлууд, buudal, amraltiin gazar, жуулчны бааз, juulchnii baaz, аялал жуулчлал, гэр бүлийн амралт, зугаалга, гэр буудал, Ger buudal, гэр буудал, үнэ ханш, зочид буудлын үнэ, амралтын газрын үнэ ханш, хямд зочид буудал, hyamd zochid buudal, хонох газар, Зочид буудал захиалах, Амралтын газар захиалах, zochid buudal zahialah, amraltiin gazar zahialah, амралт сувилалын үнэ ханш, амралт сувилал, амралтын газруудын танилцуулга, Зочид буудлын үнэ тариф, өвлийн амралтын газар, зочид буудал үнэ ханш, эх хүүхдийн амралт сувилал, танилцуулга, байршил, утас, хаяг, utas, bairshil, taniltsuulga, hayag, hotod oir, hotod oirhon, буудал захиалга, буудал үнэ, buudal zahialga, hotel, resort, tourist camp"
            }`}
          ></meta>
        </>
        <HeaderVariants
          ver={"hotel"}
          placesData={data ? data.places : []}
          cityData={data ? data.cities : []}
        />
        <Toaster position="top-right" richColors />
        {appState.calendar === "open" ? (
          <div className="fixed left-[50%] top-[60px] z-[900] hidden h-[425px] translate-x-[-50%] lg:flex lg:w-[60vw] xl:w-[50vw]">
            <CalendarDialog ver={"web"} />
          </div>
        ) : null}
        {appState.logOrSign === "log" ||
        appState.logOrSign === "forgotPassword" ? (
          <LogIn />
        ) : null}
        {appState.logOrSign === "sign" ? <SignUp /> : null}
        {appState.menu === "open" ? <SideMenu session={session} /> : null}
        {/* <div className="fixed z-[899] flex bottom-[152px] right-[12px] text-white">
          <LangBtn />
        </div>
        <div className="fixed z-[899] flex bottom-[102px] right-[12px] text-white">
          <ScrollTopBtn ver="hotel" handleScrollToTopVer={() => {}} />
        </div> */}
        <BottomSection
          ver={"hotel"}
          handleScrollToTopVer={() => {}}
          inViewport={inViewport}
        />
        <Dialogs
          roomPrices={roomPrices}
          stat={stat}
          allRooms={data?.rooms ? data?.rooms : []}
          handleScrollToRooms={(ver: string) => handleScrollTo(ver)}
          totalPrice={totalPrice}
          inViewport={inViewport}
        />
        {appState.biggerImage.length > 0 ? <ImagesDialog /> : null}
        {loading ? (
          <div className="flex h-screen w-full items-center justify-center">
            <CircularProgress isIndeterminate={true} color="#3C76FE" />
          </div>
        ) : (
          <div className="flex flex-col gap-[24px] overflow-x-hidden px-[16px] pb-[50px] pt-[80px] sm:px-[50px] md:px-[72px] lg:gap-[48px]  lg:px-[60px] xl:px-[100px] 2xl:px-[150px]">
            <div className="grid grid-cols-1 gap-[24px] lg:grid-cols-5 lg:gap-[20px]">
              <div className="flex w-full flex-col gap-[24px] lg:col-span-3 lg:gap-[24px] ">
                <div className="flex flex-col gap-[16px] 2xs:gap-[24px] lg:flex-col-reverse lg:gap-[24px]">
                  <HotelImages
                    images={data?.hotel?.images ? data?.hotel.images : []}
                    image={data?.hotel?.image ? data?.hotel.image : ""}
                  />
                  <HotelInfo
                    name={data?.hotel.name}
                    nameEn={data?.hotel.nameEn}
                    rating={data?.hotel.rating}
                    stat={stat}
                    phone={data?.hotel.phone}
                    email={data?.hotel.email}
                    address={data?.hotel.address}
                    addressEn={data?.hotel.addressEn}
                  />
                </div>
                {(data?.hotel.facilities && data.hotel.facilities.length > 0) ||
                data?.hotel.isInternet !== 0 ? (
                  <Amenity
                    data={data?.hotel.facilities ? data?.hotel.facilities : []}
                    internet={data ? data?.hotel.isInternet : 0}
                  />
                ) : null}
              </div>
              <div className="flex flex-col gap-[24px] lg:col-span-2">
                {/* contanct */}
                <div className=" hidden w-full gap-[14px] text-[14px] tracking-wide lg:flex lg:text-[12px] lg:tracking-wide xl:text-[14px] xl:tracking-wider">
                  {/* phone */}
                  <div className="flex items-center gap-[6px] text-sub-text xl:gap-[10px]">
                    <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-primary-blue text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="max-h-[17px] min-h-[17px] min-w-[17px] max-w-[17px]"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p>
                      {data?.hotel.phone
                        ? `${`${data?.hotel?.phone.slice(
                            0,
                            4,
                          )}-${data?.hotel?.phone.slice(4)}`}`
                        : "empty"}
                    </p>
                  </div>
                  {/* mail */}
                  <div className="flex items-center gap-[6px] text-sub-text xl:gap-[10px]">
                    <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-primary-blue text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="max-h-[18px] min-h-[18px] min-w-[18px] max-w-[18px]"
                      >
                        <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                        <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                      </svg>
                    </div>
                    <p>{data?.hotel.email}</p>
                  </div>
                </div>
                {data?.reviews && data?.reviews.length > 0 ? (
                  <Review
                    ver=""
                    data={data?.reviews ? data?.reviews : []}
                    handleScrollTo={(ver: string) => handleScrollTo(ver)}
                  />
                ) : null}
                {/* stat & price */}
                <div className="hidden flex-col gap-[24px] border-t-[1px] border-t-black/[.15] pt-[24px] lg:flex">
                  {stat !== "data" ? (
                    <div
                      className={`flex h-[36px] items-center justify-center gap-[4px] rounded-[8px] text-center font-medium ${
                        stat === "online"
                          ? "bg-main-online px-[20px] text-white 2xs:px-[24px]"
                          : stat === "pending"
                          ? "bg-main-pending px-[16px]  text-main-text "
                          : "bg-main-offline px-[16px]"
                      }`}
                    >
                      {lang === "en" ? (
                        <p>
                          {stat === "online"
                            ? "Instant confirmation"
                            : stat === "pending"
                            ? "Confirmation delay: "
                            : stat === "offline"
                            ? "Booking unavailable"
                            : ""}
                          {stat === "pending" ? (
                            <span className="font-semibold ">1-3 hours</span>
                          ) : null}
                        </p>
                      ) : (
                        <p>
                          {stat === "online"
                            ? "Шууд баталгаажна"
                            : stat === "pending"
                            ? "Баталгаажих хугацаа: "
                            : stat === "offline"
                            ? "Онлайн захиалга боломжгүй"
                            : ""}
                          {stat === "pending" ? (
                            <span className="font-semibold ">1-3 цаг</span>
                          ) : null}
                        </p>
                      )}
                    </div>
                  ) : null}
                  <div className="text-main-textflex flex items-center justify-between rounded-[16px] bg-black/[.07] px-[20px] py-[10px] text-[20px]">
                    <p>
                      {roomPrices && roomPrices[0]
                        ? `${
                            lang === "en"
                              ? `${(
                                  roomPrices[0] /
                                  parseInt(data?.rate ? data.rate : "1")
                                ).toLocaleString()}`
                              : `${roomPrices[0].toLocaleString()}`
                          }`
                        : `200,000`}{" "}
                      {lang === "en" ? "$" : "₮"}{" "}
                      <span className="text-[14px]">
                        {" "}
                        / {lang === "en" ? "days" : "хоног"}
                      </span>
                    </p>
                    <div
                      onClick={() => handleScrollTo("rooms")}
                      className="flex items-center justify-center rounded-[16px] bg-main-online px-[16px] py-[6px] font-medium text-white"
                    >
                      {lang === "en" ? "Order" : "Захиалах"}
                    </div>
                  </div>
                </div>
                {/* map & orderCount */}
                <div className="flex flex-col gap-[24px] border-t-[1px] border-t-black/[.15] pt-[24px] lg:border-none lg:pt-0">
                  {data?.hotel.lat && data.hotel.lng ? (
                    <HotelMap
                      lat={
                        data?.hotel.lat ? data?.hotel.lat : 47.91823102891307
                      }
                      lng={
                        data?.hotel.lng ? data?.hotel.lng : 106.92059918835042
                      }
                    />
                  ) : null}
                  <OrderCount
                    count={data?.orderCount ? data.orderCount : 783}
                  />
                </div>
              </div>
            </div>
            {data?.activities && data.activities.length > 0 ? (
              <Services
                activities={data?.activities ? data?.activities : []}
                dollarRate={data?.rate ? data?.rate : ""}
              />
            ) : null}
            <div ref={roomsContainer}>
              <HotelRooms
                data={data?.rooms}
                handleScrollToRooms={(ver: string) => handleScrollTo(ver)}
                totalPrice={totalPrice}
                stat={stat}
                dollarRate={data ? data?.rate : ""}
              />
            </div>
            {data?.hotel.introduction ? (
              <Description
                introduction={
                  data?.hotel.introduction ? data?.hotel.introduction : ""
                }
                introductionEn={
                  data?.hotel.introductionEn ? data?.hotel.introductionEn : ""
                }
              />
            ) : null}
            {data?.reviews && data.reviews.length > 0 ? (
              <div ref={reviewsContainer}>
                <Review
                  ver="full"
                  data={data?.reviews ? data?.reviews : []}
                  handleScrollTo={(ver: string) => handleScrollTo(ver)}
                />
              </div>
            ) : null}
            {/* recommended places */}
            {data?.offerHotels && data?.offerHotels.length > 0 ? (
              <div className="flex w-full flex-col gap-[24px] border-t-[1px] border-black/[.15] pt-[24px] lg:gap-[32px] lg:pt-[32px]">
                <p className="text-[20px] font-medium leading-[20px] text-main-text">
                  {lang === "en" ? "Recommended" : "Санал болгох"}
                </p>
                <div className="grid w-full grid-cols-1 gap-[24px] sm:grid-cols-2 lg:grid-cols-3 lg:gap-[32px]">
                  {data?.offerHotels &&
                    data?.offerHotels.map((index, i) => (
                      <HotelCard
                        data={index}
                        key={i}
                        fromMap={false}
                        ver="home"
                        dollarRate={data ? data.rate : "1"}
                      />
                    ))}
                </div>
              </div>
            ) : null}
          </div>
        )}
        <Footer />
      </main>
    );
  return <ErrorComponent />;
};

export default HotelPage;
