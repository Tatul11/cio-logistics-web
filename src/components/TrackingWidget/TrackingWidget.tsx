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
    'CIO-AM-1045': {
      number: 'CIO-AM-1045',
      status: 'In Transit',
      origin: 'Moscow, RU',
      destination: 'Yerevan, AM',
      eta: 'June 1, 2026',
      weight: '21,500 kg',
      mode: 'FTL Road Freight (Reefer)',
      steps: [
        { status: 'completed', title: 'Cargo Loaded at Supplier', desc: 'Moscow Distribution Hub refrigerated loading', time: 'May 17, 08:00 AM' },
        { status: 'completed', title: 'Russian Export Customs Cleared', desc: 'Voronezh regional customs checkpoint release', time: 'May 18, 02:30 PM' },
        { status: 'active', title: 'Upper Lars Border Checkpoint', desc: 'Status: In Transit — Lars Checkpoint, Vladikavkaz priority pass', time: 'May 20, 11:15 AM' },
        { status: 'pending', title: 'Armenian Customs Clearance', desc: 'Bagratashen customs checkpoint entry', time: 'Pending' },
        { status: 'pending', title: 'Arrived at Yerevan Warehouse', desc: 'Final temperature log verification & unloading', time: 'Pending' },
      ],
    },
  };

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    runTracking(trackingNumber);
  };

  const runTracking = (codeToTrack: string) => {
    if (!codeToTrack.trim()) {
      setError('Please enter a tracking number.');
      setResult(null);
      return;
    }

    setLoading(true);
    setError('');

    setTimeout(() => {
      setLoading(false);
      const code = codeToTrack.trim().toUpperCase();
      
      if (mockData[code]) {
        setResult(mockData[code]);
      } else {
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
            { status: 'active', title: 'Departed Hub', desc: 'In transit via EAEU corridors', time: 'May 20, 06:00 AM' },
            { status: 'pending', title: 'Customs Clearance', desc: 'Border checkpoint entry', time: 'Pending' },
            { status: 'pending', title: 'Out for Delivery', desc: 'Last mile dispatch', time: 'Pending' },
          ],
        });
      }
    }, 600);
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

      {/* Clickable Sample Tracking Badges per D-12 */}
      <div style={{ fontSize: '13.5px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginTop: '14px' }}>
        <span>💡 Test live samples:</span>
        {['CIO-CN-9042', 'CIO-DE-3029', 'CIO-AM-1045'].map((sampleCode) => (
          <button
            key={sampleCode}
            type="button"
            onClick={() => {
              setTrackingNumber(sampleCode);
              runTracking(sampleCode);
            }}
            style={{
              background: 'var(--bg-white)',
              border: '1px solid var(--cio-orange)',
              color: 'var(--cio-orange)',
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {sampleCode}
          </button>
        ))}
      </div>

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
