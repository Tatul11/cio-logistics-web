"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Plane, Ship, Truck, Train, Package, Weight, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface ServicesShowcaseProps {
  dict: any;
  lang: string;
}

export default function ServicesShowcase({ dict, lang }: ServicesShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

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

  // Scroll listener to automatically advance active card as user scrolls through the section
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // If section is in viewport
      if (rect.top < windowHeight * 0.8 && rect.bottom > windowHeight * 0.2) {
        const totalScrollable = rect.height + windowHeight * 0.5;
        const scrolled = (windowHeight * 0.8 - rect.top);
        const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));
        const idx = Math.min(services.length - 1, Math.floor(progress * services.length));
        setActiveIndex(idx);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [services.length]);

  return (
    <div ref={containerRef}>
      {/* Interactive Navigation Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 600 }}>
          Scroll down to explore or click any card to highlight
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={() => setActiveIndex((prev) => (prev > 0 ? prev - 1 : services.length - 1))}
            className="btn"
            style={{ width: '44px', height: '44px', padding: 0, borderRadius: '8px', background: 'var(--bg-white)', border: '1px solid var(--border)', color: 'var(--cio-navy)' }}
            aria-label="Previous Service"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={() => setActiveIndex((prev) => (prev < services.length - 1 ? prev + 1 : 0))}
            className="btn"
            style={{ width: '44px', height: '44px', padding: 0, borderRadius: '8px', background: 'var(--bg-white)', border: '1px solid var(--border)', color: 'var(--cio-navy)' }}
            aria-label="Next Service"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Services Grid with Interactive Blur & Focus */}
      <div className="grid-3-cols" style={{ gap: '28px' }}>
        {services.map((srv, idx) => {
          const isActive = idx === activeIndex;
          return (
            <div 
              key={idx}
              onClick={() => setActiveIndex(idx)}
              onMouseEnter={() => setActiveIndex(idx)}
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                borderRadius: '16px', 
                border: isActive ? '3px solid var(--cio-orange)' : '1px solid var(--border)', 
                background: 'var(--bg-white)', 
                boxShadow: isActive ? '0 20px 40px rgba(236, 28, 40, 0.2)' : 'var(--shadow-sm)', 
                overflow: 'hidden',
                cursor: 'pointer',
                transform: isActive ? 'scale(1.04) translateY(-6px)' : 'scale(0.96)',
                filter: isActive ? 'blur(0px)' : 'blur(4px)',
                opacity: isActive ? 1 : 0.45,
                transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                zIndex: isActive ? 10 : 1
              }}
            >
              <div style={{ height: '200px', width: '100%', position: 'relative', overflow: 'hidden' }}>
                <img 
                  src={srv.image} 
                  alt={srv.title} 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    transform: isActive ? 'scale(1.1)' : 'scale(1)',
                    transition: 'transform 0.7s ease'
                  }} 
                />
                <div style={{ position: 'absolute', top: '16px', left: '16px', width: '44px', height: '44px', borderRadius: '8px', background: isActive ? 'var(--cio-orange)' : 'rgba(255, 255, 255, 0.95)', color: isActive ? '#FFFFFF' : 'var(--cio-orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-sm)', transition: 'all 0.3s ease' }}>
                  {srv.icon}
                </div>
              </div>
              <div style={{ padding: '28px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '12px', color: isActive ? 'var(--cio-orange)' : 'var(--cio-navy)', transition: 'color 0.3s ease' }}>
                    {srv.title}
                  </h3>
                  <p style={{ fontSize: '15px', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: '1.6' }}>
                    {srv.desc}
                  </p>
                </div>
                <Link href={srv.href} style={{ fontSize: '14px', fontWeight: 700, color: 'var(--cio-orange)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  Learn more <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
