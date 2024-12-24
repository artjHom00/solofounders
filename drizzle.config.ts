import { defineConfig } from 'drizzle-kit'

if(process.env.DATABASE_URL == null) {
    throw new Error('DATABASE_CONNECTION_URL_NOT_PROVIDED')
}

export default defineConfig({
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL
    },
    schema: './server/database/schema.ts',
    out: './server/database/migrations'
})