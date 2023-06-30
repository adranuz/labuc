import { Client } from 'pg'

export default new Client({
  connectionString: process.env.DATABASE_URL
})
