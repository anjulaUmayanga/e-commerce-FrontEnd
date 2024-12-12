import React from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Button } from '@mui/material';
import { useCart } from '../context/CartContext'; // Import Cart Context
import logo from '../logo.png';
import Footer from '../components/Footer';
import macbookPro from '../images/macbookPro.jpg';  // Add appropriate laptop image
import dellXPS from '../images/dellXPS.jpg';      // Add appropriate laptop image
import hpSpectre from '../images/hpSpectre.jpg';  // Add appropriate laptop image

import { useNavigate } from 'react-router-dom';

const Laptop = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();  // Hook for navigation

  // Define laptop data
  const laptops = [
    { id: 1, name: 'MacBook Pro 16"', description: 'Apple laptop with M1 Pro chip', price: 2399, image: macbookPro },
    { id: 2, name: 'Dell XPS 13', description: 'Dell ultrabook with 11th Gen Intel Core i7', price: 1299, image: dellXPS },
    { id: 3, name: 'HP Spectre x360', description: 'HP convertible laptop with Intel i7 and 16GB RAM', price: 1499, image: hpSpectre },
  ];

  const handleAddToCart = (laptop) => {
    addToCart(laptop);
    navigate('/cart');  // Navigate to the cart page
  };

  return (
    <Box sx={{ p: 4, backgroundColor: '#FDF7F4', minHeight: '100vh' }}>
      <Typography variant="h3" align="center" gutterBottom>
        Laptops
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gap: 4,
          mt: 4,
        }}
      >
        {laptops.map((laptop) => (
          <Card key={laptop.id} sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardMedia component="img" alt={laptop.name} image={laptop.image} sx={{ height: 250 }} />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {laptop.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                {laptop.description}
              </Typography>
              <Typography variant="body1" fontWeight="bold" color="primary" gutterBottom>
                ${laptop.price}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleAddToCart(laptop)}
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

export default Laptop;
