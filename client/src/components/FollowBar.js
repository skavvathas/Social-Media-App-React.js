import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from "../hooks/useAuthContext";
import User from "../components/User";
import SearchBar from "./SearchBar";
import './FollowBar.css';


// the bar on the right of the page
export default function FollowBar(){
    const { logout } = useLogout();
    const { user } = useAuthContext();
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

    const handleClick = () => {
        logout()
    }

    return(    
        <div className="sidebar right">
            <div className="text-xl bg-white border-r border-gray-300 h-screen w-1/4 fixed ">    

                    <div>
                        <SearchBar display={true}/>
                    </div>

                    <div className="results-list">
                        <h1 className="sticky"> Users </h1>
                        {users.map((user1) => (
                            <User key={user1._id} followingUser={user1.username} followingUserId={user1._id} display={true}/>
                        ))}
                    </div>

                    
            </div>  
        </div>  
    );
}