import useAuth from "../../hooks/useAuth";

const CreateStudySession = () => {
  const { user } = useAuth(); // Assuming `user` contains logged-in user info
    const handleSubmit = (e) => {
      e.preventDefault();
      const form = e.target;
      const newSession = {
        title: form.title.value,
        tutorName: user.displayName,
        tutorEmail: user.email,
        description: form.description.value,
        registrationStartDate: form.registrationStartDate.value,
        registrationEndDate: form.registrationEndDate.value,
        classStartDate: form.classStartDate.value,
        classEndDate: form.classEndDate.value,
        sessionDuration: form.sessionDuration.value,
        registrationFee: 0,
        status: "pending",
      };
      console.log("New Study Session:", newSession);
      // Add API call or further processing here
    };

  return (
    <div className="flex justify-center px-4 py-8">
      <form onSubmit={handleSubmit} className="w-full max-w-5xl bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Create Study Session
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
              value={user?.displayName || ""}
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
              value={user?.email || ""}
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
              value="0"
              readOnly
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
              type="date"
              id="classStartDate"
              name="classStartDate"
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
              type="date"
              id="classEndDate"
              name="classEndDate"
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
              value="Pending"
              readOnly
              className="w-full px-3 py-2 border rounded-md bg-gray-100"
            />
          </div>
        </div>
        <div className="mt-6 text-center">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Create Session
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateStudySession;
