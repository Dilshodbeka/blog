const router = require("express").Router();
const Blog = require("../models/Blog");

router.get("/create", (req, res) => {
  res.render("create");
});

router.post("/create", (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.send("Please fill all form");
  }
  const newBlog = new Blog({ title, content });

  newBlog
    .save()
    .then(() => {
      console.log("blog saved good");
      res.redirect("/");
    })
    .catch((err) => console.log(err));
});

router.get('/delete/:id', (req, res)=> {
  const {id} = req.params
  Blog.deleteOne({_id: id})
    .then(()=> {
      console.log('deleted');
      res.redirect('/')
    })
    .catch((err)=> console.log(err))
});

router.get('/edit/:id', async(req, res)=> {
  const {id} = req.params
  const getBlog = await Blog.findOne({_id: id})
  res.render('edit', {blog: getBlog})
})

router.post('/edit/:id',(req, res)=> {
  const {title, content} = req.body
  const {id} = req.params
  Blog.updateOne({_id: id}, {title, content}).then(()=> {
    console.log('updated');
    res.redirect('/')
  }).catch((err)=> console.log(err))
})

module.exports = router;
