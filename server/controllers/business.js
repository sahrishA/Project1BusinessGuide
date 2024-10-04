//import { pool } from '../config/Database.js'
import pg from 'pg'

const config ={
    // user: process.env.PGUSER,
    // password:process.env.PGPASSWORD,
    // host: process.env.PGHOST,
    // port: process.env.PGPORT,
    // database: process.env.PGDATABASE
    connectionString: process.env.DATABASE_URL,
    // connectionString: 'postgresql://postgres:vmDJSvuCZcXYgEyrOlNHWroIlMKdTVPb@junction.proxy.rlwy.net:36870/railway',
}

const pool = new pg.Pool(config); 
const getBusiness = async (req, res) => {
try{
const results = await pool.query('SELECT * FROM business ORDER BY id ASC')
res.status(200).json(results.rows)
}catch(error){
res.status(409).json({error: error.message})
}
} 
export default {
    getBusiness
}