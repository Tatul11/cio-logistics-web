import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { 
  ChevronRight, ArrowRight, ShoppingCart, Activity, Car, 
  Factory, Coffee, FlaskConical, HardHat, Cpu, ShieldCheck, ArrowUpRight
} from 'lucide-react';
import { getDictionary } from '@/lib/dictionary';
import styles from './IndustriesGlobal.module.css';
import GoogleReviews from '@/components/GoogleReviews/GoogleReviews';
import Partners from '@/components/Partners/Partners';
import ProcessTimeline from '@/components/ProcessTimeline/ProcessTimeline';
import AnimatedCounter from '@/components/AnimatedCounter/AnimatedCounter';
import LiveRatesStrip from '@/components/LiveRatesStrip/LiveRatesStrip';

interface IndustriesGlobalProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata(props: IndustriesGlobalProps): Promise<Metadata> {
  const params = await props.params;
  const lang = params.lang || 'en';
  return {
    title: "Industries We Serve in Logistics — CIO Logistics, Yerevan, Armenia",
    description: "Tailored multimodal forwarding, customs clearance, and specialized logistics for E-commerce, Pharma, Automotive, Heavy Machinery, Chemicals, and High-Tech.",
    alternates: {
      canonical: `https://ciologistics.com/${lang}/industries`
    }
  };
}

