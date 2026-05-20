import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import '../globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import StickyCTA from '@/components/StickyCTA/StickyCTA';
import { getDictionary } from '@/lib/dictionary';

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-montserrat',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export async function generateMetadata(
  props: { params: Promise<{ lang: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const rawLang = params.lang || 'en';
  const lang = (rawLang === 'ru' || rawLang === 'hy' ? rawLang : 'en') as 'en' | 'ru' | 'hy';
  
  const siteUrl = 'https://ciologistics.com';
  const path = ''; // home page path helper if needed
  
  return {
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `${siteUrl}/${lang}`,
      languages: {
        en: `${siteUrl}/en`,
        ru: `${siteUrl}/ru`,
        hy: `${siteUrl}/hy`,
        'x-default': siteUrl,
      },
    },
  };
}

export default async function LocalizedLayout(props: LayoutProps) {
  const params = await props.params;
  const children = props.children;
  const rawLang = params.lang || 'en';
  const lang = (rawLang === 'ru' || rawLang === 'hy' ? rawLang : 'en') as 'en' | 'ru' | 'hy';
  const dict = await getDictionary(lang);

  return (
    <html
      lang={lang}
      className={`${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-gray-800">
        <Header lang={lang} dict={dict} />
        <main className="flex-1">
          {children}
        </main>
        <Footer lang={lang} dict={dict} />
        <StickyCTA lang={lang} dict={dict} />
      </body>
    </html>
  );
}
