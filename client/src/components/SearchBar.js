import {useState, useEffect} from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import './SearchBar.css'


// Search Bar to search the users of the application.
export default function SearchBar({display}){
    const {user} = useAuthContext();
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
    const [users, setUsers] = useState([]);

    // fetch all the users
    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('/api/friends/allusers', {
                method: 'GET',
                headers: {'Authorization': `Bearer ${user.token}`}
            });
    
            const json = await response.json();
    
            console.log(json);
            console.log(response);
            
            setUsers(json);
            console.log(users);
        }
      
        if (user) {
          fetchUsers();
        }
    }, []);

    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);

        const newFilter = users.filter((user) => {
          return user.username.toLowerCase().includes(searchWord.toLowerCase());
        });
    
        if (searchWord === "") {
          setFilteredData([]);
        } else {
          setFilteredData(newFilter);
        }
    };
    
    const clearInput = () => {
        setFilteredData([]);
        setWordEntered("");
    };
    
    return (
        <div>
            <div className="widgets__input">
            <div className="searchIcon">
                    <FiSearch className="icon"/>
                </div>
                <div className="searchInputs">
                <input
                    type="text"
                    placeholder="Search"
                    value={wordEntered}
                    onChange={handleFilter}
                    style={{ color: 'black' }}
                />
                
                </div>
                {filteredData.length != 0 && (
                <div className={display ? "dataResult1" : "dataResult2"}>
                    {filteredData.slice(0, 15).map((user, key) => {
                    return (
                        <Link className="dataItem" to={`/home/${user.username}`}>
                            <p style={{ color: 'black' }}>{user.username} </p>
                        </Link>
                    );
                    })}
                </div>
                )}
            
            </div>
            
        </div>
        
        
    );
}