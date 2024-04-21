import React from 'react';

const TeamsNavItem = () => {
    return (
        <a href="admin/collections/users?limit=10" style={{ display: 'inline-block', margin: '10px', padding: '5px 10px', backgroundColor: 'orange', color: 'white', fontSize: '1em', textDecoration: 'none', borderRadius: '5px', textAlign: 'center' }}>
            Teams
        </a>
    );
};

export default TeamsNavItem;
