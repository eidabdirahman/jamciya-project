import { motion } from 'framer-motion';
import AbutImage from '../../public/6.jpeg';

const AboutUsHeader = () => {
  return (
    <div className="relative w-full h-64 md:h-80 lg:h-96">
      <motion.img
        src={AbutImage}
        alt="Background Image"
        className="w-full h-full object-cover object-center opacity-80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 z-50">
            ABOUT US
          </h1>
          <motion.div
            className="w-20 h-1 mt-2 mx-auto bg-[#f48023]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 1 }}
          ></motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUsHeader;
