import { drizzle } from 'drizzle-orm/node-postgres'

import * as schema from '../database/schema'
export { sql, eq, and, or } from 'drizzle-orm'

export const tables = schema

// https://github.com/drizzle-team/drizzle-orm/issues/1988
// Singleton function to ensure only one db instance is created
const singleton = <Value>(name: string, value: () => Value): Value => {
  const globalAny: any = global;
  globalAny.__singletons = globalAny.__singletons || {};
  
  if (!globalAny.__singletons[name]) {
    globalAny.__singletons[name] = value();
  }
  
  return globalAny.__singletons[name];
}


export const createDatabaseConnection = () => {
  if (process.env.DATABASE_URL == null) {
    throw new Error('DATABASE_CONNECTION_URL_NOT_PROVIDED')
  }

  return drizzle(process.env.DATABASE_URL, { schema })
}

export const useDrizzle = () => {
  return singleton('db', createDatabaseConnection);
}

export type User = typeof schema.users.$inferSelect
