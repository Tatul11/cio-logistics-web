import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Mail, Award, CheckCircle } from 'lucide-react';
import styles from './Author.module.css';

interface AuthorPageProps {
  params: Promise<{ lang: string; slug: string }>;
}

const authorsData: Record<string, {
  name: Record<string, string>;
  role: Record<string, string>;
  photo: string;
  bio: Record<string, string>;
  cert: string;
  exp: string;
  email: string;
}> = {
  "armen-ghazaryan": {
    name: { en: "Armen Ghazaryan", ru: "Армен Казарян", hy: "Արմեն Ղազարյան" },
    role: { en: "Senior Customs Specialist", ru: "Старший специалист по таможне", hy: "Ավագ մաքսային մասնագետ" },
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop",
    bio: {
      en: "Armen has over 8 years of specialized experience in Eurasian customs procedures, HS code classification, and complex transit clearance across EAEU and European transport corridors.",
      ru: "Армен имеет более 8 лет опыта в области таможенного оформления ЕАЭС, классификации кодов ТН ВЭД и сложного транзита по европейским коридорам.",
      hy: "Արմենն ունի ավելի քան 8 տարվա փորձ ԵԱՏՄ մաքսային ընթացակարգերի, ԱՏԳ ԱԱ կոդերի դասակարգման և բարդ տարանցիկ ձևակերպումների ոլորտում:"
    },
    cert: "Certified Customs Specialist RA #CS-2018-112",
    exp: "8+ Years in Eurasian Logistics",
    email: "a.ghazaryan@ciologistics.com"
  },
  "gor-hovhannisyan": {
    name: { en: "Gor Hovhannisyan", ru: "Гор Оганесян", hy: "Գոռ Հովհաննիսյան" },
    role: { en: "Regulatory & Compliance Lead", ru: "Руководитель по комплаенсу и регуляциям", hy: "Կանոնակարգման և համապատասխանության ղեկավար" },
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop",
    bio: {
      en: "Gor leads compliance audits, FIATA regulatory alignment, and AEO certification protocols. He ensures that every cross-border shipment adheres strictly to international shipping laws.",
      ru: "Гор руководит аудитами соответствия, стандартами FIATA и процедурами AEO. Он гарантирует строгое соблюдение международного транспортного права.",
      hy: "Գոռը ղեկավարում է համապատասխանության աուդիտները, FIATA ստանդարտները և AEO սերտիֆիկացման գործընթացները:"
    },
    cert: "FIATA Diploma in Freight Forwarding",
    exp: "10+ Years Compliance Expertise",
    email: "g.hovhannisyan@ciologistics.com"
  },
  "tigran-stepanyan": {
    name: { en: "Tigran Stepanyan", ru: "Тигран Степанян", hy: "Տիգրան Ստեփանյան" },
    role: { en: "Founder & CEO", ru: "Основатель и генеральный директор", hy: "Հիմնադիր և գլխավոր տնօրեն" },
    photo: "/founder.jpg",
    bio: {
      en: "Tigran founded CIO Logistics in Yerevan in 2016 with a vision to build Armenia's premier multi-modal freight forwarding bridge. Under his leadership, CIO Group has achieved ISO 9001:2015, IATA, and FIATA accreditations.",
      ru: "Тигран основал CIO Logistics в Ереване в 2016 году с целью создать ведущего мультимодального экспедитора Армении. Под его руководством компания получила аккредитации ISO 9001:2015, IATA и FIATA.",
      hy: "Տիգրանը հիմնադրել է CIO Logistics-ը Երևանում 2016 թվականին՝ նպատակ ունենալով կառուցել Հայաստանի առաջատար մուլտիմոդալ բեռնափոխադրող ընկերությունը:"
    },
    cert: "ISO 9001 Lead Auditor & IRU Member",
    exp: "15+ Years Executive Leadership",
    email: "t.stepanyan@ciologistics.com"
  },
  "eteri-tsatryan": {
    name: { en: "Eteri Tsatryan", ru: "Этери Цатрян", hy: "Էթերի Ծատրյան" },
    role: { en: "Customer Success Lead", ru: "Руководитель клиентского сервиса", hy: "Հաճախորդների սպասարկման ղեկավար" },
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop",
    bio: {
      en: "Eteri oversees 24/7 client communication, real-time telemetry dispatching, and emergency corridor re-routing for high-priority pharmaceutical and industrial cargo.",
      ru: "Этери курирует круглосуточную поддержку клиентов, диспетчеризацию в реальном времени и экстренную переадресацию грузов.",
      hy: "Էթերին վերահսկում է հաճախորդների 24/7 աջակցությունը, իրական ժամանակում հետևումը և երթուղիների օպտիմալացումը:"
    },
    cert: "GDP Cold Chain Certified Specialist",
    exp: "7+ Years Client Operations",
    email: "e.tsatryan@ciologistics.com"
  },
  "cio-team": {
    name: { en: "CIO Editorial Team", ru: "Редакция CIO Logistics", hy: "CIO խմբագրական թիմ" },
    role: { en: "Logistics Research & Insights Group", ru: "Аналитическая группа по логистике", hy: "Լոգիստիկ վերլուծությունների խումբ" },
    photo: "/images/shaah-shahidh--subrrYxv8A-unsplash.webp",
    bio: {
      en: "The collective intelligence of CIO Logistics' in-house customs brokers, dispatchers, and trade engineers reporting on global corridor shifts and Armenian import/export updates.",
      ru: "Коллективная аналитика штатных таможенных брокеров и инженеров CIO Logistics о глобальных коридорах и новостях ВЭД Армении.",
      hy: "CIO Logistics-ի մաքսային բրոքերների և լոգիստիկ ինժեներների համատեղ վերլուծական խումբը:"
    },
    cert: "IATA Accredited Cargo Agency",
    exp: "Active across 150+ Trade Corridors",
    email: "info@ciologistics.com"
  }
};

