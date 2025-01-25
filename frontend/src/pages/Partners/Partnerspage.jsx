import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useGetPartnersQuery } from '@/slices/partnersApiSlice';
import { toast } from 'react-hot-toast';
import { Loader } from 'lucide-react';

const PartnersPage = () => {
  const { data: partners, isLoading, error } = useGetPartnersQuery();

  if (error) {
    toast.error("Error loading partners");
    console.error("Error loading partners:", error);
  }

  return (
    <div className="container mx-auto p-4">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-4">Our Partners</h1>
      </motion.div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <p>Error loading partners</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {partners.map((partner, index) => (
            <motion.div
              key={partner._id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={{ pathname: partner.website }} target="_blank" rel="noopener noreferrer">
                <Card className="bg-white shadow-md rounded-lg overflow-hidden">
                  <CardHeader>
                    <img src={partner.image || 'default-image-url.jpg'} alt={`Partner ${index + 1}`} className="w-full h-40 object-cover" />
                    <CardTitle className="truncate">{partner.name}</CardTitle>
                    <CardDescription className="truncate">
                      {partner.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{partner.description.substring(0, 100)}...</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PartnersPage;
