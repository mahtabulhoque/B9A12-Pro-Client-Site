import  { useState } from 'react';
import SectionTitle from '../../Components/SectionTitle/SectionTitle';
import { Link } from 'react-router-dom';

const Pricing = () => {
    const [paymentCompleted, setPaymentCompleted] = useState(false);

    // Function to handle payment completion
    const handlePaymentCompletion = () => {
        // Perform any actions needed after successful payment (e.g., setPaymentCompleted(true))
        setPaymentCompleted(true);
    };

    return (
        <div className="text-center">
            <SectionTitle heading={"Become A Pro-User"} />
            <div className="card mx-auto my-4" style={{ maxWidth: '400px' }}>
                <div className="card-body">
                    <h5 className="card-title">Pro Membership</h5>
                    <p className="card-text">Unlock exclusive features!</p>
                    <h6 className="card-subtitle mb-2 text-muted">Price: $99.99/year</h6>
                    {!paymentCompleted ? (
                        <Link to='/pay' className="btn btn-primary" onClick={handlePaymentCompletion}>
                            Pay Now
                        </Link>
                    ) : (
                        <button className="btn btn-primary" disabled>
                            Payment Completed
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Pricing;
