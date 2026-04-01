import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";

const CourseGrid = ({ isHome = false }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const courseList = isHome ? courses.slice(0, 3) : courses;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/getAllCourses", {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch courses");

        const data = await res.json();
        // Backend returns array directly from /api/getAllCourses
        setCourses(Array.isArray(data) ? data : data.courses || []);

      } catch (err) {
        console.error(err);
        setError("Could not load courses. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <>
      <h1 className="flex flex-col items-center font-bold text-2xl md:text-4xl text-purple-800 pt-10">
        {isHome ? "Top Courses" : "All Courses"}
      </h1>

      {loading ? (
        <p className="text-center mt-10 text-gray-500">Loading courses...</p>
      ) : error ? (
        <p className="text-center mt-10 text-red-500">{error}</p>
      ) : courses.length === 0 ? (
        <p className="text-center mt-10 text-gray-500">No courses available yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mx-5 my-10">
          {courseList.map((course) => (
            <CourseCard
              key={course._id}
              title={course.CourseTitle}
              instructor={course.CourseType}
              price={course.Price}
              image={course.Image || ""}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default CourseGrid;
