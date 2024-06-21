import {  useContext, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useMutation } from '@tanstack/react-query';
import { AuthContext } from '../../Providers/AuthProvider';
import Swal from 'sweetalert2';

const UserTable = ({ user, refetch }) => {
 
  const axiosSecure = useAxiosSecure();
  const { user:loggedInUser } = useContext(AuthContext);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const { mutateAsync } = useMutation({
    mutationFn: async (updatedUser) => {
      try {
        const { data } = await axiosSecure.patch(`/users/update/${user.email}`, updatedUser);
        return data;
      } catch (error) {
        console.error('Error in mutation function:', error);
        throw error; // Re-throw the error so it can be caught by the onError handler
      }
    },
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.error('Error updating user role:', error);
    },
  });

  const handleRoleChange = async (newRole) => {
    if(loggedInUser.email === user.email){
      Swal.fire("Action Not Allowed!"); 
      return setDropdownVisible(false)
    }
    console.log(`Change role of user ${user._id} to ${newRole}`);
    const updatedUser = {
      role: newRole,
      status: 'verified',
    };

    try {
      const data = await mutateAsync(updatedUser);
      console.log('Role updated successfully:', data);
    } catch (error) {
      console.error('Error updating user role:', error);
    }

    setDropdownVisible(false);
  };

  return (
    
    <tr>
    <td>{user.email}</td>
    <td>{user.role || 'N/A'}</td>
    <td>{user.status || 'N/A'}</td>
    <td className="relative">
      <button
        onClick={() => setDropdownVisible(!dropdownVisible)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Change Role
      </button>
      {dropdownVisible && (
        <div className="absolute bg-white border border-gray-300 rounded-md mt-2 shadow-lg z-10">
          <ul className="list-none p-2">
            {['Admin', 'User', 'Surveyor', 'Pro-User'].map((role) => (
              <li
                key={role}
                onClick={() => handleRoleChange(role)}
                className="px-4 py-2 cursor-pointer hover:bg-gray-200"
              >
                {role}
              </li>
            ))}
          </ul>
        </div>
      )}
    </td>
  </tr>
  );
};

export default UserTable;
