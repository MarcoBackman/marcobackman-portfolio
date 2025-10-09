import React from 'react';

import '../stylesheet/graphics/DynamicBubbles.css'

interface DynamicBubblesProps {
    bubbleCount: number;
    color: string;
    backgroundColor: string;
}

const DynamicBubbles: React.FC<DynamicBubblesProps> = ({bubbleCount, color, backgroundColor}) => {


    return (
        <div className={'dynamic-bubbles-canvas'} style={{backgroundColor: backgroundColor}}>

        </div>
    );
}

export default DynamicBubbles;