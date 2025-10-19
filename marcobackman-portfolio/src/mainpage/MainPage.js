import { useEffect, useRef, useState } from "react";
import "../stylesheet/MainPage.css";
import IntroHeroSection from "./hero/IntoHeroSection";
import AboutMeHeroSection from "./hero/AboutMeHeroSection";
import ProjectHeroSection from "./hero/ProjectHeroSection";
import CertificateHeroSection from "./hero/CertificateHeroSection";
import FeedbackHeroSection from "./hero/FeedbackHeroSection";

const sections = [
    { id: 'intro', component: <IntroHeroSection /> },
    { id: 'about', component: <AboutMeHeroSection /> },
    { id: 'projects', component: <ProjectHeroSection /> },
    { id: 'certificates', component: <CertificateHeroSection /> },
    { id: 'feedback', component: <FeedbackHeroSection /> },
];

// --- Configuration ---
const SCROLL_THRESHOLD = 2;
const TRANSITION_DURATION = 700; // Adjusted to match the new CSS

function MainPage({ setIsFooterVisible }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const mainPageRef = useRef(null);
    const isAnimating = useRef(false);
    const scrollAccumulator = useRef(0);

    // This effect handles the fade-in animations
    useEffect(() => {
        const currentSection = mainPageRef.current?.children[activeIndex];
        if (currentSection) {
            currentSection.classList.add("visible");
            for (let i = 0; i < mainPageRef.current.children.length; i++) {
                if (i !== activeIndex) {
                    mainPageRef.current.children[i].classList.remove("visible");
                }
            }
        }
    }, [activeIndex]);

    // Main effect for handling the wheel-based navigation
    useEffect(() => {
        const handleWheel = (event) => {
            // We are using the main scroll container, so we don't preventDefault here.
            // This logic is for the transform-based approach. If you are still using
            // the transform approach, uncomment the line below.
            // event.preventDefault();

            if (isAnimating.current) {
                return;
            }

            // --- START: MODIFIED LOGIC ---
            const direction = Math.sign(event.deltaY);

            // Only accumulate scroll if moving towards a valid, existing section
            if (direction === 1 && activeIndex < sections.length - 1) {
                // Scrolling Down
                scrollAccumulator.current += 1;
            } else if (direction === -1 && activeIndex > 0) {
                // Scrolling Up
                scrollAccumulator.current -= 1;
                setIsFooterVisible(false);
            } else {
                // If at a boundary and scrolling further away, reset the accumulator.
                // This prevents the buildup.
                scrollAccumulator.current = 0;
                setIsFooterVisible(true);
            }
            // --- END: MODIFIED LOGIC ---

            let nextIndex = activeIndex;

            // Check thresholds
            if (scrollAccumulator.current >= SCROLL_THRESHOLD) {
                nextIndex = activeIndex + 1;
            } else if (scrollAccumulator.current <= -SCROLL_THRESHOLD) {
                nextIndex = activeIndex - 1;
            }

            // If a section change is triggered
            if (nextIndex !== activeIndex) {
                isAnimating.current = true;
                scrollAccumulator.current = 0;
                setActiveIndex(nextIndex);

                setTimeout(() => {
                    isAnimating.current = false;
                }, TRANSITION_DURATION);
            }
        };

        // This logic seems to be a leftover from a previous version.
        // It's better to attach the listener to the main scroll container if using the sticky method,
        // or the page wrapper if using the transform method.
        // Assuming you are still using the transform method based on the code provided:
        const container = document.querySelector('.page-wrapper'); // Or whichever element is your viewport

        if (container) {
            container.addEventListener("wheel", handleWheel, { passive: true }); // passive: true is fine if not using preventDefault
            return () => {
                container.removeEventListener("wheel", handleWheel);
            };
        }
    }, [activeIndex]);

    // Your JSX remains the same, assuming the transform-based approach
    return (
        <div className="page-wrapper"> {/* This is the event listener target */}
            <div
                id="main-page"
                ref={mainPageRef}
                style={{ transform: `translateY(-${activeIndex * 100}vh)` }}
            >
                {sections.map(({ id, component }) => (
                    <div key={id} className="scroll-section fade-in">
                        <div className="section-content">
                            {component}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MainPage;