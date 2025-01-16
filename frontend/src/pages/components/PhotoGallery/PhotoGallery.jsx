import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import Image1 from '../../public/1.jpeg';
import Image2 from '../../public/2.jpeg'
import Image3 from '../../public/3.jpeg'
import Image4 from '../../public/4.jpeg'
import Image5 from '../../public/5.jpeg'
import Image6 from '../../public/6.jpeg'


const PhotoGallery = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = [
        { id: 1, src: Image1, alt: 'Image 1' },
        { id: 2, src: Image2, alt: 'Image 2' },
        { id: 3, src: Image3, alt: 'Image 3' },
        { id: 4, src: Image4, alt: 'Image 4' },
        { id: 5, src: Image5, alt: 'Image 5' },
        { id: 6, src: Image6, alt: 'Image 6' },
        { id: 7, src: Image1, alt: 'Image 7' },
        { id: 8, src: Image2, alt: 'Image 8' },
    ];

    const hasMoreThanFiveImages = images.length > 5;

    const visibleImages = hasMoreThanFiveImages
        ? images.slice(currentIndex, currentIndex + 5)
        : images;

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 5 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex + 5 >= images.length ? 0 : prevIndex + 1
        );
    };

    const handlers = useSwipeable({
        onSwipedLeft: () => handleNext(),
        onSwipedRight: () => handlePrev(),
    });

    return (
        <section className="py-8">
            <div className="container mx-auto text-center px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold mb-6">Photo Gallery</h2>

                <div
                    {...handlers}
                    className="relative flex justify-center items-center overflow-hidden"
                >
                    <ChevronLeft
                        size={23}
                        onClick={handlePrev}
                        className="absolute left-4 md:left-10 lg:left-10 hover:scale-110 transition-all cursor-pointer z-10"
                    />

                    <motion.div
                        className="flex space-x-4"
                        drag="x"
                        dragConstraints={{ left: -300, right: 0 }}
                        initial={{ x: 0 }}
                        animate={{ x: 0 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                    >
                        {visibleImages.map((image) => (
                            <motion.div
                                key={image.id}
                                className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-48 lg:h-48 overflow-hidden rounded-lg shadow-md flex-none"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>
                        ))}
                    </motion.div>

                    <ChevronRight
                        size={23}
                        onClick={handleNext}
                        className="absolute right-4 md:right-10 lg:right-10 hover:scale-110 transition-all cursor-pointer z-10"
                    />
                </div>

                <div className="mt-4 flex justify-center space-x-2">
                    {Array(Math.ceil(images.length / 5))
                        .fill('')
                        .map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index * 5)}
                                className={`w-3 h-3 rounded-full ${Math.floor(currentIndex / 5) === index
                                        ? 'bg-orange-500'
                                        : 'bg-gray-300'
                                    }`}
                            />
                        ))}
                </div>
            </div>
        </section>
    );
};

export default PhotoGallery;
