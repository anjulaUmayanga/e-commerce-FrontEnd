import React, { useState } from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Button, TextField } from '@mui/material';
import { useCart } from '../context/CartContext'; // Import Cart Context
import Footer from '../components/Footer';
import logo from '../logo.png';  // Optional: Logo for branding

import { useNavigate } from 'react-router-dom';

// Import fashion images
import ladiesShirt from '../images/ladiesShirt.jpg';  // Add appropriate ladies fashion image
import gentsShirt from '../images/gentsShirt.jpg';    // Add appropriate gents fashion image
import kidsShirt from '../images/kidsShirt.jpg';      // Add appropriate kids fashion image
import ladiesDress from '../images/ladiesDress.jpg';  // Add appropriate ladies fashion image
import gentsJeans from '../images/gentsJeans.jpg';    // Add appropriate gents fashion image
import kidsJeans from '../images/kidsJeans.jpg';      // Add appropriate kids fashion image

const Fashion = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();  // Hook for navigation

  // State for search and selected category
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all'); // 'all', 'ladies', 'gents', 'kids'

  // Define fashion items for each category
  const fashionItems = {
    ladies: [
      { id: 1, name: 'Floral Summer Dress', description: 'A beautiful floral dress for summer', price: 79.99, image: ladiesDress },
      { id: 2, name: 'Casual White Shirt', description: 'Simple white shirt, perfect for everyday wear', price: 49.99, image: ladiesShirt },
    ],
    gents: [
      { id: 3, name: 'Slim Fit Jeans', description: 'Modern slim-fit jeans for gents', price: 69.99, image: gentsJeans },
      { id: 4, name: 'Checked Shirt', description: 'Stylish checkered shirt for casual outings', price: 59.99, image: gentsShirt },
    ],
    kids: [
      { id: 5, name: 'Cartoon Print T-Shirt', description: 'Fun and colorful t-shirt for kids', price: 19.99, image: kidsShirt },
      { id: 6, name: 'Kids Denim Jeans', description: 'Comfortable jeans for kids', price: 29.99, image: kidsJeans },
    ],
  };

  // Handle search term change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Get all items combined for the 'All' category
  const getAllItems = () => {
    return [...fashionItems.ladies, ...fashionItems.gents, ...fashionItems.kids];
  };

  // Filter items based on search term and selected category
  const getFilteredItems = () => {
    let items = [];
    // If selected category is 'all', combine all items
    if (selectedCategory === 'all') {
      items = getAllItems();
    } else {
      // Otherwise, use the selected category
      items = fashionItems[selectedCategory] || [];
    }

    // Filter based on search term
    return items.filter(item =>
      item.name.toLowerCase().includes(searchTerm) || item.description.toLowerCase().includes(searchTerm)
    );
  };

  // Handle add to cart
  const handleAddToCart = (item) => {
    addToCart(item);
    navigate('/cart');  // Navigate to the cart page
  };

  return (
    <Box sx={{ p: 4, backgroundColor: '#FDF7F4', minHeight: '100vh' }}>
      <Typography variant="h3" align="center" gutterBottom>
        Fashion
      </Typography>
      
      {/* Search Bar */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
        <TextField
          label="Search Fashion Items"
          variant="outlined"
          onChange={handleSearchChange}
          fullWidth
        />
      </Box>

      {/* Category Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
        <Button variant="contained" color="primary" onClick={() => setSelectedCategory('ladies')}>Ladies</Button>
        <Button variant="contained" color="primary" onClick={() => setSelectedCategory('gents')}>Gents</Button>
        <Button variant="contained" color="primary" onClick={() => setSelectedCategory('kids')}>Kids</Button>
        <Button variant="contained" color="primary" onClick={() => setSelectedCategory('all')}>All</Button>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gap: 4,
          mt: 4,
        }}
      >
        {getFilteredItems().map((item) => (
          <Card key={item.id} sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardMedia component="img" alt={item.name} image={item.image} sx={{ height: 250 }} />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {item.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                {item.description}
              </Typography>
              <Typography variant="body1" fontWeight="bold" color="primary" gutterBottom>
                ${item.price.toFixed(2)}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleAddToCart(item)}
                fullWidth
              >
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
      <Box sx={{
        marginTop:'20px'
      }}>
        <Footer />
      </Box>
      
    </Box>
  );
};

export default Fashion;
