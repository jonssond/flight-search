import "reflect-metadata";
import { AppDataSource } from "../data-source";
import { Flight } from "../../../entity/flight.entity";

async function unseedDatabase() {
    try {
        console.log("Initializing database connection...");
        await AppDataSource.initialize();
        
        console.log("Starting database unseed process...");
        
        const flightRepository = AppDataSource.getRepository(Flight);
        
        const totalFlights = await flightRepository.count();
        console.log(`Found ${totalFlights} flights in database`);
        
        if (totalFlights === 0) {
            console.log("Database is already empty - no flights to remove");
            return;
        }
        
        const deleteResult = await flightRepository
            .createQueryBuilder()
            .delete()
            .from(Flight)
            .execute();
            
        console.log(`Successfully removed ${deleteResult.affected || 0} flights from database`);
        
        const remainingFlights = await flightRepository.count();
        console.log(`Remaining flights: ${remainingFlights}`);
        
        if (remainingFlights === 0) {
            console.log("Database successfully cleared!");
        } else {
            console.log("Warning: Some flights may still remain in database");
        }
        
    } catch (error) {
        console.error("Error during unseed process:", error);
        throw error;
    } finally {
        if (AppDataSource.isInitialized) {
            await AppDataSource.destroy();
            console.log("Database connection closed");
        }
    }
}

unseedDatabase()
    .then(() => {
        console.log("Unseed process completed successfully!");
        process.exit(0);
    })
    .catch((error) => {
        console.error("Unseed process failed:", error);
        process.exit(1);
    });