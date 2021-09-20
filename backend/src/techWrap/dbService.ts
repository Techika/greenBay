import mysql from 'mysql';
import {dbAccess} from '../config/config';


const dbPool = (() => {
  const dbPool = mysql.createPool(dbAccess);
    // ===ADD LISTENERS===
    dbPool.on('enqueue', function () {
      console.log('Waiting for available connection slot');
    });
    dbPool.on('connection', function (connection) {
      console.log('MySQL Connection Established: ', connection.threadId);
    });
    dbPool.on('release', function (connection) {
      console.log('Connection %d released', connection.threadId);
    });
    return dbPool;
  })()

export const dbService = {
  query(query: string, values?: Array<unknown>): Promise<unknown> {
    return new Promise((resolve, reject) => {
      dbPool.query(query, values, (err, results, fields) => {
        if (err) {
          console.log(err.sqlMessage);
          reject(err);
        } else {
          resolve({ results, fields });
        }
      });
    });
  },
};
