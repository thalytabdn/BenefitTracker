import { Client } from '@elastic/elasticsearch';
import { Request } from 'express';
import 'dotenv/config';

const elasticsearchURL = process.env.ELASTICSEARCH_URL || '';

const esClient = new Client({ node: elasticsearchURL });

export const indexDataInElasticsearch = async (cpf: string, data: any) => {
  try {
    const response = await esClient.index({
      index: 'benefits',
      body: {
        cpf,
        data,
      },
    });
    console.log('Data indexed in Elasticsearch:', response);
  } catch (error) {
    console.error('Error indexing data in Elasticsearch.');
  }
};

export const searchDataInElasticsearch = async (cpf: string) => {
  try {
    const response = await esClient.search({
      index: 'benefits',
      body: {
        query: {
          match: {
            cpf,
          },
        },
      },
    });

    return response.hits.hits.map((hit: any) => hit._source.data);
  } catch (error) {
    console.error('Error searching data in Elasticsearch.');
    return null;
  }
};
