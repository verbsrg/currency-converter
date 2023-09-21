import mongoose, {Schema} from "mongoose";


export type ExchangeModel = {
    baseCurrency: string,
    rates: Record<string, number>
    timestamp: number,
}

export const exchangeRateSchema = new Schema({
    baseCurrency: String,
    rates: Object,
    timestamp: Number,
});

export default
    mongoose.models.ExchangeRate || mongoose.model("ExchangeRate", exchangeRateSchema)
