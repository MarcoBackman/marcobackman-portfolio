import NavBar from "../common/NavBar";
import "../stylesheet/MainPage.css";
import {useCallback, useEffect, useRef, useState} from "react";
import Footer from "../common/Footer";
import {useTranslation} from "../context/TranslationContext";
import ProjectCard from "./ProjectCard";
import {FaArrowUp} from "react-icons/fa";
import ExperienceCard from "./ExperienceCard";
import SkillCard from "./SkillCard";
import RotatingHeader from "./RotatingHeader";
import FirstProjectImg from "../assets/static/platform-cicd.png"
import SecondProjectImg from "../assets/static/NEW플램폼팀_v0.3.png"
import FourthProjectImg from "../assets/static/aod-flow.png"
import FifthProjectImg from "../assets/static/aod-exchange-flow.png"
import SixthProjectImg from "../assets/static/tax-report-application-flow.png"
import DefaultImgIcon from "../assets/icon/default_img.png"
import EducationCard from "./EducationCard";
import CertificateCard from "./CertificateCard";
import {getCurrentDateMonthDate, getTotalDateTimeYear, padToYYYY_MM_DD} from "../util/DateTimeUtil";

function MainPage() {

    let [backendOnline, setBackendOnline] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [showScrollTop, setShowScrollTop] = useState(false);

    const { language, setLanguage, messages } = useTranslation();
    const mainPageText = messages?.mainPage || {};
    const frameWorkTextList = messages?.mainPage?.aboutMe?.frameworkTextList;

    const [careerData, setCareerData] = useState([]);
    const [skillData, setSkillData] = useState([]);
    const [educationData, setEducationData] = useState([]);
    const [certificateData, setCertificateData] = useState([]);
    const [totalExperienceYearMonth, setTotalExperienceYearMonth] = useState({});

    // Track which sections have been loaded
    const [sectionStates, setSectionStates] = useState({
        aboutMe: false,
        project: false,
        career: false,
        skills: false,
        education: false,
        ability: false,
        contact: false,
    });

    // Store refs for each section
    const sectionRefs = useRef({
        aboutMe: null,
        project: null,
        career: null,
        skills: null,
        education: null,
        ability: null,
        contact: null
    });

    //Check server connection
    const checkBackendConnection = async () => {
        setIsLoading(true); // Show the spinner
        const controller = new AbortController();

        const timeoutId = setTimeout(() => controller.abort(), 7000);

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
            { threshold: 0.1 }
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
            if (window.scrollY > 850) {
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

    const calculateTotalCareerYearMonth = async () => {
        if (careerData) {
            const filteredCareerData = careerData
                .filter((element) => element['is-development-career'] === true )
                .map((filteredDateSet) => {

                    let paddedFromDate = padToYYYY_MM_DD(filteredDateSet.fromDate || ""); // Pad the fromDate
                    let paddedToDate = padToYYYY_MM_DD(filteredDateSet.toDate || getCurrentDateMonthDate());

                    if (filteredDateSet.toDate === null || !filteredDateSet.toDate || filteredDateSet.toDate === "") {
                        paddedToDate = getCurrentDateMonthDate();
                    }
                    return {paddedFromDate, paddedToDate};
                });
            const totalCareerDate = getTotalDateTimeYear(filteredCareerData);
            setTotalExperienceYearMonth(totalCareerDate);
        }
    }

    const frameworkInfo = () => {

        let firstFramework = (
            <div className={"representative-framework-container"}>
                <svg viewBox="0 0 163 56" fill="#61DAFB"
                     xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M42.46 2.23633H42.277C41.2808 2.25666 40.2236 2.49452 39.1461 2.893C36.9809 3.68792 34.6328 5.16288 32.244 7.24268C31.7764 7.65031 31.2986 8.08741 30.8208 8.54484C30.5057 8.23989 30.1906 7.95526 29.8755 7.67064C27.3443 5.42616 24.8539 3.84751 22.5769 2.99668C21.4384 2.57178 20.3304 2.31663 19.2935 2.29224C18.2567 2.26682 17.291 2.47013 16.4473 2.96212C14.8005 3.91053 13.906 5.7789 13.5197 8.04675C13.1232 10.3278 13.2249 13.0927 13.8348 16.2033C13.9568 16.8234 14.0991 17.4536 14.2617 18.1042C13.5298 18.3075 12.8183 18.5311 12.1474 18.7649C9.18626 19.7916 6.79135 21.0927 5.0714 22.5565C3.35145 24.0305 2.23633 25.7382 2.23633 27.5985C2.23633 29.5197 3.40837 31.2986 5.22083 32.8437C7.03328 34.399 9.56238 35.7814 12.6861 36.8386C13.1842 37.0114 13.6925 37.1741 14.2211 37.3265C14.0483 38.0178 13.8958 38.6988 13.7738 39.3596C13.1944 42.4396 13.1232 45.1639 13.5298 47.3901C13.9466 49.6163 14.8717 51.4358 16.4879 52.3608C18.1448 53.3265 20.2694 53.1944 22.526 52.4015C24.7725 51.6086 27.2224 50.1042 29.7027 47.9288C30.0991 47.5832 30.4955 47.2173 30.892 46.831C31.4104 47.3291 31.9288 47.8069 32.4473 48.2439C34.8157 50.2872 37.1334 51.7103 39.2681 52.4625C41.4028 53.2147 43.446 53.3265 45.0521 52.3913C46.7192 51.4257 47.6645 49.5248 48.1016 47.1766C48.5387 44.8284 48.4574 41.9517 47.817 38.7192C47.7154 38.2211 47.6035 37.7027 47.4816 37.1944C47.8373 37.0826 48.1931 36.9708 48.5387 36.8589C51.7509 35.8018 54.3634 34.4396 56.2439 32.8945C58.1245 31.3494 59.3443 29.5603 59.3443 27.5985C59.3443 25.7077 58.1753 24 56.4066 22.5159C54.6379 21.0419 52.188 19.7408 49.1893 18.7141C48.5997 18.5108 47.9898 18.3176 47.3596 18.1347C47.4612 17.7179 47.5629 17.3011 47.6442 16.8844C48.3253 13.5705 48.4473 10.6226 48.0508 8.22057C47.6442 5.81956 46.709 3.86784 45.0114 2.88792C44.249 2.44471 43.3748 2.24344 42.46 2.23633ZM42.2872 4.69122C42.9276 4.67496 43.4358 4.79287 43.7916 5.00126C44.5642 5.44344 45.3062 6.63277 45.6417 8.61701C45.9771 10.6124 45.8856 13.296 45.2452 16.3863C45.1639 16.7624 45.0826 17.1385 44.9911 17.5248C42.6328 16.9758 40.061 16.5692 37.357 16.3151C35.8018 14.0991 34.1753 12.0661 32.5286 10.2872C32.9758 9.86733 33.4028 9.46072 33.8399 9.08461C36.0661 7.15221 38.2109 5.83582 39.9898 5.18322C40.8742 4.85691 41.6467 4.70748 42.2872 4.69122ZM19.0292 4.74713H19.2732C19.9542 4.76644 20.7776 4.9301 21.723 5.28182C23.6137 5.98728 25.9009 7.40634 28.249 9.50037C28.5337 9.7545 28.8183 10.0188 29.1029 10.2973C27.4561 12.0661 25.8196 14.0889 24.244 16.3049C21.5502 16.5591 18.9784 16.9657 16.6302 17.4943C16.4778 16.8945 16.3456 16.3049 16.2338 15.7357C15.6645 12.8488 15.6035 10.3278 15.9187 8.46352C16.244 6.60024 16.9453 5.49224 17.6671 5.07343C18.0025 4.87928 18.46 4.76034 19.0292 4.74611V4.74713ZM30.8208 12.0457C31.9492 13.2554 33.0673 14.6175 34.1753 16.0915C33.0673 16.0406 31.9288 16.0102 30.7903 16.0102C29.662 16.0102 28.5438 16.0406 27.4358 16.0915C28.554 14.6175 29.6925 13.2656 30.8208 12.0457ZM76.9708 14.465V37.7636H79.878V28.5032H84.5235L90.46 37.7636H93.8856L87.5934 28.2592C90.7751 27.9746 93.6417 25.6772 93.6417 21.479C93.6417 17.1893 90.6023 14.465 86.3329 14.465H76.9708ZM150.851 16.2744V20.8894H148.107V23.1969H150.851V34.2363C150.851 36.7471 152.173 38.1804 154.612 38.1804C156.137 38.1804 157.154 37.723 157.764 37.0927L156.95 35.141C156.645 35.5273 155.934 35.8424 155.222 35.8424C154.104 35.8424 153.494 34.9276 153.494 33.6772V23.1969H156.95V20.8894H153.494V16.2744H150.851ZM79.878 17.047H85.9873C88.7421 17.047 90.6328 18.8666 90.6328 21.479C90.6328 24.1016 88.7421 25.9517 85.9873 25.9517H79.878V17.047ZM30.7903 18.4498C32.5692 18.4498 34.3075 18.521 35.9949 18.6429C36.9504 20.0457 37.8755 21.5197 38.7598 23.0445C39.6442 24.5692 40.4676 26.1042 41.2096 27.6188C40.4676 29.1537 39.6544 30.709 38.7598 32.244C37.8755 33.7789 36.9606 35.2528 36.0152 36.6658C34.3176 36.7878 32.5692 36.8488 30.7903 36.8488C29.0318 36.8488 27.3037 36.7878 25.6163 36.6861C24.6607 35.2732 23.7255 33.7992 22.831 32.2643C21.9365 30.7293 21.1232 29.1842 20.3913 27.6595C21.1232 26.1245 21.9365 24.5896 22.8208 23.0546C23.7052 21.5197 24.6404 20.0457 25.5959 18.6429C27.2833 18.521 29.0216 18.4498 30.7903 18.4498ZM22.4549 18.9581C21.8551 19.8933 21.2757 20.8488 20.7065 21.8348C20.1372 22.8208 19.6086 23.8068 19.1004 24.7827C18.3786 23.0953 17.7789 21.4384 17.2808 19.8526C18.9072 19.4866 20.6353 19.1919 22.4549 18.9581ZM39.1258 18.9682C40.9555 19.1919 42.7039 19.507 44.3304 19.8729C43.8424 21.4587 43.2224 23.1054 42.5006 24.7929C41.9822 23.8068 41.4333 22.8107 40.864 21.8246C40.2948 20.8488 39.7154 19.8933 39.1258 18.9682ZM14.9123 20.4523C15.6239 22.7598 16.5591 25.1893 17.6976 27.6595C16.5387 30.1703 15.5934 32.6302 14.8717 34.9682C14.3939 34.8361 13.9263 34.6836 13.4689 34.5311C10.5819 33.5451 8.30291 32.2744 6.80761 30.9936C5.3113 29.7128 4.67597 28.4727 4.67597 27.5985C4.67597 26.7548 5.2564 25.6163 6.65717 24.4168C8.05691 23.2173 10.2058 22.0178 12.9504 21.0622C13.5705 20.8488 14.2312 20.6455 14.9123 20.4523ZM103.99 20.4727C99.1614 20.4727 95.6645 24.4168 95.6645 29.3062C95.6645 34.5819 99.263 38.1804 104.193 38.1804C106.938 38.1804 109.276 37.2757 110.902 35.5985L109.682 33.8805C108.361 35.2427 106.429 36.0152 104.498 36.0152C100.869 36.0152 98.6328 33.3621 98.4295 30.1804H112.02V29.5197C112.02 24.4473 109.072 20.4727 103.99 20.4727ZM122.084 20.4727C119.339 20.4727 117.205 21.3774 115.375 23.2681L116.595 25.0775C118.119 23.4714 119.746 22.7395 121.779 22.7395C124.219 22.7395 126.048 24.0305 126.048 26.3075V29.3469C124.625 27.7713 122.694 27.0394 120.457 27.0394C117.611 27.0394 114.562 28.8183 114.562 32.5896C114.562 36.2592 117.611 38.1804 120.457 38.1804C122.694 38.1804 124.625 37.3774 126.048 35.8424V37.7636H128.59V26.1652C128.59 22.0788 125.642 20.4727 122.084 20.4727ZM140.788 20.4727C135.807 20.4727 132.351 24.3151 132.351 29.3062C132.351 34.338 135.807 38.1804 140.788 38.1804C143.837 38.1804 145.667 36.9199 146.989 35.2427L145.26 33.6366C144.142 35.141 142.719 35.8424 140.991 35.8424C137.332 35.8424 135.095 33.047 135.095 29.3062C135.095 25.5654 137.332 22.8107 140.991 22.8107C142.719 22.8107 144.142 23.4714 145.26 25.0063L146.989 23.4002C145.667 21.723 143.837 20.4727 140.788 20.4727ZM46.709 20.4828C47.2884 20.6556 47.8577 20.8386 48.3964 21.0216C51.1817 21.9771 53.3977 23.1766 54.8513 24.3964C56.2948 25.6061 56.9047 26.7649 56.9047 27.5985C56.9047 28.4828 56.2541 29.723 54.6988 31.0038C53.1334 32.2846 50.7649 33.5553 47.7764 34.5514C47.4612 34.6531 47.1461 34.7547 46.8208 34.8462C46.0889 32.5286 45.1029 30.0889 43.9237 27.6188C45.0622 25.1791 45.9974 22.7802 46.709 20.4828ZM30.7903 22.5057C29.4402 22.5076 28.146 23.0447 27.1913 23.9994C26.2366 24.9541 25.6995 26.2484 25.6976 27.5985C25.6968 28.9503 26.2327 30.2472 27.1877 31.2041C28.1427 32.1609 29.4385 32.6995 30.7903 32.7014C31.4606 32.7018 32.1243 32.5701 32.7436 32.3138C33.3629 32.0575 33.9256 31.6816 34.3995 31.2077C34.8735 30.7337 35.2493 30.171 35.5056 29.5517C35.7619 28.9324 35.8937 28.2687 35.8933 27.5985C35.8914 26.2466 35.3528 24.9508 34.3959 23.9958C33.4391 23.0409 32.1422 22.5049 30.7903 22.5057ZM103.888 22.6379C107.751 22.6379 109.377 25.7484 109.479 28.2592H98.4295C98.5616 25.6772 100.351 22.6379 103.888 22.6379ZM121.372 28.9199C123.202 28.9199 125.032 29.6213 126.048 31.014V34.1957C125.032 35.5985 123.202 36.2897 121.372 36.2897C118.933 36.2897 117.205 34.7548 117.205 32.6302C117.205 30.4549 118.933 28.9199 121.372 28.9199ZM42.5311 30.4447C43.2833 32.1728 43.9339 33.8602 44.4422 35.4663C42.7852 35.8424 40.9962 36.1474 39.1258 36.371C39.7154 35.4257 40.3049 34.4498 40.8742 33.4638C41.4536 32.4574 42.0025 31.4511 42.5311 30.4447ZM19.1004 30.526C19.6086 31.5121 20.1474 32.4981 20.7166 33.4841C21.296 34.4803 21.8958 35.4562 22.5057 36.4117C20.6556 36.2084 18.8869 35.9237 17.2503 35.568C17.7484 33.9517 18.3685 32.2643 19.1004 30.526ZM45.1131 37.8145C45.2351 38.2821 45.3367 38.7497 45.4282 39.1969C46.0178 42.1855 46.0584 44.798 45.7027 46.7293C45.3469 48.6709 44.5845 49.8399 43.8323 50.277C43.1004 50.7039 41.8196 50.7751 40.0813 50.1652C38.3431 49.5451 36.2287 48.2846 34.033 46.3939C33.5553 45.9873 33.0775 45.5502 32.5997 45.0826C34.2363 43.2935 35.8424 41.2401 37.3875 39.0038C40.1321 38.7598 42.7344 38.3634 45.1131 37.8145ZM16.5896 37.9263C18.9682 38.4549 21.5603 38.8208 24.2846 39.0343C25.8704 41.2706 27.5273 43.3138 29.1842 45.0927C28.8183 45.4485 28.4625 45.784 28.0966 46.0991C25.8094 48.1016 23.5629 49.4434 21.7128 50.094C19.8526 50.7547 18.46 50.6836 17.7077 50.2465C16.9758 49.8297 16.2744 48.7522 15.9288 46.9428C15.5934 45.1334 15.634 42.6734 16.1728 39.817C16.2846 39.2071 16.4269 38.5769 16.5896 37.9263ZM34.2363 39.2071C33.1283 40.7116 32.0102 42.094 30.892 43.3342C29.7433 42.094 28.5845 40.7115 27.4562 39.2274C28.554 39.2681 29.662 39.2884 30.7903 39.2884C31.9492 39.2884 33.0978 39.2579 34.2363 39.2071Z"
                        fill="#61DAFB"></path>
                </svg>
                <div className={"representative-framework-text-area"}>
                    <h3>{frameWorkTextList?.reactSection?.title}</h3>
                    <p>{frameWorkTextList?.reactSection?.content}</p>
                </div>
            </div>
        );

        let secondFramework = (
            <div className={"representative-framework-container"}>
                <svg viewBox="0 0 120 56" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M39.17 13.265a17.24 17.24 0 0 1-1.998 3.544c-4.778-4.776-11.755-6.613-18.265-4.8S7.357 18.966 5.717 25.52 6.086 39 10.98 43.66l.693.612a18.75 18.75 0 0 0 30.781-13.005c.51-4.775-.89-10.817-3.284-18zM13.647 43.767c-.408.504-1.08.713-1.702.53s-1.072-.725-1.14-1.37.26-1.267.83-1.577 1.27-.244 1.774.164c.687.557.793 1.566.236 2.254zm25.444-5.616c-4.628 6.165-14.51 4.086-20.847 4.384 0 0-1.123.066-2.254.252 0 0 .426-.182.972-.387 4.45-1.55 6.553-1.847 9.256-3.238 5.09-2.587 10.123-8.253 11.17-14.143-1.936 5.666-7.815 10.538-13.167 12.517-3.668 1.352-10.294 2.668-10.294 2.668l-.267-.143C9.15 37.87 9.01 28.106 17.2 24.957c3.6-1.383 7.025-.624 10.902-1.55 4.14-.984 8.93-4.086 10.88-8.133 2.18 6.475 4.806 16.6.097 22.88z"
                        fill="#6DB33F"/>
                    <g transform="matrix(.57047 0 0 .57047 11.197731 16.054489)"
                       fill="#6DB33F">
                        <path
                            d="M61.807 35.152a2.11 2.11 0 0 1-1.019-1.906 2.197 2.197 0 0 1 2.227-2.222 2.401 2.401 0 0 1 1.177.316 12.656 12.656 0 0 0 6.902 2.314c2.36 0 3.72-1.02 3.72-2.6v-.087c0-1.86-2.55-2.498-5.357-3.36-3.537-1.02-7.488-2.452-7.488-7.034v-.092c0-4.542 3.767-7.3 8.533-7.3a16.505 16.505 0 0 1 7.493 1.957 2.335 2.335 0 0 1 1.315 2.09 2.212 2.212 0 0 1-2.268 2.227 2.131 2.131 0 0 1-1.086-.275c-1.952-1.02-3.95-1.636-5.607-1.636-2.13 0-3.36 1.02-3.36 2.36v.092c0 1.77 2.6 2.498 5.403 3.405 3.497 1.1 7.442 2.676 7.442 6.988v.092c0 5.036-3.904 7.53-8.895 7.53a16.377 16.377 0 0 1-9.134-2.86zm20.1-19.196a2.712 2.712 0 0 1 2.717-2.768 2.752 2.752 0 0 1 2.768 2.768v1.662c1.77-2.498 4.266-4.496 8.155-4.496 5.607 0 11.117 4.445 11.117 12.437v.092c0 7.94-5.45 12.432-11.117 12.432-4 0-6.5-1.998-8.155-4.22v8.46a2.747 2.747 0 0 1-5.495 0zm19.2 9.685v-.092c0-4.628-3.135-7.646-6.856-7.646s-6.988 3.1-6.988 7.646v.092c0 4.587 3.267 7.646 6.988 7.646s6.856-2.926 6.856-7.66zm7.66-9.68a2.712 2.712 0 0 1 2.722-2.768 2.747 2.747 0 0 1 2.768 2.768v1.32c.275-2.04 3.634-4.078 6.035-4.078a2.549 2.549 0 0 1 2.722 2.722 2.579 2.579 0 0 1-2.176 2.635c-3.904.678-6.58 4.078-6.58 8.823v7.9a2.737 2.737 0 0 1-2.768 2.722 2.702 2.702 0 0 1-2.722-2.722zm16.326.012a2.717 2.717 0 0 1 2.722-2.768 2.752 2.752 0 0 1 2.768 2.768V35.3a2.747 2.747 0 0 1-5.49 0zm8.263.01a2.712 2.712 0 0 1 2.722-2.768 2.752 2.752 0 0 1 2.768 2.768v1.126a8.492 8.492 0 0 1 7.488-3.904c5.398 0 8.533 3.63 8.533 9.175v12.906a2.676 2.676 0 0 1-2.722 2.722 2.717 2.717 0 0 1-2.788-2.722V24.07c0-3.72-1.86-5.857-5.128-5.857-3.176 0-5.398 2.227-5.398 5.948v11.122a2.747 2.747 0 0 1-5.49 0zm45.65-2.84a2.752 2.752 0 0 0-2.768 2.768v1.63c-1.77-2.498-4.266-4.5-8.156-4.5-5.607 0-11.122 4.445-11.122 12.432v.092c-.015 7.947 5.434 12.432 11.107 12.432 3.97 0 6.463-1.973 8.155-4.185-.275 4.317-2.916 6.596-7.55 6.596a14.67 14.67 0 0 1-7.371-1.901 2.187 2.187 0 0 0-.994-.224 2.319 2.319 0 0 0-2.319 2.263 2.253 2.253 0 0 0 1.529 2.182 20.679 20.679 0 0 0 9.256 2.136c4.312 0 7.67-1.02 9.853-3.22 1.993-1.998 3.058-5 3.058-9.032V15.9a2.717 2.717 0 0 0-2.681-2.768zm-9.623 20.108c-3.767 0-6.85-2.95-6.85-7.67v-.092c0-4.628 3.13-7.646 6.85-7.646s6.988 3.063 6.988 7.646v.092c0 4.582-3.262 7.67-6.988 7.67z"/>
                        <circle r="2.768" cy="6.588" cx="127.841"/>
                    </g>
                </svg>
                <div className={"representative-framework-text-area"}>
                    <h3>{frameWorkTextList?.javaSpringSection?.title}</h3>
                    <p>{frameWorkTextList?.javaSpringSection?.content}</p>
                </div>
            </div>
        );

        let thirdFramework = (
            <div className={"representative-framework-container"}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="1.578 2.062 116.844 43.875">
                    <path
                        d="M39.328 18.156c-2.287 0-4.84.881-5.375 3.781-.057.308.147.455.344.5l2.344.281c.217-.011.364-.247.406-.469.2-.998 1.021-1.469 1.938-1.469.495 0 1.051.17 1.344.625.336.507.312 1.196.312 1.781v.344c-1.393.16-3.227.257-4.531.844-1.505.669-2.562 2.03-2.562 4.031 0 2.564 1.571 3.844 3.594 3.844 1.708 0 2.652-.401 3.969-1.781.437.65.577.945 1.375 1.625a.481.481 0 0 0 .562-.062v.031c.48-.438 1.353-1.234 1.844-1.656.196-.164.153-.434 0-.656-.439-.622-.906-1.124-.906-2.281v-3.844c0-1.628.138-3.129-1.031-4.25-.923-.907-2.459-1.219-3.627-1.219zm31.5 0c-2.288 0-4.839.881-5.375 3.781-.057.308.146.455.344.5l2.344.281c.217-.011.365-.247.406-.469.201-.998 1.021-1.469 1.938-1.469.496 0 1.051.17 1.344.625.335.507.281 1.196.281 1.781v.344c-1.393.16-3.195.257-4.5.844-1.506.669-2.562 2.03-2.562 4.031 0 2.564 1.572 3.844 3.594 3.844 1.706 0 2.65-.401 3.969-1.781.436.65.577.945 1.375 1.625.18.096.403.086.562-.062v.031c.48-.438 1.353-1.234 1.844-1.656.195-.164.15-.434 0-.656-.439-.622-.906-1.124-.906-2.281v-3.844c0-1.628.105-3.129-1.062-4.25-.924-.907-2.428-1.219-3.596-1.219zm-17.719.125c-1.478 0-2.574.746-3.156 2.344h-.031v-1.656a.472.472 0 0 0-.438-.438h-2.25a.476.476 0 0 0-.469.469v12.656a.486.486 0 0 0 .438.438h2.406a.474.474 0 0 0 .469-.469v-6.719c0-1.465-.071-3.469 1.656-3.469 1.705 0 1.469 2.059 1.469 3.469v6.719c0 .239.195.453.438.469h2.406a.474.474 0 0 0 .469-.469v-6.719c0-.719-.029-1.766.219-2.406.247-.64.854-1.062 1.438-1.062.696 0 1.227.243 1.406 1.094.112.506.062 1.843.062 2.375v6.719c0 .239.195.453.438.469h2.406a.474.474 0 0 0 .469-.469v-8c0-1.359.137-2.902-.625-3.969-.673-.958-1.773-1.375-2.781-1.375-1.414 0-2.729.746-3.312 2.344-.674-1.598-1.624-2.345-3.127-2.345zm40.907 0c-3.477 0-5.406 3.057-5.406 7 0 3.916 1.908 7.062 5.406 7.062 3.365 0 5.5-3.074 5.5-6.938 0-3.993-1.934-7.124-5.5-7.124zm13.718 0c-1.661 0-2.61.831-3.281 2.562h-.031v-1.938c-.043-.196-.228-.332-.438-.344h-2.219a.462.462 0 0 0-.469.406v12.656a.48.48 0 0 0 .438.469h2.375a.476.476 0 0 0 .469-.469v-6.812c0-.854.072-1.633.406-2.406.27-.613.791-1 1.375-1 1.658 0 1.5 2.021 1.5 3.406v6.875a.474.474 0 0 0 .438.406h2.406c.236 0 .441-.18.469-.406v-7.969c0-1.225.003-2.927-.625-3.938-.673-1.091-1.738-1.498-2.813-1.498zm-28.875.219c-.244 0-.437.194-.438.469v1.812c.001.271.188.467.438.469h4.125l-4.719 6.969c-.288.449-.312.958-.312 1.25v1.844c0 .266.289.555.562.406 2.689-1.468 5.912-1.338 8.344-.031.295.161.594-.141.594-.406v-1.938a.822.822 0 0 0-.438-.688c-1.38-.794-2.982-1.037-4.5-1l4.094-6c.379-.539.591-.864.594-1.125v-1.562c0-.269-.184-.469-.438-.469h-7.906zm15.157 2.375c.762 0 1.324.34 1.594 1.219.312 1.013.344 2.278.344 3.344 0 1.624-.076 4.312-1.938 4.312-1.883 0-1.875-3.328-1.875-4.875 0-1.543.103-4 1.875-4zM40.609 25.5v.531c0 .961.035 1.77-.438 2.625-.382.695-.982 1.125-1.656 1.125-.92 0-1.469-.746-1.469-1.812.001-2.102 1.827-2.469 3.563-2.469zm31.5 0v.531c0 .961.035 1.77-.438 2.625-.382.695-.979 1.125-1.656 1.125-.921 0-1.469-.746-1.469-1.812.001-2.102 1.825-2.469 3.563-2.469z"
                        fill="#FFAD32"/>
                    <path
                        d="M87.703 32.5v1.812h1.219V32.5h-1.219zm-35.344.312v12.906h1.125v-1.156c.24.458.513.801.844 1.031.33.23.709.344 1.125.344.826 0 1.539-.422 2.156-1.281s.938-2.104.938-3.688c0-1.037-.133-1.896-.406-2.625-.273-.727-.638-1.268-1.094-1.625s-.974-.562-1.531-.562a2 2 0 0 0-1.094.312c-.325.208-.588.547-.844.969v-4.625h-1.219zm11.563 3.032c-.848 0-1.521.251-2 .75-.479.498-.719 1.141-.719 1.938 0 .463.104.854.281 1.219s.432.658.75.875c.32.217.958.502 1.906.812.656.211 1.048.391 1.219.531.248.205.375.474.375.844 0 .428-.148.785-.438 1.062-.289.279-.691.406-1.219.406s-.963-.148-1.281-.469-.49-.809-.562-1.469l-1.219.25c.275 2.005 1.275 3.001 3 3 .92 0 1.624-.261 2.156-.812s.812-1.295.812-2.188c0-.482-.085-.9-.25-1.25s-.392-.609-.688-.812c-.297-.202-.959-.472-1.969-.812-.734-.257-1.164-.445-1.312-.562-.249-.198-.375-.468-.375-.812 0-.352.116-.65.375-.875s.658-.344 1.188-.344c.932 0 1.453.512 1.562 1.531l1.188-.188c-.082-.645-.223-1.154-.438-1.5s-.533-.638-.938-.844c-.404-.205-.869-.281-1.404-.281zm7.469 0c-.977 0-1.801.402-2.438 1.25s-.938 2.076-.938 3.688c0 1.553.307 2.77.938 3.594.631.823 1.449 1.219 2.469 1.219.811 0 1.483-.243 2.031-.75.549-.507.947-1.253 1.156-2.25l-1.25-.219c-.359 1.277-1.021 1.904-1.938 1.906-.584 0-1.061-.248-1.469-.781-.408-.534-.639-1.326-.688-2.375h5.375v-.438c0-1.577-.314-2.761-.938-3.594-.622-.833-1.379-1.25-2.31-1.25zm7.406 0c-.292 0-.547.099-.781.312s-.5.655-.781 1.312V36.03h-1.094v9.344h1.219V40.5c0-.68.064-1.334.219-1.938.088-.346.254-.619.469-.812s.46-.281.719-.281c.287 0 .572.115.875.344l.406-1.469c-.426-.34-.843-.5-1.251-.5zm14.937 0c-.965 0-1.76.406-2.375 1.219-.613.812-.938 2.032-.938 3.656 0 1.611.328 2.832.938 3.656.609.823 1.371 1.219 2.312 1.219.777 0 1.445-.289 2-.875s.893-1.448 1.031-2.562l-1.188-.188c-.088.797-.296 1.37-.625 1.75-.329.378-.725.562-1.188.562-.59 0-1.092-.275-1.469-.844s-.562-1.479-.562-2.75c0-1.232.199-2.121.594-2.688s.898-.875 1.5-.875c.402 0 .745.156 1.031.469.288.312.479.808.594 1.438l1.188-.25c-.143-.984-.459-1.727-.969-2.219-.51-.493-1.129-.718-1.874-.718zm6.969 0c-.977 0-1.801.402-2.438 1.25s-.938 2.076-.938 3.688c0 1.553.307 2.77.938 3.594.632.823 1.449 1.219 2.469 1.219.809 0 1.482-.243 2.031-.75.548-.507.946-1.253 1.156-2.25l-1.25-.219c-.359 1.277-.992 1.904-1.906 1.906-.584 0-1.092-.248-1.5-.781-.408-.534-.638-1.326-.688-2.375h5.375v-.438c0-1.577-.314-2.761-.938-3.594-.62-.833-1.379-1.25-2.311-1.25zm7.219 0c-.85 0-1.521.251-2 .75-.48.498-.719 1.141-.719 1.938 0 .463.073.854.25 1.219.176.364.43.658.75.875.318.217.959.502 1.906.812.654.211 1.079.391 1.25.531.248.205.375.474.375.844 0 .428-.148.785-.438 1.062-.288.279-.691.406-1.219.406-.529 0-.963-.148-1.281-.469s-.523-.809-.594-1.469l-1.219.25c.275 2.005 1.273 3.001 3 3 .921 0 1.655-.261 2.188-.812s.812-1.295.812-2.188c0-.482-.085-.9-.25-1.25s-.422-.609-.719-.812c-.296-.202-.928-.472-1.938-.812-.734-.257-1.195-.445-1.344-.562-.249-.198-.375-.468-.375-.812 0-.352.147-.65.406-.875s.66-.344 1.188-.344c.932 0 1.453.512 1.562 1.531l1.188-.188c-.083-.645-.222-1.154-.438-1.5a2.338 2.338 0 0 0-.938-.844c-.401-.205-.869-.281-1.403-.281zm-27.875.187l2.719 9.344h1.156l2.719-9.344h-1.25l-1.594 5.719c-.193.691-.363 1.288-.469 1.781-.133-.621-.26-1.273-.438-1.906l-1.562-5.594h-1.281zm7.656 0v9.344h1.219v-9.344h-1.219zm-40.062.125c-.967 0-1.745.434-2.375 1.281-.631.848-.969 2.076-.969 3.688 0 1.553.312 2.739.938 3.562s1.459 1.25 2.469 1.25c.802 0 1.457-.274 2-.781.542-.507.917-1.253 1.125-2.25l-1.219-.188c-.355 1.277-1 1.904-1.906 1.906-.579 0-1.065-.248-1.469-.781-.404-.534-.639-1.326-.688-2.375h5.312l.031-.438c0-1.577-.32-2.792-.938-3.625s-1.39-1.249-2.311-1.249zm-13.719.219l2.188 9.344h1.281l1.438-7.188.25 1.594 1.156 5.594h1.25l2.219-9.344h-1.156l-1.219 5.406-.406 1.812-.375-1.812-1.062-5.406h-1.25l-1.125 5.469-.375 1.938-.438-2-1.125-5.406h-1.251zm77.781.094v.438h1.188v3.125h.469v-3.125h1.188v-.438h-2.845zm3.313 0v3.562h.438V37l1.031 3.031h.438l1.031-2.969v2.969h.469v-3.562h-.656l-.844 2.5c-.085.25-.146.431-.188.562l-.188-.531-.844-2.531h-.687zm-43.657.656c.607 0 1.107.294 1.5.875.27.398.445 1.004.5 1.812h-4.031c.038-.82.27-1.453.656-1.938s.83-.749 1.375-.749zm29.313 0c.605 0 1.107.294 1.5.875.27.398.445 1.004.5 1.812h-4.031c.038-.82.27-1.453.656-1.938.385-.483.829-.749 1.375-.749zm-53.031.344c.6 0 1.082.294 1.469.875.267.398.445 1.004.5 1.812h-3.969c.038-.82.241-1.484.625-1.969.381-.484.834-.718 1.375-.718zm7.75 0c.542 0 1.003.301 1.375.875.372.575.531 1.461.531 2.688 0 1.195-.176 2.086-.562 2.688s-.846.906-1.344.906c-.366 0-.699-.123-1-.375-.302-.252-.523-.613-.688-1.094s-.25-1.221-.25-2.188c0-1.139.203-1.992.594-2.594s.846-.906 1.344-.906z"
                        fill="#FFAD32"
                    />
                    <path
                        d="M16.406 27.562l-4.656 2 4.312 1.844 5-1.844-4.656-2zm-7 2.5l-.156 9 6.812 3v-9.344l-6.656-2.656zm14 0l-6.156 2.344v8.812l6.156-2.5v-8.656zM30.75 2.062l-4.688 2 4.344 1.844 5-1.844-4.656-2zm-6.5 2.657v9l5.812 1.688.188-8.188-6-2.5zm13 .5l-5.5 2.344v8.844l5.5-2.5V5.219zM8.734 14.729l-4.656 2 4.312 1.844 5-1.844-4.656-2zm-7 2.5l-.156 9 6.812 3v-9.344l-6.656-2.656zm14 0l-6.156 2.344v8.812l6.156-2.5v-8.656zM23.734 14.397l-4.656 2 4.312 1.844 5-1.844-4.656-2zm-7 2.5l-.156 9 6.812 3v-9.343l-6.656-2.657zm14 0l-6.156 2.344v8.812l6.156-2.5v-8.656zM45.401 2.062l-4.656 2 4.312 1.844 5-1.844-4.656-2zm-7 2.5l-.156 9 6.812 3V7.219l-6.656-2.657zm14 0l-6.156 2.344v8.812l6.156-2.5V4.562z"
                        fill="#FFAD32"/>
                </svg>
                <div className={"representative-framework-text-area"}>
                    <h3>{frameWorkTextList?.awsSection?.title}</h3>
                    <p>{frameWorkTextList?.awsSection?.content}</p>
                </div>
            </div>
        );

        return [firstFramework, secondFramework, thirdFramework];
    };

    // Fetch experience data from the JSON file
    const fetchCareerData = async () => {
        try {
            const response = await import("../assets/data/career-data-" + language + ".json");
            setCareerData(response.default);
        } catch (error) {
            console.error("Failed to load experience data:", error);
        }
    };

    // Fetch experience data from the JSON file
    const fetchSkillData = async () => {
        try {
            const response = await import("../assets/data/skills-" + language + ".json");
            setSkillData(response.default);
        } catch (error) {
            console.error("Failed to load experience data:", error);
        }
    };

    const fetchEducationData = async () => {
        try {
            const response = await import("../assets/data/education-" + language + ".json");
            setEducationData(response.default);
        } catch (error) {
            console.error("Failed to load experience data:", error);
        }
    }

    const fetchCertificateData = async () => {
        try {
            const response = await import("../assets/data/certificate-" + language + ".json");
            setCertificateData(response.default);
        } catch (error) {
            console.error("Failed to load experience data:", error);
        }
    }

    useEffect(() => {
        checkBackendConnection(); // Automatically check backend on page load
        fetchCareerData(); // Load experience data from the JSON file
        fetchSkillData();
        fetchEducationData();
        fetchCertificateData();
    }, []);

    useEffect(() => {
        calculateTotalCareerYearMonth();
    }, [careerData]);

    return (
        <div id={"main-page"}>
            <NavBar backendOnline={backendOnline} isLoading={isLoading}/>
            <div id={"main-img"}>
                <h1>{mainPageText?.mainImage?.firstText}</h1>
            </div>
            <section id={"aboutMe"}
                     ref={(el) => (sectionRefs.current.aboutMe = el)}
                     className={sectionStates.aboutMe ? "main-page-section visible" : "main-page-section"}>
                <h1 className="centered-custom-title">{mainPageText?.aboutMe?.aboutMeTitle}</h1>
                <div className={"about-me-wrapper"}>
                    <div className={"about-me-content"}>
                        <img id={"about-me-img"} src={"/images/profile.png"} alt={""}/>
                        <div className={"about-me-text-area"}>
                            <p>{mainPageText?.aboutMe?.aboutMeContent}</p>
                            <p>
                                <span>{mainPageText?.aboutMe?.objectiveLabel}:</span> {mainPageText?.aboutMe?.objectiveContent}
                            </p>
                            <p>
                                <span>{mainPageText?.aboutMe?.strength} 1:</span> {mainPageText?.aboutMe?.strengthContent1}
                            </p>
                            <p>
                                <span>{mainPageText?.aboutMe?.strength} 2:</span> {mainPageText?.aboutMe?.strengthContent2}
                            </p>
                            <p>
                                <span>{mainPageText?.aboutMe?.strength} 3:</span> {mainPageText?.aboutMe?.strengthContent3}
                            </p>
                            <p>
                                <span>{mainPageText?.aboutMe?.strength} 4:</span> {mainPageText?.aboutMe?.strengthContent4}
                            </p>
                            <p>
                                <span>{mainPageText?.aboutMe?.futureAccomplishmentLabel}: </span> {mainPageText?.aboutMe?.futureAccomplishmentContent}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section id={"project"}
                     ref={(el) => (sectionRefs.current.project = el)}
                     className={sectionStates.project ? "main-page-section visible" : "main-page-section"}>
                <h1 className="centered-title">{mainPageText?.project?.projectTitle}</h1>
                <div className={"project-content"}>
                    <ProjectCard
                        imgSrc={FirstProjectImg || DefaultImgIcon}
                        YYYYMM="202503"
                        title={mainPageText?.project?.project1?.title}
                        type={mainPageText?.project?.project1?.type}
                        description={mainPageText?.project?.project1?.description}
                        url="https://example.com/project1"
                    />
                    <ProjectCard
                        imgSrc={SecondProjectImg || DefaultImgIcon}
                        YYYYMM="202409"
                        title={mainPageText?.project?.project2?.title}
                        type={mainPageText?.project?.project2?.type}
                        description={mainPageText?.project?.project2?.description}
                        url="https://example.com/project2"
                    />
                    <ProjectCard
                        imgSrc={DefaultImgIcon}
                        YYYYMM="202401"
                        title={mainPageText?.project?.project3?.title}
                        type={mainPageText?.project?.project3?.type}
                        description={mainPageText?.project?.project3?.description}
                        url="https://example.com/project3"
                    />
                    <ProjectCard
                        imgSrc={FourthProjectImg || DefaultImgIcon}
                        YYYYMM="202308"
                        title={mainPageText?.project?.project4?.title}
                        type={mainPageText?.project?.project4?.type}
                        description={mainPageText?.project?.project4?.description}
                        url="https://example.com/project4"
                    />
                    <ProjectCard
                        imgSrc={FifthProjectImg || DefaultImgIcon}
                        YYYYMM="202303"
                        title={mainPageText?.project?.project5?.title}
                        type={mainPageText?.project?.project5?.type}
                        description={mainPageText?.project?.project5?.description}
                        url="https://example.com/project5"
                    />
                    <ProjectCard
                        imgSrc={SixthProjectImg || DefaultImgIcon}
                        YYYYMM="202301"
                        title={mainPageText?.project?.project6?.title}
                        type={mainPageText?.project?.project6?.type}
                        description={mainPageText?.project?.project6?.description}
                        url="https://example.com/project6"
                    />
                </div>
            </section>
            <section id={"career"}
                     ref={(el) => (sectionRefs.current.career = el)}
                     className={sectionStates.career ? "main-page-section visible" : "main-page-section"}>
                <div className={"total-dev-career-date-wrapper"}>
                    <h1 className="left-title">{mainPageText?.experience?.experienceTitle}</h1>
                    <p className={"total-dev-career-date"}>
                        {mainPageText?.experience?.totalCareerLabelText} - {totalExperienceYearMonth.totalYears}{mainPageText?.experience?.yearLabelText} {totalExperienceYearMonth.remainingMonths}{mainPageText?.experience?.monthLabelText}
                    </p>
                </div>
                <div className={"experience-panel"}>
                    {careerData.map((data, index) => (
                        (<ExperienceCard key={index} data={data}/>)
                    ))}
                </div>
            </section>
            <section id={"skills"}
                     ref={(el) => (sectionRefs.current.skills = el)}
                     className={sectionStates.skills ? "main-page-section visible" : "main-page-section"}>
                <h1 className="left-title">{mainPageText?.skills?.skillsTitle}</h1>
                <div className={"skill-panel"}>
                    <h2 style={{margin:"2em auto 1em auto"}}>주요 프레임워크</h2>
                    <RotatingHeader componentList={frameworkInfo()}/>
                    <h2 style={{margin:"0 auto 1em auto"}}>사용했던 기술</h2>
                    <div className={"skill-card-list"}>
                        {
                            skillData && Object.entries(skillData).map(([key, value], index) => (
                                <SkillCard key={index} keyName={key} skillData={value}/>
                            ))
                        }
                    </div>
                </div>
            </section>
            <section id={"education"}
                     ref={(el) => (sectionRefs.current.education = el)}
                     className={sectionStates.education ? "main-page-section visible" : "main-page-section"}>
                <h1 className="left-title">{mainPageText?.education?.educationTitle}</h1>
                <div className={"education-certificate-panel"}>
                    <h3>🏅 {mainPageText?.education?.certificateSubTitle} 🏆</h3>
                    <div className={"certificate-card-list"}>
                        {
                            certificateData
                                .map((data, index) => ({
                                    ...data,
                                    id: `certificate-${index}`,
                                }))
                                .map((data, index) => (
                                <CertificateCard key={data.id} id={data.id} data={data}/>
                                ))
                        }
                    </div>
                    <h3>{mainPageText?.education?.educationSubTitle} 🎓</h3>
                    <div className={"education-card-list"}>
                        {
                            educationData
                                .map((data, index) => ({
                                    ...data,
                                    id: `education-${index}`,
                                }))
                                .map((data, index) => (
                                <EducationCard key={data.id} id={data.id} index={index} data={data}/>
                            ))
                        }
                    </div>
                </div>
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