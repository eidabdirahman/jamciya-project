import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
// import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import emailjs from 'emailjs-com';

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await emailjs.sendForm('service_490u6kr', 'template_o4cn6ni', e.target, 'BG_xYGaM9p4raH3ws');
      toast.success('Message sent successfully!');
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center min-h-screen bg-green-100 p-8"
    >
      <div className="w-full max-w-screen-xl bg-white rounded-lg shadow-md p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6">
          <h1 className="text-3xl font-bold text-center lg:text-left mb-8">Contact Us</h1>
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="user_name"
                className="mt-2"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="user_email"
                className="mt-2"
              />
            </div>
            <div className="mb-6">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                name="message"
                className="mt-2"
              />
            </div>
            <Button type="submit" className="w-full py-2" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        </div>

        <div className="lg:col-span-6 flex flex-col justify-between">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <p>Email: <a href="mailto:info@roya-academy.com" className="text-blue-600">info@roya-academy.com</a></p>
            <p>Phone: <a href="tel:+905444187758" className="text-blue-600">+90 544 418 77 58</a></p>
            <p>Address: Basaksehir, Istanbul, Türkiye</p>
            <div className="flex space-x-4 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600">Facebook</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-blue-600">Instagram</a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-blue-600">YouTube</a>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Location</h2>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3105.13895973695!2d-77.0368706846485!3d38.907192279570404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7b7b13d22d81b%3A0x5695df0f58b85d14!2sWhite%20House!5e0!3m2!1sen!2sus!4v1609539126539!5m2!1sen!2sus"
              width="100%"
              height="300"
              allowFullScreen=""
              loading="lazy"
              title="Map"
              className="rounded-lg shadow-sm"
            ></iframe>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactPage;
