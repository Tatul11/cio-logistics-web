'use client';

import React from 'react';
import Link from 'next/link';
import styles from './StickyCTA.module.css';
import { DollarSign, MessageCircleCode } from 'lucide-react';

interface StickyCTAProps {
  lang: 'en' | 'ru' | 'hy';
  dict: any;
}

export default function StickyCTA({ lang, dict }: StickyCTAProps) {
  return (
    <div className={styles.stickyCta}>
      {/* Get Quote FAB */}
      <Link href={`/${lang}/quote`} className={`${styles.fab} ${styles.quote}`}>
        <DollarSign size={18} />
        <span>{dict.nav.getQuote}</span>
      </Link>

      {/* WhatsApp FAB */}
      <a
        href="https://wa.me/37495211121"
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.fab} ${styles.whatsapp}`}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircleCode size={24} />
      </a>
    </div>
  );
}
