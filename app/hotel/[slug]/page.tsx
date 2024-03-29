"use client";
import HeaderVariants from "@/components/common/headerVariants";
import HotelImages from "@/components/pageComponents/hotelPage/hotelImages";
import { useRequest } from "ahooks";
import { fetchDataHotel } from "@/utils";
import HotelInfo from "@/components/pageComponents/hotelPage/hotelInfo";
import Amenity from "@/components/pageComponents/hotelPage/amenity";
import Review from "@/components/pageComponents/hotelPage/reviews";
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
import { useEffect, useRef, useState } from "react";
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
import { useCookies } from "react-cookie";
import ContactInfo from "@/components/pageComponents/hotelPage/contactInfo";

interface CartItem {
  id: number;
  name: string;
  nameEn: string;
  amount: number;
  occupancy: number;
  price: number;
  method: string;
}

const HotelPage = ({ params }: { params: { slug: string } }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const lang = searchParams.get("lang");
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const days = searchParams.get("days");

  const [currentCart, setCurrentCart] = useState<CartItem[]>([]);
  const [cookies] = useCookies(["cartArray"]);

  const handleCartChange = (e: CartItem) => {
    if (e.method === "add") {
      if (currentCart.length > 0) {
        if (currentCart.some((index) => index.id === e.id)) {
          setCurrentCart((prev) => [
            ...prev.filter((index) => index.id !== e.id),
            e,
          ]);
        } else {
          setCurrentCart((prev) => [...prev, e]);
        }
      } else {
        setCurrentCart([e]);
      }
    } else if (e.method === "remove") {
      setCurrentCart((prev) => prev.filter((index) => index.id !== e.id));
    }
  };

  const { data: session } = useSession({
    required: false,
  });
  const { appState, dispatch } = useAppCtx();
  const roomsContainer = useRef<HTMLDivElement>(null);
  const footerContainer = useRef<HTMLDivElement>(null);
  const reviewsContainer = useRef<HTMLDivElement>(null);
  const [inViewport] = useInViewport(roomsContainer);
  const [inViewport1] = useInViewport(footerContainer);

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
    if (cookies.cartArray) {
      if (cookies.cartArray.slug && cookies.cartArray.slug === params.slug) {
        setCurrentCart(JSON.parse(cookies.cartArray.array));
      }
    }
  }, []);

  const { data, loading, error } = useRequest(
    () => {
      if (params.slug)
        return fetchDataHotel({
          slug: params.slug,
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
      if (
        data.rooms[i].sales.length > 0 &&
        checkOut &&
        new Date(data.rooms[i].sales[0].enddate) >= new Date(checkOut)
      ) {
        roomPrices.push(data?.rooms[i].sales[0].price);
      } else {
        roomPrices.push(data?.rooms[i].defaultPrice);
      }
    }
  }
  roomPrices.sort((a, b) => a - b);

  let totalPrice = 0; //total price of the rooms inside the cart
  if (days) {
    for (let i = 0; i < currentCart.length; i++) {
      totalPrice =
        totalPrice +
        currentCart[i].price * currentCart[i].amount * parseInt(days);
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
            content={`${process.env.CURRENT_URL}/${params.slug}`}
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
          inViewport1={inViewport1}
          currentCart={currentCart}
          changeCart={(e: CartItem) => handleCartChange(e)}
          dollarRate={"1"}
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
                    stat={stat}
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
                <div className="hidden lg:block">
                  <ContactInfo
                    phone={data?.hotel.phone ? data.hotel.phone : ""}
                    email={data?.hotel.email ? data.hotel.email : ""}
                    stat={stat}
                    nameEn={data?.hotel.nameEn ? data.hotel.nameEn : ""}
                    name={data?.hotel.name ? data.hotel.name : ""}
                  />
                </div>
                {data?.reviews &&
                data?.reviews.length > 0 &&
                stat !== "data" ? (
                  <Review
                    ver=""
                    data={data?.reviews ? data?.reviews : []}
                    handleScrollTo={(ver: string) => handleScrollTo(ver)}
                  />
                ) : null}
                {/* stat & price */}
                <div
                  className={`hidden flex-col gap-[24px] ${
                    stat === "online" || stat === "pending"
                      ? "border-t-[1px] border-t-black/[.15] pt-[24px]"
                      : ""
                  }  lg:flex`}
                >
                  <div
                    className={`flex h-[36px] items-center justify-center gap-[4px] rounded-[8px] text-center font-medium ${
                      stat === "online"
                        ? "bg-main-online text-white font-semibold"
                        : stat === "pending"
                        ? "bg-main-pending text-sub-text font-medium"
                        : stat === "offline"
                        ? "bg-main-offline text-white font-semibold"
                        : "bg-main-data text-sub-text font-medium"
                    }`}
                  >
                    {lang === "en" ? (
                      <p>
                        {stat === "online"
                          ? "Шууд баталгаажна"
                          : stat === "pending"
                          ? "Баталгаажих хугацаа: "
                          : "Онлайн захиалга боломжгүй"}
                        {stat === "pending" ? (
                          <span className="text-[14px] font-semibold sm:text-[11px] md:text-[14px]">
                            1-3 цаг
                          </span>
                        ) : null}
                      </p>
                    ) : (
                      <p>
                        {stat === "online"
                          ? "Шууд баталгаажна"
                          : stat === "pending"
                          ? "Баталгаажих хугацаа: "
                          : "Онлайн захиалга боломжгүй"}
                        {stat === "pending" ? (
                          <span className="text-[14px] font-semibold sm:text-[11px] md:text-[14px]">
                            1-3 цаг
                          </span>
                        ) : null}
                      </p>
                    )}
                  </div>
                  {stat === "online" || stat === "pending" ? (
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
                  ) : null}
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
                  {stat !== "data" && (
                    <OrderCount
                      count={data?.orderCount ? data.orderCount : 783}
                    />
                  )}
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
                currentCart={currentCart}
                changeCart={(e: CartItem) => handleCartChange(e)}
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
            {data?.reviews && data.reviews.length > 0 && stat !== "data" ? (
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
        <div ref={footerContainer}>
          <Footer />
        </div>
      </main>
    );
  return <ErrorComponent />;
};

export default HotelPage;
