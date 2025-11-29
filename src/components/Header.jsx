import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const navigate = useNavigate();

    const handleGalleryClick = () => {
        navigate('/gallery');
    };

    return (
        <header className="header">
            <div className="header-content">
                <h2 className="header-title">Happy Birthday! 🎂</h2>
                <button className="gallery-button" onClick={handleGalleryClick}>
                    📸 Photo Gallery
                </button>
            </div>
        </header>
    );
};

export default Header;
