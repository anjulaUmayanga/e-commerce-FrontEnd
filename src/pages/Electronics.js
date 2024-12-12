
import { Box, Typography, Card, CardContent, CardMedia, Button } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link for navigation
import Footer from '../components/Footer';

import phone from '../icons/elec/apple.jpg';
import laptop from '../icons/elec/macbook.jpg';
import WirelessHeadphones from '../icons/elec/hp.jpg';
import Others from '../icons/elec/ea.png';
import logo from '../logo.png';
import React from 'react';


const Electronics = () => {
  const products = [
    { name: 'Smartphone', description: 'Latest model with amazing features', image: phone, path: '/SmartPhone' },
    { name: 'Laptop', description: 'High-performance laptop for gaming', image: laptop, path: '/Laptop' },
    { name: 'Wireless Headphones', description: 'Comfortable wireless sound experience', image: WirelessHeadphones, path: '/WirelessHeadphones' },
    { name: 'Others', description: 'Other Accessories', image: Others, path: '/Others' },
  ];

  return (
    <Box sx={{ p: 4 ,backgroundColor: '#FDF7F4', minHeight: '100vh'}}>
      <Box
        sx={{
          position: 'absolute',
          top: 16,
          left: 16,
          zIndex: 20, 
        }}
      >
        <img src={logo} alt="Logo" style={{ width: '100px', height: 'auto' }} />
      </Box>
      <Typography variant="h3" align="center" gutterBottom sx={{
        fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }, // Responsive font size
        color:'#243642',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
      }}>
        Electronics
      </Typography>

      {/* Category Section */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h5" gutterBottom>
          Products
        </Typography>

        {/* Grid layout using Box */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            gap: 4,
          }}
        >
          {products.map((product, index) => (
            <Box key={index}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  alt={product.name}
                  image={product.image} // The image is now correctly mapped
                  sx={{
                    height: 250, // Increased height for better aesthetics
                    objectFit: 'cover', // Ensures the image covers the area without distorting
                    borderTopLeftRadius: 8, // Optional: Rounded corners for card images
                    borderTopRightRadius: 8, // Optional: Rounded corners for card images
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {product.description}
                  </Typography>
                  <Link to={product.path} style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Box>

      <Box sx={{
        marginTop:'20px'
      }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default Electronics;
