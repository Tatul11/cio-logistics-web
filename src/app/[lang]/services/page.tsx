import React from 'react';
import Link from 'next/link';
import { getDictionary } from '@/lib/dictionary';
import styles from './ServicesPage.module.css';
import { 
  MapPin, 
  CreditCard, 
  ShieldCheck, 
  Scale, 
  FileText 
} from 'lucide-react';

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

  // Fallback to English dictionary if current language doesn't have the new landing sections
  const servicesLanding = (dict as any).servicesLanding || (enDict as any).servicesLanding;
  const serviceDetails = (dict as any).serviceDetails || (enDict as any).serviceDetails;

  const allSlugs = Object.keys(serviceDetails || {});

  return (
    <div className={styles.wrapper}>
      
      {/* 1. Hero Section */}
      <section 
        className={styles.hero}
        style={{ backgroundImage: 'linear-gradient(rgba(15, 27, 36, 0.8), rgba(15, 27, 36, 0.8)), url("/images/caleb-ruiter-EmEQ6kK_5P0-unsplash.webp")' }}
      >
        <div className={styles.heroEyebrow}>{servicesLanding.heroEyebrow}</div>
        <h1 className={styles.heroTitle}>{servicesLanding.heroTitle}</h1>
        <p className={styles.heroSubtitle}>{servicesLanding.heroSubtitle}</p>
      </section>

      {/* 2. Alternating Service Cards */}
      <section className={styles.servicesList}>
        {allSlugs.map((slug) => {
          const service = serviceDetails[slug];
          if (!service) return null;

          return (
            <div key={slug} className={styles.serviceCard}>
              <div 
                className={styles.cardImage} 
                style={{ backgroundImage: `url(${service.image})` }}
              />
              <div className={styles.cardContent}>
                <div>
                  <h2 className={styles.cardTitle}>{service.title}</h2>
                  <p className={styles.cardDesc}>{service.intro1}</p>
                  
                  <ul className={styles.cardBenefits}>
                    {service.benefits?.slice(0, 3).map((benefit: string, idx: number) => {
                      const parts = benefit.split(':');
                      return (
                        <li key={idx}>
                          <div className={styles.bulletSquare}></div>
                          <div>
                            {parts.length > 1 ? (
                              <>
                                {parts[0]}: {parts.slice(1).join(':')}
                              </>
                            ) : (
                              benefit
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>

                  <Link href={`/${lang}/services/${slug}`} className="btn btn-primary">
                    {servicesLanding.requestService}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* 3. What Do We Offer Section */}
      <section className={styles.offerSection}>
        <div className={styles.offerHeader}>
          <div className={styles.offerEyebrow}>{servicesLanding.whatWeOffer.eyebrow}</div>
          <h2 className={styles.offerTitle}>{servicesLanding.whatWeOffer.title}</h2>
          <div className={styles.offerIntroCols}>
            <p>{servicesLanding.whatWeOffer.intro1}</p>
            <p>{servicesLanding.whatWeOffer.intro2}</p>
          </div>
        </div>

        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIconWrap}>
              <MapPin size={28} />
            </div>
            <h3 className={styles.featureTitle}>{servicesLanding.whatWeOffer.trackingTitle}</h3>
            <p className={styles.featureDesc}>{servicesLanding.whatWeOffer.trackingDesc}</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIconWrap}>
              <CreditCard size={28} />
            </div>
            <h3 className={styles.featureTitle}>{servicesLanding.whatWeOffer.installmentTitle}</h3>
            <p className={styles.featureDesc}>{servicesLanding.whatWeOffer.installmentDesc}</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIconWrap}>
              <ShieldCheck size={28} />
            </div>
            <h3 className={styles.featureTitle}>{servicesLanding.whatWeOffer.insuranceTitle}</h3>
            <p className={styles.featureDesc}>{servicesLanding.whatWeOffer.insuranceDesc}</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIconWrap}>
              <Scale size={28} />
            </div>
            <h3 className={styles.featureTitle}>{servicesLanding.whatWeOffer.legalTitle}</h3>
            <p className={styles.featureDesc}>{servicesLanding.whatWeOffer.legalDesc}</p>
          </div>
        </div>

        <div className={styles.offerBottom}>
          <p>{servicesLanding.whatWeOffer.intro3}</p>
          <p>{servicesLanding.whatWeOffer.bottomText1}</p>
          <p>{servicesLanding.whatWeOffer.bottomText2}</p>
          <p>{servicesLanding.whatWeOffer.bottomText3}</p>
        </div>
      </section>

      {/* 4. Types of Cargo Section */}
      <section className={styles.cargoSection}>
        <div className={styles.cargoContainer}>
          
          {/* Left Side: Accordion */}
          <div className={styles.cargoLeft}>
            <div className={styles.cargoEyebrow}>{servicesLanding.typesOfCargo.eyebrow}</div>
            <h2 className={styles.cargoTitle}>{servicesLanding.typesOfCargo.title}</h2>
            <p className={styles.cargoSubtitle}>{servicesLanding.typesOfCargo.subtitle}</p>

            <div className={styles.accordionList}>
              {servicesLanding.typesOfCargo.cargoTypes.map((type: string, idx: number) => (
                <div key={idx} className={styles.accordionItem}>
                  <span>{type}</span>
                  <span>+</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Text & Bullets */}
          <div className={styles.cargoRight}>
            <p className={styles.cargoIntro}>{servicesLanding.typesOfCargo.intro}</p>
            
            <div className={styles.docsList}>
              <div className={styles.docLink}>
                <FileText size={16} />
                {servicesLanding.typesOfCargo.doc1}
              </div>
              <div className={styles.docLink}>
                <FileText size={16} />
                {servicesLanding.typesOfCargo.doc2}
              </div>
              <div className={styles.docLink}>
                <FileText size={16} />
                {servicesLanding.typesOfCargo.doc3}
              </div>
            </div>

            <p className={styles.cargoBulletsIntro}>{servicesLanding.typesOfCargo.bulletsIntro}</p>

            <ul className={styles.cargoBullets}>
              {servicesLanding.typesOfCargo.bullets.map((bullet: string, idx: number) => (
                <li key={idx}>
                  <div className={styles.cargoBulletSquare}></div>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

    </div>
  );
}
