import React from 'react';

import '../../stylesheet/button/BlackButton.css';

interface BlackButtonProps {
    text: string;
    link: string;
    onClick?: () => void;
}

const BlackButton: React.FC<BlackButtonProps> = ({ text, link, onClick }
): React.ReactElement => {

    return (
        <button className={'black-button'} onClick={onClick}>
            <a className={'black-button-text'} href={link}>
                {text}
            </a>
        </button>
    );
}

export default BlackButton;