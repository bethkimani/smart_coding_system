import React, { useContext, useState } from 'react';
import logo from '../../assets/logo.svg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

const NavBar = () => {
    const { navigate, isEducator } = useContext(AppContext);
    const location = useLocation();
    const isCourseListPage = location.pathname.includes('/course-list');

    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formVisible, setFormVisible] = useState(false);
    const [message, setMessage] = useState('');

    const closeModal = () => {
        setFormVisible(false);
        setEmail('');
        setPassword('');
        setMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isLogin ? 'http://127.0.0.1:5000/login' : 'http://127.0.0.1:5000/register';

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                if (isLogin) {
                    localStorage.setItem('token', data.access_token);
                    navigate('/quizzes');  // Redirect to quizzes page
                } else {
                    setMessage('Successfully registered! You can now log in.');
                    setIsLogin(true); // Switch to login state after registration
                }
                closeModal(); // Close the modal after success
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            console.error('Network error:', error);
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${isCourseListPage ? 'bg-white' : 'bg-cyan-100/70'}`}>
            <img onClick={() => navigate('/')} src={logo} alt="Logo" className='w-28 lg:w-32 cursor-pointer' />

            <div className='flex ml-auto items-center gap-5 text-lg text-gray-500'>
                <div className='flex items-center gap-5'>
                    {isEducator ? (
                        <>
                            <Link to='/educator' className='hover:text-blue-600'>Educator Dashboard</Link>
                            <Link to='/my-enrollments' className='hover:text-blue-600'>My Enrollments</Link>
                        </>
                    ) : (
                        <>
                            <Link to='/my-enrollments' className='hover:text-blue-600'>My Enrollments</Link>
                        </>
                    )}
                </div>

                <button onClick={() => { setIsLogin(true); setFormVisible(true); }} className='bg-blue-600 text-white px-4 py-2 rounded-full'>
                    Login
                </button>
                <button onClick={() => { setIsLogin(false); setFormVisible(true); }} className='bg-blue-600 text-white px-4 py-2 rounded-full'>
                    Register
                </button>
            </div>

            {formVisible && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                    <div className='bg-white shadow-md rounded-lg p-5 w-80'>
                        <h2 className='text-xl mb-4'>{isLogin ? 'Login' : 'Register'}</h2>
                        {message && <p className='text-red-500'>{message}</p>}
                        <form onSubmit={handleSubmit}>
                            <input
                                type='email'
                                placeholder='Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className='border border-gray-300 p-2 mb-2 w-full'
                            />
                            <input
                                type='password'
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className='border border-gray-300 p-2 mb-4 w-full'
                            />
                            <button type='submit' className='bg-blue-600 text-white px-4 py-2 rounded-full w-full'>
                                {isLogin ? 'Login' : 'Register'}
                            </button>
                        </form>
                        <p className='text-sm mt-2'>
                            {isLogin ? 'Don\'t have an account?' : 'Already have an account?'}
                            <button onClick={() => setIsLogin(!isLogin)} className='text-blue-600 ml-1'>
                                {isLogin ? 'Register' : 'Login'}
                            </button>
                        </p>
                        <button onClick={closeModal} className='text-red-500 mt-4'>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NavBar;