import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDictionary } from '@/lib/dictionary';
import { ShieldCheck, FileText, CheckCircle } from 'lucide-react';

interface LegalPageProps {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const languages = ['en', 'ru', 'hy'];
  const slugs = ['privacy', 'terms', 'cookies'];

  const params: { lang: string; slug: string }[] = [];
  for (const lang of languages) {
    for (const slug of slugs) {
      params.push({ lang, slug });
    }
  }
  return params;
}

export async function generateMetadata(props: LegalPageProps): Promise<Metadata> {
  const params = await props.params;
  const rawLang = params.lang || 'en';
  const lang = (rawLang === 'ru' || rawLang === 'hy' ? rawLang : 'en') as 'en' | 'ru' | 'hy';
  const slug = params.slug;

  const titles: Record<string, string> = {
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    cookies: 'Cookie Policy',
  };

  const title = titles[slug] || 'Legal Document';

  return {
    title: `${title} - CIO Logistics Compliance`,
    description: `CIO Logistics compliance documentation and agreements: ${title}.`,
  };
}

export default async function LegalPage(props: LegalPageProps) {
  const params = await props.params;
  const rawLang = params.lang || 'en';
  const lang = (rawLang === 'ru' || rawLang === 'hy' ? rawLang : 'en') as 'en' | 'ru' | 'hy';
  const slug = params.slug;

  const dict = await getDictionary(lang);

  const documents: Record<string, { title: string; content: React.ReactNode }> = {
    privacy: {
      title: dict.footer.privacy || 'Privacy Policy',
      content: (
        <>
          <p>Last updated: May 20, 2026</p>
          <p>At CIO Logistics, accessible from Yerevan, Armenia, one of our main priorities is the privacy of our visitors and clients. This Privacy Policy document contains types of information that is collected and recorded by CIO Logistics and how we use it.</p>
          <h3>1. Information We Collect</h3>
          <p>We collect personal identifiers such as name, email address, corporate phone number, company name, VAT identifier, and cargo shipment specifications when you request commercial quotes, track bookings, or subscribe to our company newsletter.</p>
          <h3>2. How We Use Your Information</h3>
          <p>We utilize the collected information to calculate rates, clear customs under EAEU/EU directives, arrange air/sea/road bookings, notify transit steps, detect security events, and communicate updates on routes.</p>
          <h3>3. GDPR Compliance</h3>
          <p>For European Union clients: CIO Logistics is a data controller. You hold rights to view, modify, or erase your stored personal files under GDPR rules. Contact us at compliance@ciologistics.com to exercise these rights.</p>
        </>
      ),
    },
    terms: {
      title: dict.footer.terms || 'Terms of Service',
      content: (
        <>
          <p>Last updated: May 20, 2026</p>
          <p>These terms and conditions outline the rules and regulations for the use of CIO Logistics Services and Freight Forwarding Contracts.</p>
          <h3>1. Service Agreement</h3>
          <p>By requesting cargo transport or initiating bookings, you agree to comply with international freight forwarding conventions: FIATA Model Rules, Warsaw/Montreal air conventions, CMR road transit rules, and Hague-Visby ocean rules.</p>
          <h3>2. Customs & Duties</h3>
          <p>Shippers must guarantee accuracy of commodity descriptions, weights, hazardous MSDS sheets, and commercial invoices. CIO Logistics will not be liable for border holds arising from inaccurate declarations.</p>
          <h3>3. Payments & Penalties</h3>
          <p>Invoices must be settled in full based on agreed credit terms (net 30 for qualified clients). Storage charges at Zvartnots or Poti ports resulting from clearing delays will be billed to the cargo owner.</p>
        </>
      ),
    },
    cookies: {
      title: dict.footer.cookiePolicy || 'Cookie Policy',
      content: (
        <>
          <p>Last updated: May 20, 2026</p>
          <p>CIO Logistics uses standard cookies to optimize your browsing experience, remember language preferences (EN/RU/HY), and persist calculator values.</p>
          <h3>1. What Are Cookies</h3>
          <p>Cookies are text files placed on your computer to collect visitor logs and site usage metrics. We use functional cookies to maintain sessions and analytical cookies to improve website page response times.</p>
          <h3>2. Managing Cookies</h3>
          <p>You can adjust browser settings to refuse cookies or remove existing logs. Note that parts of our shipment calculator or tracking widgets may require cookies to function correctly.</p>
        </>
      ),
    },
  };

  const doc = documents[slug];
  if (!doc) {
    return notFound();
  }

  return (
    <div style={{ background: 'var(--bg-gray)', padding: '64px 0' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div style={{ background: '#fff', borderRadius: 'var(--radius-lg)', padding: '48px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <FileText size={32} color="var(--cio-orange)" />
            <h1 style={{ fontSize: '28px', color: 'var(--cio-navy)', margin: 0 }}>
              {doc.title}
            </h1>
          </div>
          
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {doc.content}
          </div>
          
          <div style={{ marginTop: '40px', borderTop: '1px solid var(--border)', paddingTop: '24px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-muted)' }}>
            <ShieldCheck size={16} color="var(--success)" />
            <span>CIO Logistics corporate compliance board, Yerevan Nairi Zaryan 22a.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
