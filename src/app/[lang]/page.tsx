import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getDictionary } from '@/lib/dictionary';
import InteractiveMap from '@/components/InteractiveMap/InteractiveMap';
import TrackingWidget from '@/components/TrackingWidget/TrackingWidget';
import Calculator from '@/components/Calculator/Calculator';
import Partners from '@/components/Partners/Partners';
import { 
  AlertTriangle, HelpCircle, ShieldCheck, Star, Users, Phone, 
  ArrowUpRight, FileText, CheckCircle2, ChevronRight,
  Plane, Ship, Truck, Train, Package, Weight
} from 'lucide-react';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const rawLang = params.lang || 'en';
  const lang = (rawLang === 'ru' || rawLang === 'hy' ? rawLang : 'en') as 'en' | 'ru' | 'hy';
  
  const titles = {
    en: "International Freight Forwarding & Logistics - CIO Logistics",
    ru: "Международные грузоперевозки и логистика - CIO Logistics",
    hy: "Միջազգային բեռնափոխադրումներ և լոգիստիկա - CIO Logistics",
  };

  const descriptions = {
    en: "Reliable international freight forwarding services from Armenia. Air, sea, rail, road transport, customs clearance, and warehousing. member of FIATA, IATA.",
    ru: "Надежные международные грузоперевозки из Армении. Авиа, море, ж/д, автоперевозки, таможенное оформление и склады. Член FIATA, IATA.",
    hy: "Հուսալի միջազգային բեռնափոխադրումներ Հայաստանից: Օդային, ծովային, երկաթուղային, ավտոմոբիլային փոխադրումներ, մաքսազերծում: FIATA, IATA անդամ:",
  };

  return {
    title: titles[lang],
    description: descriptions[lang],
    openGraph: {
      title: titles[lang],
      description: descriptions[lang],
      type: 'website',
      url: `https://ciologistics.com/${lang}`,
    },
  };
}

