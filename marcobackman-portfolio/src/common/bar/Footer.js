import React from 'react';
import '../../stylesheet/Footer.css';

function Footer({isVisible}) {

    return (
        <footer id={"footer"} className={isVisible ? 'footer-visible' : ''}>
            <section className={'left-footer-section '}>
                <h3>Namedly</h3>
                <p>Descriptive line about what your company does.</p>
                <div className={'footer-logo-section'}>
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
            </section>
            <section className={'right-footer-section'}>
                <div id={'footer-feature-section'} className={'footer-link-section'}>
                    <h4>Features</h4>
                    <p>Core features</p>
                    <p>Pro experience</p>
                    <p>Integrations</p>
                </div>
                <div id={'footer-learn-more-section'} className={'footer-link-section'}>
                    <h4>Learn More</h4>
                    <p>Blog</p>
                    <p>Case studies</p>
                    <p>Customer stories</p>
                    <p>Best practices</p>
                </div>
                <div id={'footer-support-section'} className={'footer-link-section'}>
                    <h4>Support</h4>
                    <p>Contact</p>
                    <p>Support</p>
                    <p>Legal</p>
                </div>
            </section>
        </footer>
    );
}

export default Footer;