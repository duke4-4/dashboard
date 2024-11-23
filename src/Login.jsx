/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import './index.css';
import { FiAlertTriangle } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Logo from "./assets/Logoo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleClick = () => {

    handleSubmit();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add basic admin check (in real app, this should be handled by backend)
    if (email === 'admin@example.com' && password === 'admin123') {
      navigate('/admin-dashboard');
    } else {
      // Regular user login
      navigate('/dashboard');
    }
  };

  // const handleSignUp = (event) => {
  //   event.preventDefault();
  // };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="content-container">
        <div className="w-full flex justify-center">
          <img src={Logo} alt="Logo" className="logo mr-4 " style={{ width: "10rem" }} />
        </div>
        <h2 className="text-3xl font-bold mb-4 text-center">
          Sign In To Your Account
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">
          <div className="mb-4">
            <input
              type="email"
              id="email"
              value={email}
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded shadow focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded shadow focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            <i
              className={`fas fa-eye absolute top-5 right-3 cursor-pointer ${showPassword ? "text-indigo-600" : "text-gray-400"}`}
              onClick={toggleShowPassword}
            ></i>
          </div>
          {errorMessage && (
            <div className="mb-4 text-sm text-red-600 flex gap-1 items-center">
              <FiAlertTriangle /> {errorMessage}
            </div>
          )}
          <button
            onClick={handleClick}
            type="submit"
            className="w-full bg-[#FF8227] text-white py-2 px-4 rounded hover:bg-[#c56e30] "
          >
            Sign In
          </button>
          <div className="mt-4 text-sm text-[20px] flex gap-3">
            <p className="text-[20px]">Don't have an account?</p>
            <Link to="/SignUp"
              // onClick={handleSignUp}
              className="text-[#ea580c] hover:underline text-[20px]"
            >
              Create one now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
