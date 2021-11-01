import mysql from 'mysql';
import { dbAccess } from '../config/config';
import { apiError, HttpStatus } from './errorService';

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
})();

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

async function transaction(
  queries: Array<string>,
  queryValues: Array<Array<unknown>>
) {
  if (queries.length !== queryValues.length) {
    return Promise.reject(
      'Number of provided queries did not match the number of provided query values arrays'
    );
  }
  const connection = dbPool.getConnection((err, connection) => {
    if (err) {
      throw apiError(HttpStatus.INTERNAL_SERVER_ERROR, 'db connection error');
    }
    if (connection) {
      connection.beginTransaction();
    }
  });
  try {
    await connection.beginTransaction();
    const queryPromises = [];

    queries.forEach((query, index) => {
      queryPromises.push(connection.query(query, queryValues[index]));
    });
    const results = await Promise.all(queryPromises);
    await connection.commit();
    await connection.end();
    return results;
  } catch (err) {
    await connection.rollback();
    await connection.end();
    return Promise.reject(err);
  }
}
