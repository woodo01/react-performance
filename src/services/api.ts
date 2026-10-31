import axios from 'axios';
import { Country } from '../types';

const API_URL = 'https://restcountries.com/v3.1';

export const fetchAllCountries = async (): Promise<Country[]> => {
  try {
    const response = await axios.get<Country[]>(`${API_URL}/all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    return [];
  }
};
