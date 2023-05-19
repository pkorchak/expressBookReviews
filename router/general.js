const express = require('express');
const books = require('./booksdb.js');
const isValid = require('./auth_users.js').isValid;
const users = require('./auth_users.js').users;
const public_users = express.Router();

public_users.post('/register', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) {
      users.push({ 'username': username, 'password': password });
      return res.status(200).json({ message: 'User successfully registered. Now you can login' });
    } else {
      return res.status(404).json({ message: 'User already exists!' });
    }
  }
  return res.status(404).json({ message: 'Unable to register user.' });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  return res.status(200).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  return res.status(200).json(books[req.params.isbn]);
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  return res.status(200)
    .json(Object.values(books).filter(book => book.author === author));
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  return res.status(200)
    .json(Object.values(books).filter(book => book.title === title));
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  return res.status(200).json(books[req.params.isbn].reviews);
});

module.exports.general = public_users;
