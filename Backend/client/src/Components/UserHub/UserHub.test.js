import React from 'react';
import { render, screen } from '@testing-library/react';
import UserHub from './UserHub';

describe('UserHub component', () => {
  it('renders UserHub component with NavBar and Preview', () => {
    render(<UserHub />);

    // Check if the NavBar component is rendered based on class name
    expect(screen.getByText('BoilerCV')).toBeInTheDocument();

    // Check if the Preview component is rendered
    expect(screen.getByText('My Resumes')).toBeInTheDocument();
  });
});
