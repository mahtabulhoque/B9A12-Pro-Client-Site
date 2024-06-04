
import Banner from "../Banner/Banner";
import Faq from "../Faq/Faq";
import Featured from "../Featured/Featured";
import Work from "../HowItsWork/Work";
import LatestSurvey from "../LatestSurvey/LatestSurvey";
// import Featured from "./Featured/Featured";

const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <Featured></Featured>
           <LatestSurvey></LatestSurvey>
           <Work></Work>
           <Faq></Faq>
        </div>
    );
};

export default Home;