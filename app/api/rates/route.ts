import connect from "@/app/_utils/DatabaseConnection";
import ExchangeRate from "@/app/models/ExchangeRate";
import { NextResponse } from "next/server";

export const GET = async() => {
    try {
        await connect()
        const latestExchangeRate = await ExchangeRate.findOne({}, null, { sort: { timestamp: -1} })

        if (!latestExchangeRate) {
            return new NextResponse("Exchange rates not found", {status: 404})
        }
        return NextResponse.json(latestExchangeRate, {status:200})
    } catch (error) {
        return new NextResponse("Internal server error", {status: 500})
    }
}

