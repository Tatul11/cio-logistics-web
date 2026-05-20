import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getDictionary } from '@/lib/dictionary';
import InteractiveMap from '@/components/InteractiveMap/InteractiveMap';
import { Calendar, Compass, Ship, Truck, Train, Plane, ShieldCheck, ArrowRight } from 'lucide-react';

interface RoutesPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata(props: RoutesPageProps): Promise<Metadata> {
  const params = await props.params;
  const rawLang = params.lang || 'en';
  const lang = (rawLang === 'ru' || rawLang === 'hy' ? rawLang : 'en') as 'en' | 'ru' | 'hy';
  
  const titles = {
    en: "International Freight Corridors & Routes - CIO Logistics",
    ru: "Международные грузовые коридоры и маршруты - CIO Logistics",
    hy: "Միջազգային բեռնափոխադրման ուղիներ - CIO Logistics",
  };

  const descriptions = {
    en: "Explore our main shipping routes between Armenia and China, Russia, EU, US, and UAE. Details on transit times, border crossings, and customs.",
    ru: "Изучите наши основные маршруты перевозок между Арменией и Китаем, Россией, ЕС, США и ОАЭ. Сроки транзита, таможенные посты.",
    hy: "Բացահայտեք Հայաստանի և Չինաստանի, Ռուսաստանի, ԵՄ-ի, ԱՄՆ-ի, ԱՄԷ-ի միջև բեռնափոխադրման հիմնական ուղիները: Տրանզիտի ժամկետները:",
  };

  return {
    title: titles[lang],
    description: descriptions[lang],
  };
}

export default async function RoutesPage(props: RoutesPageProps) {
  const params = await props.params;
  const rawLang = params.lang || 'en';
  const lang = (rawLang === 'ru' || rawLang === 'hy' ? rawLang : 'en') as 'en' | 'ru' | 'hy';
  const dict = await getDictionary(lang);

  const routeDetails = [
    {
      title: dict.routes.china,
      flag: '🇨🇳',
      meta: dict.routes.chinaMeta,
      description: 'Our most active commercial route. Sea freight runs via Ningbo/Shanghai container ports to Poti/Batumi ports (Georgia) and continues via truck to Yerevan. Rail freight runs via Aktau port across the Caspian Sea, reducing transit time. Air freight goes directly from Beijing Capital (PEK) or Shanghai Pudong (PVG) to Yerevan Zvartnots (EVN).',
      borders: 'EAEU custom clearing at border checkpoint.',
    },
    {
      title: dict.routes.russia,
      flag: '🇷🇺',
      meta: dict.routes.russiaMeta,
      description: 'Direct land cargo trucks linking Russian industrial zones with Armenia. Truck operations go through the Upper Lars checkpoint. Weekly consolidated trucks from Moscow and Krasnodar consolidation warehouses. Rail block train cargo available via Georgia.',
      borders: 'Border checkpoint: Upper Lars (Russia-Georgia). Direct EAEU trade rules apply.',
    },
    {
      title: dict.routes.germany,
      flag: '🇩🇪',
      meta: dict.routes.germanyMeta,
      description: 'LTL road freight consolidation runs from Frankfurt and Hamburg terminals, shipping through Eastern Europe and Turkey to Yerevan. Air cargo operations connect Frankfurt Airport (FRA) directly to EVN, specializing in GDP pharmaceutical handling.',
      borders: 'Customs declaration under standard TIR/CMR protocols.',
    },
    {
      title: dict.routes.usa,
      flag: '🇺🇸',
      meta: dict.routes.usaMeta,
      description: 'FCL ocean shipments depart from New York (JFK) and Los Angeles (LAX) ports to Poti Port, connecting with road freight to Yerevan. High-value air cargo routes run via major European hubs to Zvartnots.',
      borders: 'EU transit customs declarations handled by partners.',
    },
    {
      title: dict.routes.uae,
      flag: '🇦🇪',
      meta: dict.routes.uaeMeta,
      description: 'Fast air shipping from Dubai International (DXB) or Al Maktoum (DWC) to EVN. Multimodal sea + road options via Iran corridor are available for oversized project cargo.',
      borders: 'Customs classification under Middle East trade accords.',
    },
  ];

  return (
    <div style={{ background: 'var(--bg-gray)', padding: '64px 0' }}>
      <div className="container">
        
        {/* Page title */}
        <div className="section-head" style={{ marginBottom: '56px' }}>
          <span className="eyebrow">{dict.routes.eyebrow}</span>
          <h1>International Freight Corridors</h1>
          <p>
            CIO Logistics designs, manages, and operates logistics channels connecting Armenia to global markets. Select a route to see timing, border checkpoints, and transport modes.
          </p>
        </div>

        {/* Map showcase */}
        <div style={{ marginBottom: '64px' }}>
          <InteractiveMap lang={lang} dict={dict} />
        </div>

        {/* Routes detailed descriptions */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }}>
          {routeDetails.map((route, idx) => (
            <div
              key={idx}
              style={{
                background: '#fff',
                borderRadius: 'var(--radius-lg)',
                padding: '40px',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-sm)',
                display: 'grid',
                gridTemplateColumns: '1fr 2fr',
                gap: '40px',
                alignItems: 'start',
              }}
            >
              {/* Route Summary */}
              <div>
                <span style={{ fontSize: '48px', display: 'block', marginBottom: '16px' }}>{route.flag}</span>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--cio-navy)', marginBottom: '8px' }}>
                  {route.title}
                </h3>
                <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--cio-orange)', display: 'block', marginBottom: '16px' }}>
                  Transit Times
                </span>
                <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar size={16} />
                  {route.meta}
                </p>
              </div>

              {/* Route details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <p style={{ fontSize: '14.5px', color: 'var(--text-body)', lineHeight: '1.7' }}>
                  {route.description}
                </p>
                <div style={{ background: 'var(--bg-gray)', padding: '16px 20px', borderRadius: 'var(--radius)', borderLeft: '3px solid var(--cio-orange)', fontSize: '13px', color: 'var(--text-muted)' }}>
                  <strong>Border & customs protocol: </strong> {route.borders}
                </div>
                
                <div style={{ marginTop: '16px' }}>
                  <Link href={`/${lang}/quote`} style={{ fontSize: '14px', fontWeight: 700, color: 'var(--cio-orange)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    Request Rate Quote for this corridor <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
