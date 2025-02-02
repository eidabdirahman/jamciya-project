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

  console.log('Partner ID from useParams:', partnerId); // Debugging line

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
      // Assuming you have a way to fetch and display the image file
    }
    console.log('Partner data fetched:', partner); // Debugging line
  }, [partner]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
    console.log('Image file selected:', file); // Debugging line
  };

  const submitHandler = async (e) => {
    e.preventDefault();
  
    // Debugging line to check partnerId
    console.log('Validating partnerId:', partnerId);
    
   
  
    // Debugging line to verify form data
    console.log('Form submitted with:', { partnerId, name, description, website, imageFile });
  
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
        console.error('Error updating partner:', err); // Debugging line
      }
    }
  };
  

  return (
    <div>
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
            <label htmlFor="image">Image File</label>
            <Input
              id="image"
              type="file"
              onChange={handleImageUpload}
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
