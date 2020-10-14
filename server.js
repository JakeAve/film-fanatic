const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

connectDB();

app.use(express.json({ extended: false }));

// Routes
app.use('/api/film', require('./routes/film'));

// Static Assets
if (process.env.NODE_ENV === 'production') {
  // google auth verification
  app.get('/googled38baa3422c3d065.html', (req, res) =>
    res.send(`google-site-verification: googled38baa3422c3d065.html`),
  );
  // set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`1: Server started on ${PORT}`));
