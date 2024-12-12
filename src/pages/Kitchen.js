import React, { useState } from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Button, TextField } from '@mui/material';
import { useCart } from '../context/CartContext'; // Import Cart Context
import Footer from '../components/Footer';
import logo from '../logo.png';  // Optional: Logo for branding

import { useNavigate } from 'react-router-dom';

// Import kitchen images
import kitchenUtensil from '../images/kitchenUtensil.jpg';  // Add appropriate kitchen item image
import cookwareSet from '../images/cookwareSet.jpg';    // Add appropriate cookware set image
import blender from '../images/blender.jpg';      // Add appropriate blender image
import microwave from '../images/microwave.jpg';  // Add appropriate microwave image
import fridge from '../images/fridge.jpg';    // Add appropriate fridge image
import toaster from '../images/toaster.jpg';      // Add appropriate toaster image

const Kitchen = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();  // Hook for navigation

  // State for search and selected category
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all'); // 'all', 'utensils', 'appliances', 'storage'

  // Define kitchen items for each category
  const kitchenItems = {
    utensils: [
      { id: 1, name: 'Stainless Steel Utensil Set', description: 'A complete set of high-quality kitchen utensils', price: 29.99, image: kitchenUtensil },
      { id: 2, name: 'Cutlery Set', description: 'Elegant and durable cutlery set for daily use', price: 49.99, image: kitchenUtensil },
    ],
    appliances: [
      { id: 3, name: 'Blender', description: 'Powerful blender for smoothies and shakes', price: 69.99, image: blender },
      { id: 4, name: 'Microwave Oven', description: 'Compact microwave for quick and easy cooking', price: 99.99, image: microwave },
    ],
    storage: [
      { id: 5, name: 'Food Storage Containers', description: 'Set of airtight food storage containers', price: 19.99, image: toaster },
      { id: 6, name: 'Refrigerator', description: 'Energy-efficient refrigerator with spacious compartments', price: 399.99, image: fridge },
    ],
  };

  // Handle search term change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Get all items combined for the 'All' category
  const getAllItems = () => {
    return [...kitchenItems.utensils, ...kitchenItems.appliances, ...kitchenItems.storage];
  };

  // Filter items based on search term and selected category
  const getFilteredItems = () => {
    let items = [];
    // If selected category is 'all', combine all items
    if (selectedCategory === 'all') {
      items = getAllItems();
    } else {
      // Otherwise, use the selected category
      items = kitchenItems[selectedCategory] || [];
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
        Kitchen Products
      </Typography>
      
      {/* Search Bar */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
        <TextField
          label="Search Kitchen Items"
          variant="outlined"
          onChange={handleSearchChange}
          fullWidth
        />
      </Box>

      {/* Category Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
        <Button variant="contained" color="primary" onClick={() => setSelectedCategory('utensils')}>Utensils</Button>
        <Button variant="contained" color="primary" onClick={() => setSelectedCategory('appliances')}>Appliances</Button>
        <Button variant="contained" color="primary" onClick={() => setSelectedCategory('storage')}>Storage</Button>
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

export default Kitchen;
