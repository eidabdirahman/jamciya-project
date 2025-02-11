import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetPartnerByIdQuery, useUpdatePartnerMutation } from '../../slices/partnersApiSlice.js';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Loader } from 'lucide-react';

const PartnerEditScreen = () => {
  const { id: partnerId } = useParams();
  const navigate = useNavigate();

  const { data: partner, isLoading, error } = useGetPartnerByIdQuery(partnerId);
  const [updatePartner, { isLoading: loadingUpdate }] = useUpdatePartnerMutation();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [website, setWebsite] = useState('');
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (partner) {
      setName(partner.name);
      setDescription(partner.description);
      setWebsite(partner.website);
    }
  }, [partner]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to update this partner?')) {
      const formData = new FormData();
      formData.append('id', partnerId);
      formData.append('name', name);
      formData.append('description', description);
      formData.append('website', website);
      if (imageFile) {
        formData.append('image', imageFile);
      }

      try {
        await updatePartner(formData).unwrap();
        toast.success('Partner updated successfully');
        navigate('/dashboard/partners');
      } catch (err) {
        toast.error(err?.data?.message || err.message || 'An error occurred while updating the partner');
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Edit Partner</h1>
      {isLoading || loadingUpdate ? (
        <div className="flex justify-center items-center h-48">
          <Loader size={48} className="animate-spin mx-auto text-gray-700" />
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">{error.data.message}</div>
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
            <label htmlFor="description" className="text-lg font-medium text-gray-700">Description</label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="mt-2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="website" className="text-lg font-medium text-gray-700">Website</label>
            <Input
              id="website"
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              required
              className="mt-2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="image" className="text-lg font-medium text-gray-700">Image File</label>
            <Input
              id="image"
              type="file"
              onChange={handleImageUpload}
              required
              className="mt-2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Button type="submit" variant="contained" color="primary" className="w-full mt-6 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition duration-300">
            Update Partner
          </Button>
        </form>
      )}
    </div>
  );
};

export default PartnerEditScreen;