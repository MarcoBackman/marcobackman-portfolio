import '../../stylesheet/card/ProjectCard.css';
import React from 'react';

interface ProjectCardProps {
    title: string;
    description: string;
    link: string;
    imageUrl: string;
    onClick?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = (
    { title, description, link, imageUrl, onClick }
): React.ReactElement => {

    return (
        <div className={'project-card'} onClick={onClick}>
            <div className="project-image-wrapper">
                <img src={imageUrl} alt={title}/>
            </div>
            <div className={'project-text-wrapper'}>
                <h3>{title}</h3>
                <p>{description}</p>
                <a className={'project-link'} href={link}>
                    See Project
                    <div className={'.arrow-icon'}>
                        &nbsp;&nbsp;→
                    </div>
                </a>
            </div>
        </div>
    );
}

export default ProjectCard;