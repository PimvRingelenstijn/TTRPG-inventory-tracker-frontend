import React from 'react';

const HomePage: React.FC = () => {
    return (
        <div className="home-page">
            <h1>Welcome to TTRPG Inventory Tracker</h1>
            <p>Manage your tabletop RPG game systems and character inventories.</p>
            <div className="features">
                <h2>Features:</h2>
                <ul>
                    <li>Manage Game Systems</li>
                    <li>Track Character Inventories</li>
                    <li>Organize Items and Equipment</li>
                </ul>
            </div>
            <p>Use the navigation above to get started!</p>
        </div>
    );
};

export default HomePage;