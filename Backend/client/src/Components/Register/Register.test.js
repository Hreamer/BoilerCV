import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Register from './Register';

describe('Register component', () => {
  test('handles registration correctly', async () => {
    const onCloseMock = jest.fn();
    const fetchMock = jest.fn(() => Promise.resolve({ ok: true }));
    global.fetch = fetchMock;
  
    render(<Register onClose={onCloseMock} />);
  
    // Fill in the username and password inputs
    fireEvent.change(screen.getByLabelText('Username:'), { target: { value: 'testUser' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'testPassword' } });
  
    // Trigger the registration button click
    fireEvent.click(screen.getByText('Register'));
  
    // Wait for the asynchronous operations (fetch) to complete
    await waitFor(() => {
      // Ensure that the fetch function is called with the correct arguments
      expect(fetchMock).toHaveBeenCalledWith('http://localhost:3333/createAcc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'testUser', password: 'testPassword' }),
      });
  
      // Ensure that localStorage is set
      expect(localStorage.getItem('username')).toBe('testUser');
  
    });
  });

  // Add more test cases as needed
});
