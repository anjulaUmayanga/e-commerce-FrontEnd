
import React from 'react';
import { CartProvider } from './context/CartContext';

const AppWrapper = ({ children }) => {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  );
};

export default AppWrapper;
