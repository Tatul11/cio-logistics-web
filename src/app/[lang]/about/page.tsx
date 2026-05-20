import React from 'react';
import { Metadata } from 'next';
import { getDictionary } from '@/lib/dictionary';
import { ShieldCheck, Award, Briefcase, Users, Calendar, Target } from 'lucide-react';

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

  return (
    <div>
      {/* Hero Section */}
      <section className="section section-navy" style={{ padding: '80px 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <span className="eyebrow">{dict.nav.about}</span>
          <h1 style={{ fontSize: '36px', marginBottom: '20px' }}>
            Your Logistics Bridge Between Armenia and the World
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.8)' }}>
            Founded in 2016, CIO Logistics has evolved into one of Armenia&apos;s leading international freight forwarding companies. We operate under strict international and local compliance laws, offering premium logistics solutions.
          </p>
        </div>
      </section>

      {/* Corporate Values */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
            <div style={{ padding: '32px', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
              <Target size={32} color="var(--cio-orange)" style={{ marginBottom: '16px' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px' }}>Our Mission</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                To simplify international trade for Armenian businesses through optimized, secure multi-modal route engineering and transparent customs handling.
              </p>
            </div>

            <div style={{ padding: '32px', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
              <ShieldCheck size={32} color="var(--success)" style={{ marginBottom: '16px' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px' }}>Uncompromising Compliance</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                We maintain active certifications with ISO 9001:2015, FIATA, IATA, and IRU, ensuring every shipment complies with EAEU and EU borders regulatory standards.
              </p>
            </div>

            <div style={{ padding: '32px', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
              <Award size={32} color="var(--cio-blue)" style={{ marginBottom: '16px' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px' }}>Enterprise Quality</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                Serving major pharmaceutical, e-commerce, automotive, and industrial firms with tailored cold-chain, hazardous, and oversized project logistics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Deep Dive */}
      <section className="section section-gray" id="certifications" style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="section-head" style={{ marginBottom: '56px' }}>
            <span className="eyebrow">{dict.certifications.eyebrow}</span>
            <h2>{dict.certifications.title}</h2>
            <p>{dict.certifications.desc}</p>
          </div>

          {/* Active Memberships & Licensing */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '56px', alignItems: 'center', marginBottom: '80px' }}>
            <div>
              <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '20px', color: 'var(--cio-navy)' }}>
                Active Memberships & Licensing
              </h3>
              <p style={{ color: 'var(--text-body)', fontSize: '15px', marginBottom: '24px', lineHeight: '1.6' }}>
                CIO Logistics is officially registered with international transport bodies, giving our clients legally binding freight contracts (FIATA FBL), direct air cargo booking lines (IATA), and digital TIR routing clearance.
              </p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px', listStyle: 'none' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14.5px' }}>
                  <span style={{ color: 'var(--cio-orange)', fontWeight: 900 }}>✓</span> <strong>ISO 9001:2015</strong> Quality Management Systems (Certificate #AM-2024-CIO)
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14.5px' }}>
                  <span style={{ color: 'var(--cio-orange)', fontWeight: 900 }}>✓</span> <strong>FIATA Member</strong> #42301 for international logistics standards
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14.5px' }}>
                  <span style={{ color: 'var(--cio-orange)', fontWeight: 900 }}>✓</span> <strong>IATA Cargo Agent</strong> certification for global air forwarding
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14.5px' }}>
                  <span style={{ color: 'var(--cio-orange)', fontWeight: 900 }}>✓</span> <strong>GDP Certified Operations</strong> for pharmaceutical logistics
                </li>
              </ul>
            </div>

            <div style={{ background: '#fff', padding: '40px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)' }}>
              <h4 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '16px', color: 'var(--cio-navy)' }}>
                Anti-Corruption & Compliance Policy
              </h4>
              <p style={{ fontSize: '14px', color: 'var(--text-body)', lineHeight: '1.6', marginBottom: '20px' }} id="corruption">
                CIO Logistics is committed to conducting operations transparently and honestly. We enforce a zero-tolerance policy towards corruption, bribery, or any form of illegal facilitation payments. Our employees, brokers, and logistics partners undergo routine training in international anti-bribery standards (including FCPA and UK Bribery Act adaptations).
              </p>
              <div style={{ fontSize: '13px', color: 'var(--cio-orange)', fontWeight: 700 }}>
                Questions or reports? Contact: compliance@ciologistics.com
              </div>
            </div>
          </div>

          {/* Standards & Accreditations Badges Grid */}
          <div style={{ marginBottom: '80px' }}>
            <h4 style={{ fontSize: '16px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', marginBottom: '32px', textAlign: 'center' }}>
              International Quality Standards
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '24px', alignItems: 'center', justifyContent: 'center' }}>
              {[
                { img: "https://ciologistics.com/wp-content/uploads/2024/03/iso-9001-768x768.png", label: "ISO 9001 System" },
                { img: "https://ciologistics.com/wp-content/uploads/2025/02/certified-company-certificate-iso-90012015-blue-vector-51290540.jpg", label: "ISO Certified" },
                { img: "https://ciologistics.com/wp-content/uploads/2024/03/%D0%A1%D0%9C%D0%9A01.2676_page-0001.jpg", label: "SMK Spec 1" },
                { img: "https://ciologistics.com/wp-content/uploads/2024/03/%D0%A1%D0%9C%D0%9K01.2676_page-0002.jpg", label: "SMK Spec 2" },
                { img: "https://ciologistics.com/wp-content/uploads/2025/02/542_iata.jpg", label: "IATA Member" },
                { img: "https://ciologistics.com/wp-content/uploads/2025/02/Federation_Internationale_des_Associations_de_Transitaires_et_Assimiles_logo.svg.png", label: "FIATA Federation" }
              ].map((badge, idx) => (
                <div key={idx} style={{ background: '#fff', padding: '16px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '140px', boxShadow: 'var(--shadow-sm)' }}>
                  <img src={badge.img} alt={badge.label} style={{ maxHeight: '80px', maxWidth: '100%', objectFit: 'contain', marginBottom: '8px' }} />
                  <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', textAlign: 'center' }}>{badge.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Official License Gallery */}
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', marginBottom: '32px', textAlign: 'center' }}>
              Official Certifications & Qualifications
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '24px' }}>
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
                  className="transition-all-custom" 
                  style={{ background: '#fff', padding: '16px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', display: 'block', textDecoration: 'none', color: 'inherit', boxShadow: 'var(--shadow-sm)' }}
                >
                  <div style={{ height: '180px', background: '#f5f5f5', borderRadius: '4px', overflow: 'hidden', marginBottom: '12px', border: '1px solid #eaeaea' }}>
                    <img src={cert.img} alt={cert.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--cio-navy)' }}>{cert.title}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>{cert.name}</div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section" id="team" style={{ padding: '80px 0', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '56px', alignItems: 'center' }}>
            <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-xl)', border: '1px solid var(--border)' }}>
              <img 
                src="https://ciologistics.com/wp-content/uploads/elementor/thumbs/420925252_367072809259501_5700568309223114959_n-qmp93xmmimwy1kx8zz7wt0ie4sc59g16f7hsqj0cpk.jpg" 
                alt="CIO Logistics Yerevan Team" 
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }} 
              />
            </div>
            <div>
              <span className="eyebrow" style={{ color: 'var(--cio-orange)' }}>Our Team</span>
              <h2 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '24px', color: 'var(--cio-navy)' }}>
                Professional Logistics Specialists
              </h2>
              <p style={{ color: 'var(--text-body)', fontSize: '16px', lineHeight: '1.7', marginBottom: '20px' }}>
                At CIO Logistics, our team of dedicated experts in Yerevan, Armenia coordinates complex international supply chains daily. With decades of combined transport planning, customs brokerage, and cargo handling experience, we safeguard your business cargo at every border.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '28px' }}>
                <div>
                  <h5 style={{ fontWeight: 800, color: 'var(--cio-navy)', fontSize: '15px', marginBottom: '8px' }}>Expert Advising</h5>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Direct consulting on cargo routing, optimal tariff classification, and border documentation requirements.</p>
                </div>
                <div>
                  <h5 style={{ fontWeight: 800, color: 'var(--cio-navy)', fontSize: '15px', marginBottom: '8px' }}>24/7 Operations</h5>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Proactive monitoring of air, land, and sea cargo containers from dispatch to delivery.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
