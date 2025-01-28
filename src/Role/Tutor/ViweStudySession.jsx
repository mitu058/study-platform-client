import React from "react";
import useSession from "../../hooks/useSession";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";

import useAxiosPublic from "../../hooks/useAxiosPublic";

const ViweStudySession = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const { data: tutorSession = [] } = useQuery({
    queryKey: ["tutorSession", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/session/${user?.email}`);
      return res.data;
    },
  });
  // console.log(tutorSession);
  return (
   <div className="my-2">
   <div className="text-center pb-16">
   <h2 className="text-xl pb-2 font-bold">Your created Study Session</h2>
   <p className="font-semibold text-base">I will cover key concepts, answer questions, and guide you through practical examples <br /> to ensure a comprehensive understanding.</p>
   </div>
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 ">
      {tutorSession.length === 0 ? (
        <p className="font-bold">You have not created any session yet.</p>
      ) : (
        tutorSession.map((item) => (
          <div key={item._id} className="card  bg-base-100 lg:w-96 shadow-xl">
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
          </div>
        ))
      )}
    </div>
   </div>
  );
};

export default ViweStudySession;
