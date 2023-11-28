import { useSearchParams } from "next/navigation"
import React, { useState } from "react"

interface Props{

}

export default function UserInfo({}:Props) {
  const searchParams = useSearchParams()
  const lang = searchParams.get('lang')
  // const [user, setUser] = useState({firstName: '', familyName: '', email: '', phone: '', nationality: '' })

  let user = [{firstName: '', familyName: '', email: '', phone: '', nationality: '' }]
  const [test, setTest] = useState([
    { firstName: '', familyName: '', email: '', phone: '', nationality: '' },
  ]);
 const [inputValue, setInputValue] = useState('');

//  const handleInputChange = (
//    firstName: React.ChangeEvent<HTMLInputElement> | null,
//    lastName: React.ChangeEvent<HTMLInputElement> | null,
//    email: React.ChangeEvent<HTMLInputElement> | null,
//    phone: React.ChangeEvent<HTMLInputElement> | null,
//    nationality: React.ChangeEvent<HTMLInputElement> | null,
//  ) => {
//    const value = firstName ? firstName.target.value : null;

//    // Check if the input consists only of letters
//    if ((value && /^[A-Za-z]+$/.test(value)) || (value && value === '')) {
//      setInputValue(value);
//      if (user[0].familyName === '') {
//        user = [
//          {
//            firstName: value,
//            familyName: '',
//            email: '',
//            phone: '',
//            nationality: '',
//          },
//        ];
//      } else {

//      }
//    }
//  };

  return (
    <div className="flex flex-col gap-[16px] rounded-[20px] bg-white px-[16px] py-[12px] shadow-[0px_0px_12px_2px_rgb(0,0,0,0.15)] sm:gap-[20px] sm:py-[16px]">
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
                    <div className="absolute left-[50%] top-[50%] h-[2px] sm:w-[12px] w-[9px] translate-x-[-50%] translate-y-[-50%] rounded-full bg-primary-blue"></div>
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
                  <div className="absolute left-[50%] top-[50%] h-[2px] sm:w-[14px] sm:h-[2px] w-[10px] translate-x-[-50%] translate-y-[-50%] rounded-full bg-primary-blue"></div>
                  <div className="absolute left-[50%] top-[50%] h-[10px] w-[2px] sm:w-[2px] sm:h-[14px] translate-x-[-50%] translate-y-[-50%] rounded-full bg-primary-blue"></div>
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
}
