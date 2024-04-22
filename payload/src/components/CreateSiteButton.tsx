import React from 'react';

const CreateSiteButton = () => {
    const buttonContainerStyle = {
        position: 'absolute', // Positioning relative to the nearest positioned ancestor
        top: '15%', // Adjust top as necessary, assuming the parent has a set height
        right: '5%', // Align to the right
        left: '10',
        transform: 'translateY(-50%)' // This will vertically center it
    };

    const buttonStyle = {
        background: 'white',
        border: '1px solid #FF5722',
        borderRadius: '50%',
        cursor: 'pointer',
        width: '50px',
        height: '50px',
        boxShadow: '0px 5px 8px #00000029',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '24px',
        color: '#FF5722',
        // Ensure the button doesn't shrink or grow in a flex container
        flexShrink: 0
    };

    const onClick = () => {
        window.location.href = 'http://localhost:3000/admin/collections/tenants/create'
    }

    return (
        <div style={buttonContainerStyle}>
            <button style={buttonStyle} onClick={onClick}>
                +
            </button>
        </div>
    );
};

export default CreateSiteButton;
