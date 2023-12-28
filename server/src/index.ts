import express from 'express';
import bodyParser from 'body-parser';
import { connectToQueue } from './utils/rabbitmq';
import { connectToRedis } from './utils/redis';
import { connectToElasticsearch } from './utils/elasticsearch';
import routes from './routes';

export const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectToQueue();
  connectToRedis();
  connectToElasticsearch();
});
