// Section.jsx
import { useNavigate } from 'react-router-dom';

const Section = ({ title, items, seeMoreLink }) => {
  const navigate = useNavigate();

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.slice(0, 3).map((item) => (
          <div key={item.id} className="border p-4 rounded shadow">
            <h3 className="font-semibold">{item.name}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
      <button
        onClick={() => navigate(seeMoreLink)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        See More
      </button>
    </div>
  );
};

export default Section;