import { useState, useEffect } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";
import Navbar from "../components/Navbar";
import User from "../components/User";
import FollowBar from "../components/FollowBar";

// route /users in the application
// display all the users
// we go to analyze it, to followed users and not followed
export default function Users(){
  const {user} = useAuthContext();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
        const response = await fetch('/api/friends/allusers', {
            method: 'GET',
            headers: {'Authorization': `Bearer ${user.token}`}
        });

        const json = await response.json();

        console.log(json);
        console.log(response);
    
        
        setUsers(json);
        console.log(users);
    }
  
    if (user) {
      fetchUsers();
    }
}, []);

  // display the users
  return (
    
    <div className="wrapper">
      <Navbar/>
      {console.log(users)}
      
      <div className="main">
        <h1 className="sticky">Users of the app</h1>
        <div style={{paddingBottom: "20px"}}></div>
        {users.map((user1) => (
            <User key={user1._id} followingUser={user1.username} followingUserId={user1._id} display={false}/>
        ))}
      </div>
      <FollowBar/>
    </div>
  )
}
