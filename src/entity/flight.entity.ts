import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tb_flights')
export class Flight {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 5, name: 'flight_number' })
    flightNumber!: string;

    @Column({ length: 100})
    airline!: string;

    @Column({ length: 3})
    origin!: string;

    @Column({ length: 3})
    destination!: string;

    @Column({ type: 'timestamptz'})
    departure!: Date;

    @Column({ type: 'timestamptz'})
    arrival!: Date;

    @Column({ type: 'double precision'})
    price!: number;
}