"use client";
import CommonLocation from "@/components/pageComponents/homePage/commonLocation";
import News from "@/components/pageComponents/homePage/news";
import Footer from "@/components/common/footer";
import { useRef, useEffect } from "react";
import { useRequest } from "ahooks";
import HeaderVariants from "@/components/common/headerVariants";
import { fetchData } from "@/utils";
import SearchSection from "@/components/common/searchSection";
import Header from "@/components/common/header";
import BottomSection from "@/components/common/bottomSection";
import CardsContainer from "@/components/pageComponents/homePage/cardsContainer";
import { useAppCtx } from "@/contexts/app";
import LogIn from "@/components/common/signIn/logIn";
import SignUp from "@/components/common/signIn/signUp";
import { CircularProgress } from "@chakra-ui/react";
import dynamic from "next/dynamic";
const ErrorComponent = dynamic(() => import("@/components/common/404"));
import { useSession } from "next-auth/react";
import SideMenu from "@/components/common/sidemenu";
import { useSearchParams } from "next/navigation";
import ResetPass from "@/components/common/signIn/resetPass";
import Script from "next/script";
import { useInViewport } from "ahooks";
import HomeCategoryOptions from "@/components/pageComponents/homePage/homeCategoryOptions";

const Home = () => {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");
  const resetPass = searchParams.get("resetPass");
  const searchBoxRef = useRef(null);
  const [inViewport] = useInViewport(searchBoxRef);

  const { data: session } = useSession({
    required: false,
  });

  const { data, loading, error } = useRequest(() => {
    return fetchData();
  });

  const { appState, dispatch } = useAppCtx();

  useEffect(() => {
    dispatch({
      type: "CHANGE_APP_STATE",
      payload: { map: "", logOrSign: "", menu: "" },
    });
  }, []);

  if (!error)
    return (
      <main className="relative flex flex-col gap-[24px] overflow-hidden md:gap-[32px] lg:gap-[48px] xl:gap-[64px]">
        <>
          <title>
            {lang === "en"
              ? "Hotel, ger and camp in Ulaanbaatar | Mongolia - iHotel"
              : "Зочид буудал, амралтын газрын онлайн захиалга - iHotel"}
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
                ? "Mongolian largest accommodation booking website. Book hotels, Gers, tourist camps and resorts in all parts of Mongolia. Find exclusive deals and cheap price."
                : "Зочид буудал, амралтын газрыг хамгийн хямд үнээр захиалах | Монголын хамгийн том захиалгын систем - iHotel.mn"
            }
          />
          {/* Facebook Metadata */}
          <meta property="og:url" content={`${process.env.CURRENT_URL}`} />
          <meta
            property="og:title"
            content={
              lang === "en"
                ? "Hotel, ger and camp in Ulaanbaatar | Mongolia - iHotel"
                : "Зочид буудал, амралтын газрын онлайн захиалга - iHotel"
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
                ? "Mongolian largest accommodation booking website. Book hotels, Gers, tourist camps and resorts in all parts of Mongolia. Find exclusive deals and cheap price."
                : "Зочид буудал, амралтын газрыг хамгийн хямд үнээр захиалах | Монголын хамгийн том захиалгын систем - iHotel.mn"
            }
          />
          {/* Google Metadata */}
          <meta
            item-prop="name"
            content={
              lang === "en"
                ? "Hotel, ger and camp in Ulaanbaatar | Mongolia - iHotel"
                : "Зочид буудал, амралтын газрын онлайн захиалга - iHotel"
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
                ? "Mongolian largest accommodation booking website. Book hotels, Gers, tourist camps and resorts in all parts of Mongolia. Find exclusive deals and cheap price."
                : "Зочид буудал, амралтын газрыг хамгийн хямд үнээр захиалах | Монголын хамгийн том захиалгын систем - iHotel.mn"
            }
          ></meta>
        </>
        <Header
          user={
            session
              ? `${session.user?.name
                  ?.charAt(0)
                  .toUpperCase()}${session.user?.name?.slice(1)}`
              : ""
          }
        />
        {!inViewport ? (
          <HeaderVariants
            ver={"fixed"}
            placesData={data ? data.places : []}
            cityData={data ? data.cities : []}
          />
        ) : null}
        {appState.logOrSign === "log" ||
        appState.logOrSign === "forgotPassword" ? (
          <LogIn />
        ) : null}
        {appState.logOrSign === "sign" ? <SignUp /> : null}
        {resetPass && resetPass !== "" ? <ResetPass /> : null}
        {appState.menu === "open" ? <SideMenu session={session} /> : null}
        <BottomSection
          ver={"fixed"}
          handleScrollToTopVer={() => {}}
          inViewport={!inViewport}
        />
        {loading ? (
          <div className="flex h-[111px] w-full items-center justify-center 2xs:h-[100px] sm:h-[130px] md:h-[160px] lg:h-[180px] xl:h-[225px] 2xl:h-[250px]">
            <CircularProgress isIndeterminate={true} color="#3C76FE" />
          </div>
        ) : (
          <HomeCategoryOptions data={data ? data.propertyTypes : []} />
        )}
        <div ref={searchBoxRef}>
          <SearchSection
            ver={"normal"}
            placesData={data ? data.places : []}
            cityData={data ? data.cities : []}
          />
        </div>

        {loading ? (
          <div className="flex h-[650px] w-full items-center justify-center">
            <CircularProgress isIndeterminate={true} color="#3C76FE" />
          </div>
        ) : (
          <div className="relative flex flex-col gap-[24px] overflow-hidden md:gap-[32px] lg:gap-[48px] xl:gap-[64px] ">
            {/* <HomeCategoryOptions data={data ? data.propertyTypes : []} /> */}
            <CommonLocation
              data={data ? data.destCategories : []}
              destinations={data ? data.topDestinations : []}
            />
            <div>
              <CardsContainer
                title={"cheap"}
                data={data ? data.cheapHotels : []}
                dollarRate={data ? data.dollarRate : "1"}
              />
            </div>
            <CardsContainer
              title={"hotels"}
              data={data ? data.hotels : []}
              dollarRate={data ? data.dollarRate : "1"}
            />
            <CardsContainer
              title={"camps"}
              data={data ? data.camps : []}
              dollarRate={data ? data.dollarRate : "1"}
            />
            <News data={data ? data.posts : []} />
          </div>
        )}
        {process.env.APP_ENV === "production" ? (
          <>
            {/* <!-- Messenger Chat plugin Code --> */}
            <div id="fb-root"></div>
            {/* <!-- Your Chat plugin code --> */}
            <div id="fb-customer-chat" className="fb-customerchat"></div>
            <Script strategy="lazyOnload" id="messenger-tag">
              {`
                var chatbox = document.getElementById('fb-customer-chat');
                chatbox.setAttribute("page_id", "609268625884753");
                chatbox.setAttribute("attribution", "biz_inbox");

                window.fbAsyncInit = function() {
                  FB.init({
                       xfbml            : true,
                       version          : 'v18.0'
                  });
                };

                (function(d, s, id) {
                  var js, fjs = d.getElementsByTagName(s)[0];
                  if (d.getElementById(id)) return;
                  js = d.createElement(s); js.id = id;
                  js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
                  fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));
              `}
            </Script>
          </>
        ) : null}
        <Footer />
      </main>
    );
  return <ErrorComponent />;
};
export default Home;
