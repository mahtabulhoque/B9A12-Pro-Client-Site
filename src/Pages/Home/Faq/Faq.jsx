
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const Faq = () => {
    return (
        <section className="my-8">
            <SectionTitle heading="FAQs" />

            <div className="container p-8 bg-base-200 mx-auto rounded-xl">
                <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box my-2">
                    <input type="checkbox" />
                    <div className="collapse-title text-xl font-medium">
                        What is Survey?
                    </div>
                    <div className="collapse-content">
                        <p>A survey is a research method used for collecting data from a predefined group of respondents to gain information and insights on various topics of interest. Surveys are widely used across different fields such as social science, marketing, health, and education to gather information about opinions, behaviors, preferences, or factual information.</p>
                    </div>
                </div>

                <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box my-2">
                    <input type="checkbox" />
                    <div className="collapse-title text-xl font-medium">
                        How to create a survey?
                    </div>
                    <div className="collapse-content">
                        <p>Conduct a pilot test with a small group to identify any issues. Share the survey link through email, social media, or other channels. Share the survey link through email, social media, or other channels.</p>
                    </div>
                </div>

                <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box my-2">
                    <input type="checkbox" />
                    <div className="collapse-title text-xl font-medium">
                       Our Goal
                    </div>
                    <div className="collapse-content">
                        <p>Our survey website aims to empower users with easy-to-use tools for creating, distributing, and analyzing surveys. Whether you are gathering customer feedback, conducting market research, or measuring employee satisfaction, our platform provides comprehensive features to help you gain valuable insights quickly and efficiently. With customizable templates, real-time analytics, and secure data handling, we strive to make data-driven decision-making accessible to everyone.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Faq;
