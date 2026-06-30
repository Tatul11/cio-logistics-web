"use client";

import React, { useEffect, useState, useRef } from 'react';
import { Plane } from 'lucide-react';
import styles from './ScrollAirplane.module.css';

export default function ScrollAirplane() {
  const [scrollProgress, setScrollProgress] = useState(0.05); // 0 to 0.88
  const [facingDirection, setFacingDirection] = useState<'right' | 'left'>('right');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const currentScrollY = window.scrollY;
      
      // Determine direction of scroll
      if (currentScrollY > lastScrollY.current + 2) {
        setFacingDirection('right');
      } else if (currentScrollY < lastScrollY.current - 2) {
        setFacingDirection('left');
      }
      lastScrollY.current = currentScrollY;

      // Calculate progress relative to container viewport position
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // When rect.top is near bottom of window (just appeared), progress is 0
      // When rect.bottom is near top of window, progress is 1
      const totalDistance = windowHeight + rect.height;
      const traveled = windowHeight - rect.top;
      let progress = traveled / totalDistance;

      if (progress < 0.03) progress = 0.03;
      if (progress > 0.88) progress = 0.88;

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className={styles.airwayBanner}>
      {/* Dashed Flight Track */}
      <div className={styles.flightTrack} />

      {/* Waypoint Dots */}
      <div className={styles.flightWaypoints}>
        <div className={styles.waypointDot} />
        <div className={styles.waypointDot} />
        <div className={styles.waypointDot} />
        <div className={styles.waypointDot} />
        <div className={styles.waypointDot} />
      </div>

      {/* Moving Airplane */}
      <div
        className={`${styles.airplaneWrap} ${
          facingDirection === 'right' ? styles.airplaneFacingRight : styles.airplaneFacingLeft
        }`}
        style={{ left: `${scrollProgress * 90}%` }}
      >
        <div className={styles.airplaneBody}>
          <Plane size={24} style={{ transform: 'rotate(45deg)' }} />
          <span style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.5px' }}>AIR FREIGHT</span>
        </div>
      </div>
    </div>
  );
}
