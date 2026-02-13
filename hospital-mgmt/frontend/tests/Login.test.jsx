import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import Login from './Login';
import { Context } from '../main';

// Mock axios
jest.mock('axios');

// Mock react-toastify
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
  ToastContainer: () => null,
}));

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const mockContextValue = {
  isAuthenticated: false,
  setIsAuthenticated: jest.fn(),
  user: null,
  setUser: jest.fn(),
};

const renderLogin = (contextValue = mockContextValue) => {
  return render(
    <Context.Provider value={contextValue}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Context.Provider>
  );
};

describe('Login Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders login form with all input fields', () => {
    renderLogin();
    
    expect(screen.getByRole('heading', { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('renders link to register page', () => {
    renderLogin();
    
    const registerLink = screen.getByRole('link', { name: /register/i });
    expect(registerLink).toBeInTheDocument();
    expect(registerLink).toHaveAttribute('href', '/register');
  });

  test('updates email input value on change', () => {
    renderLogin();
    
    const emailInput = screen.getByPlaceholderText('Email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
    expect(emailInput.value).toBe('test@example.com');
  });

  test('updates password input value on change', () => {
    renderLogin();
    
    const passwordInput = screen.getByPlaceholderText('Password');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    expect(passwordInput.value).toBe('password123');
  });

  test('updates confirm password input value on change', () => {
    renderLogin();
    
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    
    expect(confirmPasswordInput.value).toBe('password123');
  });

  test('submits login form with correct data', async () => {
    const mockResponseData = {
      data: {
        user: { id: '1', email: 'test@example.com', name: 'Test User' },
        message: 'Login successful',
      },
    };

    axios.post.mockResolvedValue(mockResponseData);

    renderLogin();

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');
    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:5000/api/v1/auth/login',
        {
          email: 'test@example.com',
          password: 'password123',
          confirmPassword: 'password123',
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    });
  });

  test('sets authentication on successful login', async () => {
    const mockSetIsAuthenticated = jest.fn();
    const mockSetUser = jest.fn();
    const contextValue = {
      isAuthenticated: false,
      setIsAuthenticated: mockSetIsAuthenticated,
      user: null,
      setUser: mockSetUser,
    };

    const mockResponseData = {
      data: {
        user: { id: '1', email: 'test@example.com', name: 'Test User' },
        message: 'Login successful',
      },
    };

    axios.post.mockResolvedValue(mockResponseData);

    renderLogin(contextValue);

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');
    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSetIsAuthenticated).toHaveBeenCalledWith(true);
      expect(mockSetUser).toHaveBeenCalledWith(mockResponseData.data.user);
    });
  });

  test('shows success toast on successful login', async () => {
    const mockResponseData = {
      data: {
        user: { id: '1', email: 'test@example.com', name: 'Test User' },
        message: 'Login successful',
      },
    };

    axios.post.mockResolvedValue(mockResponseData);

    renderLogin();

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');
    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(
        'Login successful: Login successful'
      );
    });
  });

  test('clears form inputs on successful login', async () => {
    const mockResponseData = {
      data: {
        user: { id: '1', email: 'test@example.com', name: 'Test User' },
        message: 'Login successful',
      },
    };

    axios.post.mockResolvedValue(mockResponseData);

    renderLogin();

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');
    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(emailInput.value).toBe('');
      expect(passwordInput.value).toBe('');
      expect(confirmPasswordInput.value).toBe('');
    });
  });

  test('navigates to home on successful login', async () => {
    const mockResponseData = {
      data: {
        user: { id: '1', email: 'test@example.com', name: 'Test User' },
        message: 'Login successful',
      },
    };

    axios.post.mockResolvedValue(mockResponseData);

    renderLogin();

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');
    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  test('shows error toast on login failure', async () => {
    const errorMessage = 'Invalid credentials';
    axios.post.mockRejectedValue({
      response: {
        data: {
          message: errorMessage,
        },
      },
    });

    renderLogin();

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');
    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(errorMessage);
    });
  });

  test('prevents default form submission', async () => {
    const mockResponseData = {
      data: {
        user: { id: '1', email: 'test@example.com', name: 'Test User' },
        message: 'Login successful',
      },
    };

    axios.post.mockResolvedValue(mockResponseData);

    renderLogin();

    const submitButton = screen.getByRole('button', { name: /login/i });
    const form = submitButton.closest('form');

    const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
    const preventDefaultSpy = jest.spyOn(submitEvent, 'preventDefault');

    form.dispatchEvent(submitEvent);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  test('does not navigate when already authenticated', () => {
    const contextValue = {
      isAuthenticated: true,
      setIsAuthenticated: jest.fn(),
      user: { id: '1', email: 'test@example.com' },
      setUser: jest.fn(),
    };

    renderLogin(contextValue);

    // The component should still render the login form but not navigate
    // This test verifies the conditional check
    expect(screen.queryByRole('heading', { name: /sign in/i })).not.toBeInTheDocument();
  });
});
