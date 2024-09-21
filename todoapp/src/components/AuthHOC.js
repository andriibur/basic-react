import React from 'react';
import { Navigate } from 'react-router-dom';

// Mock authentication function
const isAuthenticated = () => {
  return true; // Set to true to simulate an authenticated user
};

const AuthHOC = (WrappedComponent) => {
  return (props) => {
    if (isAuthenticated()) {
      return <WrappedComponent {...props} />;
    } else {
      return <Navigate to="/" />;
    }
  };
};

export default AuthHOC;
