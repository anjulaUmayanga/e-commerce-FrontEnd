

// // src/App.js
// import React from 'react';
// import { Box, Button, Typography } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import Footer from './components/Footer';
// import logo from './logo.png';
// import categories from './categories';

// function App() {
//   const navigate = useNavigate();

//   return (
//     <Box sx={{ p: 4, backgroundColor: '#FDF7F4', minHeight: '100vh' }}>
//       <Box sx={{ position: 'absolute', top: 16, left: 16 }}>
//         <img src={logo} alt="Logo" style={{ width: '100px', height: 'auto' }} />
//       </Box>
//       <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
//         <Button variant="contained" color="primary" onClick={() => navigate('/cart')}>
//           View Cart
//         </Button>
//       </Box>
//       <Typography
//         variant="h4"
//         align="center"
//         gutterBottom
//         sx={{ color: '#243642', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}
//       >
//         Welcome to ShopNest
//       </Typography>
//       <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
//         {categories.map((category) => (
//           <Box
//             key={category.name}
//             sx={{
//               cursor: 'pointer',
//               width: { xs: '100%', sm: '48%', md: '30%' },
//               textAlign: 'center',
//               padding: 2,
//               backgroundColor: '#fff',
//               borderRadius: 2,
//               '&:hover': { boxShadow: 6 },
//             }}
//             onClick={() => navigate(category.path)}
//           >
//             <img src={category.icon} alt={category.name} style={{ width: '60px', height: '60px', marginBottom: '16px' }} />
//             <Typography variant="h6">{category.name}</Typography>
//           </Box>
//         ))}
//       </Box>
//       <Box sx={{ marginTop: '20px' }}>
//         <Footer />
//       </Box>
//     </Box>
//   );
// }

// export default App;

// src/App.js
import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Footer from './components/Footer';
import logo from './logo.png';
import categories from './categories';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';  // Import the cart icon

function App() {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 4, backgroundColor: '#FDF7F4', minHeight: '100vh' }}>
      <Box sx={{ position: 'absolute', top: 16, left: 16 }}>
        <img src={logo} alt="Logo" style={{ width: '100px', height: 'auto' }} />
      </Box>
      <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/cart')}
          startIcon={<ShoppingCartIcon />}  // Add the icon to the button
        >
          View Cart
        </Button>
      </Box>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ color: '#243642', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}
      >
        Welcome to ShopNest
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
        {categories.map((category) => (
          <Box
            key={category.name}
            sx={{
              cursor: 'pointer',
              width: { xs: '100%', sm: '48%', md: '30%' },
              textAlign: 'center',
              padding: 2,
              backgroundColor: '#fff',
              borderRadius: 2,
              '&:hover': { boxShadow: 6 },
            }}
            onClick={() => navigate(category.path)}
          >
            <img
              src={category.icon}
              alt={category.name}
              style={{ width: '60px', height: '60px', marginBottom: '16px' }}
            />
            <Typography variant="h6">{category.name}</Typography>
          </Box>
        ))}
      </Box>
      <Box sx={{ marginTop: '20px' }}>
        <Footer />
      </Box>
    </Box>
  );
}

export default App;
