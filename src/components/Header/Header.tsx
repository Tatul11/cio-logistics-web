'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import styles from './Header.module.css';
import { Phone, Mail, MapPin, Search, Menu, X, ChevronDown, User, Globe } from 'lucide-react';

interface HeaderProps {
  lang: 'en' | 'ru' | 'hy';
  dict: any;
}

export default function Header({ lang, dict }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper to switch language prefix in current path
  const changeLanguage = (newLang: 'en' | 'ru' | 'hy') => {
    if (!pathname) return;
    const pathParts = pathname.split('/');
    // pathParts[0] is empty, pathParts[1] is the locale
    pathParts[1] = newLang;
    const newPath = pathParts.join('/');
    router.push(newPath);
  };

  const navItems = [
    {
      label: dict.nav.services,
      href: `/${lang}/services`,
      mega: [
        { label: `✈️ ${dict.services.air}`, href: `/${lang}/services/air-freight` },
        { label: `🚢 ${dict.services.sea}`, href: `/${lang}/services/sea-freight` },
        { label: `🚛 ${dict.services.road}`, href: `/${lang}/services/road-transport` },
        { label: `🚂 ${dict.services.rail}`, href: `/${lang}/services/rail-freight`, isNew: true },
        { label: `📦 ${dict.services.groupage}`, href: `/${lang}/services/groupage-cargo` },
        { label: `🏗️ ${dict.services.heavy}`, href: `/${lang}/services/heavy-bulky-cargo` },
        { label: `⚠️ ${dict.services.dangerous}`, href: `/${lang}/services/dangerous-goods` },
        { label: `📦 ${dict.services.container}`, href: `/${lang}/services/container-shipping` },
        { label: `🛃 ${dict.services.customs}`, href: `/${lang}/services/customs-clearance` },
        { label: `🏭 ${dict.services.warehousing}`, href: `/${lang}/services/warehousing` },
      ],
      megaTitle: dict.nav.services,
    },
    {
      label: dict.nav.routes,
      href: `/${lang}/routes`,
      mega: [
        { label: `🇨🇳 ${dict.routes.china}`, href: `/${lang}/routes/china-to-armenia` },
        { label: `🇷🇺 ${dict.routes.russia}`, href: `/${lang}/routes/russia-to-armenia` },
        { label: `🇩🇪 ${dict.routes.germany}`, href: `/${lang}/routes/germany-to-armenia` },
        { label: `🇺🇸 ${dict.routes.usa}`, href: `/${lang}/routes/usa-to-armenia` },
        { label: `🇦🇪 ${dict.routes.uae}`, href: `/${lang}/routes/uae-to-armenia` },
      ],
      megaTitle: dict.nav.routes,
    },
    {
      label: dict.nav.industries,
      href: `/${lang}/industries`,
      mega: [
        { label: `🛍️ ${dict.industries.ecommerce}`, href: `/${lang}/industries/ecommerce` },
        { label: `💊 ${dict.industries.pharma}`, href: `/${lang}/industries/pharmaceutical` },
        { label: `🚗 ${dict.industries.auto}`, href: `/${lang}/industries/automotive` },
        { label: `🏗️ ${dict.industries.heavy}`, href: `/${lang}/industries/industrial` },
        { label: `🍎 ${dict.industries.food}`, href: `/${lang}/industries/food-perishables` },
        { label: `⚗️ ${dict.industries.chemical}`, href: `/${lang}/industries/chemical` },
        { label: `🏢 ${dict.industries.construction}`, href: `/${lang}/industries/construction` },
        { label: `📱 ${dict.industries.electronics}`, href: `/${lang}/industries/electronics` },
      ],
      megaTitle: dict.nav.industries,
    },
    { label: dict.nav.solutions, href: `/${lang}/#solutions` },
    { label: dict.nav.insights, href: `/${lang}/#insights` },
    { label: dict.nav.about, href: `/${lang}/about` },
  ];

  return (
    <div className={`${styles.headerContainer} ${scrolled ? styles.scrolled : ''}`}>
      {/* Top Utility Bar */}
      <div className={styles.utilityBar}>
        <div className={`container ${styles.utilityInner}`}>
          <div className={styles.contacts}>
            <a href="tel:+37495211121" className={styles.contactLink}>
              <Phone size={14} /> +(374) 95 211 121
            </a>
            <a href="mailto:info@ciologistics.com" className={styles.contactLink}>
              <Mail size={14} /> info@ciologistics.com
            </a>
            <span className={`${styles.contactLink} ${styles.hideMobile}`}>
              <MapPin size={14} /> {dict.nav.yerevanHQ}
            </span>
          </div>
          <div className={styles.rightSide}>
            <div className={styles.langSwitcher}>
              <button
                onClick={() => changeLanguage('en')}
                className={`${styles.langBtn} ${lang === 'en' ? styles.langBtnActive : ''}`}
              >
                EN
              </button>
              <button
                onClick={() => changeLanguage('ru')}
                className={`${styles.langBtn} ${lang === 'ru' ? styles.langBtnActive : ''}`}
              >
                RU
              </button>
              <button
                onClick={() => changeLanguage('hy')}
                className={`${styles.langBtn} ${lang === 'hy' ? styles.langBtnActive : ''}`}
              >
                HY
              </button>
            </div>
            <Link href={`/${lang}/#portal`} className={`${styles.contactLink} ${styles.portalLink}`}>
              <User size={14} /> {dict.nav.customerPortal}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Nav Header */}
      <div className={styles.mainHeader}>
        <div className={`container ${styles.headerInner}`}>
          {/* Logo */}
          <Link href={`/${lang}`} className={styles.logo} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img 
              src="https://ciologistics.com/wp-content/uploads/2024/03/CIO-logo-1-scaled.webp" 
              alt="CIO Logistics Logo" 
              style={{ height: '42px', width: 'auto', objectFit: 'contain' }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.nav}>
            <ul className={styles.navList}>
              {navItems.map((item, idx) => (
                <li key={idx} className={styles.navItem}>
                  {item.mega ? (
                    <>
                      <button className={styles.navLink}>
                        {item.label} <ChevronDown className={styles.caret} size={12} />
                      </button>
                      <div className={styles.megaMenu}>
                        <div className={styles.megaTitle}>{item.megaTitle}</div>
                        {item.mega.map((sub, subIdx) => (
                          <Link key={subIdx} href={sub.href} className={styles.megaLink}>
                            {sub.label}
                            {sub.isNew && <span className={styles.megaBadge}>NEW</span>}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link href={item.href} className={styles.navLink}>
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Right CTAs */}
          <div className={styles.ctas}>
            <button className={styles.searchIcon} aria-label="Search">
              <Search size={18} />
            </button>
            <Link href={`/${lang}/#track`} className="btn btn-secondary">
              {dict.nav.trackShipment}
            </Link>
            <Link href={`/${lang}/quote`} className="btn btn-primary">
              {dict.nav.getQuote} →
            </Link>
            <button
              className={styles.mobileToggle}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation panel */}
      {mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {navItems.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Link
                  href={item.href}
                  className={styles.navLink}
                  style={{ padding: '8px 0', fontSize: '16px' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
                {item.mega && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', paddingLeft: '12px' }}>
                    {item.mega.slice(0, 6).map((sub, subIdx) => (
                      <Link
                        key={subIdx}
                        href={sub.href}
                        style={{ fontSize: '13px', color: 'var(--text-body)', fontWeight: 500 }}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
              <Link href={`/${lang}/#track`} className="btn btn-secondary btn-full" onClick={() => setMobileMenuOpen(false)}>
                {dict.nav.trackShipment}
              </Link>
              <Link href={`/${lang}/quote`} className="btn btn-primary btn-full" onClick={() => setMobileMenuOpen(false)}>
                {dict.nav.getQuote}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
