import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const AboutUsSection = () => {
  return (
    <section className="bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl font-bold">About Us</h2>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-8">
          <motion.img
            src="/4.jpeg"
            className="w-96 h-96 object-cover rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />

          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Accordion type="single" collapsible>
              <AccordionItem value="vision">
                <AccordionTrigger>Our Vision</AccordionTrigger>
                <AccordionContent>
                  <p>
                    That the academy be among the first five Arab academies
                    specialized in Islamic and human sciences, frequented by
                    researchers and seekers of knowledge from different
                    segments.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="message">
                <AccordionTrigger>Our Message</AccordionTrigger>
                <AccordionContent>
                  <p>
                    Building the personality of a contemporary Muslim based on
                    knowledge, innovation, and community service to contribute
                    to societal growth and global peace.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="values">
                <AccordionTrigger>Our Values</AccordionTrigger>
                <AccordionContent>
                  <p>
                    Building the personality of a contemporary Muslim based on
                    knowledge, innovation, and community service to contribute
                    to societal growth and global peace.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="goals">
                <AccordionTrigger>Our Goals</AccordionTrigger>
                <AccordionContent>
                  <p>
                    Building the personality of a contemporary Muslim based on
                    knowledge, innovation, and community service to contribute
                    to societal growth and global peace.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