export default async function IndustriesGlobalPage(props: IndustriesGlobalProps) {
  const params = await props.params;
  const rawLang = params.lang || 'en';
  const lang = (rawLang === 'ru' || rawLang === 'hy' ? rawLang : 'en') as 'en' | 'ru' | 'hy';
  const dict = await getDictionary(lang);

  const sectorsData = [
    {
      slug: 'e-commerce',
      title: dict?.industries?.ecommerce || "E-Commerce & Retail",
      subtitle: "Fast, DDP & FBA",
      image: "/images/andy-li-CpsTAUPoScw-unsplash.webp",
      desc: "Integrated B2B and B2C fulfillment pipelines connecting global manufacturing hubs directly to Amazon FBA, retail warehouses, and end consumers.",
      tags: ["Consumer goods", "Fashion apparel", "Marketplace inventory"],
      metric: "Monthly Volume: 45+ LCL Consolidations",
      icon: <ShoppingCart size={20} />
    },
    {
      slug: 'pharmaceutical',
      title: dict?.industries?.pharma || "Pharmaceutical & Healthcare",
      subtitle: "GDP Cold Chain",
      image: "/images/arno-senoner-u2OdNnrksIk-unsplash.webp",
      desc: "Unbroken temperature-controlled transit (+2°C to +8°C and +15°C to +25°C) with real-time temperature telemetry and priority customs clearance.",
      tags: ["Vaccines", "Medical devices", "Biotech diagnostics"],
      metric: "Recent: GDP Cold Chain Frankfurt → Yerevan",
      icon: <Activity size={20} />
    },
    {
      slug: 'automotive',
      title: dict?.industries?.auto || "Automotive & Parts",
      subtitle: "JIT & Spare Parts",
      image: "/images/arno-senoner-yqu6tJkSQ_k-unsplash.webp",
      desc: "Just-In-Time delivery protocols for assembly lines, heavy auto components, tires, and high-value luxury vehicle transportation.",
      tags: ["OEM spare parts", "Lithium batteries", "Complete vehicles"],
      metric: "Active OEM Accounts: 12+ Assembly Corridors",
      icon: <Car size={20} />
    },
    {
      slug: 'heavy-machinery',
      title: dict?.industries?.heavy || "Heavy Machinery & Industrial",
      subtitle: "Oversized & Project",
      image: "/images/aron-yigin-lNpAmLA_bvQ-unsplash.webp",
      desc: "Turnkey project cargo management, flat rack container lashing, route surveys, and specialized crane equipment for oversized industrial machinery.",
      tags: ["Excavators", "Industrial generators", "Turbines"],
      metric: "Max Single Unit Moved: 180-Ton Turbine",
      icon: <Factory size={20} />
    },
    {
      slug: 'food-perishables',
      title: dict?.industries?.food || "Food & Perishables",
      subtitle: "Reefer & Fresh",
      image: "/images/aron-yigin-sNY6B9NsPP8-unsplash.webp",
      desc: "Sanitary and phytosanitary certified handling for fresh produce, frozen meat, dairy, and beverages using active reefer container monitoring.",
      tags: ["Fresh produce", "Frozen dairy", "Beverages & wine"],
      metric: "Reefer Telemetry: 100% Unbroken Transit",
      icon: <Coffee size={20} />
    },
    {
      slug: 'chemical',
      title: dict?.industries?.chemical || "Chemical & Hazardous",
      subtitle: "ADR & IMDG Certified",
      image: "/images/bent-van-aeken-0A7YwYhZhWw-unsplash.webp",
      desc: "Full legal compliance and certified safety handling for Class 1-9 dangerous goods, liquid bulk ISO tanks, and industrial chemical additives.",
      tags: ["Class 3 liquids", "Industrial chemicals", "Fertilizers"],
      metric: "Safety Record: 0 ADR/IMDG Incidents",
      icon: <FlaskConical size={20} />
    },
    {
      slug: 'construction',
      title: dict?.industries?.construction || "Construction & Materials",
      subtitle: "Bulk & Supply Chain",
      image: "/images/bernd-dittrich-AA1HmM6FzVE-unsplash.webp",
      desc: "Reliable high-volume supply chain scheduling for raw materials, steel pipes, timber, cement, and prefabricated building structures.",
      tags: ["Steel structures", "Raw mineral bulk", "Timber"],
      metric: "Annual Volume: 14,000+ Tons Bulk Cargo",
      icon: <HardHat size={20} />
    },
    {
      slug: 'electronics',
      title: dict?.industries?.electronics || "Electronics & High-Tech",
      subtitle: "High-Security & Fragile",
      image: "/images/bernd-dittrich-LKvT6sCkuPU-unsplash.webp",
      desc: "Air ride suspension trucking, armed security escort options, and GPS-tracked container seals for sensitive telecommunications and servers.",
      tags: ["Enterprise servers", "Semiconductors", "Telecom units"],
      metric: "Security Escort: High-Value Server Transit",
      icon: <Cpu size={20} />
    }
  ];

  const specialists = [
    {
      slug: 'armen-ghazaryan',
      name: 'Armen Ghazaryan',
      role: 'Head of Customs & Healthcare Logistics',
      exp: '14 Years Exp • Licensed Broker #CB-2018-112',
      image: '/images/elias--lYi5Qg0xP0-unsplash.webp'
    },
    {
      slug: 'gor-hovhannisyan',
      name: 'Gor Hovhannisyan',
      role: 'Head of Hazardous & Heavy Project Cargo',
      exp: '11 Years Exp • ADR & IMDG Specialist',
      image: '/images/elevate-dI-aXC7DWpQ-unsplash.webp'
    },
    {
      slug: 'eteri-tsatryan',
      name: 'Eteri Tsatryan',
      role: 'Head of E-Commerce & Retail Fulfillment',
      exp: '9 Years Exp • FBA & Marketplace Lead',
      image: '/images/john-simmons-XFLk8qZ-6MA-unsplash.webp'
    }
  ];

  return (
    <div className={styles.wrapper}>
      
      {/* 1. HERO SECTION */}
      <section 
        className={styles.hero}
        style={{ backgroundImage: "url('/images/chuttersnap-fN603qcEA7g-unsplash.webp')" }}
      >
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          
          <div className={styles.heroBreadcrumbs}>
            <Link href={`/${lang}`}>Home</Link>
            <ChevronRight size={14} />
            <span style={{ color: '#ffffff', fontWeight: 600 }}>Industries We Serve</span>
          </div>

          <div className={styles.heroEyebrow}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ffffff' }}></span>
            CORE SECTORS
          </div>

          <h1 className={styles.heroTitle}>Tailored Logistics for Every Sector</h1>
          <p className={styles.heroSubtitle}>
            From e-commerce fulfillment to hazardous industrial chemicals, we engineer customized transit routes, dedicated customs compliance, and specialized handling for your exact cargo requirements.
          </p>
          
          <div className={styles.heroButtons}>
            <Link href={`/${lang}/quote`} className="btn btn-primary" style={{ padding: '14px 32px', fontSize: '16px' }}>
              Calculate Freight Cost
            </Link>
            <Link href={`/${lang}/routes`} className={styles.btnGhostHero}>
              Explore Corridors
            </Link>
          </div>

          <div className={styles.heroStats}>
            <div>
              <span className={styles.heroStatNum}><AnimatedCounter value="8" /></span>
              <span className={styles.heroStatLabel}>Core Specialized Sectors</span>
            </div>
            <div>
              <span className={styles.heroStatNum}><AnimatedCounter value="9+" /></span>
              <span className={styles.heroStatLabel}>Years Experience (Since 2016)</span>
            </div>
            <div>
              <span className={styles.heroStatNum}><AnimatedCounter value="150+" /></span>
              <span className={styles.heroStatLabel}>Countries & Trade Corridors</span>
            </div>
          </div>

        </div>
      </section>

      <LiveRatesStrip dict={dict} lang={lang} />

      {/* 2. INDUSTRIES LISTING GRID SECTION */}
      <section className={styles.sectionSectors}>
        <div className={styles.sectionHeaderRow}>
          <div>
            <span className={styles.eyebrow}>INDUSTRIES WE SPECIALIZE IN</span>
            <h2 className={styles.sectionTitle}>Engineered for your vertical</h2>
          </div>
          <Link href={`/${lang}/routes`} className={styles.headerLink}>
            View all route schedules <ArrowRight size={16} />
          </Link>
        </div>

        {/* Mobile Jump Strip per Audit I-10 */}
        <div className={styles.jumpStrip}>
          {sectorsData.map(s => (
            <a key={s.slug} href={`#sec-${s.slug}`} className={styles.jumpPill}>
              {s.title}
            </a>
          ))}
        </div>

        <div className={styles.sectorsGrid}>
          {sectorsData.map((sector) => (
            <div key={sector.slug} id={`sec-${sector.slug}`} className={styles.sectorCard}>
              <div className={styles.cardImageWrap}>
                <img src={sector.image} alt={sector.title} className={styles.cardImage} />
              </div>

              <div className={styles.cardBody}>
                <div>
                  <div className={styles.cardTopRow}>
                    <div className={styles.redDash}></div>
                    <div className={styles.cardIconBox}>
                      {sector.icon}
                    </div>
                  </div>

                  <h3 className={styles.sectorTitle}>{sector.title}</h3>
                  <div className={styles.sectorSubtitle}>{sector.subtitle}</div>
                  
                  {/* Verified Metric Badge per Audit I-08 */}
                  <div style={{ background: '#FFF0F0', borderLeft: '3px solid var(--cio-orange)', padding: '6px 12px', borderRadius: '4px', fontSize: '12.5px', fontWeight: 700, color: 'var(--cio-navy)', marginBottom: '14px' }}>
                    ✓ {sector.metric}
                  </div>

                  <p className={styles.sectorDesc}>{sector.desc}</p>
                  
                  <div className={styles.tagsWrap}>
                    {sector.tags.map((t, idx) => (
                      <span key={idx} className={styles.tagPill}>{t}</span>
                    ))}
                  </div>
                </div>

                <Link href={`/${lang}/industries/${sector.slug}`} className={styles.cardLink}>
                  Learn More <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. WHY IT MATTERS / SPECIALIZED HANDLING SECTION */}
      <section className={styles.sectionWhy}>
        <div className={styles.whyContainer}>
          <div className={styles.whyHeader}>
            <span className={styles.eyebrow}>WHY IT MATTERS</span>
            <h2 className={styles.sectionTitle} style={{ color: '#FFFFFF' }}>Specialized handling, not one-size-fits-all</h2>
          </div>

          <div className={styles.whyGrid}>
            <div className={styles.whyCard}>
              <div className={styles.redDash}></div>
              <h3 className={styles.whyCardTitle}>Compliant by design</h3>
              <p className={styles.whyCardText}>
                ADR, IMDG, IATA DGR, GDP cold chain and HACCP — the right international certifications and safety protocols for each cargo type, handled strictly in-house.
              </p>
            </div>

            <div className={styles.whyCard}>
              <div className={styles.redDash}></div>
              <h3 className={styles.whyCardTitle}>Dedicated specialists</h3>
              <p className={styles.whyCardText}>
                A dedicated account coordinator who knows your sector&apos;s exact documentation, seasonality fluctuations, and legal routing constraints — not a generic helpdesk.
              </p>
            </div>

            <div className={styles.whyCard}>
              <div className={styles.redDash}></div>
              <h3 className={styles.whyCardTitle}>Optimized routes</h3>
              <p className={styles.whyCardText}>
                Transport mode and transit corridor selected specifically for your business priorities — whether that is express speed, cost reduction, or strict temperature integrity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* E-E-A-T SPECIALIST STRIP per Audit I-05 */}
      <section className={styles.specialistSection}>
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
          <span className={styles.eyebrow}>SECTOR EXPERTISE</span>
          <h2 className={styles.sectionTitle}>Meet Your Dedicated Industry Specialists</h2>
          <p style={{ color: '#6B7280', fontSize: '15px', marginTop: '8px' }}>
            Direct access to licensed customs brokers and vertical practice leads.
          </p>
        </div>

        <div className={styles.specialistGrid}>
          {specialists.map(sp => (
            <Link key={sp.slug} href={`/${lang}/authors/${sp.slug}`} className={styles.specialistCard}>
              <div style={{ width: '72px', height: '72px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 16px', border: '2px solid var(--cio-orange)' }}>
                <img src={sp.image} alt={sp.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--cio-navy)', marginBottom: '4px' }}>{sp.name}</h3>
              <div style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--cio-orange)', marginBottom: '8px' }}>{sp.role}</div>
              <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '14px' }}>{sp.exp}</div>
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--cio-navy)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                View Credentials <ArrowUpRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. CERTIFICATIONS & MEMBERSHIPS STRIP */}
      <section className={styles.sectionCerts}>
        <span className={styles.eyebrow}>OUR COMMITMENT</span>
        <h2 className={styles.sectionTitle}>Certifications & Industry Memberships</h2>
        
        <div className={styles.certsGrid}>
          <div className={styles.certItem}>
            <div className={styles.certTitle}>ISO 9001</div>
            <div className={styles.certDesc}>Quality Management</div>
          </div>
          <div className={styles.certItem}>
            <div className={styles.certTitle}>FIATA</div>
            <div className={styles.certDesc}>Freight Forwarding</div>
          </div>
          <div className={styles.certItem}>
            <div className={styles.certTitle}>IATA</div>
            <div className={styles.certDesc}>Air Cargo Agent</div>
          </div>
          <div className={styles.certItem}>
            <div className={styles.certTitle}>IRU</div>
            <div className={styles.certDesc}>Road Transport Union</div>
          </div>
          <div className={styles.certItem}>
            <div className={styles.certTitle}>AEO</div>
            <div className={styles.certDesc}>Authorized Operator</div>
          </div>
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

      {/* 5. GOOGLE BUSINESS REVIEWS SECTION */}
      <GoogleReviews dict={dict} />

      {/* 6. FAQ SECTION */}
      <section className={styles.sectionFaq}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span className={styles.eyebrow}>COMMON QUESTIONS</span>
          <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
        </div>

        <div className={styles.faqList}>
          <details className={styles.faqItem}>
            <summary className={styles.faqSummary}>Do you provide specialized customs brokerage for restricted industry cargo?</summary>
            <div className={styles.faqAnswer}>
              Yes, our in-house licensed customs brokers handle complex declarations, sanitary/phytosanitary certificates, GDP documentation, and excise clearance across Armenia and international border transit nodes.
            </div>
          </details>
          <details className={styles.faqItem}>
            <summary className={styles.faqSummary}>Can you handle urgent shipments requiring temperature monitoring?</summary>
            <div className={styles.faqAnswer}>
              Absolutely. We deploy active refrigerated containers (reefers) and GDP-certified thermostatic boxes with continuous GPS and IoT temperature sensors for sensitive pharmaceutical and perishable shipments.
            </div>
          </details>
          <details className={styles.faqItem}>
            <summary className={styles.faqSummary}>What is the typical lead time for calculating a project cargo route?</summary>
            <div className={styles.faqAnswer}>
              Standard commercial rate requests are processed within 2 hours. Complex multimodal project cargo requiring road surveys or special crane permits are quoted within 24 business hours.
            </div>
          </details>
          <details className={styles.faqItem}>
            <summary className={styles.faqSummary}>How do you guarantee cargo safety during long-distance multimodal transit?</summary>
            <div className={styles.faqAnswer}>
              All shipments operate under comprehensive FIATA liability coverage. Furthermore, we offer full commercial "All Risks" marine and overland cargo insurance up to 100% of the invoice value.
            </div>
          </details>
          <details className={styles.faqItem}>
            <summary className={styles.faqSummary}>How do I start shipping with CIO Logistics?</summary>
            <div className={styles.faqAnswer}>
              Simply click the "Calculate Freight Cost" button or contact our team. We will assign a dedicated specialist to audit your current supply chain and provide immediate commercial options.
            </div>
          </details>
        </div>
      </section>

      {/* 7. BOTTOM CTA BANNER */}
      <section className={styles.bottomCta}>
        <div className={styles.bottomCtaContainer}>
          <div>
            <h2 className={styles.bottomCtaTitle}>Don&apos;t see your specific industry? We probably still move it.</h2>
            <p className={styles.bottomCtaDesc}>Speak with our freight specialists today for custom route analysis and tailored cargo solutions.</p>
          </div>
          <Link href={`/${lang}/quote`} className="btn btn-primary" style={{ padding: '14px 32px', fontSize: '16px', whiteSpace: 'nowrap' }}>
            Get a Custom Quote
          </Link>
        </div>
      </section>

      {/* Global Bottom Sections */}
      <Partners dict={dict} />
    </div>
  );
}
