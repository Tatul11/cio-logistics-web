"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AnimatedCounter from '@/components/AnimatedCounter/AnimatedCounter';

interface LiveRatesStripProps {
  dict: any;
  lang: string;
}

interface RatesData {
  usd: number;
  eur: number;
  rub?: number;
  cny?: number;
}

export default function LiveRatesStrip({ dict, lang }: LiveRatesStripProps) {
  const [rates, setRates] = useState<RatesData>({ usd: 385, eur: 420 });

  useEffect(() => {
    fetch('/api/rates')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.usd && data.eur) {
          setRates(data);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch live rates:', err);
      });
  }, []);

  return (
    <section style={{ padding: '12px 0', borderBottom: 'none', background: 'var(--cio-orange)', color: '#fff', overflow: 'hidden' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '16px', fontSize: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ 
              display: 'inline-block', 
              width: '8px', 
              height: '8px', 
              borderRadius: '50%', 
              backgroundColor: '#4ade80', 
              boxShadow: '0 0 8px #4ade80',
              animation: 'pulse 2s infinite'
            }} />
            <strong style={{ color: '#fff', letterSpacing: '0.3px' }}>{dict.quickTools?.liveRates || "Live Rates"}:</strong>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '14px', fontWeight: 700, color: '#fff' }}>
            <span>
              USD <AnimatedCounter value={rates.usd} duration={1500} /> AMD
            </span>
            <span style={{ opacity: 0.5 }}>•</span>
            <span>
              EUR <AnimatedCounter value={rates.eur} duration={1500} /> AMD
            </span>
            {rates.rub && (
              <>
                <span style={{ opacity: 0.5 }}>•</span>
                <span>
                  RUB <AnimatedCounter value={rates.rub} duration={1500} /> AMD
                </span>
              </>
            )}
            {rates.cny && (
              <>
                <span style={{ opacity: 0.5 }}>•</span>
                <span>
                  CNY <AnimatedCounter value={rates.cny} duration={1500} /> AMD
                </span>
              </>
            )}
          </div>
        </div>

        <div>
          <Link href={`/${lang}/contact`} className="btn" style={{ background: '#fff', color: 'var(--cio-orange)', padding: '6px 14px', fontSize: '12.5px', height: '32px', border: 'none', fontWeight: 700 }}>
            {dict.quickTools?.talkToExpert || "Talk to Expert"}
          </Link>
        </div>
      </div>
    </section>
  );
}
