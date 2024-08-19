import React from "react";
import Search from "../components/search";

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                News Aggregator
            </div>
            <Search />
        </header>
    );
};

export default Header;
