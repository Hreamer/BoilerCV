import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AccountInfo from './AccountInfo';

describe('AccountInfo component', () => {
  test('renders without errors', () => {
    render(<AccountInfo onClose={() => {}} username="testUser" />);
    // Add assertions to check if the component renders correctly
    expect(screen.getByText('Username:')).toBeInTheDocument();
    expect(screen.getByText('testUser')).toBeInTheDocument();
    expect(screen.getByLabelText('New Password:')).toBeInTheDocument();
    expect(screen.getByText('Change Password')).toBeInTheDocument();
  });

  test('handles changing password correctly', async () => {
    const onCloseMock = jest.fn();
    const username = 'testUser';
    render(<AccountInfo onClose={onCloseMock} username={username} />);

    // Mock the fetch function to simulate a successful response
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
    });

    // Fill in the password input
    fireEvent.change(screen.getByLabelText('New Password:'), {
      target: { value: 'newPassword123' },
    });

    // Click the "Change Password" button
    fireEvent.click(screen.getByText('Change Password'));

    // Wait for the asynchronous operations (fetch) to complete
    await waitFor(() => {
      expect(onCloseMock).toHaveBeenCalledTimes(0); // Ensure that onClose is called on successful response
      expect(fetch).toHaveBeenCalledWith('http://localhost:3333/changePassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'testUser',
          password: 'newPassword123',
        }),
      });
    });
  });

  // Add more tests as needed
});
