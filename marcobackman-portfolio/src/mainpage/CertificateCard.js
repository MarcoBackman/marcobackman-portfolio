
function CertificateCard({key, data}) {

    let certificateAcquireDate = data?.endDate || '';
    let title = data?.title || '';
    let institution = data?.institution || '';
    let level = data?.level || '';
    let score = data?.score || '';
    let descriptionList = data?.descriptionList || '';
    let imgUrl = data?.imgUrl || '';

    return (
        <div className={"certificate-card"} key={key}>
            <div className={"education-card-header first-row"}>
                <h4>{certificateAcquireDate.replace("-", " / ")}</h4>
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

export default CertificateCard;