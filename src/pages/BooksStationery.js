import React, { useState } from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Button, TextField } from '@mui/material';
import { useCart } from '../context/CartContext'; // Import Cart Context
import Footer from '../components/Footer';
import logo from '../logo.png';  // Optional: Logo for branding

import { useNavigate } from 'react-router-dom';

// Import book and stationery images
import book1 from '../images/book1.jpg';  // Add appropriate book image
import book2 from '../images/book2.jpg';  // Add appropriate book image
import notebook from '../images/notebook.jpg';  // Add appropriate notebook image
import pen from '../images/pen.jpg';  // Add appropriate pen image
import markers from '../images/markers.jpg';  // Add appropriate markers image
import backpack from '../images/backpack.jpg';  // Add appropriate backpack image

const BooksStationery = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();  // Hook for navigation

  // State for search and selected category
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all'); // 'all', 'books', 'stationery'

  // Define books and stationery items for each category
  const booksStationeryItems = {
    books: [
      { id: 1, name: 'The Great Gatsby', description: 'A classic novel by F. Scott Fitzgerald', price: 10.99, image: book1 },
      { id: 2, name: 'To Kill a Mockingbird', description: 'A novel by Harper Lee', price: 12.99, image: book2 },
    ],
    stationery: [
      { id: 3, name: 'Notebook', description: 'A pack of 3 lined notebooks', price: 5.99, image: notebook },
      { id: 4, name: 'Pen Set', description: 'A set of 10 ballpoint pens', price: 3.99, image: pen },
      { id: 5, name: 'Markers', description: 'A set of colorful markers for drawing and writing', price: 7.99, image: markers },
      { id: 6, name: 'Backpack', description: 'A spacious backpack for books and stationery', price: 24.99, image: backpack },
    ],
  };

  // Handle search term change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Get all items combined for the 'All' category
  const getAllItems = () => {
    return [
      ...booksStationeryItems.books,
      ...booksStationeryItems.stationery,
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
      items = booksStationeryItems[selectedCategory] || [];
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
        Books & Stationery
      </Typography>
      
      {/* Search Bar */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
        <TextField
          label="Search Books & Stationery"
          variant="outlined"
          onChange={handleSearchChange}
          fullWidth
        />
      </Box>

      {/* Category Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
        <Button variant="contained" color="primary" onClick={() => setSelectedCategory('books')}>Books</Button>
        <Button variant="contained" color="primary" onClick={() => setSelectedCategory('stationery')}>Stationery</Button>
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

      <Box sx={{ marginTop: '20px' }}>
        <Footer />
      </Box>
      
    </Box>
  );
};

export default BooksStationery;
