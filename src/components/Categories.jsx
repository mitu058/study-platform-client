import React from 'react';

const Categories = () => {
  const categories = [
    { name: "Data Science", courses: 15, icon: "🧠", color: "bg-blue-50" },
    { name: "IT & Software", courses: 22, icon: "💻", color: "bg-orange-50" },
    { name: "Engineering", courses: 53, icon: "🛠", color: "bg-red-50" },
    { name: "Web Development", courses: 25, icon: "👨‍💻", color: "bg-purple-50" },
    { name: "Finance", courses: 20, icon: "📈", color: "bg-blue-50" },
    { name: "Medical", courses: 10, icon: "🏥", color: "bg-gray-50" },
    { name: "Architecture", courses: 30, icon: "🏛", color: "bg-yellow-50" },
    { name: "Art & Design", courses: 35, icon: "🎨", color: "bg-pink-50" },
    { name: "Photography", courses: 20, icon: "📷", color: "bg-indigo-50" },
    { name: "Music", courses: 10, icon: "🎵", color: "bg-green-50" },
    { name: "Marketing", courses: 30, icon: "📊", color: "bg-teal-50" },
    { name: "Accounting", courses: 35, icon: "💰", color: "bg-blue-50" },
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Choose a Category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cat, index) => (
          <div key={index} className={`p-6 rounded-lg shadow-md text-center ${cat.color}`}>
            <div className="w-16 h-16 mx-auto flex items-center justify-center bg-white rounded-full shadow">
              <span className="text-4xl">{cat.icon}</span>
            </div>
            <h3 className="text-xl font-semibold mt-4">{cat.name}</h3>
            <p className="text-gray-600">{cat.courses} Courses</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
