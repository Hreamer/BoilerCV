import React from 'react';
import { render, screen } from '@testing-library/react';
import CarouselCreator from './CarouselCreator';

describe('CarouselCreator component', () => {
  test('renders CarouselCreator component with templates', () => {
    render(<CarouselCreator />);

    // Check if the component renders the header
    expect(screen.getByText('Resume Templates')).toBeInTheDocument();
  });
});
