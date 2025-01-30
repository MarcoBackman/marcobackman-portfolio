import "../stylesheet/ExperienceCard.css";
import {useTranslation} from "../context/TranslationContext";

function ExperienceCard({data}) {
    const { language, setLanguage, messages } = useTranslation();
    const experienceText = messages?.mainPage?.experience || {};

    let isCurrentJob = false;

    let { fromDate, toDate, company, "job-description": jobDescription, "task-list": taskList, "skills" : skills } = data;
    let totalYearMonth = "";

    const calculateTotalYearMonth = (fromDate, toDate) => {
        //if toDate is empty, set isCurrentJob True
        if (toDate === null || toDate === "") {
            isCurrentJob = true;
            toDate = new Date(); // Set to today's date
        } else {
            toDate = new Date(toDate); // Convert string to Date object
        }

        fromDate = new Date(fromDate);

        let years = toDate.getFullYear() - fromDate.getFullYear();
        let months = toDate.getMonth() - fromDate.getMonth();

        if (months < 0) {
            years--;
            months += 12;
        }

        // Format the total experience string
        totalYearMonth = `${years !== 0 ? years + "Y" : ""}  ${months !== 0 ? months + "M" : ""} `;
    };

    const singleList = (content) => {
        return <li className={"work-description-list"}>{content}</li>
    }

    const skillLabel = (skill) => {
        return <li className={"experience-card-skill-list"}>{skill}</li>
    }

    calculateTotalYearMonth(fromDate, toDate);

    return (
        <div className={"experience-card"}>
            <div className={"left-section"}>
                <div className={"date"}>
                    <h3 className={"year-month-label"}>
                        {fromDate && new Date(fromDate).toLocaleDateString("ko-KR", {
                            year: "numeric",
                            month: "long"
                        })} ~ {isCurrentJob ? "Present" : toDate && new Date(toDate).toLocaleDateString("ko-KR", {
                        year: "numeric",
                        month: "long"
                    })}
                    </h3>
                </div>
                <div className={"status-cards"}>
                    <div className={"total-year-month"}>{totalYearMonth}</div>
                    {isCurrentJob ? (<div className={"info-label"}>{experienceText?.currentJobLabel}</div>) : ""}
                </div>
            </div>
            <div className={"right-section"}>
                <div className={"company-name"}>
                    <h3>{company}</h3>
                </div>
                <div className={"job-description"}>
                    <p>{jobDescription}</p>
                </div>
                <div className={"work-list"}>
                    <ul>
                        {taskList && taskList.map((task) => singleList(task))}
                    </ul>
                </div>
                <div className={"skill-list"}>
                    <ul>
                        {skills && skills.map((skill) => singleList(skill))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ExperienceCard;