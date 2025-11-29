import React, { useState } from 'react';
import { X } from 'lucide-react';
import './MarqueeGallery.css';

const MarqueeGallery = ({ images }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    // Split images into 4 rows: 10, 10, 10, 9
    const row1 = images.slice(0, 10);
    const row2 = images.slice(10, 20);
    const row3 = images.slice(20, 30);
    const row4 = images.slice(30, 39);

    const renderMarqueeRow = (rowImages, direction) => {
        // Duplicate images for seamless loop
        const duplicatedImages = [...rowImages, ...rowImages];

        return (
            <div className={`marquee-row ${direction}`}>
                <div className="marquee-content">
                    {duplicatedImages.map((image, index) => (
                        <div
                            key={`${image.id}-${index}`}
                            className="marquee-image-wrapper"
                            onClick={() => setSelectedImage(image)}
                        >
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="marquee-image"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="marquee-gallery-section">
            <h2 className="marquee-title">More Memories 📸</h2>

            <div className="marquee-container">
                {renderMarqueeRow(row1, 'left-to-right')}
                {renderMarqueeRow(row2, 'right-to-left')}
                {renderMarqueeRow(row3, 'left-to-right')}
                {renderMarqueeRow(row4, 'right-to-left')}
            </div>

            {/* Image Modal */}
            {selectedImage && (
                <div className="marquee-modal" onClick={() => setSelectedImage(null)}>
                    <div className="marquee-modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="marquee-modal-image-wrapper">
                            <img
                                src={selectedImage.src}
                                alt={selectedImage.alt}
                                className="marquee-modal-image"
                            />
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="marquee-modal-close"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {(selectedImage.title || selectedImage.description) && (
                            <div className="marquee-modal-info">
                                {selectedImage.title && <h3>{selectedImage.title}</h3>}
                                {selectedImage.description && <p>{selectedImage.description}</p>}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MarqueeGallery;
