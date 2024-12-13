
import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Button } from '@mui/material';
import { useCart } from '../context/CartContext'; // Import Cart Context
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Laptop = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();  // Hook for navigation

  const [laptops, setLaptops] = useState([]);

  // Fetch data from the API
  useEffect(() => {
    axios.get('http://localhost:3001/api/electronics/laptop')
      .then(response => {
        setLaptops(response.data);
      })
      .catch(error => {
        console.error('Error fetching laptops:', error);
      });
  }, []);

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
          <Card key={laptop._id} sx={{ display: 'flex', flexDirection: 'column' }}>
            {/* Update the image path to point to the correct React URL */}
            <CardMedia
              component="img"
              alt={laptop.name}
              image={`http://localhost:3000/images/${laptop.image}.jpg`} // Point to React's local image path
              sx={{ height: 250 }}
            />
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
