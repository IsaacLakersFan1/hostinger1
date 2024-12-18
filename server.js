const express = require('express');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Create a new user
app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: { name, email },
    });
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all users
app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
