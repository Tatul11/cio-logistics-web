import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Phone, FileText, CheckCircle2, ArrowRight, Download, ChevronRight, ShieldCheck, Clock, MapPin, Truck, Ship, Plane, HelpCircle, ArrowUpRight } from 'lucide-react';
import { getDictionary } from '@/lib/dictionary';
import styles from './IndustryLayout.module.css';
import Partners from '@/components/Partners/Partners';
import OtherIndustries from '@/components/OtherIndustries/OtherIndustries';
import ProcessTimeline from '@/components/ProcessTimeline/ProcessTimeline';
import AnimatedCounter from '@/components/AnimatedCounter/AnimatedCounter';
import LiveRatesStrip from '@/components/LiveRatesStrip/LiveRatesStrip';

interface IndustryPageProps {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
}

export async function generateMetadata(props: IndustryPageProps): Promise<Metadata> {
  const params = await props.params;
  const rawLang = params.lang || 'en';
  const lang = (rawLang === 'ru' || rawLang === 'hy' ? rawLang : 'en') as 'en' | 'ru' | 'hy';
  const dict = await getDictionary(lang);
  const enDict = await getDictionary('en');
  const currentDict = (dict as any).industryDetails ? dict : enDict;
  const industryData = (currentDict as any).industryDetails?.[params.slug];

  const title = industryData ? `${industryData.title} Logistics & Fulfillment — CIO Logistics, Yerevan` : "Industry Logistics Solutions — CIO Logistics";
  const description = industryData ? `${industryData.intro1.substring(0, 155)}...` : "Tailored multimodal freight forwarding, customs clearance, and specialized logistics.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://ciologistics.com/${lang}/industries/${params.slug}`
    },
    alternates: {
      canonical: `https://ciologistics.com/${lang}/industries/${params.slug}`
    }
  };
}

