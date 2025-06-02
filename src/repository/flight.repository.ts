import { Repository } from "typeorm";
import { Flight } from "../entity/flight.entity";

export class FlightRepository extends Repository<Flight> {

    getAll(): Promise<Flight[]> {
        return this.find();
    }
}