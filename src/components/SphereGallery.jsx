import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X } from 'lucide-react';
import './SphereGallery.css';

const SPHERE_MATH = {
    degreesToRadians: (degrees) => degrees * (Math.PI / 180),
    radiansToDegrees: (radians) => radians * (180 / Math.PI),

    sphericalToCartesian: (radius, theta, phi) => ({
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.cos(phi),
        z: radius * Math.sin(phi) * Math.sin(theta)
    }),

    normalizeAngle: (angle) => {
        while (angle > 180) angle -= 360;
        while (angle < -180) angle += 360;
        return angle;
    }
};

const SphereGallery = ({
    images = [],
    containerSize = 600,
    sphereRadius = 200,
    dragSensitivity = 0.8,
    momentumDecay = 0.96,
    maxRotationSpeed = 6,
    baseImageScale = 0.15,
    hoverScale = 1.3,
    perspective = 1000,
    autoRotate = true,
    autoRotateSpeed = 0.2,
    className = ''
}) => {
    const [isMounted, setIsMounted] = useState(false);
    const [rotation, setRotation] = useState({ x: 15, y: 15, z: 0 });
    const [velocity, setVelocity] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePositions, setImagePositions] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const containerRef = useRef(null);
    const lastMousePos = useRef({ x: 0, y: 0 });
    const animationFrame = useRef(null);

    const actualSphereRadius = sphereRadius || containerSize * 0.5;
    const baseImageSize = containerSize * baseImageScale;

    const generateSpherePositions = useCallback(() => {
        const positions = [];
        const imageCount = images.length;
        const goldenRatio = (1 + Math.sqrt(5)) / 2;
        const angleIncrement = 2 * Math.PI / goldenRatio;

        for (let i = 0; i < imageCount; i++) {
            const t = i / imageCount;
            const inclination = Math.acos(1 - 2 * t);
            const azimuth = angleIncrement * i;

            let phi = inclination * (180 / Math.PI);
            let theta = (azimuth * (180 / Math.PI)) % 360;

            const poleBonus = Math.pow(Math.abs(phi - 90) / 90, 0.6) * 35;
            if (phi < 90) {
                phi = Math.max(5, phi - poleBonus);
            } else {
                phi = Math.min(175, phi + poleBonus);
            }

            phi = 15 + (phi / 180) * 150;

            const randomOffset = (Math.random() - 0.5) * 20;
            theta = (theta + randomOffset) % 360;
            phi = Math.max(0, Math.min(180, phi + (Math.random() - 0.5) * 10));

            positions.push({
                theta: theta,
                phi: phi,
                radius: actualSphereRadius
            });
        }

        return positions;
    }, [images.length, actualSphereRadius]);

    const calculateWorldPositions = useCallback(() => {
        const positions = imagePositions.map((pos, index) => {
            const thetaRad = SPHERE_MATH.degreesToRadians(pos.theta);
            const phiRad = SPHERE_MATH.degreesToRadians(pos.phi);
            const rotXRad = SPHERE_MATH.degreesToRadians(rotation.x);
            const rotYRad = SPHERE_MATH.degreesToRadians(rotation.y);

            let x = pos.radius * Math.sin(phiRad) * Math.cos(thetaRad);
            let y = pos.radius * Math.cos(phiRad);
            let z = pos.radius * Math.sin(phiRad) * Math.sin(thetaRad);

            const x1 = x * Math.cos(rotYRad) + z * Math.sin(rotYRad);
            const z1 = -x * Math.sin(rotYRad) + z * Math.cos(rotYRad);
            x = x1;
            z = z1;

            const y2 = y * Math.cos(rotXRad) - z * Math.sin(rotXRad);
            const z2 = y * Math.sin(rotXRad) + z * Math.cos(rotXRad);
            y = y2;
            z = z2;

            const worldPos = { x, y, z };

            const fadeZoneStart = -10;
            const fadeZoneEnd = -30;
            const isVisible = worldPos.z > fadeZoneEnd;

            let fadeOpacity = 1;
            if (worldPos.z <= fadeZoneStart) {
                fadeOpacity = Math.max(0, (worldPos.z - fadeZoneEnd) / (fadeZoneStart - fadeZoneEnd));
            }

            const isPoleImage = pos.phi < 30 || pos.phi > 150;
            const distanceFromCenter = Math.sqrt(worldPos.x * worldPos.x + worldPos.y * worldPos.y);
            const maxDistance = actualSphereRadius;
            const distanceRatio = Math.min(distanceFromCenter / maxDistance, 1);

            const distancePenalty = isPoleImage ? 0.4 : 0.7;
            const centerScale = Math.max(0.3, 1 - distanceRatio * distancePenalty);

            const depthScale = (worldPos.z + actualSphereRadius) / (2 * actualSphereRadius);
            const scale = centerScale * Math.max(0.5, 0.8 + depthScale * 0.3);

            return {
                ...worldPos,
                scale,
                zIndex: Math.round(1000 + worldPos.z),
                isVisible,
                fadeOpacity,
                originalIndex: index
            };
        });

        const adjustedPositions = [...positions];

        for (let i = 0; i < adjustedPositions.length; i++) {
            const pos = adjustedPositions[i];
            if (!pos.isVisible) continue;

            let adjustedScale = pos.scale;
            const imageSize = baseImageSize * adjustedScale;

            for (let j = 0; j < adjustedPositions.length; j++) {
                if (i === j) continue;

                const other = adjustedPositions[j];
                if (!other.isVisible) continue;

                const otherSize = baseImageSize * other.scale;
                const dx = pos.x - other.x;
                const dy = pos.y - other.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                const minDistance = (imageSize + otherSize) / 2 + 25;

                if (distance < minDistance && distance > 0) {
                    const overlap = minDistance - distance;
                    const reductionFactor = Math.max(0.4, 1 - (overlap / minDistance) * 0.6);
                    adjustedScale = Math.min(adjustedScale, adjustedScale * reductionFactor);
                }
            }

            adjustedPositions[i] = {
                ...pos,
                scale: Math.max(0.25, adjustedScale)
            };
        }

        return adjustedPositions;
    }, [imagePositions, rotation, actualSphereRadius, baseImageSize]);

    const clampRotationSpeed = useCallback((speed) => {
        return Math.max(-maxRotationSpeed, Math.min(maxRotationSpeed, speed));
    }, [maxRotationSpeed]);

    const updateMomentum = useCallback(() => {
        if (isDragging) return;

        setVelocity(prev => {
            const newVelocity = {
                x: prev.x * momentumDecay,
                y: prev.y * momentumDecay
            };

            if (!autoRotate && Math.abs(newVelocity.x) < 0.01 && Math.abs(newVelocity.y) < 0.01) {
                return { x: 0, y: 0 };
            }

            return newVelocity;
        });

        setRotation(prev => {
            let newY = prev.y;

            if (autoRotate) {
                newY += autoRotateSpeed;
            }

            newY += clampRotationSpeed(velocity.y);

            return {
                x: SPHERE_MATH.normalizeAngle(prev.x + clampRotationSpeed(velocity.x)),
                y: SPHERE_MATH.normalizeAngle(newY),
                z: prev.z
            };
        });
    }, [isDragging, momentumDecay, velocity, clampRotationSpeed, autoRotate, autoRotateSpeed]);

    const handleMouseDown = useCallback((e) => {
        e.preventDefault();
        setIsDragging(true);
        setVelocity({ x: 0, y: 0 });
        lastMousePos.current = { x: e.clientX, y: e.clientY };
    }, []);

    const handleMouseMove = useCallback((e) => {
        if (!isDragging) return;

        const deltaX = e.clientX - lastMousePos.current.x;
        const deltaY = e.clientY - lastMousePos.current.y;

        const rotationDelta = {
            x: -deltaY * dragSensitivity,
            y: deltaX * dragSensitivity
        };

        setRotation(prev => ({
            x: SPHERE_MATH.normalizeAngle(prev.x + clampRotationSpeed(rotationDelta.x)),
            y: SPHERE_MATH.normalizeAngle(prev.y + clampRotationSpeed(rotationDelta.y)),
            z: prev.z
        }));

        setVelocity({
            x: clampRotationSpeed(rotationDelta.x),
            y: clampRotationSpeed(rotationDelta.y)
        });

        lastMousePos.current = { x: e.clientX, y: e.clientY };
    }, [isDragging, dragSensitivity, clampRotationSpeed]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    const handleTouchStart = useCallback((e) => {
        e.preventDefault();
        const touch = e.touches[0];
        setIsDragging(true);
        setVelocity({ x: 0, y: 0 });
        lastMousePos.current = { x: touch.clientX, y: touch.clientY };
    }, []);

    const handleTouchMove = useCallback((e) => {
        if (!isDragging) return;
        e.preventDefault();

        const touch = e.touches[0];
        const deltaX = touch.clientX - lastMousePos.current.x;
        const deltaY = touch.clientY - lastMousePos.current.y;

        const rotationDelta = {
            x: -deltaY * dragSensitivity,
            y: deltaX * dragSensitivity
        };

        setRotation(prev => ({
            x: SPHERE_MATH.normalizeAngle(prev.x + clampRotationSpeed(rotationDelta.x)),
            y: SPHERE_MATH.normalizeAngle(prev.y + clampRotationSpeed(rotationDelta.y)),
            z: prev.z
        }));

        setVelocity({
            x: clampRotationSpeed(rotationDelta.x),
            y: clampRotationSpeed(rotationDelta.y)
        });

        lastMousePos.current = { x: touch.clientX, y: touch.clientY };
    }, [isDragging, dragSensitivity, clampRotationSpeed]);

    const handleTouchEnd = useCallback(() => {
        setIsDragging(false);
    }, []);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        setImagePositions(generateSpherePositions());
    }, [generateSpherePositions]);

    useEffect(() => {
        const animate = () => {
            updateMomentum();
            animationFrame.current = requestAnimationFrame(animate);
        };

        if (isMounted) {
            animationFrame.current = requestAnimationFrame(animate);
        }

        return () => {
            if (animationFrame.current) {
                cancelAnimationFrame(animationFrame.current);
            }
        };
    }, [isMounted, updateMomentum]);

    useEffect(() => {
        if (!isMounted) return;

        const container = containerRef.current;
        if (!container) return;

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('touchmove', handleTouchMove, { passive: false });
        document.addEventListener('touchend', handleTouchEnd);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        };
    }, [isMounted, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

    const worldPositions = calculateWorldPositions();

    const renderImageNode = useCallback((image, index) => {
        const position = worldPositions[index];

        if (!position || !position.isVisible) return null;

        const imageSize = baseImageSize * position.scale;
        const isHovered = hoveredIndex === index;
        const finalScale = isHovered ? Math.min(1.2, 1.2 / position.scale) : 1;

        return (
            <div
                key={image.id}
                className="sphere-image-node"
                style={{
                    width: `${imageSize}px`,
                    height: `${imageSize}px`,
                    left: `${containerSize / 2 + position.x}px`,
                    top: `${containerSize / 2 + position.y}px`,
                    opacity: position.fadeOpacity,
                    transform: `translate(-50%, -50%) scale(${finalScale})`,
                    zIndex: position.zIndex
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setSelectedImage(image)}
            >
                <div className="sphere-image-wrapper">
                    <img
                        src={image.src}
                        alt={image.alt}
                        className="sphere-image"
                        draggable={false}
                        loading={index < 3 ? 'eager' : 'lazy'}
                    />
                </div>
            </div>
        );
    }, [worldPositions, baseImageSize, containerSize, hoveredIndex]);

    if (!isMounted) {
        return (
            <div className="sphere-loading" style={{ width: containerSize, height: containerSize }}>
                <div>Loading...</div>
            </div>
        );
    }

    if (!images.length) {
        return (
            <div className="sphere-empty" style={{ width: containerSize, height: containerSize }}>
                <div>
                    <p>No images provided</p>
                    <p className="text-sm">Add images to display</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div
                ref={containerRef}
                className={`sphere-container ${className}`}
                style={{
                    width: containerSize,
                    height: containerSize,
                    perspective: `${perspective}px`
                }}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
            >
                <div className="sphere-content">
                    {images.map((image, index) => renderImageNode(image, index))}
                </div>
            </div>

            {selectedImage && (
                <div className="sphere-modal" onClick={() => setSelectedImage(null)}>
                    <div className="sphere-modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="sphere-modal-image-wrapper">
                            <img src={selectedImage.src} alt={selectedImage.alt} className="sphere-modal-image" />
                            <button onClick={() => setSelectedImage(null)} className="sphere-modal-close">
                                <X size={16} />
                            </button>
                        </div>

                        {(selectedImage.title || selectedImage.description) && (
                            <div className="sphere-modal-info">
                                {selectedImage.title && <h3>{selectedImage.title}</h3>}
                                {selectedImage.description && <p>{selectedImage.description}</p>}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default SphereGallery;
