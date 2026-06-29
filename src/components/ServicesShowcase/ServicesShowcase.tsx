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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

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

  // Handle sticky window scroll mapping directly to horizontal track translation
  useEffect(() => {
    const handleScroll = () => {
      if (!wrapperRef.current || !trackRef.current) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = wrapperRef.current.offsetHeight - windowHeight;

      if (totalScrollable <= 0) return;

      // Calculate vertical progress between 0 and 1 while pinned
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));

      // Translate horizontal track proportional to vertical progress
      const maxScroll = trackRef.current.scrollWidth - trackRef.current.clientWidth;
      trackRef.current.scrollLeft = progress * maxScroll;

      // Update active card index
      const idx = Math.min(services.length - 1, Math.floor(progress * services.length));
      setActiveIndex(idx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [services.length]);

  const selectIndex = (idx: number) => {
    setActiveIndex(idx);
    if (!wrapperRef.current) return;
    const windowHeight = window.innerHeight;
    const totalScrollable = wrapperRef.current.offsetHeight - windowHeight;
    const targetProgress = idx / (services.length - 1);
    const targetScrollY = wrapperRef.current.offsetTop + (targetProgress * totalScrollable);
    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
  };

  return (
    <div ref={wrapperRef} style={{ height: '320vh', position: 'relative' }}>
      <div 
        style={{ 
          position: 'sticky', 
          top: '75px', 
          height: 'calc(100vh - 75px)', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          overflow: 'hidden',
          padding: '20px 0'
        }}
      >
        <div className="container" style={{ width: '100%', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', maxHeight: '820px' }}>
          
          {/* Section Header */}
          <div className="section-head" style={{ marginBottom: '16px' }}>
            <span className="eyebrow">{dict?.services?.eyebrow || "WHAT WE MOVE"}</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', marginBottom: '8px' }}>
              {dict?.services?.title || "Moving Your Products Across All Borders"}
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--text-muted)' }}>
              {dict?.services?.desc || "Comprehensive freight forwarding solutions tailored to your industry."}
            </p>
          </div>

          {/* Interactive Navigation Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ fontSize: '14.5px', color: 'var(--text-muted)', fontWeight: 600 }}>
              ⚡ Scroll down vertically to pan horizontally through services ({activeIndex + 1}/{services.length})
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={() => selectIndex(activeIndex > 0 ? activeIndex - 1 : services.length - 1)}
                className="btn"
                style={{ width: '44px', height: '44px', padding: 0, borderRadius: '8px', background: 'var(--bg-white)', border: '1px solid var(--border)', color: 'var(--cio-navy)' }}
                aria-label="Previous Service"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={() => selectIndex(activeIndex < services.length - 1 ? activeIndex + 1 : 0)}
                className="btn"
                style={{ width: '44px', height: '44px', padding: 0, borderRadius: '8px', background: 'var(--bg-white)', border: '1px solid var(--border)', color: 'var(--cio-navy)' }}
                aria-label="Next Service"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Horizontal Services Carousel Track */}
          <div 
            ref={trackRef}
            style={{ 
              display: 'flex', 
              gap: '28px', 
              overflowX: 'hidden', 
              padding: '10px 4px 20px 4px',
              willChange: 'scroll-position'
            }}
          >
            {services.map((srv, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div 
                  key={idx}
                  onClick={() => selectIndex(idx)}
                  style={{ 
                    width: 'clamp(300px, 80vw, 360px)',
                    flexShrink: 0,
                    display: 'flex', 
                    flexDirection: 'column', 
                    borderRadius: '16px', 
                    border: isActive ? '3px solid var(--cio-orange)' : '1px solid var(--border)', 
                    background: 'var(--bg-white)', 
                    boxShadow: isActive ? '0 20px 40px rgba(236, 28, 40, 0.22)' : 'var(--shadow-sm)', 
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transform: isActive ? 'scale(1.04) translateY(-4px)' : 'scale(0.96)',
                    filter: isActive ? 'blur(0px)' : 'blur(2px)',
                    opacity: isActive ? 1 : 0.55,
                    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    zIndex: isActive ? 10 : 1
                  }}
                >
                  <div style={{ height: '180px', width: '100%', position: 'relative', overflow: 'hidden' }}>
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
                  <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '10px', color: isActive ? 'var(--cio-orange)' : 'var(--cio-navy)', transition: 'color 0.3s ease' }}>
                        {srv.title}
                      </h3>
                      <p style={{ fontSize: '14.5px', color: 'var(--text-muted)', marginBottom: '20px', lineHeight: '1.5' }}>
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

          {/* See All Button */}
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <Link href={`/${lang}/services`} className="btn btn-secondary">
              {dict?.services?.seeAll || "Explore All Logistics Services"}
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
