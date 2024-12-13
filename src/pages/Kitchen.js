
import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Button, TextField } from '@mui/material';
import { useCart } from '../context/CartContext'; // Import Cart Context
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // Import Axios for API calls

const Kitchen = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();  // Hook for navigation

  // State for search and selected category
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all'); // 'all', 'utensils', 'appliances', 'storage'
  const [kitchenItems, setKitchenItems] = useState([]);  // State to hold kitchen items
  const [loading, setLoading] = useState(false);  // State for loading status
  const [error, setError] = useState(null);  // State for error handling

  // Fetch kitchen items based on selected category
  const fetchKitchenItems = async (category) => {
    setLoading(true);
    setError(null);  // Reset error state before making a new request

    let apiUrl = 'http://localhost:3001/api/kitchen'; // Default to main API
    if (category === 'utensils') {
      apiUrl = 'http://localhost:3001/api/kitchen/utensils';
    } else if (category === 'appliances') {
      apiUrl = 'http://localhost:3001/api/kitchen/appliances';
    } else if (category === 'storage') {
      apiUrl = 'http://localhost:3001/api/kitchen/storage';
    }

    try {
      const response = await axios.get(apiUrl);
      setKitchenItems(response.data);
    } catch (error) {
      setError('Error fetching kitchen items');
      console.error('Error fetching kitchen items:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle search term change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Filter items based on search term
  const getFilteredItems = () => {
    return kitchenItems.filter(item => {
      // Check if item.name and item.description are defined before calling toLowerCase()
      const itemName = item.name ? item.name.toLowerCase() : '';
      const itemDescription = item.description ? item.description.toLowerCase() : '';
      
      return itemName.includes(searchTerm) || itemDescription.includes(searchTerm);
    });
  };

  // Handle add to cart
  const handleAddToCart = (item) => {
    addToCart(item);
    navigate('/cart');  // Navigate to the cart page
  };

  useEffect(() => {
    fetchKitchenItems(selectedCategory);  // Fetch items when category changes
  }, [selectedCategory]);

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

      {/* Loading Indicator */}
      {loading && <Typography variant="h6" align="center">Loading...</Typography>}

      {/* Error Message */}
      {error && <Typography variant="h6" color="error" align="center">{error}</Typography>}

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gap: 4,
          mt: 4,
        }}
      >
        {getFilteredItems().map((item) => (
          <Card key={item._id} sx={{ display: 'flex', flexDirection: 'column' }}>
            {/* Use public folder path for image */}
            <CardMedia
              component="img"
              alt={item.name}
              image={`http://localhost:3000/images/${item.image}.jpg`}  // Assuming image is stored in public/images
              sx={{ height: 250 }}
            />
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
      
      {/* Footer */}
      <Box sx={{ marginTop: '20px' }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default Kitchen;
