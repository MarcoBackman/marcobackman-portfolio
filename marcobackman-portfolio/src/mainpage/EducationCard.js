

function EducationCard({key, data}) {
    let title = data?.title || '';
    let acquiredDate = data?.endDate || '';
    let institution = data?.institution || '';
    let score = data?.score || '';
    let level = data?.level || '';
    let descriptionList = data?.descriptionList || '';
    let imgUrl = data?.imgUrl || '';

    return (
        <div className={"education-card"} key={key}>
            <div className={"education-card-header"}>
                <h4>{acquiredDate.replace("-", " / ")}</h4>
                <h3>{title}</h3>
            </div>
            <div className={"education-card-score second-row"}>
                <img src={imgUrl} alt={"certificate"}/>
                <div className={"second-row-right-info"}>
                    <h4>{institution}</h4>
                    <div className={"score-level-container"}>
                        <p>{score}</p>
                        <p>{level}</p>
                    </div>
                    <p className={"description-list"}>{descriptionList}</p>
                </div>
            </div>
        </div>
    );
}

export default EducationCard;