export async function generateStaticParams() {
  const langs = ['en', 'ru', 'hy'];
  const slugs = Object.keys(authorsData);
  const params: { lang: string; slug: string }[] = [];

  for (const lang of langs) {
    for (const slug of slugs) {
      params.push({ lang, slug });
    }
  }
  return params;
}

export async function generateMetadata(props: AuthorPageProps): Promise<Metadata> {
  const params = await props.params;
  const author = authorsData[params.slug] || authorsData["cio-team"];
  const lang = (params.lang === 'ru' || params.lang === 'hy' ? params.lang : 'en');

  return {
    title: `${author.name[lang]} - CIO Logistics Team Profile`,
    description: author.bio[lang]
  };
}

export default async function AuthorProfilePage(props: AuthorPageProps) {
  const params = await props.params;
  const rawLang = params.lang || 'en';
  const lang = (rawLang === 'ru' || rawLang === 'hy' ? rawLang : 'en') as 'en' | 'ru' | 'hy';
  const author = authorsData[params.slug] || authorsData["cio-team"];

  return (
    <div className={styles.authorWrapper}>
      <div className="container" style={{ marginBottom: '24px' }}>
        <Link href={`/${lang}/about`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--cio-navy)', fontWeight: 700, textDecoration: 'none' }}>
          <ArrowLeft size={18} /> {lang === 'ru' ? 'Назад к команде' : lang === 'hy' ? 'Վերադառնալ թիմի էջ' : 'Back to Team Overview'}
        </Link>
      </div>

      <div className={styles.authorCard}>
        <div className={styles.authorSidebar}>
          <img src={author.photo} alt={author.name[lang]} className={styles.authorPhoto} />
          <h1 className={styles.authorName}>{author.name[lang]}</h1>
          <div className={styles.authorRole}>{author.role[lang]}</div>
          
          <a href={`mailto:${author.email}`} className={styles.authorContactBtn}>
            <Mail size={16} /> Contact Specialist
          </a>
        </div>

        <div className={styles.authorContent}>
          <div className={styles.sectionTitle}>Profile & Experience</div>
          <p className={styles.authorBio}>{author.bio[lang]}</p>

          <div className={styles.sectionTitle}>Accreditations & Scope</div>
          <div className={styles.credentialsGrid}>
            <div className={styles.credBox}>
              <div className={styles.credTitle}>Primary Certification</div>
              <div className={styles.credValue}>{author.cert}</div>
            </div>
            <div className={styles.credBox}>
              <div className={styles.credTitle}>Industry Experience</div>
              <div className={styles.credValue}>{author.exp}</div>
            </div>
          </div>

          <div style={{ marginTop: '24px', padding: '20px', backgroundColor: '#FFF2E9', borderRadius: '16px', border: '1px solid #FFD8BE' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--cio-navy)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle size={20} color="var(--cio-orange)" />
              Direct Freight Consultation
            </h3>
            <p style={{ fontSize: '14.5px', color: 'var(--text-body)', marginBottom: '16px' }}>
              Need expert advice on customs pre-clearance, route planning, or tariff classification? Get in touch with our team directly.
            </p>
            <Link href={`/${lang}/quote`} className="btn btn-primary" style={{ padding: '10px 24px', fontSize: '14px' }}>
              Request Dedicated Quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
