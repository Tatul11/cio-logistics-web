import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDictionary } from '@/lib/dictionary';
import styles from './SingleService.module.css';

interface SingleServicePageProps {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
}

export default async function SingleServicePage(props: SingleServicePageProps) {
  const params = await props.params;
  const rawLang = params.lang || 'en';
  const lang = (rawLang === 'ru' || rawLang === 'hy' ? rawLang : 'en') as 'en' | 'ru' | 'hy';
  const slug = params.slug;

  const dict = await getDictionary(lang);
  const enDict = await getDictionary('en');

  const hubData = (dict as any).newServicesHub || (enDict as any).newServicesHub;
  const singleData = (dict as any).newServiceSingle || (enDict as any).newServiceSingle;

  // Find the specific service data
  const service = hubData.services.find((s: any) => s.slug === slug);
  
  if (!service) {
    notFound();
  }

  return (
    <div className={styles.wrapper}>
      {/* 1. Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroTop}>
            <div className={styles.heroTopLeft}>
              <div className={styles.heroEyebrow}>CIO LOGISTICS</div>
              <h1 className={styles.heroTitle}>{service.title}</h1>
              <p className={styles.heroDesc}>{service.desc}</p>
              <Link href={`/${lang}/contact`} className={styles.heroContactBtn}>
                {hubData.contactBtn}
              </Link>
            </div>

            <div className={styles.heroTopRight}>
              <img
                src={service.image}
                alt={service.title}
                className={styles.heroSecondaryImage}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Progress Section */}
      <section className={styles.progressSection}>
        <div className="container">
          <div className={styles.progressGrid}>
            <div className={styles.progressHeader}>
              <h2>{singleData.progressTitle}</h2>
              <p>{singleData.progressDesc}</p>
              <Link href={`/${lang}/about`} className={styles.moreInfoBtn}>
                {singleData.moreInfo}
              </Link>
            </div>

            <div className={styles.statsContainer}>
              <img src="/images/map-dots.png" alt="Map" className={styles.statsMap} />
              <div className={styles.statsGrid}>
                {singleData.stats.map((stat: any, idx: number) => (
                  <div key={idx} className={styles.statItem}>
                    <span className={styles.statNum}>{stat.val}</span>
                    <span className={styles.statText}>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Tape Divider */}
      <div className={styles.tapeDivider}>
        <div className={styles.tapeTrack}>
          {/* Repeat enough times to scroll seamlessly */}
          {[...Array(10)].map((_, i) => (
            <span key={i} className={styles.tapeText}>{singleData.tapeText}</span>
          ))}
        </div>
      </div>

      {/* 4. How We Work */}
      <section className={styles.workSection}>
        <div className="container">
          <div className={styles.workGrid}>
            
            <div>
              <div className={styles.workHeader}>
                <h2>{singleData.howWeWorkTitle}</h2>
                <p>{singleData.howWeWorkDesc}</p>
              </div>

              <div className={styles.stepsList}>
                {singleData.steps.map((step: any, idx: number) => (
                  <div key={idx} className={styles.stepItem}>
                    <div className={styles.stepNum}>{step.num}</div>
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.workVisuals}>
              {/* Using high-quality unsplash placeholders since we don't have the exact PNGs */}
              <img 
                src="/images/frank-mckenna-tjX_sniNzgQ-unsplash.webp" 
                alt="Container" 
                className={styles.craneContainer} 
                style={{ borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
              />
              <img 
                src="/images/john-simmons-XFLk8qZ-6MA-unsplash.webp" 
                alt="Boxes" 
                className={styles.boxesImage} 
                style={{ borderRadius: '16px', border: '4px solid #fff' }}
              />
            </div>
            
          </div>
        </div>
      </section>

    </div>
  );
}
