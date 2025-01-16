import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useGetPartnerByIdQuery,
  useUpdatePartnerMutation
} from '../../slices/partnersApiSlice.js';
import toast, { Toaster } from 'react-hot-toast';
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
  const [image, setImage] = useState('');

  useEffect(() => {
    if (partner) {
      setName(partner.name);
      setDescription(partner.description);
      setWebsite(partner.website);
      setImage(partner.image);
    }
  }, [partner]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to update this partner?')) {
      try {
        await updatePartner({ id: partnerId, name, description, website, image }).unwrap();
        toast.success('Partner updated successfully');
        navigate('/dashboard/partners');
      } catch (err) {
        toast.error(err?.data?.message || err.message || 'An error occurred while updating the partner');
      }
    }
  };

  return (
    <div>
      <Toaster />
      <h1>Edit Partner</h1>
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
            <label htmlFor="description">Description</label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="website">Website</label>
            <Input
              id="website"
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="image">Image URL</label>
            <Input
              id="image"
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </div>
          <Button type="submit" variant="contained" color="primary">
            Update Partner
          </Button>
        </form>
      )}
    </div>
  );
};

export default PartnerEditScreen;
