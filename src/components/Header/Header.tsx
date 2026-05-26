'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import styles from './Header.module.css';
import { 
  Phone, Mail, MapPin, Search, Menu, X, ChevronDown, User, ArrowRight,
  Plane, Ship, Truck, Train, Package, Anchor, AlertTriangle, Box, FileCheck, Warehouse,
  ShoppingCart, Activity, Car, Factory, Coffee, FlaskConical, HardHat, Cpu
} from 'lucide-react';

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

  const changeLanguage = (newLang: 'en' | 'ru' | 'hy') => {
    if (!pathname) return;
    const pathParts = pathname.split('/');
    pathParts[1] = newLang;
    const newPath = pathParts.join('/');
    router.push(newPath);
  };

  const navItems = [
    {
      label: dict.nav.services,
      href: `/${lang}/services`,
      mega: [
        { title: dict.services.air, desc: "Fast global delivery for urgent cargo", href: `/${lang}/services/air-freight`, icon: <Plane size={20} /> },
        { title: dict.services.sea, desc: "Cost-effective ocean transit", href: `/${lang}/services/sea-freight`, icon: <Ship size={20} /> },
        { title: dict.services.road, desc: "Reliable overland transport", href: `/${lang}/services/road-transport`, icon: <Truck size={20} /> },
        { title: dict.services.rail, desc: "Efficient train logistics", href: `/${lang}/services/rail-freight`, icon: <Train size={20} />, isNew: true },
        { title: dict.services.groupage, desc: "Consolidated LTL shipping", href: `/${lang}/services/groupage-cargo`, icon: <Package size={20} /> },
        { title: dict.services.heavy, desc: "Oversized project cargo", href: `/${lang}/services/heavy-bulky-cargo`, icon: <Anchor size={20} /> },
        { title: dict.services.dangerous, desc: "Certified hazardous handling", href: `/${lang}/services/dangerous-goods`, icon: <AlertTriangle size={20} /> },
        { title: dict.services.container, desc: "FCL container solutions", href: `/${lang}/services/container-shipping`, icon: <Box size={20} /> },
        { title: dict.services.customs, desc: "Seamless border clearance", href: `/${lang}/services/customs-clearance`, icon: <FileCheck size={20} /> },
        { title: dict.services.warehousing, desc: "Secure storage & distribution", href: `/${lang}/services/warehousing`, icon: <Warehouse size={20} /> },
      ],
      megaTitle: dict.nav.services,
    },
    {
      label: dict.nav.routes,
      href: `/${lang}/routes`,
      mega: [
        { title: dict.routes.china, desc: "Direct from Shenzhen & Shanghai", href: `/${lang}/routes/china-to-armenia`, icon: <MapPin size={20} /> },
        { title: dict.routes.russia, desc: "Moscow & regional connections", href: `/${lang}/routes/russia-to-armenia`, icon: <MapPin size={20} /> },
        { title: dict.routes.germany, desc: "European hub routes", href: `/${lang}/routes/germany-to-armenia`, icon: <MapPin size={20} /> },
        { title: dict.routes.usa, desc: "Transatlantic freight lines", href: `/${lang}/routes/usa-to-armenia`, icon: <MapPin size={20} /> },
        { title: dict.routes.uae, desc: "Middle East transit hub", href: `/${lang}/routes/uae-to-armenia`, icon: <MapPin size={20} /> },
      ],
      megaTitle: dict.nav.routes,
    },
    {
      label: dict.nav.industries,
      href: `/${lang}/industries`,
      mega: [
        { title: dict.industries.ecommerce, desc: "B2C & B2B fulfillment", href: `/${lang}/industries/e-commerce`, icon: <ShoppingCart size={20} /> },
        { title: dict.industries.pharma, desc: "Temperature-controlled transit", href: `/${lang}/industries/pharmaceutical`, icon: <Activity size={20} /> },
        { title: dict.industries.auto, desc: "Parts & vehicle transport", href: `/${lang}/industries/automotive`, icon: <Car size={20} /> },
        { title: dict.industries.heavy, desc: "Heavy machinery logistics", href: `/${lang}/industries/heavy-machinery`, icon: <Factory size={20} /> },
        { title: dict.industries.food, desc: "Perishable goods handling", href: `/${lang}/industries/food-perishables`, icon: <Coffee size={20} /> },
        { title: dict.industries.chemical, desc: "Specialized material transport", href: `/${lang}/industries/chemical`, icon: <FlaskConical size={20} /> },
        { title: dict.industries.construction, desc: "Building supply chains", href: `/${lang}/industries/construction`, icon: <HardHat size={20} /> },
        { title: dict.industries.electronics, desc: "High-value tech security", href: `/${lang}/industries/electronics`, icon: <Cpu size={20} /> },
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
            <a 
              href="https://www.google.com/maps/search/?api=1&query=Cio+Logistics+LLC+Nairi+Zaryan+22a,+Yerevan" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`${styles.contactLink} ${styles.hideMobile}`}
            >
              <MapPin size={14} /> {dict.nav.yerevanHQ}
            </a>
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
                        <div className={styles.megaGrid}>
                          {item.mega.map((sub, subIdx) => (
                            <Link key={subIdx} href={sub.href} className={styles.megaLink}>
                              <div className={styles.megaIconWrapper}>
                                {sub.icon}
                              </div>
                              <div className={styles.megaTextWrapper}>
                                <div className={styles.megaItemTitleWrap}>
                                  <span className={styles.megaItemTitle}>{sub.title}</span>
                                  <ArrowRight size={14} className={styles.megaArrow} />
                                  {sub.isNew && <span className={styles.megaBadge}>NEW</span>}
                                </div>
                                <span className={styles.megaItemDesc}>{sub.desc}</span>
                              </div>
                            </Link>
                          ))}
                        </div>
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
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '24px' }}>
                    {item.mega.map((sub, subIdx) => (
                      <Link 
                        key={subIdx} 
                        href={sub.href} 
                        className={styles.navLink}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {sub.title}
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
