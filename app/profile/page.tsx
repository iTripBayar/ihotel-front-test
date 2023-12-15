'use client';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
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
      <button
        onClick={() => signOut({ callbackUrl: 'http://localhost:3000/' })}
      >
        Sign Out
      </button>
    </div>
  );
}
