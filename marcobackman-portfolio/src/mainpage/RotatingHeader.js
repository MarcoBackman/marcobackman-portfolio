import { useTranslation } from "../context/TranslationContext";
import { useEffect, useState } from "react";
import "../stylesheet/RotatingHeader.css";

const RotatingHeader = ({componentList}) => {

    const [visibleHeaderIndex, setVisibleHeaderIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setVisibleHeaderIndex((prevIndex) => {
                return (prevIndex + 1) % componentList.length;
            });
        }, 5000);

        // Cleanup on component unmount
        return () => clearInterval(interval);
    }, [componentList.length, isPaused]);

    /**
     * add this when you need to stop on hover
     * onMouseEnter={() => setIsPaused(true)}
     * onMouseLeave={() => setIsPaused(false)}
     */

    return (
        <div className="representative-frameworks">
            {componentList.map((component, index) => (
                <div
                    key={index}
                    className={`framework-container ${index === visibleHeaderIndex ? "rotating-header-visible" : "rotating-header-hidden"}`}
                >
                    {component}
                </div>
            ))}
        </div>
    );
};

export default RotatingHeader;