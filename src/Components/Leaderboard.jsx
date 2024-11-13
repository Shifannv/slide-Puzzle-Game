import React, { useState, useEffect } from 'react';

const Leaderboard = () => {
    const [highScores, setHighScores] = useState([]);

    useEffect(() => {
        const scores = JSON.parse(localStorage.getItem('highScores')) || [];
        setHighScores(scores);
    }, []);

    return (
        <div className="leaderboard">
            <h3>Leaderboard</h3>
            <ul>
                {highScores.length > 0 ? (
                    highScores.map((score, index) => (
                        <li key={index}>
                            #{index + 1} - {score.time} seconds
                        </li>
                    ))
                ) : (
                    <li>No scores yet</li>
                )}
            </ul>
        </div>
    );
};

export default Leaderboard;
