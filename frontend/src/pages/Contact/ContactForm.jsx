import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import emailjs from 'emailjs-com';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error('Please fill in all the inputs.');
      return;
    }
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
    <form onSubmit={submitHandler} className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="mb-4 w-full max-w-md">
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
      <div className="mb-4 w-full max-w-md">
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
      <div className="mb-6 w-full max-w-md">
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
      <Button type="submit" className="w-full max-w-md py-2" disabled={isLoading}>
        {isLoading ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
};

export default ContactForm;
