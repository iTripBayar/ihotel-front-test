import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import Image from 'next/image';

interface Props {
  ver: string;
  stat: string;
}

export default function UserInfo({ ver, stat }: Props) {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');

  const [test, setTest] = useState([
    { firstName: '', familyName: '', email: '', phone: '', nationality: '' },
  ]);

  if (ver === 'mobile') {
    return (
      <div className="flex w-full flex-col gap-[16px] rounded-[20px] bg-white px-[16px] py-[12px] shadow-[0px_0px_12px_2px_rgb(0,0,0,0.15)] sm:gap-[20px] sm:py-[16px]">
        <p className="text-[18px] font-medium leading-[18px] text-sub-text">
          {lang === 'en' ? `Client's info` : 'Захиалагчийн мэдээлэл'}
        </p>
        {test.map((index, i) => (
          <div key={i} className="flex w-full flex-col gap-[16px]">
            {test.length > 1 ? (
              <p className="text-center text-[14px] font-medium text-main-text">
                {lang === 'en' ? 'Client' : 'Захиалагч'} {i + 1}
              </p>
            ) : null}
            <input
              type="text"
              id={`lettersOnly${i}`}
              name={`lettersOnly${i}`}
              pattern="[A-Za-z]+"
              // value={inputValue}
              // onChange={(e)=>{handleInputChange(e, null, null, null, null);}}
              placeholder={lang === 'en' ? 'Given name' : 'Нэр'}
              className="rounded-[8px] border-black/[.15] text-main-text placeholder:text-[14px] placeholder:text-main-text/50 focus:outline-none focus:ring-0"
            />
            <input
              type="text"
              id={`lettersOnly${i}`}
              name={`lettersOnly${i}`}
              pattern="[A-Za-z]+"
              // value={inputValue}
              // onChange={(e)=>{handleInputChange(e, null, null, null, null);}}
              placeholder={lang === 'en' ? 'Family name' : 'Овог'}
              className="rounded-[8px] border-black/[.15] text-main-text placeholder:text-[14px] placeholder:text-main-text/50 focus:outline-none focus:ring-0"
            />
            <input
              type="text"
              id={`lettersOnly${i}`}
              name={`lettersOnly${i}`}
              pattern="[A-Za-z]+"
              // value={inputValue}
              // onChange={(e)=>{handleInputChange(e, null, null, null, null);}}
              placeholder={lang === 'en' ? 'Email' : 'И-мэйл'}
              className="rounded-[8px] border-black/[.15] text-main-text placeholder:text-[14px] placeholder:text-main-text/50 focus:outline-none focus:ring-0"
            />
            <input
              type="text"
              id={`lettersOnly${i}`}
              name={`lettersOnly${i}`}
              pattern="[A-Za-z]+"
              // value={inputValue}
              // onChange={(e)=>{handleInputChange(e, null, null, null, null);}}
              placeholder={lang === 'en' ? 'Phone number' : 'Утасны дугаар'}
              className="rounded-[8px] border-black/[.15] text-main-text placeholder:text-[14px] placeholder:text-main-text/50 focus:outline-none focus:ring-0"
            />
            <input
              type="text"
              id={`lettersOnly${i}`}
              name={`lettersOnly${i}`}
              pattern="[A-Za-z]+"
              // value={inputValue}
              // onChange={(e)=>{handleInputChange(e, null, null, null, null);}}
              placeholder={lang === 'en' ? 'Nationality' : 'Иргэншил'}
              className="rounded-[8px] border-black/[.15] text-main-text placeholder:text-[14px] placeholder:text-main-text/50 focus:outline-none focus:ring-0"
            />
            {i === test.length - 1 ? (
              <div
                className={`flex w-full items-center ${
                  test.length > 1 && i !== 0 ? 'justify-between' : 'justify-end'
                } gap-[3px]`}
              >
                {test.length > 1 ? (
                  <div
                    className="flex items-center gap-[3px] sm:gap-[6px]"
                    onClick={() => setTest(test.slice(0, test.length - 1))}
                  >
                    <div className="relative h-[16px] w-[16px]">
                      <div className="absolute left-[50%] top-[50%] h-[2px] w-[9px] translate-x-[-50%] translate-y-[-50%] rounded-full bg-primary-blue sm:w-[12px]"></div>
                    </div>
                    <p className="text-[11px] font-medium leading-[14px] text-primary-blue 2xs:text-[13px] sm:text-[14px]">
                      {lang === 'en' ? `Delete` : 'Хасах'}
                    </p>
                  </div>
                ) : null}
                <div
                  className="flex items-center gap-[3px] sm:gap-[6px]"
                  onClick={() =>
                    setTest([
                      ...test,
                      {
                        firstName: '',
                        familyName: '',
                        email: '',
                        phone: '',
                        nationality: '',
                      },
                    ])
                  }
                >
                  <div className="relative h-[16px] w-[16px]">
                    <div className="absolute left-[50%] top-[50%] h-[2px] w-[10px] translate-x-[-50%] translate-y-[-50%] rounded-full bg-primary-blue sm:h-[2px] sm:w-[14px]"></div>
                    <div className="absolute left-[50%] top-[50%] h-[10px] w-[2px] translate-x-[-50%] translate-y-[-50%] rounded-full bg-primary-blue sm:h-[14px] sm:w-[2px]"></div>
                  </div>
                  <p className="text-[11px] font-medium leading-[14px] text-primary-blue 2xs:text-[13px] sm:text-[14px]">
                    {lang === 'en'
                      ? `Add another client's info`
                      : 'Нэмэлт зочны мэдээлэл нэмэх'}
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className="flex h-fit w-full flex-col gap-[24px] rounded-[20px] border border-black/[.15] bg-white px-[16px] py-[16px] ">
        <p className="text-[18px] font-medium leading-[18px] text-sub-text">
          {lang === 'en' ? `Client's info` : 'Захиалагчийн мэдээлэл'}
        </p>
        {test.map((index, i) => (
          <div key={i} className="flex w-full flex-col gap-[24px]">
            {test.length > 1 ? (
              <p className="text-center text-[14px] font-medium text-main-text">
                {lang === 'en' ? 'Client' : 'Захиалагч'} {i + 1}
              </p>
            ) : null}
            <input
              type="text"
              id={`lettersOnly${i}`}
              name={`lettersOnly${i}`}
              pattern="[A-Za-z]+"
              // value={inputValue}
              // onChange={(e)=>{handleInputChange(e, null, null, null, null);}}
              placeholder={lang === 'en' ? 'Given name' : 'Нэр'}
              className="rounded-[8px] border-black/[.15] text-main-text placeholder:text-[14px] placeholder:text-main-text/50 focus:outline-none focus:ring-0"
            />
            <input
              type="text"
              id={`lettersOnly${i}`}
              name={`lettersOnly${i}`}
              pattern="[A-Za-z]+"
              // value={inputValue}
              // onChange={(e)=>{handleInputChange(e, null, null, null, null);}}
              placeholder={lang === 'en' ? 'Family name' : 'Овог'}
              className="rounded-[8px] border-black/[.15] text-main-text placeholder:text-[14px] placeholder:text-main-text/50 focus:outline-none focus:ring-0"
            />
            <input
              type="text"
              id={`lettersOnly${i}`}
              name={`lettersOnly${i}`}
              pattern="[A-Za-z]+"
              // value={inputValue}
              // onChange={(e)=>{handleInputChange(e, null, null, null, null);}}
              placeholder={lang === 'en' ? 'Email' : 'И-мэйл'}
              className="rounded-[8px] border-black/[.15] text-main-text placeholder:text-[14px] placeholder:text-main-text/50 focus:outline-none focus:ring-0"
            />
            <input
              type="text"
              id={`lettersOnly${i}`}
              name={`lettersOnly${i}`}
              pattern="[A-Za-z]+"
              // value={inputValue}
              // onChange={(e)=>{handleInputChange(e, null, null, null, null);}}
              placeholder={lang === 'en' ? 'Phone number' : 'Утасны дугаар'}
              className="rounded-[8px] border-black/[.15] text-main-text placeholder:text-[14px] placeholder:text-main-text/50 focus:outline-none focus:ring-0"
            />
            <input
              type="text"
              id={`lettersOnly${i}`}
              name={`lettersOnly${i}`}
              pattern="[A-Za-z]+"
              // value={inputValue}
              // onChange={(e)=>{handleInputChange(e, null, null, null, null);}}
              placeholder={lang === 'en' ? 'Nationality' : 'Иргэншил'}
              className="rounded-[8px] border-black/[.15] text-main-text placeholder:text-[14px] placeholder:text-main-text/50 focus:outline-none focus:ring-0"
            />
            {i === test.length - 1 ? (
              <div
                className={`flex w-full items-center ${
                  test.length > 1 && i !== 0 ? 'justify-between' : 'justify-end'
                } gap-[3px]`}
              >
                {test.length > 1 ? (
                  <div
                    className="flex items-center gap-[3px] sm:gap-[6px]"
                    onClick={() => setTest(test.slice(0, test.length - 1))}
                  >
                    <div className="relative h-[16px] w-[16px]">
                      <div className="absolute left-[50%] top-[50%] h-[2px] w-[10px] translate-x-[-50%] translate-y-[-50%] rounded-full bg-primary-blue "></div>
                    </div>
                    <p className="text-[12px] font-medium leading-[14px] text-primary-blue ">
                      {lang === 'en' ? `Delete` : 'Хасах'}
                    </p>
                  </div>
                ) : null}
                <div
                  className="flex items-center gap-[3px] sm:gap-[6px]"
                  onClick={() =>
                    setTest([
                      ...test,
                      {
                        firstName: '',
                        familyName: '',
                        email: '',
                        phone: '',
                        nationality: '',
                      },
                    ])
                  }
                >
                  <div className="relative h-[16px] w-[16px]">
                    <div className="absolute left-[50%] top-[50%] h-[2px] w-[12px] translate-x-[-50%] translate-y-[-50%] rounded-full bg-primary-blue"></div>
                    <div className="absolute left-[50%] top-[50%] h-[12px] w-[2px] translate-x-[-50%] translate-y-[-50%] rounded-full bg-primary-blue"></div>
                  </div>
                  <p className="text-[12px] font-medium leading-[14px] text-primary-blue ">
                    {lang === 'en'
                      ? `Add another client's info`
                      : 'Нэмэлт зочны мэдээлэл нэмэх'}
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        ))}
        <div className="w-full rounded-[8px] border border-primary-blue/50 px-[20px] py-[12px] text-[12px] font-medium leading-[20px] text-primary-blue 2xs:text-[14px]">
          {lang === 'en'
            ? 'We will contact you shortly after confirming your order request.'
            : 'Бид захиалах хүсэлт хүлээн авсны дараа таны захиалгыг шалгаад эргээд тантай холбогдох болно.'}
        </div>
        {stat === 'online' ? (
          <div className="flex flex-col gap-[16px]">
            <p className="text-[18px] font-medium leading-[18px] text-sub-text">
              {lang === 'en' ? `Payment options` : 'Төлбөрийн сонголт'}
            </p>
            <div className="flex w-full items-center justify-start gap-[24px] text-[16px] text-main-text">
              <div className="flex items-center gap-[8px]">
                <input
                  type="radio"
                  name="socialPay"
                  className="h-[14px] w-[14px] border-black/[.35]"
                />
                <label
                  htmlFor="socialPay"
                  className="flex items-center gap-[4px]"
                >
                  <div className="relative h-[40px] w-[40px] overflow-hidden">
                    <Image
                      src={'/SocialPay.png'}
                      // src={'/samples/camp.png'}
                      alt="/hotel"
                      fill={true}
                      //   priority
                      quality={100}
                      loading="lazy"
                      sizes="50vw"
                      placeholder="blur"
                      blurDataURL={'/SocialPay.png'}
                      className="absolute h-auto w-auto select-none object-cover"
                      draggable={false}
                    />
                  </div>
                  <p>Social Pay</p>
                </label>
              </div>
              <div className="flex items-center gap-[8px]">
                <input
                  type="radio"
                  name="qPay"
                  className="h-[14px] w-[14px] border-black/[.35]"
                />
                <label htmlFor="qPay" className="flex items-center gap-[4px]">
                  <div className="relative h-[40px] w-[40px] overflow-hidden">
                    <Image
                      src={'/QPay.png'}
                      // src={'/samples/camp.png'}
                      alt="/hotel"
                      fill={true}
                      //   priority
                      quality={100}
                      loading="lazy"
                      sizes="50vw"
                      placeholder="blur"
                      blurDataURL={'/QPay.png'}
                      className="absolute h-auto w-auto select-none object-cover"
                      draggable={false}
                    />
                  </div>
                  <p>QPay</p>
                </label>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-[12px]">
              <div className="flex items-center justify-center gap-[8px] text-[12px] text-sub-text/75 2xs:text-[14px]">
                <input
                  type="checkBox"
                  className="border-black/[.25] focus:ring-0 "
                />
                {lang === 'en'
                  ? 'Accept Terms and Conditions'
                  : 'Үйлчилгээний нөхцөл зөвшөөрөх'}
              </div>
              <div className="flex w-full max-w-[375px] items-center justify-center rounded-full bg-main-online py-[8px] font-medium text-white sm:text-[18px] ">
                {lang === 'en' ? 'Proceed to payment' : 'Төлбөр төлөх'}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex w-full max-w-[375px] items-center justify-center rounded-full bg-main-online py-[8px] font-medium text-white sm:text-[18px] ">
            {lang === 'en' ? 'Send order request' : 'Захиалах хүсэлт илгээх'}
          </div>
        )}
      </div>
    );
  }
}
