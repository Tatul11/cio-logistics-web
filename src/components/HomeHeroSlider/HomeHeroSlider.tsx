"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import styles from './HomeHeroSlider.module.css';

interface HomeHeroSliderProps {
  dict: any;
  lang: string;
}

export default function HomeHeroSlider({ dict, lang }: HomeHeroSliderProps) {
  const heroImages = [
    "/images/william-william-NndKt2kF1L4-unsplash.webp",
    "/images/chuttersnap-fN603qcEA7g-unsplash.webp",
    "/images/barret-ward-5WbtO3NlTJI-unsplash.webp",
    "/images/elevate-dI-aXC7DWpQ-unsplash.webp",
    "/images/arno-senoner-u2OdNnrksIk-unsplash.webp"
  ];

  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 2000); // Change background every 2 seconds per Request 2

    return () => clearInterval(timer);
  }, [heroImages.length]);

  return (
    <section className={styles.heroSection}>
      {/* Background Slides */}
      <div className={styles.bgSlideWrap}>
        {heroImages.map((imgUrl, idx) => (
          <div
            key={imgUrl}
            className={`${styles.bgSlide} ${idx === currentBgIndex ? styles.bgSlideActive : ''}`}
          >
            <img src={imgUrl} alt="Logistics Operations" className={styles.bgImage} />
          </div>
        ))}
        {/* Dark Gradient Overlay */}
        <div className={styles.overlay}></div>
      </div>

      {/* Radial Red Glow */}
      <div className={styles.glow}></div>

      {/* Hero Content */}
      <div className="container" style={{ position: 'relative', zIndex: 3 }}>
        <div className="animate-fade-in-up" style={{ maxWidth: '820px', textAlign: 'left', width: '100%' }}>
          <div className={styles.badgesRow}>
            <span className={styles.isoBadge}>{dict.hero.badgeIso}</span>
            <span className={styles.isoBadge}>{dict.hero.badgeFiata}</span>
            <span className={styles.isoBadge}>{dict.hero.badgeIata}</span>
            <span className={styles.isoBadge}>{dict.hero.badgeIru}</span>
          </div>

          <h1 className={styles.heroTitle}>
            {dict.hero.title} <span className={styles.titleAccent}>{dict.hero.titleAccent}</span>
          </h1>

          <p className={styles.heroDesc}>
            {dict.hero.description}
          </p>

          <div className={styles.btnGroup}>
            <Link href={`/${lang}/quote`} className="btn btn-primary">
              {dict.hero.getQuote}
            </Link>
            <Link href={`/${lang}/#track`} className="btn btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={18} />
              {dict.hero.trackShipment}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
