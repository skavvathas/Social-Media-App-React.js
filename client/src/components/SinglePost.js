import {useState} from "react";
import {useAuthContext} from "../hooks/useAuthContext";
import {usePostsContext} from "../hooks/usePostsContext";
import { FaHeart, FaShare, FaComment } from 'react-icons/fa';
import { FaRegHeart, FaRegShareSquare, FaRegComment } from 'react-icons/fa';

import { RiDeleteBinLine } from 'react-icons/ri';
import './SinglePost.css';

// every post of the users have this code.
function SinglePost({post, isUser, onDelete}){
    const {user} = useAuthContext();
    const { dispatch } = usePostsContext();
    const [likes, setLikes] = useState(post.likes);
    const [startingLikes, setStartinngLikes] = useState(post.likes);

    const handleDelete = async () => {
      // Call the onDelete callback function after a successful deletion
      const success = await onDelete();
      if (success) {
        alert("Post deleted successfully!");
      }
    };


    const increaseLikes = async () => {
      if (likes === startingLikes) {
        const response = await fetch('/api/posts/uplike/' + post._id, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        })
        const json = await response.json();
  
        setLikes(json);  
      } else {
        const response = await fetch('/api/posts/downlike/' + post._id, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        })
        const json = await response.json();
  
        setLikes(json);  
      }
      
    }

    return(
 
      <div class="post">
        <div class="post-avatar">
          {/*<img className="avatar1" src={`uploads/${post.userImage}`}/>*/}
          <img className="avatar1" src={`/uploads/${post.userImage}`} alt="Profile Image"/>
        </div>

        <div class="post-body">
          <div class="post-header">
            <div class="post-headerText">
              <h3>
                {post.username}
                
              </h3>
              <span class="post-headerSpecial">
                  
                  <span class="material-icons post-badge"> 
                    verified  
                  </span>
                   @{post.username}
                </span>
            </div>
            <div class="post-headerDescription">
              <p>{post.post}</p>
            </div>
          </div>
          <img
            src={`/uploads/${post.imageFile}`}
            alt=""
          />
          {/*<img src={`/uploads/${post.imageFile}`} alt="Image of Post" />*/}
          <div class="post-footer">
            <span class="material-icons"> 
              <a onClick={increaseLikes} > <li class="nav-item1" > <FaRegHeart style={{paddingRight: "1px"}}/> {likes} </li></a>
            </span>
            <span class="material-icons"> <li class="nav-item2"> <FaRegShareSquare />  </li></span>
            <span class="material-icons"> <li class="nav-item3"> <FaRegComment /> </li></span>

            {isUser ? (
              <li class="nav-item4">
                <button onClick={handleDelete}><RiDeleteBinLine /></button>
              </li>
            ) : null}
          </div>
        </div>
      </div>
       
    )
}

export default SinglePost;
