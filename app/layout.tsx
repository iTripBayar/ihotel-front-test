"use client";

import "./globals.css";
import { Montserrat } from "next/font/google";
import { AppCtxProvider } from "@/contexts/app";
import AuthProvider from "@/contexts/auth";
import { CookiesProvider } from "react-cookie";
import { ChakraProvider } from "@chakra-ui/react";
import Script from "next/script";

const inter = Montserrat({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppCtxProvider>
      <AuthProvider>
        <CookiesProvider>
          <html lang="en">
            <head>
              <link rel="icon" type="image/x-icon" href="/favicon-blue.ico" />
              <link
                rel="shortcut icon"
                type="image/x-icon"
                href="/favicon-blue.ico"
              />
              <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
              {/* <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
              /> */}
              <meta name="author" content="iHotel LLC" />
              <meta name="copyright" content="iHotel LLC" />
              <meta property="fb:app_id" content="500186344160161" />
              <meta name="msapplication-TileColor" content="#da532c" />
            </head>
            <body className={`relative overscroll-y-none ${inter.className}`}>
              <ChakraProvider>{children}</ChakraProvider>
              {process.env.APP_ENV === "production" ? (
                <>
                 
                  <Script
                    id="messenger-tag"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                      __html: `{ var chatbox = document.getElementById('fb-customer-chat');
      chatbox.setAttribute("page_id", "102637418520330");
      chatbox.setAttribute("attribution", "biz_inbox");}`,
                    }}
                  ></Script>
                  {/*  */}
                  <Script
                    id="messenger-sdk"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                      __html: `{window.fbAsyncInit = function() {
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
      }(document, 'script', 'facebook-jssdk'));}`,
                    }}
                  ></Script>
                </>
              ) : null}
            </body>
          </html>
        </CookiesProvider>
      </AuthProvider>
    </AppCtxProvider>
  );
}
