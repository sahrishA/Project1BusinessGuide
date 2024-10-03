//import {pool} from './Database.js'
//import dotenv from './dotenv.js'
import dotenv from 'dotenv'
dotenv.config({ path: '../.env' })
import businessData from '../data/businessguide.js'
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
const createBusinessGuideTable = async () =>{
    const createTableQuery =`
    DROP TABLE IF EXISTS businessguide;
    CREATE TABLE IF NOT EXISTS business(
    id SERIAL PRIMARY KEY,
    tile VARCHAR(255) NOT NULL,
    text TEXT NOT NULL,
    category VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    submitted_by VARCHAR(255) NOT NULL);`;
    try {
        const res =await pool.query(createTableQuery);
        console.log('party!! business table created successfully');
    }
    catch (err){
        console.error('Warning! error creating business tabel: ',err);
    }
};
const seedBusinessGuideTable=async () => {
    await createBusinessGuideTable();
    businessData.forEach(async(business) => {
       const insertQuery =`INSERT INTO business (title, text, category, image, submitted_by)
      VALUES ($1, $2, $3, $4, $5);`;
      const values =[
        business.title,
        business.text,
        business.category,
        business.image,
        business.submitted_by
      ];
      try{
        await pool.query(insertQuery,values);
        console.log(`✅ ${business.title} added successfully`)
      }catch(err){
        console.error('⚠️ error inserting business:', err)
      };
    });
};
seedBusinessGuideTable();