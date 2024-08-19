import React from 'react';
import Articles from "./articles";
import Filter from "../components/filter";

const Home = () => {

    return (
        <main>
            <Filter />
            <Articles />
        </main>
    );
};

export default Home;
