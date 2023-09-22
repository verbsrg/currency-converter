import CurrencyConverter from '@/app/_components/CurrencyConverter/CurrencyConverter';
import { fetchAndSaveRates } from './_utils/FetchRates';

async function getRates() {
  const res = await fetch(process.env.URL + '/api/rates', {
    next: { revalidate: 28800 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Home() {
  fetchAndSaveRates();
  const data = await getRates();

  return (
    <div className="bg-gradient-radial from-blue-500 via-blue-900">
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="font-extrabold text-[32px] sm:text-[64px] text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-white">
          Currency converter
        </h1>
        <CurrencyConverter {...data} />
      </div>
    </div>
  );
}
