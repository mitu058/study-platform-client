import React from 'react';
import useRole from '../../hooks/useRole';
import { FaRegEdit } from 'react-icons/fa';

const ViewAllUser = () => {
const [user] = useRole()
console.log('this user found', user)
    return (
       
            <div className="my-10">
        {user.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="lg:w-full mx-auto shadow-xl border border-gray-100">
              <thead>
                <tr className="bg-gray-100 ">
                <th className="py-3 px-6 text-start border-b">SL</th>
                  <th className="py-3 px-6 text-center border-b">Image</th>
                  <th className="py-3 px-6 text-start border-b">Role</th>
                  <th className="py-3 px-6 text-start border-b">Email</th>
                  <th className="py-3 px-6 text-center border-b">Update Role</th>
                </tr>
              </thead>
              <tbody>
                {user.map((item,index) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                     <td className="py-4 px-6 text-start border-b">
                      {index + 1}
                    </td>
                    <td className="py-4 px-6 text-center border-b">
                      <img
                        src={item.photo}
                        alt={item.name}
                        className="w-12 h-12 rounded-full mx-auto"
                      />
                    </td>
                    <td className="py-4 px-6 text-start border-b">
                      {item.role}
                    </td>
                    <td className="py-4 px-6 text-start border-b">
                      {item.email}
                    </td>
                    <td className="py-4 px-4  text-center border-b">
                       <div className='flex space-x-3 justify-center items-center'>
                       <button
                         
                         className="hover:text-blue-600 flex space-x-1 justify-center items-center bg-blue-200 rounded-lg btn btn-sm"
                       >
                         <FaRegEdit />
                         <h2>Update</h2>
                       </button>
                       
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center min-h-screen mt-10">
            <p className="text-xl font-semibold">
              No User Available
            </p>
          
          </div>
        )}
      </div>
        
    );
};

export default ViewAllUser;
