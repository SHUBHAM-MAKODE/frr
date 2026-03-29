import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const FeedbackPage = () => {
    const [rating, setRating] = useState(5);
    const [review, setReview] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thanks for your feedback!');
        navigate('/dashboard');
    };

    return (
        <div style={{ minHeight: '100vh', background: '#f8f9fa', padding: '2rem 1rem' }}>
            <div style={{ maxWidth: '720px', margin: '0 auto', background: '#fff', padding: '2rem', borderRadius: '12px' }}>
                <h1 style={{ marginBottom: '1rem' }}>Rate Your Order</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="rating" style={{ display: 'block', marginBottom: '.5rem' }}>Rating</label>
                    <select id="rating" value={rating} onChange={(e) => setRating(Number(e.target.value))} style={{ marginBottom: '1rem' }}>
                        <option value={5}>5 - Excellent</option>
                        <option value={4}>4 - Good</option>
                        <option value={3}>3 - Okay</option>
                        <option value={2}>2 - Poor</option>
                        <option value={1}>1 - Bad</option>
                    </select>

                    <label htmlFor="review" style={{ display: 'block', marginBottom: '.5rem' }}>Review</label>
                    <textarea
                        id="review"
                        rows="4"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        style={{ width: '100%', marginBottom: '1rem' }}
                        placeholder="Share your experience"
                    />

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button type="submit">Submit Feedback</button>
                        <Link to="/dashboard">Cancel</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FeedbackPage;
