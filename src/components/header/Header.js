import React from "react";
import "./Header.css";

const Header = ({children}) => {
    return (
        <header className="header">
            <h1 className="header-title">Ticketing System</h1>
            {children}
        </header>
    );
};

export default Header;
