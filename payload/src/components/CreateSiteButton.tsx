import React from 'react';

// Define the styles using TypeScript's type annotations
interface StyleProps {
    buttonContainerStyle: React.CSSProperties;
    buttonStyle: React.CSSProperties;
}

const CreateSiteButton: React.FC = () => {
    const styles: StyleProps = {
        buttonContainerStyle: {
            position: 'absolute',
            top: '16%',
            right: '5%',
            left: '10',
            transform: 'translateY(-50%)',
        },
        buttonStyle: {
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
            flexShrink: 0,
        }
    };

    const onClick = () => {
        window.location.href = `/admin/collections/tenants/create`;
    }

    return (
        <div style={styles.buttonContainerStyle}>
            <button style={styles.buttonStyle} onClick={onClick}>
                +
            </button>
        </div>
    );
};

export default CreateSiteButton;
