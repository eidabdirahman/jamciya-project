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
  const [role, setRole] = useState(''); // State for user role
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role); // Set the role from the fetched user data
      setProfilePicture(null); // Reset profile picture input
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
    <div>
      <h1>Edit User</h1>
      {isLoading || loadingUpdate ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Loader size={48} color="gray" className="spinner" />
        </div>
      ) : error ? (
        <div style={{ color: 'red' }}>{error.data.message}</div>
      ) : (
        <form onSubmit={submitHandler}>
          <div>
            <label htmlFor="name">Name</label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="role">Role</label>
            <Select onValueChange={setRole} value={role}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="superadmin">Super Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="profilePicture">Profile Picture</label>
            <Input
              id="profilePicture"
              type="file"
              onChange={(e) => setProfilePicture(e.target.files[0])}
            />
          </div>
          <Button type="submit" variant="contained" color="primary">
            Update User
          </Button>
        </form>
      )}
    </div>
  );
};

export default UserEditScreen;