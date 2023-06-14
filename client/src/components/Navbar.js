import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from "../hooks/useAuthContext";
import React, { useState } from "react";
import { FaHome, FaHashtag, FaBell, FaEnvelope } from "react-icons/fa";
import {BiHomeCircle} from 'react-icons/bi';
import {CgProfile} from 'react-icons/cg';
import {FaUserFriends} from 'react-icons/fa';
import {IoNotifications} from 'react-icons/io';
import {CgMoreO} from 'react-icons/cg';
import { MdPersonAdd } from 'react-icons/md';
import { FiSearch } from 'react-icons/fi';
import { FaTwitter } from 'react-icons/fa';
import './Navbar.css';

function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [showText, setShowText] = useState(false);

  const toggleText = () => {
    setShowText(!showText);
  };

  const handleClick = () => {
    logout()
  }

  return (
    <div className="sidebar left ">
      
        <div className="side-bar">
            <ul className="nav-bar">
                <li className="nav-bar-brand">
                    <h1 ><FaTwitter className="icon" style={{ color: 'white'}} /></h1>   
                </li>
                <li className="nav-item">
                <Link to="/home" className="my-link-class">
                <BiHomeCircle className="mr-2 icon" />
                    <h1 className="item-link">Home</h1>
                </Link>
                </li>
                <li className="nav-item">  
                <Link to="/followers" className="my-link-class item-icon home">
                    <MdPersonAdd className="icon" />
                    <h1 className="item-link">Following</h1>
                </Link>
                </li>
                <li className="nav-item">  
                <Link to="" className="my-link-class item-icon home">
                    <FaBell className="icon" />
                    <h1 className="item-link">Notifications</h1>
                </Link>
                </li>
                <li className="nav-item">  
                <Link to="/users" className="my-link-class item-icon home">
                    <FaUserFriends className="icon" />
                    <h1 className="item-link">Users</h1>
                </Link>
                </li>
                <li className="nav-item">
                <Link to="/profile" className="my-link-class item-icon home">
                    <CgProfile className="icon"/>
                    
                    <h1 className="item-link">Profile</h1>
                </Link>
                </li>
                <li className="nav-item">
                <Link to="/search" className="my-link-class item-icon home">
                    <FiSearch className="icon"/>
                    
                    <h1 className="item-link">Search</h1>
                </Link>
                </li>
                <li className="nav-item">
                <Link to="" className="my-link-class item-icon home">
                    <CgMoreO className="icon"/>
                    
                    <h1 className="item-link">More</h1>
                </Link>
                </li>
                
                < Link to="/post" className="tweet-btn"><h1>Post</h1></Link>
        
                {user && (<div>
                    <span>{user.username}</span>
                    <button type="button"  onClick={handleClick}><Link to="/" className="tweet-btn">Log out</Link></button>
                </div>)}

            </ul>
            <div className="user">
                <Link to="/home" className="profile-btn">
                    <div class="profile-info">
                        <img className="avatar" src={`/uploads/${user.user.imageUrl}`} alt="Profile Image" />
                        
                        <div style={{ paddingLeft:"10px"}}>
                            <p class="name">{user.user.firstName}</p>
                            <p class="username">@{user.user.username}</p>
                        </div>  
                    </div>
                </Link>
            </div>
            
        </div>
      

    </div>
  )
}

export default Navbar