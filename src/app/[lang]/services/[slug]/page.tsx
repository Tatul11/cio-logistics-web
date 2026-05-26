import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Phone, FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import { getDictionary } from '@/lib/dictionary';
import styles from './ServiceLayout.module.css';
import Partners from '@/components/Partners/Partners';

interface ServicePageProps {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
}

export default async function ServicePage(props: ServicePageProps) {
  const params = await props.params;
  const rawLang = params.lang || 'en';
  const lang = (rawLang === 'ru' || rawLang === 'hy' ? rawLang : 'en') as 'en' | 'ru' | 'hy';
  const dict = await getDictionary(lang);

  // Fallback to English dictionary if the current language doesn't have the serviceDetails yet
  let currentDict: any = dict;
  if (!currentDict.serviceDetails) {
    currentDict = await getDictionary('en');
  }

  const serviceData = currentDict.serviceDetails?.[params.slug as keyof typeof currentDict.serviceDetails];

  if (!serviceData) {
    notFound();
  }

  // Generate list of all services for the sidebar navigation
  const allSlugs = Object.keys(currentDict.serviceDetails || {});

  // Hardcode navigation translations for sidebar if not mapped properly in the object yet
  const formatSlugName = (slug: string) => {
    return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className={styles.wrapper}>
      {/* Dark Hero Section */}
      <section 
        className={styles.hero}
        style={{ backgroundImage: `url(${serviceData.image})` }}
      >
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{serviceData.title}</h1>
          <p className={styles.heroIntro}>{serviceData.intro1}</p>
          <div className={styles.heroCtaWrap}>
            <Link href={`/${lang}/quote`} className="btn btn-primary" style={{ display: 'inline-flex', padding: '12px 28px', marginTop: '32px' }}>
              {dict.nav?.getQuote || "Cost Calculation"}
            </Link>
          </div>
        </div>
      </section>

      {/* Main 2-Column Content */}
      <main className={styles.pageContainer}>
        
        {/* LEFT: Article Content */}
        <article className={styles.article}>
          
          <p>{serviceData.intro2}</p>

          <img 
            src={serviceData.image} 
            alt={serviceData.title} 
            className={styles.articleImage} 
          />

          <h3 className={styles.benefitsTitle}>{serviceData.benefitsTitle}</h3>
          
          <ul className={styles.benefitsList}>
            {serviceData.benefits.map((benefit: string, idx: number) => {
              // Highlight the first part of the bullet point (before the colon)
              const parts = benefit.split(':');
              return (
                <li key={idx}>
                  <CheckCircle2 size={20} className={styles.checkIcon} />
                  <div>
                    {parts.length > 1 ? (
                      <>
                        <strong>{parts[0]}:</strong>{parts.slice(1).join(':')}
                      </>
                    ) : (
                      benefit
                    )}
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Certifications Injection */}
          <div className={styles.sectionBlock}>
            <h3 className={styles.benefitsTitle} style={{ margin: '0 0 16px 0' }}>Accreditations & Compliance</h3>
            <p style={{ margin: 0 }}>This service operates under our strict global compliance framework.</p>
            <div className={styles.certListRow}>
              <div className={styles.certBadgeItem}>ISO 9001:2015</div>
              <div className={styles.certBadgeItem}>FIATA Member</div>
              <div className={styles.certBadgeItem}>IATA Cargo Agent</div>
              <div className={styles.certBadgeItem}>IRU Accredited</div>
            </div>
          </div>

          {/* CTA Banner Injection */}
          <div className={styles.ctaBanner}>
            <h3>Ready to optimize your supply chain?</h3>
            <p>Get a personalized freight rate and route optimization plan within 2 hours.</p>
            <Link href={`/${lang}/quote`} className="btn" style={{ background: '#fff', color: 'var(--cio-orange)', fontWeight: 700, padding: '14px 32px' }}>
              Request a Quote
            </Link>
          </div>

          {/* Partners Component Injection */}
          <div className={styles.sectionBlock} style={{ paddingBottom: '20px' }}>
            <h3 className={styles.benefitsTitle} style={{ margin: '0 0 24px 0', textAlign: 'center' }}>Trusted by Industry Leaders</h3>
            <Partners dict={dict} />
          </div>

        </article>

        {/* RIGHT: Sidebar Navigation & Contact Widget */}
        <aside className={styles.sidebar}>
          
          {/* Services Navigation Menu */}
          <div className={styles.navCard}>
            <h3 className={styles.navCardTitle}>{dict.nav?.services || "All Services"}</h3>
            <nav className={styles.navMenu}>
              {allSlugs.map((slug) => {
                const isActive = slug === params.slug;
                const linkName = currentDict.serviceDetails[slug]?.title || formatSlugName(slug);
                return (
                  <Link 
                    key={slug} 
                    href={`/${lang}/services/${slug}`}
                    className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                  >
                    {linkName}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Contact Widget */}
          <div className={styles.contactWidget}>
            <div className={styles.contactWidgetIcon}>
              <Phone size={24} />
            </div>
            <h4 className={styles.contactWidgetTitle}>{dict.nav?.supportTitle || "Need Assistance?"}</h4>
            <p className={styles.contactWidgetText}>
              {dict.nav?.supportText || "Our logistics experts are available 24/7 to solve your transport challenges."}
            </p>
            <a href="tel:+37495211121" className={styles.contactWidgetPhone}>
              +(374) 95 211 121
            </a>
            <Link href={`/${lang}/about`} className="btn" style={{ width: '100%', background: 'rgba(255,255,255,0.1)', color: '#fff' }}>
              <FileText size={16} style={{ marginRight: '8px' }} />
              Contact Team
            </Link>
          </div>

        </aside>

      </main>
    </div>
  );
}
