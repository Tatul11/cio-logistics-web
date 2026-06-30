"use client";

import React from 'react';
import Link from 'next/link';
import { Plane, Ship, Truck, Train, Package, Weight, ArrowUpRight } from 'lucide-react';

interface ServicesShowcaseProps {
  dict: any;
  lang: string;
}

export default function ServicesShowcase({ dict, lang }: ServicesShowcaseProps) {
  const services = [
    {
      title: dict?.services?.air || "Air Freight",
      desc: dict?.services?.airDesc || "Express, standard & charter air cargo worldwide.",
      image: "/images/chuttersnap-kyCNGGKCvyw-unsplash.webp",
      icon: <Plane size={24} />,
      href: `/${lang}/services/air-freight`
    },
    {
      title: dict?.services?.sea || "Sea Freight",
      desc: dict?.services?.seaDesc || "FCL, LCL & reefer container shipping via major ports.",
      image: "/images/elevate-dI-aXC7DWpQ-unsplash.webp",
      icon: <Ship size={24} />,
      href: `/${lang}/services/sea-freight`
    },
    {
      title: dict?.services?.road || "Road Freight",
      desc: dict?.services?.roadDesc || "FTL & LTL trucking across Eurasia and CIS corridors.",
      image: "/images/elias--lYi5Qg0xP0-unsplash.webp",
      icon: <Truck size={24} />,
      href: `/${lang}/services/road-transport`
    },
    {
      title: dict?.services?.rail || "Rail Freight",
      desc: dict?.services?.railDesc || "Reliable container block trains along the Silk Road.",
      image: "/images/frank-mckenna-tjX_sniNzgQ-unsplash.webp",
      icon: <Train size={24} />,
      href: `/${lang}/services/rail-freight`
    },
    {
      title: dict?.services?.groupage || "Groupage (LTL)",
      desc: dict?.services?.groupageDesc || "Consolidated shipments with weekly scheduled departures.",
      image: "/images/john-simmons-XFLk8qZ-6MA-unsplash.webp",
      icon: <Package size={24} />,
      href: `/${lang}/services/groupage-cargo`
    },
    {
      title: dict?.services?.heavy || "Heavy & Bulky",
      desc: dict?.services?.heavyDesc || "Specialized project cargo and oversized machinery transport.",
      image: "/images/marcin-jozwiak-kGoPcmpPT7c-unsplash.webp",
      icon: <Weight size={24} />,
      href: `/${lang}/services/heavy-bulky-cargo`
    }
  ];

  return (
    <div className="container" style={{ padding: '80px 20px' }}>
      {/* Section Header */}
      <div className="section-head" style={{ marginBottom: '48px' }}>
        <span className="eyebrow">{dict?.services?.eyebrow || "WHAT WE MOVE"}</span>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', marginBottom: '12px' }}>
          {dict?.services?.title || "Moving Your Products Across All Borders"}
        </h2>
        <p style={{ fontSize: '16px', color: 'var(--text-muted)', maxWidth: '680px', margin: '0 auto' }}>
          {dict?.services?.desc || "Comprehensive freight forwarding solutions tailored to your industry, deadlines, and cargo requirements."}
        </p>
      </div>

      {/* Responsive Vertical Grid (3 cols on desktop, 2 on tablet, 1 on mobile) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', marginBottom: '48px' }}>
        {services.map((srv, idx) => (
          <div 
            key={idx}
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              borderRadius: '20px', 
              border: '1px solid var(--border)', 
              background: 'var(--bg-white)', 
              boxShadow: '0 8px 24px rgba(0,0,0,0.06)', 
              overflow: 'hidden',
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{ height: '220px', width: '100%', position: 'relative', overflow: 'hidden' }}>
              <img 
                src={srv.image} 
                alt={srv.title} 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover'
                }} 
              />
              <div style={{ position: 'absolute', top: '16px', left: '16px', width: '48px', height: '48px', borderRadius: '12px', background: 'var(--cio-navy)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.15)' }}>
                {srv.icon}
              </div>
            </div>
            <div style={{ padding: '28px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '12px', color: 'var(--cio-navy)' }}>
                  {srv.title}
                </h3>
                <p style={{ fontSize: '15px', color: 'var(--text-body)', marginBottom: '24px', lineHeight: '1.6' }}>
                  {srv.desc}
                </p>
              </div>
              <Link href={srv.href} style={{ fontSize: '15px', fontWeight: 700, color: 'var(--cio-orange)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                Learn more <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* See All Button */}
      <div style={{ textAlign: 'center' }}>
        <Link href={`/${lang}/services`} className="btn btn-primary" style={{ padding: '16px 36px', fontSize: '16px', fontWeight: 700 }}>
          {dict?.services?.seeAll || "Explore All Logistics Services →"}
        </Link>
      </div>
    </div>
  );
}
