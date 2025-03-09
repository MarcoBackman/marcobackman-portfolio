import "../stylesheet/ProjectCard.css";

function ProjectCard({imgSrc, title, type, description, YYYYMM, url}) {

    return (
        <div className={"project-card"}>
            <a href={url}>
                <div className={'project-card-image-container'}>
                    <img src={imgSrc} alt={`${title} image`}/>
                </div>
                <div className={'project-card-text-container'}>
                    {YYYYMM && (<p>{YYYYMM.substring(0, 4)}-{YYYYMM.substring(4, 6)}</p>)}
                    <div className={"project-card-title"}>
                        <h3>{title}</h3>
                        <p>{type}</p>
                    </div>
                    <div className={"project-card-description"}>
                        <p>
                            {description}
                        </p>
                    </div>
                </div>
            </a>
        </div>
    );
}

export default ProjectCard;