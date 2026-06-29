import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Phone, FileText, CheckCircle2, ArrowRight, Download, ChevronRight, ShieldCheck, Clock, MapPin, Truck, Ship, Plane, HelpCircle } from 'lucide-react';
import { getDictionary } from '@/lib/dictionary';
import styles from './IndustryLayout.module.css';
import Partners from '@/components/Partners/Partners';
import OtherIndustries from '@/components/OtherIndustries/OtherIndustries';

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
  const enDict = await getDictionary('en');

  // Fallback to English dictionary if the current language doesn't have the industryDetails yet
  let currentDict: any = dict;
  if (!currentDict.industryDetails) {
    currentDict = enDict;
  }

  const industryData = currentDict.industryDetails?.[params.slug as keyof typeof currentDict.industryDetails];

  if (!industryData) {
    notFound();
  }

  // Fallback products array to English if missing in current language
  if (!industryData.products) {
    const enIndustryData = (enDict as any).industryDetails?.[params.slug as keyof typeof currentDict.industryDetails];
    if (enIndustryData && enIndustryData.products) {
      industryData.products = enIndustryData.products;
      industryData.productsTitle = enIndustryData.productsTitle;
    }
  }

  // Generate list of all industries for the sidebar navigation
  const allSlugs = Object.keys(currentDict.industryDetails || {});

  return (
    <div className={styles.wrapper}>
      {/* 1. DARK HERO SECTION WITH BREADCRUMBS & CTA */}
      <section 
        className={styles.hero}
        style={{ backgroundImage: `url(${industryData.image})` }}
      >
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          
          {/* Breadcrumbs */}
          <div className={styles.heroBreadcrumbs}>
            <Link href={`/${lang}`}>Home</Link>
            <ChevronRight size={14} />
            <Link href={`/${lang}/services`}>Industries</Link>
            <ChevronRight size={14} />
            <span style={{ color: '#ffffff', fontWeight: 600 }}>{industryData.title}</span>
          </div>

          {/* Eyebrow */}
          <div className={styles.heroEyebrow}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--cio-red)' }}></span>
            Industry Solution
          </div>

          <h1 className={styles.heroTitle}>{industryData.title}</h1>
          <p className={styles.heroIntro}>{industryData.intro1}</p>
          
          <div className={styles.heroCtaWrap}>
            <Link href={`/${lang}/quote`} className="btn btn-primary" style={{ padding: '14px 32px', fontSize: '16px' }}>
              Cost Calculation
            </Link>
            <Link href={`/${lang}/contact`} className={styles.btnGhostHero}>
              Ask a Question
            </Link>
          </div>
        </div>
      </section>

      {/* 2. STATS STRIP BELOW HERO */}
      <div className={styles.statsBar}>
        <div className={styles.statsContainer}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>150+</span>
            <span className={styles.statLabel}>Countries & Corridors</span>
          </div>
          <div className={styles.statItem}>
            <span className={`${styles.statNumber} ${styles.statNumberHighlight}`}>-32%</span>
            <span className={styles.statLabel}>Transit Cost Optimization</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>Weekly</span>
            <span className={styles.statLabel}>Scheduled Departures</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>98.4%</span>
            <span className={styles.statLabel}>On-Time Delivery Rate</span>
          </div>
        </div>
      </div>

      {/* 3. MAIN 2-COLUMN CONTENT */}
      <main className={styles.pageContainer}>
        
        {/* LEFT: Article & Benefits */}
        <article className={styles.article}>
          
          <p style={{ fontSize: '17px', color: 'var(--cio-navy)', fontWeight: 500 }}>
            {industryData.intro2}
          </p>

          <img 
            src={industryData.image} 
            alt={industryData.title} 
            className={styles.articleImage} 
          />

          <h2 className={styles.benefitsTitle}>
            {industryData.benefitsTitle || "The key benefits of working with CIO Logistics"}
          </h2>
          <p className={styles.benefitsSubtitle}>
            Why top industry leaders trust our freight forwarding network for their critical shipments.
          </p>
          
          {/* 2-Column Benefits Grid */}
          <div className={styles.benefitsGrid}>
            {industryData.benefits.map((benefit: string, idx: number) => {
              const parts = benefit.split(':');
              const title = parts.length > 1 ? parts[0].trim() : `Advantage ${idx + 1}`;
              const desc = parts.length > 1 ? parts.slice(1).join(':').trim() : benefit;

              return (
                <div key={idx} className={styles.benefitCard}>
                  <div className={styles.benefitCardTitle}>{title}</div>
                  <div className={styles.benefitCardDesc}>{desc}</div>
                </div>
              );
            })}
          </div>

          {/* Commonly Transported Products Box */}
          {industryData.products && industryData.products.length > 0 && (
            <div className={styles.productsWrap}>
              <h3>{industryData.productsTitle || "Commonly Transported Products"}</h3>
              <p className={styles.productsSubtitle}>
                Specialized handling protocols for standard, fragile, and high-value cargo in this category.
              </p>
              <div className={styles.productsGrid}>
                {industryData.products.map((product: string, idx: number) => (
                  <span key={idx} className={styles.productTag}>
                    {product}
                  </span>
                ))}
              </div>
            </div>
          )}

          <p style={{ marginTop: '32px' }}>{industryData.conclusion}</p>

          <div className={styles.ctaWrap}>
            <Link href={`/${lang}/quote`} className="btn btn-primary" style={{ display: 'inline-flex', padding: '14px 32px', fontSize: '16px', alignItems: 'center', gap: '8px' }}>
              Calculate Freight Cost <ArrowRight size={18} />
            </Link>
          </div>
        </article>

        {/* RIGHT: Sticky Sidebar */}
        <aside className={styles.sidebar}>
          
          {/* Navigation Widget */}
          <div className={styles.widget}>
            <div className={styles.widgetHeader}>
              INDUSTRIES
            </div>
            <ul className={styles.widgetList}>
              {allSlugs.map((slugStr) => {
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

                const isActive = params.slug === slugStr;

                return (
                  <li key={slugStr}>
                    <Link 
                      href={`/${lang}/industries/${slugStr}`}
                      className={`${styles.widgetLink} ${isActive ? styles.widgetLinkActive : ''}`}
                    >
                      <span>{shortTitle}</span>
                      {isActive && <ChevronRight size={16} />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact / Request Quote Widget */}
          <div className={styles.contactWidget}>
            <div className={styles.contactIcon}>
              <Phone size={26} />
            </div>
            <h3>Request a Quote</h3>
            <p>Need a customized transit estimate or specialized customs clearance? Speak directly with our team.</p>
            <Link href={`/${lang}/quote`} className="btn btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '14px', fontSize: '15px' }}>
              <FileText size={18} className="mr-2" /> Request consultation
            </Link>
          </div>
        </aside>

      </main>

      {/* 4. LOGISTICS SOLUTIONS STRIP ("A complete fulfillment stack") */}
      <section className={styles.sectionSolutions}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionEyebrow}>LOGISTICS SOLUTIONS</span>
          <h2 className={styles.sectionTitle}>A complete fulfillment stack</h2>
        </div>
        <div className={styles.solutionsGrid}>
          <div className={styles.solutionCard}>
            <Truck size={28} style={{ color: 'var(--cio-red)', marginBottom: '8px' }} />
            <h4>Multimodal Freight</h4>
            <p>Seamless combination of air, sea, road, and rail transport designed to minimize transit times and costs.</p>
          </div>
          <div className={styles.solutionCard}>
            <ShieldCheck size={28} style={{ color: 'var(--cio-red)', marginBottom: '8px' }} />
            <h4>Customs Brokerage</h4>
            <p>Fast, error-free customs clearance across Armenia and international border points with full legal support.</p>
          </div>
          <div className={styles.solutionCard}>
            <MapPin size={28} style={{ color: 'var(--cio-red)', marginBottom: '8px' }} />
            <h4>Warehouse Storage</h4>
            <p>Secure, bonded, and temperature-controlled consolidation hubs ready for short or long-term storage.</p>
          </div>
          <div className={styles.solutionCard}>
            <Clock size={28} style={{ color: 'var(--cio-red)', marginBottom: '8px' }} />
            <h4>Last-Mile Delivery</h4>
            <p>Reliable door-to-door distribution straight to your retail stores, warehouses, or end customers.</p>
          </div>
        </div>
      </section>

      {/* OTHER INDUSTRIES SLIDER COMPONENT */}
      <OtherIndustries currentSlug={params.slug} lang={lang} dict={dict} />

      {/* 5. CASE STUDIES STRIP */}
      <section className={styles.sectionCaseStudies}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionEyebrow}>CASE STUDIES</span>
          <h2 className={styles.sectionTitle}>Case Studies — How We Deliver</h2>
        </div>
        <div className={styles.caseStudiesGrid}>
          <div className={styles.caseStudyCard}>
            <div className={styles.caseStudyImageWrap}>
              <img src="/images/chuttersnap-fN603qcEA7g-unsplash.webp" alt="Sea Freight" className={styles.caseStudyImage} />
              <span className={styles.caseStudyBadge}>SEA FREIGHT</span>
            </div>
            <div className={styles.caseStudyBody}>
              <h3 className={styles.caseStudyTitle}>Shanghai → Yerevan FCL Consolidation</h3>
              <p className={styles.caseStudyDesc}>Optimizing container routing via Poti port to cut transit bottlenecks for a major commercial retail importer.</p>
              <div className={styles.caseStudyMetric}>
                <span className={styles.caseStudyMetricVal}>-25%</span>
                <span className={styles.caseStudyMetricLabel}>Cost Reduction</span>
              </div>
            </div>
          </div>

          <div className={styles.caseStudyCard}>
            <div className={styles.caseStudyImageWrap}>
              <img src="/images/arno-senoner-u2OdNnrksIk-unsplash.webp" alt="Air Freight" className={styles.caseStudyImage} />
              <span className={styles.caseStudyBadge}>AIR FREIGHT</span>
            </div>
            <div className={styles.caseStudyBody}>
              <h3 className={styles.caseStudyTitle}>Urgent Medical & Pharma Transit</h3>
              <p className={styles.caseStudyDesc}>Unbroken GDP cold chain delivery of temperature-sensitive medical supplies from Europe within 48 hours.</p>
              <div className={styles.caseStudyMetric}>
                <span className={styles.caseStudyMetricVal}>48 Hrs</span>
                <span className={styles.caseStudyMetricLabel}>Express Delivery</span>
              </div>
            </div>
          </div>

          <div className={styles.caseStudyCard}>
            <div className={styles.caseStudyImageWrap}>
              <img src="/images/william-william-NndKt2kF1L4-unsplash.webp" alt="Road Freight" className={styles.caseStudyImage} />
              <span className={styles.caseStudyBadge}>ROAD FREIGHT</span>
            </div>
            <div className={styles.caseStudyBody}>
              <h3 className={styles.caseStudyTitle}>European Groupage & Trucking</h3>
              <p className={styles.caseStudyDesc}>Weekly consolidated LTL shipments connecting European manufacturing hubs directly to warehouse facilities.</p>
              <div className={styles.caseStudyMetric}>
                <span className={styles.caseStudyMetricVal}>Weekly</span>
                <span className={styles.caseStudyMetricLabel}>Regular Departures</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <section className={styles.sectionFaq}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionEyebrow}>KNOWLEDGE BASE</span>
          <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
        </div>
        <div className={styles.faqList}>
          <details className={styles.faqItem}>
            <summary className={styles.faqSummary}>Do you offer door-to-door shipping solutions for this industry?</summary>
            <div className={styles.faqAnswer}>
              Yes, we handle the entire logistics chain from the supplier&apos;s warehouse or factory directly to your store, warehouse, or distribution center in Armenia and worldwide.
            </div>
          </details>
          <details className={styles.faqItem}>
            <summary className={styles.faqSummary}>How long does customs clearance take in Armenia?</summary>
            <div className={styles.faqAnswer}>
              With all required documentation prepared in advance by our expert customs brokerage team, standard customs clearance typically takes 1 to 2 business days.
            </div>
          </details>
          <details className={styles.faqItem}>
            <summary className={styles.faqSummary}>Can you transport temperature-sensitive or hazardous products?</summary>
            <div className={styles.faqAnswer}>
              Absolutely. We provide certified cold chain logistics for pharmaceuticals and perishables, as well as ADR/IMDG certified handling for chemical and hazardous materials.
            </div>
          </details>
          <details className={styles.faqItem}>
            <summary className={styles.faqSummary}>How can I track the exact location of my cargo?</summary>
            <div className={styles.faqAnswer}>
              Every client receives access to our digital tracking platform and a dedicated personal account manager for continuous, real-time updates on freight status.
            </div>
          </details>
        </div>
      </section>

      {/* 7. DOWNLOAD OVERVIEW STRIP */}
      <div className={styles.overviewStripWrap}>
        <div className={styles.overviewStrip}>
          <div className={styles.overviewStripLeft}>
            <div className={styles.overviewIconWrap}>
              <Download size={24} />
            </div>
            <div>
              <h3 className={styles.overviewTitle}>Download company overview</h3>
              <p className={styles.overviewSubtitle}>Detailed FIATA/IATA licenses, fleet certifications, and international forwarding presentation.</p>
            </div>
          </div>
          <Link href={`/${lang}/quote`} className="btn btn-primary" style={{ padding: '12px 28px', whiteSpace: 'nowrap' }}>
            Download PDF
          </Link>
        </div>
      </div>

      {/* 8. BOTTOM CTA BANNER */}
      <section className={styles.bottomCta}>
        <div className={styles.bottomCtaContent}>
          <h2 className={styles.bottomCtaTitle}>Ready to move your cargo? Let&apos;s talk.</h2>
          <p className={styles.bottomCtaDesc}>
            Get a binding, customized commercial offer and route optimization analysis from our freight specialists within 2 hours.
          </p>
          <div className={styles.bottomCtaButtons}>
            <Link href={`/${lang}/quote`} className="btn btn-primary" style={{ padding: '14px 32px', fontSize: '16px' }}>
              Get an Offer
            </Link>
            <Link href={`/${lang}/contact`} className={styles.btnGhostHero}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Global Bottom Sections */}
      <Partners dict={dict} />
    </div>
  );
}

