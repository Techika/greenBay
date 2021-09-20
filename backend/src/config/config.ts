import * as dotenv from 'dotenv';

dotenv.config();

export const dbAccess = {
  host: process.env.db_host || '',
  user: process.env.db_user || '',
  password: process.env.db_password || '',
  database: process.env.db_name || '',
  connectionLimit:Number(process.env.db_connection_limit) || 10,
  multipleStatements:"true" === process.env.db_multiple_statements || false,
  insecureAuth: "true" === process.env.db_insecure_auth || false,
};

export const PORT = process.env.PORT || 3001;

export const SECRETKEY = process.env.JWT_SECRETKEY || '';
