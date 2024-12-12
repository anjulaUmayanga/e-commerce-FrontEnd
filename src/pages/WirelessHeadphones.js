import React from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Button } from '@mui/material';
import { useCart } from '../context/CartContext'; // Import Cart Context
import logo from '../logo.png';
import Footer from '../components/Footer';
import sonyWH1000XM4 from '../images/sonyWH1000XM4.jpg';  // Add appropriate headphone image
import boseQuietComfort35 from '../images/boseQuietComfort35.jpg';  // Add appropriate headphone image
import sennheiserMomentum from '../images/sennheiserMomentum.jpg';  // Add appropriate headphone image

import { useNavigate } from 'react-router-dom';

const Headphones = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();  // Hook for navigation

  // Define headphone data
  const headphones = [
    { id: 1, name: 'Sony WH-1000XM4', description: 'Wireless noise-canceling headphones with 30-hour battery life', price: 349, image: sonyWH1000XM4 },
    { id: 2, name: 'Bose QuietComfort 35 II', description: 'Bluetooth over-ear headphones with noise canceling', price: 299, image: boseQuietComfort35 },
    { id: 3, name: 'Sennheiser Momentum 3', description: 'Premium over-ear headphones with excellent sound quality and noise canceling', price: 399, image: sennheiserMomentum },
  ];

  const handleAddToCart = (headphone) => {
    addToCart(headphone);
    navigate('/cart');  // Navigate to the cart page
  };

  return (
    <Box sx={{ p: 4, backgroundColor: '#FDF7F4', minHeight: '100vh' }}>
      <Typography variant="h3" align="center" gutterBottom>
        Headphones
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gap: 4,
          mt: 4,
        }}
      >
        {headphones.map((headphone) => (
          <Card key={headphone.id} sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardMedia component="img" alt={headphone.name} image={headphone.image} sx={{ height: 250 }} />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {headphone.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                {headphone.description}
              </Typography>
              <Typography variant="body1" fontWeight="bold" color="primary" gutterBottom>
                ${headphone.price}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleAddToCart(headphone)}
                fullWidth
              >
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
      <Footer />
    </Box>
  );
};

export default Headphones;
