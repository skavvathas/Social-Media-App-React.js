import {useState} from "react";
import {useAuthContext} from "./useAuthContext";

export const useGetImage = (setImageUrl) =>{
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    //const [imageUrl, setImageUrl] = useState("");
    const { user } = useAuthContext();

    const getImage = async () => {
        
        setIsLoading(true)
        setError(null)

        
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

        console.log("!!!image url : " + json);

        setImageUrl(json);

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        
    }

    return { getImage }
}