
import { drizzle } from 'drizzle-orm/node-postgres'
export { sql, eq, and, or } from 'drizzle-orm'

import * as schema from '../database/schema'
import { Pool } from 'pg';

export const tables = schema



export function useDrizzle() {
    if (process.env.DATABASE_URL == null) {
        throw new Error('DATABASE_CONNECTION_URL_NOT_PROVIDED')
    }

    return drizzle(process.env.DATABASE_URL, { schema })
}

export type User = typeof schema.users.$inferSelect