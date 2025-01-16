import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLoginMutation } from '@/slices/usersApiSlice';
import { setCredentials } from '@/slices/authSlice';
import { Toaster, toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [login, { isLoading }] = useLoginMutation();
  
  const userInfo = useSelector((state) => state.auth.userInfo);
  
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/dashboard';

  useEffect(() => {
    if (userInfo) {
      console.log("User info detected, navigating to redirect:", redirect);
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);
  
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("Submitting form", { email, password });
    try {
      const res = await login({ email, password }).unwrap();
      console.log("Login successful", res);
      dispatch(setCredentials({ ...res }));
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      console.error("Login error", error);
      const errorMessage = error?.data?.message || error.error || 'Login failed';
      toast.error(errorMessage);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center items-center h-screen bg-gray-100"
    >
      <Toaster />
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-semibold text-center mb-6">Sign In</h1>
        <Form onSubmit={submitHandler}>
          <div className="mb-4">
            <Label>Email Address</Label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2"
            />
          </div>
          <div className="mb-4">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2"
            />
          </div>
          <Button type="submit" className="w-full mt-4" disabled={isLoading}>
            {isLoading ? <Loader className="mx-auto mt-2" /> : 'Sign In'}
          </Button>
        </Form>
      </div>
    </motion.div>
  );
};

export default LoginPage;
