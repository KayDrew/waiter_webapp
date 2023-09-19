import 'dotenv/config';
import assert from 'assert';
import userData from '../sql.js';
import pkg from 'pg-promise';
const connectionString = process.env.URL;
const Pool = pkg();
const db = Pool({
    connectionString,
    ssl: true
});
