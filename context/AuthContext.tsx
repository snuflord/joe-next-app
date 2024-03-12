'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { NEXT_URL } from '../config';


// Define the shape of your user object
interface User {
  id: string;
  username: string;
  // ... other properties
}

// Define the authentication context type
interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    checkUserLoggedIn: () => void;
    registerUser: (user: any) => Promise<void>;
    loginUser: (credentials: { email: string; password: string }) => Promise<void>; // Specify login credentials types
    logoutUser: () => Promise<void>; // Add logoutUser function type
}

// Create the authentication context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Create the AuthProvider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  const checkUserLoggedIn = async () => {
    try {
      const res = await fetch(`${NEXT_URL}/api/checkUserLoggedIn`);
      const data = await res.json();

      console.log(data);

      if (res.ok) {
        setUser(data);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error checking user login status:', error);
    }
  };

  const registerUser = async (user: { username: string; identifier: string; password: string }) => {
    try {
        
        console.log(`user is ${user.username}, email is ${user.identifier}, password is ${user.password}`);

        const res = await fetch(`${NEXT_URL}/api/registerUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: user.username,
                email: user.identifier,
                password: user.password,
            }),
        });

        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            // The response is not JSON, handle accordingly
            console.error('Unexpected content type:', contentType);
            return;
        }

        const data = await res.json();
        console.log(data);

        if (res.ok) {
            setUser(data);
        } else {
            // Handle error if needed
            // setError(data);
            // setError(null);
        }
    } catch (error) {
        // Handle fetch or JSON parsing errors
        console.error('Error in registerUser:', error);
    }
};

  const loginUser = async ({ email, password }: { email: string; password: string }) => {
    try {
      const res = await fetch(`${NEXT_URL}/api/loginUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data: User = await res.json();

      console.log(data);

      if (res.ok) {
        setUser(data);
      } else {
        // Handle error if needed
        // setError(data);
        // setError(null);
      }
    } catch (error) {
      console.error('Error in loginUser:', error);
    }
  };

  const logoutUser = async () => {
    try {
      const res = await fetch(`${NEXT_URL}/api/logoutUser`, {
        method: 'POST',
      });

      if (res.ok) {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error in logoutUser:', error);
    }
  };

  useEffect(() => {
    checkUserLoggedIn();
  }, []); // Run once on component mount

  const contextValue: AuthContextType = {
    user,
    isAuthenticated,
    checkUserLoggedIn,
    registerUser,
    loginUser,
    logoutUser,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
