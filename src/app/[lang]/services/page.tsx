import React from 'react';
import Link from 'next/link';
import { getDictionary } from '@/lib/dictionary';
import styles from './ServicesPage.module.css';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

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
        <div className="container" style={{ position: 'relative' }}>
          <h1 className={styles.heroTitle}>
            {hubData.heroTitle.split('\n').map((line: string, i: number) => (
              <React.Fragment key={i}>
                {i === 1 ? <span>{line}</span> : line}
                {i === 0 && <br />}
              </React.Fragment>
            ))}
          </h1>
          
          <Link href={`/${lang}/contact`} className={styles.heroContactBtn}>
            {hubData.contactBtn}
          </Link>

          <div className={styles.heroImageWrap}>
            <img 
              src="/images/chuttersnap-kyCNGGKCvyw-unsplash.webp" 
              alt="Container Ship" 
              className={styles.heroImage}
              style={{ objectPosition: 'center 30%', height: '400px' }}
            />
            
            <div className={styles.heroStatsCard}>
              <div className={styles.heroStat}>
                <span className={styles.statVal}>{hubData.stat1Val}</span>
                <span className={styles.statLabel}>{hubData.stat1Label}</span>
              </div>
              <div className={styles.heroStat}>
                <span className={styles.statVal}>{hubData.stat2Val}</span>
                <span className={styles.statLabel}>{hubData.stat2Label}</span>
              </div>
              <div className={styles.heroStat}>
                <span className={styles.statVal}>{hubData.stat3Val}</span>
                <span className={styles.statLabel}>{hubData.stat3Label}</span>
              </div>
              <button className={styles.scrollDownBtn}>
                <ArrowDown size={24} />
              </button>
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

      {/* 3. Services Grid */}
      <section className={styles.servicesSection}>
        <div className="container">
          <h2 className={styles.servicesTitle}>{hubData.servicesTitle}</h2>
          <div className={styles.servicesGrid}>
            {hubData.services.map((srv: any, idx: number) => (
              <div key={idx} className={styles.serviceCard}>
                <img src={srv.image} alt={srv.title} className={styles.serviceImg} />
                <div className={styles.serviceContent}>
                  <h3>{srv.title}</h3>
                  <p>{srv.desc}</p>
                  <Link href={`/${lang}/services/${srv.slug}`} className={styles.serviceLink}>
                    Learn More <ArrowUpRight size={18} />
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
