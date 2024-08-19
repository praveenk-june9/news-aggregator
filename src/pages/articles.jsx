import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticlesBySource } from '../store/sourceSlice';
import Loader from "../components/loadingSkeleton";

const ArticleList = () => {
    const dispatch = useDispatch();
    const articles = useSelector((state) => state.source.articles);
    const loading = useSelector((state) => state.source.loading);
    const error = useSelector((state) => state.source.error);
    const activeSource = useSelector((state) => state.source.activeSource);
    const searchQuery = useSelector((state) => state.source.searchQuery);

    useEffect(() => {
        dispatch(fetchArticlesBySource({ source: activeSource, query: searchQuery }));
    }, [dispatch, activeSource, searchQuery]);


    return (
        <>
            {loading && <Loader />}
            {error && <p>Error loading articles: {error}</p>}
            {!loading && articles.length === 0 && <h1>No articles found.</h1>}
            <section className="grid">
                {
                    !loading && articles.length > 0 && articles.map((article, index) => (
                        <article key={index} className="article-container">
                            <div>
                                <h2 className="title">{article.title}</h2>
                                <p className="description">{article.description}</p>
                            </div>
                            <span className="read-more">
                                <a href={article.url} target="_blank" rel="noopener noreferrer">
                                    read more
                                </a>
                            </span>
                        </article>
                    ))
                }
            </section>
        </>
    );
};

export default ArticleList;
