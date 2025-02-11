import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  useGetUserDetailsQuery, 
  useUpdateUserMutation 
} from '@/slices/usersApiSlice.js'; 
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader } from 'lucide-react';

const UserEditScreen = () => {
  const { id: userId } = useParams();
  const navigate = useNavigate();

  const { data: user, isLoading, error } = useGetUserDetailsQuery(userId);
  const [updateUser , { isLoading: loadingUpdate }] = useUpdateUserMutation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
      setProfilePicture(null);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to update this user?')) {
      try {
        const updatedData = {
          userId: userId,
          name,
          email,
          role,
          profilePicture,
        };

        await updateUser (updatedData).unwrap();
        toast.success('User  updated successfully');
        navigate('/dashboard/users');
      } catch (err) {
        toast.error(err?.data?.message || err.message || 'An error occurred while updating the user');
      }
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gradient-to-r from-blue-50 via-green-50 to-yellow-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Edit User</h1>
      {isLoading || loadingUpdate ? (
        <div className="flex justify-center items-center h-48">
          <Loader size={48} color="gray" className="spinner" />
        </div>
      ) : error ? (
        <div className="text-red-600 text-center">{error.data.message}</div>
      ) : (
        <form onSubmit={submitHandler} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-lg font-medium text-gray-700">Name</label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-lg font-medium text-gray-700">Email</label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="role" className="text-lg font-medium text-gray-700">Role</label>
            <Select onValueChange={setRole} value={role}>
              <SelectTrigger className="w-[180px] mt-2">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="superadmin">Super Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="profilePicture" className="text-lg font-medium text-gray-700">Profile Picture</label>
            <Input
              id="profilePicture"
              type="file"
              onChange={(e) => setProfilePicture(e.target.files[0])}
              className="mt-2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Button type="submit" variant="contained" color="primary" className="w-full mt-6 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition duration-300">
            Update User
          </Button>
        </form>
      )}
    </div>
  );
};

export default UserEditScreen;