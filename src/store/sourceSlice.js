import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const NEWSAPI_API_KEY = import.meta.env.VITE_NEWSAPI_API_KEY;
const GUARDIAN_API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY;
const NEWYORKTIMES_API_KEY = import.meta.env.VITE_NEWYORKTIMES_API_KEY;

export const fetchArticlesBySource = createAsyncThunk(
    'source/fetchArticlesBySource',
    async ({ source, query }, thunkAPI) => {
        let apiUrls = [];
        const normalizeArticle = (article) => {
            return {
                title: article.title || article.webTitle,
                description: article.description || article.abstract || article.content,
                url: article.url || article.webUrl,
            };
        };

        switch (source) {
            case 'All':
                apiUrls = [
                    `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${NEWSAPI_API_KEY}`,
                    `https://content.guardianapis.com/search?q=${query}&api-key=${GUARDIAN_API_KEY}`,
                    `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${NEWYORKTIMES_API_KEY}`,
                ];
                break;
            case 'NewsApi.Org':
                apiUrls = [`https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${NEWSAPI_API_KEY}`];
                break;
            case 'Guardian':
                apiUrls = [`https://content.guardianapis.com/search?q=${query}&api-key=${GUARDIAN_API_KEY}`];
                break;
            case 'New York Times':
                apiUrls = [`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${NEWYORKTIMES_API_KEY}`];
                break;
            default:
                return [];
        }

        try {
            const responses = await Promise.all(apiUrls.map((url) => axios.get(url)));
            const articles = responses.flatMap(response => response.data.articles || response.data.response.results  || response.data.response.docs);

            const normalizedArticles = articles.map(normalizeArticle);

            return normalizedArticles;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);


const sourceSlice = createSlice({
    name: 'source',
    initialState: {
        activeSource: 'All',
        articles: [],
        loading: false,
        error: null,
    },
    reducers: {
        setActiveSource(state, action) {
            state.activeSource = action.payload;
        },
        setSearchQuery(state, action) {
            state.searchQuery = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticlesBySource.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchArticlesBySource.fulfilled, (state, action) => {
                state.loading = false;
                state.articles = action.payload;
            })
            .addCase(fetchArticlesBySource.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setActiveSource, setSearchQuery } = sourceSlice.actions;
export default sourceSlice.reducer;
