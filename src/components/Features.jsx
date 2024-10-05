import React, { useState } from 'react'

function Features() {
  const [activeFeature, setActiveFeature] = useState(1);

  const features = [
    {
      title: "Clear Insights",
      description: "Transform raw data into actionable insights with our cutting-edge visualization tools.",
      icon: (
        <svg className="w-8 h-8 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
          <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
        </svg>
      )
    },
    {
      title: "Real-Time Updates",
      description: "Stay ahead of the market with our real-time data processing and visualization.",
      icon: (
        <svg className="w-8 h-8 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
        </svg>
      )
    },
    {
      title: "Customizable Views",
      description: "Tailor your financial dashboard to your specific needs and preferences.",
      icon: (
        <svg className="w-8 h-8 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
        </svg>
      )
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {features.map((feature, index) => (
        <div
          key={index}
          className={`p-6 text-white rounded-lg shadow-lg transition-all duration-300 cursor-pointer
            ${activeFeature === index 
              ? "bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 transform scale-105" 
              : "bg-white bg-opacity-5 transform scale-95"}`}
          onClick={() => setActiveFeature(index)}
        >
          <div className="flex items-center mb-4 text-white">
            {feature.icon}
            <h3 className="text-2xl font-bold">{feature.title}</h3>
          </div>
          <p>{feature.description}</p>
        </div>
      ))}
    </div>
  )
}

export default Features