import React, { useState } from 'react';
import './Header.css';
import PhotoGallery from './PhotoGallery';

const Header = () => {
    const [showGallery, setShowGallery] = useState(false);

    const handleGalleryClick = () => {
        setShowGallery(true);
    };

    const handleCloseGallery = () => {
        setShowGallery(false);
    };

    return (
        <>
            <header className="header">
                <div className="header-content">
                    <h2 className="header-title">Happy Birthday! 🎂</h2>
                    <button className="gallery-button" onClick={handleGalleryClick}>
                        📸 Photo Gallery
                    </button>
                </div>
            </header>

            {showGallery && <PhotoGallery onClose={handleCloseGallery} />}
        </>
    );
};

export default Header;
