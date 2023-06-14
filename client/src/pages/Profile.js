import { Link } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";
import { usePostsContext } from "../hooks/usePostsContext";
import Navbar from "../components/Navbar";
import FollowBar from "../components/FollowBar";
import SinglePost from "../components/SinglePost";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { useEdit } from "../hooks/useEdit";
import { IoMdArrowBack } from 'react-icons/io';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import './Profile.css';


// rendered in the /profile route
export default function Profile(){
  const {user} = useAuthContext();
  const { dispatch } = usePostsContext();
  const [posts, setPosts] = useState([]);
  const [imageFile, setImageFile] = useState('');
  const [isOpen, setIsOpen] = useState(false); // for the HTML dialog
  const [editUser, setEditUser] = useState({
    username: "",
    firstName: "",
    lastName: ""
  });
  const {edit, editPosts, error, isLoading} = useEdit();

  const [change, setChange] = useState(0);
  const [imageUrl, setImageUrl] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);

  

  useEffect(() => {
    console.log(user);

    const fetchImage = async () => {
      try {
        const response = await fetch('/api/uploaded/getImage', {
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
    

    const fetchPost = async () => {
        const response = await fetch('/api/posts', {
          headers: {'Authorization': `Bearer ${user.token}`}
        });
  
        const json = await response.json();
        console.log(json);
  
        if (response.ok) {
          setPosts(json);
        }
    }   
    

    if (user) {
      fetchPost();
      fetchImage();
    }

  }, [change]);


  // handle image function
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);

    // to display in the page
    const reader = new FileReader();

    reader.onload = () => {
      setSelectedImage(reader.result);
    };

    reader.readAsDataURL(file);
  }


  const handleSubmit = async (event) => {

    event.preventDefault();
    const formData = new FormData();
    formData.append("image", imageFile);

    
    // upload the image in the server
    try {
      const response = await fetch("/api/uploaded/upload-image", {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.token}`
        },
        body: formData
      });
  
      if (!response.ok) {
        console.log(response);
        throw new Error("Upload failed");
      }
  
      const responseData = await response.json();

    } catch (error) {
      console.error(error);
    }

    await edit(editUser.firstName, editUser.lastName, editUser.username, user.user.username);
    await editPosts(editUser.username, user.user.username);

    closeDialog();

    setChange(change + 1);
  };


  // delete the post
  const handleDelete = async (postId) => {
    if (!user) {
      return
    }
    
    
    // delete the post 
    const response = await fetch('/api/posts/' + postId, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json();

    setChange(change + 1);

    if (response.ok) {
        //dispatch({type: 'DELETE_POST', payload: json})
        
        // update posts state
        
    } 
  
  }

  // ***** For the dialog close and open ******
  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const handleFormSubmit = (event) => {
    // Handle form submission logic here
    closeDialog();
  };
  // *********************************************



  // ****** For the username-firstname-lastname edit *******
  const handleChanges = (event) => {
    const { name, value } = event.target; //Destucturing
    // same with :
    // const newValue = event.target.value;
    // const inputName = event.target.name;


    setEditUser((prevValue) => {
      return {
        ...prevValue, // Hold all the previous values the same (username or password)
        [name]: value // except of [name] -> name = event.target.name and value = event.target.value
      };
    });

  
  }

  const handleChange = () => {
    setChange(change + 1);
  };

  return (
    <div className="wrapper">
      <Navbar/>
      
      <div className="main">
        <div className="sticky ">
          <div className="flex-container">
            <Link to="/home" className="arrow"><IoMdArrowBack /></Link>
            <h1 className="profile-st">{user.user.firstName} {user.user.lastName}</h1>
          </div>
          
        </div>
        

      
        <a class="profile-bg main-wrapper d-block"></a>
        <div className="userDiv">
        
            <img decoding="async" src={`uploads/${imageUrl}`} id="profile-link"/>
        
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
            
            <button type="button" className="btn-tw" onClick={openDialog}>Edit</button>
        </div>
       

        
        {isOpen && (
          <>
          <div class="custom-backdrop"></div>
          <dialog open onClose={closeDialog}>
          <button type="button" onClick={closeDialog}><AiOutlineCloseCircle /></button>
            <div className="cntr">
              <form className="circular-form">
                <input type="file" onChange={handleImageChange} /> 
                {selectedImage && <img src={selectedImage} alt="Selected image" />}
              </form>
            </div>
            
            <form className="my-form">
              <label>
                First Name:
                <input 
                  onChange={handleChanges} 
                  name="firstName" 
                  placeholder="First Name" 
                  value={editUser.firstName} 
                  required
                  className="form-control"
                />
              </label>
              <label>
                Last Name:
                <input 
                  onChange={handleChanges} 
                  name="lastName" 
                  placeholder="Last Name" 
                  value={editUser.lastName} 
                  required
                  className="form-control"
                />
              </label>
              <label>
                Username:
                <input 
                  onChange={handleChanges} 
                  name="username" 
                  placeholder="Username" 
                  value={editUser.username} 
                  required
                  className="form-control"
                />
              </label>
              <div className="center-btn">
                <button type="submit" className="tweet-btn3" onClick={handleSubmit}>Submit</button>
              </div>
              
              
            </form>
          </dialog>
          </>
        )}

        {console.log("Posts" + posts)}
        {posts.map((post) => (
            <SinglePost key={post._id} post={post} isUser={true} onDelete={() => handleDelete(post._id)}/>
        ))}
      </div>
      <FollowBar/>
    </div>
  )
}
