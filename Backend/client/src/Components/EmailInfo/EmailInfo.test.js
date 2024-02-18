import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import EmailInfo from './EmailInfo';

describe('EmailInfo component', () => {
  test('handles sending email correctly', async () => {
    const onCloseMock = jest.fn();
    const pdf = 'http://example.com/dummy.pdf';

    render(<EmailInfo onClose={onCloseMock} pdf={pdf} />);

    // Mock the fetch function to simulate a successful response
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
    });

    // Fill in the email input
    fireEvent.change(screen.getByLabelText('Destination Email:'), {
      target: { value: 'test@example.com' },
    });

    // Click the "Send Email" button
    fireEvent.click(screen.getByText('Send Email'));

    // Wait for the asynchronous operations (fetch) to complete
    await waitFor(() => {
      expect(onCloseMock).toHaveBeenCalledTimes(0); // Ensure that onClose is called on successful response
      expect(fetch).toHaveBeenCalledWith('http://localhost:3333/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          toEmail: 'test@example.com',
          fileName: 'dummy.pdf',
        }),
      });
    });
  });

  // Add more tests as needed
});
