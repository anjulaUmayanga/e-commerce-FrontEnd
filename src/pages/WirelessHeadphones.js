
import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Button } from '@mui/material';
import { useCart } from '../context/CartContext'; // Import Cart Context
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Headphones = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();  // Hook for navigation

  const [headphones, setHeadphones] = useState([]);

  // Fetch data from the API
  useEffect(() => {
    axios.get('http://localhost:3001/api/electronics/headphone')
      .then(response => {
        setHeadphones(response.data);
      })
      .catch(error => {
        console.error('Error fetching headphones:', error);
      });
  }, []);

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
          <Card key={headphone._id} sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardMedia
              component="img"
              alt={headphone.name}
              image={`http://localhost:3000/images/${headphone.image}.jpg`} // Use the image URL with the image name from DB
              sx={{ height: 250 }}
            />
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
