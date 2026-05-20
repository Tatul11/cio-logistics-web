'use client';

import React, { useState } from 'react';
import styles from './InteractiveMap.module.css';

interface RouteData {
  id: string;
  name: string;
  flag: string;
  modes: string;
  time: string;
  coords: { x: number; y: number };
  curve: string;
}

interface InteractiveMapProps {
  lang: 'en' | 'ru' | 'hy';
  dict: any;
}

export default function InteractiveMap({ lang, dict }: InteractiveMapProps) {
  const [activeRoute, setActiveRoute] = useState<RouteData | null>(null);

  const routes: RouteData[] = [
    {
      id: 'china',
      name: dict.routes.china,
      flag: '🇨🇳',
      modes: 'Sea, Rail, Air',
      time: dict.routes.chinaMeta,
      coords: { x: 620, y: 200 },
      curve: 'M 620 200 Q 530 180 440 190',
    },
    {
      id: 'russia',
      name: dict.routes.russia,
      flag: '🇷🇺',
      modes: 'Road, Rail',
      time: dict.routes.russiaMeta,
      coords: { x: 420, y: 130 },
      curve: 'M 420 130 Q 430 160 440 190',
    },
    {
      id: 'germany',
      name: dict.routes.germany,
      flag: '🇩🇪',
      modes: 'Road, Air',
      time: dict.routes.germanyMeta,
      coords: { x: 320, y: 140 },
      curve: 'M 320 140 Q 380 150 440 190',
    },
    {
      id: 'usa',
      name: dict.routes.usa,
      flag: '🇺🇸',
      modes: 'Sea, Air',
      time: dict.routes.usaMeta,
      coords: { x: 180, y: 160 },
      curve: 'M 180 160 Q 310 120 440 190',
    },
    {
      id: 'uae',
      name: dict.routes.uae,
      flag: '🇦🇪',
      modes: 'Air, Sea+Road',
      time: dict.routes.uaeMeta,
      coords: { x: 480, y: 230 },
      curve: 'M 480 230 Q 460 210 440 190',
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.mapContainer}>
        {/* SVG World Map Simulation with animated bezier routes */}
        <svg viewBox="0 0 800 400" className={styles.svgMap}>
          {/* Rough SVG paths mimicking continental backgrounds */}
          <g fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1">
            <path d="M 50 100 L 250 100 L 250 250 L 50 250 Z" />
            <path d="M 280 80 L 500 80 L 500 200 L 280 200 Z" />
            <path d="M 520 100 L 750 100 L 750 300 L 520 300 Z" />
          </g>

          {/* Grid lines */}
          <line x1="0" y1="200" x2="800" y2="200" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="5,5" />
          <line x1="400" y1="0" x2="400" y2="400" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="5,5" />

          {/* Dynamic Flight/Ship paths */}
          {routes.map((route) => (
            <path
              key={route.id}
              d={route.curve}
              className={`${styles.lanePath} ${activeRoute?.id === route.id ? styles.activePath : ''}`}
            />
          ))}

          {/* Yerevan HQ Node (Center) */}
          <g transform="translate(440, 190)">
            <circle r="12" className={styles.pulse} fill="var(--cio-orange)" fillOpacity="0.4" />
            <circle r="6" className={styles.yerevanNode} />
          </g>

          {/* Destination Nodes */}
          {routes.map((route) => (
            <g
              key={route.id}
              transform={`translate(${route.coords.x}, ${route.coords.y})`}
              onMouseEnter={() => setActiveRoute(route)}
              onMouseLeave={() => setActiveRoute(null)}
            >
              <circle r="5" className={styles.node} />
              {activeRoute?.id === route.id && (
                <circle r="10" fill="none" stroke="var(--cio-orange)" strokeWidth="1.5" />
              )}
            </g>
          ))}
        </svg>

        {/* Dynamic Tooltip */}
        {activeRoute && (
          <div className={styles.tooltip}>
            <div className={styles.tooltipTitle}>
              <span>{activeRoute.flag}</span>
              <span>{activeRoute.name}</span>
            </div>
            <div className={styles.tooltipDetails}>
              <p style={{ marginBottom: '4px' }}>
                <strong>Modes:</strong> {activeRoute.modes}
              </p>
              <p>
                <strong>Transit:</strong> {activeRoute.time}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Legend and stats */}
      <div className={styles.legend}>
        <div>
          <span className={styles.legendDot}></span>
          <strong>Yerevan Headquarters</strong>
        </div>
        <div>
          <span>○ Hover destination points to see transit stats</span>
        </div>
      </div>
    </div>
  );
}
