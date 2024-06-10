import React, { useState } from 'react';

const UserTable = ({ user, refetch }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleRoleChange = (newRole) => {
    // Implement the logic to update the user's role, e.g., make an API call
    console.log(`Change role of user ${user._id} to ${newRole}`);
    // After updating the role, refetch the data
    refetch();
    // Hide the dropdown
    setDropdownVisible(false);
  };

  return (
    <tr>
      <th>{user._id}</th>
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
              {['Admin', 'User', 'Surveyor', 'Pro User'].map((role) => (
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
