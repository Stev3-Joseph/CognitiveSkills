import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Timer = ({ onTimeUpdate }) => {
    const [secondsElapsed, setSecondsElapsed] = useState(() => {
        return parseInt(localStorage.getItem("sectionTimer")) || 0;
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setSecondsElapsed((prev) => {
                const newTime = prev + 1;
                localStorage.setItem("sectionTimer", newTime);
                return newTime;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        onTimeUpdate(secondsElapsed);
    }, [secondsElapsed, onTimeUpdate]);

    return (
        <div className="text-xl bg-gray-800 text-white p-3 w-fit rounded-md">
            Time: {Math.floor(secondsElapsed / 60)}m {secondsElapsed % 60}s
        </div>
    );
};

Timer.propTypes = {
    onTimeUpdate: PropTypes.func.isRequired,
};

export default Timer;
