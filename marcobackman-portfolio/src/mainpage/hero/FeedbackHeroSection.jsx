import React from 'react';
import '../../stylesheet/hero/FeedbackHeroSection.scss';

function FeedbackHeroSection() {

    const circle = (
        <circle cx="10" cy="10" r="7.5" />
    );

    const triangle = (
        <polygon points="7.5,0 15,15 0,15" />
    );

    const diamond = (
        <polygon points="7.5,0 15,7.5 7.5,15 0,7.5" />
    );

    const ReviewCard = ({ shape, title, description }) => {
        return (
            <div className={'review-card'}>
                <div className={'review-card-title'}>
                    <svg width="20" height="20" viewBox="0 0 20 20">{shape}</svg>
                    <h1>{title}</h1>
                </div>
                <p>{description}</p>
            </div>
        );
    };

    return (
        <section id={'feedback-hero-section'} className={'hero-section'}>
            <div className={'feedback-left-text-section'}>
                <h1>A big idea here that is really exciting</h1>
            </div>
            <div className={'feedback-right-review-card-section'}>
                <div className={'review-card-wrapper'}>
                    <ReviewCard shape={circle} title={'Title'} description={'Description'}/>
                    <ReviewCard shape={triangle} title={'Title'} description={'Description'}/>
                    <ReviewCard shape={diamond} title={'Title'} description={'Description'}/>
                </div>
            </div>
        </section>
    )
}

export default FeedbackHeroSection;