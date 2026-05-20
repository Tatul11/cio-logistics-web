'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';
import { Facebook, Instagram, Linkedin, Youtube, Send } from 'lucide-react';

interface FooterProps {
  lang: 'en' | 'ru' | 'hy';
  dict: any;
}

export default function Footer({ lang, dict }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerGrid}>
          {/* Column 1 - Brand Info */}
          <div className={styles.col}>
            <div className={styles.logoArea} style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <img 
                src="https://ciologistics.com/wp-content/uploads/2024/03/CIO-logo-1-scaled.webp" 
                alt="CIO Logistics Logo" 
                style={{ height: '36px', width: 'auto', objectFit: 'contain' }}
              />
            </div>
            <p className={styles.aboutText}>
              {dict.footer.desc}
            </p>
            <div className={styles.socialLinks}>
              <a href="https://www.facebook.com/ciologisticsworldwide/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="https://www.instagram.com/CioLogistics/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="https://www.linkedin.com/company/cio-logistics/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="https://www.youtube.com/@CIOLogistics" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="YouTube">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Column 2 - Services */}
          <div className={styles.col}>
            <h5>{dict.nav.services}</h5>
            <ul>
              <li><Link href={`/${lang}/services/air-freight`}>{dict.services.air}</Link></li>
              <li><Link href={`/${lang}/services/sea-freight`}>{dict.services.sea}</Link></li>
              <li><Link href={`/${lang}/services/road-transport`}>{dict.services.road}</Link></li>
              <li><Link href={`/${lang}/services/rail-freight`}>{dict.services.rail}</Link></li>
              <li><Link href={`/${lang}/services/groupage-cargo`}>{dict.services.groupage}</Link></li>
              <li><Link href={`/${lang}/services/dangerous-goods`}>{dict.services.dangerous}</Link></li>
              <li><Link href={`/${lang}/services/customs-clearance`}>{dict.services.customs}</Link></li>
            </ul>
          </div>

          {/* Column 3 - Routes */}
          <div className={styles.col}>
            <h5>{dict.nav.routes}</h5>
            <ul>
              <li><Link href={`/${lang}/routes/china-to-armenia`}>{dict.routes.china}</Link></li>
              <li><Link href={`/${lang}/routes/russia-to-armenia`}>{dict.routes.russia}</Link></li>
              <li><Link href={`/${lang}/routes/germany-to-armenia`}>{dict.routes.germany}</Link></li>
              <li><Link href={`/${lang}/routes/usa-to-armenia`}>{dict.routes.usa}</Link></li>
              <li><Link href={`/${lang}/routes/uae-to-armenia`}>{dict.routes.uae}</Link></li>
              <li><Link href={`/${lang}/routes`}>{dict.routes.exploreAll} →</Link></li>
            </ul>
          </div>

          {/* Column 4 - Company */}
          <div className={styles.col}>
            <h5>{dict.nav.about}</h5>
            <ul>
              <li><Link href={`/${lang}/about`}>{dict.nav.about}</Link></li>
              <li><Link href={`/${lang}/about#team`}>{dict.nav.about} - Team</Link></li>
              <li><Link href={`/${lang}/about#certifications`}>{dict.certifications.title}</Link></li>
              <li><Link href={`/${lang}/#insights`}>{dict.nav.insights}</Link></li>
              <li><Link href={`/${lang}/contact`}>{dict.nav.contact}</Link></li>
            </ul>
          </div>

          {/* Column 5 - Newsletter */}
          <div className={styles.col}>
            <h5>{dict.footer.stayUpdated}</h5>
            <p className={styles.aboutText}>
              {dict.footer.newsletterDesc}
            </p>
            {subscribed ? (
              <div style={{ color: 'var(--success)', fontWeight: 600, fontSize: '14px' }}>
                ✓ Subscribed successfully!
              </div>
            ) : (
              <form className={styles.newsletterForm} onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder={dict.footer.placeholderEmail}
                  className={styles.emailInput}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn-primary">
                  {dict.footer.subscribe}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Certifications row */}
        <div className={styles.certBadges}>
          <span>{dict.footer.certBadgeIso}</span>
          <span>{dict.footer.certBadgeFiata}</span>
          <span>{dict.footer.certBadgeIata}</span>
          <span>{dict.footer.certBadgeIru}</span>
          <span>{dict.footer.certBadgeAeo}</span>
          <span>{dict.footer.certBadgeGdpr}</span>
        </div>

        {/* Copyright & Legal Links */}
        <div className={styles.bottom}>
          <div>{dict.footer.copyright}</div>
          <div className={styles.bottomLinks}>
            <Link href={`/${lang}/legal/privacy`}>{dict.footer.privacy}</Link>
            <Link href={`/${lang}/legal/terms`}>{dict.footer.terms}</Link>
            <Link href={`/${lang}/legal/cookies`}>{dict.footer.cookiePolicy}</Link>
            <Link href={`/${lang}/about#corruption`}>{dict.footer.antiCorruption}</Link>
            <Link href={`/${lang}/sitemap`}>{dict.footer.sitemap}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
