"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Plane, Ship, Truck, Train, Package, Weight, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface ServicesShowcaseProps {
  dict: any;
  lang: string;
}

export default function ServicesShowcase({ dict, lang }: ServicesShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

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

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    let animId: number;
    let targetP = 0;
    let currentP = 0;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const winHeight = window.innerHeight;
      const totalScrollHeight = containerRef.current.offsetHeight - winHeight;

      if (totalScrollHeight <= 0) return;

      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / totalScrollHeight));
      targetP = p;
    };

    const updateAnimation = () => {
      // Smooth linear interpolation for buttery fluid motion
      currentP += (targetP - currentP) * 0.12;
      
      if (Math.abs(targetP - currentP) > 0.0001 || targetP === 0 || targetP === 1) {
        setProgress(currentP);
        // Calculate active card index (0 to services.length - 1)
        const idx = Math.min(
          services.length - 1,
          Math.floor(currentP * services.length)
        );
        setActiveIdx(idx);
      }
      animId = requestAnimationFrame(updateAnimation);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    animId = requestAnimationFrame(updateAnimation);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animId);
    };
  }, [isMobile, services.length]);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        height: isMobile ? 'auto' : '360vh', 
        position: 'relative',
        background: 'var(--bg-gray)'
      }}
    >
      <div 
        style={{ 
          position: isMobile ? 'relative' : 'sticky', 
          top: 0, 
          height: isMobile ? 'auto' : '100vh', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          padding: isMobile ? '64px 0' : '0',
          overflow: 'hidden'
        }}
      >
        <div className="container">
          {/* Section Header */}
          <div className="section-head" style={{ marginBottom: '40px' }}>
            <span className="eyebrow">{dict?.services?.eyebrow || "WHAT WE MOVE"}</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', marginBottom: '12px' }}>
              {dict?.services?.title || "Moving Your Products Across All Borders"}
            </h2>
            <p style={{ fontSize: '16px', color: 'var(--text-muted)', maxWidth: '680px', margin: '0 auto' }}>
              {dict?.services?.desc || "Comprehensive freight forwarding solutions tailored to your industry, deadlines, and cargo requirements."}
            </p>
          </div>

          {/* Progress bar indicator for desktop */}
          {!isMobile && (
            <div style={{ width: '200px', height: '4px', background: 'rgba(0,0,0,0.08)', borderRadius: '4px', margin: '0 auto 36px', overflow: 'hidden' }}>
              <div style={{ width: `${Math.max(15, progress * 100)}%`, height: '100%', background: 'var(--cio-orange)', transition: 'width 0.1s linear' }} />
            </div>
          )}

          {/* Horizontal Track */}
          <div 
            ref={trackRef}
            style={isMobile ? {
              display: 'flex',
              gap: '24px',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              paddingBottom: '24px',
              WebkitOverflowScrolling: 'touch'
            } : {
              display: 'flex',
              gap: '32px',
              transform: `translate3d(-${progress * 52}%, 0, 0)`,
              willChange: 'transform',
              transition: 'transform 0.05s linear'
            }}
          >
            {services.map((srv, idx) => {
              const isCardActive = isMobile || idx === activeIdx;
              return (
                <div 
                  key={idx}
                  style={{ 
                    flex: isMobile ? '0 0 88%' : '0 0 380px',
                    scrollSnapAlign: 'center',
                    display: 'flex', 
                    flexDirection: 'column', 
                    borderRadius: '24px', 
                    border: isCardActive ? '2px solid var(--cio-orange)' : '1px solid var(--border)', 
                    background: 'var(--bg-white)', 
                    boxShadow: isCardActive ? '0 16px 40px rgba(236, 28, 40, 0.15)' : '0 8px 24px rgba(0,0,0,0.06)', 
                    overflow: 'hidden',
                    transform: (!isMobile && isCardActive) ? 'scale(1.03) translateY(-4px)' : 'scale(1)',
                    opacity: (!isMobile && !isCardActive && Math.abs(idx - activeIdx) > 1) ? 0.65 : 1,
                    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
                  }}
                >
                  <div style={{ height: '240px', width: '100%', position: 'relative', overflow: 'hidden' }}>
                    <img 
                      src={srv.image} 
                      alt={srv.title} 
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        transform: isCardActive ? 'scale(1.05)' : 'scale(1)',
                        transition: 'transform 0.6s ease'
                      }} 
                    />
                    <div style={{ position: 'absolute', top: '16px', left: '16px', width: '52px', height: '52px', borderRadius: '14px', background: isCardActive ? 'var(--cio-orange)' : 'var(--cio-navy)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.3)', transition: 'background 0.3s ease' }}>
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
              );
            })}
          </div>

          {/* See All Button */}
          <div style={{ textAlign: 'center', marginTop: '36px' }}>
            <Link href={`/${lang}/services`} className="btn btn-primary" style={{ padding: '16px 36px', fontSize: '16px', fontWeight: 700, boxShadow: '0 8px 24px rgba(236, 28, 40, 0.25)' }}>
              {dict?.services?.seeAll || "Explore All Logistics Services →"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
