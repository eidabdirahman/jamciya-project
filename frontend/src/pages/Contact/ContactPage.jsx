import { motion } from 'framer-motion';
import ContactForm from './ContactForm';
import LocationMap from './LocationMap';

const ContactPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center min-h-screen bg-green-100 p-8"
    >
      <ContactForm />
      <LocationMap />
     
    </motion.div>
  );
};

export default ContactPage;
