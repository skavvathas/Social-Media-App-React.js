import { useState, useEffect } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";
import Navbar from "../components/Navbar";
import SinglePost from "../components/SinglePost";
import FollowBar from "../components/FollowBar";
import SearchBar from "../components/SearchBar";


// rendered in the /home route
export default function Search(){
  const {user} = useAuthContext();
  const [posts, setPosts] = useState([]);


  return (
    
    <div className="wrapper">

      <Navbar/>
      <div className="main">
        <h1 class="sticky">Search</h1>
        <SearchBar display={false}/>
      </div>
      <FollowBar/>
    
    </div>
  );
}
