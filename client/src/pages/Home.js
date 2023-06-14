import { useState, useEffect } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";
import Navbar from "../components/Navbar";
import SinglePost from "../components/SinglePost";
import FollowBar from "../components/FollowBar";
import './Home.css';


// rendered in the /home route
export default function Home(){
  const {user} = useAuthContext();
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/posts/allFollowPosts', {
        method: 'GET',
        headers: {'Authorization': `Bearer ${user.token}`}
      });
    

      const json = await response.json();

      console.log("json: " + json);

      if (response.ok) {
          setPosts(json);
      }
    }

    if (user) {
      fetchPosts();
    }

  }, [])

  return (
    
    <div className="wrapper">

      <Navbar/>
      <div className="main">
        <h1 class="sticky">Home</h1>
        
        <div class="tweetBox">
          <form>
            <div class="tweetBoxInput">
              <img className="avatar" src={`uploads/${user.user.imageUrl}`}/>
              <input type="text" placeholder="What's happening?"/>
            </div>
            <button class="tweetBoxButton">Tweet</button>
          </form>
        </div>
        
        {posts.map((post) => (
          <SinglePost key={post._id} post={post} isUser={false}/>
        ))}
      </div>
      <FollowBar/>
    
    </div>
  );
}

// user from useAuthContext
// AuthContext {user: {…}} (console)
/* user: 
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDI4ODU0N2MzZTU1NmY4ZmRkOGMyNmQiLCJpYXQiOjE2ODAzNzcxNTksImV4cCI6MTY4MDYzNjM1OX0.8lXzgC9zYaCz4-xhePZOmf04fq7K2Hn86IsimvXf2oA"
    user: 
      email: "skavvathas@gmail.com"
      firstName: "Spiros"
      lastName: "Kavvathas"
      password: "25f9e794323b453885f5181f1b624d0b"
      username: "skavvathas"
      __v: 0
      _id: "64288547c3e556f8fdd8c26d" */
// user.token for the token of the user
// user.user.firstName for the first name of the user
// use.user.username for the username
// etc
