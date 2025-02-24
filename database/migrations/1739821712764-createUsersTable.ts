import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1739821712764 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
        await queryRunner.createTable(
          new Table({
            name: "users",
            columns: [
              {
                name: "id",
                type: "varchar",
                isPrimary: true,
                generationStrategy: "uuid",
                default: "uuid_generate_v4()",
              },
              {
                name: "name",
                type: "varchar",
                isNullable: false,
              },
              {
                name: "email",
                type: "varchar",
                isUnique: true,
                isNullable: false,
              },
              {
                name: "password",
                type: "varchar",
                isNullable: false,
              },
              {
                name: "role",
                type: "enum",
                isNullable: false,
                default: "'client'",
                enum: ["client", "admin"],
              },
              {
                name: "created_at",
                type: "timestamp",
                default: "now()",
              },
              {
                name: "updated_at",
                type: "timestamp",
                default: "now()",
              },
            ],
          }),
          true,
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
      }

}
