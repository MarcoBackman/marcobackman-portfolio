import React, { useRef, useEffect } from 'react';
import '../../stylesheet/hero/AboutMeHeroSection.scss';
import BlackButton from "../../common/button/BlackButton";
import * as THREE from 'three';
import DynamicBubbles from "../../graphics/DynamicBubbles";

// --- GLSL Shader Code ---


function AboutMeHeroSection() {

    return (
        <section id={'about-hero-section'} className={'hero-section'}>
            <div className={'about-me-hero-left-panel'}>
                <h2>About Me</h2>
                <p>Full-Stack Developer specializing in Digital Twins and AI for Manufacturing & Logistics SCM</p>
                <div className={'about-me-details'}>
                    <div className={'about-me-details-item'}>
                        <h4>Name: </h4>
                        <p>Sung Jun Baek</p>
                    </div>
                    <div className={'about-me-details-item'}>
                        <h4>Email: </h4>
                        <p>baeksoungjun@gmail.com</p>
                    </div>
                    <div className={'about-me-details-item'}>
                        <h4>From: </h4>
                        <p>Seoul, South Korea</p>
                    </div>
                    <div className={'about-me-details-item'}>
                        <h4>Experience: </h4>
                        <p>4 years</p>
                    </div>
                </div>
                <BlackButton text={'View Resume'} link={'/resume'} onClick={null}/>
            </div>
            <div className={'about-me-hero-right-panel'}>
                <DynamicBubbles backgroundColor={'#E0EBEB'}/>
            </div>
        </section>
    )
}

export default AboutMeHeroSection;