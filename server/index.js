const express = require('express');
const path = require('path');

const {
  servePosts,
  servePost,
  createPost,
  updatePost,
  deletePost
} = require('./controllers/postControllers');

const app = express();
const pathToFrontendDist = path.join(__dirname, '../frontend/vite_project/dist');

////////////////////////
// Middleware
////////////////////////

const logRoutes = (req, res, next) => {
  const time = (new Date()).toLocaleString();
  req.time = time;
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next();
};

const serveStatic = express.static(pathToFrontendDist);

const parseJSON = express.json();

app.use(logRoutes);
app.use(serveStatic);
app.use(parseJSON);

////////////////////////
// Endpoints
////////////////////////

app.get('/api/posts', servePosts);
app.get('/api/posts/:id', servePost);
app.post('/api/posts', createPost);
app.patch('/api/posts/:id', updatePost);
app.delete('/api/posts/:id', deletePost);


const port = 8080;
app.listen(port, () => console.log(`listening at http://localhost:${port}`));
