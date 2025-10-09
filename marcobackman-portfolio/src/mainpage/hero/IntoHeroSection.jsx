import React from 'react';
import '../../stylesheet/hero/IntroHeroSection.scss';
import BlackButton from "../../common/button/BlackButton";
import WhiteButton from "../../common/button/WhiteButton";
import DynamicCard from "../../common/card/DynamicCard";

function IntroHeroSection() {

    const PALETTE_1 = ['#F7F6C5', '#FF87B2', '#8BC34A', '#26A69A', '#FFCA28'];
    const PALETTE_2 = ['#F44336', '#2196F3', '#FFEB3B', '#212121', '#FFFFFF'];
    const PALETTE_3 = ['#4A235A', '#E91E63', '#FFFFFF', '#212121', '#FF9800'];
    const PALETTE_4 = ['#FF5722', '#FFFFFF', '#607D8B', '#009688', '#E91E63'];

    return (
        <section id={'intro-hero-section'} className={'hero-section'}>
            <div className={'intro-hero-section-content-upper'}>
                <div className={'hero-section-content-text-field'}>
                    <h1>Fullstack <br/> Developer</h1>
                </div>
                <div className={'hero-section-content-button-field'}>
                    <p>Passionate developer with 4 years of experience focused in backend services. <br/>
                        Specialized in creating efficient, scalable, and domain-friendly solutions.</p>
                </div>
                <div className={'intro-hero-button-wrapper'}>
                    <BlackButton text={"Hire Me"} link={"test"}/>
                    <WhiteButton text={"View Main Project"} link={"test"}/>
                </div>
            </div>
            <div className={'intro-hero-section-content-under'}>
                <div className={'intro-hero-section-content-dynamic-card-wrapper'}>
                    {/* Card 1: Bottom-left, stacking up */}
                    <DynamicCard
                        snakeColors={PALETTE_1}
                        animationSpeedMs={120}
                        position={{ bottom: '-10px', left: '20px' }}
                        flexDirection={'column-reverse'}
                        backgroundColor={'#b9e0d4'}
                    />
                    {/* Card 2: Centered, stacking right */}
                    <DynamicCard
                        snakeColors={PALETTE_2}
                        animationSpeedMs={180}
                        position={{ top: 'calc(50% - 20px)', left: '-10px' }}
                        flexDirection={'row'}
                        backgroundColor={'#f0c5a7'}
                    />
                    {/* Card 3: Centered, stacking up */}
                    <DynamicCard
                        snakeColors={PALETTE_3}
                        animationSpeedMs={150}
                        position={{ bottom: 'calc(50% + 10px)', right: 'calc(50% - 20px)' }}
                        flexDirection={'column-reverse'}
                        backgroundColor={'#bacbf8'}
                    />
                    {/* Card 4: Top-right, stacking down */}
                    <DynamicCard
                        snakeColors={PALETTE_4}
                        animationSpeedMs={200}
                        position={{ top: '-10px', right: '20px' }}
                        flexDirection={'column'}
                        backgroundColor={'#d5f0b3'}
                    />
                </div>
            </div>
        </section>
    )
}

export default IntroHeroSection;