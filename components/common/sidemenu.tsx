import Image from "next/image";
import { useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useAppCtx } from "@/contexts/app";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { signOut } from "next-auth/react";

const SideMenu = () => {
  const [closeAnimation, setCloseAnimation] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const lang = searchParams.get("lang");
  const { appState, dispatch } = useAppCtx();
  const { data: session } = useSession({
    required: false,
  });
  const createQueryString = (name: string, value: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (value !== null) {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    return params.toString();
  };

  const close = () => {
    setCloseAnimation(true);
    setTimeout(() => {
      dispatch({
        type: "CHANGE_APP_STATE",
        payload: { menu: "" },
      });
    }, 500);
  };

  const handleClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains("bg-black/50")) {
      close();
    }
  };

  return (
    <div
      className={` fixed right-0 top-0 z-[999] flex h-full w-full justify-end bg-black/50`}
      onClick={handleClick}
    >
      <div
        className={`relative flex h-full w-[210px] animate-slide-left flex-col justify-between bg-[#181818] px-[20px] pb-[32px] pt-[48px] text-[14px] font-medium text-white duration-500 lg:w-[250px] lg:px-[24px] ${
          closeAnimation == true ? " animate-slide-right" : ""
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="absolute right-[18px] top-[18px] h-[28px] w-[28px] cursor-pointer"
          onClick={() => {
            close();
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        {/* top section */}
        <div className="flex w-full flex-col justify-start gap-[24px]">
          {/* logIn */}
          {!session?.user ? (
            <button
              className="flex h-[43px] w-full items-center justify-start  border-b-[1px] border-white/[.15]"
              onClick={() => {
                close();
                setTimeout(() => {
                  dispatch({
                    type: "CHANGE_APP_STATE",
                    payload: {
                      logOrSign: appState.logOrSign !== "log" ? "log" : "",
                    },
                  });
                }, 400);
              }}
            >
              {lang === "en" ? "Log In" : "Нэвтрэх"}
            </button>
          ) : null}

          {!session?.user ? (
            <button
              className="flex h-[43px] w-full items-center justify-start  border-b-[1px] border-white/[.15]"
              onClick={() => {
                close();
                setTimeout(() => {
                  dispatch({
                    type: "CHANGE_APP_STATE",
                    payload: {
                      logOrSign: appState.logOrSign !== "sign" ? "sign" : "",
                    },
                  });
                }, 400);
              }}
            >
              {lang === "en" ? "Sign up" : "Бүртгүүлэх"}
            </button>
          ) : null}

          {/* signUp */}

          {session?.user ? (
            <Link
              href="/profile"
              className="flex h-[43px] w-full items-center justify-start  border-b-[1px] border-white/[.15]"
            >
              {`${session.user.name
                ?.charAt(0)
                .toUpperCase()}${session.user.name?.slice(1)}`}
            </Link>
          ) : null}

          {/* add hotel */}
          <Link
            href={`${process.env.TEMPORARY_URL2}`}
            target="_blank"
            className="flex h-[43px] w-full items-center justify-start  border-b-[1px] border-white/[.15]"
          >
            {lang === "en" ? "Add hotel" : "Буудал нэмэх"}
          </Link>
          {/* Log out */}
          {session?.user ? (
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex h-[43px] w-full items-center justify-start  border-b-[1px] border-white/[.15]"
            >
              {lang === "en" ? "Log out" : "Гарах"}
            </button>
          ) : null}
        </div>
        {/* bottom section */}
        <div className="flex w-full flex-col justify-end gap-[24px]">
          {/* phone */}
          <Link
            href={`tel:${appState.phone}`}
            className="flex h-[43px] w-full items-center justify-end gap-[8px]  border-b-[1px] border-white/[.15]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              strokeWidth={0}
              stroke="currentColor"
              className="h-[18px] w-[18px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
              />
            </svg>
            <p className="leading-[16px]">{appState.phone}</p>
          </Link>
          {/* lang */}
          <button
            onClick={() => {
              const nextLang = lang === "en" ? "mn" : "en";
              router.push(`${pathname}?${createQueryString("lang", nextLang)}`);
            }}
            className="flex h-[43px] w-full items-center justify-end gap-[8px]  border-b-[1px] border-white/[.15]"
          >
            <Image
              src={
                lang === "en"
                  ? "/images/mongolian-flag.png"
                  : "/images/uk-flag.png"
              }
              alt="/lang"
              width={22}
              height={22}
              sizes="10vw"
              className="object-fit max-h-[22px] max-w-[22px] cursor-pointer"
            />
            {lang === "en" ? "MN" : "EN"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
