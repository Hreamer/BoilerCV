import React from 'react';
import { render, screen } from '@testing-library/react';
import Preview from './Preview';

describe('Preview component', () => {
  it('renders Preview component with PDF viewer and buttons', () => {
    // Mock openedResume prop value for testing different PDFs
    const openedResume = "1";

    render(<Preview openedResume={openedResume} />);

    // Check if the component renders the PDF viewer
    expect(screen.getByTitle('PDF Viewer')).toBeInTheDocument();

    // Check if the component renders the ExportLatex button
    expect(screen.getByText('Export LaTeX File')).toBeInTheDocument();

    // Check if the component renders the ExportDocx button
    expect(screen.getByText('Export DOCX File')).toBeInTheDocument();

    // Check if the component renders the SendEmail button
    expect(screen.getByText('Send via Email')).toBeInTheDocument();

    // Check if the component renders the Update Preview button
    expect(screen.getByText('Update Preview')).toBeInTheDocument();
  });
});
