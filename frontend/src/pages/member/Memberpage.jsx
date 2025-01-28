import { Loader } from 'lucide-react';
import { useState, useEffect } from 'react';

const Memberpage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const iframe = document.querySelector('iframe');
    const onLoad = () => setLoading(false);
    iframe.addEventListener('load', onLoad);

    return () => {
      iframe.removeEventListener('load', onLoad);
    };
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 mt-10">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg overflow-hidden relative">
        {loading && (
          <div className="absolute top-0 left-0 w-full flex items-center justify-center bg-white bg-opacity-75">
            <Loader className="animate-spin text-gray-500 m-3" size={40} />
          </div>
        )}
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSfSIjYfmSjMFKjXHZxRNTU5mhYz2J-Qqr-KKy9U5iNu-38y0g/viewform?embedded=true"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          className="w-full h-screen"
        >
          Loading…
        </iframe>
      </div>
    </div>
  );
};

export default Memberpage;
