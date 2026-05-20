import React from 'react';
import { Metadata } from 'next';
import { getDictionary } from '@/lib/dictionary';
import Calculator from '@/components/Calculator/Calculator';
import { ShieldCheck, Clock, Award, Star } from 'lucide-react';

interface QuotePageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata(props: QuotePageProps): Promise<Metadata> {
  const params = await props.params;
  const rawLang = params.lang || 'en';
  const lang = (rawLang === 'ru' || rawLang === 'hy' ? rawLang : 'en') as 'en' | 'ru' | 'hy';
  
  const titles = {
    en: "Request a Custom Logistics Quote - CIO Logistics",
    ru: "Запрос стоимости логистических услуг - CIO Logistics",
    hy: "Հարցում բեռնափոխադրման արժեքի համար - CIO Logistics",
  };

  const descriptions = {
    en: "Get a verified, tailored freight quote within 2 hours. Air, sea, rail, and road shipping solutions to and from Armenia.",
    ru: "Получите проверенный расчет стоимости перевозки за 2 часа. Авиа, море, ж/д и автоперевозки в/из Армении.",
    hy: "Ստացեք բեռնափոխադրման անհատականացված արժեք 2 ժամում: Օդային, ծովային, երկաթուղային և ավտոմոբիլային փոխադրումներ Հայաստանից և դեպի Հայաստան:",
  };

  return {
    title: titles[lang],
    description: descriptions[lang],
  };
}

export default async function QuotePage(props: QuotePageProps) {
  const params = await props.params;
  const rawLang = params.lang || 'en';
  const lang = (rawLang === 'ru' || rawLang === 'hy' ? rawLang : 'en') as 'en' | 'ru' | 'hy';
  const dict = await getDictionary(lang);

  return (
    <div style={{ background: 'var(--bg-gray)', padding: '64px 0' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '56px', alignItems: 'start' }}>
        
        {/* Left Side Quote Widget wrapper */}
        <div>
          <div style={{ background: '#fff', borderRadius: 'var(--radius-lg)', padding: '40px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '28px', color: 'var(--cio-navy)', marginBottom: '16px' }}>
              Request a Custom Commercial Offer
            </h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '32px', fontSize: '15px' }}>
              Fill in the parameters below. Our pricing desks will review your cargo dimensions, routing restrictions, and customs codes to build a binding, optimized contract proposal in under 2 hours.
            </p>
            
            <Calculator lang={lang} dict={dict} />
          </div>
        </div>

        {/* Right Side Trust & SLA Information */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', position: 'sticky', top: '120px' }}>
          {/* SLA Card */}
          <div style={{ background: 'var(--cio-navy-dark)', color: '#fff', borderRadius: 'var(--radius-lg)', padding: '32px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <Clock size={32} color="var(--cio-orange)" />
              <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#fff' }}>2-Hour Response SLA</h3>
            </div>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.6' }}>
              We respect your timeline. All quote requests submitted during business hours (09:00 - 19:00 Yerevan time) are processed by dedicated region managers with verified rates in 120 minutes or less.
            </p>
          </div>

          {/* Compliance Check card */}
          <div style={{ background: '#fff', borderRadius: 'var(--radius-lg)', padding: '32px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <ShieldCheck size={32} color="var(--success)" />
              <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: 'var(--cio-navy)' }}>Secure & Covered</h3>
            </div>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '20px' }}>
              Every single booking includes optional All-Risk Marine cargo insurance covered by premium international underwriters.
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span className="badge" style={{ background: 'var(--bg-gray)', color: 'var(--cio-navy)', fontSize: '11px', fontWeight: 600 }}>TIR Carnet</span>
              <span className="badge" style={{ background: 'var(--bg-gray)', color: 'var(--cio-navy)', fontSize: '11px', fontWeight: 600 }}>CMR Insured</span>
              <span className="badge" style={{ background: 'var(--bg-gray)', color: 'var(--cio-navy)', fontSize: '11px', fontWeight: 600 }}>FIATA FBL</span>
            </div>
          </div>

          {/* Feedback quotes */}
          <div style={{ background: '#fff', borderRadius: 'var(--radius-lg)', padding: '32px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', color: 'var(--cio-orange)', marginBottom: '12px' }}>
              {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="var(--cio-orange)" />)}
            </div>
            <p style={{ fontStyle: 'italic', fontSize: '13.5px', color: 'var(--text-body)', marginBottom: '16px' }}>
              &ldquo;The quotation was accurate down to the cent. No hidden administrative fees at Yerevan customs. Very professional.&rdquo;
            </p>
            <strong style={{ fontSize: '13px', color: 'var(--cio-navy)' }}>Artur Davtyan, logistics manager</strong>
          </div>
        </div>

      </div>
    </div>
  );
}
