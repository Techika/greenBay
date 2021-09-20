import logger from './techWrap/logService';
import app from './app';
import {PORT} from './config/config';


app.listen(PORT, () => {
  logger.info(`App is listening on ${PORT}`);
});
