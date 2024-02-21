import '~/styles/globals.css';
import 'react-toastify/dist/ReactToastify.min.css';

import { Inter } from 'next/font/google';
import { FC, PropsWithChildren } from 'react';
import AuthProvider from '~/app/components/AuthProvider';
import { Topnav } from '~/app/components/Topnav';
import { Footer } from '~/app/components/Footer';
import { NotificationProvider } from '~/app/components/Toast/NotificationProvider';

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

const Providers: FC<PropsWithChildren> = ({children}) => {
  return (
    <NotificationProvider>

      <AuthProvider>
        {children}
      </AuthProvider>
    </NotificationProvider>
  )
}


export default function RootLayout({children}: { children: React.ReactNode; }) {
  return (
    <HTML>
      <Providers>
        <div className={'bg-gradient-to-b from-bggrad1 via-bggrad2 to-bggrad3 relative min-h-screen'}>
          <Topnav/>
          <div className={'grid grid-cols-mainlayout gap-0 w-4/5 max-w-screen-xl mx-auto min-h-[calc(100vh-178px)]'}>
            <div>{/* leftnav */}</div>
            <div className={'min-h-48 rounded-lg bg-gray-200 mt-5 p-5'}>
              {children}
            </div>
            <div>{/* leftnav */}</div>
          </div>
          <Footer/>
        </div>
      </Providers>
    </HTML>
  )
}
