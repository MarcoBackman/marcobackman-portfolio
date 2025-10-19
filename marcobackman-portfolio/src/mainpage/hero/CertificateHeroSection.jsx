import React from 'react';
import '../../stylesheet/hero/CertificateHeroSection.scss';
import CertificateCard from "../../common/card/CertificateCard";

const certificateImagePath = '/images/';

function CertificateHeroSection() {

    return (
        <section id={'certificate-hero-section'} className={'hero-section'}>
            <div className={'certificate-title-wrapper'}>
                <h2>Certificates</h2>
                <p>Proof of my skills. Officially!</p>
            </div>
            <div className={'certificate-card-wrapper'}>
                <CertificateCard
                    title={'Certificate Title'}
                    institution={'Certificate Institution'}
                    imageUrl={certificateImagePath.concat('정보처리기사.png')}
                    description={'Certificate Description'}
                />
                <CertificateCard
                    title={'Certificate Title'}
                    institution={'Certificate Institution'}
                    imageUrl={'Certificate Image Url'}
                    description={'Certificate Description'}
                />
                <CertificateCard
                    title={'Certificate Title'}
                    institution={'Certificate Institution'}
                    imageUrl={'Certificate Image Url'}
                    description={'Certificate Description'}
                />
                <CertificateCard
                    title={'Certificate Title'}
                    institution={'Certificate Institution'}
                    imageUrl={'Certificate Image Url'}
                    description={'Certificate Description'}
                />
            </div>
        </section>
    )
}

export default CertificateHeroSection;