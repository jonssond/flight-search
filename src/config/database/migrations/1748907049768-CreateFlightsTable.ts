import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateFlightsTable1748907049768 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "tb_flights",
                columns: [
                    {
                        name: "id",
                        type: "integer",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "flight_number",
                        type: "varchar",
                        length: "5",
                    },
                    {
                        name: "airline",
                        type: "varchar",
                        length: "100",
                    },
                    {
                        name: "origin",
                        type: "varchar",
                        length: "3",
                    },
                    {
                        name: "destination",
                        type: "varchar",
                        length: "3",
                    },
                    {
                        name: "departure",
                        type: "timestamp with time zone", 
                    },
                    {
                        name: "arrival",
                        type: "timestamp with time zone",
                    },
                    {
                        name: "price",
                        type: "double precision",
                    },
                ],
            }),
            true, 
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("tb_flights");
    }

}
