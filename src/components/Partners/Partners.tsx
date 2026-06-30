'use client';
import React from 'react';
import styles from './Partners.module.css';

const partnersData = [
  { src: "https://ciologistics.com/wp-content/uploads/2024/03/6-scaled.jpg", name: "Global Pharma Partner" },
  { src: "https://ciologistics.com/wp-content/uploads/2024/03/7-scaled.jpg", name: "Eurasian Mining Supply" },
  { src: "https://ciologistics.com/wp-content/uploads/2024/03/8-scaled.jpg", name: "Armenia Industrial Equipment" },
  { src: "https://ciologistics.com/wp-content/uploads/2024/03/9-scaled.jpg", name: "Caucasus Retail Distribution" },
  { src: "https://ciologistics.com/wp-content/uploads/2024/03/10-scaled.jpg", name: "International Beverage Importer" },
  { src: "https://ciologistics.com/wp-content/uploads/2024/03/11-scaled.jpg", name: "Textile & Apparel Express" },
  { src: "https://ciologistics.com/wp-content/uploads/2024/03/12-scaled.jpg", name: "High-Tech Electronics Armenia" },
  { src: "https://ciologistics.com/wp-content/uploads/2024/03/13-scaled.jpg", name: "Agricultural Exports Network" },
  { src: "https://ciologistics.com/wp-content/uploads/2024/03/14-scaled.jpg", name: "Automotive Spare Parts Hub" },
  { src: "https://ciologistics.com/wp-content/uploads/2024/03/15-scaled.jpg", name: "Cold Chain Logistics Partner" },
  { src: "https://ciologistics.com/wp-content/uploads/2024/03/16-scaled.jpg", name: "Eurasian Chemical Transit" },
  { src: "https://ciologistics.com/wp-content/uploads/2024/03/17-scaled.jpg", name: "Heavy Machinery Transporter" },
  { src: "https://ciologistics.com/wp-content/uploads/2024/03/18-scaled.jpg", name: "Global E-Commerce Fulfillment" },
  { src: "https://ciologistics.com/wp-content/uploads/2024/03/19-scaled.jpg", name: "Armenian Food Importers Union" },
  { src: "https://ciologistics.com/wp-content/uploads/2024/03/20-scaled.jpg", name: "Construction Materials Logistics" },
  { src: "https://ciologistics.com/wp-content/uploads/2024/03/21-scaled.jpg", name: "Healthcare Supplies Corridor" },
  { src: "https://ciologistics.com/wp-content/uploads/2024/03/22-scaled.jpg", name: "CIS Freight Logistics" },
  { src: "https://ciologistics.com/wp-content/uploads/2024/03/23-scaled.jpg", name: "Middle East Cargo Line" },
  { src: "https://ciologistics.com/wp-content/uploads/2024/03/24-scaled.jpg", name: "European Road Freight Partner" },
  { src: "https://ciologistics.com/wp-content/uploads/2024/03/25-scaled.jpg", name: "Yerevan Transit Hub Partner" }
];

interface PartnersProps {
  dict: any;
}

export default function Partners({ dict }: PartnersProps) {
  // Duplicate images exactly once to achieve the infinite CSS scroll trick
  const sliderItems = [...partnersData, ...partnersData];

  return (
    <section className={styles.partnersSection} aria-label="Client & Partner Logos">
      <h2 className={styles.title}>{dict?.partners?.title || "THEY TRUST US"}</h2>
      <div className={styles.sliderContainer}>
        <div className={styles.sliderTrack}>
          {sliderItems.map((item, index) => (
            <div key={index} className={styles.slide}>
              <img src={item.src} alt={`${item.name} Logo`} title={item.name} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
