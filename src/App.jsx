import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/student/Home';
import CourseList from './pages/student/CourseList';
import CourseDetails from './pages/student/CourseDetails';
import MyEnrollments from './pages/student/MyEnrollments';
import Player from './pages/student/Player';
import Loading from './components/student/Loading';
import Educator from './pages/educator/Educator';
import Dashboard from './pages/educator/Dashboard';
import AddCourse from './pages/educator/AddCourse';
import MyCourses from './pages/educator/MyCourses';
import StudentsEnrolled from './pages/educator/StudentsEnrolled';
import NavBar from './components/student/NavBar';
import QuizManager from './components/student/QuizManager';
import Quiz from './components/student/Quiz';
import Quizzes from './components/student/Quizzes';

const App = () => {
  const location = useLocation();
  const educatorRoutes = ['/educator', '/educator/dashboard', '/educator/add-course', '/educator/my-courses', '/educator/students-enrolled'];

  return (
    <div className='text-default min-h-screen bg-white'>
      {!educatorRoutes.includes(location.pathname) && <NavBar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/course-list' element={<CourseList />} />
        <Route path='/course/:id' element={<CourseDetails />} />
        <Route path='/my-enrollments' element={<MyEnrollments />} />
        <Route path='/player/:courseId' element={<Player />} />
        <Route path='/loading/:path' element={<Loading />} />
        <Route path='/educator' element={<Educator />} />
        <Route path='/educator/dashboard' element={<Dashboard />} />
        <Route path='/educator/add-course' element={<AddCourse />} />
        <Route path='/educator/my-courses' element={<MyCourses />} />
        <Route path='/educator/students-enrolled' element={<StudentsEnrolled />} />
        
        {/* Add Quiz Management Routes */}
        <Route path='/quiz-manager' element={<QuizManager />} />
        <Route path='/quizzes' element={<Quizzes />} />
      </Routes>
    </div>
  );
};

export default App;