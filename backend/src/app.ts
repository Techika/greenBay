import express from 'express';
import httpErrorHandler from './api/middleware/httpErrorHandler';
import httpLogger from './api/middleware/httpLogger';
import { privateRoutes, publicRoutes } from './api/route';

const app = express();

app.use(httpLogger);

app.use('/pub', publicRoutes);
app.use('/priv', privateRoutes);

app.use(httpErrorHandler);
// app.use(function catchUnimplentedEndpoints(req, res, next) {
//   res.status(404).json({
//     status: 'error',
//     message: `API endpoint:${req.url} does not exist`,
//   });
// });

export default app;
