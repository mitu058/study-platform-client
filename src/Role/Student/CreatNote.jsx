import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const CreateNote = () => {
 const {user} = useAuth()
 const axiosPublic = useAxiosPublic() 

  const handleSubmit = async(e) => {
    e.preventDefault();
    const form = e.target
    const title = form.title.value;
    const description = form.description.value;
    const studentEmail = user?.email
    
    const formdata = {title, description,studentEmail}

const {data} = await axiosPublic.post('/note',formdata)
if(data.insertedId){
    Swal.fire({
      title: "Success",
      text: "Note created successfully!",
      icon: "success",
      confirmButtonText: "Ok",
    }).then(() => {
      form.reset();
    });
  }else{
    throw new Error("Failed to create note.")
  
}
   
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Create Note</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Student Email</label>
          <input
            type="email"
            value={user?.email}
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 cursor-not-allowed"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Note Title</label>
          <input
            type="text"
           name='title'
            placeholder="Enter title"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Note Description</label>
          <textarea
          name='description'
            placeholder="Enter description"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            rows="5"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Create Note
        </button>
      </form>
    </div>
  );
};

export default CreateNote;
