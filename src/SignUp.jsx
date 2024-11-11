import { useState } from "react";
import './index.css';
import { FiAlertTriangle } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Logo from "./assets/Logoo.png";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // User or Admin
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    if (event) event.preventDefault();

    setErrorMessage("");

    if (email === "") {
      setErrorMessage("Email is required");
      return;
    }
    if (password === "") {
      setErrorMessage("Password is required");
      return;
    }
    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters");
      return;
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      setErrorMessage("Password must contain a special character");
      return;
    }
    if (role === "") {
      setErrorMessage("Role is required");
      return;
    }

    // Save user to a JSON file
    const newUser = { email, password, role };
    saveUserToJson(newUser);
    
    navigate('/Login'); // Redirect to login after signup
  };

  const saveUserToJson = (newUser) => {
    // Normally, you would use an API to handle this on the server-side
    // This is a placeholder for where you would save the data
    // For example, send a POST request to a backend API to save the user details
    
    console.log("New user details:", newUser);
    // Simulate saving the data to JSON file (in reality, this would be handled by a backend)
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
          Create Your Account
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
          <div className="mb-4">
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 border rounded shadow focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
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
            Sign Up
          </button>
          <div className="mt-4 text-sm text-[20px] flex gap-3">
            <p className="text-[20px]">Already have an account?</p>
            <Link to ="/"
              className="text-[#ea580c] hover:underline text-[20px]"
            >
              Login now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
