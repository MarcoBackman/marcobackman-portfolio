import React, {useEffect, useState} from 'react';

import '../../stylesheet/card/DynamicCard.scss';

// Define the types for the component's props for better TypeScript support
interface DynamicCardProps {
    snakeColors: string[];
    animationSpeedMs: number;
    // position allows specifying top, bottom, left, right for the animation container
    position: React.CSSProperties;
    // flexDirection controls the stacking direction of the blocks
    flexDirection: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    backgroundColor?: string;
}

const DynamicCard: React.FC<DynamicCardProps> = ({
                                                     snakeColors,
                                                     animationSpeedMs,
                                                     position,
                                                     flexDirection,
                                                     backgroundColor
                                                 }) => {
    const [visibleBlocks, setVisibleBlocks] = useState<string[]>([]);
    const [isComplete, setIsComplete] = useState(false); // New flag state!

    useEffect(() => {
        if (isComplete) return; // Do nothing if animation is already complete

        const interval = setInterval(() => {
            setVisibleBlocks(prevBlocks => {
                const nextBlockIndex = prevBlocks.length;
                if (nextBlockIndex === snakeColors.length) {
                    clearInterval(interval); // Stop interval when complete
                    setIsComplete(true); // Mark animation as complete
                    return prevBlocks;
                }
                return [...prevBlocks, snakeColors[nextBlockIndex]];
            });
        }, animationSpeedMs);

        return () => clearInterval(interval); // Cleanup function
    }, [snakeColors, animationSpeedMs, isComplete]); // Add `isComplete` to the dependency array

    // Determine animation class based on direction
    const getAnimationClass = () => {
        if (flexDirection.includes('row')) {
            return 'slideIn-horizontal';
        }
        return 'slideIn-vertical';
    };

    return (
        <div className={'DynamicCard'} style={{ backgroundColor }}>
            {/* The inline styles apply the dynamic position and direction */}
            <div
                className={'animation-container'}
                style={{ ...position, flexDirection }}
            >
                {visibleBlocks.map((color, index) => (
                    <div
                        key={index}
                        className={`snake-block ${getAnimationClass()}`}
                        style={{ backgroundColor: color }}
                    />
                ))}
            </div>
        </div>
    );
};

export default DynamicCard;
