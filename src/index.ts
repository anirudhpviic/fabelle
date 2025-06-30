import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import bodyParser from 'body-parser';
import mongoSanitize from 'express-mongo-sanitize';
import { apiErrorHandler } from './handler';
import { connectDB } from './mongo';
import http from 'http';
import cors from 'cors';
import router from './routes/index';
import { requestLogger } from './middlewares/request-logger.middleware';
import { loadUsedCombinationsFromDB } from './stores/used-combination.store';

const app = express();
const server = http.createServer(app);

app.use(
  cors({
    credentials: true,
    exposedHeaders: ['x-remark', 'x-nonce', 'Content-Type'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    origin: '*',
  }),
);

app.use((_req, res, next) => {
  res.setHeader('X-Powered-By', 'PHP/');
  next();
});

app.use((req, res, next) => {
  req.body = mongoSanitize.sanitize(req.body);
  req.params = mongoSanitize.sanitize(req.params);
  next();
})

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Parse incoming JSON requests

process.on('uncaughtException', (err) => {
  console.log(err);
  console.error('UNCAUGHT EXCEPTION!', err.name, err.message);
  process.exit(1);
});
process.on('unhandledRejection', (err: Error) => {
  console.log(err);
  console.error('UNHANDLED REJECTION!', err.name, err.message);
  process.exit(1);
});

// logs all requests in DB
app.use(requestLogger)

app.get('/', (req, res) => {
  res.json({ message: 'Server Is Up And Running...' });
});

// Register all routes
app.use('/', router);

app.use(apiErrorHandler);

(async () => {
  try {
    await connectDB();
    await loadUsedCombinationsFromDB();
  } catch (error) {
    console.error('Error updating users:', error);
  }
})();
server.listen(process.env.PORT, () =>
  console.log('[Server] Started. Port:' + process.env.PORT),
);
