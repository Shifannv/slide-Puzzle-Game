import React, { useState } from 'react';
import PuzzleGame from './Components/PuzzleGame';
import Leaderboard from './Components/Leaderboard';
import { SiGamejolt } from 'react-icons/si';
import './styles/PuzzleGame.css';

function App() {
    const [showLeaderboard, setShowLeaderboard] = useState(false);

    return (
        <div className="app">
            <h1 className="title">
                <SiGamejolt className="text-warning" /> Sliding Puzzle Game
            </h1>
            <button
                className="leaderboard-btn"
                onClick={() => setShowLeaderboard(!showLeaderboard)}
            >
                {showLeaderboard ? 'Back to Game' : 'Show Leaderboard'}
            </button>
            {showLeaderboard ? <Leaderboard /> : <PuzzleGame />}
        </div>
    );
}

export default App;
