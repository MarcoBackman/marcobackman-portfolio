import "../stylesheet/SkillCard.css";

function SkillCard({keyName, skillData}) {

    const isValidSkillData = Array.isArray(skillData) && skillData.length > 0;

    return (
        <div className={"skill-card"}>
            <div className={"skill-card-title"}>
                <h2>{keyName}</h2>
            </div>
            <div className={"skill-card-list-container"}>
                {isValidSkillData ? (
                    // Render a list of skills if skillData is valid
                    <ul>
                        {skillData.map((skill, index) => (
                            <li className={"skill-detail-list"} key={index}>{skill}</li>
                        ))}
                    </ul>
                ) : (
                    // Render a placeholder or fallback message if skillData is invalid
                    <p className={"skill-detail-placeholder"}>No skills available</p>
                )}
            </div>
        </div>
    );
}

export default SkillCard;
