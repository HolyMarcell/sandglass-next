'use client'

import { SessionProvider } from 'next-auth/react';
import { FWC } from '~/types';

export default function AuthProvider({children}: FWC) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}
