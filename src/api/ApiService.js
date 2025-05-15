import axios from 'axios';

// Créé une instance Axios avec une configuration par défaut
const apiClient = axios.create({
    baseURL: process.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

// Intercepteur de requêtes pour ajouter le token d'accès dans les en-têtes
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const ApiService = {

    async fetchData(endpoint) {
        try {
            const response = await apiClient.get(endpoint);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
            throw error;
        }
    },

    async postData(endpoint, data) {
        try {
            const response = await apiClient.post(endpoint, data);
            return response.data;
        } catch (error) {
            console.error("Erreur lors de l'envoi des données: ", error);
            throw error;
        }
    }
};

export default ApiService;
