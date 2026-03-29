import React from "react";
import { Link } from "react-router-dom";

const AllCoursesButton = () => {
  return (
    <div className="flex justify-center mb-40">
      <Link to="/courses">
        <button className="w-80 h-10 rounded-full bg-purple-800 text-white font-medium hover:bg-purple-900">
          Explore Courses
        </button>
      </Link>
    </div>
  );
};

export default AllCoursesButton;