'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from './ServicesPage.module.css';

interface Service {
  slug: string;
  title: string;
  desc: string;
  image: string;
}

interface ServicesShowcaseListProps {
  services: Service[];
  lang: string;
  exploreBtn: string;
}

export default function ServicesShowcaseList({ services, lang, exploreBtn }: ServicesShowcaseListProps) {
  return (
    <div className={styles.showcaseList}>
      {services.map((srv, idx) => (
        <ShowcaseCard key={srv.slug} service={srv} lang={lang} exploreBtn={exploreBtn} reverse={idx % 2 === 1} />
      ))}
    </div>
  );
}

function ShowcaseCard({
  service,
  lang,
  exploreBtn,
  reverse,
}: {
  service: Service;
  lang: string;
  exploreBtn: string;
  reverse: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const directionClass = reverse ? styles.showcaseFromRight : styles.showcaseFromLeft;

  return (
    <div
      ref={ref}
      className={[
        styles.showcaseCard,
        reverse ? styles.showcaseCardReverse : '',
        directionClass,
        visible ? styles.showcaseVisible : '',
      ].join(' ')}
    >
      <div className={styles.showcaseMockup}>
        <div className={styles.showcaseMockupDots}>
          <span />
          <span />
          <span />
        </div>
        <img src={service.image} alt={service.title} className={styles.showcaseMockupImg} />
      </div>

      <div className={styles.showcaseContent}>
        <h3>{service.title}</h3>
        <p>{service.desc}</p>
        <Link href={`/${lang}/services/${service.slug}`} className={styles.showcaseBtn}>
          {exploreBtn}
        </Link>
      </div>
    </div>
  );
}
