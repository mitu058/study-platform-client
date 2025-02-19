import contactImage from "../assets/message.svg";

const ContactUs = () => {
  return (
    <div className="container mx-auto py-12 px-6 md:px-16 ">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          We're here to help!
        </h1>
      </div>

      {/* Contact Info Section */}
      <div className="grid md:grid-cols-3 gap-8 mt-10">
        <div className="bg-white space-y-2  p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">Customer Support</h2>
          <p>Dhaka HQ, Bangladesh</p>
          <p>📞 (880) 1234-567890</p>
          <p>✉ example@email.com</p>
        </div>
        <div className="bg-white space-y-2 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">Contact Address</h2>
          <p>Banani, Dhaka, Bangladesh</p>
          <p>📞 (880) 9876-543210</p>
          <p>✉ example@email.com</p>
        </div>
        <div className="bg-white space-y-2 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">Main Office Address</h2>
          <p>Gulshan, Dhaka, Bangladesh</p>
          <p>📞 (880) 1122-334455</p>
          <p>✉ example@email.com</p>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="mt-16 flex flex-col md:flex-row items-center gap-12">
        <img
          src={contactImage}
          alt="Contact Us"
          className="w-full md:w-1/2 rounded-lg"
        />
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-800">Let's Talk</h2>
          <p className="text-gray-600 mt-2">
            To request a quote or schedule a meeting, contact us directly or
            fill out the form below.
          </p>
          <form className="mt-6 space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 bg-gray-50 border rounded-md"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-3 bg-gray-50 border rounded-md"
            />
            <textarea
              placeholder="Your Message"
              className="w-full p-3 bg-gray-50 border rounded-md h-32"
            />
            <button className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold">
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Google Map Section */}
      <div className="mt-12">
        <iframe
          title="Google Map Location"
          className="w-full h-96 rounded-lg"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.9023850999967!2d90.39152487526294!3d23.75089518867921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755bf5c2d43f52b%3A0x7af567e2efc24444!2sGulshan%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1708352910863!5m2!1sen!2sbd"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactUs;
