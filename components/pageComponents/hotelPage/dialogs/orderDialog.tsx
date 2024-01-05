import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
interface Props {
  roomPrices: number[];
  allRooms: roomData.room[];
  slug: string;
  handleScrollToRooms: (ver: string) => void;
  totalPrice: number;
}
export default function OrderDialog({
  roomPrices,
  allRooms,
  slug,
  handleScrollToRooms,
  totalPrice,
}: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const lang = searchParams.get('lang');
  const cart = searchParams.getAll('cart');
  const checkIn = searchParams.get('checkIn');
  const checkOut = searchParams.get('checkOut');
  const days = searchParams.get('days');

  const createQueryString = (name: string, index: number) => {
    const params = new URLSearchParams(searchParams);
    params.delete(name, cart[index]);
    return params.toString();
  };

  let displayDate = { mn: '', en: '', days: '' };
  const mnDate = {
    from: {
      month: checkIn?.split('|')[0].split('/')[0],
      date: checkIn?.split('|')[0].split('/')[1],
    },
    to: {
      month: checkOut?.split('|')[0].split('/')[0],
      date: checkOut?.split('|')[0].split('/')[1],
    },
  };
  const enDate = {
    from: {
      month: checkIn?.split('|')[1]?.split('-')[0],
      date: checkIn?.split('|')[1]?.split('-')[1],
    },
    to: {
      month: checkOut?.split('|')[1].split('-')[0],
      date: checkOut?.split('|')[1].split('-')[1],
    },
  };
  if (mnDate.from.month === mnDate.to.month) {
    displayDate = {
      mn: `${mnDate.from.month}-р сар ${mnDate.from.date}-${mnDate.to.date}`,
      en: `${enDate.from.month} ${enDate.from.date}-${enDate.to.date}`,
      days: `${
        parseInt(mnDate.to.date ? mnDate.to.date : '0') -
        parseInt(mnDate.from.date ? mnDate.from.date : '0') +
        1
      }`,
    };
  } else {
    displayDate = {
      mn: `${mnDate.from.month}.${mnDate.from.date}-${mnDate.to.month}.${mnDate.to.date}`,
      en: `${enDate.from.month} ${enDate.from.date}-${enDate.to.month} ${enDate.to.date}`,
      days: `${
        parseInt(mnDate.to.date ? mnDate.to.date : '0') -
        parseInt(mnDate.from.date ? mnDate.from.date : '0') +
        1
      }`,
    };
  }
  return (
    <div className='flex w-full flex-col rounded-t-[30px] bg-white px-[16px] shadow-[0px_0px_12px_2px_rgb(0,0,0,0.25)] sm:px-[32px]'>
      {cart && cart.length > 0 ? (
        <div
          className={` flex-col justify-between gap-[4px]  ${
            cart && cart.length < 1
              ? 'border-b border-b-black/[.15] pt-[16px]'
              : ' pt-[8px]'
          }`}
        >
          {cart &&
            cart.map((index, i) => (
              <div
                key={i}
                className={`flex min-h-[45px] w-full items-center justify-between gap-[10px] pb-[8px] text-primary-blue ${
                  cart && cart.length >= 1
                    ? 'border-b border-b-black/[.15] pt-[6px]'
                    : ''
                }`}
              >
                <div className='flex w-full flex-col justify-between gap-[8px] font-medium'>
                  <div className='flex w-full items-end justify-between'>
                    <h3 className='text-[20px] leading-[20px] text-main-text'>
                      {cart && index
                        ? allRooms.filter(
                            (room) => room.id === parseInt(index.split('$')[0]),
                          )[0].name
                        : null}
                    </h3>
                    <p className='flex gap-[4px] text-[16px] leading-[16px] text-sub-text/75'>
                      {cart.length > 1
                        ? `${allRooms
                            .filter(
                              (room) =>
                                room.id === parseInt(index.split('$')[0]),
                            )[0]
                            .priceDayUse.toLocaleString()}${
                            lang === 'en' ? '$' : '₮'
                          }`
                        : ''}
                      <span>x{index.split('$')[1]}</span>
                    </p>
                  </div>

                  {cart.length < 2 ? (
                    <div className='flex w-full items-end justify-between text-[16px] leading-[16px] text-sub-text/75'>
                      <p>
                        {
                          allRooms.filter(
                            (room) => room.id === parseInt(index.split('$')[0]),
                          )[0].occupancy
                        }{' '}
                        {lang === 'en' ? 'people' : 'хүн'}
                      </p>
                      <p>
                        {allRooms
                          .filter(
                            (room) => room.id === parseInt(index.split('$')[0]),
                          )[0]
                          .priceDayUse.toLocaleString()}{' '}
                        {lang === 'en' ? '$' : '₮'}
                      </p>
                    </div>
                  ) : null}
                </div>
                <div
                  className='flex h-[36px] w-[36px] items-center justify-center'
                  onClick={() => {
                    router.replace(
                      `/hotel/?${createQueryString(
                        'cart',
                        cart.indexOf(index),
                      )}`,
                      { scroll: false },
                    );
                  }}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={2}
                    stroke='currentColor'
                    className='max-h-[24px] min-h-[24px] min-w-[24px] max-w-[24px]'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </div>
              </div>
            ))}
        </div>
      ) : null}
      <div
        className={` flex min-h-[90px] w-full items-center justify-between gap-[2px]`}
      >
        {/* date & price */}
        <div className='flex flex-col justify-between gap-[8px]'>
          <p className='text-[12px] font-medium leading-[13px] text-sub-text/75 2xs:text-[14px] 2xs:leading-[15px] 2xs:tracking-wide'>
            {lang === 'en'
              ? `${displayDate.en} (${days ? days : 1} days)`
              : `${displayDate.mn} (${days ? days : 1} хоног)`}
          </p>
          <h3 className='text-[20px] font-medium leading-[20px] text-main-text 2xs:text-[24px] 2xs:leading-[24px] 2xs:tracking-wide'>
            {cart && cart.length > 0
              ? (totalPrice * parseInt(`${days ? days : 1}`)).toLocaleString()
              : (
                  roomPrices[0] * parseInt(`${days ? days : 1}`)
                ).toLocaleString()}{' '}
            {lang === 'en' ? '$' : '₮'}
          </h3>
        </div>
        {/* orderBtn */}
        {cart.length < 1 ? (
          <div
            onClick={() => handleScrollToRooms('rooms')}
            className='rounded-full bg-main-online px-[18px] py-[12px] text-[18px] font-medium uppercase leading-[18px] text-white 2xs:px-[20px] 2xs:py-[14px] 2xs:text-[20px] 2xs:leading-[20px]'
          >
            {lang === 'en' ? 'Order' : 'Захиалах'}
          </div>
        ) : (
          <Link
            href={{
              query: {
                slug: slug,
                checkIn: checkIn,
                checkOut: checkOut,
                days: days,
                cart: cart,
              },
              pathname: '/reservation',
            }}
            target='_blank'
            className='rounded-full bg-main-online px-[18px] py-[12px] text-[18px] font-medium uppercase leading-[18px] text-white 2xs:px-[20px] 2xs:py-[14px] 2xs:text-[20px] 2xs:leading-[20px]'
          >
            {lang === 'en' ? 'Order' : 'Захиалах'}
          </Link>
        )}
        {/* <div
          onClick={() => {
            if (!cart || cart.length === 0) {
              handleScrollToRooms('rooms');
            } else {
              handleOrder();
            }
          }}
          className={`rounded-full bg-main-online px-[18px] py-[12px]  ${
            orderLoading === true
              ? 'text-[12px]'
              : 'text-[18px] 2xs:text-[20px]'
          } font-medium uppercase leading-[18px] text-white 2xs:px-[20px] 2xs:py-[14px]  2xs:leading-[20px]`}
        >
          {orderLoading === true
            ? `${lang === 'en' ? 'Loading...' : 'Уншиж байна...'}`
            : `${lang === 'en' ? 'Order' : 'Захиалах'}`}
        </div> */}
      </div>
    </div>
  );
}
