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
  const [userRole, setUserRole] = useState("sender");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();


  const userCredentials = {
    admin: { email: 'admin@example.com', password: 'admin123' },
    sender: { email: 'sender@example.com', password: 'sender123' },
    receiver: { email: 'receiver@example.com', password: 'receiver123' }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
   
    const credentials = userCredentials[userRole];
    
    if (email === credentials.email && password === credentials.password) {
      switch (userRole) {
        case 'admin':
          navigate('/admin-dashboard');
          break;
        case 'sender':
          navigate('/dashboard');
          break;
        case 'receiver':
          navigate('/receiver-dashboard');
          break;
        default:
          navigate('/dashboard');
      }
    } else {
      setErrorMessage("Invalid credentials for selected role");
    }
  };

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
              className="w-full px-3 py-2 border rounded shadow focus:outline-none focus:ring-2 focus:ring-[#FF8227]"
            />
          </div>
          <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded shadow focus:outline-none focus:ring-2 focus:ring-[#FF8227]"
            />
            <i
              className={`fas fa-eye absolute top-5 right-3 cursor-pointer ${showPassword ? "text-[#FF8227]" : "text-gray-400"}`}
              onClick={toggleShowPassword}
            ></i>
          </div>

          <div className="mb-4">
            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              className="w-full px-3 py-2 border rounded shadow focus:outline-none focus:ring-2 focus:ring-[#FF8227]"
            >
              <option value="sender">Sender</option>
              <option value="receiver">Receiver</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          

          {errorMessage && (
            <div className="mb-4 text-sm text-red-600 flex gap-1 items-center">
              <FiAlertTriangle /> {errorMessage}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-[#FF8227] text-white py-2 px-4 rounded hover:bg-[#c56e30]"
          >
            Sign In
          </button>
          <div className="mt-4 text-sm text-[20px] flex gap-3">
            <p className="text-[20px]">Don't have an account?</p>
            <Link to="/SignUp" className="text-[#ea580c] hover:underline text-[20px]">
              Create one now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
