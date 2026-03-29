import React from "react";
import { Link } from "react-router-dom";
import heroImage from "../assets/images/hero.png";
import bannerImage from "../assets/images/learnesta-banner.jpg";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">

      {/* HERO SECTION */}
      <section className="hero bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center px-6">

          {/* LEFT CONTENT */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Learn At Your Own Pace With Expert Study Materials
            </h1>

            <p className="text-gray-600 mb-6">
              Access structured study materials, complete activities, and earn
              certificates. Build your skills with Learnesta's task-based
              learning platform.
            </p>

            <Link
              to="/courses"
              className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition"
            >
              Explore Courses
            </Link>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex-1 mt-10 md:mt-0">
            <img
              src={heroImage}
              alt="Hero"
              className="w-full max-w-md mx-auto"
            />
          </div>

        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features py-16 bg-white">
        <div className="max-w-6xl mx-auto text-center px-6">

          <h2 className="text-3xl font-bold text-center mt-20 mb-8">
            Why Choose Learnesta?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="p-6 shadow rounded-lg">
              <h2 className="text-xl font-semibold mb-2"> Study Materials</h2>
              <p className="text-gray-600">
                Access detailed text-based study materials crafted by expert
                instructors for every course.
              </p>
            </div>

            <div className="p-6 shadow rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Activity Based Learning</h2>
              <p className="text-gray-600">
                Learn by doing — complete tasks and activities assigned for
                each course to strengthen your understanding.
              </p>
            </div>

            <div className="p-6 shadow rounded-lg">
              <h2 className="text-xl font-semibold mb-2"> Certification</h2>
              <p className="text-gray-600">
                Earn certificates after completing courses to showcase your
                skills and boost your career.
              </p>
            </div>

          </div>

          <div className="my-16 flex justify-center">
            <img
              src={bannerImage}
              alt="Learnesta learning"
              className="w-3/4 rounded-xl shadow-lg"
            />
          </div>

          <h1 className="text-4xl font-bold">
  Learn Smarter with Learnesta
</h1>

<p className="mt-4 text-gray-600">
  Explore high-quality courses in Web Development, UI/UX Design, Data Science and more.
</p>

<p className="mt-2 text-gray-500">
  Learn at your own pace and unlock your full potential.
</p>

        </div>
      </section>

    </div>
  );
};

export default Home;
