'use client';
import React, { useState, useEffect, useRef } from 'react';
import styles from './ProcessTimeline.module.css';
import { MessagesSquare, Calculator, FileCheck2, Truck, PackageCheck } from 'lucide-react';

export default function ProcessTimeline({ dict }: { dict: any }) {
  const [activeSteps, setActiveSteps] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const stepElements = containerRef.current.querySelectorAll('.process-step-row');
      const newActiveSteps: number[] = [];
      
      // The "trigger line" is 80% down the screen so items activate smoothly as they enter
      const triggerLine = window.innerHeight * 0.80; 
      
      stepElements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        // If the top of the step has crossed the trigger line, activate it!
        if (rect.top < triggerLine) {
          newActiveSteps.push(index);
        }
      });
      
      setActiveSteps(newActiveSteps);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check on load
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const steps = [
    { num: '#1', title: dict?.process?.step1 || "Submit Request", desc: dict?.process?.step1Desc || "Share cargo details via form, email, or call", icon: <MessagesSquare size={56} strokeWidth={1.5} color="var(--cio-navy)" /> },
    { num: '#2', title: dict?.process?.step2 || "Receive Quote", desc: dict?.process?.step2Desc || "Personalized pricing within 2 hours", icon: <Calculator size={56} strokeWidth={1.5} color="var(--cio-navy)" /> },
    { num: '#3', title: dict?.process?.step3 || "Documentation", desc: dict?.process?.step3Desc || "We prepare all customs & transit docs", icon: <FileCheck2 size={56} strokeWidth={1.5} color="var(--cio-navy)" /> },
    { num: '#4', title: dict?.process?.step4 || "Transit & Track", desc: dict?.process?.step4Desc || "Real-time updates along the corridor", icon: <Truck size={56} strokeWidth={1.5} color="var(--cio-navy)" /> },
    { num: '#5', title: dict?.process?.step5 || "Safe Delivery", desc: dict?.process?.step5Desc || "On-time arrival at final destination", icon: <PackageCheck size={56} strokeWidth={1.5} color="var(--cio-navy)" /> },
  ];

  return (
    <div className={styles.timelineContainer} ref={containerRef}>
      {steps.map((step, index) => {
        const isEven = index % 2 === 0;
        const isActive = activeSteps.includes(index);
        const isNextActive = activeSteps.includes(index + 1);

        return (
          <React.Fragment key={index}>
            <div data-index={index} className={`process-step-row ${styles.stepRow} ${isEven ? styles.rowEven : styles.rowOdd} ${isActive ? styles.activeStep : ''}`}>
              
              <div className={styles.textCol}>
                <div className={styles.titleWrap}>
                  <span className={styles.numberBadge}>{step.num}</span>
                  <h3 className={styles.title}>{step.title}</h3>
                </div>
                <p className={styles.desc}>{step.desc}</p>
              </div>
              
              <div className={styles.iconCol}>
                 <div className={styles.iconBox}>
                    {step.icon}
                 </div>
              </div>
            </div>

            {/* The line connecting steps */}
            {index < steps.length - 1 && (
               <div className={`${styles.connectorContainer} ${isNextActive ? styles.activeConnector : ''}`}>
                  <div className={isEven ? styles.sCurve : styles.zCurve}>
                    <div className={styles.curveTop}></div>
                    <div className={styles.curveBottom}></div>
                  </div>
               </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
