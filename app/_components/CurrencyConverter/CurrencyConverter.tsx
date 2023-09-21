'use client';

import React, { useEffect, useState } from 'react';
import { ExchangeModel } from '@/app/models/ExchangeRate';

const CurrencyConverter: React.FC<ExchangeModel> = ({
  baseCurrency,
  rates,
  timestamp,
}) => {
  const [amount, setAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState<string>(baseCurrency);
  const [toCurrency, setToCurrency] = useState('USD');
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);

  const date = new Date(timestamp);

  useEffect(() => {
    const rateFrom = rates[fromCurrency];
    const rateTo = rates[toCurrency];
    const converted = (amount * rateTo) / rateFrom;
    setConvertedAmount(converted);
  }, [amount, fromCurrency, toCurrency, rates]);

  return (
    <div className="flex flex-col items-center justify-center my-5">
      <div className="flex">
        <input
          min={0}
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-15 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {Object.keys(rates).map((currencyCode) => (
            <option key={currencyCode}>{currencyCode}</option>
          ))}
        </select>
      </div>
      <div className="flex mt-5">
        <input
          value={convertedAmount?.toFixed(2)}
          type="number"
          className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          disabled
        ></input>
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-15 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {Object.keys(rates).map((currencyCode) => (
            <option key={currencyCode}>{currencyCode}</option>
          ))}
        </select>
      </div>
      <div className="mt-5">
        Rates last updated: <span>{date.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default CurrencyConverter;
