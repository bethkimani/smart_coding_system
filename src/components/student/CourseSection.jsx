import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import CourseCard from './CourseCard';

const CourseSection = () => {
  const { allCourses } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Handle loading and error states
  useEffect(() => {
    if (!allCourses) {
      setError("Failed to fetch courses");
    } else {
      setError(null);
    }
    setLoading(false);
  }, [allCourses]);

  // Function to handle scroll reset
  const handleShowAllCourses = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='py-16 md:px-40 px-8'>
      <h2 className='text-3xl font-medium text-gray-800'>Learn from the best</h2>
      <p className='text-sm md:text-base text-gray-500 mt-3'>
        Discover our top-rated courses across various categories. From coding and design to business and wellness, our courses are crafted to deliver results.
      </p>

      {/* Show loading state */}
      {loading && <p>Loading courses...</p>}

      {/* Show error message if API call fails */}
      {error && <p className='text-red-500'>{error}</p>}

      {!loading && !error && (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 my-10 px-4 md:px-0'>
          {allCourses.slice(0, 4).map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
      )}

      <Link
        to='/course-list'
        onClick={handleShowAllCourses}
        className='text-gray-500 border border-gray-500/30 px-10 py-3 rounded'
      >
        Show all courses
      </Link>
    </div>
  );
};

export default CourseSection;
