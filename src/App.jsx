import Login from "./Login";
import Dashboard from "./Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// allow to navigate to home page

const App = () => {
  return (
   <>
    <BrowserRouter>
     <Routes>
       <Route exact path="/" element={<Login />} />
       <Route path="/dashboard" element={<Dashboard />} />
     </Routes>
    </BrowserRouter>
   
   
   </>
  )
}

export default App
