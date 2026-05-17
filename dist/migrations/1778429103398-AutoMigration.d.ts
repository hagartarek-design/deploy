import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AutoMigration1778429103398 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
