import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { 
  ChevronRight, ArrowRight, ShoppingCart, Activity, Car, 
  Factory, Coffee, FlaskConical, HardHat, Cpu, ShieldCheck 
} from 'lucide-react';
import { getDictionary } from '@/lib/dictionary';
import styles from './IndustriesGlobal.module.css';
import GoogleReviews from '@/components/GoogleReviews/GoogleReviews';
import Partners from '@/components/Partners/Partners';

interface IndustriesGlobalProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata(props: IndustriesGlobalProps): Promise<Metadata> {
  const params = await props.params;
  const lang = params.lang || 'en';
  return {
    title: `Industries We Serve | CIO Logistics (${lang.toUpperCase()})`,
    description: "Tailored multimodal forwarding, customs clearance, and specialized logistics for E-commerce, Pharma, Automotive, Heavy Machinery, Chemicals, and High-Tech."
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
      desc: "Integrated B2B and B2C fulfillment pipelines connecting global manufacturing hubs directly to Amazon FBA, retail warehouses, and end consumers.",
      tags: ["Consumer goods", "Fashion", "Electronics"],
      icon: <ShoppingCart size={20} />
    },
    {
      slug: 'pharmaceutical',
      title: dict?.industries?.pharma || "Pharmaceutical & Healthcare",
      subtitle: "GDP Cold Chain",
      desc: "Unbroken temperature-controlled transit (+2°C to +8°C and +15°C to +25°C) with real-time temperature telemetry and priority customs clearance.",
      tags: ["Vaccines", "Medical devices", "Biotech"],
      icon: <Activity size={20} />
    },
    {
      slug: 'automotive',
      title: dict?.industries?.auto || "Automotive & Parts",
      subtitle: "JIT & Spare Parts",
      desc: "Just-In-Time delivery protocols for assembly lines, heavy auto components, tires, and high-value luxury vehicle transportation.",
      tags: ["OEM parts", "Batteries", "Vehicles"],
      icon: <Car size={20} />
    },
    {
      slug: 'heavy-machinery',
      title: dict?.industries?.heavy || "Heavy Machinery & Industrial",
      subtitle: "Oversized & Project",
      desc: "Turnkey project cargo management, flat rack container lashing, route surveys, and specialized crane equipment for oversized industrial machinery.",
      tags: ["Excavators", "Generators", "Turbines"],
      icon: <Factory size={20} />
    },
    {
      slug: 'food-perishables',
      title: dict?.industries?.food || "Food & Perishables",
      subtitle: "Reefer & Fresh",
      desc: "Sanitary and phytosanitary certified handling for fresh produce, frozen meat, dairy, and beverages using active reefer container monitoring.",
      tags: ["Fresh produce", "Frozen goods", "Beverages"],
      icon: <Coffee size={20} />
    },
    {
      slug: 'chemical',
      title: dict?.industries?.chemical || "Chemical & Hazardous",
      subtitle: "ADR & IMDG Certified",
      desc: "Full legal compliance and certified safety handling for Class 1-9 dangerous goods, liquid bulk ISO tanks, and industrial chemical additives.",
      tags: ["Class 3 liquids", "Industrial", "Fertilizers"],
      icon: <FlaskConical size={20} />
    },
    {
      slug: 'construction',
      title: dict?.industries?.construction || "Construction & Materials",
      subtitle: "Bulk & Supply Chain",
      desc: "Reliable high-volume supply chain scheduling for raw materials, steel pipes, timber, cement, and prefabricated building structures.",
      tags: ["Steel & metal", "Raw bulk", "Timber"],
      icon: <HardHat size={20} />
    },
    {
      slug: 'electronics',
      title: dict?.industries?.electronics || "High-Tech & Electronics",
      subtitle: "High-Security & Fragile",
      desc: "Air ride suspension trucking, armed security escort options, and GPS-tracked container seals for sensitive telecommunications and servers.",
      tags: ["Servers", "Semiconductors", "Telecom"],
      icon: <Cpu size={20} />
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
              <span className={styles.heroStatNum}>8</span>
              <span className={styles.heroStatLabel}>Core Specialized Sectors</span>
            </div>
            <div>
              <span className={styles.heroStatNum}>14+</span>
              <span className={styles.heroStatLabel}>Years Industry Experience</span>
            </div>
            <div>
              <span className={styles.heroStatNum}>150+</span>
              <span className={styles.heroStatLabel}>Countries & Trade Corridors</span>
            </div>
          </div>

        </div>
      </section>

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

        <div className={styles.sectorsGrid}>
          {sectorsData.map((sector) => (
            <div key={sector.slug} className={styles.sectorCard}>
              <div>
                <div className={styles.cardTopRow}>
                  {/* SIGNATURE RED DASH LINE */}
                  <div className={styles.redDash}></div>
                  <div className={styles.cardIconBox}>
                    {sector.icon}
                  </div>
                </div>

                <h3 className={styles.sectorTitle}>{sector.title}</h3>
                <div className={styles.sectorSubtitle}>{sector.subtitle}</div>
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
          ))}
        </div>
      </section>

      {/* 3. WHY IT MATTERS / SPECIALIZED HANDLING SECTION */}
      <section className={styles.sectionWhy}>
        <div className={styles.whyContainer}>
          <div className={styles.whyHeader}>
            <span className={styles.eyebrow}>WHY IT MATTERS</span>
            <h2 className={styles.sectionTitle}>Specialized handling, not one-size-fits-all</h2>
          </div>

          <div className={styles.whyGrid}>
            <div className={styles.whyCard}>
              {/* SIGNATURE RED DASH LINE */}
              <div className={styles.redDash}></div>
              <h3 className={styles.whyCardTitle}>Compliant by design</h3>
              <p className={styles.whyCardText}>
                ADR, IMDG, IATA DGR, GDP cold chain and HACCP — the right international certifications and safety protocols for each cargo type, handled strictly in-house.
              </p>
            </div>

            <div className={styles.whyCard}>
              {/* SIGNATURE RED DASH LINE */}
              <div className={styles.redDash}></div>
              <h3 className={styles.whyCardTitle}>Dedicated specialists</h3>
              <p className={styles.whyCardText}>
                A dedicated account coordinator who knows your sector&apos;s exact documentation, seasonality fluctuations, and legal routing constraints — not a generic helpdesk.
              </p>
            </div>

            <div className={styles.whyCard}>
              {/* SIGNATURE RED DASH LINE */}
              <div className={styles.redDash}></div>
              <h3 className={styles.whyCardTitle}>Optimized routes</h3>
              <p className={styles.whyCardText}>
                Transport mode and transit corridor selected specifically for your business priorities — whether that is express speed, cost reduction, or strict temperature integrity.
              </p>
            </div>
          </div>
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
