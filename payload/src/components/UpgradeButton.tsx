import React from 'react';

const UpgradeButton = () => {
    return (
        <a href="/admin/plans" style={{ display: 'inline-block', margin: '10px', padding: '5px 10px', backgroundColor: 'orange', color: 'white', fontSize: '1em', textDecoration: 'none', borderRadius: '5px', textAlign: 'center' }}>
            Upgrade
        </a>
    );
};

export default UpgradeButton;
