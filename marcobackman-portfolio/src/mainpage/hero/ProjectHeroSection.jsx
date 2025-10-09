import React from 'react';
import '../../stylesheet/hero/ProjectHeroSection.scss';
import ProjectCard from "../../common/card/ProjectCard";

function ProjectHeroSection() {

    return (
        <section id={'project-hero-section'} className={'hero-section'}>
            <div className={'project-card-wrapper'}>
                <ProjectCard
                    title={'Project 1'}
                    description={'Project 1 description'}
                    imageUrl={'https://picsum.photos/id/1000/500/300'}
                    link={'/'}
                />
                <ProjectCard
                    title={'Project 1'}
                    description={'Project 1 description'}
                    imageUrl={'https://picsum.photos/id/1000/500/300'}
                    link={'/'}
                />
                <ProjectCard
                    title={'Project 1'}
                    description={'Project 1 description'}
                    imageUrl={'https://picsum.photos/id/1000/500/300'}
                    link={'/'}
                />
            </div>
        </section>
    )
}

export default ProjectHeroSection;