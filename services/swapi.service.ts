import axios from 'axios';

const API_URL = 'https://swapi.dev/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

export function useSwapi() {
  const getPeople = () => {
    return api.get('/people');
  };

  return { getPeople };
}
