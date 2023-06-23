import React from 'react';
import { motion } from 'framer-motion';

/** Пример анимаций */
const pageAnimation = {
  hidden: {
    x: -100,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4 },
  },
};

const textAnimation = {
  hidden: {
    x: 100,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, delay: 0.1 },
  },
};

/** Пример использования библиотеки */
const FramerMotion: React.FC = () => (
  <div>
    <motion.div
      className="min-h-screen bg-blue-300 flex items-center justify-center"
      initial="hidden"
      variants={pageAnimation}
      whileInView="visible"
    >
      <motion.div
        className="text-4xl bg-red-400 p-10 rounded-lg text-red-800"
        initial="hidden"
        variants={textAnimation}
        whileInView="visible"

      >
        Screen 1
      </motion.div>
    </motion.div>
    <motion.div
      className="min-h-screen bg-blue-400 flex items-center justify-center"
      initial="hidden"
      variants={pageAnimation}
      whileInView="visible"
    >
      <motion.div
        className="text-4xl bg-green-400 p-10 rounded-lg text-green-800"
        initial="hidden"
        variants={textAnimation}
        whileInView="visible"
      >
        Screen 2
      </motion.div>
    </motion.div>
    <motion.div
      className="min-h-screen bg-blue-500 flex items-center justify-center"
      initial="hidden"
      variants={pageAnimation}
      whileInView="visible"
    >
      <motion.div
        className="text-4xl bg-yellow-400 p-10 rounded-lg text-yellow-800"
        initial="hidden"
        variants={textAnimation}
        whileInView="visible"

      >
        Screen 3
      </motion.div>
    </motion.div>
    <motion.div
      className="min-h-screen bg-blue-600 flex items-center justify-center"
      initial="hidden"
      variants={pageAnimation}
      whileInView="visible"
    >
      <motion.div
        className="text-4xl bg-pink-400 p-10 rounded-lg text-pink-800"
        initial="hidden"
        variants={textAnimation}
        whileInView="visible"

      >
        Sreen 4
      </motion.div>
    </motion.div>
  </div>
);

export default React.memo(FramerMotion);
