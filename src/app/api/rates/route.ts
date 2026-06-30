import { NextResponse } from 'next/server';

const API_KEY = '3beb7ca613-9e3c03bf24-thflh7';

// Cache rates in memory for 15 minutes to prevent API rate limiting
let cachedData: any = null;
let lastFetchTime = 0;
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

export async function GET() {
  const now = Date.now();
  if (cachedData && (now - lastFetchTime) < CACHE_DURATION) {
    return NextResponse.json(cachedData);
  }

  try {
    const res = await fetch(`https://api.fastforex.io/fetch-multi?from=USD&to=AMD,EUR,RUB,CNY`, {
      headers: {
        'X-API-Key': API_KEY,
      },
      next: { revalidate: 900 }
    });

    if (!res.ok) {
      throw new Error(`FastForex API status ${res.status}`);
    }

    const data = await res.json();
    const usdToAmd = data.results?.AMD || 385;
    const usdToEur = data.results?.EUR || 0.92;
    const usdToRub = data.results?.RUB || 85;
    const usdToCny = data.results?.CNY || 7.2;

    // Calculate cross rates against AMD (since base is USD)
    const eurToAmd = +(usdToAmd / usdToEur).toFixed(1);
    const rubToAmd = +(usdToAmd / usdToRub).toFixed(2);
    const cnyToAmd = +(usdToAmd / usdToCny).toFixed(1);

    cachedData = {
      usd: +usdToAmd.toFixed(1),
      eur: eurToAmd,
      rub: rubToAmd,
      cny: cnyToAmd,
      timestamp: new Date().toISOString()
    };
    lastFetchTime = now;

    return NextResponse.json(cachedData);
  } catch (error) {
    console.error('Error fetching live rates from fastforex:', error);
    // Return graceful fallback if offline or rate limited
    return NextResponse.json(cachedData || {
      usd: 385.0,
      eur: 420.0,
      rub: 4.5,
      cny: 53.5,
      fallback: true
    });
  }
}
