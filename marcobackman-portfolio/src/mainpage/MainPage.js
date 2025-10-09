import "../stylesheet/MainPage.css";
import IntroHeroSection from "./hero/IntoHeroSection";
import AboutMeHeroSection from "./hero/AboutMeHeroSection";
import ProjectHeroSection from "./hero/ProjectHeroSection";
import CertificateHeroSection from "./hero/CertificateHeroSection";
import CompanyHeroSection from "./hero/CompanyHeroSection";
import FeedbackHeroSection from "./hero/FeedbackHeroSection";
import {useEffect, useRef} from "react";

const sections = [
    <IntroHeroSection />,
    <AboutMeHeroSection />,
    <ProjectHeroSection />,
    <CertificateHeroSection />,
    <CompanyHeroSection />,
    <FeedbackHeroSection />,
];

function MainPage() {

    const sectionRefs = useRef([]);

    useEffect(() => {
        // Function to handle intersection
        const handleIntersection = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // When the element is visible, add the "visible" class
                    entry.target.classList.add("visible");
                }
            });
        };

        // Create the Intersection Observer
        const observer = new IntersectionObserver(handleIntersection, {
            threshold: 0.2, // Adjust visibility threshold (20% visible)
        });

        // Observe all sections
        sectionRefs.current.forEach((section) => {
            if (section) observer.observe(section);
        });

        // Cleanup observer on component unmount
        return () => observer.disconnect();
    }, []);

    return (
        <div id="main-page">
            {sections.map((Section, index) => (
                <div
                    key={index}
                    className="fade-in" // Initial fade-in class
                    ref={(el) => (sectionRefs.current[index] = el)} // Assign ref to each section
                >
                    {Section}
                </div>
            ))}
        </div>
    )
}

export default MainPage;