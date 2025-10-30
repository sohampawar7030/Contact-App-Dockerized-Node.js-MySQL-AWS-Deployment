// index.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const pool = require('./src/database');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// ✅ Route: Add new contact
app.post('/add', async (req, res) => {
  const { username, phone, email } = req.body;
  if (!username || !phone || !email) {
    return res.status(400).send('All fields are required!');
  }

  try {
    const connection = await pool.getConnection();
    await connection.query('INSERT INTO contacts (username, phone, email) VALUES (?, ?, ?)', [username, phone, email]);
    connection.release();
    console.log(`✅ Added contact: ${username} (${phone}, ${email})`);
    res.redirect('/');
  } catch (err) {
    console.error('❌ Error adding contact:', err.message);
    res.status(500).send('Database error');
  }
});

// ✅ Route: Fetch all contacts
app.get('/contacts', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM contacts ORDER BY id DESC');
    connection.release();
    res.json(rows);
  } catch (err) {
    console.error('❌ Error fetching contacts:', err.message);
    res.status(500).send('Database error');
  }
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
