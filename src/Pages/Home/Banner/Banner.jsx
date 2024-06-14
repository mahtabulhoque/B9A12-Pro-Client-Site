import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import image1 from '../../../../public/12.png'
import image2 from '../../../../public/11.jpg'
import image3 from '../../../../public/8.jpg'
import image4 from '../../../../public/survey1.gif'

const Banner = () => {
  const slides = [
    { src: image2, heading: "Welcome To Our Pro Survey Website", text: "Give Your feedback to helps us improve!" },
    { src: image1, heading: "We Value Your Opinion", text: "Share your thoughts and win rewards!" },
    { src: image3, heading: "Be Part of the Change", text: "Participate in our survey and make a difference." },
    { src: image4, heading: "Help Us Serve You Better", text: "Take a few minutes to complete our survey." },
  ];

  return (
    <Carousel>
      {slides.map((slide, index) => (
        <div key={index} className="relative h-[800px]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.src})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-transparent to-gray-800 opacity-80 rounded-lg"></div>
            <div className="absolute text-center ml-10 mt-10 p-4">
              <h2 className="text-yellow-500 text-3xl md:text-7xl font-bold mb-4">
                {slide.heading}
              </h2>
              <p className="font-medium text-lg md:text-4xl text-white">
                {slide.text}
              </p>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default Banner;
