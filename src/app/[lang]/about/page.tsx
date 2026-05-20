import React from 'react';
import { Metadata } from 'next';
import { getDictionary } from '@/lib/dictionary';
import { ShieldCheck, Award, Target, ArrowRight } from 'lucide-react';
import styles from './About.module.css';

interface AboutPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata(props: AboutPageProps): Promise<Metadata> {
  const params = await props.params;
  const rawLang = params.lang || 'en';
  const lang = (rawLang === 'ru' || rawLang === 'hy' ? rawLang : 'en') as 'en' | 'ru' | 'hy';
  
  const titles = {
    en: "About CIO Logistics - History, Team & Accreditations",
    ru: "О компании CIO Logistics - История, команда и лицензии",
    hy: "CIO Logistics-ի մասին - Պատմություն, թիմ և լիցենզիաներ",
  };

  const descriptions = {
    en: "Learn about CIO Logistics. Founded in 2016 in Yerevan, Armenia. FIATA, IATA certified cargo operations, GDP cold chain logistics.",
    ru: "Узнайте о CIO Logistics. Основана в 2016 году в Ереване. Сертификация FIATA, IATA, холодная цепь ВЭД.",
    hy: "Բացահայտեք CIO Logistics-ը: Հիմնադրվել է 2016-ին Երևանում: FIATA, IATA որակավորումներ, լոգիստիկ լուծումներ:",
  };

  return {
    title: titles[lang],
    description: descriptions[lang],
  };
}

