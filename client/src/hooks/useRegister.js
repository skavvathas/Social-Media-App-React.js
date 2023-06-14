import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

// To register the user
export const useRegister = (firstName, lastName, email, username, password) => {
//function useRegister(firstName, lastName, email, username, password) {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const register = async (firstName, lastName, email, username, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/user/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ firstName, lastName, email, username, password }) // in server side we use body.firstname, etc
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            // update the auth context
            dispatch({type: 'LOGIN', payload: json})

            // update loading state
            setIsLoading(false)
        }
    }

    return { register, isLoading, error }
}

//export default useRegister;