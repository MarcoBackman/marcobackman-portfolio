import NavBar from "../common/NavBar";
import "../stylesheet/MainPage.css";
import {useCallback, useEffect, useRef, useState} from "react";
import Footer from "../common/Footer";
import {useTranslation} from "../context/TranslationContext";
import ProjectCard from "./ProjectCard";
import {FaArrowUp} from "react-icons/fa";
import ExperienceCard from "./ExperienceCard";
import SkillCard from "./SkillCard";

function MainPage() {

    let [backendOnline, setBackendOnline] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [showScrollTop, setShowScrollTop] = useState(false);

    const { language, setLanguage, messages } = useTranslation();
    const mainPageText = messages?.mainPage || {};
    const [experienceData, setExperienceData] = useState([]);
    const [skillData, setSkillData] = useState([]);

    // Track which sections have been loaded
    const [sectionStates, setSectionStates] = useState({
        project: false,
        experience: false,
        skills: false,
        education: false,
        ability: false,
        contact: false,
    });

    // Store refs for each section
    const sectionRefs = useRef({
        project: null,
        experience: null,
        skills: null,
        education: null,
        ability: null,
        contact: null
    });

    //Check server connection
    const checkBackendConnection = async () => {
        setIsLoading(true); // Show the spinner
        const controller = new AbortController();

        const timeoutId = setTimeout(() => controller.abort(), 5000);

        try {
            const response = await fetch("http://localhost:8080/api/v1/hello", {
                signal: controller.signal,
            });

            clearTimeout(timeoutId); // Clear the timeout to prevent unnecessary errors

            if (response.ok) {
                setBackendOnline(true);
            } else {
                setBackendOnline(false);
            }
        } catch (error) {
            if (error.name === "AbortError") {
                console.error("Request timed out");
            } else {
                console.error("Fetch error: ", error.message);
            }
            setBackendOnline(false);
        }

        setIsLoading(false); // Hide spinner after fetch completes
    };

    // Lazy load sections when they are scrolled into view
    const handleSectionLazyLoad = useCallback(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const sectionId = entry.target.id;
                        setSectionStates((prev) => ({
                            ...prev,
                            [sectionId]: true, // Mark the section as loaded when in view
                        }));

                        // Unobserve the section after loading its content
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 } // Trigger when 50% of the section is in view
        );

        Object.values(sectionRefs.current).forEach((section) => {
            if (section) observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        handleSectionLazyLoad();

        // Add scroll event listener for showing the scroll-to-top button
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setShowScrollTop(true); // Show button when scrolled 200px down
            } else {
                setShowScrollTop(false); // Hide button otherwise
            }
        };

        window.addEventListener("scroll", handleScroll);

        // Cleanup event listener on unmount
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleSectionLazyLoad]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth", // Smooth scrolling animation
        });
    };


    /**
     *     // Lazy load sections when they are scrolled into view
     *     const handleIntersection = useCallback(() => {
     *         const observer = new IntersectionObserver(
     *             (entries) => {
     *                 entries.forEach((entry) => {
     *                     const sectionId = entry.target.id;
     *
     *                     // When the section is visible, load its content
     *                     if (entry.isIntersecting) {
     *                         setSectionStates((prev) => ({
     *                             ...prev,
     *                             [sectionId]: true,
     *                         }));
     *                     } else {
     *                         // When the section exits the viewport, reset its content
     *                         setSectionStates((prev) => ({
     *                             ...prev,
     *                             [sectionId]: false,
     *                         }));
     *                     }
     *                 });
     *             },
     *             {
     *                 threshold: 0.5, // Trigger if 50% of the section is visible
     *             }
     *         );
     *
     *         Object.values(sectionRefs.current).forEach((section) => {
     *             if (section) observer.observe(section);
     *         });
     *
     *         return () => observer.disconnect();
     *     }, []);
     *
     *     // Set up Intersection Observer on component mount
     *     useEffect(() => {
     *         handleIntersection();
     *     }, [handleIntersection]);
     */

    // Fetch experience data from the JSON file
    const fetchExperienceData = async () => {
        try {
            const response = await import("../assets/data/experience-data-kr.json"); // Using dynamic import
            setExperienceData(response.default); // Update the state with loaded data
        } catch (error) {
            console.error("Failed to load experience data:", error);
        }
    };

    // Fetch experience data from the JSON file
    const fetchSkillData = async () => {
        try {
            const response = await import("../assets/data/skills.json"); // Using dynamic import
            setSkillData(response.default); // Update the state with loaded data
            console.log(response.default);
        } catch (error) {
            console.error("Failed to load experience data:", error);
        }
    };

    useEffect(() => {
        checkBackendConnection(); // Automatically check backend on page load
        fetchExperienceData(); // Load experience data from the JSON file
        fetchSkillData();
    }, []);

    return (
        <div id={"main-page"}>
            <NavBar backendOnline={backendOnline} isLoading={isLoading}/>
            <div id={"main-img"}>
                <h1>{mainPageText?.mainImage?.firstText}</h1>
                <h3>{mainPageText?.mainImage?.secondText}</h3>
                <h3>{mainPageText?.mainImage?.thirdText}</h3>
            </div>
            <section id={"about-me"}>
                <h1 className="centered-title">{mainPageText?.aboutMe?.aboutMeTitle}</h1>
            </section>
            <section id={"project"}
                     ref={(el) => (sectionRefs.current.project = el)}
                     className={sectionStates.project ? "main-page-section visible" : "main-page-section"}>
                <h1 className="centered-title">{mainPageText?.project?.projectTitle}</h1>
                <div className={"project-content"}>
                    <ProjectCard
                        imgSrc="image1.jpg"
                        title="Project 1"
                        type="Web App"
                        description="This is a description for Project 1. It is an exciting web application."
                        url="https://example.com/project1"
                    />
                    <ProjectCard
                        imgSrc="image2.jpg"
                        title="Project 2"
                        type="Mobile App"
                        description="This is a description for Project 2. A beautiful and responsive app."
                        url="https://example.com/project2"
                    />
                    <ProjectCard
                        imgSrc="image3.jpg"
                        title="Project 3"
                        type="Game"
                        description="Description for Project 3. A fun and interactive game for everyone."
                        url="https://example.com/project3"
                    />
                    <ProjectCard
                        imgSrc="image4.jpg"
                        title="Project 4"
                        type="Website"
                        description="Details about Project 4. A portfolio showcasing beautiful designs."
                        url="https://example.com/project4"
                    />
                    <ProjectCard
                        imgSrc="image5.jpg"
                        title="Project 5"
                        type="API"
                        description="Description for Project 5. A robust and scalable API service."
                        url="https://example.com/project5"
                    />
                    <ProjectCard
                        imgSrc="image6.jpg"
                        title="Project 6"
                        type="E-commerce"
                        description="Overview for Project 6. A platform for shopping and trading."
                        url="https://example.com/project6"
                    />
                </div>
            </section>
            <section id={"experience"}
                     ref={(el) => (sectionRefs.current.experience = el)}
                     className={sectionStates.experience ? "main-page-section visible" : "main-page-section"}>
                <h1 className="left-title">{mainPageText?.experience?.experienceTitle}</h1>
                <div className={"experience-panel"}>
                    {experienceData.map((data, index) => (
                        <ExperienceCard key={index} data={data}/>
                    ))}
                </div>
            </section>
            <section id={"skills"}
                     ref={(el) => (sectionRefs.current.skills = el)}
                     className={sectionStates.skills ? "main-page-section visible" : "main-page-section"}>
                <h1 className="left-title">{mainPageText?.skills?.skillsTitle}</h1>
                <div className={"skill-panel"}>
                    {
                        skillData && Object.entries(skillData).map(([key, value], index) => (
                            <SkillCard key={index} keyName={key} skillData={value}/>
                        ))
                    }
                </div>
            </section>
            <section id={"education"}
                     ref={(el) => (sectionRefs.current.education = el)}
                     className={sectionStates.education ? "main-page-section visible" : "main-page-section"}>
            <h1 className="left-title">{mainPageText?.education?.educationTitle}</h1>
            </section>
            <section id={"ability"}
                     ref={(el) => (sectionRefs.current.ability = el)}
                     className={sectionStates.ability ? "main-page-section visible" : "main-page-section"}>
                <h1 className="left-title">{mainPageText?.ability?.abilityTitle}</h1>
            </section>
            <section id={"contact"}
                     ref={(el) => (sectionRefs.current.contact = el)}
                     className={sectionStates.contact ? "main-page-section visible" : "main-page-section"}>
                <h1 className="left-title">{mainPageText?.contact?.contactTitle}</h1>
            </section>
            <Footer/>
            <div
                className={`scroll-to-top ${showScrollTop ? "visible" : "hidden"}`} // Dynamic class toggle
                onClick={scrollToTop}
            >
                <FaArrowUp/> {/* React Icon */}
            </div>
        </div>
    )
}

export default MainPage;