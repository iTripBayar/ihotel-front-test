import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAppCtx } from "@/contexts/app";
import { signIn } from "next-auth/react";
import { FormEvent } from "react";
import { FacebookSignInButton, GoogleSignInButton } from "./authButtons";
import { CircularProgress } from "@chakra-ui/react";
import { Toaster, toast } from "sonner";

export default function LogIn() {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");
  const { appState, dispatch } = useAppCtx();
  const [error, setError] = useState<string | null>(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const close = () => {
    dispatch({
      type: "CHANGE_APP_STATE",
      payload: { logOrSign: "" },
    });
  };
  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("bg-black/[.35]")) {
      close();
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData(e.currentTarget);
    const signInResponse = await signIn("credentials", {
      email: data.get("email"),
      password: data.get("password"),
      redirect: false,
    });

    if (signInResponse && !signInResponse.error) {
      toast.success(`${lang === "en" ? "Log in successful!" : "Амжилттай нэвтэрлээ!"}`);
      console.log(signInResponse);
      setTimeout(() => {
        setLoading(false);
        close();
      }, 2500);
    } else {
      console.log("Error: ", signInResponse);
      toast.error(`${lang === "en" ? "Error!" : "Алдаа гарлаа!"}`);
      setLoading(false);
      setError("Your Email or Password is wrong!");
    }
  };
  useEffect(()=>{
    // submitButton;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        // console.log('enter')
        document.getElementById("submitButton")?.click();
      }
    };
      document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  },[])

  const handleForgotPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    try {
      const response = await fetch(`${process.env.WEB_URL}/password/email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.get("email"),
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      toast.info(
        `${
          lang === "en"
            ? "Password reset link has been sent to your email!"
            : "Нууц үг сэргээх холбоосыг таны и-мэйл хаяг руу илгээлээ!"
        }`,
      );
      return result;
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  };



  return (
    <div
      className="fixed z-[999] flex h-screen w-full animate-fade items-center justify-center bg-black/[.35]"
      onClick={handleClick}
    >
      
      <Toaster position="top-right" richColors />
      <div className="flex h-auto w-[calc(100%-32px)] max-w-[370px] flex-col justify-between gap-[16px] rounded-[12px] bg-white px-[16px] pb-[16px] sm:max-w-[400px]">
        <div className="flex h-[56px] w-full items-center justify-between border-b-[1px] border-black/[.15] text-[18px] text-main-text">
          {appState.logOrSign === "log" ? (
            <p className="font-medium">
              {lang === "en" ? "Log In" : "Нэвтрэх"}
            </p>
          ) : (
            <p className="font-medium">
              {lang === "en" ? "Reset password" : "Нууц үг сэргээх"}
            </p>
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-[22px] w-[22px]"
            onClick={() => close()}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        {/* inputs */}
        {appState.logOrSign === "log" ? (
          <form
            className="flex w-full flex-col gap-[16px] pt-[8px]"
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              name="email"
              placeholder={lang === "en" ? "E-mail" : "И-мэйл хаяг"}
              required
              className="h-[34px] w-full rounded-[4px] border-black/[.15]"
            />
            <div className="relative text-sub-text">
              <input
                type={passwordVisible === true ? "text" : "password"}
                name="password"
                required
                placeholder={lang === "en" ? "Password" : "Нууц үг"}
                minLength={8}
                className="h-[34px] w-full rounded-[4px] border-black/[.15]"
              />
              <div
                // type="button"
                onClick={() => {
                  setPasswordVisible(!passwordVisible);
                }}
                className="absolute right-0 top-0 h-[34px] flex justify-center items-center cursor-pointer px-2"
              >
                {passwordVisible === false ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.9"
                    stroke="currentColor"
                    className="max-h-[18px] min-h-[18px] min-w-[18px] max-w-[18px]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.9"
                    stroke="currentColor"
                    className="max-h-[18px] min-h-[18px] min-w-[18px] max-w-[18px]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                )}
              </div>
            </div>
            <button
              className="text-[12px] font-bold w-fit text-primary-blue 2xs:text-[14px]"
              onClick={() => {
                dispatch({
                  type: "CHANGE_APP_STATE",
                  payload: { logOrSign: "forgotPassword" },
                });
              }}
            >
              {lang === "en" ? "Forgot password?" : "Нууц үгээ мартсан?"}
            </button>
            {error ? (
              <p className="mt-[-10px] pl-[10px] text-[11px] text-red-600 2xs:text-[12px]">
                {lang === "en"
                  ? "* Incorrect email or password! *"
                  : "* И-мэйл эсвэл нууц үг буруу байна! *"}
              </p>
            ) : null}
            <div className="flex w-full items-center justify-between">
              <div className="h-[1px] w-[33%] bg-black/[.15]"></div>
              <p className="text-[14px] font-medium uppercase text-black/[.25] sm:text-[16px]">
                {lang === "en" ? "Or" : "Эсвэл"}
              </p>
              <div className="h-[1px] w-[33%] bg-black/[.15]"></div>
            </div>
            {/* facebook & google logIn */}
            <div
              className="mb-[-10px] flex w-full items-center justify-center gap-[20px] text-[16px] text-white"
              onKeyDown={(e) => e.preventDefault()}
            >
              <FacebookSignInButton />
              <GoogleSignInButton />
            </div>
            <div className="mt-[16px] grid w-full grid-cols-3 items-center gap-[24px] text-[12px] font-medium 2xs:text-[14px]">
              <div></div>
              <button
                type="submit"
                id={'submitButton'}
                className={`flex h-[40px] min-w-[100px] w-auto items-center justify-center justify-self-center rounded-[8px] bg-primary-blue px-[20px] uppercase text-white ${
                  lang === "en" ? "min-w-[100px] px-[14px]" : ""
                }`}
              >
                {loading === true ? (
                  <CircularProgress
                    isIndeterminate={true}
                    color="#ffffff"
                    size="20px"
                  />
                ) : (
                  <p>{lang === "en" ? "Log In" : "Нэвтрэх"}</p>
                )}
              </button>
              <button
                className="justify-self-end text-[13px] text-primary-blue sm:text-[14px]"
                onClick={() => {
                  dispatch({
                    type: "CHANGE_APP_STATE",
                    payload: { logOrSign: "sign" },
                  });
                }}
              >
                {lang === "en" ? "Sign Up" : "Бүртгүүлэх"}
              </button>
            </div>
          </form>
        ) : (
          <form
            className="flex w-full flex-col gap-[16px] pt-[8px]"
            onSubmit={handleForgotPassword}
          >
            <div className="flex flex-col gap-[8px]">
              <label htmlFor="email" className="text-center indent-1">
                {lang === "en"
                  ? "Please enter your e-mail."
                  : "И-мэйл хаягаа оруулна уу."}
              </label>
              <input
                type="email"
                name="email"
                placeholder={lang === "en" ? "E-mail" : "И-мэйл хаяг"}
                required
                className="h-[34px] w-full rounded-[4px] border-black/[.15]"
              />
            </div>
            <div className="mt-[16px] grid w-full grid-cols-3 items-center gap-[24px] text-[12px] font-medium 2xs:text-[14px]">
              <div></div>
              <button
                type="submit"
                className={`flex h-[40px] w-auto items-center justify-center justify-self-center rounded-[8px] bg-primary-blue px-[20px] uppercase text-white ${
                  lang === "en" ? "min-w-[100px] px-[14px]" : ""
                }`}
              >
                {lang === "en" ? "Proceed" : "Үргэлжлүүлэх"}
              </button>
              <button
                className="justify-self-end text-[13px] text-primary-blue 2xs:text-[14px]"
                onClick={() => {
                  dispatch({
                    type: "CHANGE_APP_STATE",
                    payload: { logOrSign: "log" },
                  });
                }}
              >
                {lang === "en" ? "Cancel" : "Болих"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
