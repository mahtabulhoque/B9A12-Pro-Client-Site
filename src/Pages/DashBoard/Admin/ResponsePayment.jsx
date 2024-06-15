
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import PaymentResponse from "./PaymentResponse";

const ResponsePayment = () => {
    
    const axiosSecure = useAxiosSecure();
    const {data: payments = []} = useQuery({
        queryKey:['payments'],
        queryFn: async()=>{
          const {data} = await axiosSecure.get('/payments')
          return data;

        }
    })
    return (
        <div>
            {
                payments.map( payment=><PaymentResponse key={payment?._id} payment={payment}>

                </PaymentResponse>)
            }
            
        </div>
    );
};

export default ResponsePayment;