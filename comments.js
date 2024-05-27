// Create web server
// 1. Import express
// 2. Create an instance of express
// 3. Create a route for GET request
// 4. Create a route for POST request
// 5. Create a route for PUT request
// 6. Create a route for DELETE request
// 7. Start the server
// 8. Listen to the port

// 1. Import express
const express = require('express');
const bodyParser = require('body-parser');
const comments = require('./data/comments');
const users = require('./data/users');
const posts = require('./data/posts');

// 2. Create an instance of express
const app = express();

// 3. Create a route for GET request
app.get('/comments', (req, res) => {
  res.json(comments);
});

// 4. Create a route for POST request
app.use(bodyParser.json());
app.post('/comments', (req, res) => {
  const newComment = req.body;
  newComment.id = comments.length + 1;
  newComment.date = new Date();
  comments.push(newComment);
  res.json(newComment);
});

// 5. Create a route for PUT request
app.put('/comments/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const comment = comments.find(comment => comment.id === id);
  if (comment) {
    Object.assign(comment, req.body);
    res.json(comment);
  } else {
    res.status(404).send(`Comment with id ${id} not found`);
  }
});

// 6. Create a route for DELETE request
app.delete('/comments/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = comments.findIndex(comment => comment.id === id);
  if (index !== -1) {
    comments.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send(`Comment with id ${id} not found`);
  }
});

// 7. Start the server
const port = 4001;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// 8. Listen to the port

// Run the server
// node comments.js
// Open the browser and go to http://localhost:4001/comments
// Use Postman to test POST