const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog')

const app = express();

//connect to MONGO
const dbURI = 'mongodb+srv://nodeTester:test1234@contactkeeper.9hm5l.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs');


//Getting&saving data sandbox
// app.get('/add-blog', (req, res) => {
//   const blog = new Blog({
//     title: 'new blog',
//     snippet: 'about my new blog',
//     body: 'more about my new blog'
//   });
//   blog.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => {
//       console.log(err)
//     });
// });

// app.get('/all-blogs', (req, res) => {
//   Blog.find()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))
// })


// app.get('/single-blog', (req, res) => {
//   Blog.findById('5f33b962064a8a1d80eb5227')
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))
// })





app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))


app.get('/', (req, res) => {
  res.redirect('/blogs')
});

//blog routes
app.get('/blogs', (req, res) => {
  Blog.find()
    .then((result) => {
      res.render('index', { title: 'All Blogs', blogs: result })
    })
    .catch((err) => console.log(err))
});

app.post('/blogs', (req, res) => {
  const blog = new Blog(req.body)

  blog.save()
    .then((result) => {
      res.redirect('/blogs');
    })
    .catch((err)=>{
      console.log(err)
    })
})



app.get('/about', (req, res) => {
  // res.send('<p>About Page</p>');
  res.render('about', { title: 'About' });
});

app.get('/blog/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' })
})
//404 - must be in the bottom! If there is no match above - use method will run
app.use((req, res) => {
  res.status(404).render('404', { title: '404' })
})
