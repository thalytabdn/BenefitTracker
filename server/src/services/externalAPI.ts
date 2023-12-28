import axios from 'axios';
import 'dotenv/config';

const urlApi = process.env.URL_API || '';

export const generateToken = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${urlApi}/token`, {
      username,
      password,
    });

    return response.data.data.token;
  } catch (error) {
    console.error('Error generating token.');
    throw error;
  }
};

export const fetchDataFromExternalAPI = async (cpf: string, token: string) => {
  try {
    const response = await axios.get(
      `${urlApi}/inss/consulta-beneficios?cpf=${cpf}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error('Error fetching data from external API');
    throw error;
  }
};
