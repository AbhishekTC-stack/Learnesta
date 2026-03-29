import React from "react";

export default function CourseCard({ title, instructor, price, image }) {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">

      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h3 className="text-lg font-bold">{title}</h3>

        <p className="text-gray-600">
          Instructor: {instructor}
        </p>

        <p className="text-purple-700 font-semibold mt-2">
          ₹{price}
        </p>

        <button className="mt-3 bg-purple-600 text-white px-4 py-2 rounded">
          View Course
        </button>
      </div>

    </div>
  );
}