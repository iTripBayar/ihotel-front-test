import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';

export default function BankOptions() {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');
  const router = useRouter();

  const sampleBanks = [
    {
      id: 1,
      international: false,
      name: 'Хаан банк',
      nameEn: 'Khaan bank',
      account: '5111449137',
      image: '/khaan-logo.png',
    },
    {
      id: 2,
      international: true,
      name: 'Голомт банк',
      nameEn: 'Golomt bank',
      account: '1415100268',
      image: '/golomt-logo.png',
    },
    {
      id: 3,
      international: false,
      name: 'TDB банк',
      nameEn: 'TDB bank',
      account: '470021901',
      image: '/tdb-logo.png',
    },
    {
      id: 4,
      international: true,
      name: 'Капитрон банк',
      nameEn: 'Kapitron bank',
      account: '3011012058',
      image: '/kapitron_logo.png',
    },
  ];

  const handleCopyClick = async (e: string) => {
    try {
      await navigator.clipboard.writeText(e);
    } catch (err) {
      console.error('Unable to copy text to clipboard.', err);
    }
  };

  return (
    <div className='flex flex-col items-center gap-[24px] py-[32px] pb-[50px] text-main-text'>
      <h3 className='text-[16px] font-bold uppercase'>
        {lang === 'en' ? 'Bank transfer' : 'Дансаар шилжүүлэх'}
      </h3>
      <div className='flex min-w-[300px] flex-col items-center justify-start gap-[20px] rounded-[8px] border border-black/50 px-[16px] py-[16px] shadow-[0px_0px_12px_2px_rgb(255,255,255,0.1)] 2xs:min-w-[340px] 2xs:px-[24px] sm:min-w-[400px] md:min-w-[450px]'>
        {/* bank info */}
        <div className='flex w-full flex-col items-start justify-start gap-[20px] text-[16px] leading-[16px]'>
          <div className='flex gap-[12px]'>
            <p className='opacity-60'>
              {lang === 'en' ? 'Account name:' : 'Дансны нэр:'}
            </p>
            <span className='font-medium'>{`Айхотел ХХК`}</span>
          </div>
          <div className='flex gap-[12px]'>
            <p className='opacity-60'>
              {lang === 'en' ? 'Currency:' : 'Валют:'}
            </p>
            <span className='font-medium uppercase'>
              {lang === 'en' ? 'DOLLAR' : 'MNT'}
            </span>
          </div>
          <div className='flex gap-[12px]'>
            <p className='opacity-60'>
              {lang === 'en' ? 'Remark:' : 'Гүйлгээний утга:'}
            </p>

            <span className='font-medium'>{`RN-11282`}</span>
          </div>
          <div className='flex w-full flex-col gap-[12px]'>
            {sampleBanks
              .filter((index) =>
                lang === 'en' ? index.international === true : index,
              )
              .map((index, i) => (
                <div
                  className='flex items-center justify-between w-full'
                  key={i}
                >
                  <div className='flex items-center justify-start gap-[16px]'>
                    {/* img */}
                    <div className='relative h-[40px] w-[40px] overflow-hidden'>
                      <Image
                        src={index.image}
                        alt='/hotel'
                        fill={true}
                        sizes='50vw'
                        quality={100}
                        className='absolute object-cover w-auto h-auto select-none'
                        draggable={false}
                      />
                    </div>
                    {/* account info */}
                    <div className='flex h-full flex-col items-start justify-between gap-[6px]'>
                      <p className='font-medium'>
                        {lang === 'en' ? index.nameEn : index.name}
                      </p>
                      <p>{index.account}</p>
                    </div>
                  </div>
                  {/* copy button */}
                  <button
                    className='flex h-[40px] w-[80px] items-center justify-center rounded-[8px] border border-black/[.3]  font-medium hover:border-white hover:bg-payment-black/25 bg-payment-black/[.05]'
                    onClick={() => handleCopyClick(index.account)}
                  >
                    {lang === 'en' ? 'Copy' : 'Хуулах'}
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
      <button
        className='pt-[12px] font-medium leading-[20px] text-primary-blue'
        onClick={() => router.back()}
      >
        {lang === 'en' ? 'Back' : 'Буцах'}
      </button>
    </div>
  );
}
