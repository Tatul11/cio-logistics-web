import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDictionary } from '@/lib/dictionary';
import { ShieldCheck, ArrowRight, Plane, Ship, Truck, Train, Layers, HelpCircle } from 'lucide-react';

interface ServiceData {
  titleKey: string;
  icon: any;
  descKey: string;
  benefits: string[];
  specs: { label: string; value: string }[];
}

interface ServicePageProps {
  params: Promise<{
    lang: string;
    service: string;
  }>;
}

export async function generateStaticParams() {
  const languages = ['en', 'ru', 'hy'];
  const services = [
    'air-freight',
    'sea-freight',
    'road-transport',
    'rail-freight',
    'groupage-cargo',
    'heavy-bulky-cargo',
    'dangerous-goods',
    'container-shipping',
    'customs-clearance',
    'warehousing',
  ];

  const params: { lang: string; service: string }[] = [];
  for (const lang of languages) {
    for (const service of services) {
      params.push({ lang, service });
    }
  }
  return params;
}

export async function generateMetadata(props: ServicePageProps): Promise<Metadata> {
  const params = await props.params;
  const rawLang = params.lang || 'en';
  const lang = (rawLang === 'ru' || rawLang === 'hy' ? rawLang : 'en') as 'en' | 'ru' | 'hy';
  const service = params.service;
  
  const dict = await getDictionary(lang);
  const titles: Record<string, string> = {
    'air-freight': dict.services.air,
    'sea-freight': dict.services.sea,
    'road-transport': dict.services.road,
    'rail-freight': dict.services.rail,
    'groupage-cargo': dict.services.groupage,
    'heavy-bulky-cargo': dict.services.heavy,
    'dangerous-goods': dict.services.dangerous,
    'container-shipping': dict.services.container,
    'customs-clearance': dict.services.customs,
    'warehousing': dict.services.warehousing,
  };

  const title = titles[service] || 'Logistics Service';

  return {
    title: `${title} - International Freight Forwarding | CIO Logistics`,
    description: `Tailored logistics solution for ${title} to and from Armenia. Secure, certified operations.`,
  };
}

