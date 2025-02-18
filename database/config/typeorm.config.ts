import { DataSource } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { config } from "dotenv";
config();

const configService = new ConfigService();

const AppDataSource = new DataSource({
  type: "postgres",
  host: configService.get<string>("DATABASE_HOST"),
  port: Number(configService.get<string>("DATABASE_PORT")),
  username: configService.get<string>("DATABASE_USER"),
  password: configService.get<string>("DATABASE_PASSWORD"),
  database: configService.get<string>("DATABASE_NAME"),
  synchronize: configService.get<boolean>("DATABASE_SYNCHRONIZE"),
  entities: ["**/*.entity.ts"],
  migrations: ["./database/migrations/*.ts"],
  migrationsRun: false,
  logging: configService.get<boolean>("DATABASE_LOGGING"),
});

export default AppDataSource;