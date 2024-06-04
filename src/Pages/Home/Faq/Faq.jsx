
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const Faq = () => {
    return (
        <section className="p-8 bg-base-200 my-8">
            <SectionTitle heading="FAQs" />

            <div className="container mx-auto">
                <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box my-2">
                    <input type="checkbox" />
                    <div className="collapse-title text-xl font-medium">
                        What is DaisyUI?
                    </div>
                    <div className="collapse-content">
                        <p>DaisyUI is a Tailwind CSS component library that makes it easier to use Tailwind by providing pre-designed components.</p>
                    </div>
                </div>

                <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box my-2">
                    <input type="checkbox" />
                    <div className="collapse-title text-xl font-medium">
                        How do I install DaisyUI?
                    </div>
                    <div className="collapse-content">
                        <p>You can install DaisyUI using npm or yarn. For example, run <code>npm install daisyui</code>.</p>
                    </div>
                </div>

                <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box my-2">
                    <input type="checkbox" />
                    <div className="collapse-title text-xl font-medium">
                        Can I customize DaisyUI components?
                    </div>
                    <div className="collapse-content">
                        <p>Yes, you can customize DaisyUI components using Tailwinds utility classes and by overriding the default theme in the Tailwind configuration file.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Faq;
