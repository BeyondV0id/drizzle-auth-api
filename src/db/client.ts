import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import dotenv from 'dotenv';
import * as schema from './schema';
dotenv.config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('Database is not defined in ment');
}

const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client, { schema });
console.log('Databae connected');
