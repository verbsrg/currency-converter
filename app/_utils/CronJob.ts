import cron from 'node-cron'
import { fetchAndSaveRates } from './FetchRates';

cron.schedule('0 */8 * * *', async () => {
    try {
        fetchAndSaveRates()
        console.log('Exchange rates updated successfully.')
    } catch (error) {
        console.error('Error updating exchange rates:', error)
    }
})