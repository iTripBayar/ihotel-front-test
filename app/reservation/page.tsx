"use client";
import HeaderVariants from "@/components/common/headerVariants";
import CalendarDialog from "@/components/pageComponents/hotelPage/dialogs/calendarDialog";
import AdditionalRequest from "@/components/pageComponents/reservationPage/additionalRequest";
import BottomDialog from "@/components/pageComponents/reservationPage/bottomDialog";
import CancelTerm from "@/components/pageComponents/reservationPage/cancelTerm";
import GeneralInfo from "@/components/pageComponents/reservationPage/generalInfo";
import OrderInfo from "@/components/pageComponents/reservationPage/orderInfo";
import UserInfo from "@/components/pageComponents/reservationPage/userInfo";
import { fetchDataHotel, fetchCreateOrder } from "@/utils";
import { useRequest } from "ahooks";
import Footer from "@/components/common/footer";
import { useSearchParams, useRouter } from "next/navigation";
import { useAppCtx } from "@/contexts/app";
import { unserialize } from "serialize-php";
import { CircularProgress } from "@chakra-ui/react";
import LogIn from "@/components/common/signIn/logIn";
import SignUp from "@/components/common/signIn/signUp";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import SideMenu from "@/components/common/sidemenu";
import { fetchProfileInto } from "@/utils/user";
import { useSession } from "next-auth/react";
const ErrorComponent = dynamic(() => import("@/components/common/404"));

const ReservationPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const slug = searchParams.get("slug");
  const lang = searchParams.get("lang");
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const days = searchParams.get("days");
  const cart = searchParams.getAll("cart");
  const { appState, dispatch } = useAppCtx();

  const { data: session } = useSession({
    required: false,
  });
  const { data: profileData, run } = useRequest(
    (e: { email: string }) => {
      return fetchProfileInto({
        email: e.email,
        order_page: 1,
        review_page: 1,
      });
    },
    {
      manual: true,
      onSuccess: (res) => {
        console.log(res);
        setClients({
          name: res.user.name,
          surName: res.user.surname ? res.user.surname : "",
          email: res.user.email,
          phone: res.user.phoneNumber ? res.user.phoneNumber : "",
          nationality: res.user.country ? res.user.country : "",
        });
      },
    },
  );

  const [clients, setClients] = useState({
    name: "",
    surName: "",
    email: "",
    phone: "",
    nationality: profileData?.user.country
      ? profileData.user.country
      : "Mongolia",
  });
  const updateClients = (e: {
    name: string;
    surName: string;
    email: string;
    phone: string;
    nationality: string;
  }) => {
    const value = {
      name: e.name,
      surName: e.surName,
      email: e.email,
      phone: e.phone,
      nationality: e.nationality,
    };
    setClients(value);
  };

  useEffect(() => {
    dispatch({
      type: "CHANGE_APP_STATE",
      payload: { logOrSign: "", menu: "", calendar: "" },
    });
  }, []);
  useEffect(() => {
    if (session?.user?.email) {
      run({ email: session?.user?.email });
    }
  }, [session]);
  const { data, loading, error } = useRequest(() => {
    if (slug)
      return fetchDataHotel({
        slug: slug,
        checkIn: checkIn ? checkIn.split("|")[0] : "",
        checkOut: checkOut ? checkOut.split("|")[0] : "",
        // checkIn: "",
        // checkOut: "",
      });
    return fetchDataHotel({ slug: "", checkIn: "", checkOut: "" });
  });

  let totalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i] && days && data) {
      for (let j = 0; j < data.rooms.length; j++) {
        if (parseInt(cart[i].split("$")[0]) === data.rooms[j].id) {
          totalPrice =
            totalPrice +
            data.rooms[j].defaultPrice *
              parseInt(cart[i].split("$")[1]) *
              parseInt(days);
        }
      }
    }
  }
  const orderingRooms: {
    startdate: string;
    enddate: string;
    hotel_id: string;
    room_id: string;
    room_number: string;
    person_number: string; //Зарим өрөөнүүд хүнээр захиалга үүсгэдэг. Энэ үед room_number 0 person_person хүний тоо байна
    room_price: string;
    room_type: string; // Нээх хамаагүй
    room_name: string;
    total_price: string;
    by_person: string;
  }[] = [];
  for (let i = 0; i < cart.length; i++) {
    orderingRooms.push({
      startdate: checkIn
        ? `${checkIn?.split("|")[0].split("/")[2]}-${checkIn
            ?.split("|")[0]
            .split("/")[0]}-${checkIn?.split("|")[0].split("/")[1]}`
        : "",
      enddate: checkOut
        ? `${checkOut?.split("|")[0].split("/")[2]}-${checkOut
            ?.split("|")[0]
            .split("/")[0]}-${checkOut?.split("|")[0].split("/")[1]}`
        : "",
      hotel_id: data?.hotel.id ? `${data?.hotel.id}` : "",
      room_id: cart[i].split("$")[0],
      room_number: cart[i].split("$")[1],
      person_number: "1", //Зарим өрөөнүүд хүнээр захиалга үүсгэдэг. Энэ үед room_number 0 person_person хүний тоо байна
      room_price: data?.rooms.filter(
        (index) => index.id === parseInt(cart[i].split("$")[0]),
      )[0]
        ? data?.rooms
            .filter((index) => index.id === parseInt(cart[i].split("$")[0]))[0]
            .defaultPrice.toString()
        : "",
      room_type: data?.rooms.filter(
        (index) => index.id === parseInt(cart[i].split("$")[0]),
      )[0].bedTypeId
        ? data?.rooms
            .filter((index) => index.id === parseInt(cart[i].split("$")[0]))[0]
            .bedTypeId.toString()
        : "", // Нээх хамаагүй
      room_name: data?.rooms.filter(
        (index) => index.id === parseInt(cart[i].split("$")[0]),
      )[0].name
        ? data?.rooms.filter(
            (index) => index.id === parseInt(cart[i].split("$")[0]),
          )[0].name
        : "",
      total_price: `${
        data?.rooms.filter(
          (index) => index.id === parseInt(cart[i].split("$")[0]),
        )[0] && days
          ? data?.rooms.filter(
              (index) => index.id === parseInt(cart[i].split("$")[0]),
            )[0].defaultPrice *
            parseInt(cart[i].split("$")[1]) *
            parseInt(days)
          : ""
      }`,
      by_person: "",
    });
  }

  const { loading: orderLoading, run: runCreateOrder } = useRequest(
    () => {
      return fetchCreateOrder({
        name: clients.name,
        surname: clients.surName,
        country: clients.nationality,
        phone_number: clients.phone,
        email_order: clients.email,
        beneficiary_name: "",
        beneficiary_account_number: "",
        order_hotelid: data?.hotel.id ? `${data.hotel.id}` : "",
        payment_option: "",
        order_roomdata: orderingRooms,
        order_startdate: checkIn
          ? `${checkIn?.split("|")[0].split("/")[2]}-${checkIn
              ?.split("|")[0]
              .split("/")[0]}-${checkIn?.split("|")[0].split("/")[1]}`
          : "",
        order_enddate: checkOut
          ? `${checkOut?.split("|")[0].split("/")[2]}-${checkOut
              ?.split("|")[0]
              .split("/")[0]}-${checkOut?.split("|")[0].split("/")[1]}`
          : "",
      });
    },
    {
      manual: true,
      onSuccess: (result) => {
        if (result.orderId && result?.token) {
          console.log(result);
          router.push(
            `/payment?id=${result.orderId}&tkn=${result.token}&totalPrice=${totalPrice}`,
          );
        }
      },
    },
  );

  const handleSubmit = () => {
    runCreateOrder();
  };

  let stat = "";
  if (data?.hotel.isOnline == 1 && data?.hotel.isOffline == 0) {
    stat = "online";
  } else if (data?.hotel.isOnline == 0 && data?.hotel.isOffline == 0) {
    stat = "pending";
  } else {
    router.back();
  }

  const serializedData: string | undefined = data?.hotel.cancellationPolicies;
  let unserializedData: { day: string; fee: string }[] = [{ day: "", fee: "" }];
  if (serializedData) {
    unserializedData = unserialize(serializedData);
  }

  console.log(data);
  if (!error)
    return (
      <div>
        <>
          <title>
            {lang === "en"
              ? "Reservation | iHotel"
              : "Захиалга үүсгэх | iHotel"}
          </title>
          <meta
            name="description"
            content={
              lang === "en"
                ? "iHotel reservation page"
                : "iHotel захиалгын хуудас"
            }
          />
        </>
        <HeaderVariants
          ver={"hotel"}
          placesData={data ? data.places : []}
          cityData={data ? data.cities : []}
        />
        <div className="fixed left-[50%] top-[72px] z-[900] hidden h-auto w-auto translate-x-[-50%] lg:flex">
          {appState.calendar === "open" ? <CalendarDialog ver={"web"} /> : null}
        </div>
        {appState.logOrSign === "log" ||
        appState.logOrSign === "forgotPassword" ? (
          <LogIn />
        ) : null}
        {appState.logOrSign === "sign" ? <SignUp /> : null}
        {appState.menu === "open" ? <SideMenu session={session} /> : null}
        <div className="fixed bottom-0 z-[800] w-full sm:px-[50px] md:px-[72px] lg:hidden ">
          {appState.calendar === "open" ? (
            <CalendarDialog ver={"mobile"} />
          ) : (
            <BottomDialog
              stat={stat}
              handleSubmit={handleSubmit}
              orderLoading={orderLoading}
              clients={clients}
            />
          )}
        </div>
        {loading === true ? (
          <div className="flex h-screen w-full items-center justify-center pb-[100px]">
            <CircularProgress isIndeterminate={true} color="#3C76FE" />
          </div>
        ) : (
          <div className="relative flex w-full flex-col gap-[20px] px-[16px] pb-[150px] pt-[72px] sm:gap-[24px] sm:px-[50px] md:px-[72px] lg:grid lg:grid-cols-5 lg:gap-[48px]  lg:px-[60px] lg:pb-[50px] xl:gap-[64px] xl:px-[100px] 2xl:px-[150px]">
            <div className="sticky flex flex-col gap-[20px] lg:col-span-3 lg:gap-[32px]">
              <GeneralInfo
                name={data ? data.hotel.name : null}
                nameEn={data ? data.hotel.nameEn : null}
                image={data ? data.hotel.image : null}
                address={data ? data.hotel.address : null}
                addressEn={data ? data.hotel.addressEn : null}
                phone={data ? data.hotel.phone : null}
                email={data ? data.hotel.email : null}
              />
              <OrderInfo
                rooms={data ? data.rooms : []}
                dollarRate={data ? data.rate : null}
                totalPrice={totalPrice}
              />
              <div className="lg:hidden">
                <UserInfo
                  ver={"mobile"}
                  stat={""}
                  clients={clients}
                  updateClients={(e: {
                    name: string;
                    surName: string;
                    email: string;
                    phone: string;
                    nationality: string;
                  }) => updateClients(e)}
                  handleSubmit={handleSubmit}
                  orderLoading={orderLoading}
                />
              </div>
              <CancelTerm
                data={unserializedData}
                dollarRate={data ? data.rate : null}
                totalPrice={totalPrice}
              />
              <AdditionalRequest />
              {stat === "pending" ? (
                <div className="w-full rounded-[8px] border border-primary-blue/50 px-[20px] py-[12px] text-[12px] font-medium leading-[20px] text-primary-blue 2xs:text-[14px] lg:hidden">
                  {lang === "en"
                    ? "We will contact you shortly after confirming your order request."
                    : "Бид захиалах хүсэлт хүлээн авсны дараа таны захиалгыг шалгаад эргээд тантай холбогдох болно."}
                </div>
              ) : null}
              <button className="flex w-full items-center justify-start gap-[8px] text-[12px] font-medium text-primary-blue/[.75] 2xs:text-[14px]">
                <svg
                  viewBox="0 0 24 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="max-h-[18px] min-h-[18px] min-w-[20px] max-w-[20px] opacity-75 2xs:max-h-[21px] 2xs:min-h-[21px] 2xs:min-w-[24px] 2xs:max-w-[24px]"
                >
                  <path
                    d="M0.425264 9.84365L9.06378 1.27485C9.33425 1.00656 9.70109 0.855835 10.0836 0.855835C10.4661 0.855835 10.8329 1.00656 11.1034 1.27485C11.3739 1.54314 11.5258 1.90702 11.5258 2.28645C11.5258 2.66587 11.3739 3.02975 11.1034 3.29804L4.92329 9.42592L22.5602 9.42592C22.9421 9.42592 23.3083 9.57638 23.5783 9.84421C23.8483 10.112 24 10.4753 24 10.854C24 11.2328 23.8483 11.5961 23.5783 11.8639C23.3083 12.1317 22.9421 12.2822 22.5602 12.2822L4.92329 12.2822L11.101 18.4136C11.3715 18.6819 11.5234 19.0458 11.5234 19.4252C11.5234 19.8046 11.3715 20.1685 11.101 20.4368C10.8306 20.7051 10.4637 20.8558 10.0812 20.8558C9.69869 20.8558 9.33185 20.7051 9.06138 20.4368L0.422867 11.868C0.28862 11.7352 0.182156 11.5773 0.109587 11.4035C0.0370197 11.2297 -0.000221252 11.0434 1.90735e-06 10.8553C0.000225067 10.6672 0.0379066 10.481 0.110886 10.3074C0.183867 10.1338 0.290703 9.97619 0.425264 9.84365Z"
                    fill="#3C76FE"
                  />
                </svg>
                <>{lang === "en" ? "Go back" : "Өмнөх хуудас руу буцах"}</>
              </button>
            </div>
            <div className="relative hidden h-full w-full lg:col-span-2 lg:flex">
              <div className="sticky top-[72px] h-fit">
                <UserInfo
                  ver={"web"}
                  stat={stat}
                  clients={clients}
                  updateClients={(e: {
                    name: string;
                    surName: string;
                    email: string;
                    phone: string;
                    nationality: string;
                  }) => updateClients(e)}
                  handleSubmit={handleSubmit}
                  orderLoading={orderLoading}
                />
              </div>
            </div>
          </div>
        )}
        <div className="hidden lg:flex">
          <Footer />
        </div>
      </div>
    );
  return <ErrorComponent />;
};

export default ReservationPage;
