import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Phone, FileText, CheckCircle2 } from 'lucide-react';
import { getDictionary } from '@/lib/dictionary';
import styles from './IndustryLayout.module.css';
import Partners from '@/components/Partners/Partners';

interface IndustryPageProps {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
}

export default async function IndustryPage(props: IndustryPageProps) {
  const params = await props.params;
  const rawLang = params.lang || 'en';
  const lang = (rawLang === 'ru' || rawLang === 'hy' ? rawLang : 'en') as 'en' | 'ru' | 'hy';
  const dict = await getDictionary(lang);

  // Fallback to English dictionary if the current language doesn't have the industryDetails yet
  let currentDict: any = dict;
  if (!currentDict.industryDetails) {
    currentDict = await getDictionary('en');
  }

  const industryData = currentDict.industryDetails?.[params.slug as keyof typeof currentDict.industryDetails];

  if (!industryData) {
    notFound();
  }

  // Generate list of all industries for the sidebar navigation
  const allSlugs = Object.keys(currentDict.industryDetails || {});

  return (
    <div className={styles.wrapper}>
      {/* Dark Hero Section */}
      <section 
        className={styles.hero}
        style={{ backgroundImage: `url(${industryData.image})` }}
      >
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{industryData.title}</h1>
          <p className={styles.heroIntro}>{industryData.intro1}</p>
          <div className={styles.heroCtaWrap}>
            <Link href={`/${lang}/quote`} className="btn btn-primary" style={{ display: 'inline-flex', padding: '12px 28px', marginTop: '32px' }}>
              Cost Calculation
            </Link>
          </div>
        </div>
      </section>

      {/* Main 2-Column Content */}
      <main className={styles.pageContainer}>
        
        {/* LEFT: Article Content */}
        <article className={styles.article}>
          
          <p>{industryData.intro2}</p>

          <img 
            src={industryData.image} 
            alt={industryData.title} 
            className={styles.articleImage} 
          />

          <h3 className={styles.benefitsTitle}>{industryData.benefitsTitle}</h3>
          
          <ul className={styles.benefitsList}>
            {industryData.benefits.map((benefit: string, idx: number) => {
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

          <p>{industryData.conclusion}</p>

          <div className={styles.ctaWrap}>
            <Link href={`/${lang}/contact`} className="btn btn-primary" style={{ display: 'inline-flex', padding: '12px 24px' }}>
              Contact Us
            </Link>
          </div>
        </article>

        {/* RIGHT: Sticky Sidebar */}
        <aside className={styles.sidebar}>
          
          {/* Navigation Widget */}
          <div className={styles.widget}>
            <div className={styles.widgetHeader}>
              CIO Logistics
            </div>
            <ul className={styles.widgetList}>
              {allSlugs.map((slugStr) => {
                // Map slug to short dictionary key
                const shortKeyMap: Record<string, string> = {
                  'e-commerce': 'ecommerce',
                  'pharmaceutical': 'pharma',
                  'automotive': 'auto',
                  'heavy-machinery': 'heavy',
                  'food-perishables': 'food',
                  'chemical': 'chemical',
                  'construction': 'construction',
                  'electronics': 'electronics'
                };
                
                const dictKey = shortKeyMap[slugStr] || slugStr;
                const shortTitle = dict.industries?.[dictKey as keyof typeof dict.industries] || currentDict.industryDetails[slugStr].title;

                return (
                  <li key={slugStr}>
                    <Link 
                      href={`/${lang}/industries/${slugStr}`}
                      className={`${styles.widgetLink} ${params.slug === slugStr ? styles.widgetLinkActive : ''}`}
                    >
                      {shortTitle}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact Widget */}
          <div className={styles.contactWidget}>
            <div className={styles.contactIcon}>
              <Phone size={24} />
            </div>
            <h3>Any questions?</h3>
            <p>Our specialists will contact you and help find an optimal logistics solution.</p>
            <Link href={`/${lang}/quote`} className="btn btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <FileText size={16} className="mr-2" /> Request consultation
            </Link>
          </div>
        </aside>

      </main>

      {/* Global Bottom Sections */}
      <Partners dict={dict} />
    </div>
  );
}
