import 'reflect-metadata';
import { AppDataSource } from '../data-source';
import { Flight } from '../../../entity/flight.entity';
import flightSeedDataArray from './mock_flights_100.json'; 

interface FlightSeedEntry {
    id: string;
    flightNumber: string;
    airline: string;
    origin: string;
    destination: string;
    departure: string;
    arrival: string;  
    price: number;
}

async function seedDatabase() {
    console.log('Initializing data source...');
    await AppDataSource.initialize();
    console.log('Data source initialized.');

    const flightRepository = AppDataSource.getRepository(Flight);

    console.log('Clearing existing flight data...');
    await flightRepository.clear();
    console.log('Existing flight data cleared.');

    const flightsToSeed: Partial<Flight>[] = (flightSeedDataArray as FlightSeedEntry[]).map(seed => ({
        flightNumber: seed.flightNumber,
        airline: seed.airline,
        origin: seed.origin,
        destination: seed.destination,
        departure: new Date(seed.departure),
        arrival: new Date(seed.arrival),
        price: seed.price,
    }));

    console.log(`Seeding ${flightsToSeed.length} flights...`);
    await flightRepository.save(flightsToSeed, { chunk: 50 });
    console.log('Database has been seeded successfully!');

    console.log('Closing data source connection...');
    await AppDataSource.destroy();
    console.log('Data source connection closed.');
}

seedDatabase().catch(error => {
    console.error('Error during database seeding:', error);
    if (AppDataSource.isInitialized) {
        AppDataSource.destroy().then(() => console.log('Data source connection closed on error.'));
    }
    process.exit(1);
});