export default async function LocalizedHomePage(props: PageProps) {
  const params = await props.params;
  const rawLang = params.lang || 'en';
  const lang = (rawLang === 'ru' || rawLang === 'hy' ? rawLang : 'en') as 'en' | 'ru' | 'hy';
  const dict = await getDictionary(lang);

  // SEO Organization & FAQ JSON-LD Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://ciologistics.com/#organization",
        "name": "CIO Logistics",
        "url": "https://ciologistics.com",
        "logo": "https://ciologistics.com/logo.png",
        "sameAs": [
          "https://www.facebook.com/ciologisticsworldwide/",
          "https://www.instagram.com/CioLogistics/",
          "https://www.linkedin.com/company/cio-logistics/",
          "https://www.youtube.com/@CIOLogistics"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+374-95-211-121",
          "contactType": "customer service",
          "areaServed": "AM",
          "availableLanguage": ["en", "ru", "hy"]
        }
      },
      {
        "@type": "FAQPage",
        "@id": `https://ciologistics.com/${lang}/#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": dict.faqs.q1,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": dict.faqs.a1
            }
          },
          {
            "@type": "Question",
            "name": dict.faqs.q2,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": dict.faqs.a2
            }
          },
          {
            "@type": "Question",
            "name": dict.faqs.q3,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": dict.faqs.a3
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      {/* Inject JSON-LD Schema */}
      <script
        type="application/ld-json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section 
        className="section section-navy" 
        style={{ 
          overflow: 'hidden', 
          padding: '90px 0 72px',
          backgroundImage: 'linear-gradient(rgba(15, 27, 36, 0.88), rgba(15, 27, 36, 0.82)), url("https://ciologistics.com/wp-content/uploads/2024/03/%D6%85%D5%A4%D5%A1%D5%B5%D5%AB%D5%B6-min.webp")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative'
        }}
      >
        {/* Background glow overlay */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          right: '-10%',
          width: '50vw',
          height: '50vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(236, 28, 40, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '44px', alignItems: 'center' }}>
          {/* Hero Left Content */}
          <div className="animate-fade-in-up">
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <span className="badge" style={{ background: 'rgba(255,255,255,0.06)', color: '#fff', fontSize: '12px' }}>
                {dict.hero.badgeIso}
              </span>
              <span className="badge" style={{ background: 'rgba(255,255,255,0.06)', color: '#fff', fontSize: '12px' }}>
                {dict.hero.badgeFiata}
              </span>
              <span className="badge" style={{ background: 'rgba(255,255,255,0.06)', color: '#fff', fontSize: '12px' }}>
                {dict.hero.badgeIata}
              </span>
              <span className="badge" style={{ background: 'rgba(255,255,255,0.06)', color: '#fff', fontSize: '12px' }}>
                {dict.hero.badgeIru}
              </span>
            </div>
            
            <h1 style={{ color: '#ffffff', marginBottom: '16px', fontSize: 'clamp(2.1rem, 4.2vw, 3.4rem)', lineHeight: '1.15', fontWeight: 800, letterSpacing: '-0.025em' }}>
              {dict.hero.title} <span style={{ color: 'var(--cio-orange)' }}>{dict.hero.titleAccent}</span>
            </h1>
            
            <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.75)', marginBottom: '24px', lineHeight: '1.6' }}>
              {dict.hero.description}
            </p>
            
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '32px' }}>
              <Link href={`/${lang}/quote`} className="btn btn-primary">
                {dict.hero.getQuote}
              </Link>
              <Link href={`/${lang}/#track`} className="btn btn-ghost">
                {dict.hero.trackShipment}
              </Link>
            </div>
            
            <div>
              <span style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '16px' }}>
                {dict.hero.trustedBy}
              </span>
              <div style={{ display: 'flex', gap: '32px', alignItems: 'center', opacity: '0.6', flexWrap: 'wrap' }}>
                <span style={{ fontWeight: 800, fontSize: '18px', letterSpacing: '0.5px' }}>Armenian Brands</span>
                <span style={{ fontWeight: 800, fontSize: '18px', letterSpacing: '0.5px' }}>CIS Global</span>
                <span style={{ fontWeight: 800, fontSize: '18px', letterSpacing: '0.5px' }}>Europe-Trans</span>
              </div>
            </div>
          </div>
          
          {/* Hero Right Widget - Quote Calculator */}
          <div className="animate-fade-in-up" style={{ animationDelay: '150ms', maxWidth: '371px', width: '100%', marginLeft: 'auto' }}>
            <Calculator lang={lang} dict={dict} />
          </div>
        </div>
      </section>

      {/* Live rates & Quick Tools strip */}
      <section className="section-tight" style={{ borderBottom: 'none', background: 'var(--cio-orange)', color: '#fff' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <strong style={{ color: '#fff' }}>{dict.quickTools.liveRates}: </strong>
            <span style={{ color: '#fff', fontWeight: 700 }}>{dict.quickTools.ratesValue}</span>
          </div>
          <div>
            <Link href={`/${lang}/contact`} className="btn" style={{ background: '#fff', color: 'var(--cio-orange)', padding: '8px 16px', fontSize: '13px', border: 'none' }}>
              {dict.quickTools.talkToExpert}
            </Link>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <Partners dict={dict} />

      {/* Services Section */}
      <section className="section section-gray" id="services">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{dict.services.eyebrow}</span>
            <h2>{dict.services.title}</h2>
            <p>{dict.services.desc}</p>
          </div>

          <div className="grid-3-cols">
            {/* Air Freight Card */}
            <div className="transition-all-custom" style={{ display: 'flex', flexDirection: 'column', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--bg-white)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
              <div style={{ height: '180px', width: '100%', position: 'relative', overflow: 'hidden' }}>
                <img src="https://ciologistics.com/wp-content/uploads/2024/03/%D6%85%D5%A4%D5%A1%D5%B5%D5%AB%D5%B6-min.webp" alt={dict.services.air} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '16px', left: '16px', width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.95)', color: 'var(--cio-orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-sm)' }}>
                  <Plane size={24} />
                </div>
              </div>
              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px' }}>{dict.services.air}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '20px', lineHeight: '1.5' }}>{dict.services.airDesc}</p>
                </div>
                <Link href={`/${lang}/services/air-freight`} style={{ fontSize: '13px', fontWeight: 700, color: 'var(--cio-orange)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Learn more <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>

            {/* Sea Freight Card */}
            <div className="transition-all-custom" style={{ display: 'flex', flexDirection: 'column', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--bg-white)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
              <div style={{ height: '180px', width: '100%', position: 'relative', overflow: 'hidden' }}>
                <img src="https://ciologistics.com/wp-content/uploads/2024/03/%D5%AE%D5%B8%D5%BE%D5%A1%D5%B5%D5%AB%D5%B6-min.webp" alt={dict.services.sea} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '16px', left: '16px', width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.95)', color: 'var(--cio-orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-sm)' }}>
                  <Ship size={24} />
                </div>
              </div>
              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px' }}>{dict.services.sea}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '20px', lineHeight: '1.5' }}>{dict.services.seaDesc}</p>
                </div>
                <Link href={`/${lang}/services/sea-freight`} style={{ fontSize: '13px', fontWeight: 700, color: 'var(--cio-orange)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Learn more <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>

            {/* Road Freight Card */}
            <div className="transition-all-custom" style={{ display: 'flex', flexDirection: 'column', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--bg-white)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
              <div style={{ height: '180px', width: '100%', position: 'relative', overflow: 'hidden' }}>
                <img src="https://ciologistics.com/wp-content/uploads/2024/03/%D6%81%D5%A1%D5%B4%D5%A1%D6%84%D5%A1%D5%B5%D5%AB%D5%B6-min.webp" alt={dict.services.road} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '16px', left: '16px', width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.95)', color: 'var(--cio-orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-sm)' }}>
                  <Truck size={24} />
                </div>
              </div>
              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px' }}>{dict.services.road}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '20px', lineHeight: '1.5' }}>{dict.services.roadDesc}</p>
                </div>
                <Link href={`/${lang}/services/road-transport`} style={{ fontSize: '13px', fontWeight: 700, color: 'var(--cio-orange)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Learn more <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>

            {/* Container/Rail Freight Card */}
            <div className="transition-all-custom" style={{ display: 'flex', flexDirection: 'column', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--bg-white)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
              <div style={{ height: '180px', width: '100%', position: 'relative', overflow: 'hidden' }}>
                <img src="https://ciologistics.com/wp-content/uploads/2024/03/%D5%AF%D5%B8%D5%B6%D5%BF%D5%A5%D5%B6%D5%B5%D5%A5%D6%80%D5%A1%D5%B5%D5%AB%D5%B6-min-1.webp" alt={dict.services.rail} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '16px', left: '16px', width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.95)', color: 'var(--cio-orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-sm)' }}>
                  <Train size={24} />
                </div>
              </div>
              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px' }}>{dict.services.rail}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '20px', lineHeight: '1.5' }}>{dict.services.railDesc}</p>
                </div>
                <Link href={`/${lang}/services/rail-freight`} style={{ fontSize: '13px', fontWeight: 700, color: 'var(--cio-orange)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Learn more <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>

            {/* Groupage Card */}
            <div className="transition-all-custom" style={{ display: 'flex', flexDirection: 'column', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--bg-white)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
              <div style={{ height: '180px', width: '100%', position: 'relative', overflow: 'hidden' }}>
                <img src="https://ciologistics.com/wp-content/uploads/elementor/thumbs/upakovka-gruza-dlya-perevozki-e1712013843901-qm3bb6b6o3gloim4yhenmtwhaxwqglorrmusnixxss.webp" alt={dict.services.groupage} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '16px', left: '16px', width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.95)', color: 'var(--cio-orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-sm)' }}>
                  <Package size={24} />
                </div>
              </div>
              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px' }}>{dict.services.groupage}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '20px', lineHeight: '1.5' }}>{dict.services.groupageDesc}</p>
                </div>
                <Link href={`/${lang}/services/groupage-cargo`} style={{ fontSize: '13px', fontWeight: 700, color: 'var(--cio-orange)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Learn more <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>

            {/* Heavy & Bulky Card */}
            <div className="transition-all-custom" style={{ display: 'flex', flexDirection: 'column', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--bg-white)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
              <div style={{ height: '180px', width: '100%', position: 'relative', overflow: 'hidden' }}>
                <img src="https://ciologistics.com/wp-content/uploads/2024/03/%D5%A3%D5%A5%D6%80%D5%AE%D5%A1%D5%BE%D5%A1%D5%AC%D5%A1%D5%B5%D5%AB%D5%B6-min-1.webp" alt={dict.services.heavy} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '16px', left: '16px', width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.95)', color: 'var(--cio-orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-sm)' }}>
                  <Weight size={24} />
                </div>
              </div>
              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px' }}>{dict.services.heavy}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '20px', lineHeight: '1.5' }}>{dict.services.heavyDesc}</p>
                </div>
                <Link href={`/${lang}/services/heavy-bulky-cargo`} style={{ fontSize: '13px', fontWeight: 700, color: 'var(--cio-orange)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Learn more <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link href={`/${lang}/services`} className="btn btn-secondary">
              {dict.services.seeAll}
            </Link>
          </div>
        </div>
      </section>

      {/* Shipment Tracking Widget section */}
      <section className="section" id="track" style={{ padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="section-head" style={{ marginBottom: '40px' }}>
            <span className="eyebrow">{dict.quickTools.trackShipment}</span>
            <h2>Real-time Cargo Tracking</h2>
            <p>Enter your tracking identifier below to check current transit steps.</p>
          </div>
          <TrackingWidget lang={lang} dict={dict} />
        </div>
      </section>

      {/* Metrics Dashboard */}
      <section className="section section-navy" id="metrics">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{dict.metrics.eyebrow}</span>
            <h2>{dict.metrics.title}</h2>
            <p>{dict.metrics.desc}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px', textAlign: 'center' }}>
            <div style={{ padding: '40px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '56px', fontWeight: 800, color: 'var(--cio-orange)', lineHeight: 1, marginBottom: '12px' }}>
                {dict.metrics.tons}
              </div>
              <div style={{ fontSize: '15px', color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>
                {dict.metrics.tonsLabel}
              </div>
            </div>

            <div style={{ padding: '40px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '56px', fontWeight: 800, color: 'var(--cio-orange)', lineHeight: 1, marginBottom: '12px' }}>
                {dict.metrics.years}
              </div>
              <div style={{ fontSize: '15px', color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>
                {dict.metrics.yearsLabel}
              </div>
            </div>

            <div style={{ padding: '40px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '56px', fontWeight: 800, color: 'var(--cio-orange)', lineHeight: 1, marginBottom: '12px' }}>
                {dict.metrics.ontime}
              </div>
              <div style={{ fontSize: '15px', color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>
                {dict.metrics.ontimeLabel}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map & Routes showcase */}
      <section className="section section-gray" id="routes">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{dict.routes.eyebrow}</span>
            <h2>{dict.routes.title}</h2>
            <p>{dict.routes.desc}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '56px', alignItems: 'center' }}>
            {/* Left side Map */}
            <InteractiveMap lang={lang} dict={dict} />

            {/* Right side Route lists */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ padding: '24px', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', color: 'var(--cio-navy)' }}>
                  🇨🇳 {dict.routes.china}
                </h4>
                <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                  {dict.routes.chinaMeta}
                </div>
              </div>

              <div style={{ padding: '24px', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', color: 'var(--cio-navy)' }}>
                  🇷🇺 {dict.routes.russia}
                </h4>
                <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                  {dict.routes.russiaMeta}
                </div>
              </div>

              <div style={{ padding: '24px', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', color: 'var(--cio-navy)' }}>
                  🇩🇪 {dict.routes.germany}
                </h4>
                <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                  {dict.routes.germanyMeta}
                </div>
              </div>

              <Link href={`/${lang}/routes`} className="btn btn-secondary btn-full">
                {dict.routes.exploreAll}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Slider */}
      <section className="section section-navy" id="industries">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{dict.industries.eyebrow}</span>
            <h2>{dict.industries.title}</h2>
            <p>{dict.industries.desc}</p>
          </div>

          <div className="grid-4-cols">
            {[
              { 
                label: dict.industries.ecommerce, 
                desc: dict.industries.ecommerceDesc, 
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--cio-orange)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto' }}>
                    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8z" />
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                    <line x1="12" y1="22.08" x2="12" y2="12" />
                    <path d="M12 5.5l5 2.5-5 2.5-5-2.5 5-2.5z" opacity="0.3" fill="var(--cio-orange)" />
                    <path d="M2 10h4" opacity="0.7" />
                    <path d="M1 13h3" opacity="0.7" />
                  </svg>
                )
              },
              { 
                label: dict.industries.pharma, 
                desc: dict.industries.pharmaDesc, 
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--cio-orange)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto' }}>
                    <rect x="5" y="11" width="14" height="6" rx="3" transform="rotate(-45 12 14)" />
                    <line x1="9" y1="15" x2="15" y2="9" />
                    <path d="M12 2a9 9 0 0 0 9 9c0 5-9 11-9 11S3 16 3 11a9 9 0 0 0 9-9z" opacity="0.2" fill="var(--cio-orange)" />
                    <path d="M12 6v6M9 9h6" />
                  </svg>
                )
              },
              { 
                label: dict.industries.auto, 
                desc: dict.industries.autoDesc, 
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--cio-orange)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto' }}>
                    <path d="M2 15h3.5l1.5-3h10l1.5 3H22v3H2v-3z" />
                    <path d="M7 12l1-4h8l1 4" />
                    <circle cx="7" cy="18" r="2.5" />
                    <circle cx="17" cy="18" r="2.5" />
                    <circle cx="7" cy="18" r="1" fill="currentColor" />
                    <circle cx="17" cy="18" r="1" fill="currentColor" />
                    <path d="M12 12a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                  </svg>
                )
              },
              { 
                label: dict.industries.heavy, 
                desc: dict.industries.heavyDesc, 
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--cio-orange)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto' }}>
                    <path d="M12 2v8M12 10a2 2 0 0 0 2 2" />
                    <path d="M12 12a2 2 0 0 1-2-2" />
                    <path d="M6 14h12l2 6H4l2-6z" />
                    <rect x="9" y="12" width="6" height="2" rx="0.5" />
                    <text x="12" y="19" fontSize="6.5" fontWeight="bold" fill="var(--cio-orange)" textAnchor="middle" style={{ stroke: 'none' }}>KG</text>
                  </svg>
                )
              },
              { 
                label: dict.industries.food, 
                desc: dict.industries.foodDesc, 
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--cio-orange)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto' }}>
                    <path d="M3 17a9 9 0 0 1 18 0v1H3v-1z" />
                    <circle cx="12" cy="7" r="1.5" />
                    <line x1="2" y1="20" x2="22" y2="20" />
                    <path d="M12 13c1.5 0 2.5 1 2.5 2s-1 2-2.5 2-2.5-1-2.5-2 1-2.5 2.5-2z" opacity="0.3" fill="var(--cio-orange)" />
                    <path d="M12 13c-1.5-1.5-1.5-3.5 0-5 1.5 1.5 1.5 3.5 0 5z" />
                  </svg>
                )
              },
              { 
                label: dict.industries.chemical, 
                desc: dict.industries.chemicalDesc, 
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--cio-orange)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto' }}>
                    <path d="M6 20h12L13 7V3h-2v4L6 20z" />
                    <line x1="9" y1="3" x2="15" y2="3" />
                    <line x1="7.5" y1="16" x2="16.5" y2="16" strokeDasharray="2 1" />
                    <path d="M10 13l4 4M12 12l4 4" strokeWidth="1" opacity="0.8" />
                  </svg>
                )
              },
              { 
                label: dict.industries.construction, 
                desc: dict.industries.constructionDesc, 
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--cio-orange)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto' }}>
                    <rect x="4" y="10" width="6" height="11" rx="0.5" />
                    <rect x="12" y="6" width="8" height="15" rx="0.5" />
                    <line x1="7" y1="13" x2="7" y2="18" strokeDasharray="2 2" />
                    <line x1="15" y1="9" x2="15" y2="18" strokeDasharray="2 2" />
                    <line x1="17" y1="9" x2="17" y2="18" strokeDasharray="2 2" />
                    <path d="M3 3h16M7 3v4M19 3v8l-4-4" opacity="0.6" />
                  </svg>
                )
              },
              { 
                label: dict.industries.electronics, 
                desc: dict.industries.electronicsDesc, 
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--cio-orange)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto' }}>
                    <rect x="6" y="6" width="12" height="12" rx="1.5" />
                    <path d="M9 3v3M12 3v3M15 3v3M9 18v3M12 18v3M15 18v3M3 9h3M3 12h3M3 15h3M18 9h3M18 12h3M18 15h3" />
                    <rect x="10" y="10" width="4" height="4" rx="0.5" opacity="0.3" fill="var(--cio-orange)" />
                    <path d="M12 10v4M10 12h4" />
                  </svg>
                )
              },
            ].map((ind, idx) => (
              <div key={idx} style={{ padding: '24px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: 'var(--radius)', border: '1px solid rgba(255, 255, 255, 0.1)', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ display: 'flex', justifyContent: 'center', height: '32px', marginBottom: '16px' }}>{ind.icon}</div>
                <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '8px', color: '#fff' }}>{ind.label}</h4>
                <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.7)' }}>{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step by Step Process */}
      <section className="section" id="process">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{dict.process.eyebrow}</span>
            <h2>{dict.process.title}</h2>
            <p>{dict.process.desc}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '24px', position: 'relative' }}>
            {[
              { num: '01', title: dict.process.step1, desc: dict.process.step1Desc },
              { num: '02', title: dict.process.step2, desc: dict.process.step2Desc },
              { num: '03', title: dict.process.step3, desc: dict.process.step3Desc },
              { num: '04', title: dict.process.step4, desc: dict.process.step4Desc },
              { num: '05', title: dict.process.step5, desc: dict.process.step5Desc },
            ].map((step, idx) => (
              <div key={idx} style={{ position: 'relative' }}>
                <div style={{ fontSize: '36px', fontWeight: 800, color: 'rgba(14,42,71,0.06)', fontFamily: 'var(--font-display)', marginBottom: '8px' }}>
                  {step.num}
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px', color: 'var(--cio-navy)' }}>
                  {step.title}
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case studies with verified metrics */}
      <section className="section section-gray" id="solutions">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{dict.cases.eyebrow}</span>
            <h2>{dict.cases.title}</h2>
            <p>{dict.cases.desc}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
            {/* Case 1 */}
            <div style={{ background: 'var(--bg-white)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
              <div style={{ padding: '24px' }}>
                <span className="badge" style={{ background: 'var(--cio-navy)', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '4px 10px', marginBottom: '16px', display: 'inline-block' }}>
                  {dict.cases.case1Tag}
                </span>
                <h4 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '12px', color: 'var(--cio-navy)' }}>
                  {dict.cases.case1Title}
                </h4>
                <p style={{ fontSize: '13.5px', color: 'var(--text-body)', marginBottom: '24px' }}>
                  {dict.cases.case1Desc}
                </p>
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block' }}>{dict.cases.transitTime}</span>
                    <strong style={{ fontSize: '14px', color: 'var(--cio-orange)' }}>14 Days</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block' }}>{dict.cases.doorToDoor}</span>
                    <strong style={{ fontSize: '14px', color: 'var(--success)' }}>Yes</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Case 2 */}
            <div style={{ background: 'var(--bg-white)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
              <div style={{ padding: '24px' }}>
                <span className="badge" style={{ background: 'var(--cio-navy)', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '4px 10px', marginBottom: '16px', display: 'inline-block' }}>
                  {dict.cases.case2Tag}
                </span>
                <h4 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '12px', color: 'var(--cio-navy)' }}>
                  {dict.cases.case2Title}
                </h4>
                <p style={{ fontSize: '13.5px', color: 'var(--text-body)', marginBottom: '24px' }}>
                  {dict.cases.case2Desc}
                </p>
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block' }}>{dict.cases.tempCompliance}</span>
                    <strong style={{ fontSize: '14px', color: 'var(--success)' }}>100% GDP</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block' }}>Transit Time</span>
                    <strong style={{ fontSize: '14px', color: 'var(--cio-orange)' }}>4 Days</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Case 3 */}
            <div style={{ background: 'var(--bg-white)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
              <div style={{ padding: '24px' }}>
                <span className="badge" style={{ background: 'var(--cio-navy)', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '4px 10px', marginBottom: '16px', display: 'inline-block' }}>
                  {dict.cases.case3Tag}
                </span>
                <h4 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '12px', color: 'var(--cio-navy)' }}>
                  {dict.cases.case3Title}
                </h4>
                <p style={{ fontSize: '13.5px', color: 'var(--text-body)', marginBottom: '24px' }}>
                  {dict.cases.case3Desc}
                </p>
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block' }}>{dict.cases.shippingCost}</span>
                    <strong style={{ fontSize: '14px', color: 'var(--success)' }}>-32% vs air</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block' }}>Schedule</span>
                    <strong style={{ fontSize: '14px', color: 'var(--cio-orange)' }}>Weekly</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Reviews Block */}
      <section className="section section-navy" id="reviews">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{dict.reviews.eyebrow}</span>
            <h2>{dict.reviews.title}</h2>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '12px' }}>
              <div style={{ display: 'flex', color: 'var(--cio-orange)' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="var(--cio-orange)" />)}
              </div>
              <strong style={{ fontSize: '18px', color: '#fff' }}>{dict.reviews.score} / 5.0</strong>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>({dict.reviews.count})</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
            {[
              { text: dict.reviews.rev1, author: dict.reviews.rev1Author, src: dict.reviews.rev1Src },
              { text: dict.reviews.rev2, author: dict.reviews.rev2Author, src: dict.reviews.rev2Src },
              { text: dict.reviews.rev3, author: dict.reviews.rev3Author, src: dict.reviews.rev3Src },
            ].map((rev, idx) => (
              <div key={idx} style={{ padding: '32px', borderRadius: 'var(--radius)', border: '1px solid rgba(255, 255, 255, 0.1)', background: 'rgba(255, 255, 255, 0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: 'var(--shadow-sm)' }}>
                <p style={{ fontSize: '14.5px', fontStyle: 'italic', color: 'rgba(255, 255, 255, 0.9)', marginBottom: '24px', lineHeight: '1.6' }}>
                  &ldquo;{rev.text}&rdquo;
                </p>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '2px' }}>{rev.author}</h4>
                  <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)' }}>{rev.src}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO native Accordion FAQ grid */}
      <section className="section section-gray" id="faq">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="section-head">
            <span className="eyebrow">{dict.faqs.eyebrow}</span>
            <h2>{dict.faqs.title}</h2>
            <p>{dict.faqs.desc}</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { q: dict.faqs.q1, a: dict.faqs.a1 },
              { q: dict.faqs.q2, a: dict.faqs.a2 },
              { q: dict.faqs.q3, a: dict.faqs.a3 },
              { q: dict.faqs.q4, a: dict.faqs.a4 },
              { q: dict.faqs.q5, a: dict.faqs.a5 },
              { q: dict.faqs.q6, a: dict.faqs.a6 },
              { q: dict.faqs.q7, a: dict.faqs.a7 },
              { q: dict.faqs.q8, a: dict.faqs.a8 },
            ].map((faq, idx) => (
              <details
                key={idx}
                style={{
                  background: 'var(--bg-white)',
                  borderRadius: 'var(--radius)',
                  border: '1px solid var(--border)',
                  padding: '20px 24px',
                  cursor: 'pointer',
                }}
              >
                <summary style={{ fontWeight: 700, fontSize: '15.5px', color: 'var(--cio-navy)', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{faq.q}</span>
                  <ChevronRight size={18} style={{ transform: 'rotate(90deg)', color: 'var(--cio-orange)' }} />
                </summary>
                <p style={{ marginTop: '16px', fontSize: '14.5px', color: 'var(--text-body)', lineHeight: '1.6', cursor: 'default' }}>
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications and Compliance */}
      <section className="section" id="certifications">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{dict.certifications.eyebrow}</span>
            <h2>{dict.certifications.title}</h2>
            <p>{dict.certifications.desc}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
            {[
              { 
                title: dict.certifications.isoTitle, 
                desc: dict.certifications.isoDesc,
                icon: (
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="32" cy="32" r="30" stroke="var(--cio-orange)" strokeWidth="2" strokeDasharray="4 2" />
                    <circle cx="32" cy="32" r="26" fill="var(--cio-navy)" />
                    <text x="32" y="30" fill="#fff" fontSize="8" fontWeight="bold" textAnchor="middle">ISO 9001</text>
                    <text x="32" y="42" fill="var(--cio-orange)" fontSize="6" fontWeight="bold" textAnchor="middle">2015</text>
                  </svg>
                )
              },
              { 
                title: dict.certifications.fiataTitle, 
                desc: dict.certifications.fiataDesc,
                icon: (
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="32" cy="32" r="28" stroke="var(--cio-blue)" strokeWidth="2" />
                    <path d="M14 32 C 14 18, 50 18, 50 32 C 50 46, 14 46, 14 32 Z" stroke="var(--cio-blue)" strokeWidth="1" strokeDasharray="2 1" />
                    <line x1="32" y1="4" x2="32" y2="60" stroke="var(--cio-blue)" strokeWidth="1" />
                    <line x1="4" y1="32" x2="60" y2="32" stroke="var(--cio-blue)" strokeWidth="1" />
                    <rect x="12" y="24" width="40" height="16" rx="3" fill="var(--cio-navy)" stroke="var(--cio-blue)" strokeWidth="1.5" />
                    <text x="32" y="35" fill="#fff" fontSize="8" fontWeight="bold" letterSpacing="1" textAnchor="middle">FIATA</text>
                  </svg>
                )
              },
              { 
                title: dict.certifications.iataTitle, 
                desc: dict.certifications.iataDesc,
                icon: (
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M32 4 C 16.5 4, 4 16.5, 4 32 C 4 47.5, 16.5 60, 32 60 C 47.5 60, 60 47.5, 60 32" stroke="var(--cio-blue)" strokeWidth="2" strokeLinecap="round" />
                    <path d="M10 24 L54 24 M6 32 L58 32 M10 40 L54 40" stroke="var(--cio-blue)" strokeWidth="1" strokeOpacity="0.4" />
                    <path d="M24 10 C24 10, 18 20, 18 32 C18 44, 24 54, 24 54 M40 10 C40 10, 46 20, 46 32 C46 44, 40 54, 40 54" stroke="var(--cio-blue)" strokeWidth="1" strokeOpacity="0.4" />
                    <rect x="14" y="24" width="36" height="16" rx="4" fill="var(--cio-navy)" stroke="var(--cio-orange)" strokeWidth="1.5" />
                    <text x="32" y="35" fill="#fff" fontSize="9" fontWeight="bold" letterSpacing="0.5" textAnchor="middle">IATA</text>
                  </svg>
                )
              },
              { 
                title: dict.certifications.iruTitle, 
                desc: dict.certifications.iruDesc,
                icon: (
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="4" y="16" width="56" height="32" rx="6" fill="var(--cio-navy)" stroke="var(--cio-blue)" strokeWidth="2" />
                    <text x="32" y="36" fill="#fff" fontSize="16" fontWeight="bold" fontStyle="italic" letterSpacing="0.5" textAnchor="middle">IRU</text>
                    <path d="M12 44 L52 44" stroke="var(--cio-orange)" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                )
              },
              { 
                title: dict.certifications.aeoTitle, 
                desc: dict.certifications.aeoDesc,
                icon: (
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M32 4 L52 14 L52 38 C52 50, 42 57, 32 60 C22 57, 12 50, 12 38 L12 14 Z" fill="var(--cio-navy)" stroke="var(--cio-blue)" strokeWidth="2" />
                    <circle cx="32" cy="32" r="12" stroke="var(--cio-orange)" strokeWidth="1" strokeDasharray="3 2" />
                    <text x="32" y="35" fill="#fff" fontSize="9" fontWeight="extrabold" textAnchor="middle">AEO</text>
                    <path d="M32 10 L32.5 12 L34.5 12 L33 13 L33.5 15 L32 14 L30.5 15 L31 13 L29.5 12 L31.5 12 Z" fill="var(--cio-orange)" />
                  </svg>
                )
              },
            ].map((cert, idx) => (
              <div key={idx} className="cert-card">
                <div className="cert-icon-wrapper">
                  {cert.icon}
                </div>
                <h4 style={{ fontSize: '15.5px', fontWeight: 700, marginBottom: '8px', color: 'var(--cio-navy)' }}>{cert.title}</h4>
                <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', lineHeight: '1.4' }}>{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insights / Blog section */}
      <section className="section section-gray" id="insights">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{dict.insights.eyebrow}</span>
            <h2>{dict.insights.title}</h2>
            <p>{dict.insights.desc}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
            {[
              { cat: dict.insights.blog1Cat, title: dict.insights.blog1Title, desc: dict.insights.blog1Desc, author: dict.insights.blog1Author, time: dict.insights.blog1Read },
              { cat: dict.insights.blog2Cat, title: dict.insights.blog2Title, desc: dict.insights.blog2Desc, author: dict.insights.blog2Author, time: dict.insights.blog2Read },
              { cat: dict.insights.blog3Cat, title: dict.insights.blog3Title, desc: dict.insights.blog3Desc, author: dict.insights.blog3Author, time: dict.insights.blog3Read },
            ].map((post, idx) => (
              <article key={idx} style={{ background: 'var(--bg-white)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ padding: '28px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--cio-orange)', letterSpacing: '0.5px', display: 'block', marginBottom: '12px' }}>
                    {post.cat}
                  </span>
                  <h4 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '12px', color: 'var(--cio-navy)', lineHeight: '1.4' }}>
                    {post.title}
                  </h4>
                  <p style={{ fontSize: '13.5px', color: 'var(--text-body)', lineHeight: '1.6' }}>
                    {post.desc}
                  </p>
                </div>
                <div style={{ padding: '20px 28px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: 'var(--text-muted)' }}>
                  <span>{post.author}</span>
                  <span>{post.time}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Contact Section */}
      <section className="section" id="contact" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className="section-head" style={{ marginBottom: '48px' }}>
            <span className="eyebrow">{dict.contact.eyebrow}</span>
            <h2>{dict.contact.title}</h2>
            <p>{dict.contact.desc}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', textAlign: 'center' }}>
            <a href="tel:+37495211121" style={{ padding: '32px 24px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--bg-gray)', display: 'block' }}>
              <Phone size={28} color="var(--cio-orange)" style={{ margin: '0 auto 16px' }} />
              <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '6px' }}>{dict.contact.call}</h4>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>+(374) 95 211 121</p>
            </a>

            <a href="https://wa.me/37495211121" target="_blank" rel="noopener noreferrer" style={{ padding: '32px 24px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--bg-gray)', display: 'block' }}>
              <Star size={28} color="#25D366" style={{ margin: '0 auto 16px' }} />
              <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '6px' }}>{dict.contact.whatsapp}</h4>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>{dict.contact.whatsappDesc}</p>
            </a>

            <a href="mailto:info@ciologistics.com" style={{ padding: '32px 24px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--bg-gray)', display: 'block' }}>
              <FileText size={28} color="var(--cio-blue)" style={{ margin: '0 auto 16px' }} />
              <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '6px' }}>{dict.contact.email}</h4>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>info@ciologistics.com</p>
            </a>

            <a href="https://t.me/ciologistics" target="_blank" rel="noopener noreferrer" style={{ padding: '32px 24px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--bg-gray)', display: 'block' }}>
              <Users size={28} color="#0088cc" style={{ margin: '0 auto 16px' }} />
              <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '6px' }}>{dict.contact.telegram}</h4>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>@ciologistics</p>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
