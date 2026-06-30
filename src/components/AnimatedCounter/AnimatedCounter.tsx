"use client";

import React, { useState, useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  value: string | number;
  duration?: number;
}

export default function AnimatedCounter({ value, duration = 2000 }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState<string>(String(value));
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef<boolean>(false);

  useEffect(() => {
    const valStr = String(value);
    
    // Parse prefix, numeric value, and suffix
    // Example: "120K+" -> prefix: "", num: 120, suffix: "K+"
    // Example: "-32%" -> prefix: "-", num: 32, suffix: "%"
    // Example: "98.6%" -> prefix: "", num: 98.6, suffix: "%"
    // Example: "2016" -> prefix: "", num: 2016, suffix: ""
    const match = valStr.match(/^([^0-9]*)([0-9,.]+)(.*)$/);
    if (!match) {
      setDisplayValue(valStr);
      return;
    }

    const prefix = match[1];
    const rawNum = match[2].replace(/,/g, '');
    const suffix = match[3];
    const targetNum = parseFloat(rawNum);

    if (isNaN(targetNum)) {
      setDisplayValue(valStr);
      return;
    }

    const decimals = rawNum.includes('.') ? rawNum.split('.')[1].length : 0;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          
          let startTime: number | null = null;
          
          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            
            // Ease-out cubic easing function for smooth deceleration
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentNum = targetNum * easeProgress;

            let formattedNum = currentNum.toFixed(decimals);
            if (rawNum.includes(',') || (targetNum >= 1000 && !valStr.includes('.'))) {
              const parts = formattedNum.split('.');
              parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
              formattedNum = parts.join('.');
            }

            setDisplayValue(`${prefix}${formattedNum}${suffix}`);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setDisplayValue(valStr); // Ensure exact final string match
            }
          };

          requestAnimationFrame(animate);
        }
      });
    }, { threshold: 0.15 });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [value, duration]);

  return <span ref={elementRef}>{displayValue}</span>;
}
