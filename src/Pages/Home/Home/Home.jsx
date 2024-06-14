
import Banner from "../Banner/Banner";
import Faq from "../Faq/Faq";
import Featured from "../Featured/Featured";
import Work from "../HowItsWork/Work";
import LatestSurvey from "../LatestSurvey/LatestSurvey";
// import Featured from "./Featured/Featured";
import { Helmet } from 'react-helmet-async';



const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Pro Survey | Home</title>
            </Helmet>
           <div className="my-6">
           <Banner></Banner>
           </div>
           <div className="max-w-[1440px] mx-auto">
           <Featured></Featured>
           </div>
           <div className="max-w-[1440px] mx-auto">
           <LatestSurvey></LatestSurvey>
           </div>
           <Work></Work>
           <Faq></Faq>
          
        </div>
    );
};

export default Home;