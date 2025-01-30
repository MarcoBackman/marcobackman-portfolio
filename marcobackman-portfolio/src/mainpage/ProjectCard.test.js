import { render, screen } from '@testing-library/react';
import ProjectCard from './ProjectCard'; // Adjust the import path as needed

describe('ProjectCard Component', () => {
    const mockProps = {
        imgSrc: '/path/to/image.png',
        title: 'Test Project',
        type: 'Web Application',
        description: 'This is a test project description.',
        url: 'https://example.com',
    };

    test('renders ProjectCard with all elements', () => {
        // Arrange: Render the component with mockProps
        render(<ProjectCard {...mockProps} />);

        // Act & Assert: Verify the image renders with correct attributes
        const image = screen.getByRole('img'); // Finds image by role
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', mockProps.imgSrc);
        expect(image).toHaveAttribute('alt', 'Test Project image'); // Verifies that alt is empty

        // Act & Assert: Verify title and type render correctly
        expect(screen.getByText(mockProps.title)).toBeInTheDocument(); // Title
        expect(screen.getByText(mockProps.type)).toBeInTheDocument();  // Type

        // Act & Assert: Verify description renders correctly
        expect(screen.getByText(mockProps.description)).toBeInTheDocument();

        // Act & Assert: Verify the link is rendered with correct href
        const link = screen.getByRole('link'); // Finds the link by role
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', mockProps.url);
    });

    test('link redirects to the correct URL', () => {
        // Arrange: Render the component
        render(<ProjectCard {...mockProps} />);

        // Act: Find the link
        const link = screen.getByRole('link');

        // Assert: Verify link points to the correct URL
        expect(link.getAttribute('href')).toBe(mockProps.url);
    });
});