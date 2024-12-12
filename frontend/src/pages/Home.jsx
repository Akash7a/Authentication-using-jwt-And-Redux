import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, logoutUser } from '../features/auth/AuthSlice.js';

const HomePage = () => {
  const dispatch = useDispatch();
  const { user, loading, error,token } = useSelector((state) => state.auth);


  const handleLogout = () => {
    try {
      if (token) {
          dispatch(logoutUser());
          dispatch(logout());  
      }
    } catch (error) {
      console.error("Logout Failed", error);
    }
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-6 bg-gray-800">
        <div className="text-3xl font-bold">
          <Link to="/" className="text-white">Akash's Portfolio</Link>
        </div>
        <ul className="flex space-x-6 text-lg">
          <li><Link to="#about" className="hover:text-blue-400">About</Link></li>
          <li><Link to="#skills" className="hover:text-blue-400">Skills</Link></li>
          <li><Link to="#projects" className="hover:text-blue-400">Projects</Link></li>
          <li><Link to="#contact" className="hover:text-blue-400">Contact</Link></li>
        </ul>
        {/* Logout Button */}
        <button onClick={handleLogout} className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center h-screen text-center bg-gradient-to-r from-blue-500 to-purple-600">
        <h1 className="text-5xl font-bold leading-tight text-white mb-4">Hi, I'm Akash</h1>
        <p className="text-xl text-gray-200 mb-6">A passionate Front-End Developer and Self-Taught Programmer</p>
        <Link to="#projects" className="bg-blue-500 text-white px-6 py-3 rounded-lg text-xl font-semibold hover:bg-blue-600 transition">
          View My Projects
        </Link>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-gray-800 text-center">
        <h2 className="text-3xl font-semibold text-white mb-8">About Me</h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          I'm a self-taught developer passionate about building clean, responsive, and user-friendly web applications.
          I specialize in front-end technologies like React, JavaScript, and CSS, and am constantly learning new tools and frameworks.
        </p>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 bg-gray-900 text-center">
        <h2 className="text-3xl font-semibold text-white mb-8">Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg text-white">
            <h3 className="text-xl font-bold mb-4">JavaScript</h3>
            <p className="text-gray-400">Building interactive web applications.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg text-white">
            <h3 className="text-xl font-bold mb-4">React</h3>
            <p className="text-gray-400">Creating dynamic and responsive user interfaces.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg text-white">
            <h3 className="text-xl font-bold mb-4">Tailwind CSS</h3>
            <p className="text-gray-400">Fast and efficient utility-first CSS framework.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg text-white">
            <h3 className="text-xl font-bold mb-4">Node.js</h3>
            <p className="text-gray-400">Building backend services with JavaScript.</p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 bg-gray-800 text-center">
        <h2 className="text-3xl font-semibold text-white mb-8">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-700 p-6 rounded-lg text-white">
            <h3 className="text-xl font-semibold mb-4">Project 1</h3>
            <p className="text-gray-400 mb-4">A brief description of the project.</p>
            <a href="#" className="text-blue-400 hover:underline">View Project</a>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg text-white">
            <h3 className="text-xl font-semibold mb-4">Project 2</h3>
            <p className="text-gray-400 mb-4">A brief description of the project.</p>
            <a href="#" className="text-blue-400 hover:underline">View Project</a>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg text-white">
            <h3 className="text-xl font-semibold mb-4">Project 3</h3>
            <p className="text-gray-400 mb-4">A brief description of the project.</p>
            <a href="#" className="text-blue-400 hover:underline">View Project</a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-gray-900 text-center">
        <h2 className="text-3xl font-semibold text-white mb-8">Contact Me</h2>
        <p className="text-lg text-gray-300 mb-8">Feel free to reach out if you want to collaborate or just chat!</p>
        <Link to="mailto:akash7a@example.com" className="bg-blue-500 text-white px-6 py-3 rounded-lg text-xl font-semibold hover:bg-blue-600 transition">
          Get In Touch
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-6">
        <p>&copy; 2024 Akash | All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default HomePage;