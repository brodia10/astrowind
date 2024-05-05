import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import CustomAccountAvatar from './CustomAccountAvatar';
import './navbar.scss';

interface NavItem {
    title: string;
    link: string;
}

const navItems: NavItem[] = [
    { title: 'Settings', link: '/admin/collections/settings' },
    { title: 'Header', link: '/admin/collections/header?limit=10' },
    { title: 'Footer', link: '/admin/collections/footer?limit=10' },
    { title: 'Pages', link: '/admin/collections/pages?limit=10' },
    { title: 'Media', link: '/admin/collections/media?limit=10' },
    { title: 'Posts', link: '/admin/collections/posts?limit=10' },
    { title: 'Priorities', link: '/admin/collections/priorities?limit=10' },
    { title: 'Redirections', link: '/admin/collections/redirections?limit=10' },
    { title: 'Alerts/Popups', link: '/admin/collections/alertspopups?limit=10' },
    { title: 'Form Submissions', link: '/admin/collections/form-submissions?limit=10' },
];

const CustomNavbar: React.FC = () => {
    const memoizedNavItems = useMemo(() => navItems.map(item => (
        <Link key={item.title} to={item.link} className="nav-item">
            <div style={{
                display: 'flex', alignItems: 'center', width: '100%', textDecoration: 'none'
            }}>
                {item.title}
            </div>
        </Link>
    )), []);

    return (
        <nav className="custom-navbar">
            <ul className="nav-items">
                <CustomAccountAvatar />
                {memoizedNavItems}
            </ul>
            <Link to="/admin/logout" className="logout-icon-link">
                <i className="fas fa-sign-out-alt" title="Logout"></i>
            </Link>
        </nav>
    );
};

export default CustomNavbar;
