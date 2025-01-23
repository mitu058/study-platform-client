import Swal from "sweetalert2";

import useAxiosPublic from "../../hooks/useAxiosPublic";

import { useLoaderData } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateSession = () => {
  const axiosPublic = useAxiosPublic();
  // const {user} = useAuth()
 const session = useLoaderData()
 console.log('updet session', session);
 
  const {     
    title,
    tutorEmail,
    tutorName,
    description,
    registrationStartDate,
    registrationEndDate,
    classStartTime,
    classEndTime,
    sessionDuration,
    sessionImage,
    status,
    registrationFee,
    _id
    
   } = session;

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = e.target;
      const imageFile = new FormData();
      const selectedFile = form.sessionImage.files[0];

      if (!selectedFile) {
        throw new Error("Please select an image file for the session.");
      }

      imageFile.append("image", selectedFile);

      // Upload image to imgbb
      const imageRes = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      if (!imageRes.data.success) {
        throw new Error("Image upload failed.");
      }

      const updatedSession = {
        title: form.title.value,
        tutorName: tutorName,
        tutorEmail: tutorEmail,
        description: form.description.value,
        registrationStartDate: form.registrationStartDate.value,
        registrationEndDate: form.registrationEndDate.value,
        classStartTime: form.classStartTime.value,
        classEndTime: form.classEndTime.value,
        sessionDuration: form.sessionDuration.value,
        sessionImage: imageRes.data.data.display_url,
       
      };

      // Update session data
      const sessionRes = await axiosPublic.put(
        `/update-session/${_id}`,
        updatedSession
      );
      if (sessionRes.data.modifiedCount) {
        Swal.fire({
          title: "Success!",
          text: "Study session updated successfully!",
          icon: "success",
          confirmButtonText: "Ok",
        }).then(() => {
          form.reset();
        });
      } else {
        throw new Error("Failed to update session.");
      }
    } catch (err) {
      console.error("Error:", err);
      Swal.fire({
        title: "Error!",
        text:
          err.message ||
          "Failed to update the study session. Please try again.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <div className="flex justify-center px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-5xl bg-white p-8 shadow-lg rounded-lg"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">
        Update Study Session
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Session Title */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="title">
              Session Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={title}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter session title"
              required
            />
          </div>
          {/* Tutor Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Tutor Name</label>
            <input
              type="text"
              
             defaultValue={tutorName}
              readOnly
              className="w-full px-3 py-2 border rounded-md bg-gray-100"
            />
          </div>
          {/* Tutor Email */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Tutor Email
            </label>
            <input
              type="email"
             
             defaultValue={tutorEmail}
              readOnly
              className="w-full px-3 py-2 border rounded-md bg-gray-100"
            />
          </div>
          {/* Session Description */}
          <div className="col-span-1 md:col-span-3">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="description"
            >
              Session Description
            </label>
            <textarea
              id="description"
              name="description"
              defaultValue={description}
              rows="4"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter session description"
              required
            ></textarea>
          </div>
          {/* Registration Start Date */}
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="registrationStartDate"
            >
              Registration Start Date
            </label>
            <input
              type="date"
              id="registrationStartDate"
              name="registrationStartDate"
              defaultValue={registrationStartDate}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          {/* Registration End Date */}
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="registrationEndDate"
            >
              Registration End Date
            </label>
            <input
              type="date"
              id="registrationEndDate"
              name="registrationEndDate"
              defaultValue={registrationEndDate}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          {/* Registration Fee */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Registration Fee
            </label>
            <input
              type="number"
             
              defaultValue={registrationFee}
              className="w-full px-3 py-2 border rounded-md bg-gray-100"
            />
          </div>
          {/* Class Start Date */}
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="classStartDate"
            >
              Class Start Date
            </label>
            <input
              type="time"
              id="classStartTime"
              name="classStartTime"
              defaultValue={classStartTime}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          {/* Class End Date */}
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="classEndDate"
            >
              Class End Date
            </label>
            <input
              type="time"
              id="classEndDate"
              name="classEndTime"
              defaultValue={classEndTime}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          {/* Session Duration */}
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="sessionDuration"
            >
              Session Duration (in hours)
            </label>
            <input
              type="number"
              id="sessionDuration"
              name="sessionDuration"
              defaultValue={sessionDuration}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter duration"
              required
            />
          </div>
          {/* Status */}
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <input
              type="text"
              
              defaultValue={status}
             
              className="w-full px-3 py-2 border rounded-md bg-gray-100"
            />
          </div>
          {/* Session Image */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Session Image
            </label>
            <input
              type="file"
              name="sessionImage"
             
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
        </div>
        <div className="mt-6 text-center">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Update Session
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateSession;
