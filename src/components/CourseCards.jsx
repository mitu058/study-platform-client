import personalDevelopmentImg from "../assets/personal development.jpg";
import businessDevelopmentImg from "../assets/business analisis.jpg";
import seoImg from "../assets/google ads.jpg";
import lifestyleImg from "../assets/mental care.jpg";
import technologyImg from "../assets/technology.jpg";
import twitterImg from "../assets/twitter session.jpg"; 
import psychologyImg from "../assets/mental care.jpg";
import consultingImg from "../assets/consulting.jpg";
import businessImg from "../assets/unlimited business.jpg";

const categoryImages = {
  "Personal Development": personalDevelopmentImg,
  "Business Development": businessDevelopmentImg,
  "SEO": seoImg,
  "Lifestyle": lifestyleImg,
  "Technology": technologyImg,
  "Psychology": psychologyImg,
  "Twitter Marketing": twitterImg, 
  "Consulting": consultingImg,
  "Business": businessImg,
};

const CourseCards = () => {
  const courses = [
    {
      rating: "4.5",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      title: "The Complete Digital Marketing Course - 12 Courses in 1",
      category: "Personal Development",
      price: "$140",
    },
    {
      rating: "3.6",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      title: "Fundamentals of Business Analysis",
      category: "Business Development",
      price: "$160",
    },
    {
      rating: "3.8",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      title: "Google Ads Training: Become a PPC Expert",
      category: "SEO",
      price: "$226",
    },
    {
      rating: "4.8",
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
      title: "Behavior, Psychology and Care Training",
      category: "Lifestyle",
      price: "$342",
    },
    {
      rating: "3.6",
      avatar: "https://randomuser.me/api/portraits/men/5.jpg",
      title: "Microsoft Excel - Excel from Beginner to Advanced",
      category: "Technology",
      price: "$245",
    },
    {
      rating: "4",
      avatar: "https://randomuser.me/api/portraits/men/6.jpg",
      title: "Twitter Marketing & Twitter Ads For Beginners",
      category: "Twitter Marketing", 
      price: "$199",
    },
    {
      rating: "4",
      avatar: "https://randomuser.me/api/portraits/women/7.jpg",
      title: "Consulting Approach to Problem Solving",
      category: "Consulting",
      price: "$215",
    },
    {
      rating: "3.5",
      avatar: "https://randomuser.me/api/portraits/men/8.jpg",
      title: "Ultimate Business Intelligence Analyst A to Z Course (Pro)",
      category: "Business",
      price: "$112",
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold">Featured Courses</h2>
        <p className="text-gray-600 text-sm mt-1">
          Explore our top-rated courses designed to boost your skills.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.map((course, index) => (
          <div key={index} className="border rounded-lg shadow-md p-4 bg-white">
            <img
              src={categoryImages[course.category]}
              alt={course.title}
              className="w-full h-40 object-cover rounded-md"
            />
            <div className="mt-3">
              <h3 className="font-semibold text-lg">{course.title}</h3>

              <div className="flex justify-between items-center gap-2 mt-2">
                <span className="text-yellow-500 font-bold">⭐ {course.rating}</span>
                <img
                  src={course.avatar}
                  alt="Instructor"
                  className="w-10 h-10 rounded-full"
                />
              </div>

              <div className="border-t my-3"></div>

              <div className="flex items-center justify-between">
                <span className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-200 rounded-full">
                  {course.category}
                </span>
                <span className="text-lg font-semibold">{course.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseCards;