export default async function ServiceDetailsPage(props: ServicePageProps) {
  const params = await props.params;
  const rawLang = params.lang || 'en';
  const lang = (rawLang === 'ru' || rawLang === 'hy' ? rawLang : 'en') as 'en' | 'ru' | 'hy';
  const service = params.service;
  
  const dict = await getDictionary(lang);

  const servicesData: Record<string, ServiceData> = {
    'air-freight': {
      titleKey: dict.services.air,
      icon: Plane,
      descKey: dict.services.airDesc,
      benefits: ['Door-to-door delivery with priority transit', 'Dangerous goods (IATA DGR classes 1-9) clearance', 'Temperature-controlled pharmaceutical handling', 'Express options via leading air carriers'],
      specs: [
        { label: 'Transit Time', value: '3 - 7 Business Days' },
        { label: 'Carrier Partnerships', value: 'Lufthansa, Qatar, Aeroflot, FlyOne, Silkway' },
        { label: 'Insurance Coverage', value: 'Up to $500,000 ICC A coverage' },
        { label: 'Clearance Airports', value: 'Yerevan Zvartnots (EVN), Gyumri (LWN)' },
      ],
    },
    'sea-freight': {
      titleKey: dict.services.sea,
      icon: Ship,
      descKey: dict.services.seaDesc,
      benefits: ['FCL and LCL container options via major ports', 'Pre-carriage, port handling, and custom clearance', 'Reefer containers for temperature-sensitive cargo', 'Container tracing and direct digital manifest updates'],
      specs: [
        { label: 'Transit Time', value: '35 - 50 Calendar Days' },
        { label: 'Primary Transit Ports', value: 'Poti (Georgia), Batumi (Georgia), Novorossiysk (Russia)' },
        { label: 'Container Types', value: '20ft, 40ft HC, Reefer, Flat Rack, Open Top' },
        { label: 'Brokerage Handling', value: 'Full EAEU import/export handling' },
      ],
    },
    'road-transport': {
      titleKey: dict.services.road,
      icon: Truck,
      descKey: dict.services.roadDesc,
      benefits: ['FTL and LTL shipping under TIR and CMR rules', 'Direct lines connecting Europe, Iran, Turkey, and CIS hubs', 'Modern GPS tracked fleet with double driver availability', 'Express consolidation trucks departing weekly'],
      specs: [
        { label: 'Transit Time', value: '7 - 14 Calendar Days' },
        { label: 'Transit Corridors', value: 'Upper Lars (Georgia-Russia border), Megri (Iran border)' },
        { label: 'Certifications', value: 'TIR Carnet, CMR Insurance, ADR classes' },
        { label: 'Cargo Tracking', value: 'Active GPS coordinate reporting' },
      ],
    },
    'rail-freight': {
      titleKey: dict.services.rail,
      icon: Train,
      descKey: dict.services.railDesc,
      benefits: ['China-Armenia railway block train solutions', 'Eco-friendly alternative with reliable schedule', 'Transshipment through Aktau port Caspian route', 'Cost-effective consolidated container trains'],
      specs: [
        { label: 'Transit Time', value: '18 - 22 Days' },
        { label: 'Routing Corridor', value: 'China → Aktau (Kazakhstan) → Poti (Georgia) → Yerevan' },
        { label: 'Container Tracking', value: 'Daily station progress logs' },
        { label: 'Loading Stations', value: 'Xi&apos;an, Chengdu, Shanghai, Ningbo' },
      ],
    },
    'groupage-cargo': {
      titleKey: dict.services.groupage,
      icon: Layers,
      descKey: dict.services.groupageDesc,
      benefits: ['Pay only for the space your cargo takes (LCL)', 'Weekly consolidation departures from main hubs', 'Safe repacking and palletizing in sorting centers', 'Dedicated customs classification per article'],
      specs: [
        { label: 'Consolidation Hubs', value: 'Shanghai, Frankfurt, Dubai, Vilnius, Moscow' },
        { label: 'Departures', value: 'Every Friday' },
        { label: 'Minimum Volume', value: '0.1 CBM / 10 kg' },
        { label: 'Final Delivery', value: 'Door-to-door to any city in Armenia' },
      ],
    },
  };

  const serviceData = servicesData[service];
  if (!serviceData) {
    return notFound();
  }

  const IconComp = serviceData.icon;

  return (
    <div style={{ background: 'var(--bg-gray)', padding: '64px 0' }}>
      <div className="container" style={{ maxWidth: '960px' }}>
        {/* Service Details Card */}
        <div style={{ background: '#fff', borderRadius: 'var(--radius-lg)', padding: '48px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '12px', background: 'rgba(236, 28, 40, 0.1)', color: 'var(--cio-orange)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IconComp size={32} />
            </div>
            <div>
              <span style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--cio-orange)', fontWeight: 700 }}>
                {dict.nav.services}
              </span>
              <h1 style={{ fontSize: '32px', color: 'var(--cio-navy)', marginTop: '4px' }}>
                {serviceData.titleKey}
              </h1>
            </div>
          </div>

          <p style={{ fontSize: '16px', color: 'var(--text-body)', lineHeight: '1.7', marginBottom: '40px' }}>
            {serviceData.descKey}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '48px', marginBottom: '48px' }}>
            {/* Key Benefits */}
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px', color: 'var(--cio-navy)' }}>
                Service Benefits & Strengths
              </h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '14px', listStyle: 'none' }}>
                {serviceData.benefits.map((benefit, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'start', gap: '10px', fontSize: '14.5px', lineHeight: '1.5' }}>
                    <span style={{ color: 'var(--success)', fontWeight: 800 }}>✓</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technical Specifications */}
            <div style={{ background: 'var(--bg-gray)', padding: '32px', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '20px', color: 'var(--cio-navy)' }}>
                Technical Specification
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {serviceData.specs.map((spec, idx) => (
                  <div key={idx} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
                    <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '2px' }}>
                      {spec.label}
                    </span>
                    <strong style={{ fontSize: '13.5px', color: 'var(--cio-navy)' }}>
                      {spec.value}
                    </strong>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={20} color="var(--success)" />
              <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                FIATA, IATA and ISO 9001:2015 certified logistics operations.
              </span>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Link href={`/${lang}/quote`} className="btn btn-primary">
                Get a Quote for this Service <ArrowRight size={16} />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
