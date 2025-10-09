import '../../stylesheet/button/WhiteButton.css';
import React from 'react';

interface WhiteButtonProps {
    text: string;
    link: string;
    onClick?: () => void;
}

const WhiteButton: React.FC<WhiteButtonProps> = ({ text, link, onClick }
): React.ReactElement => {

    return (
        <button className={'white-button'} onClick={onClick}>
            <a className={'white-button-text'} href={link}>
                {text}
            </a>
        </button>
    );
}

export default WhiteButton;