const router = require('express').Router();
const blog_posts = require('../../model/blog_posts');

router.get('/', async (req, res) => {
    blogposts=[];
    const posts = await blog_posts.find({});
    posts.forEach((post) => {
        blogposts.push(post);
    });
    blogposts=blogposts.reverse();
    res.status(200).json({
        blogposts
      });
    });
  
  module.exports = router;