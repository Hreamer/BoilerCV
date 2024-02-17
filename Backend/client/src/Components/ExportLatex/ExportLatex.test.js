import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ExportLatex from './ExportLatex';

describe('ExportLatex', () => {
  test('renders without errors', () => {
    const { getByText } = render(<ExportLatex />);
    const downloadButton = getByText('Download LaTeX File');
    expect(downloadButton).toBeInTheDocument();
  });

  test('downloads LaTeX file on button click', () => {
    const { getByText } = render(<ExportLatex />);
    const downloadButton = getByText('Download LaTeX File');

    // Mock the createObjectURL function
    window.URL.createObjectURL = jest.fn();

    // Mock the Blob constructor
    global.Blob = jest.fn();

    // Mock the createElement function
    document.createElement = jest.fn(() => ({
      href: '',
      download: '',
      click: jest.fn(),
    }));

    // Click the download button
    fireEvent.click(downloadButton);

    // Ensure the functions were called
    expect(window.URL.createObjectURL).toHaveBeenCalled();
    expect(global.Blob).toHaveBeenCalledWith(
      [expect.any(String)],
      { type: 'application/x-latex' }
    );
    expect(document.createElement).toHaveBeenCalledWith('a');
  });
});