export default async function AboutPage(props: AboutPageProps) {
  const params = await props.params;
  const rawLang = params.lang || 'en';
  const lang = (rawLang === 'ru' || rawLang === 'hy' ? rawLang : 'en') as 'en' | 'ru' | 'hy';
  const dict = await getDictionary(lang);

  // Localized texts for the redesigned 42DM-inspired sections
  const localDict = {
    en: {
      heroTitle: "Your Gateway to Global Logistics Excellence",
      heroTitleSpan: "CIO Logistics",
      heroDesc: "Since 2016, CIO Logistics has engineered optimized supply chains, providing reliable multi-modal transport and seamless customs brokerage from Armenia to the world.",
      heroCta: "Talk to our Experts",
      badgesLabel: "Accredited member of international transport networks",
      statsTitle: "We are on a mission to connect Armenia to global trade corridors",
      stat1Val: "2016",
      stat1Label: "Founded",
      stat1Desc: "Est. in Yerevan, Armenia",
      stat2Val: "120K+",
      stat2Label: "Tons Shipped",
      stat2Desc: "Cargo transported annually",
      stat3Val: "150+",
      stat3Label: "Countries",
      stat3Desc: "Global destination reach",
      stat4Val: "20+",
      stat4Label: "Specialists",
      stat4Desc: "In-house customs & freight experts",
      founderSpeechHeader: "Founder's Address",
      founderSpeechTitle: "Building Trust, Delivering Commitments",
      founderSpeechBody: [
        "\"International freight forwarding is more than moving cargo from point A to point B; it is about building trust and enabling businesses to grow without borders. Since 2016, we have set out to simplify international trade for Armenian companies, establishing strict quality control and a robust global agent network.\"",
        "\"We handle every container and every shipment with uncompromising commitment to regulatory compliance and quality management. Our goal remains to provide transparent route engineering and first-class customer service to each partner who relies on us.\""
      ],
      founderSignature: "Tigran Stepanyan",
      founderRole: "Founder & CEO, CIO Group LLC",
      compliancePolicyLink: "Read our Anti-Corruption Policy",
      timelineTitle: "Our Journey & Milestones",
      timelineDesc: "How we grew from a local customs broker in Yerevan to a globally accredited multi-modal freight forwarder.",
      timeline: [
        { year: "2016", text: "Founded CIO Logistics in Yerevan, starting customs brokerage and local road freight services." },
        { year: "2018", text: "Expanded services to include multi-modal sea freight via Georgia (Poti/Batumi) and rail corridors from China." },
        { year: "2020", text: "Obtained official ISO 9001:2015 Quality Management certification, building digital shipment tracking integrations." },
        { year: "2022", text: "Joined FIATA and IRU as active members, launching temperature-controlled GDP cold-chain logistics for pharmaceutical imports." },
        { year: "2024 - Present", text: "Accredited as an IATA cargo agent, operating a global logistics bridge to 150+ countries with advanced customs pre-clearance solutions." }
      ],
      dreamBigTitle: "Dreaming Big? Let's Make It Happen Together!",
      dreamBigDesc: "Get your personalized freight rates and route optimization plan within 2 hours from our team.",
      dreamBigCta: "Kick off your growth"
    },
    ru: {
      heroTitle: "Ваш путь к безупречной глобальной логистике",
      heroTitleSpan: "CIO Logistics",
      heroDesc: "С 2016 года CIO Logistics разрабатывает оптимизированные цепочки поставок, предоставляя надежные мультимодальные перевозки и таможенное оформление из Еревана по всему миру.",
      heroCta: "Связаться с экспертом",
      badgesLabel: "Аккредитованный член международных транспортных сетей",
      statsTitle: "Наша миссия — соединить Армению с глобальными торговыми коридорами",
      stat1Val: "2016",
      stat1Label: "Основана",
      stat1Desc: "Офис в Ереване, Армения",
      stat2Val: "120K+",
      stat2Label: "Тонн ежегодно",
      stat2Desc: "Транспортируемый объем грузов",
      stat3Val: "150+",
      stat3Label: "Страны",
      stat3Desc: "Глобальный охват доставки",
      stat4Val: "20+",
      stat4Label: "Специалистов",
      stat4Desc: "Штатные эксперты по таможне и ВЭД",
      founderSpeechHeader: "Обращение основателя",
      founderSpeechTitle: "Строим доверие, выполняем обязательства",
      founderSpeechBody: [
        "\"Международные грузоперевозки — это не просто перемещение груза из пункта А в пункт Б; это создание доверия и предоставление бизнесу возможности расти без границ. С 2016 года мы стремимся упростить международную торговлю для армянских компаний, внедряя строгий контроль качества и надежную глобальную агентскую сеть.\"",
        "\"Мы относимся к каждому контейнеру и каждой поставке с бескомпромиссным соблюдением нормативных требований и управления качеством. Наша цель остается неизменной — предоставлять прозрачные маршруты и первоклассное обслуживание каждому партнеру, который полагается на нас.\""
      ],
      founderSignature: "Тигран Степанян",
      founderRole: "Основатель и генеральный директор, ООО СиАйО Групп",
      compliancePolicyLink: "Читать антикоррупционную политику",
      timelineTitle: "Наша история и этапы развития",
      timelineDesc: "Путь от локального таможенного брокера в Ереване до аккредитованного международными организациями экспедитора.",
      timeline: [
        { year: "2016", text: "Основание CIO Logistics в Ереване, запуск услуг таможенного брокера и локальных автоперевозок." },
        { year: "2018", text: "Расширение услуг мультимодальными морскими перевозками через порты Грузии (Поти/Батуми) и ж/д коридорами из Китая." },
        { year: "2020", text: "Успешное прохождение сертификации по стандарту систем менеджмента качества ISO 9001:2015." },
        { year: "2022", text: "Вступление в FIATA и IRU в качестве постоянного члена, запуск GDP перевозок для фармацевтики." },
        { year: "2024 - Наст. время", text: "Получение аккредитации IATA Cargo Agent, построение глобального логистического моста в 150+ стран с ускоренным оформлением." }
      ],
      dreamBigTitle: "Мыслите масштабно? Давайте достигнем этого вместе!",
      dreamBigDesc: "Получите индивидуальный расчет тарифа и оптимизацию маршрута от нашей команды в течение 2 часов.",
      dreamBigCta: "Начать сотрудничество"
    },
    hy: {
      heroTitle: "Գլոբալ լոգիստիկայի Ձեր լավագույն դարպասը",
      heroTitleSpan: "CIO Logistics",
      heroDesc: "2016 թվականից ի վեր CIO Logistics-ը նախագծում է օպտիմալ մատակարարման շղթաներ՝ ապահովելով հուսալի մուլտիմոդալ փոխադրումներ և անխափան մաքսային ձևակերպումներ Հայաստանից դեպի ողջ աշխարհ:",
      heroCta: "Խոսել մասնագետի հետ",
      badgesLabel: "Միջազգային տրանսպորտային ցանցերի հավատարմագրված անդամ",
      statsTitle: "Մեր առաքելությունն է կապել Հայաստանը համաշխարհային առևտրային միջանցքների հետ",
      stat1Val: "2016",
      stat1Label: "Հիմնադրվել է",
      stat1Desc: "Գրասենյակ Երևանում",
      stat2Val: "120K+",
      stat2Label: "Տոննա տարեկան",
      stat2Desc: "Փոխադրված բեռների ծավալը",
      stat3Val: "150+",
      stat3Label: "Երկրներ",
      stat3Desc: "Առաքման համաշխարհային աշխարհագրություն",
      stat4Val: "20+",
      stat4Label: "Մասնագետներ",
      stat4Desc: "Մաքսային ձևակերպման և բեռնափոխադրման փորձագետներ",
      founderSpeechHeader: "Հիմնադրի ուղերձը",
      founderSpeechTitle: "Կառուցելով վստահություն, կատարելով պարտավորություններ",
      founderSpeechBody: [
        "«Միջազգային բեռնափոխադրումները ավելին են, քան պարզապես բեռի տեղափոխումը A կետից B կետ. դա վստահության կառուցումն է և բիզնեսին առանց սահմանների աճելու հնարավորություն ընձեռելը: 2016 թվականից մեր նպատակն է եղել պարզեցնել միջազգային առևտուրը հայկական ընկերությունների համար՝ ներդնելով որակի խիստ վերահսկողություն և հուսալի համաշխարհային գործակալական ցանց:»",
        "«Մենք վերաբերվում ենք յուրաքանչյուր կոնտեյների և յուրաքանչյուր փոխադրմանը կարգավորող պահանջների և որակի կառավարման անզիջում համապատասխանությամբ: Մեր նպատակն է ապահովել թափանցիկ երթուղիներ և առաջնակարգ սպասարկում յուրաքանչյուր գործընկերոջ համար, ով վստահում է մեզ:»"
      ],
      founderSignature: "Տիգրան Ստեփանյան",
      founderRole: "Հիմնադիր և գլխավոր տնօրեն, «ՍիԱյՕ Գրուպ» ՍՊԸ",
      compliancePolicyLink: "Կարդալ հակակոռուպցիոն քաղաքականությունը",
      timelineTitle: "Մեր պատմությունը և ձեռքբերումները",
      timelineDesc: "Ինչպես մենք զարգացանք Երևանում տեղական մաքսային բրոքերից մինչև միջազգային մուլտիմոդալ բեռնափոխադրող:",
      timeline: [
        { year: "2016", text: "Հիմնադրվել է CIO Logistics-ը Երևանում՝ սկսելով մաքսային բրոքերային և տեղական ավտոփոխադրումների ծառայություններ:" },
        { year: "2018", text: "Ծառայությունների ընդլայնում մուլտիմոդալ ծովային փոխադրումներով Վրաստանի միջոցով (Փոթի/Բաթումի) և երկաթուղային միջանցքներով Չինաստանից:" },
        { year: "2020", text: "ISO 9001:2015 Որակի կառավարման համակարգի պաշտոնական սերտիֆիկատի ստացում, բեռների թվային հետևման գործիքների ներդրում:" },
        { year: "2022", text: "Անդամակցում FIATA-ին և IRU-ին որպես ակտիվ անդամ, դեղագործական ապրանքների GDP սառնարանային լոգիստիկայի գործարկում:" },
        { year: "2024 - Ներկա", text: "IATA ավիացիոն գործակալի որակավորման ստացում, գլոբալ լոգիստիկ կամուրջի կառուցում դեպի 150+ երկրներ՝ մաքսային արագ ձևակերպմամբ:" }
      ],
      dreamBigTitle: "Մեծ նպատակնե՞ր ունեք: Եկեք իրականացնենք դրանք միասին",
      dreamBigDesc: "Ստացեք Ձեր անհատականացված բեռնափոխադրման սակագները և երթուղու օպտիմալացման պլանը 2 ժամվա ընթացքում մեր թիմից:",
      dreamBigCta: "Սկսել համագործակցությունը"
    }
  }[lang];

  return (
    <div>
      {/* Redesigned Hero Section (42DM structural blueprint) */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroRow}>
            <div className={styles.heroContent}>
              <h1>
                <span>{localDict.heroTitleSpan}</span>: {localDict.heroTitle}
              </h1>
              <p className={styles.heroDesc}>{localDict.heroDesc}</p>
              
              <a href="#quote-form-section" className={styles.heroCtaBtn}>
                {localDict.heroCta} <ArrowRight size={18} />
              </a>

              {/* Partner Credentials Row */}
              <div className={styles.partnerLogos}>
                <div className={styles.partnerLogosTitle}>{localDict.badgesLabel}</div>
                <div className={styles.logosRow}>
                  <div className={styles.logoItem}>ISO 9001:2015</div>
                  <div className={styles.logoItem}>FIATA Member</div>
                  <div className={styles.logoItem}>IATA Agent</div>
                  <div className={styles.logoItem}>IRU Registered</div>
                  <div className={styles.logoItem}>AEO Status</div>
                </div>
              </div>
            </div>

            {/* Team Grid Cards on Hero Right Side */}
            <div className={styles.heroTeamGrid}>
              {[
                { name: localDict.founderSignature, job: localDict.founderRole, img: "/founder.jpg" },
                { name: "Maria Jibilyan", job: "Director", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop" },
                { name: "Nairi Seyranyan", job: "Logistics Coordinator", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop" },
                { name: "Garik Yeghiazaryan", job: "Customs Broker", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop" }
              ].map((member, idx) => (
                <div key={idx} className={styles.teamCard}>
                  <img src={member.img} alt={member.name} className={styles.teamCardImg} />
                  <div className={styles.teamCardOverlay}>
                    <div className={styles.teamCardName}>{member.name}</div>
                    <div className={styles.teamCardJob}>{member.job}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Mission & Stats Grid Section */}
      <section className={styles.statsSection}>
        <div className="container">
          <div className={styles.statsHeader}>
            <h2>
              We are on a mission to <span>connect Armenia</span> to the global trade corridors
            </h2>
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <div className={styles.statVal}>{localDict.stat1Val}</div>
              <div>
                <div className={styles.statLabel}>{localDict.stat1Label}</div>
                <div className={styles.statDesc}>{localDict.stat1Desc}</div>
              </div>
            </div>

            <div className={styles.statItem}>
              <div className={styles.statVal}>{localDict.stat2Val}</div>
              <div>
                <div className={styles.statLabel}>{localDict.stat2Label}</div>
                <div className={styles.statDesc}>{localDict.stat2Desc}</div>
              </div>
            </div>

            <div className={styles.statItem}>
              <div className={styles.statVal}>{localDict.stat3Val}</div>
              <div>
                <div className={styles.statLabel}>{localDict.stat3Label}</div>
                <div className={styles.statDesc}>{localDict.stat3Desc}</div>
              </div>
            </div>

            <div className={styles.statItem}>
              <div className={styles.statVal}>{localDict.stat4Val}</div>
              <div>
                <div className={styles.statLabel}>{localDict.stat4Label}</div>
                <div className={styles.statDesc}>{localDict.stat4Desc}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Speech Section */}
      <section className={styles.founderSection}>
        <div className="container">
          <div className={styles.founderRow}>
            <div className={styles.founderImgContainer}>
              <img src="/founder.jpg" alt={localDict.founderSignature} className={styles.founderImg} />
              <div className={styles.founderBadge}>
                <div className={styles.founderName}>{localDict.founderSignature}</div>
                <div className={styles.founderTitle}>{localDict.founderRole}</div>
              </div>
            </div>

            <div className={styles.founderSpeechBlock}>
              <span className={styles.quoteIcon}>“</span>
              <div className={styles.founderSpeechHeader}>
                <span className={styles.eyebrow}>{localDict.founderSpeechHeader}</span>
                <h3>{localDict.founderSpeechTitle}</h3>
              </div>
              <div className={styles.founderSpeechText}>
                {localDict.founderSpeechBody.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
              <div className={styles.founderSpeechFooter}>
                <div className={styles.signatureLabel}>
                  {localDict.founderSignature}
                  <span>CEO & Founder, CIO Group LLC</span>
                </div>
                <a href="#compliance-policy" className={styles.complianceLink}>
                  {localDict.compliancePolicyLink} <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Milestones Section */}
      <section className={styles.timelineSection}>
        <div className="container">
          <div className={styles.timelineHeader}>
            <h2>{localDict.timelineTitle}</h2>
            <p>{localDict.timelineDesc}</p>
          </div>

          <div className={styles.timelineContainer}>
            {localDict.timeline.map((item, idx) => (
              <div key={idx} className={`${styles.timelineItem} ${idx % 2 === 0 ? styles.timelineItemEven : ''}`}>
                <div className={styles.timelineDot}></div>
                <div className={styles.timelineContent}>
                  <span className={styles.timelineYear}>{item.year}</span>
                  <p className={styles.timelineText}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications and Compliance Details */}
      <section className={styles.certDetailsSection} id="certifications">
        <div className="container">
          <div className={styles.certHeader}>
            <h2>{dict.certifications.title}</h2>
            <p>{dict.certifications.desc}</p>
          </div>

          {/* Anti-Corruption Policy Block */}
          <div className={styles.policyBlock} id="compliance-policy">
            <h3>
              <ShieldCheck size={24} color="var(--cio-orange)" />
              Anti-Corruption & Regulatory Compliance Policy
            </h3>
            <p className={styles.policyText}>
              CIO Logistics is committed to conducting operations transparently and honestly. We enforce a zero-tolerance policy towards corruption, bribery, or any form of illegal facilitation payments. Our employees, brokers, and logistics partners undergo routine training in international anti-bribery standards (including FCPA and UK Bribery Act adaptations).
            </p>
            <div className={styles.policyContact}>
              Questions or reports? Contact: compliance@ciologistics.com
            </div>
          </div>

          {/* Active Memberships Standard Badges Grid */}
          <div>
            <div className={styles.badgesSubTitle}>International Quality Standards</div>
            <div className={styles.badgesGrid}>
              {[
                { img: "https://ciologistics.com/wp-content/uploads/2024/03/iso-9001-768x768.png", label: "ISO 9001 System" },
                { img: "https://ciologistics.com/wp-content/uploads/2025/02/certified-company-certificate-iso-90012015-blue-vector-51290540.jpg", label: "ISO Certified" },
                { img: "https://ciologistics.com/wp-content/uploads/2024/03/%D0%A1%D0%9C%D0%9A01.2676_page-0001.jpg", label: "SMK Spec 1" },
                { img: "https://ciologistics.com/wp-content/uploads/2024/03/%D0%A1%D0%9C%D0%9K01.2676_page-0002.jpg", label: "SMK Spec 2" },
                { img: "https://ciologistics.com/wp-content/uploads/2025/02/542_iata.jpg", label: "IATA Member" },
                { img: "https://ciologistics.com/wp-content/uploads/2025/02/Federation_Internationale_des_Associations_de_Transitaires_et_Assimiles_logo.svg.png", label: "FIATA Federation" }
              ].map((badge, idx) => (
                <div key={idx} className={styles.badgeCard}>
                  <div className={styles.badgeImgWrapper}>
                    <img src={badge.img} alt={badge.label} className={styles.badgeImg} />
                  </div>
                  <span className={styles.badgeLabel}>{badge.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* License Documents Gallery */}
          <div>
            <div className={styles.badgesSubTitle}>Official Certifications & Qualifications</div>
            <div className={styles.certsGrid}>
              {[
                { img: "https://ciologistics.com/wp-content/uploads/2024/03/6-Garik-Yeghiazaryan_page-0001-1.jpg", title: "Customs Broker", name: "G. Yeghiazaryan" },
                { img: "https://ciologistics.com/wp-content/uploads/2024/03/8-Armen-Ghazaryan-3_page-0001.jpg", title: "Custom Specialist", name: "A. Ghazaryan" },
                { img: "https://ciologistics.com/wp-content/uploads/2024/03/FIATA-Membership-Certificate-2-1_page-0001.jpg", title: "FIATA Membership", name: "CIO Logistics" },
                { img: "https://ciologistics.com/wp-content/uploads/2024/03/File-2_page-0001.jpg", title: "FIATA Training", name: "Yerevan Standards" },
                { img: "https://ciologistics.com/wp-content/uploads/2025/03/7-Nairi-Seyranyan-3-pdf.jpg", title: "Professional Qual.", name: "N. Seyranyan" }
              ].map((cert, idx) => (
                <a 
                  key={idx} 
                  href={cert.img} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.certCard}
                >
                  <div className={styles.certCardImgWrapper}>
                    <img src={cert.img} alt={cert.title} className={styles.certCardImg} />
                  </div>
                  <div className={styles.certCardTitle}>{cert.title}</div>
                  <div className={styles.certCardName}>{cert.name}</div>
                </a>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Bottom Dreaming Big Call-to-action Section */}
      <section className={styles.ctaSection} id="quote-form-section">
        <div className="container">
          <div className={styles.ctaContainer}>
            <h2 className={styles.ctaTitle}>
              {localDict.dreamBigTitle}
            </h2>
            <p className={styles.ctaDesc}>
              {localDict.dreamBigDesc}
            </p>
            <div className={styles.ctaButtonRow}>
              <a href={`/${lang}/contact`} className={styles.ctaBtnPrimary}>
                {localDict.dreamBigCta} <ArrowRight size={18} />
              </a>
              <a href={`/${lang}`} className={styles.ctaBtnSecondary}>
                Use Quote Calculator
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
