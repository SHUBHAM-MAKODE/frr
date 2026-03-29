import React from 'react';
import { Link } from 'react-router-dom';

const InfoPage = ({ title, description }) => {
    return (
        <div style={{ minHeight: '100vh', background: '#f8f9fa', padding: '2rem 1rem' }}>
            <div style={{ maxWidth: '720px', margin: '0 auto', background: '#fff', padding: '2rem', borderRadius: '12px' }}>
                <h1 style={{ marginBottom: '1rem' }}>{title}</h1>
                <p style={{ color: '#555', marginBottom: '1.5rem' }}>{description}</p>
                <Link to="/" style={{ color: '#667eea', textDecoration: 'none', fontWeight: 600 }}>
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default InfoPage;
