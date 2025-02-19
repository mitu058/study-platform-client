import videoUpdate from "../assets/blended-learning.png";
import expertCourse from "../assets/leader.png";
import classProgram from "../assets/software.png";
import highQualityCourses from "../assets/book.png";
import certificate from "../assets/gold-medal.png";
import Learning from "../assets/machine-learning.png";

export default function WhyChooseUs() {
  const features = [
    {
      title: "Discover best classes for the best learning",
      description:
        "Online learning and teaching marketplace with 5K+ courses & 10M students. Taught by experts to help you acquire new skills.",
      image:Learning // No image for the first card
    },
    {
      title: "Occasional Video Update",
      description:
        "Mountains in just switching city steps Might rung line what Was or between towards the have phase.",
      image: videoUpdate,
    },
    {
      title: "Online Course From Experts",
      description:
        "Prisoners And mountains in just switching city steps Might rung line Was or between towards the have phase.",
      image: expertCourse,
    },
    {
      title: "Class Program Options",
      description:
        "Switching city steps Might rung line what Mr Bulk; Was or between towards the have phase.",
      image: classProgram,
    },
    {
      title: "Over 500+ High Quality Courses",
      description:
        "Go he prisoners And mountains in just switching city steps Might.",
      image: highQualityCourses,
    },
    {
      title: "Earn a Certificate of Achievement",
      description:
        "Go he prisoners And mountains in just switching city steps Might.",
      image: certificate,
    },
  ];

  return (
    <section className="py-12 px-4 w-[80%] mx-auto">
      {/* Title and Description */}
      <div className="max-w-5xl mx-auto text-center grid gap-3">
        <h2 className="text-3xl font-bold text-gray-900">
          Why choose our classes
        </h2>
        <p className="text-gray-500">
          Comfort reached gay perhaps chamber his six detract besides add.
          Moonlight newspaper up its enjoyment agreeable depending.
        </p>
      </div>

      {/* Features Grid with First Card as Text */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-gray-100 p-6 rounded-lg space-y-2 shadow"
          >
            {feature.image && (
              <img
                src={feature.image}
                alt={feature.title}
                className="w-14 h-14 object-contain"
              />
            )}
            <h3 className="text-lg font-semibold text-gray-900">
              {feature.title}
            </h3>
            <p className="text-gray-600 mt-1">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
