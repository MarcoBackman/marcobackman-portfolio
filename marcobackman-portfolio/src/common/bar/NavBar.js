import '../../stylesheet/NavBar.scss';
import {useEffect, useState} from "react";
import useAuthStore from "../../context/UserContext";

function NavBar({backendOnline, isLoading}) {

    const currentPath = window.location.pathname;

    /**
     * User Data section
     */
    const { userData, setUserData, resetUserData } = useAuthStore();
    const handleLogin = () => {
        setUserData({ name: "John Doe", email: "john.doe@example.com" }, "sample-token");
    };
    const handleLogout = () => {
        resetUserData();
    };


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
            <nav className={'nav-bar-nav'}>
                <div className={'nav-bar-left-section'}>
                    <div className={'nav-bar-logo'}>
                        <a className={'logo-link'} href="/">
                            <img src="/logo/38332662.jpg" alt="logo"/>
                        </a>
                        <h2>Marco Backman</h2>
                    </div>
                </div>
                <div className={'nav-bar-link-section'}>
                    <div className={'nav-bar-link-right'}>
                        <button className={'nav-button'}>
                            <a href="/about">About</a>
                        </button>
                        <button className={'nav-button'}>
                            <a href="/about">Skills</a>
                        </button>
                        <button className={'nav-button'}>
                            <a href="/about">Projects</a>
                        </button>
                        <button className={'nav-button'}>
                            <a href="/about">AI</a>
                        </button>
                        <button className={'nav-button'}>
                            <a href="/about">Contact</a>
                        </button>
                    </div>
                </div>
                <div className={'nav-bar-right-section'}>
                    <cite className={'sns-icon'}>
                        <a
                            id={'linked-in-link'}
                            className={'sns-link'}
                            href="https://www.linkedin.com/in/sung-jun-tony-baek-9b505b11a"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src={`${process.env.PUBLIC_URL}/icons/sns/linked-in.svg`}
                                alt="LinkedIn Icon"
                                className="sns-icon-svg"
                            />
                        </a>
                    </cite>
                    <cite className={'sns-icon'}>
                        <a
                            id={'github-link'}
                            className={'sns-link'}
                            href="https://github.com/marcobackman"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src={`${process.env.PUBLIC_URL}/icons/sns/github.svg`}
                                alt="GitHub Icon"
                                className="sns-icon-svg"
                            />
                        </a>
                    </cite>
                    <cite className={'sns-icon'}>
                        <a
                            id={'instagram-link'}
                            className={'sns-link'}
                            href="https://instagram.com/marcobackman"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src={`${process.env.PUBLIC_URL}/icons/sns/instagram.svg`}
                                alt="Instagram Icon"
                                className="sns-icon-svg"
                            />
                        </a>
                    </cite>
                    <cite className={'sns-icon'}>
                        <a
                            id={'job-korea-link'}
                            className={'sns-link'}
                            href="https://jobkorea.co.kr/marcobackman"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src={`${process.env.PUBLIC_URL}/icons/sns/jobkorea.svg`}
                                alt="Job Korea Icon"
                                className="sns-icon-svg"
                            />
                        </a>
                    </cite>
                </div>
            </nav>
        </header>
    );
}

export default NavBar;