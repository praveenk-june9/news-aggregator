import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, fetchArticlesBySource } from '../store/sourceSlice';

const SearchInput = () => {
    const dispatch = useDispatch();
    const activeSource = useSelector((state) => state.source.activeSource);
    const currentSearchQuery = useSelector((state) => state.source.searchQuery);
    const [inputValue, setInputValue] = useState(currentSearchQuery || "");

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSearch = () => {
        if (inputValue) {
            dispatch(setSearchQuery(inputValue));
            dispatch(fetchArticlesBySource({ source: activeSource, query: inputValue }));
        }
    };

    return (
        <div className='search'>
            <input
                type='text'
                placeholder='Search for articles...'
                value={inputValue}
                onChange={handleInputChange}
                className='search-input'
            />
            <button onClick={handleSearch} className="search-button">Search</button>
        </div>
    );
};

export default SearchInput;
