const Post = require('../models/Post');

// Get All (Read)
const servePosts = (req, res) => {
    const postsList = Post.list();
    res.send(postsList);
}

// Get One (Read)
const servePost = (req, res) => {
    const { id } = req.params;
    const post = Post.find(Number(id));

    if (!post) {
        return res.status(404).send({
            message: `No post with the id ${id}`
        });
    }
    res.send(post);
};

// Create
const createPost = (req, res) => {
    const { postTitle } = req.body;
    if (!postTitle) {
        return res.status(400).send({ message: "Invalid Title" });
    }

    const postContent = req.body.content ? req.body.content : '';

    const newPost = Post.create(postTitle, postContent);
    res.send(newPost);
};

// Update
const updatePost = (req, res) => {
    const { title, content } = req.body;

    if (!title && !content) {
        return res.status(400).send({ message: "Invalid Request" });
    }

    const { id } = req.params;
    if (title) Post.editTitle(Number(id), title);
    if (content) Post.editContent(Number(id), content);

    const updatedPost = Post.find(Number(id));
    if (!updatedPost) {
        return res.status(404).send({
            message: `No post with the id ${id}`
        });
    }

    res.send(updatedPost);
}

// Delete
const deletePost = (req, res) => {
  const { id } = req.params;
  const didDelete = Post.delete(Number(id));

  if (!didDelete) {
    return res.status(404).send({
      message: `No post with the id ${id}`
    });
  }

  res.sendStatus(204);
}

module.exports = {
  servePosts,
  servePost,
  createPost,
  updatePost,
  deletePost
};
