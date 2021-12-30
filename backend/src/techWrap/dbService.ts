import promsql from 'mysql2/promise';
import mysql from 'mysql2';
import { dbAccess } from '../config/config';
import { apiError, HttpStatus } from './errorService';

export interface OkResponse {
  results: {
    fieldCount: number;
    affectedRows: number;
    insertId: number;
    info: string;
    serverStatus: number;
    warningStatus: number;
  };
  fields: any;
}

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

// export const dbService = {
//   query(query: string, values?: Array<unknown>): Promise<unknown> {
//     return dbPool.query(query, values);
//   },
// };

/**
 * Run multiple queries on the database using a transaction. A list of SQL queries
 * should be provided, along with a list of values to inject into the queries.
 * @param  {array} queries     An array of mysql queries. These can contain `?`s
 *                              which will be replaced with values in `queryValues`.
 * @param  {array} queryValues An array of arrays that is the same length as `queries`.
 *                              Each array in `queryValues` should contain values to
 *                              replace the `?`s in the corresponding query in `queries`.
 *                              If a query has no `?`s, an empty array should be provided.
 * @return {Promise}           A Promise that is fulfilled with an array of the
 *                              results of the passed in queries. The results in the
 *                              returned array are at respective positions to the
 *                              provided queries.
 */
export async function dbTransaction(
  queries: Array<string>,
  queryValues: Array<Array<unknown>>
) {
  if (queries.length !== queryValues.length) {
    return Promise.reject(
      'Number of provided queries did not match the number of provided query values arrays'
    );
  }
  const dbPool = promsql.createPool(dbAccess);
  const connection = await dbPool.getConnection();
  try {
    await connection.beginTransaction();
    const queryPromises: any[] = [];

    queries.forEach((query, index) => {
      queryPromises.push(connection.query(query, queryValues[index]));
    });
    const results = await Promise.all(queryPromises);
    await connection.commit();
    await connection.release();
    return results;
  } catch (err) {
    await connection.rollback();
    await connection.release();
    return Promise.reject(err);
  }
}

export const dbService = {
  query(query: string, values?: Array<unknown>): Promise<unknown> {
    return new Promise((resolve, reject) => {
      dbPool.query(query, values, (err, results, fields) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve({ results, fields });
        }
      });
    });
  },
  async transaction(
    queries: Array<string>,
    queryValues: Array<Array<unknown>>
  ) {
    if (queries.length !== queryValues.length) {
      return Promise.reject(
        'Number of provided queries did not match the number of provided query values arrays'
      );
    }
    const dbPool = promsql.createPool(dbAccess);
    const connection = await dbPool.getConnection();
    try {
      await connection.beginTransaction();
      const queryPromises: any[] = [];

      queries.forEach((query, index) => {
        queryPromises.push(connection.query(query, queryValues[index]));
      });
      const results = await Promise.all(queryPromises);
      await connection.commit();
      await connection.release();
      return results;
    } catch (err) {
      await connection.rollback();
      await connection.release();
      return Promise.reject(err);
    }
  },
};
