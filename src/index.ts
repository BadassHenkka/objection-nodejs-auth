import '../lib/env';
import express from 'express';
import router from './routes';
import setupDb from './db/db-setup';

// set up database with objection and knex
setupDb();

const app = express();
app.use(express.json());
app.use(router);
app.listen(process.env.PORT, () =>
  console.log(`server is running on port ${process.env.PORT}`)
);
