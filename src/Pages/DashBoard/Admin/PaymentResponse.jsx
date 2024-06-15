


const PaymentResponse = ({ payment }) => {
  const { email, price, transactionId } = payment;
  console.log(payment);

  return (
    <div>
     
      
      <div className="overflow-x-auto mt-4">
        <table className="table min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr className="bg-base-200">
           
              <td className="px-6 py-4 whitespace-nowrap">{email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{price}</td>
              <td className="px-6 py-4 whitespace-nowrap">{transactionId}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentResponse;
