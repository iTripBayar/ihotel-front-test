import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface Props {
  phone: string;
  email: string;
  stat: string;
  nameEn: string;
  name: string;
}

export default function ContactInfo({
  phone,
  email,
  stat,
  nameEn,
  name,
}: Props) {
  const searchparams = useSearchParams();
  const lang = searchparams.get("lang");
  const [isPhone, setPhone] = useState(false);
  const [isMail, setMail] = useState(false);

  const mailBody =
    lang === "en"
      ? encodeURIComponent(
          `Hello,

I am interested in making a reservation at ${nameEn}`,
        )
      : encodeURIComponent(
          `Сайн байна уу,

${name}-д захиалга үүсгэх хүсэлтэй байна.`,
        );
  const sumailSubject =
    lang === "en" ? `Inquiry at ${nameEn}` : `${name} талаарх мэдээлэл`;
  const resMail = "reservations@ihotel.mn";

  return (
    <div className="flex flex-wrap w-full gap-[8px] tracking-[0.25px] text-[14px] leading-[16px] lg:text-[14px] lg:leading-[16px] ">
      {/* phone */}
      {stat === "online" ? (
        <button
          className={`flex items-center gap-[6px] rounded-full bg-primary-blue text-white font-medium px-[10px] py-[6px]`}
          // href={`tel:${phone}`}
          disabled={true}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="max-h-[16px] min-h-[16px] min-w-[16px] max-w-[16px]"
          >
            <path
              fillRule="evenodd"
              d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
              clipRule="evenodd"
            />
          </svg>
          <p>{lang === "en" ? "Make a call" : "Залгах"}</p>
        </button>
      ) : isPhone === false ? (
        <button
          className={`flex items-center gap-[6px] lg:gap-[4px] rounded-full bg-primary-blue text-white font-medium px-[10px] py-[6px] ${
            stat !== "pending" ? "opacity-50" : "opacity-100"
          }`}
          onClick={() => {
            setPhone(!isPhone);
            setMail(false);
          }}
          disabled={stat !== "pending"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="max-h-[16px] min-h-[16px] min-w-[16px] max-w-[16px] "
          >
            <path
              fillRule="evenodd"
              d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
              clipRule="evenodd"
            />
          </svg>
          <p>
            {isPhone === false
              ? `${lang === "en" ? "Reveal" : "Харах"}`
              : `${phone.slice(0, 4)}-${phone.slice(4)}`}
          </p>
        </button>
      ) : (
        <button
          className={`flex items-center gap-[6px] lg:gap-[4px] rounded-full bg-primary-blue text-white font-medium px-[10px] py-[6px] ${
            stat !== "pending" ? "opacity-50" : "opacity-100"
          }`}
          // href={`tel:${phone}`}
          disabled={true}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="max-h-[16px] min-h-[16px] min-w-[16px] max-w-[16px]"
          >
            <path
              fillRule="evenodd"
              d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
              clipRule="evenodd"
            />
          </svg>
          <p>
            {phone.slice(0, 4)}-{phone.slice(4)}
          </p>
        </button>
      )}
      {/* mail */}
      {stat === "online" ? (
        <button
          // onClick={() => router.push(`mailto:reservations@ihotel.com`)}
          onClick={() => {
            const mailtoLink = `mailto:${resMail}?subject=${sumailSubject}&body=${mailBody}`;

            window.open(mailtoLink, "_blank");
          }}
          className={`flex items-center gap-[6px] rounded-full bg-primary-blue text-white font-medium px-[10px] py-[6px]`}
          // href={`mailto:reservations@ihotel.com`}
          // router.push('mailto:email@yahoo.com')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="max-h-[18px] min-h-[18px] min-w-[18px] max-w-[18px]"
          >
            <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
            <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
          </svg>
          <p>{lang === "en" ? "Write an email" : "Мэйл бичих"}</p>
        </button>
      ) : isMail === false ? (
        <button
          className={`flex items-center gap-[6px] lg:gap-[4px] rounded-full bg-primary-blue text-white font-medium px-[10px] py-[6px] ${
            stat !== "pending" ? "opacity-50" : "opacity-100"
          }`}
          onClick={() => {
            setMail(!isMail);
            setPhone(false);
          }}
          disabled={stat !== "pending"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="max-h-[18px] min-h-[18px] min-w-[18px] max-w-[18px]"
          >
            <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
            <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
          </svg>
          <p>
            {isMail === false
              ? `${lang === "en" ? "Reveal" : "Харах"}`
              : `${email}`}
          </p>
        </button>
      ) : (
        <button
          className={`flex items-center gap-[6px] lg:gap-[4px] rounded-full bg-primary-blue text-white font-medium px-[10px] py-[6px] ${
            stat !== "pending" ? "opacity-50" : "opacity-100"
          }`}
          onClick={() => {
            const body = encodeURIComponent(`Hello this is a test`);
            const subject = `Subject of the email`;
            const resMail = "reservations@ihotel.mn";
            const mailtoLink = `mailto:${resMail}?subject=${subject}&body=${body}`;

            window.open(mailtoLink, "_blank");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="max-h-[18px] min-h-[18px] min-w-[18px] max-w-[18px]"
          >
            <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
            <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
          </svg>
          <p>{email}</p>
        </button>
      )}
    </div>
  );
}
