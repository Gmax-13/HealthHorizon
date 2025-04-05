// src/SignupContext.js
import React, { createContext, useState } from 'react';

export const SignupContext = createContext();

export const SignupProvider = ({ children }) => {
  const [signupData, setSignupData] = useState({
    email: '',
    name: '',
    password: '',
    gender: '',
    age: '',
    height_ft: '',
    height_inch: '',
    weight: '',
    goal: ''
  });

  const updateSignupData = (newData) => {
    setSignupData((prevData) => ({ ...prevData, ...newData }));
  };

  return (
    <SignupContext.Provider value={{ signupData, updateSignupData }}>
      {children}
    </SignupContext.Provider>
  );
};
