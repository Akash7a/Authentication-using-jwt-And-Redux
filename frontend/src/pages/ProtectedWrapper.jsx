import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  if (!token) {
    return null;
  }

  return children;
};

export default ProtectedWrapper;