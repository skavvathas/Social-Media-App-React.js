import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

// hook for the unfollow and follow of the users of the app
export const useFollow = () => {
    const {user} = useAuthContext();
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    
    const follow = async (username, followingUserId) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch('/api/friends/follow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({username, followingUserId})
           
        })

        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            
            setIsLoading(false)
        }
    }

    const unfollow = async (username, followingUserId) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/friends/unfollow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({username, followingUserId}) // in server side we use body.firstname, etc
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            
            setIsLoading(false)
        }
    }

    return { follow, unfollow, isLoading, error }
}
