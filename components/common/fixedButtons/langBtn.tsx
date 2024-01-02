import Image from 'next/image';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export default function LangBtn() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const lang = searchParams.get('lang');
  const router = useRouter();

  const createQueryString = (name: string, value: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (value !== null) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    return params.toString();
  };

  return (
    <div
      onClick={() => {
        const nextLang = lang === 'en' ? 'mn' : 'en';
        router.push(`${pathname}?${createQueryString('lang', nextLang)}`, {
          scroll: false,
        });
      }}
      className='flex h-[40px] w-[40px] items-center justify-center rounded-full border-2 border-white bg-primary-blue'
    >
      <Image
        src={
          lang === 'en' ? '/images/mongolian-flag.png' : '/images/uk-flag.png'
        }
        alt='/lang'
        width={28}
        height={28}
        sizes='10vw'
        className='h-[30px] w-[30px] cursor-pointer object-contain'
      />
    </div>
  );
}
