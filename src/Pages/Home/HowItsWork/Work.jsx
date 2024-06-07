import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import image from "../../../../public/4.jpg";
import { Link } from "react-router-dom";

const Work = () => {
  return (
    <section className="p-8">
      <SectionTitle heading="How it Works" />
      <div
        className="bg-cover bg-fixed bg-center rounded-lg"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="bg-opacity-30 p-8 rounded-lg">
          <div className="container mx-auto text-center">
            <p className="mb-8 text-lg text-white">
              Our survey process is designed to be simple and user-friendly.
              Follow these steps to complete your survey and share your
              opinions.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card shadow-lg p-4 bg-base-100">
                <div className="card-body">
                  <div className="card-title">
                    <span className="text-4xl">1</span>
                  </div>
                  <h3 className="text-2xl font-bold">Sign Up</h3>
                  <p>Create an account using your email or social media.</p>
                </div>
              </div>

              <div className="card shadow-lg p-4 bg-base-100">
                <div className="card-body">
                  <div className="card-title">
                    <span className="text-4xl">2</span>
                  </div>
                  <h3 className="text-2xl font-bold">Choose a Survey</h3>
                  <p>
                    Select from a variety of surveys that match your interests.
                  </p>
                </div>
              </div>

              <div className="card shadow-lg p-4 bg-base-100">
                <div className="card-body">
                  <div className="card-title">
                    <span className="text-4xl">3</span>
                  </div>
                  <h3 className="text-2xl font-bold">Complete & Submit</h3>
                  <p>Answer the questions and submit your responses.</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Link to='/register'>
              <button className="btn">Get Started</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;
