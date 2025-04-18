import "../stylesheet/ExperienceCard.css";
import {useTranslation} from "../context/TranslationContext";
import {calculateTotalYearMonth} from "../util/DateTimeUtil";
import {useMemo, useState} from "react";
import ProjectList from "./ProjectList";

function ExperienceCard({data}) {
    const { language, setLanguage, messages } = useTranslation();
    const experienceText = useMemo(() => messages?.mainPage?.experience || {}, [messages]);
    const { projectList, setProjectList } = useState([]);
    const {
        fromDate,
        toDate,
        company,
        "job-description": jobDescription,
        "task-list": taskList,
        "skills": skills,
        "project-description" : projectDescription
    } = data || {};


    const {isCurrentJob, years, months} = calculateTotalYearMonth(fromDate, toDate);
    const totalYearMonth = `${years !== 0 ? years + "Y" : ""}  ${months !== 0 ? months + "M" : ""} `;
    const projectData = projectDescription && projectDescription.length > 0 && projectDescription.map((value) => {
        return <ProjectList projectData={value}/>
    });

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
                        {taskList && taskList.map((task, index) =>
                            <li key={index} className={"work-description-list"}>
                                {task}
                            </li>
                        )}
                    </ul>
                </div>
                <div className={"skill-list"}>
                    <ul>
                        {skills && skills.forEach((skill, index) =>
                            <li key={index} className={"skill-description-list"}>
                                {skill}
                            </li>
                        )}
                    </ul>
                </div>
                <div className={"project-list"}>
                    {projectData}
                </div>
            </div>
        </div>
    )
}

export default ExperienceCard;