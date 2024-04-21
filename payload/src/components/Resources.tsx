import React from 'react';

const Resources: React.FC = () => {
    return (
        <div style={styles.container}>
            <h1>Resources</h1>
            <p>Welcome to the Resources page of the Rally app. Here you can find various materials and tools to help you.</p>
            <div style={styles.linksContainer}>
                <h2>Useful Tools for Form Handling:</h2>
                <ul style={styles.list}>
                    <li><a href="https://mailchimp.com/" target="_blank" rel="noopener noreferrer" style={styles.link}>Mailchimp</a> - Email marketing service that also offers simple form integrations.</li>
                    <li><a href="https://www.google.com/forms/about/" target="_blank" rel="noopener noreferrer" style={styles.link}>Google Forms</a> - A versatile tool for creating forms and surveys, directly integrated with Google Sheets.</li>
                    <li><a href="https://www.typeform.com/" target="_blank" rel="noopener noreferrer" style={styles.link}>Typeform</a> - Provides engaging forms and surveys that are highly customizable.</li>
                </ul>
            </div>
        </div>
    );
};

// Styles
const styles = {
    container: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    linksContainer: {
        marginTop: '20px',
        backgroundColor: '#f4f4f8',
        padding: '15px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    list: {
        listStyleType: 'none',
        padding: 0,
    },
    link: {
        color: '#007bff',
        textDecoration: 'none'
    }
};

export default Resources;
