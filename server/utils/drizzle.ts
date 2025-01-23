import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from '../database/schema'
import { singleton } from './singleton'

export { sql, eq, and, or } from 'drizzle-orm'

export const tables = schema

export const createDatabaseConnection = () => {
  if (process.env.DATABASE_URL == null) {
    throw new Error('DATABASE_CONNECTION_URL_NOT_PROVIDED')
  }

  return drizzle(process.env.DATABASE_URL, { schema })
}

export const useDrizzle = () => {
  return singleton('db', createDatabaseConnection)
}

export type User = typeof schema.users.$inferSelect
