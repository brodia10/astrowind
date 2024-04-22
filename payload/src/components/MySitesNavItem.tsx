import React from 'react';

const MySitesNavItem = () => {
    return (
        <a href="/admin/collections/tenants?limit=10" style={{ margin: '10px', padding: '5px 10px', color: 'grey', fontSize: '1em', textDecoration: 'none', borderRadius: '5px', textAlign: 'center' }}>
            MySites
        </a>
    );
};

export default MySitesNavItem;
