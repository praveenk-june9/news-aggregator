import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Header from './components/header';
import "./App.css";
import { Provider } from 'react-redux';
import store from './store/store';

const App = () => (
    <Provider store={store}>
        <Router>
            <Header />
            <Routes>
                <Route path="/" exact element={<Home />} />
            </Routes>
        </Router>
    </Provider>
);

export default App;