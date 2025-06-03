import { Flight } from "../entity/flight.entity"; 
import { AppDataSource } from "../config/database/data-source";

export class FlightService {
    private flightRepository = AppDataSource.getRepository(Flight);

    async getAll(): Promise<Flight[]> {
        return this.flightRepository.find();
    }
}