import { Client } from '@elastic/elasticsearch';

const elasticSearchUrl = process.env.ELASTICSEARCH_URL || '';

export const esClient = new Client({ node: elasticSearchUrl });

export const connectToElasticsearch = async () => {
  try {
    const pingResult = await esClient.ping();
    console.log('Connected to Elasticsearch:', pingResult);
  } catch (error) {
    console.error('Error connecting to Elasticsearch.');
  }
};
