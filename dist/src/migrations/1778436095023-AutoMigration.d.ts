import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AutoMigration1778436095023 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
