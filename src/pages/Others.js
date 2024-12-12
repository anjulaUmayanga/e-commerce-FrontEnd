import React from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Button } from '@mui/material';
import { useCart } from '../context/CartContext'; // Import Cart Context
import logo from '../logo.png';
import Footer from '../components/Footer';
import canonEOSR5 from '../images/canonEOSR5.jpg';  // Add appropriate camera image
import sonyAlpha7 from '../images/sonyAlpha7.jpg';  // Add appropriate camera image
import powerAdapter from '../images/powerAdapter.jpg';  // Add appropriate power adapter image

import { useNavigate } from 'react-router-dom';

const Other = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();  // Hook for navigation

  // Define product data (Cameras and Power Adapters)
  const products = [
    { id: 1, name: 'Canon EOS R5', description: 'Mirrorless camera with 45MP sensor and 8K video recording', price: 3899, image: canonEOSR5 },
    { id: 2, name: 'Sony Alpha 7', description: 'Full-frame camera with 24.2MP and 4K video capability', price: 1999, image: sonyAlpha7 },
    { id: 3, name: 'Power Adapter 65W', description: 'Universal power adapter for laptops with 65W output', price: 49, image: powerAdapter },
  ];

  const handleAddToCart = (product) => {
    addToCart(product);
    navigate('/cart');  // Navigate to the cart page
  };

  return (
    <Box sx={{ p: 4, backgroundColor: '#FDF7F4', minHeight: '100vh' }}>
      <Typography variant="h3" align="center" gutterBottom>
        Other Products
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gap: 4,
          mt: 4,
        }}
      >
        {products.map((product) => (
          <Card key={product.id} sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardMedia component="img" alt={product.name} image={product.image} sx={{ height: 250 }} />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {product.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                {product.description}
              </Typography>
              <Typography variant="body1" fontWeight="bold" color="primary" gutterBottom>
                ${product.price}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleAddToCart(product)}
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

export default Other;
