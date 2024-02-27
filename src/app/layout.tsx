import '~/styles/globals.css';
import 'react-toastify/dist/ReactToastify.min.css';

import { Inter } from 'next/font/google';
import { FC, PropsWithChildren } from 'react';
import AuthProvider from '~/app/components/AuthProvider';
import { Topnav } from '~/app/components/Layout/Topnav';
import { Footer } from '~/app/components/Layout/Footer';
import { NotificationProvider } from '~/app/components/Toast/NotificationProvider';
import PageLayout from '~/app/components/Layout/PageLayout';

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
    <head>

      <title>Sandglass.it - Reliable Website Uptime Tracker</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <meta name="description" content="The reliable website uptime tracker. Keep track of
      when your website, SaaS or Service is online and get alerted when not!"/>
    </head>
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
          <PageLayout>

            {children}
          </PageLayout>
          <Footer/>
        </div>
      </Providers>
    </HTML>
  )
}
