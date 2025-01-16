import { motion } from 'framer-motion';

const advisors = [
  {
    name: 'Sh. C/xakiim sh. Ali Suufi',
    image: '/4.jpeg',
  },
  {
    name: 'Sh. C/baasid sh. Baraawe',
    image: '/6.jpeg',
  },
  {
    name: 'Sh. Xassan C/salaan',
    image: '/shImage.jpeg',
  },
  {
    name: 'Sh. Mustafe Ismail Harun',
    image: '/shImage2.jpeg',
  },
  {
    name: 'Sh. Ismail Abdi Hoorahy',
    image: '/6.jpeg',
  },
  {
    name: 'Advisor Name 5',
    image: '/6.jpeg',
  },
];

const AdvisoryBoard = () => {
  return (
    <section className="py-16">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-800">Advisory Board</h2>
        <div className="w-16 h-1 mt-2 mx-auto bg-orange-500"></div>
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {advisors.map((advisor, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: index * 0.2 }}
          >
            <div className="w-40 h-40 mb-4 relative rounded-full border-4 border-orange-500 overflow-hidden shadow-lg">
              <img
                src={advisor.image}
                alt={advisor.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <h3 className="text-center text-lg font-semibold text-gray-900 underline">
              {advisor.name}
            </h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AdvisoryBoard;
