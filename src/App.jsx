import Login from "../Login";
import Dashboard from "../Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "../SignUp";

const initializeUsers = () => {
  const existingUsers = JSON.parse(localStorage.getItem("users"));

  if (!existingUsers) {
    const sampleUsers = [
      { email: "admin@example.com", password: "Admin@1234", role: "admin" },
      { email: "user@example.com", password: "User@1234", role: "user" },
    ];

    localStorage.setItem("users", JSON.stringify(sampleUsers));
  }
};

initializeUsers();
const App = () => {
  return (
   <>
    <BrowserRouter>
     <Routes>
       <Route exact path="/" element={<Login />} />
       <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/SignUp" element={<SignUp />} />
     </Routes>
    </BrowserRouter>
   
   
   </>
  )
}

export default App
