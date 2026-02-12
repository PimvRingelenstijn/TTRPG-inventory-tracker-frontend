import React from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
    return (
        <nav className="navigation">
            <div className="nav-brand">TTRPG Inventory Tracker</div>
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/game-systems">Game Systems</Link></li>
                <li><Link to="/player-character">Player Character</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
            </ul>
        </nav>
    );
};

export default Navigation;