export default async function IndustryPage(props: IndustryPageProps) {
  const params = await props.params;
  const rawLang = params.lang || 'en';
  const lang = (rawLang === 'ru' || rawLang === 'hy' ? rawLang : 'en') as 'en' | 'ru' | 'hy';
  const dict = await getDictionary(lang);
  const enDict = await getDictionary('en');

  let currentDict: any = dict;
  if (!currentDict.industryDetails) {
    currentDict = enDict;
  }

  const industryData = currentDict.industryDetails?.[params.slug as keyof typeof currentDict.industryDetails];

  if (!industryData) {
    notFound();
  }

  if (!industryData.products) {
    const enIndustryData = (enDict as any).industryDetails?.[params.slug as keyof typeof currentDict.industryDetails];
    if (enIndustryData && enIndustryData.products) {
      industryData.products = enIndustryData.products;
      industryData.productsTitle = enIndustryData.productsTitle;
    }
  }

  const allSlugs = Object.keys(currentDict.industryDetails || {});

  // Vertical E-E-A-T specialist profiles mapping per Audit I-11
  const verticalSpecialists: Record<string, { slug: string; name: string; role: string; exp: string; image: string }> = {
    'e-commerce': {
      slug: 'eteri-tsatryan',
      name: 'Eteri Tsatryan',
      role: 'Head of E-Commerce & Retail Fulfillment',
      exp: '9 Years Exp • FBA & Marketplace Lead',
      image: '/images/john-simmons-XFLk8qZ-6MA-unsplash.webp'
    },
    'pharmaceutical': {
      slug: 'armen-ghazaryan',
      name: 'Armen Ghazaryan',
      role: 'Head of Customs & Healthcare Logistics',
      exp: '14 Years Exp • Licensed Broker #CB-2018-112',
      image: '/images/elias--lYi5Qg0xP0-unsplash.webp'
    },
    'automotive': {
      slug: 'gor-hovhannisyan',
      name: 'Gor Hovhannisyan',
      role: 'Head of Hazardous & Automotive Logistics',
      exp: '11 Years Exp • JIT & OEM Specialist',
      image: '/images/elevate-dI-aXC7DWpQ-unsplash.webp'
    }
  };

  const defaultSpecialist = verticalSpecialists[params.slug] || verticalSpecialists['automotive'];

  // Vertical-specific integrations per Audit I-07
  const verticalIntegrations: Record<string, string[]> = {
    'e-commerce': ['Shopify', 'WooCommerce', 'Magento', 'Amazon FBA / FBM', 'Wildberries Seller Center', 'Ozon API', '1C-Enterprise WMS'],
    'pharmaceutical': ['Sensitech Telemetry API', 'Roambee Real-Time Tracking', 'Exel WMS', 'SAP Healthcare Module', '1C-Pharma Tracking'],
    'automotive': ['EDIFACT OEM Link', 'Odette Automotive Standard', 'JIT Assembly Scheduler', 'SAP SD/MM Logistics API'],
  };

  const currentIntegrations = verticalIntegrations[params.slug] || ['SAP Logistics Module', 'Oracle SCM Cloud', '1C-Enterprise WMS', 'Real-Time REST API Tracking'];

  // Vertical-specific Case Studies per Audit I-05
  const verticalCaseStudies: Record<string, Array<{ badge: string; title: string; desc: string; val: string; label: string }>> = {
    'e-commerce': [
      { badge: 'MULTIMODAL CONSOLIDATION', title: 'Ningbo & Shanghai → Yerevan E-Commerce LCL', desc: 'Direct bi-weekly box consolidation delivering retail electronics and apparel with automated customs processing.', val: '-25%', label: 'Landed Cost Optimization' },
      { badge: 'MARKETPLACE PREP', title: 'Wildberries & Ozon Automated Pre-Pack & Labeling', desc: 'Dedicated warehouse consolidation hub sorting, barcoding, and delivering 12,000+ SKU units monthly.', val: '24 Hrs', label: 'Hub Turnaround' },
      { badge: 'REVERSE LOGISTICS', title: 'Cross-Border Marketplace Returns Management', desc: 'Full returns inspection, repacking, and seller inventory reimbursement workflow across Eurasian trade hubs.', val: '100%', label: 'Inventory Recovery' }
    ],
    'pharmaceutical': [
      { badge: 'AIR EXPRESS GDP', title: 'Urgent Oncology & Diagnostic Reagent Transit', desc: 'Unbroken active thermostatic air transport from Frankfurt to Yerevan hospitals with digital probe logs.', val: '48 Hrs', label: 'Door-to-Door Speed' },
      { badge: 'REEFER CORRIDOR', title: 'Biotech Vaccine +2°C to +8°C Active Container', desc: 'Continuous satellite temperature telemetry and priority sanitary border clearance at Meghri transit point.', val: '100%', label: 'Temperature Integrity' },
      { badge: 'CUSTOMS BROKERAGE', title: 'Accelerated RA Ministry of Health Clearance', desc: 'Pre-lodged regulatory filings and expedited customs release for high-value pharmaceutical imports.', val: '2 Hrs', label: 'Customs Release' }
    ]
  };

  const currentCaseStudies = verticalCaseStudies[params.slug] || [
    { badge: 'SPECIALIZED TRANSIT', title: `${industryData.title} Heavy Corridor Optimization`, desc: 'Custom engineered routing protocols cutting port congestion and streamlining border customs declarations.', val: '-28%', label: 'Transit Cost Reduction' },
    { badge: 'MULTIMODAL HUB', title: 'Eurasian Container Consolidation Pipeline', desc: 'Dedicated weekly scheduled block train and road feeder network ensuring consistent inventory replenishment.', val: 'Weekly', label: 'Guaranteed Departures' },
    { badge: 'COMPLIANCE CLEARANCE', title: 'In-House Regulatory Customs Clearance', desc: 'Comprehensive regulatory audit, tariff classification, and rapid release at primary border transit nodes.', val: '24 Hrs', label: 'Average Clearance' }
  ];

  // Vertical-specific FAQs per Audit I-13
  const verticalFaqs: Record<string, Array<{ q: string; a: string }>> = {
    'e-commerce': [
      { q: 'Do you provide Amazon FBA and Wildberries marketplace prep services?', a: 'Yes, our bonded Yerevan fulfillment warehouse handles complete barcode labeling, pre-packaging, palletizing, and direct scheduled delivery to Wildberries, Ozon, and international Amazon FBA fulfillment centers.' },
      { q: 'How fast is your LCL consolidation service from China to Armenia?', a: 'Our direct scheduled LCL consolidation containers depart Ningbo and Shanghai weekly, with average door-to-door transit times ranging between 28 and 35 days via optimized Black Sea multimodal corridors.' },
      { q: 'Can you integrate directly with our online store platform?', a: 'Absolutely. We support REST API and EDI connections with Shopify, WooCommerce, Magento, and 1C-Enterprise to automate shipping label generation, order dispatch, and live tracking.' },
      { q: 'How do you handle returns and reverse logistics for e-commerce brands?', a: 'We operate dedicated return processing hubs where items are received from buyers, inspected for damage, re-labeled, and restocked into active inventory or returned to the primary manufacturing facility.' }
    ]
  };

  const currentFaqs = verticalFaqs[params.slug] || [
    { q: `Do you offer door-to-door shipping solutions for ${industryData.title}?`, a: "Yes, we handle the entire logistics chain from the supplier's warehouse or manufacturing facility directly to your facility or distribution center." },
    { q: "How long does customs clearance take in Armenia?", a: "With all required documentation prepared in advance by our expert customs brokerage team, standard customs clearance typically takes 1 to 2 business days." },
    { q: "Can you transport specialized or restricted cargo in this category?", a: "Absolutely. Our licensed specialists ensure strict adherence to international safety protocols, ADR/IMDG certifications, and sanitary regulations." },
    { q: "How can I track the exact location of my cargo?", a: "Every client receives access to our digital tracking platform and a dedicated personal account manager for continuous, real-time updates on freight status." }
  ];

  return (
    <div className={styles.wrapper}>
      {/* 1. HERO SECTION WITH CORRECT BREADCRUMBS per Audit I-04 */}
      <section 
        className={styles.hero}
        style={{ backgroundImage: `url(${industryData.image})` }}
      >
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          
          <div className={styles.heroBreadcrumbs}>
            <Link href={`/${lang}`}>Home</Link>
            <ChevronRight size={14} />
            <Link href={`/${lang}/industries`}>Industries We Serve</Link>
            <ChevronRight size={14} />
            <span style={{ color: '#ffffff', fontWeight: 600 }}>{industryData.title}</span>
          </div>

          <div className={styles.heroEyebrow}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--cio-red)' }}></span>
            Industry Solution
          </div>

          <h1 className={styles.heroTitle}>{industryData.title}</h1>
          <p className={styles.heroIntro}>
            {industryData.intro1}
          </p>
          
          <div className={styles.heroCtaWrap}>
            <Link href={`/${lang}/quote`} className="btn btn-primary" style={{ padding: '14px 32px', fontSize: '16px' }}>
              Calculate Freight Cost
            </Link>
            <Link href={`/${lang}/contact`} className={styles.btnGhostHero}>
              Ask a Question
            </Link>
          </div>
        </div>
      </section>

      <LiveRatesStrip dict={dict} lang={lang} />

      {/* 2. STATS STRIP BELOW HERO (Harmonized per Audit I-08) */}
      <div className={styles.statsBar}>
        <div className={styles.statsContainer}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}><AnimatedCounter value="150+" /></span>
            <span className={styles.statLabel}>Countries & Corridors</span>
          </div>
          <div className={styles.statItem}>
            <span className={`${styles.statNumber} ${styles.statNumberHighlight}`}><AnimatedCounter value="-32%" /></span>
            <span className={styles.statLabel}>Transit Cost Optimization</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>Weekly</span>
            <span className={styles.statLabel}>Scheduled Departures</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}><AnimatedCounter value="98.6%" /></span>
            <span className={styles.statLabel}>On-Time Delivery Rate</span>
          </div>
        </div>
      </div>

      {/* 3. MAIN 2-COLUMN CONTENT */}
      <main className={styles.pageContainer}>
        
        {/* LEFT: Article & Benefits */}
        <article className={styles.article}>
          
          <p style={{ fontSize: '17px', color: 'var(--cio-navy)', fontWeight: 600, lineHeight: '1.7' }}>
            {industryData.intro2}
          </p>

          <img 
            src={industryData.image} 
            alt={industryData.title} 
            className={styles.articleImage} 
          />

          {/* API & Platform Integrations Block per Audit I-07 */}
          <div className={styles.integrationsWrap}>
            <h3 className={styles.integrationsTitle}>Supported Digital & WMS Integrations</h3>
            <p style={{ fontSize: '14px', color: '#64748B', margin: 0 }}>
              Seamless automated data synchronization with leading industry platforms and enterprise ERPs:
            </p>
            <div className={styles.integrationsGrid}>
              {currentIntegrations.map((item, idx) => (
                <span key={idx} className={styles.integrationBadge}>
                  {item}
                </span>
              ))}
            </div>
          </div>

          <h2 className={styles.benefitsTitle}>
            {industryData.benefitsTitle || "Key benefits of working with CIO Logistics"}
          </h2>
          <p className={styles.benefitsSubtitle}>
            Why top industry leaders trust our freight forwarding network for their critical shipments.
          </p>
          
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

          {/* Named Specialist Lead Card per Audit I-11 */}
          <div className={styles.specialistSidebarCard}>
            <img src={defaultSpecialist.image} alt={defaultSpecialist.name} className={styles.specialistSidebarImage} />
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--cio-orange)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Your Industry Lead
            </div>
            <h4 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--cio-navy)', margin: '4px 0 2px' }}>
              {defaultSpecialist.name}
            </h4>
            <div style={{ fontSize: '13px', color: '#64748B', marginBottom: '14px' }}>
              {defaultSpecialist.role}
            </div>
            <Link href={`/${lang}/authors/${defaultSpecialist.slug}`} style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--cio-navy)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              View Profile & Credentials <ArrowUpRight size={14} />
            </Link>
          </div>

          {/* Contact / Request Quote Widget */}
          <div className={styles.contactWidget}>
            <div className={styles.contactIcon}>
              <Phone size={26} />
            </div>
            <h3>Request Consultation</h3>
            <p>Need a customized transit estimate or specialized customs clearance? Speak directly with our team.</p>
            <Link href={`/${lang}/quote`} className="btn btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '14px', fontSize: '15px' }}>
              <FileText size={18} className="mr-2" /> Schedule Consultation
            </Link>
          </div>
        </aside>

      </main>

      {/* 4. LOGISTICS SOLUTIONS STRIP */}
      <section className={styles.sectionSolutions}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionEyebrow}>LOGISTICS SOLUTIONS</span>
          <h2 className={styles.sectionTitle}>A complete fulfillment stack</h2>
        </div>
        
        <div className={styles.solutionRowsList}>
          {/* Row 1: Multimodal Freight - Left Image, Right Text */}
          <div className={styles.solutionRow}>
            <div className={styles.solutionRowImageWrap}>
              <img src="/images/barret-ward-5WbtO3NlTJI-unsplash.webp" alt="Multimodal Freight Operations" className={styles.solutionRowImage} />
            </div>
            <div className={styles.solutionRowContent}>
              <div className={styles.solutionRedDash}></div>
              <h3 className={styles.solutionRowTitle}>
                <Truck size={26} style={{ color: 'var(--cio-red)' }} /> Multimodal Freight
              </h3>
              <p className={styles.solutionRowText}>
                Seamless combination of air, sea, road, and rail transport designed to minimize transit times and costs across complex Eurasian corridors.
              </p>
            </div>
          </div>

          {/* Row 2: Customs Brokerage - Right Image, Left Text (Reversed on desktop) */}
          <div className={`${styles.solutionRow} ${styles.solutionRowReverse}`}>
            <div className={styles.solutionRowImageWrap}>
              <img src="/images/bent-van-aeken-0A7YwYhZhWw-unsplash.webp" alt="Customs Clearance & Brokerage" className={styles.solutionRowImage} />
            </div>
            <div className={styles.solutionRowContent}>
              <div className={styles.solutionRedDash}></div>
              <h3 className={styles.solutionRowTitle}>
                <ShieldCheck size={26} style={{ color: 'var(--cio-red)' }} /> Customs Brokerage
              </h3>
              <p className={styles.solutionRowText}>
                Fast, error-free customs clearance across Armenia and international border points with full legal support, duty calculation, and sanitary declarations.
              </p>
            </div>
          </div>

          {/* Row 3: Warehouse Storage - Left Image, Right Text */}
          <div className={styles.solutionRow}>
            <div className={styles.solutionRowImageWrap}>
              <img src="/images/chuttersnap-fN603qcEA7g-unsplash.webp" alt="Bonded & Temperature-Controlled Warehousing" className={styles.solutionRowImage} />
            </div>
            <div className={styles.solutionRowContent}>
              <div className={styles.solutionRedDash}></div>
              <h3 className={styles.solutionRowTitle}>
                <MapPin size={26} style={{ color: 'var(--cio-red)' }} /> Warehouse Storage
              </h3>
              <p className={styles.solutionRowText}>
                Secure, bonded, and temperature-controlled consolidation hubs ready for short or long-term storage, inventory management, and cross-docking.
              </p>
            </div>
          </div>

          {/* Row 4: Last-Mile Delivery - Right Image, Left Text (Reversed on desktop) */}
          <div className={`${styles.solutionRow} ${styles.solutionRowReverse}`}>
            <div className={styles.solutionRowImageWrap}>
              <img src="/images/elevate-dI-aXC7DWpQ-unsplash.webp" alt="Last-Mile Distribution Network" className={styles.solutionRowImage} />
            </div>
            <div className={styles.solutionRowContent}>
              <div className={styles.solutionRedDash}></div>
              <h3 className={styles.solutionRowTitle}>
                <Clock size={26} style={{ color: 'var(--cio-red)' }} /> Last-Mile Delivery
              </h3>
              <p className={styles.solutionRowText}>
                Reliable door-to-door distribution straight to your retail stores, pharmaceutical depots, regional warehouses, or commercial end customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OTHER INDUSTRIES SLIDER COMPONENT */}
      <OtherIndustries currentSlug={params.slug} lang={lang} dict={dict} />

      {/* 5. FILTERED CASE STUDIES STRIP per Audit I-05 */}
      <section className={styles.sectionCaseStudies}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionEyebrow}>VERIFIED OUTCOMES</span>
          <h2 className={styles.sectionTitle}>Case Studies — {industryData.title}</h2>
        </div>
        <div className={styles.caseStudiesGrid}>
          {currentCaseStudies.map((cs, idx) => (
            <div key={idx} className={styles.caseStudyCard}>
              <div className={styles.caseStudyImageWrap}>
                <img src="/images/chuttersnap-fN603qcEA7g-unsplash.webp" alt={cs.title} className={styles.caseStudyImage} />
                <span className={styles.caseStudyBadge}>{cs.badge}</span>
              </div>
              <div className={styles.caseStudyBody}>
                <h3 className={styles.caseStudyTitle}>{cs.title}</h3>
                <p className={styles.caseStudyDesc}>{cs.desc}</p>
                <div className={styles.caseStudyMetric}>
                  <span className={styles.caseStudyMetricVal}>{cs.val}</span>
                  <span className={styles.caseStudyMetricLabel}>{cs.label}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS TIMELINE SECTION */}
      <section style={{ background: '#FFF6F6', padding: '80px 20px', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span style={{ color: 'var(--cio-orange)', fontSize: '13px', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
            {dict?.process?.eyebrow || "SIMPLE PROCESS"}
          </span>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: 800, color: 'var(--cio-navy)', marginBottom: '16px' }}>
            {dict?.process?.title || "From Request to Delivery — How We Work"}
          </h2>
          <p style={{ color: '#4B5563', fontSize: '16px', maxWidth: '600px', margin: '0 auto 40px' }}>
            {dict?.process?.desc || "Five clear steps from initial inquiry to confirmed delivery, with personal account management at every stage."}
          </p>
          <ProcessTimeline dict={dict} />
        </div>
      </section>

      {/* 6. VERTICAL-SPECIFIC FAQ SECTION per Audit I-13 */}
      <section className={styles.sectionFaq}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionEyebrow}>KNOWLEDGE BASE</span>
          <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
        </div>
        <div className={styles.faqList}>
          {currentFaqs.map((faq, idx) => (
            <details key={idx} className={styles.faqItem}>
              <summary className={styles.faqSummary}>{faq.q}</summary>
              <div className={styles.faqAnswer}>{faq.a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* 7. HONEST CONSULTATION STRIP per Audit I-10 */}
      <div className={styles.overviewStripWrap}>
        <div className={styles.overviewStrip}>
          <div className={styles.overviewStripLeft}>
            <div className={styles.overviewIconWrap}>
              <FileText size={24} />
            </div>
            <div>
              <h3 className={styles.overviewTitle}>Request Comprehensive {industryData.title} Credentials</h3>
              <p className={styles.overviewSubtitle}>Receive our detailed sector experience matrix, FIATA/IATA licenses, and compliance documentation.</p>
            </div>
          </div>
          <Link href={`/${lang}/quote`} className="btn btn-primary" style={{ padding: '12px 28px', whiteSpace: 'nowrap' }}>
            Request Package
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
