import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveSource, fetchArticlesBySource } from '../store/sourceSlice';

const FilterComponent = () => {
    const dispatch = useDispatch();
    const activeSource = useSelector((state) => state.source.activeSource);
    const searchQuery = useSelector((state) => state.source.searchQuery);

    const sources = ['All', 'NewsApi.Org', 'Guardian', 'New York Times'];

    const handleFilterClick = (source) => {
        dispatch(setActiveSource(source));
        dispatch(fetchArticlesBySource({ source, query: searchQuery }));
    };

    return (
        <div className='filter'>
            Showing articles from:
            <div className='filter-options'>
                {sources.map((source) => (
                    <span
                        key={source}
                        className={source === activeSource ? 'active' : ''}
                        onClick={() => handleFilterClick(source)}
                    >
                        {source}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default FilterComponent;
