import '../stylesheet/NavBar.css';
import {useTranslation} from "../context/TranslationContext";
import {useEffect, useState} from "react";
import {Blocks, ColorRing, DNA, Triangle} from "react-loader-spinner";
import {smoothScroll} from "../common/SmoothScroll";

function NavBar({backendOnline, isLoading}) {

    const { language, setLanguage, messages } = useTranslation();
    const navBarMsg = messages?.common?.navBar || {};

    const currentPath = window.location.pathname;

    const [isHidden, setIsHidden] = useState(false);
    let lastScrollY = 0;

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 500 && window.scrollY > lastScrollY) {
                // Scrolled down past 500px and still scrolling down -> hide the navbar
                setIsHidden(true);
            } else if (window.scrollY <= 500 || window.scrollY < lastScrollY) {
                // Scrolled back up or above 500px -> show the navbar
                setIsHidden(false);
            }
            lastScrollY = window.scrollY; // Update the last scroll position
        };

        // Attach the scroll listener
        window.addEventListener("scroll", handleScroll);

        // Cleanup on component unmount
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`nav-bar ${isHidden ? "hidden" : ""}`}>
            <div className={'nav-bar-left-section'}>
                <nav className={'nav-bar-logo'}>
                    <a className={'logo-link'} href="/">
                        <img src="/logo/38332662.jpg"  alt="logo"/>
                    </a>
                </nav>
                <nav className={'nav-bar-link-left'}>
                    <a
                        className={`nav-bar-link-btn`}
                        href={'#project'}
                        onClick={(e) => smoothScroll(e, 'project')}
                    >
                        {navBarMsg?.projectBtn}
                    </a>
                    <a
                        className={`nav-bar-link-btn`}
                        href={'#experience'}
                        onClick={(e) => smoothScroll(e, 'experience')}
                    >
                        {navBarMsg?.experienceBtn}
                    </a>
                    <a
                        className={`nav-bar-link-btn`}
                        href={'#skills'}
                        onClick={(e) => smoothScroll(e, 'skills')}
                    >
                        {navBarMsg?.skillsBtn}
                    </a>
                    <a
                        className={`nav-bar-link-btn`}
                        href={'#education'}
                        onClick={(e) => smoothScroll(e, 'education')}
                    >
                        {navBarMsg?.educationBtn}
                    </a>
                    <a
                        className={`nav-bar-link-btn`}
                        href={'#ability'}
                        onClick={(e) => smoothScroll(e, 'ability')}
                    >
                        {navBarMsg?.abilityBtn}
                    </a>
                    <a
                        className={`nav-bar-link-btn`}
                        href={'#contact'}
                        onClick={(e) => smoothScroll(e, 'contact')}
                    >
                        {navBarMsg?.contact}
                    </a>
                </nav>
            </div>
            <div className={'nav-bar-right-section'}>
                <nav className={'nav-bar-link-right'}>
                    <a
                        className={`nav-bar-link-btn ${currentPath === '/job-method' ? 'active' : ''}`}
                        href={'/job-method'}
                    >
                        {navBarMsg?.jobMethod}
                    </a>
                    <a
                        className={`nav-bar-link-btn ${currentPath === '/login' ? 'active' : ''}`}
                        href={ backendOnline === true ? '/login' : ''}
                    >
                        {isLoading ? (
                            // Show spinner while loading
                            <ColorRing
                                visible={true}
                                height="40"
                                width="40"
                                margin-bottom="10px"
                                ariaLabel="color-ring-loading"
                                wrapperStyle={{}}
                                wrapperClass="color-ring-wrapper"
                                colors={['#495867', '#577399', '#BDD5EA', '#000000', '#FE5F55']}
                            />
                        ) : (
                            backendOnline ? (
                                // Show "online" status icon
                                <img className="status-icon" src="/icons/online.png" alt="online" />
                            ) : (
                                // Show "offline" status icon
                                <img className="status-icon" src="/icons/offline.png" alt="offline" />
                            )
                        )}
                        {navBarMsg?.serviceLogin}
                        {isLoading ? <span id="service-status-hover-text"> {navBarMsg?.serviceConn} </span>
                        : (<span id="service-status-hover-text">{backendOnline === false ? (
                                <img className="status-icon" src="/icons/surprised.png"
                                     alt="offline"/>) : null}{backendOnline === true ? navBarMsg?.serviceOnline : navBarMsg?.serviceOffLine}</span>)}
                    </a>
                </nav>
            </div>
        </header>
    );
}

export default NavBar;