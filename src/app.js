import express from 'express';
const app = express();
const PORT = 3000;

// Root route
app.get('/', (req, res) => {
  res.json({message: 'Welcome to Assignment 1 API'});
});

// Cats API
app.get('/api/v1/cats', (req, res) => {
  res.json({
    cat_id: 1,
    name: 'Whiskers',
    birthdate: '2021-05-12',
    weight: 4.2,
    owner: 'Alice',
    image: 'https://loremflickr.com/320/240/cat',
  });
});

// Serve static files from public folder
app.use('/public', express.static('public'));

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
