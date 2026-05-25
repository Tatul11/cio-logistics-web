'use client';
import React from 'react';
import styles from './Partners.module.css';

const images = [
  "https://ciologistics.com/wp-content/uploads/2024/03/6-scaled.jpg",
  "https://ciologistics.com/wp-content/uploads/2024/03/7-scaled.jpg",
  "https://ciologistics.com/wp-content/uploads/2024/03/8-scaled.jpg",
  "https://ciologistics.com/wp-content/uploads/2024/03/9-scaled.jpg",
  "https://ciologistics.com/wp-content/uploads/2024/03/10-scaled.jpg",
  "https://ciologistics.com/wp-content/uploads/2024/03/11-scaled.jpg",
  "https://ciologistics.com/wp-content/uploads/2024/03/12-scaled.jpg",
  "https://ciologistics.com/wp-content/uploads/2024/03/13-scaled.jpg",
  "https://ciologistics.com/wp-content/uploads/2024/03/14-scaled.jpg",
  "https://ciologistics.com/wp-content/uploads/2024/03/15-scaled.jpg",
  "https://ciologistics.com/wp-content/uploads/2024/03/16-scaled.jpg",
  "https://ciologistics.com/wp-content/uploads/2024/03/17-scaled.jpg",
  "https://ciologistics.com/wp-content/uploads/2024/03/18-scaled.jpg",
  "https://ciologistics.com/wp-content/uploads/2024/03/19-scaled.jpg",
  "https://ciologistics.com/wp-content/uploads/2024/03/20-scaled.jpg",
  "https://ciologistics.com/wp-content/uploads/2024/03/21-scaled.jpg",
  "https://ciologistics.com/wp-content/uploads/2024/03/22-scaled.jpg",
  "https://ciologistics.com/wp-content/uploads/2024/03/23-scaled.jpg",
  "https://ciologistics.com/wp-content/uploads/2024/03/24-scaled.jpg",
  "https://ciologistics.com/wp-content/uploads/2024/03/25-scaled.jpg"
];

interface PartnersProps {
  dict: any;
}

export default function Partners({ dict }: PartnersProps) {
  // Duplicate images exactly once to achieve the infinite CSS scroll trick
  const sliderImages = [...images, ...images];

  return (
    <section className={styles.partnersSection}>
      <h2 className={styles.title}>{dict?.partners?.title || "THEY TRUST US"}</h2>
      <div className={styles.sliderContainer}>
        <div className={styles.sliderTrack}>
          {sliderImages.map((src, index) => (
            <div key={index} className={styles.slide}>
              <img src={src} alt={`Partner ${index + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
