import "../stylesheet/SkillCard.css";
import {useTranslation} from "../context/TranslationContext";

function SkillCard({keyName, skillData}) {

    let translationContext = useTranslation();

    function isKorean() {
        return translationContext?.language === "kr";
    }

    let subtitleName = () => {
        switch (keyName.toLowerCase()) {
            case "frontend":
                return (isKorean) ? "프론트엔드" : "Frontend";
            case "backend":
                return (isKorean) ? "백엔드" : "Backend";
            case "languages":
                return (isKorean) ? "프로그램 언어" : "Programming Language";
            case "database":
                return (isKorean) ? "데이터베이스" : "Database";
            case "cloudservices":
                return (isKorean) ? "클라우드 서비스" : "Cloud Services";
            case "testtools" :
                return (isKorean) ? "테스팅 도구" : "Test Tools";
            case "devops" :
                return (isKorean) ? "개발 보조 도구" : "Development Assistance Tools";
            default:
                return keyName;
        }
    }

    const isValidSkillData = Array.isArray(skillData) && skillData.length > 0;

    return (
        <div className={"skill-card"}>
            <div className={"skill-card-title"}>
                <h2>{subtitleName(keyName)}</h2>
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
            <div className={"end-of-skill-card"}></div>
        </div>
    );
}

export default SkillCard;
