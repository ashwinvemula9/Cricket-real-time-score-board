import axios from 'axios';
import { ApiResponse } from '../types/cricket';

const API_KEY = '2e856015-5595-480b-8803-2a150d07f2c5';
const BASE_URL = 'https://api.cricapi.com/v1';

export const fetchLiveMatches = async (): Promise<ApiResponse> => {
  try {
    const response = await axios.get(`${BASE_URL}/matches`, {
      params: {
        apikey: API_KEY,
        offset: 0,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching matches:', error);
    return {
      apikey: API_KEY,
      data: [],
      status: 'error',
      info: {
        hitsToday: 0,
        hitsUsed: 0,
        hitsLimit: 0,
        credits: 0,
        server: 0,
        offsetRows: 0,
        totalRows: 0,
        queryTime: 0,
        s: 0,
        cache: 0
      }
    };
  }
};