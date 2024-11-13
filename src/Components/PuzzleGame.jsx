import React, { useState, useEffect } from 'react';
import { FcMusic } from 'react-icons/fc';
import { GiPartyPopper, GiPodiumWinner } from 'react-icons/gi';

const PuzzleGame = () => {
    const [tiles, setTiles] = useState([]);
    const [isSolved, setIsSolved] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const audio = new Audio('./machiavellian-nightmare-electronic-dystopia-ai-robot-machine-139385.mp3');

    useEffect(() => {
        initializePuzzle();
    }, []);

    // Toggle music play/pause
    const toggleMusic = () => {
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    // Initialize puzzle and shuffle tiles
    const initializePuzzle = () => {
        let nums = Array.from({ length: 11 }, (_, i) => i + 1); // Numbers 1 to 15
        nums.push(null); // Add empty space
        nums = shuffleArray(nums); // Shuffle numbers
        setTiles(nums);
        setIsSolved(false);
        setStartTime(Date.now()); // Start the timer
        setEndTime(null); // Reset end time
    };

    // Shuffle array
    const shuffleArray = (arr) => {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    };

    // Check if the puzzle is solved
    useEffect(() => {
        const checkSolved = tiles.every((val, index) =>
            val === null ? index === 11 : val === index + 1
        );
        setIsSolved(checkSolved);

        if (checkSolved) {
            const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2); // Calculate time taken in seconds
            setEndTime(timeTaken);
            saveScore(timeTaken);
        }
    }, [tiles, startTime]);

    // Save the score to localStorage
    const saveScore = (timeTaken) => {
        const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
        highScores.push({ time: timeTaken });
        highScores.sort((a, b) => a.time - b.time); // Sort by time taken (ascending)
        if (highScores.length > 5) {
            highScores.pop(); // Keep top 5 scores
        }
        localStorage.setItem('highScores', JSON.stringify(highScores));
    };

    // Move tile if possible
    const moveTile = (index) => {
        const emptyIndex = tiles.indexOf(null);
        const isAdjacent =
            [index - 1, index + 1, index - 4, index + 4].includes(emptyIndex);

        if (isAdjacent) {
            const newTiles = [...tiles];
            [newTiles[emptyIndex], newTiles[index]] = [newTiles[index], newTiles[emptyIndex]];
            setTiles(newTiles);
        }
    };

    return (
        <div className="puzzle-game">
            {isSolved && <div className="win-message">Congratulations! Puzzle Solved!<GiPartyPopper /></div>}
            {endTime && <div className="win-message">Time Taken: {endTime} seconds</div>}
            <div className="grid">
                {tiles.map((tile, index) => (
                    <div
                        key={index}
                        className={`tile ${tile === null ? 'empty' : ''}`}
                        onClick={() => moveTile(index)}
                    >
                        {tile}
                    </div>
                ))}
            </div>
            <button className="reset-btn" onClick={initializePuzzle}>
                Reset Puzzle
            </button>
            <button className="music-btn" onClick={toggleMusic}>
                <FcMusic />
                {isPlaying ? 'Pause Music' : 'Play Music'}
            </button>
        </div>
    );
};

export default PuzzleGame;
