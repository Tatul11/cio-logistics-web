import React from 'react';
import { Metadata } from 'next';
import { getDictionary } from '@/lib/dictionary';
import { ShieldCheck, Award, Target, ArrowRight } from 'lucide-react';
import Partners from '@/components/Partners/Partners';
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

  // Comprehensive translations corresponding to the exact 42DM structures
  const localDict = {
    en: {
      heroTitleSpan: "CIO Logistics",
      heroTitle: "your ultimate answer to global logistics",
      heroDesc: "We empower trade, manufacturing, and technology companies at every stage of their supply chain journey to reach their highest potential.",
      heroBtn: "Kick off your growth",
      heroBadgeLabel: "Your results-driven logistics team: meet accredited professionals",
      
      flatTitleSpan: "unlock the true potential",
      flatTitle: "We are on a mission to of your logistics",
      flatLeft1Line1: "Founded in",
      flatLeft1Line2: "2016",
      flatLeft1Line3: "by customs & transport geeks",
      flatLeft2Line1: "Active in",
      flatLeft2Line2: "150+",
      flatLeft2Line3: "countries & trade corridors",
      flatCenterTextSpan: "global supply chains",
      flatCenterText: "Focused exclusively on quality logistics & safety for",
      flatRight1Line1: "More than",
      flatRight1Line2: "120K+",
      flatRight1Line3: "tons of cargo shipped annually",
      flatRight2Line1: "Team of",
      flatRight2Line2: "20+",
      flatRight2Line3: "in-house custom specialists",

      historyTitle: "Our history",
      historyBody: [
        "In the world of international trade, there isn't a supercomputer or a simple checklist to provide precise answers on global shipping routes, volatile custom regulations, or border logistics.",
        "But importing and exporting businesses have something even better: CIO Logistics. A team of dedicated logistics professionals with custom-made answers to your specific goals and first-class solutions for all your transport needs.",
        "Since our founding in Yerevan in 2016, we have grown from a local customs broker into a multi-modal freight forwarding powerhouse, bridging Armenia with Europe, China, Russia, and the Americas."
      ],

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

      funTitle: "We are a lot of fun, too",

      testimonialsTitle: "Testimonials",
      testimonialsSubtitle: "You are in good company",

      dreamBigTitle: "Dreaming big?",
      dreamBigDesc: "Get your personalized freight rates and route optimization plan within 2 hours from our team.",
      dreamBigBtn: "Kick off your growth"
    },
    ru: {
      heroTitleSpan: "CIO Logistics",
      heroTitle: "ваш лучший ответ на вопросы глобальной логистики",
      heroDesc: "Мы помогаем торговым, производственным и технологическим компаниям на каждом этапе цепочки поставок раскрыть их полный потенциал.",
      heroBtn: "Начать рост",
      heroBadgeLabel: "Ваша ориентированная на результат логистическая команда: аккредитованные профессионалы",
      
      flatTitleSpan: "раскрыть истинный потенциал",
      flatTitle: "Наша миссия — вашей логистики",
      flatLeft1Line1: "Основана в",
      flatLeft1Line2: "2016",
      flatLeft1Line3: "экспертами по таможне и ВЭД",
      flatLeft2Line1: "Работаем в",
      flatLeft2Line2: "150+",
      flatLeft2Line3: "странах и торговых коридорах",
      flatCenterTextSpan: "мировых цепочек поставок",
      flatCenterText: "Фокус на качестве логистики и безопасности для",
      flatRight1Line1: "Более",
      flatRight1Line2: "120К+",
      flatRight1Line3: "тонн грузов перевозится ежегодно",
      flatRight2Line1: "Команда из",
      flatRight2Line2: "20+",
      flatRight2Line3: "штатных специалистов по логистике",

      historyTitle: "Наша история",
      historyBody: [
        "В мире международной торговли не существует суперкомпьютера или простого контрольного списка, который дал бы точные ответы о глобальных маршрутах доставки, меняющихся таможенных правилах или пограничной логистике.",
        "Но у импортеров и экспортеров есть кое-что получше: CIO Logistics. Команда преданных своему делу профессионалов логистики, предлагающая индивидуальные решения для ваших конкретных целей и первоклассный сервис.",
        "С момента нашего основания в Ереване в 2016 году мы выросли из локального таможенного брокера в мультимодального экспедитора, соединяющего Армению с Европой, Китаем, Россией и Америкой."
      ],

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

      funTitle: "С нами тоже весело",

      testimonialsTitle: "Отзывы",
      testimonialsSubtitle: "Вы в хорошей компании",

      dreamBigTitle: "Мыслите масштабно?",
      dreamBigDesc: "Получите индивидуальный расчет тарифа и оптимизацию маршрута от нашей команды в течение 2 часов.",
      dreamBigBtn: "Начать рост"
    },
    hy: {
      heroTitleSpan: "CIO Logistics",
      heroTitle: "համաշխարհային լոգիստիկայի ձեր լավագույն պատասխանը",
      heroDesc: "Մենք աջակցում ենք առևտրային, արտադրական և տեխնոլոգիական ընկերություններին մատակարարման շղթայի յուրաքանչյուր փուլում՝ բացահայտելու իրենց ողջ պոտենցիալը:",
      heroBtn: "Սկսել աճը",
      heroBadgeLabel: "Արդյունքի վրա հիմնված լոգիստիկ թիմ. հանդիպեք հավատարմագրված մասնագետներին",
      
      flatTitleSpan: "բացահայտել իրական պոտենցիալը",
      flatTitle: "Մեր առաքելությունն է լոգիստիկայի",
      flatLeft1Line1: "Հիմնադրվել է",
      flatLeft1Line2: "2016",
      flatLeft1Line3: "մաքսային և տրանսպորտի փորձագետների կողմից",
      flatLeft2Line1: "Գործում է",
      flatLeft2Line2: "150+",
      flatLeft2Line3: "երկրներում և առևտրային միջանցքներում",
      flatCenterTextSpan: "գլոբալ մատակարարման շղթաներում",
      flatCenterText: "Որակյալ լոգիստիկայի և անվտանգության կենտրոնացում",
      flatRight1Line1: "Ավելի քան",
      flatRight1Line2: "120Կ+",
      flatRight1Line3: "տոննա բեռ փոխադրված տարեկան",
      flatRight2Line1: "Թիմը",
      flatRight2Line2: "20+",
      flatRight2Line3: "ներքին մաքսային մասնագետներ",

      historyTitle: "Մեր պատմությունը",
      historyBody: [
        "Միջազգային առևտրի աշխարհում չկա գերհամակարգիչ կամ պարզ ստուգաթերթ, որը ճշգրիտ պատասխաններ կտա բեռնափոխադրման համաշխարհային երթուղիների, փոփոխվող մաքսային կանոնակարգերի կամ սահմանային լոգիստիկայի վերաբերյալ:",
        "Սակայն ներմուծող և արտահանող ընկերություններն ունեն ավելի լավ լուծում՝ CIO Logistics-ը: Լոգիստիկայի նվիրված մասնագետների թիմ, որն առաջարկում է անհատական պատասխաններ ձեր կոնկրետ նպատակներին և առաջնակարգ լուծումներ ձեր բոլոր տրանսպորտային կարիքների համար:",
        "2016 թվականին Երևանում մեր հիմնադրումից ի վեր մենք տեղական մաքսային բրոքերից վերածվել ենք մուլտիմոդալ բեռնափոխադրող ընկերության՝ կապելով Հայաստանը Եվրոպայի, Չինաստանի, Ռուսաստանի և Ամերիկայի հետ:"
      ],

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

      funTitle: "Մեզ հետ նաև հետաքրքիր է",

      testimonialsTitle: "Կարծիքներ",
      testimonialsSubtitle: "Դուք լավ ընկերակցության մեջ եք",

      dreamBigTitle: "Մեծ նպատակնե՞ր ունեք",
      dreamBigDesc: "Ստացեք Ձեր անհատականացված բեռնափոխադրման սակագները և երթուղու օպտիմալացման պլանը 2 ժամվա ընթացքում մեր թիմից:",
      dreamBigBtn: "Սկսել համագործակցությունը"
    }
  }[lang];

  return (
    <div className={styles.pageWrapper}>
      {/* 1. team-section-about */}
      <section className={styles.teamSectionAbout}>
        <div className="container">
          <div className={styles.teamSectionAboutRow}>
            <div className={styles.teamSectionAboutContent}>
              <div className={styles.teamSectionAboutContentTop}>
                {/* 
                  H1 Title Styled explicitly:
                  First part in highlighted orange/red, second part (after colon) in white.
                  This ensures perfect rendering and addresses the user's specific request.
                */}
                <h1 style={{ color: '#ffffff', fontSize: '48px', fontWeight: 800, marginBottom: '24px', lineHeight: '1.25' }}>
                  <span style={{ color: 'var(--cio-orange)' }}>{localDict.heroTitleSpan}</span>: {localDict.heroTitle}
                </h1>
                <p>{localDict.heroDesc}</p>
                <a href="#quote-form-section" className={styles.kickoffBtn}>
                  {localDict.heroBtn} <ArrowRight size={18} />
                </a>
              </div>

              <div className={styles.teamSectionAboutContentBottom}>
                <h2>{localDict.heroBadgeLabel}</h2>
                <div className={styles.certListRow}>
                  <div className={styles.certBadgeItem}>ISO 9001:2015</div>
                  <div className={styles.certBadgeItem}>FIATA Member</div>
                  <div className={styles.certBadgeItem}>IATA Agent</div>
                  <div className={styles.certBadgeItem}>IRU Registered</div>
                  <div className={styles.certBadgeItem}>AEO Status</div>
                </div>
              </div>
            </div>

            {/* Team Grid of 9 Cards to match 42DM's layout exactly */}
            <div className={styles.teamSectionAboutTeam}>
              {[
                { name: localDict.founderSignature, job: "Founder & CEO", img: "/founder.jpg" },
                { name: "Maria Jibilyan", job: "Director", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop" },
                { name: "Nairi Seyranyan", job: "Logistics Coordinator", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop" },
                { name: "Garik Yeghiazaryan", job: "Customs Broker", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&auto=format&fit=crop" },
                { name: "Armen Ghazaryan", job: "Custom Specialist", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop" },
                { name: "Eteri Tsatryan", job: "Customer Success", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop" },
                { name: "Anna", job: "Logistics Specialist", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop" },
                { name: "Gor Hovhannisyan", job: "Compliance Specialist", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300&auto=format&fit=crop" },
                { name: "Olga Postnikova", job: "Operations Coordinator", img: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=300&auto=format&fit=crop" }
              ].map((member, idx) => (
                <div key={idx} className={styles.teamItem}>
                  <div 
                    className={styles.ourTeamSectionItem} 
                    style={{ backgroundImage: `url(${member.img})` }}
                  >
                    <div className={styles.ourTeamSectionItemFooter}>
                      <div className={styles.ourTeamSectionItemName}>{member.name}</div>
                      <div className={styles.ourTeamSectionItemJob}>{member.job}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      <Partners dict={dict} />

      {/* 2. flat-layout-section */}
      <section className={styles.flatLayoutSection}>
        <div className="container">
          <div className={styles.flatLayoutSectionTitle}>
            <h2>
              We are on a mission to <span>{localDict.flatTitleSpan}</span> {localDict.flatTitle.replace('unlock the true potential', '')}
            </h2>
          </div>

          <div className={styles.flatLayoutSectionRow}>
            
            {/* Left Column Stack */}
            <div className={styles.flatLayoutSectionColLeft}>
              <div className={styles.flatLayoutSectionItem} style={{ backgroundColor: '#F4EEFF' }}>
                <div className={styles.line1}>{localDict.flatLeft1Line1}</div>
                <div className={styles.line2}>{localDict.flatLeft1Line2}</div>
                <div className={styles.line3}>{localDict.flatLeft1Line3}</div>
              </div>
              <div className={styles.flatLayoutSectionItem} style={{ backgroundColor: '#FFF2E9' }}>
                <div className={styles.line1}>{localDict.flatLeft2Line1}</div>
                <div className={styles.line2}>{localDict.flatLeft2Line2}</div>
                <div className={styles.line3}>{localDict.flatLeft2Line3}</div>
              </div>
            </div>

            {/* Center Column Accent */}
            <div className={styles.flatLayoutSectionColCenter}>
              <p>
                {localDict.flatCenterText} <span>{localDict.flatCenterTextSpan}</span>
              </p>
            </div>

            {/* Right Column Stack */}
            <div className={styles.flatLayoutSectionColRight}>
              <div className={styles.flatLayoutSectionItem} style={{ backgroundColor: '#FFFAE7' }}>
                <div className={styles.line1}>{localDict.flatRight1Line1}</div>
                <div className={styles.line2}>{localDict.flatRight1Line2}</div>
                <div className={styles.line3}>{localDict.flatRight1Line3}</div>
              </div>
              <div className={styles.flatLayoutSectionItem} style={{ backgroundColor: '#EAF7ED' }}>
                <div className={styles.line1}>{localDict.flatRight2Line1}</div>
                <div className={styles.line2}>{localDict.flatRight2Line2}</div>
                <div className={styles.line3}>{localDict.flatRight2Line3}</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. our-history-section */}
      <section className={styles.ourHistorySection}>
        <div className="container">
          <div className={styles.ourHistorySectionRow}>
            
            <div className={styles.ourHistorySectionContent}>
              <h2>{localDict.historyTitle}</h2>
              {localDict.historyBody.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className={styles.ourHistorySectionImage}>
              <img 
                src="/images/bent-van-aeken-0A7YwYhZhWw-unsplash.webp" 
                alt="CIO Logistics Operations" 
              />
            </div>

          </div>
        </div>
      </section>

      {/* 4. founder-speech-section */}
      <section className={styles.founderSpeechSection}>
        <div className="container">
          <div className={styles.founderSpeechRow}>
            <div className={styles.founderSpeechImgContainer}>
              <img src="/founder.jpg" alt={localDict.founderSignature} className={styles.founderSpeechImg} />
              <div className={styles.founderSpeechBadge}>
                <div className={styles.founderSpeechName}>{localDict.founderSignature}</div>
                <div className={styles.founderSpeechTitle}>{localDict.founderRole}</div>
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

      {/* 5. timeline-section */}
      <section className={styles.timelineSection}>
        <div className="container">
          <div className={styles.timelineSectionTitle}>
            <h2>{localDict.timelineTitle}</h2>
            <p>{localDict.timelineDesc}</p>
          </div>

          <div className={styles.timelineSectionRow}>
            {localDict.timeline.map((item, idx) => (
              <div key={idx} className={`${styles.timelineSectionItemWrapper} ${idx % 2 === 0 ? styles.timelineSectionItemWrapperEven : ''}`}>
                <div className={styles.timelineDot}></div>
                <div className={styles.timelineSectionItem}>
                  <span className={styles.timelineSectionItemYear}>{item.year}</span>
                  <p className={styles.timelineSectionItemContent}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. full-width-section */}
      <section className={styles.fullWidthSection}>
        <div className={styles.fullWidthSectionTitle}>
          <h2>{localDict.funTitle}</h2>
        </div>
        <div className={styles.desktopImage}>
          <img 
            src="/images/bernd-dittrich-AA1HmM6FzVE-unsplash.webp" 
            alt="International Logistics Operations" 
          />
        </div>
      </section>

      {/* 7. testimonials-section */}
      <section className={styles.testimonialsSection}>
        <div className="container">
          <div className={styles.testimonialsSectionTitle}>
            <h2>
              <span>{localDict.testimonialsSubtitle}</span> — {localDict.testimonialsTitle}
            </h2>
          </div>

          <div className={styles.testimonialsSectionRow}>
            {[
              { text: dict.reviews.rev1, author: dict.reviews.rev1Author, src: dict.reviews.rev1Src },
              { text: dict.reviews.rev2, author: dict.reviews.rev2Author, src: dict.reviews.rev2Src },
              { text: dict.reviews.rev3, author: dict.reviews.rev3Author, src: dict.reviews.rev3Src }
            ].map((review, idx) => (
              <div key={idx} className={styles.testimonialCard}>
                <p className={styles.testimonialText}>"{review.text}"</p>
                <div className={styles.testimonialMeta}>
                  <span className={styles.testimonialAuthor}>{review.author}</span>
                  <span className={styles.testimonialSource}>{review.src}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications and Compliance Details */}
      <section className={styles.certificationsSection} id="certifications">
        <div className="container">
          <div className={styles.certificationsSectionHeader}>
            <h2>{dict.certifications.title}</h2>
            <p>{dict.certifications.desc}</p>
          </div>

          {/* Anti-Corruption Policy Block */}
          <div className={styles.compliancePolicyBlock} id="compliance-policy">
            <h3>
              <ShieldCheck size={24} color="var(--cio-orange)" />
              Anti-Corruption & Regulatory Compliance Policy
            </h3>
            <p className={styles.compliancePolicyText}>
              CIO Logistics is committed to conducting operations transparently and honestly. We enforce a zero-tolerance policy towards corruption, bribery, or any form of illegal facilitation payments. Our employees, brokers, and logistics partners undergo routine training in international anti-bribery standards (including FCPA and UK Bribery Act adaptations).
            </p>
            <div className={styles.compliancePolicyContact}>
              Questions or reports? Contact: compliance@ciologistics.com
            </div>
          </div>

          {/* Active Memberships Standard Badges Grid */}
          <div>
            <div className={styles.subTitleBadges}>International Quality Standards</div>
            <div className={styles.standardsBadgesGrid}>
              {[
                { img: "https://ciologistics.com/wp-content/uploads/2024/03/iso-9001-768x768.png", label: "ISO 9001 System" },
                { img: "https://ciologistics.com/wp-content/uploads/2025/02/certified-company-certificate-iso-90012015-blue-vector-51290540.jpg", label: "ISO Certified" },
                { img: "https://ciologistics.com/wp-content/uploads/2024/03/%D0%A1%D0%9C%D0%9K01.2676_page-0001.jpg", label: "SMK Spec 1" },
                { img: "https://ciologistics.com/wp-content/uploads/2024/03/%D0%A1%D0%9C%D0%9K01.2676_page-0002.jpg", label: "SMK Spec 2" },
                { img: "https://ciologistics.com/wp-content/uploads/2025/02/542_iata.jpg", label: "IATA Member" },
                { img: "https://ciologistics.com/wp-content/uploads/2025/02/Federation_Internationale_des_Associations_de_Transitaires_et_Assimiles_logo.svg.png", label: "FIATA Federation" }
              ].map((badge, idx) => (
                <div key={idx} className={styles.standardBadgeCard}>
                  <div className={styles.standardBadgeImgWrapper}>
                    <img src={badge.img} alt={badge.label} className={styles.standardBadgeImg} />
                  </div>
                  <span className={styles.standardBadgeLabel}>{badge.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* License Documents Gallery */}
          <div>
            <div className={styles.subTitleBadges}>Official Certifications & Qualifications</div>
            <div className={styles.licensesGrid}>
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
                  className={styles.licenseCard}
                >
                  <div className={styles.licenseCardImgWrapper}>
                    <img src={cert.img} alt={cert.title} className={styles.licenseCardImg} />
                  </div>
                  <div className={styles.licenseCardTitle}>{cert.title}</div>
                  <div className={styles.licenseCardName}>{cert.name}</div>
                </a>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 8. contact-section (Dreaming big?) */}
      <section className={styles.contactSection} id="quote-form-section">
        <div className="container">
          <div className={styles.contactSectionInner}>
            <div className={styles.contactSectionTitle}>
              <h2>
                {localDict.dreamBigTitle.split(' ').map((word, idx, arr) => 
                  idx === arr.length - 1 ? <span key={idx}>{word}</span> : word + ' '
                )}
              </h2>
            </div>
            <p className={styles.contactSectionDesc}>
              {localDict.dreamBigDesc}
            </p>
            <div className={styles.contactBtnRow}>
              <a href={`/${lang}/contact`} className={styles.contactBtnPrimary}>
                {localDict.dreamBigBtn} <ArrowRight size={18} />
              </a>
              <a href={`/${lang}`} className={styles.contactBtnSecondary}>
                Use Quote Calculator
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
