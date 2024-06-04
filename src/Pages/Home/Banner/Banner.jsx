
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";



import image1 from '../../../../public/1.jpg'
import image2 from '../../../../public/2.jpg'
import image3 from '../../../../public/3.jpg'
import image4 from '../../../../public/4.jpg'

const Banner = () => {
  return (
    <Carousel>
      <div>
        <img className="rounded-lg" src={image2} />
        
      </div>
      <div>
        <img className="rounded-lg" src={image1} />
      </div>
      <div>
        <img className="rounded-lg" src={image3} />
      </div>
      <div>
        <img className="rounded-lg" src={image4} />
      </div>
    </Carousel>
  );
};

export default Banner;
