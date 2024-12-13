
import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Button, TextField } from '@mui/material';
import { useCart } from '../context/CartContext'; // Import Cart Context
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const Grocery = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();  // Hook for navigation

  // State for search, selected category, and grocery items
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all'); // 'all', 'fruits', 'vegetables', 'snacks', 'beverages'
  const [groceryItems, setGroceryItems] = useState([]);  // State to store fetched grocery items

  // Fetch grocery items from the API
  useEffect(() => {
    const fetchGroceryItems = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/grocery/');
        const data = await response.json();
        setGroceryItems(data);  // Set the fetched data to state
      } catch (error) {
        console.error('Error fetching grocery items:', error);
      }
    };

    fetchGroceryItems();
  }, []);  // Run only once on component mount

  // Handle search term change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Get filtered items based on search term and selected category
  const getFilteredItems = () => {
    let items = [];
    // If selected category is 'all', combine all items
    if (selectedCategory === 'all') {
      items = groceryItems;
    } else {
      // Otherwise, filter by the selected category
      items = groceryItems.filter(item => item.category === selectedCategory);
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
          <Card key={item._id} sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardMedia
              component="img"
              alt={item.name}
              image={`http://localhost:3000/images/${item.image}.jpg`}  // Dynamic image URL
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

export default Grocery;
