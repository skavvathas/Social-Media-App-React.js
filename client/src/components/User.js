import {useState, useEffect} from "react";
import {useAuthContext} from "../hooks/useAuthContext";
import {useFollow} from "../hooks/useFollow";
import { Link } from 'react-router-dom';
import './User.css';


function User({followingUser, followingUserId, display}){
    // isFollowing = true  -->  user follows followingUser
    // isFollowing = false  -->  user doesn't follow followingUser
    const {user} = useAuthContext();
    const {follow, unfollow, isLoading, error} = useFollow();
    const [isFollow, setIsFollow] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const [change, setChange] = useState(0);

    useEffect(() => {

        const isFollowing = async () => {
            const username = user.user.username;

            const response = await fetch('/api/friends/isfollowing', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // SOS when we send the body like here
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ username, followingUserId })
            });

            const json = await response.json();

            if (response.ok) {
                setIsFollow(json.isFollowing);
            }
        }

        const fetchImage = async () => {
            try {
              const response = await fetch('/api/uploaded/getImageById/' + followingUserId, {
                method:'POST', 
                headers: {
                  'Authorization': `Bearer ${user.token}`
                }
              });
      
              
              if (!response.ok) {
                throw new Error('Failed to fetch image data');
              }
              const json = await response.json(); // the image url
      
              setImageUrl(json);
             
            } catch (error) {
              console.error(error);
            }
        }
      
        if (user) {
            isFollowing();
            fetchImage();
        }
    }, [change]);

    // handle the follow, follow the user, and trigger the useEffect
    async function handleFollow(e) {
        e.preventDefault()
        
        await follow(user.user.username, followingUserId); 

        setChange(change + 1); // to trigger the useEffect
    }

    // handle the unfollow
    async function handleUnfollow(e) {
        e.preventDefault()
    
        await unfollow(user.user.username, followingUserId); 

        setChange(change + 1); // to trigger the useEffect
    }
    

    return(
        <div className={display ? "user" : "user1"}>
            <Link to={`/home/${followingUser}`} className={display ? "profile-btn1" : "profile-btn2"}>
                <div class="profile-info1">
                    {/*<img className="avatar" src={`uploads/${imageUrl}`}/>*/}
                    <img className="avatar" src={`/uploads/${imageUrl}`} alt="Profile Image" />
                    <div style={{ display: "flex", alignItems: "center", paddingLeft:"10px"}}>
                        <p class="name">{followingUser}</p>
                        
                        {isFollow ? (
                            <button className={display ? "follow-button" : "follow-button1"} onClick={handleUnfollow} value="unfollow">Unfollow</button>
                        ) : (
                            <button className={display ? "follow-button" : "follow-button1"} onClick={handleFollow} value="follow">Follow</button>
                        )}
                    </div>  
                </div>
            </Link>
        </div>
    )
}

export default  User;