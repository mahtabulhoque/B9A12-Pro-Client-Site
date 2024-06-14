
import SectionTitle from '../../Components/SectionTitle/SectionTitle';

import { Link } from 'react-router-dom';

const Pricing = () => {
    return (
        <div className="text-center">
            <SectionTitle heading={"Become A Pro-User"} />
            <div className="card mx-auto my-4" style={{ maxWidth: '400px' }}>
                
                <div className="card-body">
                    <h5 className="card-title">Pro Membership</h5>
                    <p className="card-text">Unlock exclusive features!</p>
                    <h6 className="card-subtitle mb-2 text-muted">Price: $99.99/year</h6>
                    <Link to='/pay' className="btn btn-primary">Pay Now</Link>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
