import axios from "axios";
import connect from "./DatabaseConnection";
import ExchangeRate from "../models/ExchangeRate";

export const fetchAndSaveRates = async () => {
    try {
        const response = await axios.get(`http://api.exchangeratesapi.io/v1/latest?access_key=${process.env.API_KEY}`)
        const { base, rates, timestamp } = response.data;

        await connect()

        const exchangeRate = new ExchangeRate({
            baseCurrency: base,
            rates,
            timestamp: timestamp,
        })
        await exchangeRate.save()
        console.log('Exchange rates saved to database')
    } catch (error) {
        console.error('Error fetching and saving exchange rates', error)
    }
}
