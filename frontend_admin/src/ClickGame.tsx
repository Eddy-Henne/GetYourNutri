import { useEffect, useRef, useState } from 'react';

const GAME_DURATION = 30; // in seconds
const OBJECT_APPEAR_INTERVAL = 800; // milliseconds
const GAME_AREA_WIDTH = 300;
const GAME_AREA_HEIGHT = 200;

export default function ClickGame() {
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
    const [activeObject, setActiveObject] = useState({ x: 0, y: 0 });
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const startGame = () => {
        setScore(0);
        setTimeLeft(GAME_DURATION);
        setIsRunning(true);

        intervalRef.current = setInterval(() => {
            const x = Math.random() * (GAME_AREA_WIDTH - 30);
            const y = Math.random() * (GAME_AREA_HEIGHT - 30);

            console.log("Neue Position:", x, y);

            setActiveObject({ x, y });
        }, OBJECT_APPEAR_INTERVAL);

        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    stopGame();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const stopGame = () => {
        setIsRunning(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (timerRef.current) clearInterval(timerRef.current);
    };

    const handleClick = () => {
        if (!isRunning) return;
        setScore((prev) => prev + 1);
    };

    useEffect(() => {
        return () => {
            stopGame();
        };
    }, []);

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <h2 className="text-xl font-bold">Mini-Click-Spiel</h2>
            {!isRunning ? (
                <button onClick={startGame} className="px-4 py-2 bg-blue-600 text-white rounded-xl">Spiel starten</button>
            ) : (
                <div className="text-center">
                    <p>Zeit: {timeLeft}s</p>
                    <p>Punkte: {score}</p>
                </div>
            )}
            <div
                className="relative border border-gray-400 bg-gray-100 rounded-lg overflow-hidden"
                style={{ width: GAME_AREA_WIDTH, height: GAME_AREA_HEIGHT, position: "relative" }}
            >
                {isRunning && (
                    <div
                        onClick={handleClick}
                        className="absolute bg-green-500 rounded-full w-8 h-8 cursor-pointer transition-all duration-300"
                        style={{
                            transform: `translate(${activeObject.x}px, ${activeObject.y}px)`,
                            zIndex: 999999,
                            color: 'black',
                        position: 'absolute',
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            cursor: 'pointer',
                        }}
                    />
                )}
            </div>
        </div>
    );
}
