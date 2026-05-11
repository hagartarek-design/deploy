import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1778429103398 implements MigrationInterface {
    name = 'AutoMigration1778429103398'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`student_course\` DROP FOREIGN KEY \`FK_0ee43ae3da1f7093cb1d4645b18\``);
        await queryRunner.query(`ALTER TABLE \`student_course\` DROP FOREIGN KEY \`FK_decddeaaed256b357c8d2964260\``);
        await queryRunner.query(`ALTER TABLE \`student\` DROP COLUMN \`role\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`roles\` varchar(255) NOT NULL DEFAULT 'user'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`grade\` \`grade\` varchar(255) NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`role\` \`role\` varchar(255) NOT NULL DEFAULT 'user'`);
        await queryRunner.query(`ALTER TABLE \`course_info\` CHANGE \`question_date\` \`question_date\` datetime NOT NULL DEFAULT '2025-01-05 09:40:58.267985'`);
        await queryRunner.query(`CREATE INDEX \`IDX_decddeaaed256b357c8d296426\` ON \`student_course\` (\`student_id\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_0ee43ae3da1f7093cb1d4645b1\` ON \`student_course\` (\`course_id\`)`);
        await queryRunner.query(`ALTER TABLE \`student_course\` ADD CONSTRAINT \`FK_decddeaaed256b357c8d2964260\` FOREIGN KEY (\`student_id\`) REFERENCES \`student\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`student_course\` ADD CONSTRAINT \`FK_0ee43ae3da1f7093cb1d4645b18\` FOREIGN KEY (\`course_id\`) REFERENCES \`course\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`student_course\` DROP FOREIGN KEY \`FK_0ee43ae3da1f7093cb1d4645b18\``);
        await queryRunner.query(`ALTER TABLE \`student_course\` DROP FOREIGN KEY \`FK_decddeaaed256b357c8d2964260\``);
        await queryRunner.query(`DROP INDEX \`IDX_0ee43ae3da1f7093cb1d4645b1\` ON \`student_course\``);
        await queryRunner.query(`DROP INDEX \`IDX_decddeaaed256b357c8d296426\` ON \`student_course\``);
        await queryRunner.query(`ALTER TABLE \`course_info\` CHANGE \`question_date\` \`question_date\` datetime NOT NULL DEFAULT '2025-01-05 09:40:58'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`role\` \`role\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`grade\` \`grade\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`roles\``);
        await queryRunner.query(`ALTER TABLE \`student\` ADD \`role\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`student_course\` ADD CONSTRAINT \`FK_decddeaaed256b357c8d2964260\` FOREIGN KEY (\`student_id\`) REFERENCES \`student\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`student_course\` ADD CONSTRAINT \`FK_0ee43ae3da1f7093cb1d4645b18\` FOREIGN KEY (\`course_id\`) REFERENCES \`course\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
