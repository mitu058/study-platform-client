import mission from "../assets/mission.webp";
import interactive from "../assets/Study-Group-web.jpeg";
import student from "../assets/student.jpg";

const About = () => {
  return (
    <div className="container mx-auto py-12 px-6 md:px-16">
      <div className="max-w-4xl mx-auto text-center">
        {/* <h1 className="text-3xl md:text-4xl font-bold text-gray-800">About Us</h1> */}
        <p className="text-lg text-gray-600 mt-4">
          Welcome to{" "}
          <span className="font-semibold text-blue-600">SkillStack</span>, a platform dedicated to enhancing education through innovation and engagement. We believe in empowering learners by fostering creativity, curiosity, and problem-solving skills.
        </p>
      </div>

      {/* Mission Section */}
      <div className="mt-10 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Our Mission</h2>
          <p className="text-gray-600 mt-3">
            At SkillStack, we strive to create an engaging learning environment where students can explore new ideas, enhance critical thinking, and develop essential skills for the future. Through interactive resources, expert guidance, and a supportive community, we empower students to grow, innovate, and succeed in their academic and professional journeys.
          </p>
        </div>
        <img src={mission} alt="Our Mission" className="rounded-lg shadow-lg object-cover object-center" />
      </div>

      {/* Offer Section */}
      <div className="mt-10 grid md:grid-cols-2 gap-8 items-center">
        <img src={interactive} alt="Interactive Learning" className="rounded-lg shadow-lg object-cover object-center" />
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">What We Offer</h2>
          <ul className="mt-3 text-gray-600 space-y-2">
            <li>✅ <strong>Interactive Learning</strong> – Engage with modern digital tools and creative content.</li>
            <li>✅ <strong>Collaborative Environment</strong> – Learn with peers, share knowledge, and grow together.</li>
            <li>✅ <strong>Innovative Approach</strong> – Education designed to be fun, inspiring, and effective.</li>
          </ul>
        </div>
      </div>
<h2 className="text-4xl font-bold text-center pt-16 pb-4">About SkillStack Portal</h2>
      {/* Statistics Section */}
      <div className="mt-10 grid md:grid-cols-2 ">
        <img src={student} alt="Happy Students" className="rounded-lg shadow-lg object-cover object-center w-5/6 " />
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            35,000+ happy students joined with us to achieve their goals
          </h2>
          <p className="text-gray-600 mt-3">
          Over 35,000 students have embarked on their learning journey with us, gaining valuable skills and knowledge to achieve their goals. Through interactive lessons, expert guidance, and a supportive community, we empower learners to grow, excel, and turn their aspirations into reality.
          </p>
          <ul className="mt-3 text-gray-600 space-y-2">
            <li>✅ Setup and installation takes less time</li>
            <li>✅ Professional and easy-to-use software</li>
            <li>✅ Perfect for any device with pixel-perfect design</li>
            <li>✅ Setup and installation too fast</li>
          </ul>

          {/* Progress Bars */}
          <div className="mt-6 space-y-4">
            <div>
              <span className="font-semibold">Enterprise customer - 85%</span>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full w-[85%]"></div>
              </div>
            </div>
            <div>
              <span className="font-semibold">Accurate Course - 90%</span>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full w-[90%]"></div>
              </div>
            </div>
            <div>
              <span className="font-semibold">Languages - 75%</span>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full w-[75%]"></div>
              </div>
            </div>
            <div>
              <span className="font-semibold">Instructors - 95%</span>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full w-[95%]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
