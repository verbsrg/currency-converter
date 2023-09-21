import CurrencyConverter from '@/app/_components/CurrencyConverter/CurrencyConverter';

async function getRates() {
  const res = await fetch('/api/rates');

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Home() {
  const data = await getRates();

  return (
    <div className="bg-gradient-radial from-blue-500 via-blue-900">
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="font-extrabold text-[64px] text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-white">
          Currency converter
        </h1>
        <CurrencyConverter {...data} />
      </div>
    </div>
  );
}
