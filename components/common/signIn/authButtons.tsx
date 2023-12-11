'use client';

import Image from 'next/image';
import { signIn } from 'next-auth/react';

export function GoogleSignInButton() {
  const handleClick = () => {
    signIn('google');
  };

  return (
    <button
      onClick={handleClick}
      onKeyDown={(e) => e.preventDefault()}
      className='group relative flex h-[50px] w-[125px] cursor-pointer items-center justify-center gap-[4px] rounded-[8px] bg-white shadow-[0_3px_10px_rgb(0,0,0,0.25)]'
    >
      <Image
        src='/images/googleLogo.png'
        alt='/hotel'
        width={100}
        height={100}
        loading='lazy'
        sizes='50vw'
        className='h-[70%] w-auto select-none object-cover duration-500 group-hover:scale-110'
        draggable={false}
      />
    </button>
  );
}

export function FacebookSignInButton() {
  const handleClick = () => {
    signIn('facebook');
  };

  return (
    <button
      onClick={handleClick}
      onKeyDown={(e)=>e.preventDefault()}
      className='group relative flex h-[50px] w-[125px] cursor-pointer items-center justify-center gap-[4px] rounded-[8px] bg-white shadow-[0_3px_10px_rgb(0,0,0,0.25)]'
    >
      <Image
        src='/images/facebookLogo.png'
        alt='/hotel'
        width={100}
        height={100}
        loading='lazy'
        sizes='50vw'
        className='h-[70%] w-auto select-none object-cover duration-500 group-hover:scale-110'
        draggable={false}
      />
    </button>
  );
}

export function CredentialsSignInButton() {
  const handleClick = () => {
    signIn();
  };

  return (
    <button
      onClick={handleClick}
      className='focus:shadow-outline mt-4 flex h-14 w-full items-center justify-center rounded-lg border-2 border-black bg-white px-6 text-xl font-semibold text-black transition-colors duration-300 hover:bg-slate-200'
    >
      {/* <Image src={githubLogo} alt="Github Logo" width={20} height={20} /> */}
      <span className='ml-4'>Continue with Email</span>
    </button>
  );
}
