
import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Button, TextField } from '@mui/material';
import { useCart } from '../context/CartContext'; // Import Cart Context
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const Fashion = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();  // Hook for navigation

  // State for search, selected category, and fashion items
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all'); // 'all', 'ladies', 'gents', 'kids'
  const [fashionItems, setFashionItems] = useState([]);

  // Fetch fashion items based on category
  useEffect(() => {
    const fetchItems = async () => {
      try {
        let url = 'http://localhost:3001/api/fashions'; // Default URL for all items
        if (selectedCategory !== 'all') {
          url = `http://localhost:3001/api/fashions/${selectedCategory}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        setFashionItems(data); // Set fashion items from API response
      } catch (error) {
        console.error('Error fetching fashion items:', error);
      }
    };

    fetchItems();
  }, [selectedCategory]); // Fetch items whenever category changes

  // Handle search term change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Filter items based on search term
  const getFilteredItems = () => {
    return fashionItems.filter(item =>
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
          <Card key={item._id} sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardMedia
              component="img"
              alt={item.name}
              image={`http://localhost:3000/images/${item.image}.jpg`} // Correct image path with extension
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

      <Box sx={{ marginTop: '20px' }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default Fashion;
