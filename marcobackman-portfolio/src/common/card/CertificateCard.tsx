import React, { useRef, useEffect } from 'react';

import '../../stylesheet/card/CertificateCard.css';

interface CertificateCardProps {
    title: string;
    institution: string;
    imageUrl: string;
    description: string;
}

const CertificateCard: React.FC<CertificateCardProps> = ({
                                                             title,
                                                             institution,
                                                             imageUrl,
                                                             description})=> {
    return (
        <div className={'certificate-card'}>
            <div className={'certificate-card-text-wrapper'}>
                <p>
                    {description}
                </p>
            </div>
            <div className={'certificate-image-wrapper'}>
                <img src={imageUrl} alt={title}/>
                <div className={'certificate-logo-wrapper'}>
                    <h3>{title}</h3>
                    <p>{institution}</p>
                </div>
            </div>
        </div>
    );
};

export default CertificateCard;