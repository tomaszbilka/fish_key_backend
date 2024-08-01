import * as dotenv from 'dotenv';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

dotenv.config();

const ormConfig: PostgresConnectionOptions = {
  database: process.env.DB_NAME,
  entities: ['dist/**/**.entity{.ts,.js}'],
  host: process.env.DB_HOST,
  migrations: ['dist/migrations/**/*{.ts,.js}'],
  password: process.env.DB_PASSWORD,
  port: +process.env.DB_PORT,
  synchronize: false,
  type: 'postgres',
  username: process.env.DB_USERNAME,
};

export default ormConfig;
