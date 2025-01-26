import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Form = ({ id }) => {
  const [session, setSession] = useState({});
  const [clientSecret, setClientSecret] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const axiosPublic = useAxiosPublic();

  const {
    sessionImage,
    description,
    tutorName,
    tutorEmail,
    _id,
    registrationFee,
    classStartTime,
    classEndTime,
    sessionDuration,
    title,
   
  } = session;

  useEffect(() => {
    const fetchSessionDetails = async () => {
      try {
        const { data } = await axiosPublic.get(`/session/${id}`);
        setSession(data);
      } catch (error) {
        console.error("Error fetching session details:", error);
      }
    };

    fetchSessionDetails();
  }, [id, axiosPublic]);

  useEffect(() => {
    if (session?.registrationFee) {
      axiosPublic
        .post("/stripe-payment", { price: session.registrationFee })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch((error) =>
          console.error("Error fetching client secret:", error)
        );
    }
  }, [session.registrationFee, axiosPublic]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      Swal.fire("Error", "Stripe is not initialized.", "error");
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      Swal.fire("Error", "Card details are required.", "error");
      return;
    }

    setIsProcessing(true); // Show loader or disable the button

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setIsProcessing(false);
      Swal.fire("Error", error.message, "error");
      return;
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card,
          billing_details: {
            email: user?.email || "default@example.com",
            name: user?.displayName || "Anonymous",
          },
        },
      }
    );

    if (confirmError) {
      setIsProcessing(false);
      Swal.fire("Error", confirmError.message, "error");
      return;
    }

    if (paymentIntent.status === "succeeded") {
      // Show payment success alert
      Swal.fire({
        title: "Payment Successful",
        text: "Your payment was processed successfully!",
        icon: "success",
      }).then(async () => {
        // Proceed to book the session after payment success alert
        const bookData = {
          sessionId: _id,
          studentName: user?.displayName,
          studentEmail: user?.email,
          registrationFee,
          classStartTime,
          classEndTime,
          sessionDuration,
          tutorName,
          tutorEmail,
          title,
          description,
          sessionImage
        };

        try {
          const { data } = await axiosPublic.post("/book-session", bookData);
          if (data.insertedId) {
            Swal.fire({
              title: "Session Booked",
              text: "Your session has been booked successfully!",
              icon: "success",
              confirmButtonText: "OK",
            });
          }
        } catch (error) {
          console.error("Error booking session:", error);
        } finally {
          setIsProcessing(false);
        }
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-48 p-6 bg-white rounded-lg shadow-md">
      <div className="text-center mb-8 space-y-1">
        <h2 className="text-2xl font-semibold">Payment Information</h2>
        <p>Title: {title}</p>
        <p>Registration Fee: {registrationFee} </p>
      </div>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label htmlFor="card" className="block text-gray-700 font-medium">
            Credit Card Information
          </label>
          <CardElement
            options={{
              style: {
                base: {
                  iconColor: "#c4f0ff",
                  color: "#333",
                  fontSize: "16px",
                  fontFamily: "Arial, sans-serif",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  iconColor: "#FFC7EE",
                  color: "#FFC7EE",
                },
              },
            }}
          />
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            disabled={!stripe || !clientSecret || isProcessing}
          >
            {isProcessing ? "Processing..." : "Pay Now"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
