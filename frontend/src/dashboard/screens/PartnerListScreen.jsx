import { Edit, Trash, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGetPartnersQuery, useDeletePartnerMutation, useCreatePartnerMutation } from '../../slices/partnersApiSlice.js';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button.jsx';

const PartnerListScreen = () => {
  const navigate = useNavigate();
  const { data: partners, isLoading, error, refetch } = useGetPartnersQuery();
  const [deletePartner, { isLoading: loadingDelete }] = useDeletePartnerMutation();
  const [createPartner, { isLoading: loadingCreate }] = useCreatePartnerMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this partner?')) {
      try {
        await deletePartner(id).unwrap();
        toast.success('Partner deleted successfully');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.message);
      }
    }
  };

  const createPartnerHandler = async () => {
    if (window.confirm('Are you sure you want to create a new partner?')) {
      try {
        await createPartner().unwrap();
        toast.success('Partner created successfully');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.message || 'An error occurred while creating the partner');
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Partners</h1>
      <div className="flex justify-end gap-4 mb-4">
        <Button onClick={createPartnerHandler} className="bg-green-500 text-white">
          Create Partner
        </Button>
      </div>

      {(loadingCreate || loadingDelete || isLoading) && (
        <div className="text-center py-4">
          <Loader size={48} className="animate-spin mx-auto text-gray-700" />
        </div>
      )}

      {!loadingCreate && !loadingDelete && !isLoading && error ? (
        <div className="text-red-500">{error.data.message}</div>
      ) : (
        partners && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-lg">
              <thead>
                <tr className="bg-gray-800 text-white">
                  {['ID', 'Name', 'Description', 'Actions'].map((title) => (
                    <th key={title} className="text-left px-4 py-2">{title}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {partners.map((partner, index) => (
                  <tr key={partner._id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-4 py-2">{partner._id}</td>
                    <td className="px-4 py-2">{partner.name}</td>
                    <td className="px-4 py-2">{partner.description}</td>
                    <td className="px-4 py-2 flex gap-2">
                      <Button
                        onClick={() => navigate(`/dashboard/partners/${partner._id}/edit`)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-md"
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        onClick={() => deleteHandler(partner._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md"
                      >
                        <Trash size={16} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </div>
  );
};

export default PartnerListScreen;