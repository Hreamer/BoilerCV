import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AccountInfo from './AccountInfo';

describe('AccountInfo', () => {
  test('renders without errors', () => {
    const { getByText } = render(<AccountInfo />);
    const closeButton = getByText('X');
    expect(closeButton).toBeInTheDocument();
  });

  test('changes password on button click', async () => {
    const mockUsername = 'testuser';
    const { getByLabelText, getByText } = render(
      <AccountInfo username={mockUsername} />
    );

    const passwordInput = getByLabelText('New Password:');
    const changePasswordButton = getByText('Change Password');

    // Mock the fetch function
    global.fetch = jest.fn().mockResolvedValue({ ok: true });

    // Type a password and click the button
    fireEvent.change(passwordInput, { target: { value: 'newPassword123' } });
    fireEvent.click(changePasswordButton);

    // Wait for the fetch call to complete
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    // Ensure the fetch call was made with the correct data
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:3333/changePassword',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: 'newPassword123' }),
      }
    );
  });

  // Add more test cases as needed
});
