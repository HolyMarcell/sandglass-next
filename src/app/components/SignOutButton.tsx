'use client'
import { signOut } from 'next-auth/react';

export function SignOutButton () {

  const so = () => {
    void signOut();
  }

  return (
    <div>
      <button onClick={so}>Sign out</button>
    </div>
  )
}
