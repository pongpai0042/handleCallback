const { Pool } = require("pg");



const query =  function(queryObj, callback) {
  const pool = new Pool({
    connectionString: process.env.CONNECT_DB_STRING
  });
  pool.connect(function(err, client) {
    if (err) return callback({ error: err });
    client.query(queryObj, function(err, result) {
      if (err) {
        callback({ error: err });
        client.release();
        return;
      }
      callback({ result });
      client.release();
    });
  });
}

const queryWithAwait = async function(queryObj) {
    let rows = [];
    const pool = new Pool({
      connectionString: process.env.CONNECT_DB_STRING
    });
    let client = null;
    try {
      client = await pool.connect()
      const result = await client.query(queryObj);
      rows = result.rows;
    } catch (error) {
      throw Error(error);
    }finally{
      if(client) client.release();
    }
    return rows
  };

const queryWithPromise =  function(queryObj) {
  return new Promise(function(resolve, reject) {
    const pool = new Pool({
      connectionString: process.env.CONNECT_DB_STRING
    });
    pool
      .connect()
      .then(client => {
        client
          .query(queryObj)
          .then(result => {
            resolve(result);
          })
          .catch(err => {
            reject(err);
          })
          .finally(() => {
            client.release();
          });
      })
      .catch(err => {
        reject(err);
      });
  });
}
module.exports = {
  queryWithAwait,
  queryWithPromise,
  query
};
