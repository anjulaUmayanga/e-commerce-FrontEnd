
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from '../App';
import Electronics from '../pages/Electronics';
import SmartPhone from '../pages/SmartPhone';
import Laptop from '../pages/Laptop';
import WirelessHeadphones from '../pages/WirelessHeadphones';
import Others from '../pages/Others';
import Cart from '../pages/Cart';
import Fashion from "../pages/Fashion"
import Kitchen from "../pages/Kitchen"
import Grocery from "../pages/Grocery"
import BooksStationery from "../pages/BooksStationery"

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/electronics" element={<Electronics />} />
            <Route path="/smartphone" element={<SmartPhone />} />
            <Route path="/laptop" element={<Laptop />} />
            <Route path="/wirelessheadphones" element={<WirelessHeadphones />} />
            <Route path="/others" element={<Others />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/Fashion" element={<Fashion />} />
            <Route path="/Kitchen" element={<Kitchen />} />
            <Route path="/Grocery" element={<Grocery />} />
            <Route path="/BooksStationery" element={<BooksStationery />} />
        </Routes>
    );
};

export default AppRoutes;
