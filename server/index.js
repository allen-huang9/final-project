require('dotenv/config');
const express = require('express');
const pg = require('pg');
const staticMiddleware = require('./static-middleware');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL
});

const app = express();

const jsonMiddleware = express.json();

app.use(staticMiddleware);
app.use(jsonMiddleware);

app.get('/api/entries/:userId', (req, res, next) => {

  const sql = `select "entryId", "amount", "description", TO_CHAR("date" :: DATE, 'mm/dd/yyyy') as "date", "name" as "category"
               from "entry" join "category" using ("categoryId")
               where "userId" = $1`;
  const userId = parseInt(req.params.userId, 10);

  if (!userId || userId < 0 || !Number.isInteger(userId)) {
    throw new ClientError(401, 'User must be logged in');
  }

  const params = [userId];

  db.query(sql, params)
    .then(entriesList => {
      res.status(201).json(entriesList.rows);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
