'use client';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
export default function ProfilePage() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/');
    },
  });
  console.log(session);
  return (
    <div>
      {session?.user ? `Welcome ${session.user.name}!` : 'Profile Page'}

      <Link href='/api/auth/signout'>Sign Out</Link>
    </div>
  );
}
