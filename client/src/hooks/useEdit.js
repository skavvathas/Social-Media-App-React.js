import {useState} from "react";
import {useAuthContext} from "./useAuthContext";

export const useEdit = () =>{
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { user, dispatch } = useAuthContext();

    const edit = async (firstName, lastName, username, prevUsername) => {
        
        setIsLoading(true)
        setError(null)

        // edit the name of the file with id: file._id
        const response = await fetch('/api/user/edit', {
            method: 'PUT',
            body: JSON.stringify({ firstName, lastName, username, prevUsername }),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            
            localStorage.setItem("user", JSON.stringify(json));
            dispatch({ type: "LOGIN", payload: json });
            setIsLoading(false)
        }
    }

    const editPosts = async (username, prevUsername) => {
        const response = await fetch('/api/posts/edit', {
            method: 'PUT',
            body: JSON.stringify({ username, prevUsername }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
    }
    

    return { edit, editPosts, isLoading, error }
}