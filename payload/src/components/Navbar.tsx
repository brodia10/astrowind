// CustomNavbar.jsx
import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import CustomAccountAvatar from './CustomAccountAvatar';
import './navbar.scss';

const navItems = [
    'Settings',
    'Header',
    'Footer',
    'Pages',
    'Media',
    'Posts',
    'Priorities',
    'Redirections',
    'Alerts/Pop ups',
    'Form Submissions',
];

const handleLogout = async () => {
    try {
        // Send a POST request to the logout endpoint
        await axios.post('api/users/logout');
        window.location.href = '/login'
    } catch (error) {
        // Handle errors here, such as displaying a message to the user
        console.error('Logout failed', error);
    }
};

const CustomNavbar: React.FC = () => {
    return (
        <nav className="custom-navbar">
            <ul className="nav-items">
                <CustomAccountAvatar />
                {navItems.map((item) => (
                    <li key={item} className="nav-item">
                        <Link to={`/admin/${item.toLowerCase().replace(/ /g, '')}`}>
                            {item}
                        </Link>
                    </li>
                ))}
                <li className="nav-item">
                    <button onClick={handleLogout} className="logout-button">
                        Logout
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default CustomNavbar;
