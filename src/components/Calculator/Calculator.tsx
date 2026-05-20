'use client';

import React, { useState, useEffect } from 'react';
import styles from './Calculator.module.css';
import { Calendar, ArrowRight, ShieldCheck } from 'lucide-react';

interface CalculatorProps {
  lang: 'en' | 'ru' | 'hy';
  dict: any;
}

// Localized translation keys for Calculator component
const translations = {
  en: {
    weight: "Gross Weight",
    volume: "Volume",
    cbm: "CBM",
    kg: "kg",
    budgetTitle: "Estimated Budget Range",
    transitTime: "Transit Time",
    baseFreight: "Base Freight Charge",
    customs: "Estimated Customs Handling",
    insurance: "Cargo Insurance (Optional)",
    button: "Request Verified Custom Offer",
    disclaimer: "Estimated calculation based on EAEU corridor tariff grids. Non-binding estimate.",
    china: "China (Shanghai/Ningbo)",
    russia: "Russia (Moscow/Novorossiysk)",
    germany: "Germany (Frankfurt/Hamburg)",
    usa: "USA (New York/LA)",
    uae: "UAE (Dubai Jebel Ali)",
    italy: "Italy (Milan/Genoa)",
    armeniaYerevan: "Armenia (Yerevan HQ)",
    armeniaGyumri: "Armenia (Gyumri Hub)",
    armeniaVanadzor: "Armenia (Vanadzor)",
    modeSea: "Sea Freight (FCL/LCL)",
    modeAir: "Air Freight (Express)",
    modeRoad: "Road Transport (FTL/LTL)",
    modeRail: "Rail Freight (Block Train)",
    cargoGeneral: "General / Dry Cargo",
    cargoDangerous: "Dangerous Goods (ADR/Hazmat)",
    cargoPerishable: "Perishables (Reefer)",
    cargoOversized: "Oversized / Heavy Bulky",
    days: "days",
    alertSent: "Quote request details forwarded to CIO logistics desk. A custom offer will be sent to your email in 2 hours."
  },
  ru: {
    weight: "Вес брутто",
    volume: "Объем",
    cbm: "куб. м",
    kg: "кг",
    budgetTitle: "Оценочный бюджет",
    transitTime: "Время в пути",
    baseFreight: "Базовый тариф на фрахт",
    customs: "Оформление таможни (оценка)",
    insurance: "Страхование груза (опция)",
    button: "Запросить точный расчет",
    disclaimer: "Предварительный расчет на основе тарифов ЕАЭС. Не является офертой.",
    china: "Китай (Шанхай/Нингбо)",
    russia: "Россия (Москва/Новороссийск)",
    germany: "Германия (Франкфурт/Гамбург)",
    usa: "США (Нью-Йорк/Л-А)",
    uae: "ОАЭ (Дубай Джебель Али)",
    italy: "Италия (Милан/Генуя)",
    armeniaYerevan: "Армения (Ереван Офис)",
    armeniaGyumri: "Армения (Гюмри Хаб)",
    armeniaVanadzor: "Армения (Ванадзор)",
    modeSea: "Морской фрахт (FCL/LCL)",
    modeAir: "Авиаперевозка (Экспресс)",
    modeRoad: "Автодоставка (FTL/LTL)",
    modeRail: "Ж/Д перевозка (Блок-поезд)",
    cargoGeneral: "Генеральный / Сухой груз",
    cargoDangerous: "Опасный груз (ADR/Hazmat)",
    cargoPerishable: "Скоропортящийся (Рефрижератор)",
    cargoOversized: "Крупногабаритный / Тяжелый",
    days: "дней",
    alertSent: "Запрос отправлен в CIO Logistics. Коммерческое предложение будет отправлено в течение 2 часов."
  },
  hy: {
    weight: "Քաշ (կգ)",
    volume: "Ծավալ (CBM)",
    cbm: "CBM",
    kg: "կգ",
    budgetTitle: "Նախահաշվային Բյուջե",
    transitTime: "Տրանզիտի Ժամկետ",
    baseFreight: "Բեռնափոխադրման բազային արժեք",
    customs: "Մաքսային ձևակերպման ծախս (գնահատում)",
    insurance: "Բեռի ապահովագրություն (կամընտիր)",
    button: "Ստանալ Ճշգրտված Առաջարկ",
    disclaimer: "Մոտավոր հաշվարկ՝ հիմնված ԵԱՏՄ սակագների վրա։ Պարտադիր առաջարկ չէ:",
    china: "Չինաստան (Շանհայ/Նինբո)",
    russia: "Ռուսաստան (Մոսկվա/Նովորոսիյսկ)",
    germany: "Գերմանիա (Ֆրանկֆուրտ/Համբուրգ)",
    usa: "ԱՄՆ (Նյու Յորք/Լոս Անջելես)",
    uae: "ԱՄԷ (Դուբայ Ջեբել Ալի)",
    italy: "Իտալիա (Միլան/Ջենովա)",
    armeniaYerevan: "Հայաստան (Երևան Գրասենյակ)",
    armeniaGyumri: "Հայաստան (Գյումրի Հաբ)",
    armeniaVanadzor: "Հայաստան (Վանաձոր)",
    modeSea: "Ծովային բեռնափոխադրում (FCL/LCL)",
    modeAir: "Օդային բեռնափոխադրում (Էքսպրես)",
    modeRoad: "Ավտոփոխադրում (FTL/LTL)",
    modeRail: "Երկաթուղային բեռնափոխադրում",
    cargoGeneral: "Սովորական / Չոր բեռ",
    cargoDangerous: "Վտանգավոր բեռ (ADR/Hazmat)",
    cargoPerishable: "Շուտ փչացող (Ռեֆրիժերատոր)",
    cargoOversized: "Գերծանր / Ոչ ստանդարտ",
    days: "օր",
    alertSent: "Հարցումն ուղարկվել է CIO Logistics: Առաջարկը կուղարկվի 2 ժամվա ընթացքում:"
  }
};

