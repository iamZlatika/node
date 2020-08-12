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


app.get('/add-blog', (req, res)=>{
 const blog = new Blog({
   title: 'new blog',
   snippet: 'about my new blog',
   body: 'more about my new blog'
 });
 blog.save()
})


app.use(express.static('public'))

app.use(morgan('dev'))


app.get('/', (req, res) => {
  const blogs = [
    { title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam, aut.' },
    { title: 'Mario finds stars', snippet: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam, aut.' },
    { title: 'How to defeat browser', snippet: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam, aut.' },
  ];
  // res.send('<p>Home Page</p>');
  res.render('index', { title: 'Home', blogs },);
});

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
