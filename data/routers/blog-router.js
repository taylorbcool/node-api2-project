const express = require('express')
const Blog = require('../db');

const router = express.Router()

router.get('/', (req, res) => {
  Blog.find(req.query)
    .then(blog => {
      res.status(200).json(blog)
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "The posts information could not be retrieved" })
    })
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  const post = Blog.findById(id)
  if(post) {
    post
      .then(post => {
        res.status(200).json(post)
      })
      .catch(err => {
        res.status(500).json({ errorMessage: 'There was an error retrieving blog post'})
      })
  } else {
    res.status(404).json({ errorMessage: 'The post with the given id does not exist'})
  }
})

router.get('/:id/comments', (req, res) => {
  const id = req.params.id
  const post = Blog.findById(id)
  if(post) {
    Blog.findPostComments(id)
      .then(comments => {
        res.status(200).json(comments)
      })
      .catch(err => {
        res.status(500).json({ errorMessage: 'There was an error retrieving comments'})
      })
  } else {
    res.status(404).json({ errorMessage: 'The post with the given id does not exist'})
  }
})

router.post('/', (req, res) => {
  if (!req.body.title || !req.body.contents) {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
      } else {
        Blog.insert(id, body)
        .then(post => {
            res.status(200).json(req.body)
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "There was an error while saving the post to the database" })
        })
      }
})

router.post('/:id/comments', (req, res) => {
  const id = req.params.id
  const post = Blog.findById(id)
  if (post) {
    if (req.body.text) {
      Blog.insertComment(req.body)
        .then(comment => {
          res.status(201).json(req.body)
        })
        .catch(err => {
          res.status(500).json({ errorMessage: "There was a problem submitting your comment."})
        })
    } else {
      res.status(500).json({ errorMessage: "Please provide text for your comment"})
    }
  } else {
      res.status(404).json({ errorMessage: 'The post with the given id does not exist'})
}})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const post = Blog.findById(id)
  const newPost = req.body
  if (!req.body.title || !req.body.contents) {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else {
      if(post) {
        Blog.update(id, newPost)
          .then(post => {
            res.status(201).json(newPost)
          })
          .catch(err =>{
            res.status(500).json({ errorMessage: "there was a problem updating the post"})
          })
      } else {
        res.status(404).json({ errorMessage: 'The post with the given id does not exist'})
      }
}})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  if(id) {
    Blog.remove(id)
      .then(deleted => {
        res.status(200).json({ message: `Post with id ${id} was deleted.`})
      })
      .catch(err => {
        res.status(500).json({ errorMessage: 'The post could not be deleted.'})
      })
  } else {
      res.status(404).json({ errorMessage: 'The post with the given id does not exist'})
  }
})

module.exports = router;