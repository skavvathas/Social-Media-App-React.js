import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate,  useNavigate } from "react-router-dom"; // navigate is for the redirecting
import { useAuthContext } from "./hooks/useAuthContext";

// pages and components
import Home from "./pages/Home"
import Register from "./pages/Register";
import Login from "./pages/Login";
import Compose from "./pages/Compose";
import Users from "./pages/Users";
import Followers from "./pages/Followers";
import Profile from "./pages/Profile";
import Select from "./pages/Select";
import NoPage from "./pages/NoPage";
import Navbar from './components/Navbar';
import User from "./pages/User";
import Search from "./pages/Search";

export default function App() {
  // null if nobody is logged in or the user value of the logged in user
  const {user} = useAuthContext(); 
  // !user -> not logged in
  // user -> logged in

  //const navigate = useNavigate();


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={!user ? <Select /> : <Navigate to="/home"/>} />
        <Route path="/login" element={!user ? <Login/> : <Navigate to="/home"/>} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/home"/>} />
        {/*<Route element={<Navbar />} >*/}
        <Route path="/home" element={user ? <Home /> : <Navigate to="/" />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/" />} />
        <Route path="/friends" element={user ? <Followers /> : <Navigate to="/" />} />
        <Route path="/post" element={user ? <Compose /> : <Navigate to="/" />} />
        <Route path="/users" element={user ? <Users /> : <Navigate to="/" />} />
        <Route path="/followers" element={user ? <Followers /> : <Navigate to="/" />} />
        <Route path="/search" element={user ? <Search /> : <Navigate to="/" />} />
        <Route path="/home/:id" element={user ? <User /> : <Navigate to="/" />} />
        {/*</Route>*/} 
        <Route path="/*" element={<NoPage />} />
    
      </Routes>
    </BrowserRouter>
  );
}
