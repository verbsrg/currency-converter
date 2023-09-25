import connect from "./DatabaseConnection";
import ExchangeRate from "../models/ExchangeRate";

export const fetchAndSaveRates = async () => {
    try {
    const response = await fetch(`http://api.exchangeratesapi.io/v1/latest?access_key=${process.env.API_KEY}`, {next: { revalidate: 28800 }})
    
    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    
    const responseData = await response.json()
    const { base, rates, timestamp } = responseData;
    
    await connect()

    const filter = { baseCurrency: base };
    const update = {
        $set: {
        baseCurrency: base,
        rates: rates,
        timestamp: timestamp,
        },
    };
    const options = { upsert: true };

    await ExchangeRate.updateOne(filter, update, options);

    console.log('Exchange rates updated and saved to database')
    
    } catch(error) {
        console.error('Error fetching and saving exchange rates:', error)
    }
}