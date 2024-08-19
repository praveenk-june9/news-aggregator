import axios from 'axios';

const NEWSAPI_API_KEY = import.meta.env.VITE_NEWSAPI_API_KEY;
const GUARDIAN_API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY;
const NEWYORKTIMES_API_KEY = import.meta.env.VITE_NEWYORKTIMES_API_KEY;

export const fetchNewsAPIArticles = async (query) => {
    const response = await axios.get(`https://newsapi.org/v2/everything?q=${query}&apiKey=${NEWSAPI_API_KEY}`);
    return response.data.articles;
};

export const fetchGuardianArticles = async (query) => {
    const response = await axios.get(`https://content.guardianapis.com/search`, {
        params: {
            query: `${query}`,
            'api-key': `${GUARDIAN_API_KEY}`,
        }
    });
    return response.data.response.results;
};

export const fetchNYTArticles = async (query) => {
    const response = await axios.get(`https://api.nytimes.com/svc/topstories/v2/home.json`, {
        params: {
            'api-key': `${NEWYORKTIMES_API_KEY}`
        }
    });
    return response.data.results;
};
