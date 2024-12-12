
import React from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Button } from '@mui/material';
import { useCart } from '../context/CartContext'; // Import Cart Context
import logo from '../logo.png';
import Footer from '../components/Footer';
import iPhone14 from '../images/iphone14.jpg';
import galaxyS23 from '../images/galaxyS23.jpg';
import pixel8 from '../images/pixel8.jpg';

import { useNavigate } from 'react-router-dom';

const SmartPhone = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();  // Hook for navigation

  const smartphones = [
    { id: 1, name: 'iPhone 14 Pro', description: 'Apple smartphone with A16 Bionic chip', price: 999, image: iPhone14},
    { id: 2, name: 'Samsung Galaxy S23', description: 'Samsung flagship phone with Snapdragon 8 Gen 2', price: 899, image: galaxyS23 },
    { id: 3, name: 'Google Pixel 8', description: 'Google phone with AI-powered camera', price: 799, image: pixel8 },
  ];

  const handleAddToCart = (phone) => {
    addToCart(phone);
    navigate('/cart');  // Navigate to the cart page
  };

  return (
    <Box sx={{ p: 4, backgroundColor: '#FDF7F4', minHeight: '100vh' }}>
      <Typography variant="h3" align="center" gutterBottom>
        Smartphones
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gap: 4,
          mt: 4,
        }}
      >
        {smartphones.map((phone) => (
          <Card key={phone.id} sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardMedia component="img" alt={phone.name} image={phone.image} sx={{ height: 250 }} />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {phone.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                {phone.description}
              </Typography>
              <Typography variant="body1" fontWeight="bold" color="primary" gutterBottom>
                ${phone.price}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleAddToCart(phone)}
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

export default SmartPhone;
