import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import Navbar from '../components/Navbar';
import SinglePost from '../components/SinglePost';
import FollowBar from '../components/FollowBar';
import { IoMdArrowBack } from 'react-icons/io';
import './User.css';


// route /home/:id in the app
// it is rendered when we click on another user
export default function User() {
  const { user } = useAuthContext();
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [paramUser, setParamUser] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      console.log("Fetching the posts of: " + id);

      const response = await fetch('/api/posts/user/' + id, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      const json = await response.json();
      console.log(json);

      if (response.ok) {
        setPosts(json);
      }
    };

    const fetchUserbyId = async () => {
        const username = id;

        const response = await fetch('/api/user/getUserByUsername', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ username }) // in server side we use body.firstname, etc
        })

        const json = await response.json()

        if (response.ok) {
            console.log(json);
            console.log(json.user);
            console.log(json.user.imageUrl);
            setParamUser(json.user);
            console.log("paramUser: " + paramUser);
        }
    }

    if (user) {
      fetchPosts();
      fetchUserbyId();
    }
  }, [id, user]);

    // Render the product detail page using the id parameter
    return (

        
        <div className="wrapper">
            {console.log("hellooooooooooooooooooo !!!!!!!!!!!!!!!!!!!!!!!")}
            <Navbar/>
            
            <div className="main">
                <div className="sticky ">
                    <div className="flex-container">
                        <Link to="/home" className="arrow"><IoMdArrowBack /></Link>
                        <h1 className="profile-st"></h1>
                    </div>
                </div>

                <a class="profile-bg main-wrapper d-block"></a>
                <div className="userDiv1">
                
                    <img decoding="async" src={`/uploads/${paramUser.imageUrl}`} id="profile-link"/>
                
                    <div id="profile-marg">
                        <div id="profile-name">
                            <a href="#">{id} </a>
                        </div>
                        <span>
                            <a href="#"> {paramUser.firstName} {paramUser.lastName}</a>
                        </span>
                        <br/>
                        <span>
                            <a href="#"> {paramUser.email} </a>
                        </span>
                    </div>
                    <div id="profile-state"></div>
                    
                </div>
                {posts.map((post) => (
                    <SinglePost key={post._id} post={post} isUser={false}/>
                ))}
            </div>
            <FollowBar/>
        </div>
    );
}