import { Request } from 'express';
import { client as redisClient } from '../utils/redis';

export const fetchFromCache = async (key: string) => {
  try {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error fetching from cache.');
    return null;
  }
};

export const addToCache = async (key: string, data: any) => {
  try {
    await redisClient.set(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error adding to cache.');
  }
};
