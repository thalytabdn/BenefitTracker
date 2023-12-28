import { Request, Response } from 'express';
import { fetchFromCache, addToCache } from '../services/cache';
import { fetchDataFromExternalAPI, generateToken } from '../services/externalAPI';
import { indexDataInElasticsearch, searchDataInElasticsearch } from '../services/elasticsearch';
import { connectToQueue, addToQueue } from '../utils/rabbitmq';
import 'dotenv/config';

export const ping = async (req: Request, res: Response) => {
  res.send('Pong');
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const token = await generateToken(username, password);
    await addToCache('authToken', token);

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error generating token.');
    res.status(401).json({ error: 'Invalid login.' });
  }
};


export const fetchData = async (req: Request, res: Response) => {
  try {
    const { cpf } = req.query;

    addToQueue(cpf as string);

    const cachedData = await fetchFromCache(cpf as string);
    if (cachedData) {
      return res.status(200).json(cachedData);
    }

    const token = await fetchFromCache('authToken');
    const externalData = await fetchDataFromExternalAPI(cpf as string, token);

    await addToCache(cpf as string, externalData);

    await indexDataInElasticsearch(cpf as string, externalData);

    res.status(200).json(externalData);
  } catch (error) {
    console.error('Error fetching data.');
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const searchInElasticsearch = async (req: Request, res: Response) => {
  try {
    const { cpf } = req.query;
    const searchData = await searchDataInElasticsearch(cpf as string);

    if (searchData && searchData.length > 0) {
      res.status(200).json(searchData);
    } else {
      res.status(404).json({ error: 'Data not found in Elasticsearch' });
    }
  } catch (error) {
    console.error('Error searching in Elasticsearch');
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
export { generateToken };

