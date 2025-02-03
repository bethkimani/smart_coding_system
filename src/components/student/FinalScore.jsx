// FinalScore.jsx
import React from 'react';

const FinalScore = ({ score }) => {
    return (
        <div>
            <h2 className="text-xl mb-4">You're Done!</h2>
            <p>Your final score is: {score}</p>
            <p className="mt-4">
                <a href="/" className="text-blue-500">Take the quiz again</a>
            </p>
        </div>
    );
};

export default FinalScore;