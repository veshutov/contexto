import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://1context.ru'),
  title: "Один контекст",
  description: "Сможете ли вы угадать секретное слово, загаданное с помощью искусственного интеллекта? После каждой попытке будет видно, насколько вы близки к ответу.",
  keywords: ['Один контекст', 'Контексто', 'Контекстно', 'Contexto'],
  icons: {
    icon: [
      {
        url: '/icon-32x32.png',
        href: '/icon-32x32.png',
        type: 'image/png',
      },
    ],
  },
  openGraph: {
    title: 'Один контекст',
    siteName: '1context.ru',
    description:
      'Сможете ли вы угадать секретное слово, загаданное с помощью искусственного интеллекта? После каждой попытке будет видно, насколько вы близки к ответу.',
    url: 'https://1context.ru',
    type: 'website',
    locale: 'ru_RU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Один контекст',
    site: '1context.ru',
    description:
      'Сможете ли вы угадать секретное слово, загаданное с помощью искусственного интеллекта? После каждой попытке будет видно, насколько вы близки к ответу.',
  },
  alternates: {
    canonical: 'https://1context.ru',
  },
}

const YANDEX_METRICA = `\
    (function(m,e,t,r,i,k,a){
        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
    })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=103578696', 'ym');

    ym(103578696, 'init', {ssr:true, clickmap:true, ecommerce:"dataLayer", accurateTrackBounce:true, trackLinks:true});
`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{ __html: YANDEX_METRICA }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <noscript>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://mc.yandex.ru/watch/103578696"
              style={{ position: 'absolute', left: '-9999px' }}
              alt=""
            />
          </div>
        </noscript>
        {children}
      </body>
    </html>
  );
}
