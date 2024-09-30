import axios from 'axios';
import Cookies from 'js-cookie';
const baseURL = process.env.REACT_APP_API_BASE_URL;

const apiClient = axios.create({
    baseURL: baseURL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Cookies.get('authToken')}`
    },
  });

const Api = {
    get: async (url, params = {}) => {
      try {
        const response = await apiClient.get(url, { params });
        return response.data;
      } catch (error) {
        console.error('Api Error: ', error);
        throw error.response?.data || error.message;
      }
    },
  
    post: async (url, body = {}) => {
      try {
        const response = await apiClient.post(url, body);
        return response.data;
      } catch (error) {
        console.error('Api Error: ', error);
        throw error.response?.data || error.message;
      }
    },
  
    put: async (url, body = {}) => {
      try {
        const response = await apiClient.put(url, body);
        return response.data;
      } catch (error) {
        console.error('Api Error: ', error);
        throw error.response?.data || error.message;
      }
    },
  
    patch: async (url, body = {}) => {
      try {
        const response = await apiClient.patch(url, body);
        return response.data;
      } catch (error) {
        console.error('Api Error: ', error);
        throw error.response?.data || error.message;
      }
    },
  
    delete: async (url) => {
      try {
        const response = await apiClient.delete(url);
        return response.data;
      } catch (error) {
        console.error('Api Error: ', error);
        throw error.response?.data || error.message;
      }
    },
  };
  
  export default Api;