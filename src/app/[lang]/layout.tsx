import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import Link from 'next/link';
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
        
        {/* Global Business Location Map & CTA Section */}
        <section style={{ backgroundColor: '#0F1B24', color: '#FFFFFF', padding: '80px 20px', borderTop: '4px solid var(--cio-orange)' }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'center' }}>
            {/* Left Corner: CTA and Button to Call */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <span style={{ color: 'var(--cio-orange)', fontSize: '14px', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                📍 VISIT OUR HEADQUARTERS
              </span>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 38px)', fontWeight: 800, lineHeight: 1.2, color: '#FFFFFF' }}>
                Global Logistics Hub — Yerevan, Armenia
              </h2>
              <p style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6 }}>
                Our central operations coordinate multimodal transit corridors across Eurasia, China, Europe, and the CIS. Need urgent freight calculations or custom route consultation? Speak directly with our dispatch team.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '20px', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.1)', marginTop: '8px' }}>
                <div style={{ fontSize: '15px', color: '#FFFFFF' }}>
                  <strong>🏢 Office:</strong> 22a Nairi Zaryan St, Yerevan 0051
                </div>
                <div style={{ fontSize: '15px', color: '#FFFFFF' }}>
                  <strong>⏰ Hours:</strong> Mon - Sat: 09:00 - 19:00
                </div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '12px' }}>
                <a href="tel:+37491123456" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '16px', fontWeight: 700 }}>
                  📞 Call Dispatch Now
                </a>
                <Link href={`/${lang}/quote`} className="btn btn-white" style={{ padding: '16px 32px', fontSize: '16px', fontWeight: 700 }}>
                  Get Instant Quote →
                </Link>
              </div>
            </div>

            {/* Right Corner: Image Map / Google Map iframe */}
            <div style={{ width: '100%', height: '420px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', border: '2px solid rgba(255,255,255,0.1)' }}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3047.219596935988!2d44.5092557!3d40.204177900000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406abd420a039281%3A0xa17a4f7686410de4!2sCio%20Logistics%20LLC!5e0!3m2!1sen!2sam!4v1779715705039!5m2!1sen!2sam" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }}
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </section>

        <Footer lang={lang} dict={dict} />
        <StickyCTA lang={lang} dict={dict} />
      </body>
    </html>
  );
}
