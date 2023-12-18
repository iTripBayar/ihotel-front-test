'use client';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { fetchUserData } from '@/utils';
import { useRequest } from 'ahooks';
import { useCookies } from 'react-cookie';
export default function ProfilePage() {
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/');
    },
  });
  const {data: userData} = useRequest(()=>{
    return fetchUserData({ email: 'orgil@ihotel.mn', password: 'Wave920110@' });
  })
  console.log(userData);
  return (
    <div>
      <Link href={{pathname: '/'}}>Go to HomePage</Link>
      {session?.user ? `Welcome ${session.user.name}!` : 'Profile Page'}
      <button
        onClick={() =>  {
          removeCookie('accessToken');
          signOut({ callbackUrl: 'http://localhost:3000/' })
        }}
      >
        Sign Out
      </button>
    </div>
  );
}
