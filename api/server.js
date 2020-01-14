const express = require('express');

const BlogRouter = require('../data/routers/blog-router')

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send(`
    <h2>Blog API</h>
    <p>Welcome to Blog API</p>
  `);
});

server.use('/api/posts', BlogRouter)

module.exports = server