import "../stylesheet/ProjectList.css";

const ProjectList = ({projectData}) => {

    if (!projectData || projectData.length === 0) return null;

    const fromDate = projectData.fromDate;
    const toDate = projectData.toDate;
    const isCurrentJob = projectData.isCurrentJob;
    const taskArray = projectData.tasks;

    const taskTitleDescriptionSet = taskArray.map((task, index) => {
        let taskTitle;
        if (task.taskTitle) {
            taskTitle= task.taskTitle;
        }

        let descriptionList;
        if (task.taskDescription) {
            descriptionList = task.taskDescription.map((singleTaskDescription, index) => {
                return (<li id={index}>{singleTaskDescription}</li>)
            })
        }

        return (
            <div className={"task-description-wrapper"}>
                <h3 className={"task-title"}>{taskTitle}</h3>
                <ul className={"task-descriptions"}>
                    {descriptionList}
                </ul>
            </div>
        )
    });

    return (
        <div className={"project-list-container"}>
            <div className={"top-section"}>
                <div className={"tl-project-title"}>
                    <h2 className={"project-title"}>{projectData.title}</h2>
                    <h1 className={"department-name"}>{projectData.department}</h1>
                </div>
                <p className={"year-month-label"}>
                    {fromDate && new Date(fromDate).toLocaleDateString("ko-KR", {
                        year: "numeric",
                        month: "long"
                    })} ~ {isCurrentJob ? "Present" : toDate && new Date(toDate).toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "long"
                })}
                </p>
            </div>
            <div className={"project-detail"}>
                {taskTitleDescriptionSet}
            </div>
        </div>);
}

export default ProjectList;