'use client';
import React from 'react';
import styles from './ProcessTimeline.module.css';
import { MessagesSquare, Calculator, FileCheck2, Truck, PackageCheck } from 'lucide-react';

export default function ProcessTimeline({ dict }: { dict: any }) {
  const steps = [
    { num: '#1', title: dict.process.step1, desc: dict.process.step1Desc, icon: <MessagesSquare size={56} strokeWidth={1.5} color="var(--cio-navy)" /> },
    { num: '#2', title: dict.process.step2, desc: dict.process.step2Desc, icon: <Calculator size={56} strokeWidth={1.5} color="var(--cio-navy)" /> },
    { num: '#3', title: dict.process.step3, desc: dict.process.step3Desc, icon: <FileCheck2 size={56} strokeWidth={1.5} color="var(--cio-navy)" /> },
    { num: '#4', title: dict.process.step4, desc: dict.process.step4Desc, icon: <Truck size={56} strokeWidth={1.5} color="var(--cio-navy)" /> },
    { num: '#5', title: dict.process.step5, desc: dict.process.step5Desc, icon: <PackageCheck size={56} strokeWidth={1.5} color="var(--cio-navy)" /> },
  ];

  return (
    <div className={styles.timelineContainer}>
      {steps.map((step, index) => {
        const isEven = index % 2 === 0;
        return (
          <div key={index} className={`${styles.stepRow} ${isEven ? styles.rowEven : styles.rowOdd}`}>
            {/* The line connecting steps */}
            {index < steps.length - 1 && (
               <div className={`${styles.connector} ${isEven ? styles.connectorRight : styles.connectorLeft}`}></div>
            )}
            
            <div className={styles.textContent}>
              <div className={`${styles.titleWrap} ${!isEven ? styles.titleWrapOdd : ''}`}>
                <span className={styles.numberBadge}>{step.num}</span>
                <h3 className={styles.title}>{step.title}</h3>
              </div>
              <p className={`${styles.desc} ${!isEven ? styles.descOdd : ''}`}>{step.desc}</p>
            </div>
            
            <div className={styles.iconContent}>
               <div className={styles.iconBox}>
                  {step.icon}
               </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
