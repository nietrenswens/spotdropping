import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

// Load environment variables for CLI usage
config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'spotdropping',
  password: process.env.DB_PASSWORD || 'spotdropping',
  database: process.env.DB_NAME || 'spotdropping_db',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
