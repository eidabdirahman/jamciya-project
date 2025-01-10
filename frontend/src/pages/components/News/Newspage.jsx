import { Link } from 'react-router-dom';
import image1 from '../../../../public/1.jpeg';
import image2 from '../../../../public/2.jpeg';
import image3 from '../../../../public/3.jpeg';
import image4 from '../../../../public/4.jpeg';
import { 
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent 
  } from "@/components/ui/card";
  
  const Newspage = () => {
    return (
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/">
          <Card className="bg-white shadow-md rounded-lg overflow-hidden">
            <CardHeader>
              <img src={image1} alt="News 1" className="w-full h-40 object-cover" />
              <CardTitle>News Title 1</CardTitle>
              <CardDescription>News Description 1</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                This is a brief overview of the news content. It provides some
                interesting details and context about the news topic.
              </p>
            </CardContent>
            <CardFooter>
              <span>Published on: 2025-01-09</span>
            </CardFooter>
          </Card>
          </Link>
          
          <Card className="bg-white shadow-md rounded-lg overflow-hidden">
            <CardHeader>
              <img src={image2} alt="News 2" className="w-full h-40 object-cover" />
              <CardTitle>News Title 2</CardTitle>
              <CardDescription>News Description 2</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                This is a brief overview of the news content. It provides some
                interesting details and context about the news topic.
              </p>
            </CardContent>
            <CardFooter>
              <span>Published on: 2025-01-09</span>
            </CardFooter>
          </Card>
          
          <Card className="bg-white shadow-md rounded-lg overflow-hidden">
            <CardHeader>
              <img src={image3} alt="News 3" className="w-full h-40 object-cover" />
              <CardTitle>News Title 3</CardTitle>
              <CardDescription>News Description 3</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                This is a brief overview of the news content. It provides some
                interesting details and context about the news topic.
              </p>
            </CardContent>
            <CardFooter>
              <span>Published on: 2025-01-09</span>
            </CardFooter>
          </Card>
  
          <Card className="bg-white shadow-md rounded-lg overflow-hidden">
            <CardHeader>
              <img src={image4} alt="News 4" className="w-full h-40 object-cover" />
              <CardTitle>News Title 4</CardTitle>
              <CardDescription>News Description 4</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                This is a brief overview of the news content. It provides some
                interesting details and context about the news topic.
              </p>
            </CardContent>
            <CardFooter>
              <span>Published on: 2025-01-09</span>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  };
  
  export default Newspage;
  