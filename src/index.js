import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import AppRoutes from './routes/AppRoutes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <CartProvider>
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    </CartProvider>
);
