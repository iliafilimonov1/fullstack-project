import axios from 'axios';

export const rootURL = 'http://localhost:3000/';

export const ApiConnection = axios.create({
  baseURL: `${rootURL ?? ''}`,
});
