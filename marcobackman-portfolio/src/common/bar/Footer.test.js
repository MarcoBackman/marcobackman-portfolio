import { render, screen, within } from '@testing-library/react';
import Footer from '../common/Footer';
import { TranslationContext } from '../context/TranslationContext';

// Mock translation data
const mockTranslations = {
    language: 'en',
    setLanguage: jest.fn(),
    messages: {
        common: {
            footer: {
                addressLabel: 'Address',
                addressContent: '1234 React Street',
                emailLabel: 'Email',
                phoneLabel: 'Phone',
                countryLabelKr: 'KR',
                countryLabelUs: 'US',
                webSourceText: 'View Web Source',
                techniqueExplainText: 'Technologies Used',
                reactText: 'React: Front-end Framework',
                htmlCssText: 'HTML/CSS: Styling and Structure',
                goText: 'Go: Backend Language',
                javaSpringText: 'Java/Spring Boot: Backend Framework',
            },
        },
    },
};

describe('Footer Component', () => {
    beforeEach(() => {
        // Render the component within the TranslationContext provider
        render(
            <TranslationContext.Provider value={mockTranslations}>
                <Footer />
            </TranslationContext.Provider>
        );
    });

    it('should render the sns-link-section', () => {
        const snsSection = screen.getByRole('list', { name: 'sns-link-list' });
        expect(snsSection).toBeInTheDocument();
    });

    it('should render all SNS links with appropriate labels', () => {
        const snsLinks = ['Instagram', 'LinkedIn', 'JobKorea', 'Github', 'Notion'];

        snsLinks.forEach((link) => {
            expect(screen.getByText(link)).toBeInTheDocument();
        });
    });

    it('should display address and personal information', () => {
        expect(
            screen.getByText((content, element) => {
                const hasText = (node) =>
                    node.textContent === 'Address: 1234 React Street';
                const elementHasText = hasText(element);
                const childrenDontHaveText = Array.from(element?.children || []).every(
                    (child) => !hasText(child)
                );
                return elementHasText && childrenDontHaveText;
            })
        ).toBeInTheDocument();

        expect(screen.getByText('Email:')).toBeInTheDocument();
        expect(screen.getByText('Phone (KR +82):')).toBeInTheDocument();
        expect(screen.getByText('Phone (US +1):')).toBeInTheDocument();
        expect(screen.getByText('010-8765-3566')).toBeInTheDocument();
        expect(screen.getByText('732-884-2378')).toBeInTheDocument();
    });

    it('should display technologies used', () => {
        const techTexts = [
            'Technologies Used',
            'React: Front-end Framework',
            'HTML/CSS: Styling and Structure',
            'Go: Backend Language',
            'Java/Spring Boot: Backend Framework',
        ];

        techTexts.forEach((text) => {
            expect(screen.getByText(text)).toBeInTheDocument();
        });
    });

    it('should render external links with proper hrefs', () => {
        const externalLinks = [
            {
                text: 'JobKorea',
                href: 'https://www.jobkorea.co.kr/User/Resume/View?rNo=26559523',
            },
            {
                text: 'Github',
                href: 'https://github.com/MarcoBackman',
            },
            {
                text: 'Notion',
                href: 'https://happy-stick-11e.notion.site/2024-5eec76e3deed4226b731703768db2a6f?pvs=4',
            },
            {
                text: 'View Web Source',
                href: 'https://github.com/MarcoBackman/marcobackman-portfolio',
            },
        ];

        externalLinks.forEach(({ text, href }) => {
            const linkElement = screen.getByText(text).closest('a');
            expect(linkElement).toHaveAttribute('href', href);
        });
    });
});