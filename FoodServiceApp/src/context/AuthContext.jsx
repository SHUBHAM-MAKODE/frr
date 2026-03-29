import React, { createContext, useState } from 'react';
import api from '../api/axiosInstance';

const AuthContext = createContext();

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Try to get user data from localStorage
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch {
        // If parsing fails, clear storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        return null;
      }
    }
    return null;
  });
  /*
   const login = async (credentials) => {
    try {
      const response = await api.post('/users/login', credentials);
      
      // Your ResponseStructure.java has a 'data' field which contains the String token
      const token = response.data.data; 
  
      if (token) {
        localStorage.setItem('token', token);
        // Since your login only returns a String token, you might need 
        // another call to fetch user details, or just store the email
        setUser({ email: credentials.username }); 
        return token;
      }
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };*/
  const login = async (credentials) => {
    try {
      const loginPayload = {
        email: credentials.email || credentials.username,
        password: credentials.password,
      };

      const response = await api.post('/users/login', loginPayload);
      const payload = response?.data?.data;
      const token = payload?.token;
      const userData = payload?.user || null;

      if (!token) {
        throw new Error(response?.data?.message || 'Login failed');
      }

      // Persist auth data
      localStorage.setItem('token', token);
      if (userData) {
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('role', userData.role || 'CUSTOMER');
        setUser(userData);
      } else {
        const fallbackUser = { email: loginPayload.email, role: 'CUSTOMER' };
        localStorage.setItem('user', JSON.stringify(fallbackUser));
        localStorage.setItem('role', fallbackUser.role);
        setUser(fallbackUser);
      }

      return { token, user: userData };
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message || 'Login failed');
    }
  };
  const register = async (userData) => {
    try {
      console.log('Register attempt:', userData);
      const response = await api.post('/users/register', userData);
      console.log('Register response:', response.data);

      // Handle different response formats from backend
      let user;

      if (response.data.data) {
        // Format: { success: true, data: { id, email, name, role, token } }
        user = response.data.data;
      } else {
        // Assume the response.data is the user object
        user = response.data;
      }

      console.log('Parsed user:', user);

      // If registration is successful, automatically log the user in
      if (user && user.token) {
        localStorage.setItem('token', user.token);
        const apiUser = user.user || user;
        localStorage.setItem('user', JSON.stringify(apiUser));
        localStorage.setItem('role', apiUser.role || 'CUSTOMER');
        setUser(apiUser);
      }

      return response.data;
    } catch (error) {
      console.error('Register error:', error);
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  };

  const logout = async () => {
    try {
      // Some backends expect token in body, others use header
      const token = localStorage.getItem('token');
      if (token) {
        await api.post('/users/logout', { token });
      }
    } catch (error) {
      console.error('Server logout failed:', error);
      // Continue with local logout even if server call fails
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      setUser(null);
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};