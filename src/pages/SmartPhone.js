
import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Button } from '@mui/material';
import { useCart } from '../context/CartContext'; // Import Cart Context
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SmartPhone = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();  // Hook for navigation

  const [smartphones, setSmartphones] = useState([]);

  // Fetch data from the API
  useEffect(() => {
    axios.get('http://localhost:3001/api/electronics/smartphone')
      .then(response => {
        setSmartphones(response.data);
      })
      .catch(error => {
        console.error('Error fetching smartphones:', error);
      });
  }, []);

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
          <Card key={phone._id} sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardMedia
              component="img"
              alt={phone.name}
              image={`/images/${phone.image}.jpg`} // Append the .jpg extension to the image name from DB
              
              sx={{ height: 250 }}
            />
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
