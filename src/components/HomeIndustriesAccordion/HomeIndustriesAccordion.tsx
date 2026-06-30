"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, ShoppingCart, Activity, Car, 
  Factory, Coffee, FlaskConical, HardHat, Cpu 
} from 'lucide-react';
import styles from './HomeIndustriesAccordion.module.css';

interface HomeIndustriesAccordionProps {
  lang: string;
  dict: any;
}

export default function HomeIndustriesAccordion({ lang, dict }: HomeIndustriesAccordionProps) {
  const sectorsData = [
    {
      slug: 'e-commerce',
      title: dict?.industries?.ecommerce || "E-Commerce & Retail",
      subtitle: "Fast, DDP & FBA",
      image: "/images/andy-li-CpsTAUPoScw-unsplash.webp",
      desc: dict?.industries?.ecommerceDesc || "Integrated B2B and B2C fulfillment pipelines connecting global manufacturing hubs directly to Amazon FBA, retail warehouses, and end consumers.",
      icon: <ShoppingCart size={20} />
    },
    {
      slug: 'pharmaceutical',
      title: dict?.industries?.pharma || "Pharmaceutical & Healthcare",
      subtitle: "GDP Cold Chain",
      image: "/images/arno-senoner-u2OdNnrksIk-unsplash.webp",
      desc: dict?.industries?.pharmaDesc || "Unbroken temperature-controlled transit (+2°C to +8°C and +15°C to +25°C) with real-time temperature telemetry and priority customs clearance.",
      icon: <Activity size={20} />
    },
    {
      slug: 'automotive',
      title: dict?.industries?.auto || "Automotive & Parts",
      subtitle: "JIT & Spare Parts",
      image: "/images/arno-senoner-yqu6tJkSQ_k-unsplash.webp",
      desc: dict?.industries?.autoDesc || "Just-In-Time delivery protocols for assembly lines, heavy auto components, tires, and high-value luxury vehicle transportation.",
      icon: <Car size={20} />
    },
    {
      slug: 'heavy-machinery',
      title: dict?.industries?.heavy || "Heavy Machinery & Industrial",
      subtitle: "Oversized & Project",
      image: "/images/aron-yigin-lNpAmLA_bvQ-unsplash.webp",
      desc: dict?.industries?.heavyDesc || "Turnkey project cargo management, flat rack container lashing, route surveys, and specialized crane equipment for oversized industrial machinery.",
      icon: <Factory size={20} />
    },
    {
      slug: 'food-perishables',
      title: dict?.industries?.food || "Food & Perishables",
      subtitle: "Reefer & Fresh",
      image: "/images/aron-yigin-sNY6B9NsPP8-unsplash.webp",
      desc: dict?.industries?.foodDesc || "Sanitary and phytosanitary certified handling for fresh produce, frozen meat, dairy, and beverages using active reefer container monitoring.",
      icon: <Coffee size={20} />
    },
    {
      slug: 'chemical',
      title: dict?.industries?.chemical || "Chemical & Hazardous",
      subtitle: "ADR & IMDG Certified",
      image: "/images/bent-van-aeken-0A7YwYhZhWw-unsplash.webp",
      desc: dict?.industries?.chemicalDesc || "Full legal compliance and certified safety handling for Class 1-9 dangerous goods, liquid bulk ISO tanks, and industrial chemical additives.",
      icon: <FlaskConical size={20} />
    },
    {
      slug: 'construction',
      title: dict?.industries?.construction || "Construction & Materials",
      subtitle: "Bulk & Supply Chain",
      image: "/images/bernd-dittrich-AA1HmM6FzVE-unsplash.webp",
      desc: dict?.industries?.constructionDesc || "Reliable high-volume supply chain scheduling for raw materials, steel pipes, timber, cement, and prefabricated building structures.",
      icon: <HardHat size={20} />
    },
    {
      slug: 'electronics',
      title: dict?.industries?.electronics || "High-Tech & Electronics",
      subtitle: "High-Security & Fragile",
      image: "/images/bernd-dittrich-LKvT6sCkuPU-unsplash.webp",
      desc: dict?.industries?.electronicsDesc || "Air ride suspension trucking, armed security escort options, and GPS-tracked container seals for sensitive telecommunications and servers.",
      icon: <Cpu size={20} />
    }
  ];

  const [activeSlug, setActiveSlug] = useState<string>('e-commerce');

  return (
    <div style={{ width: '100%' }}>
      {/* Expanding Cursor Accordion */}
      <div className={styles.accordionWrap}>
        {sectorsData.map((sector) => {
          const isActive = activeSlug === sector.slug;

          return (
            <div
              key={sector.slug}
              className={`${styles.accordionCard} ${isActive ? styles.accordionCardActive : ''}`}
              onMouseEnter={() => setActiveSlug(sector.slug)}
              onClick={() => setActiveSlug(sector.slug)}
            >
              {/* Background Image */}
              <img src={sector.image} alt={sector.title} className={styles.cardBgImg} />
              
              {/* Dark Gradient Overlay */}
              <div className={styles.overlay}></div>

              {/* Content switching based on active state */}
              {!isActive ? (
                <div className={styles.inactiveContent}>
                  <div className={styles.inactiveIcon}>{sector.icon}</div>
                  <h3 className={styles.inactiveTitle}>{sector.title}</h3>
                </div>
              ) : (
                <div className={styles.activeContent}>
                  <div className={styles.activeTopRow}>
                    <div className={styles.activeIconWrap}>{sector.icon}</div>
                    <span className={styles.activeSubtitle}>{sector.subtitle}</span>
                  </div>
                  <h3 className={styles.activeTitle}>{sector.title}</h3>
                  <p className={styles.activeDesc}>{sector.desc}</p>
                  <Link href={`/${lang}/industries/${sector.slug}`} className={styles.exploreBtn}>
                    Explore Sector Page <ArrowRight size={16} />
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ textAlign: 'center', marginTop: '48px' }}>
        <Link href={`/${lang}/industries`} className="btn btn-primary" style={{ padding: '14px 36px', fontSize: '15px', fontWeight: 700, boxShadow: '0 8px 24px rgba(236, 28, 40, 0.3)' }}>
          Explore All Industries & Verticals →
        </Link>
      </div>
    </div>
  );
}
