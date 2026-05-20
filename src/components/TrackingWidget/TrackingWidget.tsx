'use client';

import React, { useState } from 'react';
import styles from './TrackingWidget.module.css';
import { Check, Clock, ShieldAlert, Truck, Loader2 } from 'lucide-react';

interface TimelineStep {
  status: 'completed' | 'active' | 'pending';
  title: string;
  desc: string;
  time: string;
}

interface TrackingResult {
  number: string;
  status: string;
  origin: string;
  destination: string;
  eta: string;
  weight: string;
  mode: string;
  steps: TimelineStep[];
}

interface TrackingWidgetProps {
  lang: 'en' | 'ru' | 'hy';
  dict: any;
}

export default function TrackingWidget({ lang, dict }: TrackingWidgetProps) {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<TrackingResult | null>(null);

  const mockData: Record<string, TrackingResult> = {
    'CIO-CN-9042': {
      number: 'CIO-CN-9042',
      status: 'In Transit',
      origin: 'Shanghai, CN',
      destination: 'Yerevan, AM',
      eta: 'May 28, 2026',
      weight: '18,400 kg',
      mode: 'Sea + Road (FCL)',
      steps: [
        { status: 'completed', title: 'Cargo Released at Destination', desc: 'Customs cleared at Yerevan Bonded Warehouse', time: 'May 20, 10:45 AM' },
        { status: 'active', title: 'In Transit to Final Delivery', desc: 'Local distribution truck dispatched', time: 'May 20, 08:30 AM' },
        { status: 'pending', title: 'Out for Delivery', desc: 'Arriving at client warehouse', time: 'Pending' },
        { status: 'pending', title: 'Delivered', desc: 'Signed proof of delivery', time: 'Pending' },
      ],
    },
    'CIO-DE-3029': {
      number: 'CIO-DE-3029',
      status: 'Delivered',
      origin: 'Frankfurt, DE',
      destination: 'Yerevan, AM',
      eta: 'Delivered',
      weight: '420 kg',
      mode: 'Air Freight (GDP Cold-Chain)',
      steps: [
        { status: 'completed', title: 'Picked Up', desc: 'Frankfurt Airport Warehouse GDP Acceptance', time: 'May 16, 09:15 AM' },
        { status: 'completed', title: 'Export Customs Cleared', desc: 'Frankfurt Customs Authorities Release', time: 'May 17, 11:30 AM' },
        { status: 'completed', title: 'Flight Departed', desc: 'LH-1568 departed Frankfurt Cargo', time: 'May 18, 02:40 PM' },
        { status: 'completed', title: 'Arrived Yerevan (EVN)', desc: 'Zvartnots cargo terminal intake, temperature 4°C verified', time: 'May 18, 09:10 PM' },
        { status: 'completed', title: 'Customs Cleared', desc: 'Import procedures completed under GDP guidelines', time: 'May 19, 10:00 AM' },
        { status: 'completed', title: 'Delivered', desc: 'Handed over to PharmaCorp Yerevan HQ. Temp logs signed.', time: 'May 19, 02:15 PM' },
      ],
    },
  };

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) {
      setError('Please enter a tracking number.');
      setResult(null);
      return;
    }

    setLoading(true);
    setError('');

    // Simulate network latency
    setTimeout(() => {
      setLoading(false);
      const code = trackingNumber.trim().toUpperCase();
      
      if (mockData[code]) {
        setResult(mockData[code]);
      } else {
        // Generate a random dynamic mock shipment for generic searches
        setResult({
          number: code,
          status: 'In Transit',
          origin: 'Europe Hub',
          destination: 'Yerevan, AM',
          eta: 'June 2, 2026',
          weight: '1,250 kg',
          mode: 'LTL Road Freight',
          steps: [
            { status: 'completed', title: 'Shipment Created', desc: 'Cargo booking confirmed', time: 'May 18, 09:00 AM' },
            { status: 'completed', title: 'Received at Hub', desc: 'Consolidation warehouse sorting', time: 'May 19, 04:30 PM' },
            { status: 'active', title: 'Departed Hub', desc: 'In transit via transit countries', time: 'May 20, 06:00 AM' },
            { status: 'pending', title: 'Customs Clearance', desc: 'EAEU border checkpoint entry', time: 'Pending' },
            { status: 'pending', title: 'Out for Delivery', desc: 'Last mile dispatch', time: 'Pending' },
          ],
        });
      }
    }, 1000);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleTrack} className={styles.inputGroup}>
        <input
          type="text"
          placeholder={dict.quickTools.trackPlaceholder}
          className={styles.input}
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          disabled={loading}
        />
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? <Loader2 className="animate-spin" size={18} /> : null}
          <span>{dict.quickTools.trackShipment}</span>
        </button>
      </form>

      {/* Info tips */}
      {!result && !loading && (
        <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          💡 Try entering: <strong style={{ color: 'var(--cio-orange)' }}>CIO-CN-9042</strong> or <strong style={{ color: 'var(--cio-orange)' }}>CIO-DE-3029</strong> to see realistic tracking workflows.
        </div>
      )}

      {error && (
        <div style={{ color: 'var(--error)', fontSize: '14px', marginTop: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ShieldAlert size={16} /> {error}
        </div>
      )}

      {/* Results View */}
      {result && (
        <div className={styles.results}>
          <div className={styles.header}>
            <div className={styles.infoTitle}>
              Shipment Status: <span style={{ color: 'var(--cio-orange)' }}>{result.number}</span>
            </div>
            <div className={styles.statusBadge}>
              {result.status}
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className={styles.summaryGrid}>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Route</span>
              <span className={styles.summaryValue}>{result.origin} → {result.destination}</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>ETA / Delivery</span>
              <span className={styles.summaryValue}>{result.eta}</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Weight</span>
              <span className={styles.summaryValue}>{result.weight}</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Transport Mode</span>
              <span className={styles.summaryValue}>{result.mode}</span>
            </div>
          </div>

          {/* Detailed Timeline */}
          <div className={styles.timeline}>
            {result.steps.map((step, idx) => (
              <div key={idx} className={styles.timelineItem}>
                <div className={`${styles.marker} ${step.status === 'active' ? styles.markerActive : step.status === 'completed' ? styles.markerCompleted : ''}`}>
                  {step.status === 'completed' ? (
                    <Check size={12} color="#fff" />
                  ) : step.status === 'active' ? (
                    <Truck size={12} color="#fff" />
                  ) : (
                    <div className={styles.markerInner} />
                  )}
                </div>
                <div className={styles.logContent}>
                  <div className={styles.logText}>
                    <span className={`${styles.logTitle} ${step.status === 'completed' ? styles.logTitleCompleted : ''}`}>
                      {step.title}
                    </span>
                    <span className={styles.logDesc}>{step.desc}</span>
                  </div>
                  <span className={styles.logTime}>{step.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
