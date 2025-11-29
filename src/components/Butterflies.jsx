import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import butterfly1 from '../assets/butterfly1.json';
import butterfly2 from '../assets/butterfly2.json';
import butterfly3 from '../assets/butterfly3.json';
import './Butterflies.css';

const InteractiveButterfly = ({ children, className, style }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
  const [originPosition, setOriginPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [isTouch, setIsTouch] = useState(false);

  const MAX_RANGE = 400; // Maximum pixels butterfly can travel from origin
  const BOUNDARY_PADDING = 50; // Pixels from edge of screen

  // Constrain position within screen bounds and max range
  const constrainPosition = (x, y) => {
    // Screen boundaries
    const maxX = window.innerWidth - BOUNDARY_PADDING;
    const maxY = window.innerHeight - BOUNDARY_PADDING;
    const minX = BOUNDARY_PADDING;
    const minY = BOUNDARY_PADDING;

    // Apply screen boundaries
    let constrainedX = Math.max(minX, Math.min(maxX, x));
    let constrainedY = Math.max(minY, Math.min(maxY, y));

    // Apply max range from origin
    if (originPosition.x !== 0 || originPosition.y !== 0) {
      const deltaX = constrainedX - originPosition.x;
      const deltaY = constrainedY - originPosition.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance > MAX_RANGE) {
        const ratio = MAX_RANGE / distance;
        constrainedX = originPosition.x + deltaX * ratio;
        constrainedY = originPosition.y + deltaY * ratio;
      }
    }

    return { x: constrainedX, y: constrainedY };
  };

  useEffect(() => {
    const handleMove = (e) => {
      if (!isFollowing) return;

      let clientX, clientY;
      if (e.type === 'touchmove') {
        const touch = e.touches[0];
        clientX = touch.clientX;
        clientY = touch.clientY;
      } else if (e.type === 'mousemove') {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      // Apply constraints
      const constrained = constrainPosition(clientX, clientY);
      setTargetPosition(constrained);

      // Calculate rotation angle based on direction of movement
      const deltaX = constrained.x - currentPosition.x;
      const deltaY = constrained.y - currentPosition.y;
      const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
      setRotation(angle);
    };

    const handleEnd = () => {
      if (isFollowing) {
        setIsFollowing(false);
        setIsTouch(false);
      }
    };

    if (isFollowing) {
      if (isTouch) {
        window.addEventListener('touchmove', handleMove);
        window.addEventListener('touchend', handleEnd);
      } else {
        window.addEventListener('mousemove', handleMove);
        window.addEventListener('click', handleEnd);
      }
    }

    return () => {
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('click', handleEnd);
    };
  }, [isFollowing, isTouch, currentPosition, originPosition]);

  // Smooth animation update loop
  useEffect(() => {
    if (!isFollowing) return;

    const animateFollow = () => {
      setCurrentPosition(prev => {
        const deltaX = targetPosition.x - prev.x;
        const deltaY = targetPosition.y - prev.y;

        // Smooth lerp animation (0.15 is the follow speed)
        const newX = prev.x + deltaX * 0.15;
        const newY = prev.y + deltaY * 0.15;

        return { x: newX, y: newY };
      });

      if (isFollowing) {
        requestAnimationFrame(animateFollow);
      }
    };

    const animationFrame = requestAnimationFrame(animateFollow);
    return () => cancelAnimationFrame(animationFrame);
  }, [isFollowing, targetPosition]);

  const handleTouchStart = (e) => {
    e.stopPropagation();
    setIsTouch(true);
    setIsFollowing(true);
    const touch = e.touches[0];
    const startX = touch.clientX;
    const startY = touch.clientY;
    const constrained = constrainPosition(startX, startY);
    setTargetPosition(constrained);
    setCurrentPosition(constrained);
    setOriginPosition(constrained);
  };

  const handleClick = (e) => {
    if (isTouch) return;
    e.stopPropagation();
    if (!isFollowing) {
      setIsFollowing(true);
      const startX = e.clientX;
      const startY = e.clientY;
      const constrained = constrainPosition(startX, startY);
      setTargetPosition(constrained);
      setCurrentPosition(constrained);
      setOriginPosition(constrained);
    } else {
      setIsFollowing(false);
    }
  };

  return (
    <motion.div
      className={className}
      style={isFollowing ? {
        position: 'fixed',
        left: 0,
        top: 0,
        x: currentPosition.x - 50,
        y: currentPosition.y - 50,
        zIndex: 10000,
        pointerEvents: 'auto',
        cursor: 'grabbing'
      } : { ...style, pointerEvents: 'auto', cursor: 'grab' }}
      animate={isFollowing ? { rotate: rotation } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
    >
      {children}
    </motion.div>
  );
};

const Butterflies = () => {
  const { scrollY } = useScroll();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Existing butterflies transforms
  const scale2 = useTransform(scrollY, [500, 1000], [1, 3]);

  // Adjust destinations for mobile
  const x1Dest = isMobile ? 100 : 440;
  const y1Dest = isMobile ? 400 : 720;
  const x1 = useTransform(scrollY, [0, 500], [0, x1Dest]);
  const y1 = useTransform(scrollY, [0, 500], [0, y1Dest]);
  const r1 = useTransform(scrollY, [0, 500], [0, -20]);

  const x2Dest = isMobile ? -100 : -550;
  const x2Dest2 = isMobile ? -20 : -20;
  const y2Dest = isMobile ? 800 : 1460;
  const x2 = useTransform(scrollY, [0, 500, 1000], [0, x2Dest, x2Dest2]);
  const y2 = useTransform(scrollY, [0, 1000], [0, y2Dest]);
  const r2 = useTransform(scrollY, [0, 500], [0, -360]);

  const x3Dest = isMobile ? 20 : 40;
  const y3Dest = isMobile ? 500 : 860;
  const x3 = useTransform(scrollY, [0, 500], [0, x3Dest]);
  const y3 = useTransform(scrollY, [0, 500], [0, y3Dest]);
  const r3 = useTransform(scrollY, [0, 500], [0, 360]);

  // New Flying Butterflies Transforms (5 more)
  // B4: Flies from left to right across screen
  const x4 = useTransform(scrollY, [0, 800], [-100, isMobile ? 300 : 1200]);
  const y4 = useTransform(scrollY, [0, 800], [100, 600]);

  // B5: Spirals down
  const x5 = useTransform(scrollY, [0, 1000], [isMobile ? 300 : 1000, isMobile ? 50 : 200]);
  const y5 = useTransform(scrollY, [0, 1000], [200, 900]);
  const r5 = useTransform(scrollY, [0, 1000], [0, 720]);

  // B6: Zigzag
  const x6 = useTransform(scrollY, [0, 300, 600, 900], [50, 200, 50, 200]);
  const y6 = useTransform(scrollY, [0, 300, 600, 900], [800, 100, 800, 100]);

  // B7: Diagonal
  const x7 = useTransform(scrollY, [0, 1000], [isMobile ? 20 : 100, isMobile ? 300 : 1300]);
  const y7 = useTransform(scrollY, [0, 1000], [900, 100]);

  // B8: Loop
  const x8 = useTransform(scrollY, [0, 500, 1000], [isMobile ? 150 : 700, isMobile ? 250 : 900, isMobile ? 150 : 700]);
  const y8 = useTransform(scrollY, [0, 500, 1000], [300, 500, 300]);

  return (
    <div className="butterfly-container">
      {/* Existing Flying Butterflies */}
      <InteractiveButterfly className="scroll-butterfly b1-1" style={{ x: x1, y: y1, rotate: r1 }}>
        <Lottie animationData={butterfly1} className="butterfly" loop />
      </InteractiveButterfly>

      <InteractiveButterfly className="scroll-butterfly b2-1" style={{ x: x2, y: y2, rotate: r2, scale: scale2 }}>
        <Lottie animationData={butterfly2} className="butterfly" loop />
      </InteractiveButterfly>

      <InteractiveButterfly className="scroll-butterfly b3-1" style={{ x: x3, y: y3, rotate: r3 }}>
        <Lottie animationData={butterfly3} className="butterfly" loop />
      </InteractiveButterfly>

      {/* New Flying Butterflies */}
      <InteractiveButterfly className="scroll-butterfly" style={{ x: x4, y: y4 }}>
        <Lottie animationData={butterfly1} className="butterfly" loop />
      </InteractiveButterfly>
      <InteractiveButterfly className="scroll-butterfly" style={{ x: x5, y: y5, rotate: r5 }}>
        <Lottie animationData={butterfly2} className="butterfly" loop />
      </InteractiveButterfly>
      <InteractiveButterfly className="scroll-butterfly" style={{ x: x6, y: y6 }}>
        <Lottie animationData={butterfly3} className="butterfly" loop />
      </InteractiveButterfly>
      <InteractiveButterfly className="scroll-butterfly" style={{ x: x7, y: y7 }}>
        <Lottie animationData={butterfly1} className="butterfly" loop />
      </InteractiveButterfly>
      <InteractiveButterfly className="scroll-butterfly" style={{ x: x8, y: y8 }}>
        <Lottie animationData={butterfly2} className="butterfly" loop />
      </InteractiveButterfly>

      {/* Static Butterflies (Now Interactive too) */}
      <InteractiveButterfly className="static-wrapper b1-2">
        <Lottie animationData={butterfly1} className="butterfly" loop />
      </InteractiveButterfly>
      <InteractiveButterfly className="static-wrapper b1-3">
        <Lottie animationData={butterfly1} className="butterfly" loop />
      </InteractiveButterfly>
      <InteractiveButterfly className="static-wrapper b2-2">
        <Lottie animationData={butterfly2} className="butterfly" loop />
      </InteractiveButterfly>
      <InteractiveButterfly className="static-wrapper b2-3">
        <Lottie animationData={butterfly2} className="butterfly" loop />
      </InteractiveButterfly>
      <InteractiveButterfly className="static-wrapper b3-2">
        <Lottie animationData={butterfly3} className="butterfly" loop />
      </InteractiveButterfly>
      <InteractiveButterfly className="static-wrapper b3-3">
        <Lottie animationData={butterfly3} className="butterfly" loop />
      </InteractiveButterfly>

      {/* 4 New Static Butterflies */}
      <InteractiveButterfly className="static-wrapper b1-4">
        <Lottie animationData={butterfly1} className="butterfly" loop />
      </InteractiveButterfly>
      <InteractiveButterfly className="static-wrapper b2-4">
        <Lottie animationData={butterfly2} className="butterfly" loop />
      </InteractiveButterfly>
      <InteractiveButterfly className="static-wrapper b3-4">
        <Lottie animationData={butterfly3} className="butterfly" loop />
      </InteractiveButterfly>
      <InteractiveButterfly className="static-wrapper b1-5">
        <Lottie animationData={butterfly1} className="butterfly" loop />
      </InteractiveButterfly>

    </div>
  );
};

export default Butterflies;
