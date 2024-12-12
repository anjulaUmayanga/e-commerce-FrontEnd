import React, { useState } from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Button, TextField } from '@mui/material';
import { useCart } from '../context/CartContext'; // Import Cart Context
import Footer from '../components/Footer';
import logo from '../logo.png';  // Optional: Logo for branding

import { useNavigate } from 'react-router-dom';

// Import grocery images
import fruits from '../images/fruits.jpg';  // Add appropriate fruits image
import vegetables from '../images/vegetables.jpg';  // Add appropriate vegetables image
import snacks from '../images/snacks.jpg';  // Add appropriate snacks image
import beverages from '../images/beverages.jpg';  // Add appropriate beverages image
import milk from '../images/milk.jpg';  // Add appropriate milk image
import bread from '../images/bread.jpg';  // Add appropriate bread image

const Grocery = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();  // Hook for navigation

  // State for search and selected category
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all'); // 'all', 'fruits', 'vegetables', 'snacks', 'beverages'

  // Define grocery items for each category
  const groceryItems = {
    fruits: [
      { id: 1, name: 'Apple', description: 'Fresh red apples', price: 3.99, image: fruits },
      { id: 2, name: 'Banana', description: 'Ripe bananas', price: 1.99, image: fruits },
    ],
    vegetables: [
      { id: 3, name: 'Carrot', description: 'Fresh orange carrots', price: 2.99, image: vegetables },
      { id: 4, name: 'Spinach', description: 'Green spinach leaves', price: 1.99, image: vegetables },
    ],
    snacks: [
      { id: 5, name: 'Chips', description: 'Crispy potato chips', price: 2.49, image: snacks },
      { id: 6, name: 'Cookies', description: 'Chocolate chip cookies', price: 3.99, image: snacks },
    ],
    beverages: [
      { id: 7, name: 'Orange Juice', description: 'Freshly squeezed orange juice', price: 4.99, image: beverages },
      { id: 8, name: 'Milk', description: 'Full-fat milk', price: 1.99, image: milk },
      { id: 9, name: 'Bread', description: 'Freshly baked bread', price: 2.49, image: bread },
    ],
  };

  // Handle search term change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Get all items combined for the 'All' category
  const getAllItems = () => {
    return [
      ...groceryItems.fruits,
      ...groceryItems.vegetables,
      ...groceryItems.snacks,
      ...groceryItems.beverages,
    ];
  };

  // Filter items based on search term and selected category
  const getFilteredItems = () => {
    let items = [];
    // If selected category is 'all', combine all items
    if (selectedCategory === 'all') {
      items = getAllItems();
    } else {
      // Otherwise, use the selected category
      items = groceryItems[selectedCategory] || [];
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
        Grocery Products
      </Typography>
      
      {/* Search Bar */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
        <TextField
          label="Search Grocery Items"
          variant="outlined"
          onChange={handleSearchChange}
          fullWidth
        />
      </Box>

      {/* Category Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
        <Button variant="contained" color="primary" onClick={() => setSelectedCategory('fruits')}>Fruits</Button>
        <Button variant="contained" color="primary" onClick={() => setSelectedCategory('vegetables')}>Vegetables</Button>
        <Button variant="contained" color="primary" onClick={() => setSelectedCategory('snacks')}>Snacks</Button>
        <Button variant="contained" color="primary" onClick={() => setSelectedCategory('beverages')}>Beverages</Button>
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

export default Grocery;
