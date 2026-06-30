'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import styles from './InteractiveMap.module.css';

interface InteractiveMapProps {
  lang: 'en' | 'ru' | 'hy';
  dict: any;
}

type RegionId = 'europe' | 'eastAsia' | 'japan' | 'americas' | 'southAsia';

interface RegionBadge {
  id: RegionId;
  title: string;
  count: string;
  label: string;
  top: string;
  left: string;
  targetCoords: { x: number; y: number };
}

interface Dot {
  id: number;
  x: number;
  y: number;
  region: RegionId;
}

export default function InteractiveMap({ lang, dict }: InteractiveMapProps) {
  const [activeRegion, setActiveRegion] = useState<RegionId | null>(null);

  // Define the 5 regional circular badges matching the screenshot exactly
  const badges: RegionBadge[] = [
    {
      id: 'europe',
      title: 'Europe',
      count: '217',
      label: 'bases',
      top: '6%',
      left: '12%',
      targetCoords: { x: 170, y: 140 },
    },
    {
      id: 'eastAsia',
      title: 'East Asia',
      count: '85',
      label: 'bases',
      top: '3%',
      left: '42%',
      targetCoords: { x: 420, y: 150 },
    },
    {
      id: 'japan',
      title: 'Japan',
      count: '71',
      label: 'bases',
      top: '40%',
      left: '49%',
      targetCoords: { x: 510, y: 175 },
    },
    {
      id: 'americas',
      title: 'Americas',
      count: '76',
      label: 'bases',
      top: '36%',
      left: '79%',
      targetCoords: { x: 700, y: 180 },
    },
    {
      id: 'southAsia',
      title: 'South Asia & Oceania',
      count: '284',
      label: 'bases',
      top: '64%',
      left: '26%',
      targetCoords: { x: 410, y: 310 },
    },
  ];

  // Route cards on the right mapped to map regions
  const routeCards = [
    {
      id: 'china',
      region: 'eastAsia' as RegionId,
      flag: '🇨🇳',
      title: dict.routes?.china || 'China → Armenia',
      meta: dict.routes?.chinaMeta || 'Sea 35-45d · Rail 18-22d · Air 5-7d',
    },
    {
      id: 'russia',
      region: 'southAsia' as RegionId,
      flag: '🇷🇺',
      title: dict.routes?.russia || 'Russia → Armenia',
      meta: dict.routes?.russiaMeta || 'Road 7-10d · Rail 12-14d',
    },
    {
      id: 'germany',
      region: 'europe' as RegionId,
      flag: '🇩🇪',
      title: dict.routes?.germany || 'Germany → Armenia',
      meta: dict.routes?.germanyMeta || 'Road 10-14d · Air 3-5d',
    },
    {
      id: 'usa',
      region: 'americas' as RegionId,
      flag: '🇺🇸',
      title: dict.routes?.usa || 'USA → Armenia',
      meta: dict.routes?.usaMeta || 'Sea 40-50d · Air 5-8d',
    },
  ];

  // Generate deterministic grid dots shaped into the world continents
  const { dots, horizontalLines } = useMemo(() => {
    const dList: Dot[] = [];
    const hLines: { x1: number; y1: number; x2: number; y2: number; region: RegionId }[] = [];
    let dotId = 1;

    const addDot = (x: number, y: number, region: RegionId) => {
      dList.push({ id: dotId++, x, y, region });
    };

    // Europe & Africa (left side x: 50-250, y: 80-360)
    for (let y = 90; y <= 350; y += 14) {
      for (let x = 60; x <= 240; x += 14) {
        if (y < 130 && x < 120) continue;
        if (y > 230 && (x < 110 || x > 210)) continue;
        if (y > 310 && (x < 130 || x > 180)) continue;
        addDot(x, y, 'europe');
      }
    }

    // East Asia & Russia (middle top x: 260-480, y: 90-230)
    for (let y = 90; y <= 230; y += 14) {
      for (let x = 260; x <= 470; x += 14) {
        if (y < 120 && x > 440) continue;
        if (y > 200 && x > 440) continue;
        addDot(x, y, 'eastAsia');
      }
    }

    // Japan (middle right island x: 495-530, y: 150-200)
    for (let y = 150; y <= 195; y += 14) {
      for (let x = 495; x <= 525; x += 14) {
        addDot(x, y, 'japan');
      }
    }

    // South Asia & Oceania (middle bottom x: 290-510, y: 250-400)
    for (let y = 250; y <= 400; y += 14) {
      for (let x = 290; x <= 510; x += 14) {
        if (y < 280 && x > 420) continue;
        if (y > 340 && x < 360) continue;
        if (x > 410 && x < 440 && y < 310) continue;
        addDot(x, y, 'southAsia');
      }
    }

    // Americas (right side x: 580-840, y: 90-390)
    for (let y = 90; y <= 390; y += 14) {
      for (let x = 580; x <= 830; x += 14) {
        // North America
        if (y <= 220) {
          if (x < 610 || (y < 130 && x < 650) || (x > 770 && y < 160)) continue;
          addDot(x, y, 'americas');
        } else {
          // South America
          if (x < 670 || x > 770 || (y > 330 && (x < 690 || x > 750))) continue;
          addDot(x, y, 'americas');
        }
      }
    }

    // Connect adjacent dots in same row with horizontal lines for tech aesthetic
    for (let i = 0; i < dList.length; i++) {
      for (let j = i + 1; j < dList.length; j++) {
        if (dList[i].y === dList[j].y && Math.abs(dList[j].x - dList[i].x) <= 15 && dList[i].region === dList[j].region) {
          hLines.push({
            x1: dList[i].x,
            y1: dList[i].y,
            x2: dList[j].x,
            y2: dList[j].y,
            region: dList[i].region,
          });
        }
      }
    }

    return { dots: dList, horizontalLines: hLines };
  }, []);

  const armeniaCoords = { x: 295, y: 175 };

  // Calculate arc path from Yerevan HQ to target active region
  const activeArcPath = useMemo(() => {
    if (!activeRegion) return null;
    const badge = badges.find((b) => b.id === activeRegion);
    if (!badge) return null;
    const { x: tx, y: ty } = badge.targetCoords;
    const midX = (armeniaCoords.x + tx) / 2;
    const midY = Math.min(armeniaCoords.y, ty) - 45;
    return `M ${armeniaCoords.x} ${armeniaCoords.y} Q ${midX} ${midY} ${tx} ${ty}`;
  }, [activeRegion]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.gridContainer}>
        {/* Left Side: Interactive Dotted World Map */}
        <div className={styles.mapSection}>
          <svg viewBox="0 0 880 440" className={styles.svgMap}>
            {/* Connecting grid lines */}
            {horizontalLines.map((line, idx) => (
              <line
                key={idx}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                className={`${styles.dotLine} ${activeRegion === line.region ? styles.dotLineActive : ''}`}
              />
            ))}

            {/* Dotted Continents */}
            {dots.map((dot) => (
              <circle
                key={dot.id}
                cx={dot.x}
                cy={dot.y}
                r="3"
                className={`${styles.dot} ${activeRegion === dot.region ? styles.dotActive : ''}`}
                onMouseEnter={() => setActiveRegion(dot.region)}
              />
            ))}

            {/* Animated connection arc when hovering any region */}
            {activeArcPath && (
              <path d={activeArcPath} className={styles.arcLine} />
            )}

            {/* Yerevan HQ Center Node */}
            <g transform={`translate(${armeniaCoords.x}, ${armeniaCoords.y})`}>
              <circle r="16" fill="var(--cio-orange)" fillOpacity="0.25" />
              <circle r="7" className={styles.yerevanNode} />
            </g>
          </svg>

          {/* Floating Circular Badges Overlay */}
          {badges.map((badge) => {
            const isActive = activeRegion === badge.id;
            return (
              <div
                key={badge.id}
                className={`${styles.badgeWrap} ${isActive ? styles.badgeActive : ''}`}
                style={{ top: badge.top, left: badge.left }}
                onMouseEnter={() => setActiveRegion(badge.id)}
                onMouseLeave={() => setActiveRegion(null)}
              >
                <div className={styles.badgeTitle}>{badge.title}</div>
                <div className={styles.badgeCircle}>
                  <span className={styles.badgeNumber}>{badge.count}</span>
                  <span className={styles.badgeSub}>{badge.label}</span>
                </div>
              </div>
            );
          })}

          {/* Legend indicator */}
          <div className={styles.hqLegend}>
            <span className={styles.hqDot} />
            <span>Yerevan Headquarters</span>
          </div>
        </div>

        {/* Right Side: Interactive Corridor Route Cards */}
        <div className={styles.routesList}>
          {routeCards.map((card) => {
            const isActive = activeRegion === card.region;
            return (
              <div
                key={card.id}
                className={`${styles.routeCard} ${isActive ? styles.routeCardActive : ''}`}
                onMouseEnter={() => setActiveRegion(card.region)}
                onMouseLeave={() => setActiveRegion(null)}
              >
                <div className={styles.routeCardTitle}>
                  <span>{card.flag}</span>
                  <span>{card.title}</span>
                </div>
                <div className={styles.routeCardMeta}>{card.meta}</div>
              </div>
            );
          })}

          <Link href={`/${lang}/routes`} className="btn btn-secondary btn-full" style={{ marginTop: '8px' }}>
            {dict.routes?.exploreAll || 'Explore all 25+ routes'}
          </Link>
        </div>
      </div>
    </div>
  );
}
