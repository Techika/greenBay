import express from 'express';
import httpErrorHandler from './api/middleware/httpErrorHandler';
import httpLogger from './api/middleware/httpLogger';
import { privateRoutes, publicRoutes } from './api/route';

const app = express();

app.use(httpLogger);

app.use('/pub', publicRoutes);
app.use('/priv', privateRoutes);

app.use(httpErrorHandler);

export default app;
