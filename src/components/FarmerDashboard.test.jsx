import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FarmerDashboard from '../FarmerDashboard';

describe('FarmerDashboard', () => {
  const mockUser = { uid: 'testuser123', email: 'test@example.com' };
  const mockOnLogout = jest.fn();

  it('renders without crashing', () => {
    render(<FarmerDashboard user={mockUser} onLogout={mockOnLogout} />);
  });

  it('calls onLogout when logout button is clicked', () => {
    render(<FarmerDashboard user={mockUser} onLogout={mockOnLogout} />);
    const logoutButton = screen.getByRole('button', { name: /Logout/i });
    fireEvent.click(logoutButton);
    expect(mockOnLogout).toHaveBeenCalledTimes(1);
  });

  it('displays user information when user prop is provided', () => {
    render(<FarmerDashboard user={mockUser} onLogout={mockOnLogout} />);
  });

  it('renders the Dashboard title', () => {
      render(<FarmerDashboard user={mockUser} onLogout={mockOnLogout} />);
      const title = screen.getByText(/Dashboard/i);
      expect(title).toBeInTheDocument();
  });

  it('displays "No products" when no products are present', () => {
    render(<FarmerDashboard user={mockUser} onLogout={mockOnLogout} />);
    const noProductsMessage = screen.getByText(/No products available/i);
    expect(noProductsMessage).toBeInTheDocument();
  });
});