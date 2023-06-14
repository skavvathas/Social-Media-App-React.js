import { useState, useEffect } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";
import Navbar from "../components/Navbar";
import User from "../components/User";
import FollowBar from "../components/FollowBar";
import './Followers.css';

// rendered in the route /followers (it is following, the users whom the user is following are rendered)
export default function Followers(){
  const {user} = useAuthContext();
  const [followingUsers, setFollowingUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/friends/getfollowing', {
        method: 'GET',
        headers: {'Authorization': `Bearer ${user.token}`}
      });
    
  
      const json = await response.json();

      console.log(json);
      console.log("Response fROM FOLLOWERS:  " + json);
  
      if (response.ok) {
        setFollowingUsers(json);  
      }
    }
  
    if (user) {
      fetchUsers();
    }
  }, []);


  return (
    
    <div className="wrapper">
      <Navbar/>
      
      

      <div className="main">
        <h1 class="sticky-following">Following Users</h1>
        {followingUsers.length === 0 && (
          <div className="centered-message">
            <h1>You are not following anyone!</h1>
          </div>
        )}
        <div style={{paddingBottom: "20px"}}></div>
        {followingUsers.map((user1) => (
            <User key={user1._id} followingUser={user1.username} followingUserId={user1._id} display={false}/>
        ))}
      </div>
      <FollowBar/>
    </div>
  )
}
