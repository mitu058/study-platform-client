import { useState } from "react";
import faqImage from "../assets/faq.png"; // Replace with your actual image path

const FAQ = () => {
  const faqs = [
    {
      question: "How do I enroll in a course?",
      answer: "To enroll, simply click on the course you want and proceed with the payment. Once completed, you will get immediate access.",
    },
    {
      question: "Are the courses lifetime accessible?",
      answer: "Yes, once you purchase a course, you have lifetime access to it, including future updates.",
    },
    {
      question: "Can I get a refund if I'm not satisfied?",
      answer: "Yes, we offer a 7-day money-back guarantee. If you're not satisfied, you can request a refund within 7 days of purchase.",
    },
    {
      question: "Do I get a certificate after completing a course?",
      answer: "Yes, all courses provide a certificate upon successful completion.",
    },
    {
      question: "Can I access the courses on mobile devices?",
      answer: "Yes, our platform is mobile-friendly, and you can access your courses from any device.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto p-6">
         <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
      <div className="flex flex-col md:flex-row items-center justify-evenly gap-10">
        {/* Left Side - Image */}
        <div className="w-full md:w-1/2">
          <img src={faqImage} alt="FAQ" className="w-2/3 h-auto rounded-lg" />
        </div>

        {/* Right Side - FAQ Section */}
        <div className="w-full md:w-1/2">
         
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b pb-3">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left font-medium flex justify-between items-center"
                >
                  {faq.question}
                  <span className="text-xl">{openIndex === index ? "−" : "+"}</span>
                </button>
                {openIndex === index && <p className="mt-2 text-gray-600">{faq.answer}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
