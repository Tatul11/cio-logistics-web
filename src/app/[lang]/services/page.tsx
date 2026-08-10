import React from 'react';
import Link from 'next/link';
import { getDictionary } from '@/lib/dictionary';
import styles from './ServicesPage.module.css';
import { Star } from 'lucide-react';

interface ServicesPageProps {
  params: Promise<{
    lang: string;
  }>;
}

export default async function ServicesPage(props: ServicesPageProps) {
  const params = await props.params;
  const rawLang = params.lang || 'en';
  const lang = (rawLang === 'ru' || rawLang === 'hy' ? rawLang : 'en') as 'en' | 'ru' | 'hy';
  const dict = await getDictionary(lang);
  const enDict = await getDictionary('en');

  const hubData = (dict as any).newServicesHub || (enDict as any).newServicesHub;

  return (
    <div className={styles.wrapper}>
      
      {/* 1. Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroTextWrap}>
            <h1 className={styles.heroTitle}>
              {hubData.heroTitle.split('\n').map((line: string, i: number) => {
                if (i === 0) {
                  return (
                    <React.Fragment key={i}>
                      {line}
                      <br />
                    </React.Fragment>
                  );
                }
                const words = line.split(' ');
                const accent = words.pop();
                return (
                  <React.Fragment key={i}>
                    {words.join(' ')} <span className={styles.heroTitleAccent}>{accent}</span>
                  </React.Fragment>
                );
              })}
            </h1>
            <p className={styles.heroSubtitle}>{hubData.heroSubtitle}</p>
          </div>

          <div className={styles.heroImageWrap}>
            <img
              src="/images/rinson-chory-2vPGGOU-wLA-unsplash.webp"
              alt="Container ship at sea"
              className={styles.heroImage}
            />

            <div className={styles.heroOverlayRow}>
              <div className={styles.heroBadge}>
                <span className={styles.avatarStack}>
                  <span className={styles.avatarDot} style={{ background: '#0199F8' }} />
                  <span className={styles.avatarDot} style={{ background: '#EC1C28' }} />
                  <span className={styles.avatarDot} style={{ background: '#0F1B24' }} />
                </span>
                <span className={styles.heroBadgeText}>
                  <strong>{hubData.stat2Val}</strong>
                  {hubData.stat2Label}
                </span>
              </div>

              <div className={styles.heroCtaGroup}>
                <Link href={`/${lang}/contact`} className={styles.heroCtaPrimary}>
                  {hubData.heroCta}
                </Link>
                <Link href={`/${lang}/contact`} className={styles.heroCtaSecondary}>
                  {hubData.contactBtn}
                </Link>
              </div>

              <div className={`${styles.heroBadge} ${styles.heroBadgeLight}`}>
                <span className={styles.heroBadgeIconStar}>
                  <Star size={16} fill="currentColor" />
                </span>
                <span className={styles.heroBadgeText}>
                  <strong>{hubData.stat3Val}</strong>
                  {hubData.stat3Label}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. World Map Section */}
      <section className={styles.worldSection}>
        <div className="container">
          <div className={styles.worldGrid}>
            <div>
              <img src="/images/map-dots.png" alt="World Map" className={styles.worldMap} style={{ opacity: 0.1 }} />
            </div>
            <div className={styles.worldContent}>
              <h3>{hubData.worldEyebrow}</h3>
              <h2>{hubData.worldTitle}</h2>
              <p>{hubData.worldDesc}</p>
              
              <div className={styles.worldImages}>
                <div className={styles.worldImgCard}>
                  <img src="/images/elevate-dI-aXC7DWpQ-unsplash.webp" alt="Ship" />
                </div>
                <div className={styles.worldImgCard}>
                  <img src="/images/frank-mckenna-tjX_sniNzgQ-unsplash.webp" alt="Port" />
                </div>
                <div className={styles.worldImgCard}>
                  <img src="/images/john-simmons-XFLk8qZ-6MA-unsplash.webp" alt="Cranes" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Services Showcase */}
      <section className={styles.showcaseSection}>
        <div className="container">
          <div className={styles.showcaseHeader}>
            <h2 className={styles.showcaseTitle}>{hubData.servicesTitle}</h2>
            <p className={styles.showcaseSubtitle}>{hubData.servicesSubtitle}</p>
          </div>

          <div className={styles.showcaseList}>
            {hubData.services.map((srv: any, idx: number) => (
              <div
                key={idx}
                className={`${styles.showcaseCard} ${idx % 2 === 1 ? styles.showcaseCardReverse : ''}`}
              >
                <div className={styles.showcaseMockup}>
                  <div className={styles.showcaseMockupDots}>
                    <span />
                    <span />
                    <span />
                  </div>
                  <img src={srv.image} alt={srv.title} className={styles.showcaseMockupImg} />
                </div>

                <div className={styles.showcaseContent}>
                  <h3>{srv.title}</h3>
                  <p>{srv.desc}</p>
                  <Link href={`/${lang}/services/${srv.slug}`} className={styles.showcaseBtn}>
                    {hubData.exploreBtn}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Certifications */}
      <section className={styles.certSection}>
        <div className="container">
          <div className={styles.certHeader}>
            <div className={styles.certEyebrow}>{hubData.certEyebrow}</div>
            <h2 className={styles.certTitle}>{hubData.certTitle}</h2>
            <p className={styles.certDesc}>{hubData.certDesc}</p>
          </div>
          
          <div className={styles.certGrid}>
            <div className={styles.certCard}>
              <div className={styles.certIcon}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/e/e0/ISO_9001-2015.svg" style={{ width: '100%', opacity: 0.8 }} alt="ISO" />
              </div>
              <h4>ISO 9001:2015</h4>
              <p>Quality Management</p>
            </div>
            <div className={styles.certCard}>
              <div className={styles.certIcon}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/1/1a/Fiata_logo.svg" style={{ width: '100%', opacity: 0.8 }} alt="FIATA" />
              </div>
              <h4>FIATA Member</h4>
              <p>Freight Forwarders</p>
            </div>
            <div className={styles.certCard}>
              <div className={styles.certIcon}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/69/IATA_logo.svg" style={{ width: '100%', opacity: 0.8 }} alt="IATA" />
              </div>
              <h4>IATA Certified</h4>
              <p>Air Cargo Agent</p>
            </div>
            <div className={styles.certCard}>
              <div className={styles.certIcon}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/4/4e/IRU_logo.svg" style={{ width: '100%', opacity: 0.8 }} alt="IRU" />
              </div>
              <h4>IRU Member</h4>
              <p>Road Transport</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
