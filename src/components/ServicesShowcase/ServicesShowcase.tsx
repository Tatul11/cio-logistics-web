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
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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

  // Helper to smoothly scroll track to specific index
  const scrollToCard = (idx: number) => {
    if (trackRef.current && cardsRef.current[idx]) {
      const track = trackRef.current;
      const card = cardsRef.current[idx];
      const targetLeft = card.offsetLeft - (track.clientWidth / 2) + (card.clientWidth / 2);
      track.scrollTo({ left: targetLeft, behavior: 'smooth' });
    }
  };

  // Scroll listener to automatically advance active card as user scrolls down the webpage
  useEffect(() => {
    const handleWindowScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // If section is actively scrolling through viewport
      if (rect.top < windowHeight * 0.75 && rect.bottom > windowHeight * 0.25) {
        const totalScrollable = rect.height + windowHeight * 0.4;
        const scrolled = (windowHeight * 0.75 - rect.top);
        const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));
        const idx = Math.min(services.length - 1, Math.floor(progress * services.length));
        
        setActiveIndex((prevIdx) => {
          if (prevIdx !== idx) {
            scrollToCard(idx);
            return idx;
          }
          return prevIdx;
        });
      }
    };

    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, [services.length]);

  // Horizontal swipe listener inside the carousel track
  const handleTrackScroll = () => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const trackCenter = track.scrollLeft + (track.clientWidth / 2);
    let closestIdx = 0;
    let minDiff = Infinity;
    
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const cardCenter = card.offsetLeft + (card.clientWidth / 2);
      const diff = Math.abs(trackCenter - cardCenter);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = i;
      }
    });

    if (closestIdx !== activeIndex) {
      setActiveIndex(closestIdx);
    }
  };

  const selectIndex = (idx: number) => {
    setActiveIndex(idx);
    scrollToCard(idx);
  };

  return (
    <div ref={containerRef}>
      {/* Interactive Navigation Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ fontSize: '14.5px', color: 'var(--text-muted)', fontWeight: 600 }}>
          ⚡ Scroll down or swipe horizontally to explore active services
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
        onScroll={handleTrackScroll}
        style={{ 
          display: 'flex', 
          gap: '28px', 
          overflowX: 'auto', 
          scrollSnapType: 'x mandatory', 
          padding: '20px 10px 36px 10px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {services.map((srv, idx) => {
          const isActive = idx === activeIndex;
          return (
            <div 
              key={idx}
              ref={(el) => { cardsRef.current[idx] = el; }}
              onClick={() => selectIndex(idx)}
              style={{ 
                width: 'clamp(310px, 85vw, 380px)',
                flexShrink: 0,
                scrollSnapAlign: 'center',
                display: 'flex', 
                flexDirection: 'column', 
                borderRadius: '16px', 
                border: isActive ? '3px solid var(--cio-orange)' : '1px solid var(--border)', 
                background: 'var(--bg-white)', 
                boxShadow: isActive ? '0 25px 50px rgba(236, 28, 40, 0.22)' : 'var(--shadow-sm)', 
                overflow: 'hidden',
                cursor: 'pointer',
                transform: isActive ? 'scale(1.05) translateY(-6px)' : 'scale(0.95)',
                filter: isActive ? 'blur(0px)' : 'blur(2px)',
                opacity: isActive ? 1 : 0.55,
                transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                zIndex: isActive ? 10 : 1
              }}
            >
              <div style={{ height: '210px', width: '100%', position: 'relative', overflow: 'hidden' }}>
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
                  <h3 style={{ fontSize: '21px', fontWeight: 800, marginBottom: '12px', color: isActive ? 'var(--cio-orange)' : 'var(--cio-navy)', transition: 'color 0.3s ease' }}>
                    {srv.title}
                  </h3>
                  <p style={{ fontSize: '15px', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: '1.6' }}>
                    {srv.desc}
                  </p>
                </div>
                <Link href={srv.href} style={{ fontSize: '14.5px', fontWeight: 700, color: 'var(--cio-orange)', display: 'flex', alignItems: 'center', gap: '6px' }}>
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
