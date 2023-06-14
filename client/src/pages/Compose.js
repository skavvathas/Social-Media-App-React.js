import React, { useEffect, useState, useRef} from 'react';
import { useAuthContext } from "../hooks/useAuthContext";
import { usePostsContext } from "../hooks/usePostsContext";
import Navbar from "../components/Navbar";
import FollowBar from "../components/FollowBar";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { FaImage } from 'react-icons/fa';
import './Compose.css'

// rendered in the /post route
export default function Compose(){
    const {posts, dispatch } = usePostsContext();

    const {user} = useAuthContext(); // user.user.username (there we can find the username)

    const [post, setPost] = useState("");
    const [error, setError] = useState(null);

    const inputRef = useRef(null);

    const navigate = useNavigate();
    
    // for the image
    const [imageFile, setImageFile] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    const [faImage, setFaImage] = useState(false);

    // handle the post in the textarea
    function handleChangePost(event){
        const newPost  = event.target.value;
        //const newPost = inputRef.current.innerText;

        setPost(newPost);
        console.log("The post is:" + post);
    }

    function faImageSelect(event){
        setFaImage(true);
    }


    const handleImageChange = (event) => {
        setFaImage(true);
        const file = event.target.files[0];
        setImageFile(file);
    
        // to display in the page
        const reader = new FileReader();
    
        reader.onload = () => {
          setSelectedImage(reader.result);
        };
    
        reader.readAsDataURL(file);
    }

    async function handleSubmit(e) {
        e.preventDefault()
        console.log(post);
        console.log(user.user._id);

        const id = user.user._id;
        const username = user.user.username;
        const userImage = user.user.imageUrl;

        const newPost = {id, post, username, userImage}     

        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify(newPost),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`
            }
        });

        const json = await response.json();

        // call here the upload of the photo based on the json._id
        if (imageFile !== '') {
            // If an image file is selected, append it to the FormData object
            const formData = new FormData();
            formData.append("image", imageFile);
            
            const postId = json._id;

            const response = await fetch('/api/uploaded/upload-image-post/' + postId, {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${user.token}`,
                },
                body: formData // Use the FormData object as the request body
            });
          
        }
        
        if (!response.ok) {
            setError(json.error);
            
        }

        if (response.ok) {
            setPost("");
            setError(null);
            
            dispatch({type: 'CREATE_POST', payload: json});
            console.log("Dispatch: " + dispatch);
            console.log("Posts from Provider line 55 Compose.js: " + posts);
        }  
        // Here we use the useRegister hook from /hooks/useRegister.js file
        //await register(regUser.firstName, regUser.lastName, regUser.email, regUser.username, regUser.password); 
        navigate("/profile");
    }
    

    return ( 
        <div className="wrapper">
            <Navbar/>
            <div className="main" >

                <a class="profile-bg main-wrapper d-block"></a>
                <div className="userDiv">
                
                    <img decoding="async" src={`uploads/${user.user.imageUrl}`} id="profile-link"/>
                
                    <div id="profile-marg">
                        <div id="profile-name">
                            <a href="#">{user.user.firstName} {user.user.lastName}</a>
                        </div>
                        <span>
                            <a href="#">@<span> {user.user.username}</span></a>
                        </span>
                        <br/>
                        <span>
                            <a href="#"><span> {user.user.email}</span></a>
                        </span>
                    </div>
                    <div id="profile-state"></div>
                   
                </div>

                <form method="post" class="post-area1">
                    <div class="wrapperpost1">
                        <div class="tweet-area">
                            <textarea 
                                name="post" 
                                id="post" 
                                rows="3" 
                                class="tweet-text-area"
                                onChange={handleChangePost}
                            >
                            </textarea>
                            
                        </div>
                        <div class="bottom1">
                            <ul class="icons">
                                { faImage && <form className="circular-form">
                                    
                                    {selectedImage && <img src={selectedImage} alt="Selected image" />}
                                </form> }
                                
                                <label htmlFor="imageInput">
                                    <FaImage /> {/* Image icon */}
                                </label> 
                                <input type="file"  id="imageInput" style={{ display: 'none' }} onChange={handleImageChange} /> 
                        
                            </ul>
                            <div class="content">
                                <Link to="/profile" className="tweet-btn4">
                                <button 
                                    
                                    type="submit" 
                                    name="Submit"
                                    onClick={handleSubmit}
                                >
                                    Publish
                                </button></Link>
                                {error && <div className="error">{error}</div>}
                            </div>
                            
                        </div>
                        
                    </div>
                </form>

                
            </div>
            <FollowBar/>
        </div>
    )
}