export default function Calculator({ lang, dict }: CalculatorProps) {
  const [origin, setOrigin] = useState('china');
  const [destination, setDestination] = useState('yerevan');
  const [mode, setMode] = useState('sea');
  const [cargoType, setCargoType] = useState('general');
  const [weight, setWeight] = useState(500);
  const [volume, setVolume] = useState(2);
  
  // Output states
  const [priceLow, setPriceLow] = useState(0);
  const [priceHigh, setPriceHigh] = useState(0);
  const [transit, setTransit] = useState('');
  
  // Cost breakdown states
  const [breakdownBase, setBreakdownBase] = useState(0);
  const [breakdownCustoms, setBreakdownCustoms] = useState(150);
  const [breakdownInsurance, setBreakdownInsurance] = useState(45);

  const t = translations[lang] || translations.en;

  useEffect(() => {
    // Basic freight pricing algorithm
    let baseRatePerKg = 1.2; // default
    
    if (mode === 'air') {
      baseRatePerKg = 4.8;
    } else if (mode === 'sea') {
      baseRatePerKg = 0.55;
    } else if (mode === 'rail') {
      baseRatePerKg = 0.85;
    } else if (mode === 'road') {
      baseRatePerKg = 1.1;
    }

    // Distance/zone factor based on origin
    let zoneCost = 250;
    if (origin === 'usa') {
      zoneCost = 900;
    } else if (origin === 'china') {
      zoneCost = 500;
    } else if (origin === 'germany') {
      zoneCost = 350;
    } else if (origin === 'russia') {
      zoneCost = 200;
    } else if (origin === 'uae') {
      zoneCost = 300;
    }

    // Transit time calculations
    let transitTimeStr = `10-14 ${t.days}`;
    if (mode === 'air') {
      transitTimeStr = `3-5 ${t.days}`;
      if (origin === 'usa') transitTimeStr = `5-8 ${t.days}`;
      else if (origin === 'china') transitTimeStr = `5-7 ${t.days}`;
      else if (origin === 'uae') transitTimeStr = `2-4 ${t.days}`;
    } else if (mode === 'sea') {
      transitTimeStr = `35-45 ${t.days}`;
      if (origin === 'usa') transitTimeStr = `40-50 ${t.days}`;
    } else if (mode === 'rail') {
      transitTimeStr = `18-22 ${t.days}`;
    } else if (mode === 'road') {
      transitTimeStr = `8-12 ${t.days}`;
      if (origin === 'germany') transitTimeStr = `10-14 ${t.days}`;
      else if (origin === 'russia') transitTimeStr = `7-10 ${t.days}`;
    }

    // Cargo type multiplier
    let cargoMultiplier = 1.0;
    if (cargoType === 'dangerous') cargoMultiplier = 1.35;
    else if (cargoType === 'perishable') cargoMultiplier = 1.2;
    else if (cargoType === 'oversized') cargoMultiplier = 1.5;

    // Weight/Volume factor
    // Chargeable weight is the greater of actual weight and volumetric weight (1 cbm = 167 kg for air, 1 cbm = 333 kg for road/rail/sea)
    const volumetricRatio = mode === 'air' ? 167 : 333;
    const volumetricWeight = volume * volumetricRatio;
    const chargeableWeight = Math.max(weight, volumetricWeight);

    // Calculate core price
    const baseFreightCost = (chargeableWeight * baseRatePerKg + zoneCost) * cargoMultiplier;
    
    // Low and High Range estimates (+/- 10%)
    const calculatedLow = Math.round(baseFreightCost * 0.9);
    const calculatedHigh = Math.round(baseFreightCost * 1.1);

    // Breakdown components
    const baseVal = Math.round(baseFreightCost * 0.85);
    const customsVal = 150;
    const insuranceVal = Math.round(baseFreightCost * 0.02 + 25);

    setPriceLow(calculatedLow);
    setPriceHigh(calculatedHigh);
    setTransit(transitTimeStr);
    
    setBreakdownBase(baseVal);
    setBreakdownCustoms(customsVal);
    setBreakdownInsurance(insuranceVal);

  }, [origin, destination, mode, cargoType, weight, volume, t.days]);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{dict.hero.cardTitle}</h3>
      <p className={styles.sub}>{dict.hero.cardSub}</p>

      <div className={styles.grid}>
        {/* Origin dropdown */}
        <div className={styles.formGroup}>
          <label className={styles.label}>{dict.hero.labelFrom}</label>
          <select
            className={styles.select}
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
          >
            <option value="china">🇨🇳 {t.china}</option>
            <option value="russia">🇷🇺 {t.russia}</option>
            <option value="germany">🇩🇪 {t.germany}</option>
            <option value="usa">🇺🇸 {t.usa}</option>
            <option value="uae">🇦🇪 {t.uae}</option>
            <option value="italy">🇮🇹 {t.italy}</option>
          </select>
        </div>

        {/* Destination dropdown */}
        <div className={styles.formGroup}>
          <label className={styles.label}>{dict.hero.labelTo}</label>
          <select
            className={styles.select}
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          >
            <option value="yerevan">🇦🇲 {t.armeniaYerevan}</option>
            <option value="gyumri">🇦🇲 {t.armeniaGyumri}</option>
            <option value="vanadzor">🇦🇲 {t.armeniaVanadzor}</option>
          </select>
        </div>

        {/* Transport Mode */}
        <div className={styles.formGroup}>
          <label className={styles.label}>{dict.hero.labelMode}</label>
          <select
            className={styles.select}
            value={mode}
            onChange={(e) => setMode(e.target.value)}
          >
            <option value="sea">🚢 {t.modeSea}</option>
            <option value="air">✈️ {t.modeAir}</option>
            <option value="road">🚛 {t.modeRoad}</option>
            <option value="rail">🚂 {t.modeRail}</option>
          </select>
        </div>

        {/* Cargo Type */}
        <div className={styles.formGroup}>
          <label className={styles.label}>{dict.hero.labelCargo}</label>
          <select
            className={styles.select}
            value={cargoType}
            onChange={(e) => setCargoType(e.target.value)}
          >
            <option value="general">📦 {t.cargoGeneral}</option>
            <option value="dangerous">⚠️ {t.cargoDangerous}</option>
            <option value="perishable">🍎 {t.cargoPerishable}</option>
            <option value="oversized">🏗️ {t.cargoOversized}</option>
          </select>
        </div>

        {/* Weight Slider */}
        <div className={styles.sliderGroup}>
          <div className={styles.sliderHeader}>
            <label className={styles.label}>{t.weight}</label>
            <span className={styles.sliderVal}>{weight.toLocaleString()} {t.kg}</span>
          </div>
          <input
            type="range"
            min="10"
            max="25000"
            step="10"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className={styles.slider}
          />
        </div>

        {/* Volume Slider */}
        <div className={styles.sliderGroup}>
          <div className={styles.sliderHeader}>
            <label className={styles.label}>{t.volume}</label>
            <span className={styles.sliderVal}>{volume} {t.cbm}</span>
          </div>
          <input
            type="range"
            min="0.1"
            max="80"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className={styles.slider}
          />
        </div>
      </div>

      {/* Pricing Estimate Card */}
      <div className={styles.results}>
        <div className={styles.resultsTitle}>{t.budgetTitle}</div>
        <div className={styles.priceRange}>
          USD ${priceLow.toLocaleString()} - ${priceHigh.toLocaleString()}
        </div>
        <div className={styles.transitTime}>
          <Calendar size={14} />
          <span>{t.transitTime}: <strong>{transit}</strong></span>
        </div>

        {/* Cost Breakdown */}
        <div className={styles.breakdown}>
          <div className={styles.breakdownRow}>
            <span>{t.baseFreight}:</span>
            <strong>${breakdownBase.toLocaleString()}</strong>
          </div>
          <div className={styles.breakdownRow}>
            <span>{t.customs}:</span>
            <strong>${breakdownCustoms}</strong>
          </div>
          <div className={styles.breakdownRow}>
            <span>{t.insurance}:</span>
            <strong>${breakdownInsurance}</strong>
          </div>
        </div>

        {/* Submit action */}
        <button
          className="btn btn-primary btn-full"
          onClick={() => alert(t.alertSent)}
        >
          <span>{t.button}</span>
          <ArrowRight size={16} />
        </button>
        
        <div className={styles.disclaimer} style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'center' }}>
          <ShieldCheck size={12} color="var(--success)" />
          <span>{t.disclaimer}</span>
        </div>
      </div>
    </div>
  );
}
