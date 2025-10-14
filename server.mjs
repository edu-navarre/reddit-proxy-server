import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors());

// Fetch posts by subreddit (e.g., /api/popular, /api/funny)
app.get('/api/:subreddit', async (req, res) => {
  const { subreddit } = req.params;
  try {
    const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Search Reddit posts (e.g., /search/react)
app.get('/search/:query', async (req, res) => {
  const { query } = req.params;
  try {
    const response = await fetch(`https://www.reddit.com/search.json?q=${query}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch post details and comments (e.g., /comments/abc123)
app.get('/comments/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await fetch(`https://www.reddit.com/comments/${id}.json`);
    const data = await response.json();
    res.json({
      post: data[0].data.children[0].data,
      comments: data[1].data.children.map(c => c.data),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(4000, () => {
  console.log('Proxy server running at http://localhost:4000');
});