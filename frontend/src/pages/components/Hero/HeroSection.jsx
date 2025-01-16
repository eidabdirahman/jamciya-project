import background from '../../public/bg.jpeg';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative py-10 md:py-40 h-screen">
      <div className="absolute inset-0 z-0">
        <img
          src={background}
          alt="Background"
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-8 text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          <div className="space-y-6">
            <h1 className="text-5xl font-bold">
              Jam’iyyah Al-Quran Wa-Sunnah
            </h1>
            <p className="text-2xl">
              The Fire Never Goes Out collects several years of Tumblr doodles
              and reflections by Noelle Stevenson. It is a powerful...
            </p>
            <Link to="/news" className="inline-block px-6 py-3 bg-orange-600 text-white font-medium rounded-md hover:bg-orange-700 transition">
              See more
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
