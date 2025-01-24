import React from "react";
import useSession from "../../hooks/useSession";

const ViweStudySession = () => {
  const [session] = useSession();
  return (
    <div className="grid grid-cols-2 gap-12">

     {
        session.map(item =>  <div key={item._id} className="card bg-base-100 w-96 shadow-xl">
            <figure>
              <img
              className="h-52 w-full"
                src={item.sessionImage}
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{item.title}</h2>
              <p>{item.description}</p>
              <p>Registration Start Date : {item.registrationStartDate}</p>
              <p>Registration End Date : {item.registrationEndDate}</p>
              <p>Class Start Time : {item.classStartTime}</p>
              <p>Class End Time : {item.classEndTime}</p>
              <p>Session Duration : {item.sessionDuration} hours</p> 
              <div className="flex gap-6 mt-4">
                    {/* Fee Badge */}
                    <span className="badge badge-primary px-4 py-3 rounded-lg">
                Fee: {item.registrationFee} BDT
              </span>

              {/* Status Badge */}
              <span
                className={`badge px-4 py-3 rounded-lg ${
                  item.status === "approved"
                    ? "badge-success"
                    : item.status === "pending"
                    ? "badge-warning"
                    : "badge-error"
                }`}
              >
                Status: {item.status}
              </span>  
            </div> 
            </div>
            
          </div>)
     }
    </div>
  );
};

export default ViweStudySession;
