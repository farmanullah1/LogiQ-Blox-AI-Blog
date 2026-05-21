import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = {
  correctText: async (text, sessionId) => {
    const response = await axios.post(`${API_BASE_URL}/correct`, { text, sessionId });
    return response.data;
  },
  getHistory: async (sessionId) => {
    const response = await axios.get(`${API_BASE_URL}/history/${sessionId}`);
    return response.data;
  },
  clearHistory: async (sessionId) => {
    const response = await axios.delete(`${API_BASE_URL}/history/${sessionId}`);
    return response.data;
  }
};

export default api;
