import { Edit, Trash, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGetPartnersQuery, useDeletePartnerMutation, useCreatePartnerMutation } from '../../slices/partnersApiSlice.js';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button.jsx';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/components/ui/table.jsx';

const PartnerListScreen = () => {
  const navigate = useNavigate();
  const { data: partners, isLoading, error, refetch } = useGetPartnersQuery();
  const [deletePartner, { isLoading: loadingDelete }] = useDeletePartnerMutation();
  const [createPartner, { isLoading: loadingCreate }] = useCreatePartnerMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        console.log(`Attempting to delete partner with ID: ${id}`);
        await deletePartner(id).unwrap();
        toast.success('Partner deleted successfully');
        refetch();
      } catch (err) {
        console.error('Error deleting partner:', err);
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
    <div>
      <h1>Partners</h1>
      <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '16px 0' }}>
        <Button onClick={createPartnerHandler} variant="contained" color="blue">
          Create Partner
        </Button>
      </div>

      {(loadingCreate || loadingDelete || isLoading) && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Loader size={48} color="black" className="spinner" />
        </div>
      )}

      {!loadingCreate && !loadingDelete && !isLoading && error ? (
        <div style={{ color: 'red' }}>{error.data.message}</div>
      ) : (
        partners && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {partners.map((partner) => (
                <TableRow key={partner._id}>
                  <TableCell>{partner._id}</TableCell>
                  <TableCell>{partner.name}</TableCell>
                  <TableCell>{partner.description}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => navigate(`/dashboard/partners/${partner._id}/edit`)}
                      variant="contained"
                      color="default"
                      size="small"
                    >
                      <Edit size={16} color="blue" />
                    </Button>
                    <Button
                      onClick={() => deleteHandler(partner._id)}
                      variant="contained"
                      size="small"
                      style={{ marginLeft: '8px' }}
                    >
                      <Trash size={16} color="red" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )
      )}
    </div>
  );
};

export default PartnerListScreen;
