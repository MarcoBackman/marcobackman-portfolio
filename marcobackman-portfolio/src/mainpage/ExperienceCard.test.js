import React from "react";
import { render, screen } from "@testing-library/react";
import ExperienceCard from "./ExperienceCard"; // adjust path to your component

// Mocking the `useTranslation` hook
jest.mock("../context/TranslationContext", () => ({
    useTranslation: () => ({
        language: "en",
        setLanguage: jest.fn(),
        messages: {
            mainPage: {
                experience: {
                    currentJobLabel: "Current Job",
                },
            },
        },
    }),
}));

describe("ExperienceCard Component", () => {
    const mockData = {
        fromDate: "2021-01-01",
        toDate: "2023-01-01",
        company: "Test Company",
        "job-description": "Test Job Description",
        "task-list": ["Task 1", "Task 2", "Task 3"],
        skills: ["Skill 1", "Skill 2", "Skill 3"],
    };

    it("renders without crashing", () => {
        render(<ExperienceCard data={mockData} />);
        expect(screen.getByText(/Test Company/)).toBeInTheDocument();
    });

    it("displays date range correctly", () => {
        render(<ExperienceCard data={mockData} />);
        // Match Korean-style date format `YYYY년 M월 ~ YYYY년 M월`
        expect(screen.getByText(/2021년 1월 ~ 2023년 1월/)).toBeInTheDocument();
    });


    it('displays "Present" label when the job is current', () => {
        const currentJobData = { ...mockData, toDate: null }; // toDate is null for current job
        render(<ExperienceCard data={currentJobData} />);
        // Match "Present" and Korean-style date format
        expect(screen.getByText(/2021년 1월 ~ Present/)).toBeInTheDocument();
        expect(screen.getByText("Current Job")).toBeInTheDocument();
    });

    it("renders company name and job description correctly", () => {
        render(<ExperienceCard data={mockData} />);
        expect(screen.getByText("Test Company")).toBeInTheDocument();
        expect(screen.getByText("Test Job Description")).toBeInTheDocument();
    });

    it("renders task list items correctly", () => {
        render(<ExperienceCard data={mockData} />);
        mockData["task-list"].forEach((task) => {
            expect(screen.getByText(task)).toBeInTheDocument();
        });
    });

    it("renders skill list items correctly", () => {
        render(<ExperienceCard data={mockData} />);
        mockData.skills.forEach((skill) => {
            expect(screen.getByText(skill)).toBeInTheDocument();
        });
    });

    it("displays job description correctly", () => {
        render(<ExperienceCard data={mockData} />);
        expect(screen.getByText("Test Job Description")).toBeInTheDocument();
    });

    it("renders task list items correctly", () => {
        render(<ExperienceCard data={mockData} />);
        expect(screen.getByText("Task 1")).toBeInTheDocument();
        expect(screen.getByText("Task 2")).toBeInTheDocument();
        expect(screen.getByText("Task 3")).toBeInTheDocument();
    });

    it("renders skills list items correctly", () => {
        render(<ExperienceCard data={mockData} />);
        expect(screen.getByText("Skill 1")).toBeInTheDocument();
        expect(screen.getByText("Skill 2")).toBeInTheDocument();
        expect(screen.getByText("Skill 3")).toBeInTheDocument();
    });
});