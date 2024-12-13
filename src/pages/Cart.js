
import React from 'react';
import { useCart } from '../context/CartContext';
import { Button, Box, Typography, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const handleIncreaseQuantity = (id) => {
    // Ensure that item exists and update the quantity correctly
    const item = cart.find((item) => item.id === id);
    if (item) {
      updateQuantity(id, item.quantity + 1);  // Increase quantity
    }
  };

  const handleDecreaseQuantity = (id) => {
    const item = cart.find((item) => item.id === id);
    if (item && item.quantity > 1) {
      updateQuantity(id, item.quantity - 1);  // Decrease quantity
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <Box sx={{ p: 4, minHeight: '100vh', backgroundColor: '#FDF7F4' }}>
      <Typography variant="h3" align="center" gutterBottom>
        Shopping Cart
      </Typography>
      <Box sx={{ maxWidth: 900, margin: '0 auto' }}>
        {cart.length > 0 ? (
          cart.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                borderBottom: '1px solid #ddd',
                padding: '16px 0',
              }}
            >
           

            <img
              src={`http://localhost:3000/images/${item.image}.jpg`} 
              onError={(e) => e.target.src = 'http://localhost:3000/images/default.jpg'}  // Fallback image
              alt={item.name}
              style={{ width: 100, height: 100, objectFit: 'cover', marginRight: 16 }}
            />

              <Box sx={{ flex: 1 }}>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {item.description}
                </Typography>
                <Typography variant="body1" fontWeight="bold" color="primary">
                  ${item.price} x {item.quantity}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={() => handleDecreaseQuantity(item.id)} disabled={item.quantity <= 1}>
                  -
                </IconButton>
                <Typography sx={{ margin: '0 8px' }}>{item.quantity}</Typography>
                <IconButton onClick={() => handleIncreaseQuantity(item.id)}>+</IconButton>
                <IconButton onClick={() => removeFromCart(item.id)} sx={{ marginLeft: 2 }}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          ))
        ) : (
          <Typography variant="h6" align="center">
            Your cart is empty
          </Typography>
        )}

        <Box sx={{ marginTop: 3, textAlign: 'right' }}>
          {cart.length > 0 && (
            <>
              <Typography variant="h6" fontWeight="bold">
                Total: ${calculateTotal()}
              </Typography>
              <Button variant="contained" color="primary" sx={{ marginTop: 2 }} fullWidth>
                Proceed to Checkout
              </Button>
            </>
          )}
          <Button
            variant="outlined"
            color="secondary"
            sx={{ marginTop: 2 }}
            onClick={clearCart}
            fullWidth
          >
            Clear Cart
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Cart;
