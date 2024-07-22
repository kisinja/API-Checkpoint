import { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from './Loader';

const UserList = () => {

    const [listOfUsers, setListOfUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const BASE_URL = 'https://jsonplaceholder.typicode.com/users';

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get(BASE_URL);
                setListOfUsers(res.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        }

        fetchUsers();
    }, []);

    if (loading) return <Loader />;
    if (error) return <h1>Error: {error.message}</h1>;

    return (
        <div className="user-list">
            <h1>List of Users</h1>
            <ul>
                {listOfUsers.map(user => (
                    <li key={user.id} className="user-item">
                        <h2>{user.name}</h2>
                        <p>Email: {user.email}</p>
                        <p>Phone: {user.phone}</p>
                        <p>Website: <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">{user.website}</a></p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;