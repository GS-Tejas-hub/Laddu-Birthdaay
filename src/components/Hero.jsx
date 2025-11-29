import React, { useRef } from 'react';
import './Hero.css';
import Header from './Header';
import Butterflies from './Butterflies';
import { useInView, motion } from 'framer-motion';

const Hero = () => {
  const section2Ref = useRef(null);
  const isInView = useInView(section2Ref, { amount: 0.9, once: true });
  const section1RightRef = useRef(null);
  const isInViewRight = useInView(section1RightRef, { amount: 0.7, once: true });
  return (
    <>
      <Header />
      <Butterflies />

      <div className="hero">

        <div className="hero-content">
          <h1>Level 23 Unlocked </h1>
          <p>Welcome to Level 23🎈❤️, 23 years ago the world got lucky 🌎💫, today, it gets to celebrate that miracle again. Putti manchi pan chesav ra....🌍💛</p>
          <button>Start Exploring</button>
        </div>
      </div>
      <div className="section1">
        <div className="section1-left">
          <img src="/images/section1.png" alt="Colorful Flower Bundle" />
        </div>
        <motion.div
          ref={section1RightRef}
          className="section1-right"
          initial="hidden"
          animate={isInViewRight ? "visible" : "hidden"}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.3,
              },
            },
          }}
        >
          <motion.h1
            variants={{
              hidden: { opacity: 0, x: 60 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            Flowers for uuuu Ladduuu....
          </motion.h1>

          {[
            "Thank youuu sooo muchh!! for stepping into this world and in my lifee...",
            "Let the colors of nature bloom around you.",
            "From the tender sway of petals to the quiet strength of their stems,",
            "this garden is a canvas of calm and wonder.",
            "Breathe in the serenity, feel the sunlight in every hue,",
            "and wander through a world where growth never stops."
          ].map((line, index) => (
            <motion.p
              key={index}
              variants={{
                hidden: { opacity: 0, x: 60 },
                visible: { opacity: 1, x: 0 },
              }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              {line}
            </motion.p>
          ))}
        </motion.div>
      </div>
      <div className="section2">
        <motion.div
          ref={section2Ref}
          className="section2-content"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.3,
              }
            },
          }}
        >
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            For the One Who Makes the World Bloom
          </motion.h2>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            On this special day, as you walk into your 23rd year, may your path be as soft and welcoming as fresh grass under your feet.
            May every breeze that brushes past you carry peace, joy, and gentle beginnings.
            Let your footsteps sink softly into the earth as butterflies dance beside you.
            May your life unfold like a garden blooming with new opportunities, kind people, and beautiful moments placed just for you.
            May butterflies dance around your journey, reminding you that transformation is always possible and always beautiful.
            May the sky above you stay wide and open, filled with hope, clarity, and light.
            May every blade of grass bend in blessing, reminding you that the world is glad you’re here.
            Take a breath — fresh, green, and full of promise.
            May this year bring you wonder, growth, and endless reasons to smile (and I knoww that I'm one of those...).
            Happy Birthday, and may your 23rd year be your most magical one yet. 🌿✨🎂
          </motion.p>
        </motion.div>


      </div>

    </>
  );
};

export default Hero;
