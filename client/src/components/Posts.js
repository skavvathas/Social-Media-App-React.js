import {useState} from "react";
import {useAuthContext} from "../hooks/useAuthContext";
import SinglePost from "../components/SinglePost";

// all the posts 
function Posts({posts}){
    const {user} = useAuthContext();

    return(
        <div>
        {posts.map((post) => (
            <SinglePost key={post._id} post={post}/>
        ))}
      </div>
    )
}

export default Posts;