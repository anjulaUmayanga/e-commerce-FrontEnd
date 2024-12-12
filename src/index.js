// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import Electronics from './pages/Electronics'
// import SmartPhone from './pages/SmartPhone'
// import Laptop from './pages/Laptop' 
// import WirelessHeadphones from './pages/WirelessHeadphones' 
// import Others from './pages/Others'
// import reportWebVitals from './reportWebVitals';
// import { BrowserRouter, Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import Cart from './pages/Cart';
// import AppProvider from './AppContext';
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <AppProvider>
//   <BrowserRouter>
//   <Routes>
//     <Route path='/'element={<App/>}/>
//     <Route path='/Electronics' element={<Electronics />} /> 
//     <Route path='/SmartPhone' element={<SmartPhone />} /> 
//     <Route path='/Laptop' element={<Laptop />} /> 
//     <Route path='/WirelessHeadphones' element={<WirelessHeadphones />} /> 
//     <Route path='/Others' element={<Others />} /> 
//     <Route path="/cart" element={<Cart cartItems={cart} clearCart={clearCart} />} />
//   </Routes>


//   </BrowserRouter>
//   </AppProvider>
// );

// reportWebVitals();

// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import App from './App';
// import Electronics from './pages/Electronics';
// import SmartPhone from './pages/SmartPhone';
// import Laptop from './pages/Laptop';
// import WirelessHeadphones from './pages/WirelessHeadphones';
// import Others from './pages/Others';
// import Cart from './pages/Cart';

// const AppRoutes = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<App />} />
//       <Route path="/Electronics" element={<Electronics />} />
//       <Route path="/SmartPhone" element={<SmartPhone />} />
//       <Route path="/Laptop" element={<Laptop />} />
//       <Route path="/WirelessHeadphones" element={<WirelessHeadphones />} />
//       <Route path="/Others" element={<Others />} />
//       <Route path="/cart" element={<Cart />} />
//     </Routes>
//   );
// };

// export default AppRoutes;


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
