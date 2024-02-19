import '~/styles/globals.css';

import { Inter } from 'next/font/google';
import { FC, PropsWithChildren } from 'react';
import { Topnav } from '~/app/topnav';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata = {
  title: 'Sandglass - Track Uptime of your assets',
  description: 'by Tristan Döhl',
  icons: [{rel: 'icon', url: '/favicon.ico'}],
};


const HTML: FC<PropsWithChildren> = ({children}) => {
  return (
    <html lang="en">
    <body className={`font-sans ${inter.variable}`}>{children}</body>
    </html>
  );
}


export default function RootLayout({children}: { children: React.ReactNode; }) {
  return (
    <HTML>
      <div className={'bg-gradient-to-b from-bggrad1 via-bggrad2 to-bggrad3 relative'}>
        <Topnav/>
        <div className={'grid grid-cols-mainlayout gap-0 min-h-screen w-4/5 max-w-screen-xl mx-auto'}>
          <div>{/* leftnav */}</div>
          <div className={"min-h-screen rounded-lg bg-gray-200 mt-5 p-5"}>
            {children}
          </div>
          <div>{/* leftnav */}</div>
        </div>
      </div>
    </HTML>
  )
}
