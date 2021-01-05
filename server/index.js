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
const jsonMiddleWare = express.json();

app.use(staticMiddleware);
app.use(jsonMiddleWare);

/**
 * route returns all entries that the user has
*/
app.get('/api/entries/:userId', (req, res, next) => {

  const sql = `select "entryId", "amount", TO_CHAR("date" :: DATE, 'mm/dd/yyyy') as "date"
               from "entry" join "category" using ("categoryId")
               where "userId" = $1`;
  const userId = parseInt(req.params.userId, 10);

  if (!userId || userId < 0 || !Number.isInteger(userId)) {
    throw new ClientError(401, 'User must be logged in');
  }

  const params = [userId];

  db.query(sql, params)
    .then(entriesList => {
      res.status(200).json(entriesList.rows);
    })
    .catch(err => next(err));
});

/**
 * route returns a single entry that contains entryId, categoryId, amount, description
 * and category name
*/
app.get('/api/entry/:entryId', (req, res, next) => {

  const sql = `select "entryId", "amount", "description", "entry"."categoryId", TO_CHAR("date" :: DATE, 'mm/dd/yyyy') as "date", "name" as "category"
               from "entry" join "category" using ("categoryId")
               where "entryId" = $1`;

  const entryId = parseInt(req.params.entryId, 10);

  if (!entryId) {
    throw new ClientError(400, 'EntryId is required.');
  }

  if (entryId < 1 || !Number.isInteger(entryId)) {
    throw new ClientError(400, 'EntryId must be a valid number.');
  }

  const param = [entryId];

  db.query(sql, param)
    .then(singleEntry => {
      if (!singleEntry.rows[0]) {
        throw new ClientError(404, `Cannot find entry with entryID ${entryId}.`);
      }
      res.status(200).json(singleEntry.rows[0]);
    })
    .catch(err => next(err));
});

/**
 * route updates a single entry and returns the affected row
*/
app.put('/api/update-entry/:entryId', (req, res, next) => {
  const sql = `update "entry" set "amount" = $1, "description" = $2, "date" = $3, "categoryId" = $4
               where "entryId" = $5
               returning *`;

  const { amount, description, date, categoryId } = req.body;
  const entryId = parseInt(req.params.entryId);

  if (isNaN(amount) || amount === undefined || !date || !entryId || !categoryId) {

    throw new ClientError(400, 'Amount and Date and EntryId and categoryId are required.');
  }

  const formattedAmount = parseFloat(amount);
  const categoryIdNumber = parseInt(categoryId);
  if (isNaN(formattedAmount) || formattedAmount === undefined || isNaN(categoryIdNumber) || categoryIdNumber === undefined) {
    throw new ClientError(400, 'Amount and categoryId must be a valid number.');
  }

  const params = [formattedAmount, description, date, categoryIdNumber, entryId];
  db.query(sql, params)
    .then(updatedEntry => {
      if (!updatedEntry.rows[0]) {
        throw new ClientError(404, `Cannot find entry with entryID ${entryId}.`);
      }
      res.status(200).json(updatedEntry.rows[0]);
    })
    .catch(err => next(err));

});

/**
 * route returns the entire category table
*/
app.get('/api/category-table', (req, res, next) => {
  const sql = 'select * from "category"';

  db.query(sql)
    .then(categoryList => {
      res.status(200).send(categoryList.rows);
    })
    .catch(err => next(err));
});

/**
 * route inserts a new row to the entry table
 */
app.post('/api/add-entry', (req, res, next) => {
  const sql = `insert into "entry" ("userId", "categoryId", "amount", "description", "date")
                values ($1, $2, $3, $4, $5)`;

  const { userId, categoryId, amount, description, date } = req.body;

  if (!userId || !categoryId || !amount || !date) {
    throw new ClientError(400, 'userId, categoryId, amount, and date are required.');
  }

  const numUserId = parseInt(userId);
  const numCategoryId = parseInt(categoryId);

  if (!Number.isInteger(numUserId) || !Number.isInteger(numCategoryId) || isNaN(amount)) {
    throw new ClientError(400, 'userId, categoryId and amount must be valid numbers');
  }

  if (!Date.parse(date)) {
    throw new ClientError(400, 'date must be a valid date');
  }

  const params = [numUserId, numCategoryId, amount, description, date];

  db.query(sql, params)
    .then(createdEntry => {
      res.sendStatus(200);
    })
    .catch(err => next(err));
});

/**
 * route returns a list of total sum spent for each month by the user
 */
app.get('/api/monthly-expense/:userId', (req, res, next) => {

  const sql = `select sum("amount"), TO_CHAR("date" :: DATE, 'Monthyyyy') as "month"
               from "entry" where "userId" = $1
               group by "month"`;

  const userId = parseInt(req.params.userId, 10);

  if (!userId || userId < 0 || !Number.isInteger(userId)) {
    throw new ClientError(401, 'User must be logged in');
  }

  const params = [userId];

  db.query(sql, params)
    .then(monthlyExpenseList => {
      res.status(200).json(monthlyExpenseList.rows);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
