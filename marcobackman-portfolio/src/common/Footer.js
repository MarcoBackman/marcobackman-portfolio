import React from 'react';
import '../stylesheet/Footer.css';
import {useTranslation} from "../context/TranslationContext";

function Footer() {

    const { language, setLanguage, messages } = useTranslation();
    const footerContent = messages?.common?.footer || {};

    return (
        <footer id={"footer"} data-testid="technologies-section">
            <section id={"sns-link-section"}>
                <ul className={"sns-link-list"} aria-label="sns-link-list">
                    <li className={"sns-link-list-item"}>
                        <img className="footer-logo-img" src={"/logo/instagram.png"} alt="Instagram logo"/>
                        <a>Instagram</a>
                    </li>
                    <li className={"sns-link-list-item"}>
                        <img className="footer-logo-img" src={"/logo/LI-In-Bug.png"} alt="LinkedIn logo"
                             style={{width: "40px", borderRadius: "8px 0 0 8px"}}/>
                        <a>LinkedIn</a>
                    </li>
                    <li className={"sns-link-list-item"}>
                        <img className="footer-logo-img" src={"/logo/jobKorea.webp"} alt="JobKorea logo"/>
                        <a href="https://www.jobkorea.co.kr/User/Resume/View?rNo=26559523">JobKorea</a>
                    </li>
                    <li className={"sns-link-list-item"}>
                        <img className="footer-logo-img" src={"/logo/GitHub_Invertocat_Dark.svg"} alt="GitHub logo"/>
                        <a href="https://github.com/MarcoBackman">Github</a>
                    </li>
                    <li className={"sns-link-list-item"}>
                        <img className="footer-logo-img" src={"/logo/notion-icon.png"} alt="Notion logo"/>
                        <a href="https://happy-stick-11e.notion.site/2024-5eec76e3deed4226b731703768db2a6f?pvs=4">Notion</a>
                    </li>
                </ul>
            </section>
            <section id={"personal-info-section"}>
                <ul aria-label="personal-info-list">
                    <li>
                        <p><span>{footerContent?.addressLabel}: </span>{footerContent?.addressContent}</p>
                    </li>
                    <li>
                        <p><span>{footerContent?.emailLabel}: </span> uj02013@naver.com</p>
                    </li>
                    <li>
                        <p><span>{footerContent?.phoneLabel} ({footerContent?.countryLabelKr} +82): </span>010-8765-3566
                        </p>
                    </li>
                    <li>
                        <p><span>{footerContent?.phoneLabel} ({footerContent?.countryLabelUs} +1): </span>732-884-2378
                        </p>
                    </li>
                    <li>
                        <p>Copyright © 2025. MarcoBackman. All rights reserved.</p>
                    </li>
                    <li>
                        <a href={"https://github.com/MarcoBackman/marcobackman-portfolio"}>
                            {footerContent?.webSourceText}
                        </a>
                    </li>
                </ul>
            </section>
            <section id={"external-link-section"}>
            <h4>{footerContent?.techniqueExplainText}</h4>
                <ul aria-label="technologies-list">
                    <li>
                        <img className="footer-logo-img" src={"/logo/icons8-react-native-144.png"} alt={""}/>
                        <p>{footerContent?.reactText}</p>
                    </li>
                    <li>
                        <img className="footer-logo-img" src={"/logo/html.png"} alt={""}/>
                        <img className="footer-logo-img" src={"/logo/css-3.png"} alt={""}/>
                        <p>{footerContent?.htmlCssText}</p>
                    </li>
                    <li>
                        <img className="footer-logo-img" src={"/logo/Go-Logo_Blue.png"} alt={""}/>
                        <p>{footerContent?.goText}</p>
                    </li>
                    <li>
                        <img className="footer-logo-img" src={"/logo/icons8-spring-boot-144.png"} alt={""}/>
                        <p>{footerContent?.javaSpringText}</p>
                    </li>
                </ul>
            </section>
        </footer>
    );
}

export default Footer;