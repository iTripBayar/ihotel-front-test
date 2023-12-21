import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

interface Props {
  ver: string;
  stat: string;
  clients: {
    name: string;
    surName: string;
    email: string;
    phone: string;
    nationality: string;
  };
  updateClients: (e: {
    name: string;
    surName: string;
    email: string;
    phone: string;
    nationality: string;
  }) => void;
  handleSubmit: () => void;
  orderLoading: boolean
}
export default function UserInfo({
  ver,
  stat,
  clients,
  updateClients,
  handleSubmit,
  orderLoading,
}: Props) {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');
  const [isChecked, setIsChecked] = useState(false);
  const [additionalClients, setAdditionalClients] = useState<{name: string, surName: string, email: string, phone: string, nationality: string}[]>();

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  if (ver === 'mobile') {
    return (
      <div className='flex w-full flex-col gap-[16px] rounded-[20px] bg-white px-[16px] py-[12px] shadow-[0px_0px_12px_2px_rgb(0,0,0,0.15)] sm:gap-[20px] sm:py-[16px]'>
        <p className='text-[18px] font-medium leading-[18px] text-sub-text'>
          {lang === 'en' ? `Client's info` : 'Захиалагчийн мэдээлэл'}
        </p>
        <form className='flex w-full flex-col gap-[16px]'>
          <input
            type='text'
            id={`name`}
            name={`name`}
            pattern='[A-Za-z]+'
            required
            onChange={(e) => {
              const value = {
                name: e.target.value,
                surName: clients.surName,
                email: clients.email,
                phone: clients.phone,
                nationality: clients.nationality,
              };
              updateClients(value);
            }}
            onKeyDown={(e) => {
              const regex = /^[A-Za-z]+$/;
              const isValid = regex.test(e.key);

              if (!isValid) {
                e.preventDefault();
              }
            }}
            placeholder={lang === 'en' ? 'Given name' : 'Нэр'}
            className='rounded-[8px] border-black/[.15] text-main-text placeholder:text-[14px] placeholder:text-main-text/50 focus:outline-none focus:ring-0'
          />
          <input
            type='text'
            id={`surName`}
            name={`surName`}
            pattern='[A-Za-z]+'
            required
            onChange={(e) => {
              const value = {
                name: clients.name,
                surName: e.target.value,
                email: clients.email,
                phone: clients.phone,
                nationality: clients.nationality,
              };
              updateClients(value);
            }}
            onKeyDown={(e) => {
              const regex = /^[A-Za-z]+$/;
              const isValid = regex.test(e.key);

              if (!isValid) {
                e.preventDefault();
              }
            }}
            placeholder={lang === 'en' ? 'Family name' : 'Овог'}
            className='rounded-[8px] border-black/[.15] text-main-text placeholder:text-[14px] placeholder:text-main-text/50 focus:outline-none focus:ring-0'
          />
          <input
            type='text'
            id={`email`}
            name={`email`}
            pattern='[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
            required
            onChange={(e) => {
              const value = {
                name: clients.name,
                surName: clients.surName,
                email: e.target.value,
                phone: clients.phone,
                nationality: clients.nationality,
              };
              updateClients(value);
            }}
            placeholder={lang === 'en' ? 'Email' : 'И-мэйл'}
            className='rounded-[8px] border-black/[.15] text-main-text placeholder:text-[14px] placeholder:text-main-text/50 focus:outline-none focus:ring-0'
          />
          <input
            type='text'
            id={`phone`}
            name={`phone`}
            pattern='[0-9]+'
            required
            onKeyDown={(e) => {
              // Allow only numeric characters (0-9)
              const isNumericOrBackspace =
                /^[0-9]$/.test(e.key) || e.key === 'Backspace' || e.key ==='Tab';
              if (!isNumericOrBackspace) {
                e.preventDefault();
              }
            }}
            onChange={(e) => {
              const value = {
                name: clients.name,
                surName: clients.surName,
                email: clients.email,
                phone: e.target.value,
                nationality: clients.nationality,
              };
              updateClients(value);
            }}
            placeholder={lang === 'en' ? 'Phone number' : 'Утасны дугаар'}
            className='rounded-[8px] border-black/[.15] text-main-text placeholder:text-[14px] placeholder:text-main-text/50 focus:outline-none focus:ring-0'
          />
          <input
            type='text'
            id={`nationality${1}`}
            name={`nationality${1}`}
            pattern='[A-Za-z]+'
            required
            onChange={(e) => {
              const value = {
                name: clients.name,
                surName: clients.surName,
                email: clients.email,
                phone: clients.phone,
                nationality: e.target.value,
              };
              updateClients(value);
            }}
            placeholder={lang === 'en' ? 'Nationality' : 'Иргэншил'}
            className='rounded-[8px] border-black/[.15] text-main-text placeholder:text-[14px] placeholder:text-main-text/50 focus:outline-none focus:ring-0'
          />
        </form>
      </div>
    );
  } else {
    return (
      <div className='flex h-fit w-full flex-col gap-[24px] rounded-[20px] border border-black/[.15] bg-white px-[16px] py-[16px] '>
        <p className='text-[18px] font-medium leading-[18px] text-sub-text'>
          {lang === 'en' ? `Client's info` : 'Захиалагчийн мэдээлэл'}
        </p>
        <form className='flex w-full flex-col gap-[16px]'>
          <input
            type='text'
            id={`name`}
            name={`name`}
            pattern='[A-Za-z]+'
            required
            onChange={(e) => {
              const value = {
                name: e.target.value,
                surName: clients.surName,
                email: clients.email,
                phone: clients.phone,
                nationality: clients.nationality,
              };
              updateClients(value);
            }}
            onKeyDown={(e) => {
              const regex = /^[A-Za-z]+$/;
              const isValid = regex.test(e.key);

              if (!isValid) {
                e.preventDefault();
              }
            }}
            placeholder={lang === 'en' ? 'Given name' : 'Нэр'}
            className='rounded-[8px] border-black/[.15] text-main-text placeholder:text-[14px] placeholder:text-main-text/50 focus:outline-none focus:ring-0'
          />
          <input
            type='text'
            id={`surName`}
            name={`surName`}
            pattern='[A-Za-z]+'
            required
            onChange={(e) => {
              const value = {
                name: clients.name,
                surName: e.target.value,
                email: clients.email,
                phone: clients.phone,
                nationality: clients.nationality,
              };
              updateClients(value);
            }}
            onKeyDown={(e) => {
              const regex = /^[A-Za-z]+$/;
              const isValid = regex.test(e.key);

              if (!isValid) {
                e.preventDefault();
              }
            }}
            placeholder={lang === 'en' ? 'Family name' : 'Овог'}
            className='rounded-[8px] border-black/[.15] text-main-text placeholder:text-[14px] placeholder:text-main-text/50 focus:outline-none focus:ring-0'
          />
          <input
            type='text'
            id={`email`}
            name={`email`}
            pattern='[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
            required
            onChange={(e) => {
              const value = {
                name: clients.name,
                surName: clients.surName,
                email: e.target.value,
                phone: clients.phone,
                nationality: clients.nationality,
              };
              updateClients(value);
            }}
            placeholder={lang === 'en' ? 'Email' : 'И-мэйл'}
            className='rounded-[8px] border-black/[.15] text-main-text placeholder:text-[14px] placeholder:text-main-text/50 focus:outline-none focus:ring-0'
          />
          <input
            type='text'
            id={`phone`}
            name={`phone`}
            pattern='[0-9]+'
            required
            onKeyDown={(e) => {
              // Allow only numeric characters (0-9)
              const isNumericOrBackspace =
                /^[0-9]$/.test(e.key) || e.key === 'Backspace';
              if (!isNumericOrBackspace) {
                e.preventDefault();
              }
            }}
            onChange={(e) => {
              const value = {
                name: clients.name,
                surName: clients.surName,
                email: clients.email,
                phone: e.target.value,
                nationality: clients.nationality,
              };
              updateClients(value);
            }}
            placeholder={lang === 'en' ? 'Phone number' : 'Утасны дугаар'}
            className='rounded-[8px] border-black/[.15] text-main-text placeholder:text-[14px] placeholder:text-main-text/50 focus:outline-none focus:ring-0'
          />
          <input
            type='text'
            id={`nationality${1}`}
            name={`nationality${1}`}
            pattern='[A-Za-z]+'
            required
            onChange={(e) => {
              const value = {
                name: clients.name,
                surName: clients.surName,
                email: clients.email,
                phone: clients.phone,
                nationality: e.target.value,
              };
              updateClients(value);
            }}
            placeholder={lang === 'en' ? 'Nationality' : 'Иргэншил'}
            className='rounded-[8px] border-black/[.15] text-main-text placeholder:text-[14px] placeholder:text-main-text/50 focus:outline-none focus:ring-0'
          />
        </form>
        <div className='w-full rounded-[8px] border border-primary-blue/50 px-[20px] py-[12px] text-[12px] font-medium leading-[20px] text-primary-blue 2xs:text-[14px]'>
          {lang === 'en'
            ? 'We will contact you shortly after confirming your order request.'
            : 'Бид захиалах хүсэлт хүлээн авсны дараа таны захиалгыг шалгаад эргээд тантай холбогдох болно.'}
        </div>
        {stat === 'online' ? (
          <div className='flex flex-col gap-[24px]'>
            <div className='flex flex-col items-center justify-center gap-[24px]'>
              <div className='flex items-center justify-center gap-[8px] text-[12px] text-sub-text/75 2xs:text-[14px]'>
                <input
                  type='checkBox'
                  name='termCheck'
                  className={`${
                    clients.name === '' &&
                    clients.surName === '' &&
                    clients.email === '' &&
                    clients.phone === '' &&
                    clients.nationality === ''
                      ? ' cursor-not-allowed'
                      : 'cursor-pointer'
                  } border-black/[.25] focus:ring-0`}
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  disabled={
                    clients.name === '' &&
                    clients.surName === '' &&
                    clients.email === '' &&
                    clients.phone === '' &&
                    clients.nationality === ''
                  }
                />
                <label htmlFor='termCheck' className='cursor-pointer'>
                  {lang === 'en' ? (
                    <>
                      Accept{' '}
                      <span className='underline '>Terms and Conditions</span>
                    </>
                  ) : (
                    <>
                      <span className='underline '>Үйлчилгээний нөхцөл</span>{' '}
                      зөвшөөрөх
                    </>
                  )}
                </label>
              </div>
              <button
                className={`flex w-full max-w-[375px] items-center justify-center rounded-full bg-main-online py-[8px] font-medium text-white ${
                  orderLoading === true ? 'sm:text-[12px]' : 'sm:text-[18px]'
                } ${
                  orderLoading === true || isChecked === false
                    ? 'cursor-not-allowed opacity-50'
                    : ''
                }`}
                onClick={handleSubmit}
                disabled={orderLoading === true || isChecked === false}
              >
                {orderLoading === true
                  ? `${lang === 'en' ? 'Loading...' : 'Уншиж байна...'}`
                  : `${lang === 'en' ? 'Proceed to payment' : 'Төлбөр төлөх'}`}
              </button>
            </div>
          </div>
        ) : (
          <button
            className={`flex w-full max-w-[375px] items-center justify-center rounded-full bg-main-online py-[8px] font-medium text-white sm:text-[18px] ${
              isChecked ? 'cursor-not-allowed opacity-50' : ''
            }`}
            disabled={isChecked === false}
          >
            {lang === 'en' ? 'Send order request' : 'Захиалах хүсэлт илгээх'}
          </button>
        )}
      </div>
    );
  }
}
